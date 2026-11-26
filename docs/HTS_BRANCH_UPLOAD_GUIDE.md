# HƯỚNG DẪN ĐƯA GÓI LÊN NHÁNH FEATURE

**Trạng thái:** Hướng dẫn lịch sử cho gói `feature/hts-education-management`; không phải quy trình triển khai Cloudflare hiện hành. Kiến trúc backend chuẩn được mô tả tại [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md). Các bước branch/commit dưới đây cần được chủ dự án rà soát trước khi sử dụng lại.

1. Mở repository `tranvandinh128/HOC-TAP-SO-HTS`.
2. Chọn nhánh `feature/hts-education-management` ở bộ chọn branch (không chọn `main`).
3. Giải nén ZIP trên máy tính.
4. Mở thư mục `hts_feature_bundle` vừa giải nén.
5. Tải lên các thư mục `lib` và `docs` vào thư mục gốc repository. Khi GitHub hỏi, giữ đúng cấu trúc thư mục; không tạo thư mục lồng `hts_feature_bundle/hts_feature_bundle`.
6. Trước khi commit, kiểm tra đường dẫn kết quả phải là:
   - `lib/education-management/types.ts`
   - `lib/education-management/permissions.ts`
   - `lib/education-management/academic-workflow.ts`
   - `lib/education-management/reporting.ts`
   - `lib/education-management/audit.ts`
   - `lib/education-management/index.ts`
   - `docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md`
   - `docs/HTS_BRANCH_UPLOAD_GUIDE.md`
7. Commit message đề xuất: `feat: add education management domain foundation`.
8. Mô tả: `Add isolated TypeScript domain models for scoped education permissions, academic result workflow, reporting rules and audit events. No database migration or existing file replacement.`
9. Không chọn tạo nhánh mới. Commit trực tiếp vào nhánh feature đang mở.
10. Gửi ảnh trang repository sau commit để kiểm tra.

Nếu lỡ đang ở `main`, dừng lại và chuyển branch trước khi tải file. Không xóa hoặc ghi đè file cũ.
