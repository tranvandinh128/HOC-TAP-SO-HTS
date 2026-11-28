import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
} from "@/lib/auth/http";
import {
  getLearningActorRole,
  requireLessonEnrollment,
  requireLessonSubmissionAccess,
} from "@/lib/learning/submission-access";
import {
  getPrivateLearningFilesBucket,
  lessonSubmissionLimits,
  sanitizeOriginalFilename,
  validateLessonSubmissionFile,
} from "@/lib/learning/submission-files";
import type { D1Repository } from "@/lib/d1/repository";

type SubmissionFilesRouteContext = {
  params: Promise<{ lessonId: string; submissionId: string }>;
};

function parseLessonId(value: string): number {
  const lessonId = Number(value);
  if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
    throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
  }
  return lessonId;
}

async function cleanupObject(bucket: R2Bucket, key: string): Promise<void> {
  try {
    await bucket.delete(key);
  } catch (error) {
    console.error("[learning] private submission file cleanup failed.", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    throw error;
  }
}

export async function uploadSubmissionFile(
  request: Request,
  { params }: SubmissionFilesRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const { lessonId: lessonIdText, submissionId } = await params;
    const lessonId = parseLessonId(lessonIdText);
    if (!/^[0-9a-f-]{36}$/i.test(submissionId)) {
      throw new AuthApiError(
        400,
        "invalid_submission_id",
        "Mã bài nộp không hợp lệ.",
      );
    }

    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    await requireLessonEnrollment(db, access);

    const submission = await db.first<{ id: string }>(
      `SELECT id
       FROM lesson_submissions
       WHERE id = ? AND lesson_id = ? AND submitted_by = ?
         AND status = 'draft'`,
      [submissionId, lessonId, access.user.id],
    );
    if (!submission) {
      throw new AuthApiError(
        404,
        "submission_not_found",
        "Không tìm thấy bài nộp đang hoạt động.",
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
        "Tệp phải được gửi bằng multipart/form-data.",
      );
    }
    const contentLength = Number(
      currentRequest.headers.get("content-length") ?? 0,
    );
    if (
      Number.isFinite(contentLength) &&
      contentLength > lessonSubmissionLimits.fileBytes + 1_048_576
    ) {
      throw new AuthApiError(
        413,
        "submission_upload_too_large",
        "Yêu cầu tải tệp vượt quá giới hạn 50 MB.",
      );
    }

    let formData: FormData;
    try {
      formData = await currentRequest.formData();
    } catch {
      throw new AuthApiError(400, "invalid_upload", "Không đọc được tệp gửi lên.");
    }

    const files = formData.getAll("file");
    const formValue = files[0];
    if (files.length !== 1) {
      throw new AuthApiError(
        400,
        "single_file_required",
        "Mỗi yêu cầu chỉ nhận một tệp.",
      );
    }
    if (!(formValue instanceof File)) {
      throw new AuthApiError(400, "file_required", "Vui lòng chọn một tệp.");
    }
    const mediaType = await validateLessonSubmissionFile(formValue);
    const existing = await db.first<{ file_count: number }>(
      `SELECT COUNT(*) AS file_count
       FROM lesson_submission_files
       WHERE submission_id = ?`,
      [submissionId],
    );
    if (
      !existing ||
      existing.file_count >= lessonSubmissionLimits.filesPerSubmission
    ) {
      throw new AuthApiError(
        409,
        "submission_file_limit_reached",
        "Mỗi lần nộp tối đa 5 tệp.",
      );
    }

    const bucket = await getPrivateLearningFilesBucket();
    const fileId = crypto.randomUUID();
    const storageKey = `learning/submissions/${submissionId}/${fileId}`;
    const originalFilename = sanitizeOriginalFilename(formValue.name);
    let results;
    try {
      const storedObject = await bucket.put(storageKey, formValue.stream(), {
        httpMetadata: { contentType: mediaType },
        customMetadata: { submissionId, fileId },
      });
      if (storedObject.size !== formValue.size) {
        throw new Error("Stored lesson submission file size did not match.");
      }

      results = await db.batch([
        {
          sql: `INSERT INTO lesson_submission_files
                  (id, submission_id, storage_object_key, original_filename,
                   media_type, byte_size)
                SELECT ?, s.id, ?, ?, ?, ?
                FROM lesson_submissions s
                WHERE s.id = ? AND s.lesson_id = ?
                  AND s.submitted_by = ? AND s.status = 'draft'
                  AND (
                    SELECT COUNT(*) FROM lesson_submission_files existing
                    WHERE existing.submission_id = s.id
                  ) < ?`,
          values: [
            fileId,
            storageKey,
            originalFilename,
            mediaType,
            formValue.size,
            submissionId,
            lessonId,
            access.user.id,
            lessonSubmissionLimits.filesPerSubmission,
          ],
        },
        {
          sql: `INSERT INTO activity_logs
                  (actor_user_id, actor_role, action, category, entity_type,
                   entity_id, field_id, outcome, summary)
                SELECT ?, ?, 'lesson_submission.file_uploaded', 'education',
                       'lesson_submission', ?, ?, 'success',
                       'Learner attached a lesson submission file'
                WHERE changes() = 1`,
          values: [
            access.user.id,
            getLearningActorRole(access.user, access.fieldId),
            submissionId,
            access.fieldId,
          ],
        },
      ]);
    } catch (error) {
      await cleanupObject(bucket, storageKey);
      throw error;
    }

    if (results[0].meta.changes !== 1) {
      await cleanupObject(bucket, storageKey);
      throw new AuthApiError(
        409,
        "submission_file_limit_reached",
        "Bản nháp đã đạt giới hạn tệp hoặc không còn nhận tệp mới.",
      );
    }

    return NextResponse.json(
      {
        file: {
          id: fileId,
          originalFilename,
          mediaType,
          byteSize: formValue.size,
        },
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function getSubmissionFileResponse(
  db: D1Repository,
  request: Request,
  lessonId: number,
  submissionId: string,
  fileId: string,
): Promise<NextResponse> {
  const access = await requireLessonSubmissionAccess(db, request, lessonId);
  const file = await db.first<{
    submitted_by: string;
    status: string;
    storage_object_key: string;
    original_filename: string;
    media_type: string;
    byte_size: number;
  }>(
    `SELECT s.submitted_by, s.status, f.storage_object_key,
            f.original_filename, f.media_type, f.byte_size
     FROM lesson_submission_files f
     JOIN lesson_submissions s ON s.id = f.submission_id
     WHERE f.id = ? AND s.id = ? AND s.lesson_id = ?
       AND (? = 0 OR s.status != 'draft')`,
    [fileId, submissionId, lessonId, access.canManage ? 1 : 0],
  );
  if (!file || (!access.canManage && file.submitted_by !== access.user.id)) {
    throw new AuthApiError(404, "submission_file_not_found", "Không tìm thấy tệp.");
  }

  const bucket = await getPrivateLearningFilesBucket();
  const object = await bucket.get(file.storage_object_key);
  if (!object) {
    console.error("[learning] submission file metadata has no stored object.", {
      fileId,
    });
    throw new AuthApiError(
      404,
      "submission_file_not_found",
      "Tệp không còn trong kho lưu trữ.",
    );
  }

  const filename = encodeURIComponent(file.original_filename);
  return new NextResponse(object.body, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
      "Content-Length": String(file.byte_size),
      "Content-Type": file.media_type,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
