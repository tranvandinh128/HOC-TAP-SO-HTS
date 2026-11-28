# Gói mã nguồn khởi tạo DTC – HTS

## Phạm vi

Đây là gói bổ sung theo kiểu additive cho nhánh `feature/digital-technology-center`.
Nó tạo trang `/trung-tam-ky-thuat-so`, giao diện giới thiệu các nhóm chức năng,
catalog DTC và một bản đề xuất schema SQL ở dạng `.example`.

## Cấu trúc cần đưa lên repository

- `app/trung-tam-ky-thuat-so/page.tsx`
- `app/trung-tam-ky-thuat-so/dtc.css`
- `components/dtc/DtcDashboard.tsx`
- `lib/dtc/catalog.ts`
- `lib/dtc/README.md`
- `database/dtc/0001_dtc_schema_proposal.sql.example`
- `docs/DTC_SOURCE_PACKAGE_GUIDE.md`

## Cách cài vào mã nguồn HTS

Giải nén ZIP. Mở thư mục dự án HTS trong máy tính. Sao chép các thư mục `app`,
`components`, `lib`, `database`, `docs` trong gói vào thư mục gốc dự án HTS và
chọn gộp thư mục khi Windows hỏi. Gói này chỉ thêm đường dẫn mới, không yêu cầu
thay thế `app/layout.tsx`, `components/Header.tsx`, `lib/db.ts`, `lib/permissions.ts`,
`package.json`, `package-lock.json` hoặc `wrangler.jsonc`.

Sau khi đưa lên GitHub, truy cập:
`https://<domain-HTS>/trung-tam-ky-thuat-so`

## Kiểm tra

Tại máy phát triển, chạy:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Nếu có lỗi, dừng và xử lý trước khi triển khai. Chưa chạy migration SQL.

## Những gì chưa được triển khai

- Chưa tích hợp session/đăng nhập và entitlement DTC phía server.
- Chưa có đăng ký thiết bị/passkey hoặc sinh khóa.
- Chưa có ký số, mã hóa, giải mã, gửi/nhận tài liệu.
- Chưa có R2 binding hoặc API upload/download.
- Chưa có migration D1 hoạt động; tệp SQL là đề xuất để rà soát.
- Chưa có tuyên bố về giá trị pháp lý của chữ ký số.

Không sử dụng dữ liệu thật, tài liệu mật hoặc tài liệu quân sự hạn chế trong giai đoạn này.
