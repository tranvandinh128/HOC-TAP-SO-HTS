import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import {
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";

type ProgramReportRouteContext = {
  params: Promise<{ courseId: string }>;
};

export async function GET(
  request: Request,
  { params }: ProgramReportRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const report = await db.first<{
      enrollment_count: number;
      completed_enrollment_count: number;
      published_lesson_count: number;
      progress_record_count: number;
      completed_progress_count: number;
      average_progress: number | null;
      result_count: number;
      planned_session_count: number;
    }>(
      `SELECT
         (SELECT COUNT(*) FROM course_enrollments e
          WHERE e.course_id = c.id
            AND e.enrollment_status IN ('enrolled', 'completed'))
           AS enrollment_count,
         (SELECT COUNT(*) FROM course_enrollments e
          WHERE e.course_id = c.id AND e.enrollment_status = 'completed')
           AS completed_enrollment_count,
         (SELECT COUNT(*) FROM lessons l
          WHERE l.course_id = c.id AND l.status = 'published')
           AS published_lesson_count,
         (SELECT COUNT(*) FROM learning_progress p
          JOIN lessons l ON l.id = p.lesson_id
          WHERE l.course_id = c.id)
           AS progress_record_count,
         (SELECT COUNT(*) FROM learning_progress p
          JOIN lessons l ON l.id = p.lesson_id
          WHERE l.course_id = c.id AND p.is_completed = 1)
           AS completed_progress_count,
         (SELECT AVG(p.progress_percent) FROM learning_progress p
          JOIN lessons l ON l.id = p.lesson_id
          WHERE l.course_id = c.id)
           AS average_progress,
         (SELECT COUNT(*) FROM learning_results r
          WHERE r.course_id = c.id)
           AS result_count,
         (SELECT COUNT(*) FROM military_program_sessions s
          WHERE s.course_id = c.id AND s.status = 'planned')
           AS planned_session_count
       FROM courses c
       WHERE c.id = ? AND c.field_id = ?`,
      [courseId, context.fieldId],
    );
    if (!report) {
      throw new AuthApiError(
        404,
        "program_not_found",
        "Không tìm thấy chương trình.",
      );
    }
    const results = await db.all<{
      display_name: string | null;
      lesson_title: string | null;
      score: number | null;
      max_score: number | null;
      result_status: string;
      submitted_at: string;
    }>(
      `SELECT p.display_name, l.title AS lesson_title, r.score,
              r.max_score, r.result_status, r.submitted_at
       FROM learning_results r
       JOIN profiles p ON p.id = r.user_id
       JOIN courses c ON c.id = r.course_id
       LEFT JOIN lessons l ON l.id = r.lesson_id
       WHERE r.course_id = ? AND c.field_id = ?
       ORDER BY r.submitted_at DESC
       LIMIT 500`,
      [courseId, context.fieldId],
    );

    return NextResponse.json(
      { report, results },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
