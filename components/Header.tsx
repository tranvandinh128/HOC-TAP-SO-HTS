import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link className="brand" href="/">
        <span className="brand-mark">HTS</span>
        <span>HỌC TẬP SỐ<small>DIGITAL LEARNING</small></span>
      </Link>
      <nav>
        <Link href="/#linh-vuc">Lĩnh vực học tập</Link>
        <Link href="/#quan-ly-giao-duc">Quản lý giáo dục</Link>
        <Link href="/#gioi-thieu">Giới thiệu</Link>
        <Link href="/#dinh-huong">Định hướng</Link>
      </nav>
      <Link className="login-link" href="/dang-nhap">Đăng nhập</Link>
    </header>
  );
}
