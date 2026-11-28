import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import {
  getMilitaryActorRole,
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";
import {
  parseLearningResourceUpload,
  removeLearningResourceFile,
  storeLearningResourceFile,
} from "@/lib/military/resources";

type ResourceVersionsRouteContext = {
  params: Promise<{ resourceId: string }>;
};

function parseResourceId(value: string): number {
  const resourceId = Number(value);
  if (!Number.isSafeInteger(resourceId) || resourceId < 1) {
    throw new AuthApiError(
      400,
      "invalid_resource_id",
      "Mã học liệu không hợp lệ.",
    );
  }
  return resourceId;
}

export async function POST(
  request: Request,
  { params }: ResourceVersionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const resourceId = parseResourceId((await params).resourceId);
    const resource = await db.first<{ id: number }>(
      `SELECT r.id
       FROM learning_resources r
       JOIN lessons l ON l.id = r.lesson_id
       JOIN courses c ON c.id = l.course_id
       WHERE r.id = ? AND c.field_id = ?
         AND EXISTS (
           SELECT 1 FROM military_program_metadata m
           WHERE m.course_id = c.id
         )`,
      [resourceId, context.fieldId],
    );
    if (!resource) {
      throw new AuthApiError(
        404,
        "resource_not_found",
        "Không tìm thấy học liệu trong lĩnh vực này.",
      );
    }
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
    const upload = await parseLearningResourceUpload(formData);
    const versionId = crypto.randomUUID();
    const { bucket, storageKey } = await storeLearningResourceFile(
      upload.file,
      versionId,
      upload.mediaType,
    );
    try {
      const results = await db.batch([
        {
          sql: `INSERT INTO learning_resource_versions
                  (id, resource_id, version, title, author, source,
                   usage_license, storage_object_key, media_type, byte_size,
                   status, created_by)
                SELECT ?, ?, COALESCE(MAX(version), 0) + 1, ?, ?, ?, ?, ?,
                       ?, ?, 'pending_review', ?
                FROM learning_resource_versions
                WHERE resource_id = ?`,
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
            resourceId,
          ],
        },
        {
          sql: `INSERT INTO activity_logs
                  (actor_user_id, actor_role, action, category, entity_type,
                   entity_id, field_id, outcome, summary)
                SELECT ?, ?, 'military_resource.version_submitted',
                       'education', 'learning_resource', ?, ?, 'success',
                       'Learning resource revision submitted for review'
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
        throw new AuthApiError(
          409,
          "resource_version_not_saved",
          "Không thể lưu phiên bản học liệu mới.",
        );
      }

      return NextResponse.json(
        { resourceId, versionId, status: "pending_review" },
        { status: 201, headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      await removeLearningResourceFile(bucket, storageKey);
      throw error;
    }
  });
}
