
/**
 * HTS - NHẬT KÝ HOẠT ĐỘNG VÀ KIỂM TOÁN
 *
 * Ghi nhận:
 * - Hoạt động tài khoản và phân quyền.
 * - Hoạt động quản lý trường học.
 * - Phân công giáo viên và lớp học.
 * - Đề xuất, điều chỉnh, xác nhận và phê duyệt điểm.
 * - Tạo, phê duyệt và gửi báo cáo.
 * - Các thao tác bị từ chối hoặc thất bại.
 *
 * Lưu ý:
 * Đây là lớp tạo dữ liệu nhật ký.
 * Máy chủ và cơ sở dữ liệu phải bảo vệ nhật ký,
 * không cho người dùng thông thường sửa hoặc xóa.
 */

import type {
  AdminAuditAction,
  AdminAuditLog,
  AuditEvent,
  AuditOutcome,
} from "./types";

// =====================================================
// 1. KIỂU DỮ LIỆU ĐẦU VÀO
// =====================================================

export interface CreateAuditEventInput {
  id?: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  occurredAt: string;
  outcome: AuditOutcome;
  reason: string;
  metadata?: Record<string, unknown>;
}

export interface CreateAdminAuditLogInput {
  id?: string;
  actorUserId: string;
  action: AdminAuditAction;
  targetUserId: string | null;
  targetField: AuditFieldSlug | null;
  targetRecordId: string | null;
  result: "success" | "rejected" | "warning";
  details?: Record<string, unknown>;
  createdAt: string;
}

type AuditFieldSlug =
  | "cong-dan"
  | "cong-nhan"
  | "sinh-vien"
  | "thpt"
  | "thcs"
  | "tieu-hoc"
  | "luc-luong-vu-trang";

// =====================================================
// 2. KIỂM TRA DỮ LIỆU NHẬT KÝ
// =====================================================

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function isValidDate(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

function cloneMetadata(
  metadata: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!metadata) {
    return {};
  }

  if (typeof structuredClone === "function") {
    return structuredClone(metadata);
  }

  return JSON.parse(
    JSON.stringify(metadata),
  ) as Record<string, unknown>;
}

// =====================================================
// 3. KIỂM SOÁT THÔNG TIN NHẠY CẢM
// =====================================================

const SENSITIVE_KEY_PATTERN =
  /password|passwd|secret|token|api[_-]?key|private[_-]?key|authorization|access[_-]?key/i;

/**
 * Không cho phép metadata chứa các trường có tên nhạy cảm.
 * Không ghi mật khẩu, token, khóa API hoặc thông tin xác thực.
 */

function containsSensitiveKey(
  value: unknown,
  visited = new WeakSet<object>(),
): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }

  if (visited.has(value)) {
    return false;
  }

  visited.add(value);

  if (Array.isArray(value)) {
    return value.some((item) =>
      containsSensitiveKey(item, visited),
    );
  }

  return Object.entries(value).some(
    ([key, item]) =>
      SENSITIVE_KEY_PATTERN.test(key) ||
      containsSensitiveKey(item, visited),
  );
}

// =====================================================
// 4. TẠO MÃ NHẬT KÝ
// =====================================================

function createAuditId(): string {
  return `audit-${crypto.randomUUID()}`;
}

// =====================================================
// 5. TẠO NHẬT KÝ HOẠT ĐỘNG CHUNG
// =====================================================

export function createAuditEvent(
  input: CreateAuditEventInput,
): AuditEvent {
  if (
    !isNonEmpty(input.actorUserId) ||
    !isNonEmpty(input.action) ||
    !isNonEmpty(input.entityType) ||
    !isNonEmpty(input.entityId)
  ) {
    throw new Error(
      "Nhật ký thiếu thông tin người thực hiện hoặc đối tượng.",
    );
  }

  if (!isValidDate(input.occurredAt)) {
    throw new Error(
      "Thời gian ghi nhật ký không hợp lệ.",
    );
  }

  if (
    !["success", "denied", "failure"].includes(
      input.outcome,
    )
  ) {
    throw new Error(
      "Kết quả thao tác không hợp lệ.",
    );
  }

  if (containsSensitiveKey(input.metadata ?? {})) {
    throw new Error(
      "Metadata chứa trường thông tin nhạy cảm không được phép ghi nhật ký.",
    );
  }

  return {
    id: input.id?.trim() || createAuditId(),
    actorUserId: input.actorUserId.trim(),
    action: input.action.trim(),
    entityType: input.entityType.trim(),
    entityId: input.entityId.trim(),
    occurredAt: input.occurredAt,
    outcome: input.outcome,
    reason: input.reason.trim(),
    metadata: cloneMetadata(input.metadata),
  };
}

// =====================================================
// 6. TẠO NHẬT KÝ QUẢN TRỊ HTS
// =====================================================

export function createAdminAuditLog(
  input: CreateAdminAuditLogInput,
): AdminAuditLog {
  if (
    !isNonEmpty(input.actorUserId) ||
    !isNonEmpty(input.action)
  ) {
    throw new Error(
      "Nhật ký quản trị thiếu người thực hiện hoặc hành động.",
    );
  }

  if (!isValidDate(input.createdAt)) {
    throw new Error(
      "Thời gian nhật ký quản trị không hợp lệ.",
    );
  }

  if (containsSensitiveKey(input.details ?? {})) {
    throw new Error(
      "Chi tiết nhật ký chứa thông tin nhạy cảm.",
    );
  }

  return {
    id: input.id?.trim() || createAuditId(),
    actorUserId: input.actorUserId.trim(),
    action: input.action,
    targetUserId: input.targetUserId,
    targetField: input.targetField,
    targetRecordId: input.targetRecordId,
    result: input.result,
    details: cloneMetadata(input.details),
    createdAt: input.createdAt,
  };
}

// =====================================================
// 7. CHUẨN HÓA NHẬT KÝ QUẢN TRỊ CŨ
// =====================================================

export function convertAdminAuditToEvent(
  log: AdminAuditLog,
): AuditEvent {
  const outcome: AuditOutcome =
    log.result === "success"
      ? "success"
      : log.result === "rejected"
        ? "denied"
        : "failure";

  return createAuditEvent({
    id: log.id,
    actorUserId: log.actorUserId,
    action: log.action,
    entityType: log.targetField
      ? "learning_field"
      : "admin_record",
    entityId:
      log.targetRecordId ??
      log.targetUserId ??
      "system",
    occurredAt: log.createdAt,
    outcome,
    reason: log.action,
    metadata: {
      targetUserId: log.targetUserId,
      targetField: log.targetField,
      result: log.result,
      details: log.details,
    },
  });
}

// =====================================================
// 8. CÁC NHÓM SỰ KIỆN NHẬT KÝ HTS
// =====================================================

export const HTS_AUDIT_ACTIONS = {
  ACCOUNT_LOGIN: "account.login",
  ACCOUNT_LOGOUT: "account.logout",
  ACCOUNT_UPDATED: "account.updated",
  ACCOUNT_LOCKED: "account.locked",

  PERMISSION_GRANTED: "permission.granted",
  PERMISSION_CHANGED: "permission.changed",
  PERMISSION_REVOKED: "permission.revoked",

  SCHOOL_CREATED: "school.created",
  SCHOOL_UPDATED: "school.updated",
  SCHOOL_SUSPENDED: "school.suspended",

  TEACHING_ASSIGNED: "teaching.assigned",
  TEACHING_CHANGED: "teaching.changed",

  AI_GRADE_PROPOSED: "grade.ai_proposed",
  GRADE_REVIEWED: "grade.reviewed",
  GRADE_CONFIRMED: "grade.confirmed",
  GRADE_APPROVED: "grade.approved",
  GRADE_REJECTED: "grade.rejected",
  GRADE_PUBLISHED: "grade.published",

  REPORT_CREATED: "report.created",
  REPORT_REVIEWED: "report.reviewed",
  REPORT_APPROVED: "report.approved",
  REPORT_SUBMITTED: "report.submitted",
  REPORT_VERSION_CREATED: "report.version_created",

  DATA_EXPORTED: "data.exported",
  ACCESS_DENIED: "access.denied",
  SYSTEM_CONFIGURATION_CHANGED:
    "system.configuration_changed",
} as const;

// =====================================================
// 9. KIỂM TRA NHẬT KÝ TRƯỚC KHI LƯU
// =====================================================

export function validateAuditEvent(
  event: AuditEvent,
): boolean {
  return (
    isNonEmpty(event.id) &&
    isNonEmpty(event.actorUserId) &&
    isNonEmpty(event.action) &&
    isNonEmpty(event.entityType) &&
    isNonEmpty(event.entityId) &&
    isValidDate(event.occurredAt) &&
    ["success", "denied", "failure"].includes(
      event.outcome,
    ) &&
    !containsSensitiveKey(event.metadata)
  );
}

// =====================================================
// 10. QUY TẮC BẢO VỆ NHẬT KÝ
// =====================================================

export const AUDIT_SECURITY_RULES = {
  appendOnly: true,
  allowOrdinaryUserUpdate: false,
  allowOrdinaryUserDelete: false,
  requireAuthenticatedActor: true,
  requireServerSideAuthorization: true,
  recordDeniedActions: true,
  recordFailedActions: true,
  excludePasswordsAndSecrets: true,
} as const;
