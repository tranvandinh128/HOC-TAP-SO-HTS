
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="text-7xl font-extrabold tracking-tight text-blue-700">
          404
        </div>

        <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <svg
            className="h-9 w-9 text-blue-700"
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

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Không tìm thấy trang
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Trang anh/chị đang tìm kiếm không tồn tại, đã được di chuyển
          hoặc đường dẫn không chính xác.
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Vui lòng kiểm tra lại địa chỉ hoặc quay về trang chủ
          HỌC TẬP SỐ để tiếp tục học tập và khám phá.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
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
