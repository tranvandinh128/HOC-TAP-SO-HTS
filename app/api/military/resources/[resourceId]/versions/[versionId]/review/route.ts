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
import { parseMilitaryCourseId } from "@/lib/military/programs";

type ResourceReviewRouteContext = {
  params: Promise<{ resourceId: string; versionId: string }>;
};

export async function PATCH(
  request: Request,
  { params }: ResourceReviewRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const { resourceId: resourceIdValue, versionId } = await params;
    const resourceId = Number(resourceIdValue);
    if (!Number.isSafeInteger(resourceId) || resourceId < 1) {
      throw new AuthApiError(
        400,
        "invalid_resource_id",
        "Mã học liệu không hợp lệ.",
      );
    }
    if (!/^[0-9a-f-]{36}$/i.test(versionId)) {
      throw new AuthApiError(
        400,
        "invalid_resource_version_id",
        "Mã phiên bản học liệu không hợp lệ.",
      );
    }
    const body = await readJsonObject(currentRequest);
    const decision = requiredString(body.decision, "decision", 20);
    if (decision !== "approved" && decision !== "rejected") {
      throw new AuthApiError(
        400,
        "invalid_review_decision",
        "Quyết định rà soát không hợp lệ.",
      );
    }
    const reviewNote = requiredString(body.reviewNote, "reviewNote", 1000);
    const version = await db.first<{ course_id: number }>(
      `SELECT c.id AS course_id
       FROM learning_resource_versions v
       JOIN learning_resources r ON r.id = v.resource_id
       JOIN lessons l ON l.id = r.lesson_id
       JOIN courses c ON c.id = l.course_id
       WHERE v.id = ? AND v.resource_id = ? AND c.field_id = ?
         AND EXISTS (
           SELECT 1 FROM military_program_metadata m
           WHERE m.course_id = c.id
         )`,
      [versionId, resourceId, context.fieldId],
    );
    if (!version) {
      throw new AuthApiError(
        404,
        "resource_version_not_found",
        "Không tìm thấy phiên bản học liệu.",
      );
    }
    const courseId = parseMilitaryCourseId(String(version.course_id));

    const results = await db.batch([
      {
        sql: `UPDATE learning_resource_versions
              SET status = ?
              WHERE id = ? AND resource_id = ? AND status = 'pending_review'
                AND created_by != ?
                AND EXISTS (
                  SELECT 1 FROM learning_resources r
                  JOIN lessons l ON l.id = r.lesson_id
                  JOIN courses c ON c.id = l.course_id
                  WHERE r.id = ? AND c.field_id = ?
                    AND EXISTS (
                      SELECT 1 FROM military_program_metadata m
                      WHERE m.course_id = c.id
                    )
                )`,
        values: [
          decision,
          versionId,
          resourceId,
          context.user.id,
          resourceId,
          context.fieldId,
        ],
      },
      {
        sql: `INSERT INTO learning_resource_version_reviews
                (id, resource_version_id, reviewer_user_id, decision,
                 review_note)
              SELECT ?, ?, ?, ?, ?
              WHERE changes() = 1`,
        values: [
          crypto.randomUUID(),
          versionId,
          context.user.id,
          decision,
          reviewNote,
        ],
      },
      {
        sql: `UPDATE learning_resources
              SET status = CASE
                    WHEN ? = 'approved' THEN 'published'
                    WHEN EXISTS (
                      SELECT 1 FROM learning_resource_versions
                      WHERE resource_id = ? AND status = 'approved'
                    ) THEN 'published'
                    ELSE 'draft'
                  END,
                  title = COALESCE((
                    SELECT title FROM learning_resource_versions
                    WHERE resource_id = ? AND status = 'approved'
                    ORDER BY version DESC LIMIT 1
                  ), title),
                  description = COALESCE((
                    SELECT source FROM learning_resource_versions
                    WHERE resource_id = ? AND status = 'approved'
                    ORDER BY version DESC LIMIT 1
                  ), description),
                  file_size = COALESCE((
                    SELECT byte_size FROM learning_resource_versions
                    WHERE resource_id = ? AND status = 'approved'
                    ORDER BY version DESC LIMIT 1
                  ), file_size),
                  updated_at = CURRENT_TIMESTAMP
              WHERE id = ? AND changes() = 1`,
        values: [
          decision,
          resourceId,
          resourceId,
          resourceId,
          resourceId,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_resource.version_reviewed',
                     'education', 'learning_resource', ?, ?, 'success',
                     'Learning resource version reviewed'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          String(resourceId),
          context.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1 || results[1].meta.changes !== 1) {
      throw new AuthApiError(
        409,
        "resource_version_not_reviewable",
        "Không thể tự duyệt phiên bản của mình hoặc phiên bản không còn chờ rà soát.",
      );
    }

    return NextResponse.json(
      { resourceId, courseId, versionId, status: decision },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
