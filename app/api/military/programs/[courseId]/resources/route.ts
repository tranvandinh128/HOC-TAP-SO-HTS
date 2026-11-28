import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import {
  canManageMilitaryPrograms,
  getMilitaryActorRole,
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";
import {
  parseLearningResourceUpload,
  removeLearningResourceFile,
  storeLearningResourceFile,
} from "@/lib/military/resources";

type ResourcesRouteContext = {
  params: Promise<{ courseId: string }>;
};

export async function GET(
  request: Request,
  { params }: ResourcesRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const courseId = parseMilitaryCourseId((await params).courseId);
    const canManage = canManageMilitaryPrograms(context);
    await requireMilitaryCourse(db, context.fieldId, courseId, {
      publishedOnly: !canManage,
    });

    const resources = await db.all<{
      resource_id: number;
      lesson_id: number;
      lesson_title: string;
      title: string;
      version_id: string;
      version: number;
      author: string | null;
      source: string;
      usage_license: string;
      media_type: string;
      byte_size: number;
      status: string;
      created_at: string;
      created_by_current_user: number;
    }>(
      `SELECT r.id AS resource_id, r.lesson_id, l.title AS lesson_title,
              v.title, v.id AS version_id, v.version, v.author, v.source,
              v.usage_license, v.media_type, v.byte_size, v.status,
              v.created_at,
              CASE WHEN v.created_by = ? THEN 1 ELSE 0 END
                AS created_by_current_user
       FROM learning_resources r
       JOIN lessons l ON l.id = r.lesson_id
       JOIN courses c ON c.id = l.course_id
       JOIN learning_resource_versions v ON v.resource_id = r.id
       WHERE c.id = ? AND c.field_id = ?
         AND (? = 1 OR (
           c.status = 'published' AND r.status = 'published'
           AND v.status = 'approved'
         ))
       ORDER BY r.title, v.version DESC
       LIMIT 500`,
      [context.user.id, courseId, context.fieldId, canManage ? 1 : 0],
    );

    return NextResponse.json(
      { resources, canManage },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: ResourcesRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    if (
      !(currentRequest.headers.get("content-type") ?? "")
        .toLowerCase()
        .includes("multipart/form-data")
    ) {
      throw new AuthApiError(
        415,
        "unsupported_content_type",
        "Tài liệu phải được gửi bằng multipart/form-data.",
      );
    }
    const contentLength = Number(
      currentRequest.headers.get("content-length") ?? 0,
    );
    if (Number.isFinite(contentLength) && contentLength > 51 * 1024 * 1024) {
      throw new AuthApiError(
        413,
        "resource_upload_too_large",
        "Yêu cầu tải học liệu vượt quá giới hạn 50 MB.",
      );
    }

    let formData: FormData;
    try {
      formData = await currentRequest.formData();
    } catch {
      throw new AuthApiError(400, "invalid_upload", "Không đọc được tệp gửi lên.");
    }

    const lessonId = Number(formData.get("lessonId"));
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }
    const lesson = await db.first<{ id: number }>(
      `SELECT l.id
       FROM lessons l
       JOIN courses c ON c.id = l.course_id
       WHERE l.id = ? AND c.id = ? AND c.field_id = ?`,
      [lessonId, courseId, context.fieldId],
    );
    if (!lesson) {
      throw new AuthApiError(
        404,
        "lesson_not_found",
        "Bài học không thuộc chương trình này.",
      );
    }

    const upload = await parseLearningResourceUpload(formData);
    const versionId = crypto.randomUUID();
    const { bucket, storageKey } = await storeLearningResourceFile(
      upload.file,
      versionId,
      upload.mediaType,
    );
    let resourceId: number | null = null;
    try {
      const resource = await db.first<{ id: number }>(
        `INSERT INTO learning_resources
           (lesson_id, title, description, resource_type, resource_url,
            file_size, status)
         VALUES (?, ?, ?, ?, ?, ?, 'draft')
         RETURNING id`,
        [
          lessonId,
          upload.title,
          upload.source,
          upload.mediaType === "application/pdf" ? "pdf" : "document",
          `/api/military/resources/versions/${versionId}/file`,
          upload.file.size,
        ],
      );
      if (!resource) {
        throw new Error("Learning resource metadata was not saved.");
      }
      resourceId = resource.id;

      const results = await db.batch([
        {
          sql: `INSERT INTO learning_resource_versions
                  (id, resource_id, version, title, author, source,
                   usage_license, storage_object_key, media_type, byte_size,
                   status, created_by)
                VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 'pending_review', ?)`,
          values: [
            versionId,
            resourceId,
            upload.title,
            upload.author,
            upload.source,
            upload.usageLicense,
            storageKey,
            upload.mediaType,
            upload.file.size,
            context.user.id,
          ],
        },
        {
          sql: `INSERT INTO activity_logs
                  (actor_user_id, actor_role, action, category, entity_type,
                   entity_id, field_id, outcome, summary)
                SELECT ?, ?, 'military_resource.version_submitted',
                       'education', 'learning_resource', ?, ?, 'success',
                       'Learning resource submitted for review'
                WHERE changes() = 1`,
          values: [
            context.user.id,
            getMilitaryActorRole(context),
            String(resourceId),
            context.fieldId,
          ],
        },
      ]);
      if (results[0].meta.changes !== 1) {
        throw new Error("Learning resource version was not saved.");
      }

      return NextResponse.json(
        { resourceId, versionId, status: "pending_review" },
        { status: 201, headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      if (resourceId !== null) {
        await db.run(
          `DELETE FROM learning_resources
           WHERE id = ? AND NOT EXISTS (
             SELECT 1 FROM learning_resource_versions
             WHERE resource_id = ?
           )`,
          [resourceId, resourceId],
        );
      }
      await removeLearningResourceFile(bucket, storageKey);
      throw error;
    }
  });
}
