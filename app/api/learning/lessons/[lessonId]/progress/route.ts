import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
} from "@/lib/auth/http";
import {
  requireLessonEnrollment,
  requireLessonSubmissionAccess,
} from "@/lib/learning/submission-access";

type LessonProgressRouteContext = {
  params: Promise<{ lessonId: string }>;
};

function parseLessonId(value: string): number {
  const lessonId = Number(value);
  if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
    throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
  }
  return lessonId;
}

export async function GET(
  request: Request,
  { params }: LessonProgressRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const lessonId = parseLessonId((await params).lessonId);
    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );

    if (!access.canManage) {
      await requireLessonEnrollment(db, access);
      const progress = await db.first<{
        progress_percent: number;
        is_completed: number;
        started_at: string | null;
        completed_at: string | null;
        last_accessed_at: string;
      }>(
        `SELECT progress_percent, is_completed, started_at,
                completed_at, last_accessed_at
         FROM learning_progress
         WHERE user_id = ? AND lesson_id = ?`,
        [access.user.id, lessonId],
      );
      return NextResponse.json(
        { progress: progress ?? null, selfReported: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const progress = await db.all<{
      user_id: string;
      display_name: string | null;
      progress_percent: number;
      is_completed: number;
      started_at: string | null;
      completed_at: string | null;
    }>(
      `SELECT e.user_id, p.display_name,
              COALESCE(lp.progress_percent, 0) AS progress_percent,
              COALESCE(lp.is_completed, 0) AS is_completed,
              lp.started_at, lp.completed_at
       FROM course_enrollments e
       JOIN profiles p ON p.id = e.user_id
       LEFT JOIN learning_progress lp
         ON lp.user_id = e.user_id AND lp.lesson_id = ?
       WHERE e.course_id = ?
         AND e.enrollment_status IN ('enrolled', 'completed')
       ORDER BY p.display_name
       LIMIT 500`,
      [lessonId, access.courseId],
    );

    return NextResponse.json(
      { progress, selfReported: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: LessonProgressRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const lessonId = parseLessonId((await params).lessonId);
    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    await requireLessonEnrollment(db, access);

    const body = await readJsonObject(currentRequest);
    const progressPercent = body.progressPercent;
    if (
      typeof progressPercent !== "number" ||
      !Number.isInteger(progressPercent) ||
      progressPercent < 0 ||
      progressPercent > 100
    ) {
      throw new AuthApiError(
        400,
        "invalid_progress",
        "Tiến độ phải là số nguyên từ 0 đến 100.",
      );
    }

    const isCompleted = progressPercent === 100 ? 1 : 0;
    const progress = await db.first<{
      progress_percent: number;
      is_completed: number;
      started_at: string;
      completed_at: string | null;
      last_accessed_at: string;
    }>(
      `INSERT INTO learning_progress
         (user_id, lesson_id, progress_percent, is_completed,
          started_at, completed_at, last_accessed_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP,
               CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END,
               CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         progress_percent = MAX(
           learning_progress.progress_percent,
           excluded.progress_percent
         ),
         is_completed = MAX(
           learning_progress.is_completed,
           excluded.is_completed
         ),
         started_at = COALESCE(
           learning_progress.started_at,
           CURRENT_TIMESTAMP
         ),
         completed_at = CASE
           WHEN MAX(learning_progress.is_completed, excluded.is_completed) = 1
             THEN COALESCE(
               learning_progress.completed_at,
               CURRENT_TIMESTAMP
             )
           ELSE learning_progress.completed_at
         END,
         last_accessed_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
       RETURNING progress_percent, is_completed, started_at,
                 completed_at, last_accessed_at`,
      [
        access.user.id,
        lessonId,
        progressPercent,
        isCompleted,
        isCompleted,
      ],
    );

    if (!progress) {
      throw new Error("Lesson progress was not returned by D1.");
    }

    return NextResponse.json(
      { progress, selfReported: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
