import "server-only";

import { AuthApiError } from "@/lib/auth/http";
import {
  getPrivateLearningFilesBucket,
  sanitizeOriginalFilename,
} from "@/lib/learning/submission-files";

export const learningResourceFileLimit = 50 * 1024 * 1024;

const resourceMediaTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export type LearningResourceUpload = {
  title: string;
  author: string | null;
  source: string;
  usageLicense: string;
  file: File;
  mediaType: string;
};

function formString(
  formData: FormData,
  name: string,
  maxLength: number,
  required = true,
): string | null {
  const value = formData.get(name);
  if (value === null && !required) return null;
  if (
    typeof value !== "string" ||
    (required && !value.trim()) ||
    value.trim().length > maxLength
  ) {
    throw new AuthApiError(
      400,
      "invalid_resource_metadata",
      `Thông tin ${name} không hợp lệ.`,
    );
  }
  return value.trim() || null;
}

export async function parseLearningResourceUpload(
  formData: FormData,
): Promise<LearningResourceUpload> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new AuthApiError(400, "resource_file_required", "Vui lòng chọn tệp.");
  }
  if (file.size < 1 || file.size > learningResourceFileLimit) {
    throw new AuthApiError(
      413,
      "resource_file_size_invalid",
      "Tệp phải có dung lượng từ 1 byte đến 50 MB.",
    );
  }
  if (!resourceMediaTypes.has(file.type)) {
    throw new AuthApiError(
      415,
      "resource_file_type_unsupported",
      "Chỉ nhận tài liệu PDF, Word hoặc Word Open XML.",
    );
  }

  const header = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const isPdf =
    file.type === "application/pdf" &&
    String.fromCharCode(...header.slice(0, 5)) === "%PDF-";
  const isDoc =
    file.type === "application/msword" &&
    header[0] === 0xd0 &&
    header[1] === 0xcf &&
    header[2] === 0x11 &&
    header[3] === 0xe0 &&
    header[4] === 0xa1 &&
    header[5] === 0xb1 &&
    header[6] === 0x1a &&
    header[7] === 0xe1;
  const isDocx =
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    header[0] === 0x50 &&
    header[1] === 0x4b &&
    header[2] === 0x03 &&
    header[3] === 0x04;

  if (!isPdf && !isDoc && !isDocx) {
    throw new AuthApiError(
      415,
      "resource_file_signature_invalid",
      "Nội dung tệp không khớp với định dạng đã khai báo.",
    );
  }

  return {
    title: formString(formData, "title", 200) as string,
    author: formString(formData, "author", 200, false),
    source: formString(formData, "source", 500) as string,
    usageLicense: formString(formData, "usageLicense", 500) as string,
    file,
    mediaType: file.type,
  };
}

export async function storeLearningResourceFile(
  file: File,
  versionId: string,
  mediaType: string,
): Promise<{ bucket: R2Bucket; storageKey: string }> {
  const bucket = await getPrivateLearningFilesBucket();
  const storageKey = `learning/resources/${versionId}`;
  const object = await bucket.put(storageKey, file.stream(), {
    httpMetadata: { contentType: mediaType },
    customMetadata: {
      resourceVersionId: versionId,
      originalFilename: sanitizeOriginalFilename(file.name),
    },
  });
  if (object.size !== file.size) {
    await bucket.delete(storageKey);
    throw new Error("Stored learning resource size did not match.");
  }
  return { bucket, storageKey };
}

export async function removeLearningResourceFile(
  bucket: R2Bucket,
  storageKey: string,
): Promise<void> {
  try {
    await bucket.delete(storageKey);
  } catch (error) {
    console.error("[military] private learning resource cleanup failed.", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    throw error;
  }
}
