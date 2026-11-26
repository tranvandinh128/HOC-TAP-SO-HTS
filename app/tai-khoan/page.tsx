
import Link from "next/link";

export default function TaiKhoanPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Tài khoản HTS
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Thông tin tài khoản
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Trang này sẽ hiển thị thông tin cá nhân, lĩnh vực học tập đã đăng ký,
          tiến độ học tập và trạng thái yêu cầu quyền quản trị sau khi hệ thống
          xác thực Cloudflare được triển khai.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Trạng thái hiện tại:</strong> Chức năng tài khoản mới là khung
          giao diện. Dự án chưa có xác thực Cloudflare hoạt động, vì vậy trang
          này không hiển thị hoặc lưu dữ liệu cá nhân.
          Không nhập thông tin nhạy cảm vào trang thử nghiệm.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dang-nhap"
            className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Đến trang đăng nhập
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Về trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
