
/**
 * HTS - HỆ THỐNG PHÂN QUYỀN THỐNG NHẤT
 *
 * Hỗ trợ:
 * - Super Admin HTS
 * - Quản trị lĩnh vực học tập
 * - Quản trị giáo dục cấp ngành
 * - Ban giám hiệu
 * - Giáo viên
 * - Người học
 *
 * Lưu ý:
 * Đây là lớp kiểm tra nghiệp vụ TypeScript.
 * Máy chủ phải xác minh danh tính, quyền và phạm vi từ dữ liệu tin cậy.
 * Không sử dụng dữ liệu quyền do trình duyệt tự gửi lên làm căn cứ cấp quyền.
 */

import type {
  AccessScope,
  EducationAccessContext,
  EducationOrganization,
  EducationPermission,
  HtsRole,
  LearningFieldSlug,
  ScopeType,
  UserRoleAssignment,
} from "./types";

// =====================================================
// 1. CẤU TRÚC PHẠM VI QUẢN LÝ
// =====================================================

/**
 * Mỗi nút mô tả một phạm vi và quan hệ cha trực tiếp.
 * Dữ liệu này phải được máy chủ tải từ cơ sở dữ liệu đã xác minh.
 *
 * Ví dụ:
 * Ngành -> Đơn vị quản lý -> Trường -> Cơ sở.
 * Trường -> Năm học -> Khối -> Lớp.
 */

export interface ScopeNode {
  scope: AccessScope;
  parent: AccessScope | null;
  active: boolean;
}

export interface VerifiedEducationAccessContext
  extends EducationAccessContext {
  /**
   * Danh sách quan hệ phạm vi đã được máy chủ xác minh.
   */
  scopeNodes: ScopeNode[];
}

// =====================================================
// 2. KIỂM TRA THỜI HẠN VÀ TRẠNG THÁI QUYỀN
// =====================================================

export function isAssignmentActive(
  assignment: UserRoleAssignment,
  now: Date = new Date(),
): boolean {
  if (!assignment.active || Number.isNaN(now.getTime())) {
    return false;
  }

  const start = new Date(assignment.startsAt);

  if (Number.isNaN(start.getTime()) || start > now) {
    return false;
  }

  if (assignment.endsAt !== null) {
    const end = new Date(assignment.endsAt);

    if (Number.isNaN(end.getTime()) || end < now) {
      return false;
    }
  }

  return true;
}

// =====================================================
// 3. LẤY CÁC QUYỀN ĐANG CÓ HIỆU LỰC
// =====================================================

export function getActiveAssignments(
  context: EducationAccessContext,
): UserRoleAssignment[] {
  const now = new Date(context.now ?? new Date().toISOString());

  if (Number.isNaN(now.getTime())) {
    return [];
  }

  return context.assignments.filter(
    (assignment) =>
      assignment.userId === context.userId &&
      isAssignmentActive(assignment, now),
  );
}

// =====================================================
// 4. KIỂM TRA QUAN HỆ PHẠM VI
// =====================================================

function sameScope(
  first: AccessScope,
  second: AccessScope,
): boolean {
  return first.type === second.type && first.id === second.id;
}

/**
 * Kiểm tra phạm vi được cấp có bao phủ phạm vi yêu cầu không.
 *
 * Không tự suy luận rằng một trường có quyền với mọi lớp.
 * Phải có quan hệ cha-con thực tế trong scopeNodes.
 */

export function scopeMatches(
  granted: AccessScope,
  requested: AccessScope,
  scopeNodes: ScopeNode[],
): boolean {
  if (sameScope(granted, requested)) {
    return true;
  }

  const nodeMap = new Map<string, ScopeNode>();

  for (const node of scopeNodes) {
    nodeMap.set(`${node.scope.type}:${node.scope.id}`, node);
  }

  const grantedKey = `${granted.type}:${granted.id}`;
  const requestedKey = `${requested.type}:${requested.id}`;

  const grantedNode = nodeMap.get(grantedKey);
  const requestedNode = nodeMap.get(requestedKey);

  if (!grantedNode || !requestedNode) {
    return false;
  }

  if (!grantedNode.active || !requestedNode.active) {
    return false;
  }

  const visited = new Set<string>();
  let current: ScopeNode | undefined = requestedNode;

  while (current?.parent) {
    const parentKey =
      `${current.parent.type}:${current.parent.id}`;

    if (visited.has(parentKey)) {
      return false;
    }

    visited.add(parentKey);

    if (parentKey === grantedKey) {
      return true;
    }

    current = nodeMap.get(parentKey);

    if (!current || !current.active) {
      return false;
    }
  }

  return false;
}

// =====================================================
// 5. KIỂM TRA QUYỀN THEO PHẠM VI
// =====================================================

export function hasEducationPermission(
  context: VerifiedEducationAccessContext,
  permission: EducationPermission,
  requestedScope: AccessScope,
): boolean {
  if (context.isHtsSuperAdmin) {
    return true;
  }

  const now = new Date(context.now ?? new Date().toISOString());

  if (Number.isNaN(now.getTime())) {
    return false;
  }

  return context.assignments.some((assignment) => {
    if (assignment.userId !== context.userId) {
      return false;
    }

    if (!isAssignmentActive(assignment, now)) {
      return false;
    }

    if (!assignment.permissions.includes(permission)) {
      return false;
    }

    return scopeMatches(
      assignment.scope,
      requestedScope,
      context.scopeNodes,
    );
  });
}

// =====================================================
// 6. KIỂM TRA VAI TRÒ THEO PHẠM VI
// =====================================================

export function hasAnyEducationRole(
  context: VerifiedEducationAccessContext,
  roles: HtsRole[],
  requestedScope: AccessScope,
): boolean {
  if (context.isHtsSuperAdmin) {
    return true;
  }

  const now = new Date(context.now ?? new Date().toISOString());

  if (Number.isNaN(now.getTime())) {
    return false;
  }

  return context.assignments.some((assignment) => {
    if (assignment.userId !== context.userId) {
      return false;
    }

    if (!roles.includes(assignment.role)) {
      return false;
    }

    if (!isAssignmentActive(assignment, now)) {
      return false;
    }

    return scopeMatches(
      assignment.scope,
      requestedScope,
      context.scopeNodes,
    );
  });
}

// =====================================================
// 7. KIỂM TRA QUẢN TRỊ LĨNH VỰC HỌC TẬP
// =====================================================

export function canManageLearningField(
  context: EducationAccessContext,
  field: LearningFieldSlug,
): boolean {
  if (context.isHtsSuperAdmin) {
    return true;
  }

  const now = new Date(context.now ?? new Date().toISOString());

  if (Number.isNaN(now.getTime())) {
    return false;
  }

  return context.assignments.some((assignment) => {
    if (assignment.userId !== context.userId) {
      return false;
    }

    if (!isAssignmentActive(assignment, now)) {
      return false;
    }

    if (assignment.role !== "field_admin") {
      return false;
    }

    return (
      assignment.scope.type === "learning_field" &&
      assignment.scope.id === field
    );
  });
}

// =====================================================
// 8. KIỂM TRA QUYỀN QUẢN LÝ GIÁO DỤC CẤP NGÀNH
// =====================================================

export function canViewSectorEducationData(
  context: VerifiedEducationAccessContext,
  sectorId: string,
): boolean {
  return hasEducationPermission(
    context,
    "education.records.read",
    {
      type: "education_sector",
      id: sectorId,
    },
  );
}

// =====================================================
// 9. KIỂM TRA QUYỀN QUẢN LÝ NHÀ TRƯỜNG
// =====================================================

export function canManageWholeSchool(
  context: VerifiedEducationAccessContext,
  schoolId: string,
): boolean {
  return hasEducationPermission(
    context,
    "school.manage",
    {
      type: "school",
      id: schoolId,
    },
  );
}

// =====================================================
// 10. KIỂM TRA QUYỀN GIÁO VIÊN THEO LỚP
// =====================================================

export function canTeacherWorkOnClass(
  context: VerifiedEducationAccessContext,
  classId: string,
  permission: EducationPermission,
): boolean {
  return hasEducationPermission(
    context,
    permission,
    {
      type: "class",
      id: classId,
    },
  );
}

// =====================================================
// 11. KIỂM TRA QUYỀN THEO MÔN HỌC
// =====================================================

export function canAccessSubject(
  context: VerifiedEducationAccessContext,
  subjectId: string,
  permission: EducationPermission,
): boolean {
  return hasEducationPermission(
    context,
    permission,
    {
      type: "subject",
      id: subjectId,
    },
  );
}

// =====================================================
// 12. KIỂM TRA QUYỀN PHÊ DUYỆT
// =====================================================

export function canApproveAcademicResult(
  context: VerifiedEducationAccessContext,
  schoolId: string,
): boolean {
  return hasEducationPermission(
    context,
    "exam.grade.approve",
    {
      type: "school",
      id: schoolId,
    },
  );
}

export function canApproveSchoolReport(
  context: VerifiedEducationAccessContext,
  schoolId: string,
): boolean {
  return hasEducationPermission(
    context,
    "report.approve",
    {
      type: "school",
      id: schoolId,
    },
  );
}

// =====================================================
// 13. KIỂM TRA QUYỀN ĐỌC NHẬT KÝ
// =====================================================

export function canReadAuditLog(
  context: VerifiedEducationAccessContext,
  scope: AccessScope,
): boolean {
  return hasEducationPermission(
    context,
    "audit.read",
    scope,
  );
}

// =====================================================
// 14. KIỂM TRA TỔ CHỨC GIÁO DỤC
// =====================================================

export function getOrganization(
  organizations: EducationOrganization[],
  id: string,
): EducationOrganization | undefined {
  return organizations.find(
    (organization) =>
      organization.id === id && organization.active,
  );
}

export function isValidOrganizationParent(
  organizations: EducationOrganization[],
  childId: string,
  parentId: string,
): boolean {
  const child = getOrganization(organizations, childId);
  const parent = getOrganization(organizations, parentId);

  if (!child || !parent || child.id === parent.id) {
    return false;
  }

  return child.parentId === parent.id;
}
