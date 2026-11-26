
"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Vui lòng nhập địa chỉ email.");
      return;
    }

    setMessage(
      "Chức năng khôi phục chưa khả dụng. Yêu cầu này chưa được gửi hoặc lưu; dịch vụ xác thực Cloudflare sẽ được triển khai ở giai đoạn sau."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-green-800">
            KHÔI PHỤC MẬT KHẨU
          </h1>
          <p className="mt-3 text-gray-600">
            HỌC TẬP SỐ – HTS
          </p>
        </div>

        <p className="mb-6 text-sm leading-6 text-gray-600">
          Nhập địa chỉ email đã đăng ký. Khi hệ thống được kết nối,
          bạn sẽ nhận được hướng dẫn đặt lại mật khẩu qua email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Địa chỉ Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Nhập email đã đăng ký"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
            />
          </div>

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
            GỬI YÊU CẦU KHÔI PHỤC
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <p>
            <a
              href="/dang-nhap"
              className="font-semibold text-green-700 hover:underline"
            >
              ← Quay lại đăng nhập
            </a>
          </p>

          <p>
            Chưa có tài khoản?{" "}
            <a
              href="/dang-ky"
              className="font-semibold text-green-700 hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
