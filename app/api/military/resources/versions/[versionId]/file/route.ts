import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import {
  canManageMilitaryPrograms,
  requireMilitaryMembership,
} from "@/lib/military/access";
import { requireMilitaryCourse } from "@/lib/military/programs";
import { getPrivateLearningFilesBucket, sanitizeOriginalFilename } from "@/lib/learning/submission-files";

type ResourceFileRouteContext = {
  params: Promise<{ versionId: string }>;
};

const fileExtensions: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

export async function GET(
  request: Request,
  { params }: ResourceFileRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const { versionId } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(versionId)) {
      throw new AuthApiError(
        400,
        "invalid_resource_version_id",
        "Mã phiên bản học liệu không hợp lệ.",
      );
    }
    const canManage = canManageMilitaryPrograms(context);
    const resource = await db.first<{
      course_id: number;
      version: number;
      title: string;
      storage_object_key: string;
      media_type: string;
      byte_size: number;
      status: string;
    }>(
      `SELECT c.id AS course_id, v.version, v.title,
              v.storage_object_key, v.media_type, v.byte_size, v.status
       FROM learning_resource_versions v
       JOIN learning_resources r ON r.id = v.resource_id
       JOIN lessons l ON l.id = r.lesson_id
       JOIN courses c ON c.id = l.course_id
       WHERE v.id = ? AND c.field_id = ?
         AND EXISTS (
           SELECT 1 FROM military_program_metadata m
           WHERE m.course_id = c.id
         )
         AND (? = 1 OR (v.status = 'approved' AND r.status = 'published'))`,
      [versionId, context.fieldId, canManage ? 1 : 0],
    );
    if (!resource) {
      throw new AuthApiError(
        404,
        "resource_file_not_found",
        "Không tìm thấy tài liệu đã được duyệt.",
      );
    }
    await requireMilitaryCourse(
      db,
      context.fieldId,
      resource.course_id,
      { publishedOnly: !canManage },
    );

    const bucket = await getPrivateLearningFilesBucket();
    const object = await bucket.get(resource.storage_object_key);
    if (!object) {
      console.error("[military] resource metadata has no stored object.", {
        versionId,
      });
      throw new AuthApiError(
        404,
        "resource_file_not_found",
        "Tệp học liệu không còn trong kho lưu trữ.",
      );
    }
    const extension = fileExtensions[resource.media_type];
    if (!extension) {
      throw new AuthApiError(
        415,
        "resource_file_type_unsupported",
        "Định dạng tài liệu không được hỗ trợ.",
      );
    }
    const objectName = sanitizeOriginalFilename(
      object.customMetadata?.originalFilename ??
        `${resource.title}-v${resource.version}.${extension}`,
    );

    return new NextResponse(object.body, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(objectName)}`,
        "Content-Length": String(resource.byte_size),
        "Content-Type": resource.media_type,
        "X-Content-Type-Options": "nosniff",
      },
    });
  });
}
