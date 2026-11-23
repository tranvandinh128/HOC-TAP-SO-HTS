
import Link from "next/link";

type AccessDeniedProps = {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
};

export default function AccessDenied({
  title = "Không đủ quyền truy cập",
  message = "Tài khoản của anh/chị chưa được cấp quyền sử dụng chức năng này. Vui lòng liên hệ Quản trị cấp cao để được xem xét.",
  showHomeLink = true,
}: AccessDeniedProps) {
  return (
    <main className="flex min-h-[40vh] items-center justify-center px-4 py-10">
      <div
        role="alert"
        className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-7 text-center shadow-sm"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-700"
        >
          !
        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {message}
        </p>

        <div className="mt-5 rounded-lg bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900">
          <strong>Quy định phân quyền HTS:</strong>
          <ul className="ml-5 mt-2 list-disc">
            <li>Quản trị viên cấp thấp chỉ quản lý lĩnh vực được giao.</li>
            <li>Chỉ Quản trị cấp cao được phê duyệt và thu hồi quyền quản trị.</li>
            <li>Người dùng không được tự nâng cấp quyền tài khoản.</li>
          </ul>
        </div>

        {showHomeLink && (
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Trở về trang chủ
          </Link>
        )}
      </div>
    </main>
  );
}
