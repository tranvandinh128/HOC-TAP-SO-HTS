
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 px-5 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <Link href="/" className="text-xl font-bold">
            HỌC TẬP SỐ – HTS
          </Link>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Nền tảng học tập số – kết nối tri thức,
            ứng dụng công nghệ và trí tuệ nhân tạo,
            phục vụ cộng đồng và phát triển xã hội học tập.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Liên kết</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/#linh-vuc">Lĩnh vực học tập</Link></li>
            <li><Link href="/#gioi-thieu">Giới thiệu</Link></li>
            <li><Link href="/#dinh-huong">Định hướng</Link></li>
            <li><Link href="/dang-nhap">Đăng nhập</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold">HỌC TẬP SỐ</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Học tập suốt đời – Chuyển đổi số –
            Xây dựng xã hội học tập.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-700 pt-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} HỌC TẬP SỐ (HTS).
        Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
