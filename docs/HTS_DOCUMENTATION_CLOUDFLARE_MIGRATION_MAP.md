# HTS – Bản đồ chuyển đổi tài liệu sang Cloudflare

**Ngày kiểm kê:** 26/11/2026
**Phạm vi:** Toàn bộ file trực tiếp trong `docs/` tại thời điểm rà soát: 16 file Markdown. Không quét ZIP/cache như tài liệu hoạt động. Hai tài liệu mới trong lần này là bản đồ này và kiến trúc chuẩn; tổng sau cập nhật là 18 file.

## 1. Quy tắc chuẩn

- [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md) là nguồn chuẩn duy nhất về kiến trúc kỹ thuật hiện hành.
- Tài liệu chuyên đề chỉ bổ sung nghiệp vụ; khi khác biệt về kiến trúc phải theo tài liệu chuẩn và cập nhật bản đồ này.
- Báo cáo lịch sử được giữ nguyên kết quả tại thời điểm kiểm tra. Ghi chú trạng thái mới không sửa kết luận cũ và không biến giả định lịch sử thành trạng thái production hiện tại.
- Tài liệu kế hoạch/thiết kế không chứng minh chức năng đã triển khai. Không coi danh sách bảng là schema đã tồn tại.

## 2. Kiểm kê từng tài liệu

| File tài liệu | Nội dung Supabase cũ | Nội dung cần chuyển đổi | Trạng thái | Ghi chú |
|---|---|---|---|---|
| [BAO_CAO_RA_SOAT_SUPABASE_D1.md](./BAO_CAO_RA_SOAT_SUPABASE_D1.md) | Kiểm kê schema starter, Supabase Auth và phụ thuộc cũ; có các đề xuất lịch sử về dữ liệu/migration | Không chuyển báo cáo lịch sử thành hướng dẫn; chỉ làm rõ Cloudflare-only hiện hành và link canonical | Giữ lịch sử; chỉ bổ sung/chuẩn hóa ghi chú trạng thái | Giữ nguyên findings, giới hạn và các đề xuất tại thời điểm báo cáo; mọi câu nói về Supabase là quá khứ/chưa xác minh bên ngoài. |
| [HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md](./HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md) | Chỉ tham chiếu báo cáo Supabase/D1 cũ | D1/Worker, payment verification server-side, status tách bạch và Pi/admin policy | Cập nhật liên kết chuẩn | Nội dung nghiệp vụ giữ nguyên; dùng canonical cho nền tảng, giữ Pi API/refund/finality là quyết định còn thiếu. |
| [HTS_AI_REPORTING_DESIGN.md](./HTS_AI_REPORTING_DESIGN.md) | Tham chiếu báo cáo Supabase/D1 làm nguồn kiểm toán | Worker authorization, D1 metadata, R2 private, AI và export theo scope | Cập nhật liên kết chuẩn | Nội dung đã theo D1/R2; provider, retention và permissions chi tiết còn cần phê duyệt. |
| [HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md](./HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md) | Tham chiếu báo cáo cũ như nguồn | D1 + Worker + R2 private, quyền dữ liệu AI, luồng API server-side | Cập nhật liên kết chuẩn | Giữ danh mục học liệu/bảng ứng viên; lựa chọn provider, vùng R2, quota và retention chưa chốt. |
| [HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md](./HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md) | Tham chiếu báo cáo cũ để lấy danh mục bảng D1 | D1 qua Worker, RBAC, R2 private cho tài liệu, audit và retention | Cập nhật liên kết chuẩn | Quy tắc sinh trắc/phê duyệt pháp lý giữ nguyên; không có triển khai nhận diện thật. |
| [HTS_BRANCH_UPLOAD_GUIDE.md](./HTS_BRANCH_UPLOAD_GUIDE.md) | Không có chỉ dẫn Supabase | Không liên quan trực tiếp đến kiến trúc; xác định rõ đây là quy trình tải gói/branch lịch sử, không phải quy trình triển khai hiện hành | Gắn nhãn tài liệu lịch sử | Hướng dẫn commit trực tiếp branch cũ cần chủ dự án quyết định giữ/archive/thay thế; không dùng như hướng dẫn deploy. |
| [HTS_D1_AUTH_RBAC_DESIGN.md](./HTS_D1_AUTH_RBAC_DESIGN.md) | Có tham chiếu báo cáo legacy; nguy cơ bị hiểu là auth cũ còn dùng | Auth tự xây ở Worker/D1, cookie/session server-side, RBAC/scope và bootstrap Root | Cập nhật liên kết chuẩn | Thiết kế nghiệp vụ giữ nguyên; thuật toán password, email, MFA, timeout và recovery còn TBD. |
| [HTS_DATABASE_AND_SECURITY_PLAN.md](./HTS_DATABASE_AND_SECURITY_PLAN.md) | Không có chỉ dẫn Supabase runtime; tài liệu đã mô tả D1/Worker và Auth riêng | Gắn chuẩn kiến trúc Cloudflare; xác nhận mọi quyền do server kiểm tra, R2 theo chuẩn riêng | Cập nhật liên kết chuẩn | Không tạo migration; chính sách nghiệp vụ giữ nguyên. |
| [HTS_DOT_1_README.md](./HTS_DOT_1_README.md) | Hướng dẫn cũ nói schema PostgreSQL và SQL trên Supabase | Làm rõ đây là snapshot lịch sử; nền hiện tại là Worker/D1; link canonical | Gắn nhãn lịch sử và liên kết chuẩn | Giữ nội dung gói cũ làm dấu vết; hướng dẫn upload/branch cũ không phải quy trình hiện hành. |
| [HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md](./HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md) | Snapshot Supabase/D1 và cụm “server/API và RLS” | Dùng Worker authorization/server-side thay RLS; tham chiếu canonical | Cập nhật kiến trúc và thuật ngữ | Giữ quy trình học tập, báo cáo, roles và scope; không sửa logic nghiệp vụ đã thống nhất. |
| [HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md](./HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md) | Tham chiếu báo cáo cũ làm nguồn bảng ứng viên | D1/Worker kiểm quyền cho metadata/API/object; R2 private và audit | Cập nhật liên kết chuẩn | Giữ yêu cầu xác minh/phê duyệt trước truy cập; cơ quan, bộ dữ liệu tối thiểu và retention còn chờ quyết định. |
| [HTS_FULL_PROJECT_AUDIT.md](./HTS_FULL_PROJECT_AUDIT.md) | Snapshot 14/07/2026 ghi nhận login Supabase và rủi ro tại thời điểm đó | Không viết lại audit; ghi rõ trạng thái hiện tại khác và link kiến trúc chuẩn | Giữ lịch sử; chỉ bổ sung/chuẩn hóa ghi chú | Bảo toàn số liệu, findings và giới hạn của lần audit. |
| [HTS_MASTER_ARCHITECTURE.md](./HTS_MASTER_ARCHITECTURE.md) | Dựa trên báo cáo Supabase/D1 lịch sử; đã có quyết định Cloudflare | Nêu rõ là tài liệu tổng hợp bổ trợ; kiến trúc chuẩn duy nhất chuyển sang canonical mới | Cập nhật thứ bậc tài liệu | Danh mục bảng cũ vẫn là ứng viên, không tạo nguồn chuẩn song song. |
| [HTS_PHASE_1_FINAL_REVIEW.md](./HTS_PHASE_1_FINAL_REVIEW.md) | Snapshot trước quyết định gỡ Supabase, có đề xuất/giới hạn cũ | Không sửa kết luận; thêm link chuẩn và giữ note rằng không xác nhận production | Giữ lịch sử; chỉ bổ sung/chuẩn hóa ghi chú | Findings D1/local/remote và quyền không bị viết lại. |
| [HTS_PHASE_1_IMPLEMENTATION_PLAN.md](./HTS_PHASE_1_IMPLEMENTATION_PLAN.md) | Nhắc Supabase như bối cảnh/schema cũ | Worker/D1 canonical, Auth riêng, R2, migration gate và policies | Cập nhật liên kết chuẩn | Kế hoạch chưa được phê duyệt triển khai; tên bảng vẫn cần inventory. |
| [HTS_SUPABASE_REMOVAL_REPORT.md](./HTS_SUPABASE_REMOVAL_REPORT.md) | Báo cáo bằng chứng gỡ package/source, ghi nhận archive/cache cũ | Giữ kết quả removal, nối tới kiến trúc canonical và bản đồ này | Cập nhật liên kết chuẩn | Báo cáo là snapshot Giai đoạn 1; không diễn giải là auth/D1 đã hoàn thành. |

## 3. Phân loại và quyết định lưu giữ

### 3.1. Kiến trúc/kế hoạch/thiết kế cần theo chuẩn Cloudflare

Bao gồm `HTS_MASTER_ARCHITECTURE`, `HTS_D1_AUTH_RBAC_DESIGN`, `HTS_DATABASE_AND_SECURITY_PLAN`, `HTS_PHASE_1_IMPLEMENTATION_PLAN`, `HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN`, `HTS_AI_REPORTING_DESIGN`, `HTS_AI_TEACHING_AND_CURRICULUM_DESIGN`, `HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN`, `HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN` và `HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION`. Các tài liệu này đã được rà soát và gắn với canonical; chúng bổ sung chi tiết miền, không phải kiến trúc backend song song.

### 3.2. Báo cáo lịch sử cần giữ làm bằng chứng

`BAO_CAO_RA_SOAT_SUPABASE_D1.md`, `HTS_FULL_PROJECT_AUDIT.md` và `HTS_PHASE_1_FINAL_REVIEW.md` giữ nguyên findings/thời điểm; ghi chú trạng thái chỉ phân biệt lịch sử với kiến trúc hiện tại. `HTS_SUPABASE_REMOVAL_REPORT.md` giữ nguyên kết quả Giai đoạn 1.

### 3.3. Tài liệu/gói cũ cần quyết định riêng

`HTS_DOT_1_README.md` và `HTS_BRANCH_UPLOAD_GUIDE.md` là hướng dẫn gói/nhánh lịch sử. Đã đánh dấu không phải chỉ dẫn kiến trúc/deploy hiện hành. Đề xuất chủ dự án quyết định riêng việc giữ, chuyển vào archive hoặc thay bằng workflow upload/branch mới; không tự xóa.

## 4. Kiểm tra tính thống nhất

- **Backend:** D1 duy nhất; mọi truy cập qua Worker/server. Không tài liệu thiết kế nào được dùng Supabase làm runtime/fallback hiện hành.
- **Auth:** hệ thống xác thực riêng do Worker xử lý, D1 giữ dữ liệu account/session; không dùng Supabase Auth. Kỹ thuật password/email/MFA/timeout còn là TBD, không giả vờ đã chốt.
- **Tệp:** R2 private-by-default làm mục tiêu; R2 binding, region, access pattern và retention chưa xác nhận/cấu hình.
- **Quyền và chính sách:** một account nhiều roles/memberships; không tự nâng quyền; server-side authorization; học miễn phí; duy nhất Root Super Admin của chủ dự án được miễn quản trị vĩnh viễn; các admin khác trả Pi theo gói đã chốt; paid không tự cấp grant; Lực lượng vũ trang phải được xác minh/phê duyệt trước truy cập.
- **Lịch sử:** Supabase còn trong các báo cáo cũ như bằng chứng trạng thái quá khứ; không phải hướng dẫn backend hiện hành.
- **Migration:** bảng trong thiết kế là candidates; không có căn cứ xác nhận D1 remote/schema production. Không chạy SQL/migration.
- **Liên kết:** tài liệu kiến trúc/thiết kế được nối tới canonical; báo cáo lịch sử liên kết để đặt đúng thời điểm và giới hạn kết luận.

## 5. Quyết định kỹ thuật còn chờ

Các phần tài liệu chưa thể trở thành chỉ dẫn triển khai chi tiết cho đến khi có quyết định: môi trường D1 và quyền inventory; migration framework, backup/restore/rollback; password verifier, email provider và MFA; session timeout/retention; Root bootstrap/recovery; R2 account/region, signed URL/proxy, scan và retention; Pi verification/finality/refund/appeal; cơ quan và dữ liệu tối thiểu cho xác minh Lực lượng vũ trang. Các nội dung nghiệp vụ đã chốt không bị mở lại bởi các quyết định kỹ thuật này.

## 6. Giới hạn rà soát

Chỉ rà soát/cập nhật tài liệu trong `docs/`. Không sửa source/config ngoài phạm vi, không thay đổi nghiệp vụ, không xóa tài liệu lịch sử, không tạo bảng/chạy SQL/migration, không thay đổi D1, không kết nối hoặc triển khai Production.
