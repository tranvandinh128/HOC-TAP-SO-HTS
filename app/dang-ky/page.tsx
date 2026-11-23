
"use client";

import { useState } from "react";

const learningGroups = [
  { id: "cong-dan", name: "Công dân học tập" },
  { id: "cong-nhan", name: "Công nhân học tập" },
  { id: "sinh-vien", name: "Sinh viên học tập" },
  { id: "thpt", name: "Học sinh THPT" },
  { id: "thcs", name: "Học sinh THCS" },
  { id: "tieu-hoc", name: "Học sinh tiểu học" },
  { id: "luc-luong-vu-trang", name: "Lực lượng vũ trang (Quân đội – Công an)" },
];

export default function RegisterPage() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleGroup(id: string) {
    setSelectedGroups((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedGroups.length === 0) {
      setMessage("Vui lòng chọn ít nhất một lĩnh vực học tập.");
      return;
    }

    setMessage(
      "Thông tin đã được kiểm tra trên biểu mẫu. Chức năng lưu tài khoản sẽ được kết nối với Supabase sau khi hoàn thiện hệ thống xác thực."
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
          <p className="mt-3 text-gray-600">
            Tham gia cộng đồng HỌC TẬP SỐ – HTS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Nhập họ và tên"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Nhập địa chỉ email"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Nhập số điện thoại"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Tối thiểu 8 ký tự"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <h2 className="mb-3 font-bold text-gray-800">
              Lựa chọn lĩnh vực học tập
            </h2>

            <p className="mb-4 text-sm text-gray-500">
              Bạn có thể đăng ký nhiều lĩnh vực trên cùng một tài khoản.
            </p>

            <div className="space-y-3">
              {learningGroups.map((group) => (
                <label
                  key={group.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-green-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => toggleGroup(group.id)}
                    className="h-4 w-4 accent-green-700"
                  />
                  <span className="text-sm text-gray-700">
                    {group.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Công dân và công nhân có thể học miễn phí mà không cần đăng ký
            tài khoản. Các lĩnh vực còn lại yêu cầu tài khoản để truy cập
            theo quy định của nền tảng.
          </p>

          {message && (
            <div
              role="status"
              className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
          >
            ĐĂNG KÝ TÀI KHOẢN
          </button>

          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a
              href="/dang-nhap"
              className="font-semibold text-green-700 hover:underline"
            >
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
