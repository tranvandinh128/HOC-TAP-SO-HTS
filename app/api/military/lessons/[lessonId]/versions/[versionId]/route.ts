import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
} from "@/lib/auth/http";
import {
  getMilitaryActorRole,
  requireMilitaryMembership,
} from "@/lib/military/access";

type VersionRouteContext = {
  params: Promise<{ lessonId: string; versionId: string }>;
};

export async function PATCH(
  request: Request,
  { params }: VersionRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const { lessonId: lessonIdText, versionId } = await params;
    const lessonId = Number(lessonIdText);
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }

    const version = await db.first<{ status: string; created_by: string }>(
      `SELECT v.status, v.created_by
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
    if (version.created_by !== context.user.id) {
      throw new AuthApiError(
        403,
        "lesson_version_owner_required",
        "Chỉ người tạo phiên bản mới được trình duyệt.",
      );
    }
    if (version.status !== "draft" && version.status !== "rejected") {
      throw new AuthApiError(
        409,
        "lesson_version_not_submittable",
        "Phiên bản hiện tại không thể trình duyệt.",
      );
    }

    const results = await db.batch([
      {
        sql: `UPDATE lesson_content_versions
              SET status = 'pending_review', reviewed_by = NULL,
                  review_note = NULL, reviewed_at = NULL
              WHERE id = ? AND lesson_id = ?
                AND status IN ('draft', 'rejected')`,
        values: [versionId, lessonId],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_lesson.submitted',
                     'education', 'lesson_content_version', ?,
                     ?, 'success', 'Lesson content submitted for review'
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
        "lesson_version_not_submittable",
        "Phiên bản đã được xử lý hoặc không còn ở trạng thái có thể trình duyệt.",
      );
    }

    return NextResponse.json(
      { id: versionId, status: "pending_review" },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
