
/**
 * HTS - HỆ THỐNG KIỂU DỮ LIỆU THỐNG NHẤT
 * Dùng chung cho học tập, quản trị lĩnh vực và quản lý giáo dục.
 * Đây là mô hình TypeScript, chưa tự tạo hoặc thay đổi bảng D1.
 */

export type Id = string;
export type ISODateTime = string;
export type DateOnly = string;

// =====================================================
// 1. TÀI KHOẢN VÀ LĨNH VỰC HỌC TẬP
// =====================================================

export type AccountStatus = "active" | "suspended" | "locked";

export type LearningFieldSlug =
  | "cong-dan"
  | "cong-nhan"
  | "sinh-vien"
  | "thpt"
  | "thcs"
  | "tieu-hoc"
  | "luc-luong-vu-trang";

export type HtsRole =
  | "learner"
  | "field_admin"
  | "education_sector_admin"
  | "school_leadership"
  | "teacher"
  | "super_admin";

export interface HtsProfile {
  id: Id;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  accountStatus: AccountStatus;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// =====================================================
// 2. PHÂN QUYỀN VÀ PHẠM VI QUẢN LÝ
// =====================================================

export type EducationPermission =
  | "education.overview.read"
  | "education.records.read"
  | "education.reports.read"
  | "school.manage"
  | "school.users.manage"
  | "school.structure.manage"
  | "class.manage"
  | "teaching.assignment.read"
  | "teaching.material.create"
  | "teaching.material.update"
  | "exam.create"
  | "exam.manage"
  | "exam.grade.propose"
  | "exam.grade.review"
  | "exam.grade.confirm"
  | "exam.grade.approve"
  | "report.create"
  | "report.review"
  | "report.approve"
  | "report.submit"
  | "permission.delegate"
  | "audit.read";

export type ScopeType =
  | "education_sector"
  | "education_unit"
  | "school"
  | "campus"
  | "academic_year"
  | "grade"
  | "class"
  | "subject"
  | "learning_field";

export interface AccessScope {
  type: ScopeType;
  id: Id;
}

export interface UserRoleAssignment {
  id: Id;
  userId: Id;
  role: HtsRole;
  scope: AccessScope;
  permissions: EducationPermission[];
  startsAt: ISODateTime;
  endsAt: ISODateTime | null;
  grantedBy: Id;
  reason: string;
  active: boolean;
}

export interface EducationAccessContext {
  userId: Id;
  assignments: UserRoleAssignment[];
  isHtsSuperAdmin: boolean;
  now?: ISODateTime;
}

// =====================================================
// 3. TỔ CHỨC GIÁO DỤC
// =====================================================

export type EducationOrganizationType =
  | "sector"
  | "management_unit"
  | "school"
  | "campus";

export interface EducationOrganization {
  id: Id;
  name: string;
  type: EducationOrganizationType;
  parentId: Id | null;
  active: boolean;
}

export interface AcademicYear {
  id: Id;
  schoolId: Id;
  name: string;
  startsOn: DateOnly;
  endsOn: DateOnly;
  status: "planned" | "active" | "closed";
}

export interface EducationClass {
  id: Id;
  schoolId: Id;
  campusId: Id | null;
  academicYearId: Id;
  grade: string;
  name: string;
  active: boolean;
}

export interface EducationEnrollment {
  id: Id;
  learnerId: Id;
  schoolId: Id;
  campusId: Id | null;
  academicYearId: Id;
  classId: Id;
  status: "active" | "completed" | "transferred" | "withdrawn";
  enrolledAt: ISODateTime;
}

// =====================================================
// 4. GIÁO VIÊN VÀ PHÂN CÔNG GIẢNG DẠY
// =====================================================

export interface TeachingAssignment {
  id: Id;
  teacherUserId: Id;
  schoolId: Id;
  campusId: Id | null;
  academicYearId: Id;
  classId: Id;
  subjectId: Id;
  active: boolean;
}

// =====================================================
// 5. QUẢN TRỊ LĨNH VỰC HỌC TẬP
// =====================================================

export type AdminRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "revoked";

export interface LearningGroupRegistration {
  userId: Id;
  fieldSlug: LearningFieldSlug;
  registeredAt: ISODateTime;
}

export interface FieldAdminRequest {
  id: Id;
  userId: Id;
  requestedField: LearningFieldSlug;
  reason: string;
  status: AdminRequestStatus;
  reviewedBy: Id | null;
  reviewedAt: ISODateTime | null;
  reviewNote: string | null;
  createdAt: ISODateTime;
}

export interface FieldAdminAssignment {
  id: Id;
  userId: Id;
  fieldSlug: LearningFieldSlug;
  grantedBy: Id;
  grantedAt: ISODateTime;
  expiresAt: ISODateTime | null;
  revokedAt: ISODateTime | null;
  active: boolean;
}

// =====================================================
// 6. QUẢN LÝ BÀI THI VÀ KẾT QUẢ HỌC TẬP
// =====================================================

export type GradeStatus =
  | "draft"
  | "ai_proposed"
  | "needs_manual_review"
  | "teacher_reviewed"
  | "teacher_confirmed"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "published";

export interface GradeChange {
  id: Id;
  oldScore: number | null;
  newScore: number | null;
  changedBy: Id;
  changedAt: ISODateTime;
  reason: string;
}

export interface AcademicResult {
  id: Id;
  examId: Id;
  learnerId: Id;
  schoolId: Id;
  campusId: Id | null;
  classId: Id;
  subjectId: Id;
  score: number | null;
  status: GradeStatus;
  aiConfidence: number | null;
  requiresManualReview: boolean;
  teacherConfirmedBy: Id | null;
  teacherConfirmedAt: ISODateTime | null;
  approvedBy: Id | null;
  approvedAt: ISODateTime | null;
  publishedAt?: ISODateTime | null;
  changes: GradeChange[];
}

export type ExamImportMatchStatus =
  | "matched"
  | "missing_candidate_number"
  | "duplicate_candidate_number"
  | "name_mismatch"
  | "not_found"
  | "needs_review";

export interface ExamScoreImportRow {
  sourceRow: number;
  candidateNumber: string;
  fullName: string;
  score: number | null;
  matchStatus: ExamImportMatchStatus;
  matchedUserId: Id | null;
}

// =====================================================
// 7. PHÊ DUYỆT KẾT QUẢ VÀ CHÍNH SÁCH NHÀ TRƯỜNG
// =====================================================

export type ApprovalDecision = "approve" | "reject";

export interface ApprovalRecord {
  id: Id;
  recordType: "academic_result" | "school_report";
  recordId: Id;
  decision: ApprovalDecision;
  actorUserId: Id;
  decidedAt: ISODateTime;
  reason: string;
  policyId: Id;
}

export interface SchoolApprovalPolicy {
  id: Id;
  schoolId: Id;
  recordType: "academic_result" | "school_report";
  approverUserIds: Id[];
  requiresTeacherConfirmation: boolean;
  active: boolean;
  effectiveFrom: ISODateTime;
  effectiveTo: ISODateTime | null;
}

// =====================================================
// 8. BÁO CÁO VÀ QUẢN LÝ PHIÊN BẢN
// =====================================================

export type SchoolReportStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "submitted"
  | "superseded";

export interface SchoolReport {
  id: Id;
  schoolId: Id;
  academicYearId: Id;
  title: string;
  status: SchoolReportStatus;
  version: number;
  createdBy: Id;
  approvedBy: Id | null;
  approvedAt: ISODateTime | null;
  snapshot: Record<string, unknown>;
}

export interface ReportVersion<T = Record<string, unknown>> {
  reportId: Id;
  version: number;
  createdAt: ISODateTime;
  createdBy: Id;
  approvedAt: ISODateTime | null;
  approvedBy: Id | null;
  submittedAt: ISODateTime | null;
  snapshot: T;
}

// =====================================================
// 9. NHẬT KÝ HOẠT ĐỘNG VÀ KIỂM TOÁN
// =====================================================

export type AuditOutcome = "success" | "denied" | "failure";

export interface AuditEvent {
  id: Id;
  actorUserId: Id;
  action: string;
  entityType: string;
  entityId: Id;
  occurredAt: ISODateTime;
  outcome: AuditOutcome;
  reason: string;
  metadata: Record<string, unknown>;
}

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

export interface AdminAuditLog {
  id: Id;
  actorUserId: Id;
  action: AdminAuditAction;
  targetUserId: Id | null;
  targetField: LearningFieldSlug | null;
  targetRecordId: Id | null;
  result: "success" | "rejected" | "warning";
  details: Record<string, unknown>;
  createdAt: ISODateTime;
}

// =====================================================
// 10. QUY TẮC CẤU HÌNH HTS
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

  openFields: ["cong-dan", "cong-nhan"] as const,

  excludedFromSchoolEducationReports: [
    "cong-dan",
    "cong-nhan",
  ] as const,

  attendanceIntervalMinutes: 10,
  examWarningThreshold: 4,
  examContinuesAfterThreshold: true,
} as const;
