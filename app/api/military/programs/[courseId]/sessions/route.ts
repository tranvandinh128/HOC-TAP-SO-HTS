import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
  requiredString,
} from "@/lib/auth/http";
import {
  getMilitaryActorRole,
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";

type SessionsRouteContext = {
  params: Promise<{ courseId: string }>;
};

function parseDateTime(value: unknown, fieldName: string): string {
  const dateTime = requiredString(value, fieldName, 40);
  if (!Number.isFinite(Date.parse(dateTime))) {
    throw new AuthApiError(
      400,
      "invalid_datetime",
      `Thời gian ${fieldName} không hợp lệ.`,
    );
  }
  return new Date(dateTime).toISOString();
}

export async function GET(
  request: Request,
  { params }: SessionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const courseId = parseMilitaryCourseId((await params).courseId);
    const canManage = context.user.roles.some(
      (role) =>
        role.role === "super_admin" ||
        (role.fieldId === context.fieldId &&
          (role.role === "field_admin" ||
            role.permissions.includes("military.programs.manage"))),
    );
    await requireMilitaryCourse(db, context.fieldId, courseId, {
      publishedOnly: !canManage,
    });

    const sessions = await db.all<{
      id: string;
      title: string;
      starts_at: string;
      ends_at: string;
      status: string;
    }>(
      `SELECT id, title, starts_at, ends_at, status
       FROM military_program_sessions
       WHERE course_id = ?
       ORDER BY starts_at
       LIMIT 250`,
      [courseId],
    );

    return NextResponse.json(
      { sessions },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: SessionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const body = await readJsonObject(currentRequest);
    const title = requiredString(body.title, "title", 200);
    const startsAt = parseDateTime(body.startsAt, "startsAt");
    const endsAt = parseDateTime(body.endsAt, "endsAt");
    if (Date.parse(endsAt) <= Date.parse(startsAt)) {
      throw new AuthApiError(
        400,
        "invalid_session_range",
        "Thời gian kết thúc phải sau thời gian bắt đầu.",
      );
    }

    const sessionId = crypto.randomUUID();
    await db.batch([
      {
        sql: `INSERT INTO military_program_sessions
                (id, course_id, title, starts_at, ends_at, created_by)
              VALUES (?, ?, ?, ?, ?, ?)`,
        values: [
          sessionId,
          courseId,
          title,
          startsAt,
          endsAt,
          context.user.id,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              VALUES (?, ?, 'military_program.session_created',
                      'education', 'military_program_session', ?, ?,
                      'success', 'Education session scheduled')`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          sessionId,
          context.fieldId,
        ],
      },
    ]);

    return NextResponse.json(
      { id: sessionId, status: "planned" },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
