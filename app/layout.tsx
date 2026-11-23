import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
export const metadata: Metadata = { title: 'Học Tập Số | Digital Learning', description: 'Tri thức số cho mọi người – Học tập không giới hạn – Kết nối cộng đồng – Kiến tạo tương lai.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body><Header/>{children}<footer className="footer"><strong>HỌC TẬP SỐ – DIGITAL LEARNING</strong><p>Tri thức số cho mọi người – Học tập không giới hạn – Kết nối cộng đồng – Kiến tạo tương lai.</p><small>Phiên bản khởi tạo nghiên cứu và thử nghiệm.</small></footer></body></html>}
