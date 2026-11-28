import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import { requireLessonSubmissionAccess } from "@/lib/learning/submission-access";

type LearningLessonRouteContext = {
  params: Promise<{ lessonId: string }>;
};

export async function GET(
  request: Request,
  { params }: LearningLessonRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const lessonId = Number((await params).lessonId);
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }

    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    const lesson = await db.first<{
      id: number;
      slug: string;
      title: string;
      content: string | null;
      lesson_type: string;
      course_title: string;
      field_slug: string;
    }>(
      `SELECT l.id, l.slug, l.title, l.content, l.lesson_type,
              c.title AS course_title, f.slug AS field_slug
       FROM lessons l
       JOIN courses c ON c.id = l.course_id
       JOIN learning_fields f ON f.id = c.field_id
       WHERE l.id = ? AND c.id = ? AND c.field_id = ?`,
      [lessonId, access.courseId, access.fieldId],
    );
    if (!lesson) {
      throw new AuthApiError(404, "lesson_not_found", "Không tìm thấy bài học.");
    }

    return NextResponse.json(
      { lesson, canManage: access.canManage },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
