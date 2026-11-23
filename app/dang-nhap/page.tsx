
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Giao diện đăng nhập đã sẵn sàng. Chức năng xác thực tài khoản sẽ được kết nối với Supabase."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            HỌC TẬP SỐ
          </h1>
          <p className="mt-2 text-gray-600">
            Đăng nhập vào tài khoản HTS
          </p>
        </div>

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
              placeholder="Nhập email của bạn"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Mật khẩu
            </label>

            <div className="flex rounded-lg border border-gray-300 focus-within:border-green-600">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                className="min-w-0 flex-1 rounded-lg p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-sm font-medium text-green-700"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="/quen-mat-khau"
              className="text-sm font-medium text-green-700 hover:underline"
            >
              Quên mật khẩu?
            </a>
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
            ĐĂNG NHẬP
          </button>

          <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="/dang-ky"
              className="font-semibold text-green-700 hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>

          <div className="border-t pt-5 text-center">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-green-700"
            >
              ← Quay lại trang chủ
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
