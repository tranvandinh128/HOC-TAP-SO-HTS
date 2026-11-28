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

type ReviewVersionRouteContext = {
  params: Promise<{ lessonId: string; versionId: string }>;
};

export async function PATCH(
  request: Request,
  { params }: ReviewVersionRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const { lessonId: lessonIdText, versionId } = await params;
    const lessonId = Number(lessonIdText);
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }

    const body = await readJsonObject(currentRequest);
    const decision = requiredString(body.decision, "decision", 16);
    const reviewNote = requiredString(body.reviewNote, "reviewNote", 1000);
    if (decision !== "approved" && decision !== "rejected") {
      throw new AuthApiError(
        400,
        "invalid_decision",
        "Quyết định phải là approved hoặc rejected.",
      );
    }

    const version = await db.first<{ created_by: string }>(
      `SELECT v.created_by
       FROM lesson_content_versions v
       JOIN lessons l ON l.id = v.lesson_id
       JOIN courses c ON c.id = l.course_id
       JOIN military_program_metadata m ON m.course_id = c.id
       WHERE v.id = ? AND v.lesson_id = ? AND c.field_id = ?`,
      [versionId, lessonId, context.fieldId],
    );
    if (!version) {
      throw new AuthApiError(404, "lesson_version_not_found", "Không tìm thấy phiên bản.");
    }
    if (version.created_by === context.user.id) {
      throw new AuthApiError(
        403,
        "self_review_not_allowed",
        "Người tạo nội dung không được tự phê duyệt phiên bản đó.",
      );
    }

    const reviewId = crypto.randomUUID();
    const operations = await db.batch([
      {
        sql: `UPDATE lesson_content_versions
              SET status = ?, reviewed_by = ?, review_note = ?,
                  reviewed_at = CURRENT_TIMESTAMP
              WHERE id = ? AND lesson_id = ? AND status = 'pending_review'`,
        values: [decision, context.user.id, reviewNote, versionId, lessonId],
      },
      {
        sql: `INSERT INTO lesson_content_version_reviews
                (id, lesson_content_version_id, reviewer_user_id,
                 decision, review_note)
              SELECT ?, ?, ?, ?, ?
              WHERE changes() = 1`,
        values: [
          reviewId,
          versionId,
          context.user.id,
          decision,
          reviewNote,
        ],
      },
      {
        sql: `UPDATE lessons
              SET content = (
                    SELECT content FROM lesson_content_versions
                    WHERE id = ? AND status = 'approved'
                  ),
                  status = 'published',
                  updated_at = CURRENT_TIMESTAMP
              WHERE id = ? AND ? = 'approved'
                AND changes() = 1
                AND EXISTS (
                  SELECT 1 FROM lesson_content_versions
                  WHERE id = ? AND lesson_id = ? AND status = 'approved'
                )`,
        values: [versionId, lessonId, decision, versionId, lessonId],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_lesson.reviewed',
                     'education', 'lesson_content_version', ?,
                     ?, 'success', 'Lesson content review completed'
              WHERE EXISTS (
                SELECT 1 FROM lesson_content_version_reviews
                WHERE id = ?
              )`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          versionId,
          context.fieldId,
          reviewId,
        ],
      },
    ]);

    if (operations[0].meta.changes !== 1) {
      throw new AuthApiError(
        409,
        "lesson_version_not_pending",
        "Phiên bản không còn chờ rà soát.",
      );
    }

    return NextResponse.json(
      { id: versionId, status: decision },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
