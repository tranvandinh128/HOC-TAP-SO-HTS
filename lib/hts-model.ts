
/**
 * HTS - MÔ HÌNH DỮ LIỆU TƯƠNG THÍCH
 *
 * Duy trì các kiểu dữ liệu cũ của nền tảng HTS,
 * đồng thời sử dụng hệ thống kiểu dữ liệu thống nhất.
 *
 * Đây là mô hình TypeScript phía ứng dụng.
 * Không tự tạo hoặc thay đổi bảng cơ sở dữ liệu.
 */

import type {
  HtsFieldSlug,
  HtsRole,
  AdminRequestStatus,
  AccountStatus,
  LearningGroupRegistration,
  FieldAdminRequest,
  AdminAuditAction,
  AdminAuditLog,
  ExamImportMatchStatus,
  ExamScoreImportRow,
} from "./types";

// =====================================================
// 1. TÁI XUẤT KIỂU DỮ LIỆU DÙNG CHUNG
// =====================================================

export type {
  HtsFieldSlug,
  HtsRole,
  AdminRequestStatus,
  AccountStatus,
  LearningGroupRegistration,
  FieldAdminRequest,
  AdminAuditAction,
  AdminAuditLog,
  ExamImportMatchStatus,
  ExamScoreImportRow,
};

// =====================================================
// 2. HỒ SƠ TÀI KHOẢN HTS
// =====================================================

export type HtsProfile = {
  id: string;
  displayName: string | null;
  email: string | null;
  phone: string | null;

  // Lĩnh vực người dùng đăng ký học tập.
  registeredField: HtsFieldSlug | null;

  // Vai trò hồ sơ tương thích với hệ thống cũ.
  role: HtsRole;

  // Lĩnh vực được giao quản trị, nếu có.
  assignedField: HtsFieldSlug | null;

  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string;
};

// =====================================================
// 3. QUY TẮC NGHIỆP VỤ QUẢN TRỊ HTS
// =====================================================

export const HTS_ROLE_RULES = {
  roles: [
    "learner",
    "field_admin",
    "education_sector_admin",
    "school_leadership",
    "teacher",
    "super_admin",
  ] as const,

  openFields: [
    "cong-dan",
    "cong-nhan",
  ] as const,

  excludedFromSchoolEducationReports: [
    "cong-dan",
    "cong-nhan",
  ] as const,

  attendanceIntervalMinutes: 10,

  examWarningThreshold: 4,

  examContinuesAfterThreshold: true,
} as const;

// =====================================================
// 4. NGUYÊN TẮC BẢO MẬT
// =====================================================

/**
 * - Chỉ Super Admin được cấp, đổi hoặc thu hồi quyền quản trị
 *   theo quy trình được máy chủ xác minh.
 *
 * - Field Admin chỉ làm việc trong lĩnh vực được giao.
 *
 * - Đăng ký lĩnh vực học tập không tự động cấp quyền quản trị.
 *
 * - Một tài khoản có thể có nhiều phân công vai trò.
 *
 * - Không sử dụng role trong hồ sơ phía trình duyệt
 *   làm căn cứ duy nhất để cấp quyền.
 *
 * - Quyền thực tế phải được kiểm tra tại máy chủ,
 *   API và chính sách bảo vệ dữ liệu tương ứng.
 */
