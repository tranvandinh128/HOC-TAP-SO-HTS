import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import { getMilitaryActorRole, requireMilitaryMembership } from "@/lib/military/access";
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";

type EnrollmentRouteContext = {
  params: Promise<{ courseId: string }>;
};

export async function GET(
  request: Request,
  { params }: EnrollmentRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const canManage = context.user.roles.some(
      (role) =>
        role.role === "super_admin" ||
        (role.fieldId === context.fieldId &&
          (role.role === "field_admin" ||
            role.permissions.includes("military.programs.manage"))),
    );
    if (!canManage) {
      throw new AuthApiError(
        403,
        "military_program_permission_required",
        "Bạn không có quyền xem danh sách học viên.",
      );
    }

    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);
    const enrollments = await db.all<{
      user_id: string;
      display_name: string | null;
      enrollment_status: string;
      enrolled_at: string;
      completed_at: string | null;
    }>(
      `SELECT e.user_id, p.display_name, e.enrollment_status,
              e.enrolled_at, e.completed_at
       FROM course_enrollments e
       JOIN profiles p ON p.id = e.user_id
       JOIN courses c ON c.id = e.course_id
       WHERE e.course_id = ? AND c.field_id = ?
       ORDER BY p.display_name
       LIMIT 500`,
      [courseId, context.fieldId],
    );

    return NextResponse.json(
      { enrollments },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: EnrollmentRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId, {
      publishedOnly: true,
    });

    const enrollment = await db.first<{
      enrollment_status: string;
      enrolled_at: string;
    }>(
      `INSERT INTO course_enrollments (user_id, course_id)
       VALUES (?, ?)
       ON CONFLICT(user_id, course_id) DO NOTHING
       RETURNING enrollment_status, enrolled_at`,
      [context.user.id, courseId],
    );

    if (enrollment) {
      await db.run(
        `INSERT INTO activity_logs
           (actor_user_id, actor_role, action, category, entity_type,
            entity_id, field_id, outcome, summary)
         VALUES (?, ?, 'military_program.enrolled', 'education',
                 'course', ?, ?, 'success', 'Learner enrolled in program')`,
        [
          context.user.id,
          getMilitaryActorRole(context),
          String(courseId),
          context.fieldId,
        ],
      );
    }

    const currentEnrollment =
      enrollment ??
      (await db.first<{ enrollment_status: string; enrolled_at: string }>(
        `SELECT e.enrollment_status, e.enrolled_at
         FROM course_enrollments e
         JOIN courses c ON c.id = e.course_id
         WHERE e.user_id = ? AND e.course_id = ? AND c.field_id = ?`,
        [context.user.id, courseId, context.fieldId],
      ));

    if (!currentEnrollment) {
      throw new Error("Enrollment could not be read back from D1.");
    }

    return NextResponse.json(
      { enrollment: currentEnrollment },
      {
        status: enrollment ? 201 : 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  });
}
