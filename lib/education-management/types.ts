/**
 * HTS - mô hình dữ liệu ứng dụng cho quản trị giáo dục.
 * Chỉ là kiểu dữ liệu TypeScript; không tự tạo bảng hoặc bảo vệ dữ liệu trong DB.
 */

export type Id = string;
export type ISODateTime = string;

export type LearningFieldSlug =
  | "cong-dan"
  | "cong-nhan"
  | "sinh-vien"
  | "thpt"
  | "thcs"
  | "tieu-hoc"
  | "luc-luong-vu-trang";

export type EducationRole =
  | "education_sector_admin"
  | "school_leadership"
  | "teacher"
  | "learner"
  | "super_admin";

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
  | "subject";

export interface AccessScope {
  type: ScopeType;
  id: Id;
}

/** Một tài khoản có thể có nhiều vai trò và nhiều phạm vi đồng thời. */
export interface UserRoleAssignment {
  id: Id;
  userId: Id;
  role: EducationRole;
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
  /** Super Admin HTS là vai trò toàn hệ thống; vẫn phải kiểm tra ở máy chủ. */
  isHtsSuperAdmin: boolean;
  now?: ISODateTime;
}

export interface EducationOrganization {
  id: Id;
  name: string;
  type: "sector" | "management_unit" | "school" | "campus";
  parentId: Id | null;
  active: boolean;
}

export interface AcademicYear {
  id: Id;
  schoolId: Id;
  name: string;
  startsOn: string;
  endsOn: string;
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
  changes: GradeChange[];
}

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

export interface AuditEvent {
  id: Id;
  actorUserId: Id;
  action: string;
  entityType: string;
  entityId: Id;
  occurredAt: ISODateTime;
  outcome: "success" | "denied" | "failure";
  reason: string;
  metadata: Record<string, unknown>;
}

export interface SchoolReport {
  id: Id;
  schoolId: Id;
  academicYearId: Id;
  title: string;
  status: "draft" | "in_review" | "approved" | "submitted" | "superseded";
  version: number;
  createdBy: Id;
  approvedBy: Id | null;
  approvedAt: ISODateTime | null;
  snapshot: Record<string, unknown>;
}
