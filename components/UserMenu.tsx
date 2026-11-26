
"use client";

import Link from "next/link";
import { useState } from "react";

type UserMenuProps = {
  fullName: string;
  email: string;
  role: "learner" | "field_admin" | "super_admin";
  fieldName?: string;
};

export default function UserMenu({
  fullName,
  email,
  role,
  fieldName,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  const roleLabel = {
    learner: "Người học",
    field_admin: "Quản trị viên lĩnh vực",
    super_admin: "Quản trị cấp cao",
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Mở menu tài khoản"
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
          {fullName.trim().charAt(0).toUpperCase() || "U"}
        </span>

        <span className="text-left">
          <span className="block text-sm font-semibold text-slate-800">
            {fullName}
          </span>
          <span className="block text-xs text-slate-500">
            {roleLabel[role]}
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <p className="font-semibold text-slate-800">{fullName}</p>
          <p className="mt-1 break-all text-sm text-slate-500">{email}</p>

          <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
            <p>
              Vai trò: <strong>{roleLabel[role]}</strong>
            </p>

            {fieldName && (
              <p className="mt-1">
                Lĩnh vực: <strong>{fieldName}</strong>
              </p>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href="/tai-khoan"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Thông tin tài khoản
            </Link>

            {role === "field_admin" && (
              <Link
                href="/quan-tri"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Khu vực quản trị lĩnh vực
              </Link>
            )}

            {role === "super_admin" && (
              <Link
                href="/quan-tri"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Quản trị cấp cao
              </Link>
            )}
          </div>

          <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
            Đăng xuất và xác thực tài khoản sẽ được triển khai
            cùng hệ thống Cloudflare ở giai đoạn sau.
          </p>
        </div>
      )}
    </div>
  );
}
