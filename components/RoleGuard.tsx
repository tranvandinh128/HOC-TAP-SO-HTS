
"use client";

import type { ReactNode } from "react";

export type HtsRole =
  | "learner"
  | "field_admin"
  | "super_admin";

type RoleGuardProps = {
  children: ReactNode;
  userRole: HtsRole | null;
  allowedRoles: HtsRole[];
  isLoading?: boolean;
};

export default function RoleGuard({
  children,
  userRole,
  allowedRoles,
  isLoading = false,
}: RoleGuardProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-slate-600">
          Đang kiểm tra quyền truy cập...
        </p>
      </div>
    );
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-700">
            Không đủ quyền truy cập
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Tài khoản của anh/chị chưa được cấp quyền
            sử dụng chức năng này.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Vui lòng liên hệ Quản trị cấp cao nếu cần
            được xem xét cấp quyền.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
