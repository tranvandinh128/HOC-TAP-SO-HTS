
import Link from "next/link";

const adminLinks = [
  { href: "/quan-tri", label: "Tổng quan quản trị" },
  { href: "/quan-tri/yeu-cau", label: "Duyệt yêu cầu quản trị" },
  { href: "/quan-tri/nguoi-dung", label: "Quản lý người dùng" },
  { href: "/quan-tri/nhat-ky", label: "Nhật ký hoạt động" },
];

export default function Sidebar() {
  return (
    <aside className="w-full rounded-xl border border-slate-200 bg-white p-4 md:w-64">
      <h2 className="mb-4 text-lg font-bold text-slate-800">
        QUẢN TRỊ HTS
      </h2>

      <nav aria-label="Menu quản trị">
        <ul className="space-y-2">
          {adminLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Khu vực này dành cho quản trị viên.
        Quyền truy cập thực tế phải được xác thực
        bằng hệ thống phân quyền HTS.
      </div>
    </aside>
  );
}
