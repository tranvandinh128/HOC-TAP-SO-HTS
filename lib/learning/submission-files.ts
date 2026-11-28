import "server-only";

import { AuthApiError } from "@/lib/auth/http";
import { getCloudflareEnv } from "@/lib/db";

export const lessonSubmissionLimits = {
  fileBytes: 50 * 1024 * 1024,
  filesPerSubmission: 5,
} as const;

const supportedMediaTypes = new Set([
  "video/mp4",
  "video/webm",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function getPrivateLearningFilesBucket(): Promise<R2Bucket> {
  const env = await getCloudflareEnv();
  if (!env.LEARNING_PRIVATE_FILES) {
    throw new AuthApiError(
      503,
      "private_file_storage_unavailable",
      "Kho tệp riêng tư chưa được cấu hình. Tệp chưa được tải lên.",
    );
  }
  return env.LEARNING_PRIVATE_FILES;
}

export async function validateLessonSubmissionFile(
  file: File,
): Promise<string> {
  if (file.size < 1 || file.size > lessonSubmissionLimits.fileBytes) {
    throw new AuthApiError(
      413,
      "submission_file_size_invalid",
      "Mỗi tệp phải có dung lượng từ 1 byte đến 50 MB.",
    );
  }
  if (!supportedMediaTypes.has(file.type)) {
    throw new AuthApiError(
      415,
      "submission_file_type_unsupported",
      "Chỉ nhận video MP4/WebM, PDF và ảnh JPEG/PNG/WebP.",
    );
  }

  const header = new Uint8Array(
    await file.slice(0, 12).arrayBuffer(),
  );
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...header.slice(start, end));
  const signatureMatches =
    (file.type === "application/pdf" && ascii(0, 5) === "%PDF-") ||
    (file.type === "image/jpeg" &&
      header[0] === 0xff &&
      header[1] === 0xd8 &&
      header[2] === 0xff) ||
    (file.type === "image/png" &&
      ascii(0, 8) === "\x89PNG\r\n\x1a\n") ||
    (file.type === "image/webp" &&
      ascii(0, 4) === "RIFF" &&
      ascii(8, 12) === "WEBP") ||
    (file.type === "video/webm" &&
      header[0] === 0x1a &&
      header[1] === 0x45 &&
      header[2] === 0xdf &&
      header[3] === 0xa3) ||
    (file.type === "video/mp4" && ascii(4, 8) === "ftyp");

  if (!signatureMatches) {
    throw new AuthApiError(
      415,
      "submission_file_signature_invalid",
      "Nội dung tệp không khớp với định dạng đã khai báo.",
    );
  }

  return file.type;
}

export function sanitizeOriginalFilename(filename: string): string {
  const normalized = filename
    .replace(/[\u0000-\u001f\u007f/\\]/g, "_")
    .trim()
    .slice(0, 180);
  return normalized || "tep-dinh-kem";
}
