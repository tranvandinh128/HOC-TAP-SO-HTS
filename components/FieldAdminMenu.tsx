
import Link from "next/link";

type FieldAdminMenuProps = {
  fieldName: string;
  fieldSlug: string;
};

export default function FieldAdminMenu({
  fieldName,
  fieldSlug,
}: FieldAdminMenuProps) {
  const links = [
    {
      href: `/hoc-tap/${fieldSlug}`,
      label: "Trang lĩnh vực",
    },
    {
      href: `/quan-tri/noi-dung/${fieldSlug}`,
      label: "Quản lý nội dung",
    },
    {
      href: `/quan-tri/khoa-hoc/${fieldSlug}`,
      label: "Quản lý khóa học",
    },
    {
      href: `/quan-tri/bai-hoc/${fieldSlug}`,
      label: "Quản lý bài học",
    },
  ];

  return (
    <aside className="w-full rounded-xl border border-slate-200 bg-white p-4 md:w-64">
      <h2 className="text-lg font-bold text-slate-800">
        QUẢN TRỊ LĨNH VỰC
      </h2>

      <p className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
        Lĩnh vực được giao:{" "}
        <strong>{fieldName}</strong>
      </p>

      <nav className="mt-5" aria-label="Menu quản trị lĩnh vực">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-5 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Quản trị viên chỉ được quản lý lĩnh vực đã được
        Quản trị cấp cao phê duyệt. Không được tự cấp,
        thay đổi hoặc thu hồi quyền quản trị.
      </div>
    </aside>
  );
}
