
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("HTS Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-700">
          HỌC TẬP SỐ
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Đã xảy ra lỗi
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Hệ thống đang gặp sự cố khi xử lý yêu cầu của anh/chị.
          Vui lòng thử tải lại nội dung. Nếu lỗi tiếp tục xảy ra,
          hãy liên hệ bộ phận hỗ trợ.
        </p>

        {error.digest && (
          <p className="mt-4 break-all text-xs text-slate-400">
            Mã tham chiếu lỗi: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Thử lại
          </button>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Về trang chủ
          </Link>

          <Link
            href="/lien-he"
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          HỌC TẬP SỐ – Kết nối tri thức, phát triển cộng đồng.
        </p>
      </section>
    </main>
  );
}
