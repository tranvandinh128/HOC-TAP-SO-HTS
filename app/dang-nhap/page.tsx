
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type MessageType = "error" | "success";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<MessageType>("error");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const email = String(formData.get("email") || "")
        .trim()
        .toLowerCase();

      const password = String(formData.get("password") || "");

      const supabaseUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const supabaseAnonKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          "Chưa cấu hình kết nối Supabase. Vui lòng kiểm tra biến môi trường."
        );
      }

      const supabase = createClient(
        supabaseUrl,
        supabaseAnonKey
      );

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      setMessageType("success");
      setMessage("Đăng nhập thành công. Đang chuyển trang...");

      router.replace("/");
      router.refresh();
    } catch (error) {
      setMessageType("error");

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Đã xảy ra lỗi trong quá trình đăng nhập."
        );
      }
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
                disabled={loading}
                className="min-w-0 flex-1 rounded-lg p-3 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                disabled={loading}
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
              className={`rounded-lg p-3 text-sm ${
                messageType === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
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
