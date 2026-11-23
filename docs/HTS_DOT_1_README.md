
# HTS – Gói bổ sung đợt 1

## Mục tiêu
Gói này bổ sung các phần còn thiếu có thể thêm an toàn vào mã nguồn hiện tại:
- Tạo trang `/tai-khoan` để không còn liên kết 404 từ menu tài khoản.
- Bổ sung mô hình kiểu TypeScript dùng chung cho hồ sơ, yêu cầu quản trị, nhật ký và nhập điểm.
- Ghi rõ các quy tắc nghiệp vụ để tránh nhầm lẫn giữa giao diện thử nghiệm và chức năng thật.

## Các tệp trong gói

| Đường dẫn | Thao tác |
|---|---|
| `app/tai-khoan/page.tsx` | Tạo mới |
| `lib/hts-model.ts` | Tạo mới |
| `docs/HTS_DOT_1_README.md` | Tạo mới |
| `docs/HTS_DATABASE_AND_SECURITY_PLAN.md` | Tạo mới |

## Cách đưa lên GitHub
1. Tải và giải nén gói ZIP này trên máy tính.
2. Mở thư mục dự án HTS đang dùng, đúng nhánh `main`.
3. Kéo thư mục `app` và `lib` trong gói vào thư mục gốc dự án. Khi máy hỏi, chọn hợp nhất thư mục; không xóa các tệp đang có.
4. Kéo thư mục `docs` vào thư mục gốc dự án.
5. Kiểm tra đúng cấu trúc: `app/tai-khoan/page.tsx`, `lib/hts-model.ts`, `docs/...`.
6. Commit và push lên GitHub.

**Commit message**
`Add HTS account page and shared domain models`

**Extended description**
`Add the missing account route referenced by the user menu, introduce shared TypeScript models for profiles, field-admin requests, audit logs and exam score imports, and document the next database/security implementation phase. No live authentication or database behavior is claimed.`

## Lưu ý quan trọng
- Gói này không thay thế hoặc sửa `supabase/schema.sql`.
- Chưa chạy SQL nào trên Supabase.
- Chưa kết nối đăng nhập, đăng ký, quên mật khẩu, duyệt quản trị hoặc nhật ký thật.
- Chưa đưa dữ liệu cá nhân, dữ liệu quân đội, dữ liệu quà tặng/đồng phục hoặc dữ liệu sinh trắc học thật lên hệ thống.
- Sau khi tải lên GitHub, gửi lại ZIP mã nguồn mới nhất hoặc các tệp đã thay đổi để rà soát tiếp.
