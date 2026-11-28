import "server-only";

import type { D1Repository } from "@/lib/d1/repository";
import { AuthApiError } from "@/lib/auth/http";
import {
  requireAuthenticatedUser,
  type AuthenticatedUser,
} from "@/lib/auth/service";

export type MilitaryAccessContext = {
  user: AuthenticatedUser;
  fieldId: number;
  membershipApproved: boolean;
};

export async function getMilitaryAccessContext(
  db: D1Repository,
  request: Request,
): Promise<MilitaryAccessContext | null> {
  const user = await requireAuthenticatedUser(db, request).catch((error: unknown) => {
    if (error instanceof AuthApiError && error.status === 401) {
      return null;
    }
    throw error;
  });

  if (!user) {
    return null;
  }

  const field = await db.first<{ id: number }>(
    `SELECT id
     FROM learning_fields
     WHERE slug = 'luc-luong-vu-trang' AND is_active = 1`,
  );

  if (!field) {
    throw new Error("The armed-forces learning field is not configured.");
  }

  if (!user.learningFields.some((item) => item.slug === "luc-luong-vu-trang")) {
    return { user, fieldId: field.id, membershipApproved: false };
  }

  const latestReview = await db.first<{ status: string }>(
    `SELECT status
     FROM learning_field_membership_reviews
     WHERE user_id = ? AND field_id = ?
     ORDER BY created_at DESC, id DESC
     LIMIT 1`,
    [user.id, field.id],
  );

  return {
    user,
    fieldId: field.id,
    membershipApproved: latestReview?.status === "approved",
  };
}

export async function requireMilitaryMembership(
  db: D1Repository,
  request: Request,
): Promise<MilitaryAccessContext> {
  const context = await getMilitaryAccessContext(db, request);

  if (!context) {
    throw new AuthApiError(
      401,
      "authentication_required",
      "Vui lòng đăng nhập để tiếp tục.",
    );
  }

  if (!context.membershipApproved) {
    throw new AuthApiError(
      403,
      "military_membership_unverified",
      "Tư cách thành viên Lực lượng vũ trang chưa được phê duyệt.",
    );
  }

  return context;
}

export async function requireMilitaryProgramManagerAccess(
  db: D1Repository,
  request: Request,
): Promise<MilitaryAccessContext> {
  const context = await getMilitaryAccessContext(db, request);

  if (!context) {
    throw new AuthApiError(
      401,
      "authentication_required",
      "Vui lòng đăng nhập để tiếp tục.",
    );
  }

  requireMilitaryProgramManager(context);
  return context;
}

export function canManageMilitaryPrograms(
  context: MilitaryAccessContext,
): boolean {
  return context.user.roles.some(
    (role) =>
      role.role === "super_admin" ||
      (role.fieldId === context.fieldId &&
        (role.role === "field_admin" ||
          role.permissions.includes("military.programs.manage"))),
  );
}

export function getMilitaryActorRole(
  context: MilitaryAccessContext,
): string {
  return (
    context.user.roles.find(
      (role) =>
        role.role === "super_admin" ||
        role.fieldId === context.fieldId,
    )?.role ?? "learner"
  );
}

export function requireMilitaryProgramManager(
  context: MilitaryAccessContext,
): void {
  if (!canManageMilitaryPrograms(context)) {
    throw new AuthApiError(
      403,
      "military_program_permission_required",
      "Bạn không có quyền quản lý chương trình của lĩnh vực này.",
    );
  }
}
