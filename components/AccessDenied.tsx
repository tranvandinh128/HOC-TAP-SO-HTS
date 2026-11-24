
import Link from "next/link";

type AccessDeniedProps = {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
};

export default function AccessDenied({
  title = "Không đủ quyền truy cập",
  message = "Tài khoản của anh/chị chưa được cấp quyền sử dụng chức năng này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
  showHomeLink = true,
}: AccessDeniedProps) {
  return (
    <main className="flex min-h-[40vh] items-center justify-center px-4 py-10">
      <div
        role="alert"
        className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-7 text-center shadow-sm"
      >
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 text-xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mb-6 text-sm leading-6 text-gray-600">
          {message}
        </p>

        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Quay về trang chủ
          </Link>
        )}
      </div>
    </main>
  );
}
