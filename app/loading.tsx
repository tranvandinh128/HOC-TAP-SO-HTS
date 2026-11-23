
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-9 w-9 animate-spin text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-xl font-bold text-slate-900">
          HỌC TẬP SỐ – HTS
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Hệ thống đang tải nội dung. Vui lòng chờ trong giây lát...
        </p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-700" />
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Kết nối tri thức – Chia sẻ kiến thức – Phát triển cộng đồng
        </p>
      </section>
    </main>
  );
}
