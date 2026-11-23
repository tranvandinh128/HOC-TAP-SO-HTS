# HỌC TẬP SỐ (HTS) – Starter v0.1

Bộ mã nguồn khởi tạo theo tài liệu đề tài HỌC TẬP SỐ KỶ NGUYÊN 4.0. Nền tảng: Next.js **15.2.4**, TypeScript, Supabase (chuẩn bị tích hợp).

## Đã có trong bản khởi tạo
- Trang chủ giới thiệu HTS, lộ trình phát triển và 7 lĩnh vực học tập.
- Công dân học tập và Công nhân học tập được đánh dấu truy cập mở, không cần tài khoản.
- Sinh viên, học sinh các cấp và Lực lượng vũ trang được đánh dấu cần tài khoản.
- Trang chi tiết riêng cho từng lĩnh vực.
- Giao diện mẫu đăng nhập (chưa kết nối xác thực, không lưu thông tin nhập).
- Trang khung quản trị (chưa cấp quyền hay thao tác dữ liệu).
- SQL khởi tạo các bảng hồ sơ, lĩnh vực, khóa học, bài học và tiến độ; có RLS cơ bản.
- Thiết kế responsive cho điện thoại và máy tính.

## Chạy trên máy tính
Yêu cầu Node.js 20.9 trở lên và npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở http://localhost:3000.

Trên Windows PowerShell, có thể sao chép `.env.example` thành `.env.local` bằng lệnh `Copy-Item .env.example .env.local`.

## Kết nối Supabase (giai đoạn tiếp theo)
1. Tạo một dự án Supabase riêng cho HTS.
2. Chạy nội dung `supabase/schema.sql` trong SQL Editor sau khi rà soát.
3. Điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào `.env.local`.
4. Triển khai xác thực email/điện thoại, hồ sơ, phân quyền và kiểm thử RLS trước khi đưa dữ liệu thật vào.

Không đưa `service_role` key, mật khẩu, token bí mật hoặc dữ liệu cá nhân vào GitHub. Không commit `.env.local`.

## Đưa lên GitHub
Tạo repository riêng, giải nén thư mục dự án, mở terminal tại thư mục này:

```bash
git init
git add .
git commit -m "Initial HTS learning platform scaffold"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Thay `USERNAME/REPOSITORY` bằng repository do bạn tạo.

## Phạm vi chưa hoàn thành
Đây là bản nền tảng giao diện và cấu trúc ban đầu, chưa phải hệ thống vận hành đầy đủ. Chưa có xác thực thật, dashboard quản trị có thao tác, CRUD nội dung, thi/chấm điểm, lưu tiến độ, mạng xã hội, gọi video, marketplace, thanh toán, token HTS, quyên góp, báo cáo doanh thu, sao lưu/khôi phục hay kiểm thử bảo mật chuyên sâu. Các nội dung này cần phát triển và nghiệm thu theo từng giai đoạn.

## Lưu ý về thông tin
Tài liệu đầu vào có thông tin cá nhân và thông tin đơn vị. Bản mã nguồn này không đưa số điện thoại, tài khoản mạng xã hội, danh sách nhân sự hay dữ liệu nội bộ đó vào giao diện công khai. Trước khi công bố đề tài hoặc triển khai cho lực lượng vũ trang, cần rà soát quy định bảo vệ dữ liệu cá nhân và quy định bảo vệ bí mật nhà nước/quân sự áp dụng.
