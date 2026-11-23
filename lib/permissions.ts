
import { categories } from "./categories";

export type HtsRole =
  | "learner"
  | "field_admin"
  | "super_admin";

export type AdminRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "revoked";

export type HtsFieldSlug =
  (typeof categories)[number]["slug"];

export type UserPermission = {
  role: HtsRole;
  registeredField: HtsFieldSlug | null;
  assignedField: HtsFieldSlug | null;
};

export function isValidField(
  field: string
): field is HtsFieldSlug {
  return categories.some((category) => category.slug === field);
}

// Kiểm tra lĩnh vực có được học miễn phí không cần tài khoản.
export function isOpenField(field: HtsFieldSlug): boolean {
  return categories.find((item) => item.slug === field)?.open === true;
}

// Kiểm tra người học đã đăng ký đúng lĩnh vực hay chưa.
export function isRegisteredForField(
  user: UserPermission,
  field: HtsFieldSlug
): boolean {
  return user.registeredField === field;
}

// Chỉ quản trị cấp cao có quyền quản lý mọi lĩnh vực.
export function canManageField(
  user: UserPermission,
  field: HtsFieldSlug
): boolean {
  if (user.role === "super_admin") {
    return true;
  }

  if (user.role === "field_admin") {
    return user.assignedField === field;
  }

  return false;
}

// Chỉ quản trị cấp cao được phê duyệt yêu cầu quản trị.
export function canApproveAdminRequests(
  user: UserPermission
): boolean {
  return user.role === "super_admin";
}

// Chỉ người học được đề nghị quản trị lĩnh vực đã đăng ký.
export function canRequestFieldAdmin(
  user: UserPermission,
  requestedField: HtsFieldSlug
): boolean {
  if (user.role !== "learner") {
    return false;
  }

  if (isOpenField(requestedField)) {
    return false;
  }

  return isRegisteredForField(user, requestedField);
}

// Quản trị viên cấp thấp không được cấp quyền cho người khác.
export function canGrantAdminRole(
  user: UserPermission
): boolean {
  return user.role === "super_admin";
}

// Chỉ quản trị cấp cao được thay đổi hoặc thu hồi quyền quản trị.
export function canChangeAdminRole(
  user: UserPermission
): boolean {
  return user.role === "super_admin";
}
