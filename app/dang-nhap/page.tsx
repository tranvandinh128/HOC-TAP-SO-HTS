
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Đăng nhập chưa khả dụng. Hệ thống xác thực Cloudflare chưa được triển khai; thông tin bạn nhập không được gửi hoặc lưu."
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

          <p className="mt-1 text-sm text-gray-500">
            Kết nối tri thức - Phát triển cộng đồng
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Ẩn mật khẩu"
                    : "Hiện mật khẩu"
                }
                className="px-4 text-sm font-medium text-green-700 hover:text-green-900"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link
              href="/quen-mat-khau"
              className="text-sm font-medium text-green-700 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800"
          >
            ĐĂNG NHẬP
          </button>

          <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/dang-ky"
              className="font-semibold text-green-700 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>

          <div className="border-t pt-5 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-green-700"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
