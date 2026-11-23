
/**
 * Các kiểu dữ liệu dùng chung của nền tảng HỌC TẬP SỐ.
 * Đây là mô hình kiểu TypeScript ở phía ứng dụng, chưa phải bằng chứng
 * rằng các bảng tương ứng đã tồn tại hoặc đã được bảo vệ trong Supabase.
 */

import type { HtsFieldSlug, HtsRole, AdminRequestStatus } from "./permissions";

export type AccountStatus = "active" | "suspended" | "locked";

export type LearningGroupRegistration = {
  userId: string;
  fieldSlug: HtsFieldSlug;
  registeredAt: string;
};

export type FieldAdminRequest = {
  id: string;
  userId: string;
  requestedField: HtsFieldSlug;
  reason: string;
  status: AdminRequestStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
  createdAt: string;
};

export type HtsProfile = {
  id: string;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  registeredField: HtsFieldSlug | null;
  role: HtsRole;
  assignedField: HtsFieldSlug | null;
  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminAuditAction =
  | "admin_request_submitted"
  | "admin_request_approved"
  | "admin_request_rejected"
  | "admin_role_changed"
  | "admin_role_revoked"
  | "account_locked"
  | "account_unlocked"
  | "content_created"
  | "content_updated"
  | "content_archived"
  | "data_exported";

export type AdminAuditLog = {
  id: string;
  actorUserId: string;
  action: AdminAuditAction;
  targetUserId: string | null;
  targetField: HtsFieldSlug | null;
  targetRecordId: string | null;
  result: "success" | "rejected" | "warning";
  details: Record<string, unknown>;
  createdAt: string;
};

export type ExamImportMatchStatus =
  | "matched"
  | "missing_candidate_number"
  | "duplicate_candidate_number"
  | "name_mismatch"
  | "not_found"
  | "needs_review";

export type ExamScoreImportRow = {
  sourceRow: number;
  candidateNumber: string;
  fullName: string;
  score: number | null;
  matchStatus: ExamImportMatchStatus;
  matchedUserId: string | null;
};

/**
 * Quy tắc nghiệp vụ nền tảng:
 * - Chỉ super_admin được phê duyệt, cấp, đổi hoặc thu hồi quyền quản trị.
 * - field_admin chỉ làm việc trong lĩnh vực được giao.
 * - Đăng ký lĩnh vực học tập không tự động cấp quyền quản trị.
 * - Mã phía trình duyệt chỉ hỗ trợ giao diện; quyền thật phải được kiểm tra
 *   ở máy chủ và chính sách RLS / hàm cơ sở dữ liệu.
 */
export const HTS_ROLE_RULES = {
  roles: ["learner", "field_admin", "super_admin"] as const,
  openFields: ["cong-dan", "cong-nhan"] as const,
  attendanceIntervalMinutes: 10,
  examWarningThreshold: 4,
  examContinuesAfterThreshold: true,
} as const;
