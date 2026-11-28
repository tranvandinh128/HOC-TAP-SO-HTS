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

type InstructorsRouteContext = {
  params: Promise<{ courseId: string }>;
};

export async function GET(
  request: Request,
  { params }: InstructorsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const instructors = await db.all<{
      user_id: string;
      display_name: string | null;
      assigned_at: string;
    }>(
      `SELECT i.instructor_user_id AS user_id, p.display_name, i.assigned_at
       FROM military_program_instructors i
       JOIN profiles p ON p.id = i.instructor_user_id
       JOIN courses c ON c.id = i.course_id
       WHERE i.course_id = ? AND c.field_id = ? AND i.revoked_at IS NULL
       ORDER BY p.display_name
       LIMIT 100`,
      [courseId, context.fieldId],
    );

    return NextResponse.json(
      { instructors },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: InstructorsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const body = await readJsonObject(currentRequest);
    const instructorUserId = requiredString(
      body.instructorUserId,
      "instructorUserId",
      200,
    );
    const eligible = await db.first<{ user_id: string }>(
      `SELECT p.id AS user_id
       FROM profiles p
       WHERE p.id = ?
         AND EXISTS (
           SELECT 1 FROM hts_role_grants g
           WHERE g.user_id = p.id AND g.field_id = ?
             AND g.role = 'teacher' AND g.status = 'active'
             AND g.revoked_at IS NULL
             AND (g.expires_at IS NULL OR g.expires_at > CURRENT_TIMESTAMP)
         )
         AND EXISTS (
           SELECT 1 FROM user_learning_fields f
           WHERE f.user_id = p.id AND f.field_id = ?
         )
         AND EXISTS (
           SELECT 1 FROM learning_field_membership_reviews r
           WHERE r.user_id = p.id AND r.field_id = ?
             AND r.id = (
               SELECT latest.id
               FROM learning_field_membership_reviews latest
               WHERE latest.user_id = p.id AND latest.field_id = ?
               ORDER BY latest.created_at DESC, latest.rowid DESC
               LIMIT 1
             )
             AND r.status = 'approved'
         )`,
      [
        instructorUserId,
        context.fieldId,
        context.fieldId,
        context.fieldId,
        context.fieldId,
      ],
    );

    if (!eligible) {
      throw new AuthApiError(
        400,
        "instructor_not_eligible",
        "Người được phân công phải là giáo viên có quyền đang hoạt động và membership đã được duyệt trong lĩnh vực này.",
      );
    }

    const results = await db.batch([
      {
        sql: `INSERT INTO military_program_instructors
                (course_id, instructor_user_id, assigned_by)
              VALUES (?, ?, ?)
              ON CONFLICT(course_id, instructor_user_id) DO UPDATE SET
                assigned_by = excluded.assigned_by,
                assigned_at = CURRENT_TIMESTAMP,
                revoked_at = NULL`,
        values: [courseId, instructorUserId, context.user.id],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_program.instructor_assigned',
                     'education', 'course', ?, ?, 'success',
                     'Program instructor assignment updated'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          String(courseId),
          context.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1) {
      throw new Error("Program instructor assignment was not saved.");
    }

    return NextResponse.json(
      { courseId, assigned: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function DELETE(
  request: Request,
  { params }: InstructorsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);
    const instructorUserId = new URL(currentRequest.url).searchParams.get(
      "instructorUserId",
    );

    if (!instructorUserId || instructorUserId.length > 200) {
      throw new AuthApiError(
        400,
        "invalid_instructor",
        "Mã giáo viên không hợp lệ.",
      );
    }

    const results = await db.batch([
      {
        sql: `UPDATE military_program_instructors
              SET revoked_at = CURRENT_TIMESTAMP
              WHERE course_id = ? AND instructor_user_id = ?
                AND revoked_at IS NULL
                AND EXISTS (
                  SELECT 1 FROM courses
                  WHERE id = ? AND field_id = ?
                )`,
        values: [
          courseId,
          instructorUserId,
          courseId,
          context.fieldId,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_program.instructor_revoked',
                     'education', 'course', ?, ?, 'success',
                     'Program instructor assignment revoked'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          String(courseId),
          context.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1) {
      throw new AuthApiError(
        404,
        "instructor_assignment_not_found",
        "Không tìm thấy phân công đang hoạt động.",
      );
    }

    return NextResponse.json(
      { courseId, revoked: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
