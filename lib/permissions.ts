
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
 * Lưu ý bảo mật:
 * - Context phải được máy chủ xác minh.
 * - Không tin quyền do trình duyệt tự gửi.
 * - isHtsSuperAdmin phải được máy chủ xác định.
 * - Các hàm này không thay thế kiểm tra quyền tại API và cơ sở dữ liệu.
 */

import type {
  AccessScope,
  EducationAccessContext,
  EducationOrganization,
  EducationPermission,
  HtsRole,
  LearningFieldSlug,
  UserRoleAssignment,
} from "./types";

// =====================================================
// 1. XUẤT KIỂU DỮ LIỆU TƯƠNG THÍCH
// =====================================================

export type {
  HtsRole,
  AdminRequestStatus,
  HtsFieldSlug,
} from "./types";

// =====================================================
// 2. CẤU TRÚC PHẠM VI QUẢN LÝ
// =====================================================

export interface ScopeNode {
  scope: AccessScope;
  parent: AccessScope | null;
  active: boolean;
}

export interface VerifiedEducationAccessContext
  extends EducationAccessContext {
  /**
   * Danh sách phạm vi và quan hệ cha-con
   * được máy chủ xác minh từ dữ liệu đáng tin cậy.
   */
  scopeNodes: ScopeNode[];
}

// =====================================================
// 3. KIỂM TRA THỜI HẠN QUYỀN
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
// 4. LẤY QUYỀN ĐANG CÓ HIỆU LỰC
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
// 5. HỖ TRỢ SO SÁNH PHẠM VI
// =====================================================

function scopeKey(scope: AccessScope): string {
  return `${scope.type}:${scope.id}`;
}

function sameScope(
  first: AccessScope,
  second: AccessScope,
): boolean {
  return (
    first.type === second.type &&
    first.id === second.id
  );
}

// =====================================================
// 6. KIỂM TRA QUAN HỆ PHẠM VI
// =====================================================

/**
 * Phạm vi được cấp chỉ bao phủ phạm vi yêu cầu khi:
 * - Cả hai phạm vi tồn tại.
 * - Cả hai đang hoạt động.
 * - Có quan hệ cha-con thực tế.
 *
 * Không tự suy luận quyền giữa các tổ chức.
 */

export function scopeMatches(
  granted: AccessScope,
  requested: AccessScope,
  scopeNodes: ScopeNode[],
): boolean {
  const nodeMap = new Map<string, ScopeNode>();

  for (const node of scopeNodes) {
    const key = scopeKey(node.scope);

    // Từ chối dữ liệu có phạm vi trùng khóa.
    if (nodeMap.has(key)) {
      return false;
    }

    nodeMap.set(key, node);
  }

  const grantedKey = scopeKey(granted);
  const requestedKey = scopeKey(requested);

  const grantedNode = nodeMap.get(grantedKey);
  const requestedNode = nodeMap.get(requestedKey);

  if (!grantedNode || !requestedNode) {
    return false;
  }

  if (!grantedNode.active || !requestedNode.active) {
    return false;
  }

  // Cùng một phạm vi: vẫn phải tồn tại và hoạt động.
  if (sameScope(granted, requested)) {
    return true;
  }

  const visited = new Set<string>();
  let current: ScopeNode | undefined = requestedNode;

  while (current?.parent) {
    const parentKey = scopeKey(current.parent);

    if (visited.has(parentKey)) {
      return false;
    }

    visited.add(parentKey);

    const parentNode = nodeMap.get(parentKey);

    if (!parentNode || !parentNode.active) {
      return false;
    }

    if (parentKey === grantedKey) {
      return true;
    }

    current = parentNode;
  }

  return false;
}

// =====================================================
// 7. KIỂM TRA QUYỀN THEO PHẠM VI
// =====================================================

export function hasEducationPermission(
  context: VerifiedEducationAccessContext,
  permission: EducationPermission,
  requestedScope: AccessScope,
): boolean {
  // Chỉ được sử dụng khi cờ Super Admin
  // đã được máy chủ xác minh.
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
// 8. KIỂM TRA VAI TRÒ THEO PHẠM VI
// =====================================================

export function hasAnyEducationRole(
  context: VerifiedEducationAccessContext,
  roles: HtsRole[],
  requestedScope: AccessScope,
): boolean {
  // Super Admin chỉ được tính là vai trò được yêu cầu
  // khi danh sách roles có chứa super_admin.
  if (context.isHtsSuperAdmin) {
    return roles.includes("super_admin");
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
// 9. QUẢN TRỊ LĨNH VỰC HỌC TẬP
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
// 10. QUẢN LÝ GIÁO DỤC CẤP NGÀNH
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
// 11. QUẢN LÝ NHÀ TRƯỜNG
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
// 12. QUYỀN GIÁO VIÊN THEO LỚP
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
// 13. QUYỀN THEO MÔN HỌC
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
// 14. PHÊ DUYỆT KẾT QUẢ HỌC TẬP
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

// =====================================================
// 15. PHÊ DUYỆT BÁO CÁO NHÀ TRƯỜNG
// =====================================================

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
// 16. ĐỌC NHẬT KÝ KIỂM TOÁN
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
// 17. LẤY THÔNG TIN TỔ CHỨC
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

// =====================================================
// 18. KIỂM TRA QUAN HỆ TỔ CHỨC CHA - CON
// =====================================================

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
