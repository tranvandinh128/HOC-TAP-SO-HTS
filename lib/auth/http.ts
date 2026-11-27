import { NextResponse } from "next/server";

import { D1RepositoryError } from "@/lib/d1/repository";
import { D1BindingError, getDB } from "@/lib/db";
import type { D1Repository } from "@/lib/d1/repository";

export class AuthApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

type AuthApiHandler = (
  db: D1Repository,
  request: Request,
) => Promise<NextResponse>;

export async function handleAuthApi(
  request: Request,
  handler: AuthApiHandler,
  options: { sameOrigin?: boolean; requireSchema?: boolean } = {},
): Promise<NextResponse> {
  try {
    if (options.sameOrigin !== false && request.method !== "GET") {
      assertSameOrigin(request);
    }

    const db = await getDB();
    if (options.requireSchema !== false) {
      await assertAuthSchema(db);
    }

    return await handler(db, request);
  } catch (error) {
    if (error instanceof AuthApiError) {
      return NextResponse.json(
        { error: error.code, message: error.message },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof D1BindingError) {
      console.error("[auth] Cloudflare D1 binding unavailable.", {
        reason: error.reason,
      });
      return NextResponse.json(
        {
          error: "auth_storage_unavailable",
          message: "Dịch vụ tài khoản hiện chưa kết nối được cơ sở dữ liệu.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof D1RepositoryError) {
      console.error("[auth] D1 request failed.", {
        operation: error.operation,
      });
      return NextResponse.json(
        {
          error: "auth_storage_unavailable",
          message: "Dịch vụ tài khoản chưa sẵn sàng. Kiểm tra schema HTS Auth đã được cài đặt.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("[auth] Unexpected request failure.", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    return NextResponse.json(
      {
        error: "internal_error",
        message: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) {
    throw new AuthApiError(
      403,
      "origin_required",
      "Yêu cầu không có Origin hợp lệ.",
    );
  }

  let requestOrigin: string;
  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    throw new AuthApiError(
      400,
      "invalid_request",
      "Không thể xác minh nguồn yêu cầu.",
    );
  }

  if (origin !== requestOrigin) {
    throw new AuthApiError(
      403,
      "cross_origin_request",
      "Yêu cầu khác nguồn bị từ chối.",
    );
  }
}

export async function assertAuthSchema(db: D1Repository): Promise<void> {
  await db.first(
    `SELECT 1
     FROM auth_credentials, auth_sessions, auth_password_resets,
          auth_rate_limits, hts_admin_request_reviews, hts_role_grants,
          hts_auth_events
     LIMIT 0`,
  );
}

export async function readJsonObject(
  request: Request,
  maxBytes = 16_384,
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new AuthApiError(
      415,
      "unsupported_content_type",
      "Yêu cầu phải sử dụng JSON.",
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new AuthApiError(413, "request_too_large", "Dữ liệu gửi lên quá lớn.");
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new AuthApiError(413, "request_too_large", "Dữ liệu gửi lên quá lớn.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new AuthApiError(400, "invalid_json", "Nội dung JSON không hợp lệ.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new AuthApiError(400, "invalid_request", "Dữ liệu yêu cầu không hợp lệ.");
  }

  return parsed as Record<string, unknown>;
}

export function requiredString(
  value: unknown,
  fieldName: string,
  maxLength: number,
): string {
  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value.length > maxLength
  ) {
    throw new AuthApiError(
      400,
      "invalid_input",
      `Trường ${fieldName} không hợp lệ.`,
    );
  }
  return value.trim();
}

export function stringArray(
  value: unknown,
  fieldName: string,
  maxItems: number,
): string[] {
  if (
    !Array.isArray(value) ||
    value.length > maxItems ||
    value.some((entry) => typeof entry !== "string" || entry.length > 200)
  ) {
    throw new AuthApiError(
      400,
      "invalid_input",
      `Danh sách ${fieldName} không hợp lệ.`,
    );
  }

  return [...new Set(value.map((entry) => (entry as string).trim()))];
}
