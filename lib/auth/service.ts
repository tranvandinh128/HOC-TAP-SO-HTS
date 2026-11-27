import { NextResponse } from "next/server";

import type { D1Repository } from "@/lib/d1/repository";
import { AuthApiError } from "@/lib/auth/http";
import {
  authCookieName,
  createOpaqueToken,
  digestToken,
  readSessionCookie,
} from "@/lib/auth/security";

const sessionLifetimeSeconds = 60 * 60 * 24 * 7;

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  phone: string | null;
  roles: Array<{
    role: "super_admin" | "field_admin" | "teacher" | "education_manager";
    fieldId: number | null;
    fieldTitle: string | null;
    permissions: string[];
  }>;
  learningFields: Array<{ id: number; slug: string; title: string }>;
  targetGroups: Array<{ id: number; slug: string; title: string }>;
}

export async function createSession(
  db: D1Repository,
  userId: string,
): Promise<{ token: string; expiresAt: string }> {
  const token = createOpaqueToken();
  const expiresAt = new Date(
    Date.now() + sessionLifetimeSeconds * 1000,
  ).toISOString();

  await db.run(
    `INSERT INTO auth_sessions (id, user_id, session_digest, expires_at)
     VALUES (?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, await digestToken(token), expiresAt],
  );

  return { token, expiresAt };
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
): void {
  response.cookies.set({
    name: authCookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: authCookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function getAuthenticatedUser(
  db: D1Repository,
  request: Request,
): Promise<AuthenticatedUser | null> {
  const token = readSessionCookie(request);
  if (!token) {
    return null;
  }

  const sessionDigest = await digestToken(token);
  const profile = await db.first<{
    user_id: string;
    email_normalized: string;
    display_name: string | null;
    phone: string | null;
  }>(
    `SELECT s.user_id, c.email_normalized, p.display_name, p.phone
     FROM auth_sessions s
     JOIN auth_credentials c ON c.user_id = s.user_id
     JOIN profiles p ON p.id = s.user_id
     WHERE s.session_digest = ?
       AND s.revoked_at IS NULL
       AND s.expires_at > CURRENT_TIMESTAMP
       AND c.status = 'active'`,
    [sessionDigest],
  );

  if (!profile) {
    return null;
  }

  const [superAdmin, fieldAdmins, staffGrants, learningFields, targetGroups] =
    await Promise.all([
      db.first<{ user_id: string }>(
        `SELECT user_id FROM hts_super_admin
         WHERE id = 1 AND user_id = ? AND is_active = 1`,
        [profile.user_id],
      ),
      db.all<{ field_id: number; title: string }>(
        `SELECT a.field_id, f.title
         FROM hts_field_admins a
         JOIN learning_fields f ON f.id = a.field_id
         WHERE a.user_id = ?
           AND a.status = 'active'
           AND a.revoked_at IS NULL
           AND f.is_active = 1
           AND (a.expires_at IS NULL OR a.expires_at > CURRENT_TIMESTAMP)`,
        [profile.user_id],
      ),
      db.all<{ role: "teacher" | "education_manager"; field_id: number; title: string; permission: string }>(
        `SELECT g.role, g.field_id, f.title, g.permission
         FROM hts_role_grants g
         JOIN learning_fields f ON f.id = g.field_id
         WHERE g.user_id = ?
           AND g.status = 'active'
           AND g.revoked_at IS NULL
           AND f.is_active = 1
           AND (g.expires_at IS NULL OR g.expires_at > CURRENT_TIMESTAMP)`,
        [profile.user_id],
      ),
      db.all<{ id: number; slug: string; title: string }>(
        `SELECT f.id, f.slug, f.title
         FROM user_learning_fields u
         JOIN learning_fields f ON f.id = u.field_id
         WHERE u.user_id = ? AND f.is_active = 1
         ORDER BY f.sort_order`,
        [profile.user_id],
      ),
      db.all<{ id: number; slug: string; title: string }>(
        `SELECT g.id, g.slug, g.title
         FROM user_target_groups u
         JOIN target_groups g ON g.id = u.target_group_id
         WHERE u.user_id = ? AND g.is_active = 1
         ORDER BY g.sort_order, g.id`,
        [profile.user_id],
      ),
    ]);

  const roles: AuthenticatedUser["roles"] = [];
  if (superAdmin) {
    roles.push({
      role: "super_admin",
      fieldId: null,
      fieldTitle: null,
      permissions: ["*"],
    });
  }

  for (const grant of fieldAdmins) {
    roles.push({
      role: "field_admin",
      fieldId: grant.field_id,
      fieldTitle: grant.title,
      permissions: ["learning_field.manage", "admin_requests.read"],
    });
  }

  const grantMap = new Map<string, AuthenticatedUser["roles"][number]>();
  for (const grant of staffGrants) {
    const key = `${grant.role}:${grant.field_id}`;
    const existing = grantMap.get(key);
    if (existing) {
      existing.permissions.push(grant.permission);
    } else {
      grantMap.set(key, {
        role: grant.role,
        fieldId: grant.field_id,
        fieldTitle: grant.title,
        permissions: [grant.permission],
      });
    }
  }
  roles.push(...grantMap.values());

  return {
    id: profile.user_id,
    email: profile.email_normalized,
    displayName: profile.display_name ?? "",
    phone: profile.phone,
    roles,
    learningFields,
    targetGroups,
  };
}

export async function requireAuthenticatedUser(
  db: D1Repository,
  request: Request,
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(db, request);
  if (!user) {
    throw new AuthApiError(
      401,
      "authentication_required",
      "Vui lòng đăng nhập để tiếp tục.",
    );
  }
  return user;
}

export function requireSuperAdmin(user: AuthenticatedUser): void {
  if (!user.roles.some((role) => role.role === "super_admin")) {
    throw new AuthApiError(
      403,
      "super_admin_required",
      "Chức năng này chỉ dành cho Super Admin đã được xác thực.",
    );
  }
}

export async function writeAuthEvent(
  db: D1Repository,
  event: {
    type: string;
    actorUserId?: string | null;
    subjectUserId?: string | null;
    outcome: "success" | "failure";
  },
): Promise<void> {
  await db.run(
    `INSERT INTO hts_auth_events
      (id, event_type, actor_user_id, subject_user_id, outcome)
     VALUES (?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(),
      event.type,
      event.actorUserId ?? null,
      event.subjectUserId ?? null,
      event.outcome,
    ],
  );
}

export async function consumeIpRateLimit(
  db: D1Repository,
  request: Request,
  bucketName: string,
  maximumAttempts: number,
  windowSeconds: number,
  blockSeconds: number,
): Promise<void> {
  const ipAddress = request.headers.get("cf-connecting-ip") ?? "unknown";
  const bucketHash = await digestToken(`${bucketName}:${ipAddress}`);
  const now = Math.floor(Date.now() / 1000);
  const windowStartedAt = now - windowSeconds;
  const row = await db.first<{ attempts: number; blocked_until: number }>(
    `INSERT INTO auth_rate_limits
       (bucket_hash, window_started_at, attempts, blocked_until, updated_at)
     VALUES (?, ?, 1, 0, CURRENT_TIMESTAMP)
     ON CONFLICT(bucket_hash) DO UPDATE SET
       attempts = CASE
         WHEN auth_rate_limits.window_started_at <= ? THEN 1
         ELSE auth_rate_limits.attempts + 1
       END,
       window_started_at = CASE
         WHEN auth_rate_limits.window_started_at <= ? THEN excluded.window_started_at
         ELSE auth_rate_limits.window_started_at
       END,
       blocked_until = CASE
         WHEN auth_rate_limits.blocked_until > ? THEN auth_rate_limits.blocked_until
         WHEN (CASE
           WHEN auth_rate_limits.window_started_at <= ? THEN 1
           ELSE auth_rate_limits.attempts + 1
         END) >= ? THEN ?
         ELSE 0
       END,
       updated_at = CURRENT_TIMESTAMP
     RETURNING attempts, blocked_until`,
    [
      bucketHash,
      now,
      windowStartedAt,
      windowStartedAt,
      now,
      windowStartedAt,
      maximumAttempts,
      now + blockSeconds,
    ],
  );

  if (!row) {
    throw new Error("D1 did not return the rate-limit result.");
  }
  if (row.blocked_until > now || row.attempts > maximumAttempts) {
    throw new AuthApiError(
      429,
      "rate_limited",
      "Đã vượt quá số lần yêu cầu. Vui lòng thử lại sau.",
    );
  }
}

export async function revokeUserSessions(
  db: D1Repository,
  userId: string,
  reason: string,
  exceptSessionId?: string,
): Promise<void> {
  if (exceptSessionId) {
    await db.run(
      `UPDATE auth_sessions
       SET revoked_at = CURRENT_TIMESTAMP, revoked_reason = ?
       WHERE user_id = ? AND revoked_at IS NULL AND id != ?`,
      [reason, userId, exceptSessionId],
    );
  } else {
    await db.run(
      `UPDATE auth_sessions
       SET revoked_at = CURRENT_TIMESTAMP, revoked_reason = ?
       WHERE user_id = ? AND revoked_at IS NULL`,
      [reason, userId],
    );
  }
}
