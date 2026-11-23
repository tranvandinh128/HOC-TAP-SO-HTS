
"use client";

import { useState } from "react";

type UserRole = "learner" | "field_admin" | "super_admin";

type User = {
  id: number;
  name: string;
  email: string;
  field: string;
  role: UserRole;
  status: "active" | "locked";
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Người dùng minh họa",
    email: "example@email.com",
    field: "Sinh viên",
    role: "learner",
    status: "active",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);

  function toggleStatus(id: number) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "locked" : "active",
            }
          : user
      )
    );
  }

  const roleName = (role: UserRole) => {
    if (role === "super_admin") return "Quản trị cấp cao";
    if (role === "field_admin") return "Quản trị lĩnh vực";
    return "Người học";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          QUẢN LÝ NGƯỜI DÙNG HTS
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Khu vực quản lý tài khoản, lĩnh vực học tập và trạng thái
          người dùng. Chức năng quản lý quyền quản trị thuộc
          thẩm quyền của Quản trị cấp cao.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">Tổng tài khoản</p>
            <p className="mt-1 text-2xl font-bold">{users.length}</p>
          </div>

          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm text-green-700">Đang hoạt động</p>
            <p className="mt-1 text-2xl font-bold">
              {users.filter((u) => u.status === "active").length}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-sm text-red-700">Đang khóa</p>
            <p className="mt-1 text-2xl font-bold">
              {users.filter((u) => u.status === "locked").length}
            </p>
          </div>
        </div>

        <h2 className="mb-4 mt-8 text-xl font-semibold">
          Danh sách tài khoản
        </h2>

        <div className="space-y-4">
          {users.map((user) => (
            <article
              key={user.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <h3 className="font-semibold text-slate-800">
                {user.name}
              </h3>

              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>Email: {user.email}</p>
                <p>Lĩnh vực: {user.field}</p>
                <p>Vai trò: {roleName(user.role)}</p>
                <p>
                  Trạng thái:{" "}
                  {user.status === "active" ? "Đang hoạt động" : "Đang khóa"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleStatus(user.id)}
                className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                {user.status === "active" ? "Khóa thử nghiệm" : "Mở khóa thử nghiệm"}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Quy định quản trị:</strong>
          <ul className="ml-5 mt-2 list-disc">
            <li>Chỉ Quản trị cấp cao được quản lý quyền quản trị.</li>
            <li>Quản trị viên lĩnh vực không được tự nâng cấp quyền.</li>
            <li>Mọi thay đổi tài khoản và quyền phải được ghi nhật ký.</li>
          </ul>
          <p className="mt-3 font-semibold">
            Đây là giao diện minh họa, chưa kết nối dữ liệu người dùng
            và chưa thực hiện khóa tài khoản thật.
          </p>
        </div>
      </div>
    </main>
  );
}
