
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
};

export default function AuthGuard({
  children,
  isAuthenticated,
  isLoading = false,
}: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/dang-nhap");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-slate-600">
          Đang kiểm tra thông tin đăng nhập...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Yêu cầu đăng nhập
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Anh/chị cần đăng nhập tài khoản HTS để sử dụng chức năng này.
          </p>

          <p className="mt-4 text-sm text-blue-700">
            Hệ thống đang chuyển đến trang đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
