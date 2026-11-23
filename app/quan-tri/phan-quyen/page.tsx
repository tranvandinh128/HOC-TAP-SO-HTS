
"use client";

import { useState } from "react";
import Link from "next/link";

const LEARNING_FIELDS = [
  { id: "cong-dan", name: "Công dân học tập" },
  { id: "cong-nhan", name: "Công nhân học tập" },
  { id: "sinh-vien", name: "Sinh viên học tập" },
  { id: "thpt", name: "Học sinh THPT" },
  { id: "thcs", name: "Học sinh THCS" },
  { id: "tieu-hoc", name: "Học sinh tiểu học" },
  { id: "luc-luong-vu-trang", name: "Lực lượng vũ trang" },
];

export default function AdminPermissionPage() {
  const [userId, setUserId] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [preview, setPreview] = useState(false);

  function toggleField(fieldId: string) {
    setSelectedFields((current) =>
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId]
    );
  }

  function handlePreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId.trim() || selectedFields.length === 0 || !reason.trim()) {
      setPreview(false);
      return;
    }

    setPreview(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/quan-tri"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Quay lại trang quản trị
        </Link>

        <header className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-8 text-white">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-4 text-3xl font-bold">
            QUẢN LÝ PHÂN QUYỀN
          </h1>
          <p className="mt-3 leading-6 text-blue-100">
            Quản lý quyền truy cập và phạm vi phụ trách của
            đội ngũ quản trị viên HỌC TẬP SỐ.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            1. Hệ thống vai trò
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-blue-800">learner</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Người học. Được sử dụng các chức năng học tập
                theo nhóm đã đăng ký.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-green-800">field_admin</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quản trị viên lĩnh vực. Chỉ được quản lý
                những lĩnh vực được giao.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-purple-800">super_admin</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quản trị viên cấp cao. Có quyền phê duyệt,
                cấp, thay đổi và thu hồi quyền quản trị.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            2. Nguyên tắc phân quyền
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
            <li>
              Chỉ có một tài khoản super_admin đang hoạt động
              tại một thời điểm.
            </li>
            <li>
              Chỉ super_admin được cấp, thay đổi, gia hạn,
              đình chỉ hoặc thu hồi quyền field_admin.
            </li>
            <li>
              Một field_admin có thể được giao một hoặc nhiều
              lĩnh vực.
            </li>
            <li>
              field_admin không được tự nâng cấp quyền hoặc
              cấp quyền cho tài khoản khác.
            </li>
            <li>
              Quyền quản trị được cấp theo chu kỳ 5 ngày.
              Hết hạn thì chức năng quản trị bị khóa.
            </li>
            <li>
              Tài khoản người dùng và mật khẩu vẫn được giữ
              nguyên khi quyền quản trị hết hạn.
            </li>
            <li>
              Mọi thao tác phân quyền phải được ghi vào nhật ký
              hệ thống.
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            3. Chuẩn bị phân quyền quản trị viên
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Chỉ super_admin đã được hệ thống xác thực mới được
            thực hiện thao tác cấp quyền chính thức.
          </p>

          <form onSubmit={handlePreview} className="mt-6 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                ID tài khoản người được giao quyền
              </label>

              <input
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                required
                placeholder="Nhập ID người dùng trong hệ thống"
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Lĩnh vực được giao quản lý
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                {LEARNING_FIELDS.map((field) => (
                  <label
                    key={field.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field.id)}
                      onChange={() => toggleField(field.id)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-700">
                      {field.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Lý do phân quyền
              </label>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
                rows={4}
                placeholder="Nhập lý do, nhiệm vụ và phạm vi công việc..."
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
              <strong>Thời hạn dự kiến:</strong> 5 ngày kể từ
              thời điểm được super_admin phê duyệt.
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Kiểm tra thông tin phân quyền
            </button>
          </form>

          {preview && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-bold text-amber-900">
                Thông tin phân quyền đã chuẩn bị
              </h3>

              <p className="mt-3 text-sm text-slate-700">
                ID tài khoản: {userId}
              </p>

              <p className="mt-2 text-sm text-slate-700">
                Số lĩnh vực được chọn: {selectedFields.length}
              </p>

              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                {selectedFields.map((id) => (
                  <li key={id}>
                    {LEARNING_FIELDS.find((field) => field.id === id)?.name}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-sm text-amber-900">
                Đây chỉ là bản xem trước. Chưa cấp quyền,
                chưa lưu thay đổi và chưa gửi yêu cầu lên máy chủ.
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            4. Yêu cầu bảo mật bắt buộc
          </h2>

          <p className="mt-3 text-sm leading-6 text-amber-900">
            Việc phân quyền chính thức phải được thực hiện
            phía máy chủ, kiểm tra vai trò super_admin,
            áp dụng Supabase Row Level Security (RLS),
            lưu thời hạn quyền và ghi nhật ký thao tác.
            Không được dựa riêng vào giao diện trình duyệt
            để cấp hoặc thu hồi quyền.
          </p>
        </section>

      </div>
    </main>
  );
}
