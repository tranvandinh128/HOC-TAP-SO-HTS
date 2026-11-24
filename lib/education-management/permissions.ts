import type {
  AccessScope,
  EducationAccessContext,
  EducationPermission,
  ScopeType,
  UserRoleAssignment,
} from "./types";

const SCOPE_PARENTS: Partial<Record<ScopeType, ScopeType[]>> = {
  education_unit: ["education_sector"],
  school: ["education_unit", "education_sector"],
  campus: ["school", "education_unit", "education_sector"],
  academic_year: ["school", "education_unit", "education_sector"],
  grade: ["school", "education_unit", "education_sector"],
  class: ["campus", "school", "education_unit", "education_sector"],
  subject: ["school", "education_unit", "education_sector"],
};

function isAssignmentActive(a: UserRoleAssignment, now: Date): boolean {
  if (!a.active) return false;
  const start = new Date(a.startsAt);
  const end = a.endsAt ? new Date(a.endsAt) : null;
  return !Number.isNaN(start.getTime()) && start <= now && (!end || (!Number.isNaN(end.getTime()) && end >= now));
}

/** Scope được xem là khớp khi cùng cấp/cùng ID hoặc scope được yêu cầu nằm dưới scope được cấp. */
export function scopeMatches(granted: AccessScope, requested: AccessScope): boolean {
  if (granted.type === requested.type && granted.id === requested.id) return true;
  if (granted.type === "education_sector") return true;
  if (granted.type === "education_unit") {
    return ["school", "campus", "academic_year", "grade", "class", "subject"].includes(requested.type);
  }
  if (granted.type === "school") {
    return ["campus", "academic_year", "grade", "class", "subject"].includes(requested.type);
  }
  if (granted.type === "campus") return requested.type === "class";
  return false;
}

/**
 * Kiểm tra quyền ứng dụng. Đây là lớp hỗ trợ UI/domain; API/server và RLS
 * phải lặp lại kiểm tra dựa trên danh tính đã xác thực, không tin dữ liệu client.
 */
export function hasEducationPermission(
  context: EducationAccessContext,
  permission: EducationPermission,
  requestedScope: AccessScope,
): boolean {
  if (context.isHtsSuperAdmin) return true;
  const now = new Date(context.now ?? new Date().toISOString());
  if (Number.isNaN(now.getTime())) return false;
  return context.assignments.some((assignment) =>
    assignment.userId === context.userId &&
    isAssignmentActive(assignment, now) &&
    assignment.permissions.includes(permission) &&
    scopeMatches(assignment.scope, requestedScope),
  );
}

export function hasAnyEducationRole(
  context: EducationAccessContext,
  roles: readonly string[],
  requestedScope: AccessScope,
): boolean {
  if (context.isHtsSuperAdmin) return true;
  const now = new Date(context.now ?? new Date().toISOString());
  return context.assignments.some((a) =>
    a.userId === context.userId && roles.includes(a.role) && isAssignmentActive(a, now) && scopeMatches(a.scope, requestedScope),
  );
}

/** Chỉ dùng để hiển thị danh sách quyền đang có; không thay thế kiểm tra quyền theo từng hành động. */
export function getActiveAssignments(context: EducationAccessContext): UserRoleAssignment[] {
  const now = new Date(context.now ?? new Date().toISOString());
  return context.assignments.filter((a) => a.userId === context.userId && isAssignmentActive(a, now));
}

export function canViewSectorEducationData(context: EducationAccessContext): boolean {
  return hasEducationPermission(context, "education.records.read", { type: "education_sector", id: "all" });
}

export function canManageWholeSchool(context: EducationAccessContext, schoolId: string): boolean {
  return hasEducationPermission(context, "school.manage", { type: "school", id: schoolId });
}

export function canTeacherWorkOnClass(
  context: EducationAccessContext,
  classId: string,
  permission: EducationPermission,
): boolean {
  return hasEducationPermission(context, permission, { type: "class", id: classId });
}
