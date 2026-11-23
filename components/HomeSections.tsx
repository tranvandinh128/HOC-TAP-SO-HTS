
const navigationItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Tin tức – Sự kiện", href: "#tin-tuc" },
  { label: "Mạng xã hội học tập", href: "#mang-xa-hoi" },
  { label: "Sàn thương mại điện tử", href: "#san-thuong-mai" },
  { label: "Token Học Tập Số", href: "#token-hts" },
  { label: "Từ thiện", href: "#tu-thien" },
  { label: "Doanh thu hoạt động thương mại", href: "#doanh-thu" },
  { label: "Chính sách phí nền tảng", href: "#chinh-sach-phi" },
  { label: "Đăng ký / Đăng nhập", href: "/dang-nhap" },
  { label: "Theo dõi học tập", href: "/theo-doi-hoc-tap" },
  { label: "Quản trị", href: "/quan-tri" },
];

export default function MainNavigation() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-3">
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-100 hover:text-green-800"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
