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

type LessonVersionsRouteContext = {
  params: Promise<{ lessonId: string }>;
};

export async function POST(
  request: Request,
  { params }: LessonVersionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const lessonId = Number((await params).lessonId);
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }

    const body = await readJsonObject(currentRequest, 60_000);
    const content = requiredString(body.content, "content", 50_000);
    const versionId = crypto.randomUUID();
    const results = await db.batch([
      {
        sql: `INSERT INTO lesson_content_versions
                (id, lesson_id, version, content, status, created_by)
              SELECT ?, l.id,
                     COALESCE((
                       SELECT MAX(previous.version) + 1
                       FROM lesson_content_versions previous
                       WHERE previous.lesson_id = l.id
                     ), 1),
                     ?, 'draft', ?
              FROM lessons l
              JOIN courses c ON c.id = l.course_id
              JOIN military_program_metadata m ON m.course_id = c.id
              WHERE l.id = ? AND c.field_id = ?
                AND NOT EXISTS (
                  SELECT 1 FROM lesson_content_versions pending
                  WHERE pending.lesson_id = l.id
                    AND pending.status IN ('draft', 'pending_review')
                )`,
        values: [
          versionId,
          content,
          context.user.id,
          lessonId,
          context.fieldId,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_lesson.version_created',
                     'education', 'lesson_content_version', ?,
                     ?, 'success', 'Lesson content draft version created'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          versionId,
          context.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1) {
      throw new AuthApiError(
        409,
        "lesson_version_not_editable",
        "Không thể tạo phiên bản mới khi chưa xử lý xong bản nháp hoặc lượt rà soát trước.",
      );
    }

    const version = await db.first<{ version: number }>(
      `SELECT version FROM lesson_content_versions
       WHERE id = ? AND lesson_id = ?`,
      [versionId, lessonId],
    );
    if (!version) {
      throw new Error("Created lesson version could not be read back from D1.");
    }

    return NextResponse.json(
      { id: versionId, lessonId, version: version.version, status: "draft" },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
