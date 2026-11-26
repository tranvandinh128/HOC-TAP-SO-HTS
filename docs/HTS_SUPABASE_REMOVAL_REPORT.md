# HTS – Báo cáo kiểm tra loại bỏ Supabase

**Ngày:** 26/11/2026
**Phạm vi:** Kiểm tra kết quả Giai đoạn 1, Git working tree, mã nguồn, package, artefact build/cache và cấu hình D1.
**Giới hạn:** Không sửa mã nguồn/cấu hình, không chạy migration/SQL, không kết nối Cloudflare/Supabase remote, không deploy và không commit. Báo cáo này là tài liệu duy nhất được tạo trong lượt kiểm tra.
**Kiến trúc tiếp theo:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md); xem [bản đồ chuyển đổi tài liệu](./HTS_DOCUMENTATION_CLOUDFLARE_MIGRATION_MAP.md) để biết trạng thái toàn bộ `docs/`.

## 1. Kết luận

- Không tìm thấy import, khởi tạo client, API call hoặc chức năng runtime Supabase trong `app/`, `components/`, `lib/`, `package.json` và `package-lock.json`.
- Hai package `@supabase/ssr` và `@supabase/supabase-js` đã bị gỡ khỏi manifest, lockfile và dependency tree hiện cài.
- OpenNext Worker đang được `wrangler.jsonc` cấu hình làm entrypoint đã được build lại; không tìm thấy Supabase trong `.open-next/`.
- Còn bản sao lịch sử trong tài liệu, `HTS_FULL_SOURCE_REVIEW.zip` và một Worker cache cũ trong `.wrangler/tmp/`; các mục này không được dùng làm mã nguồn hay Worker entrypoint hiện tại.
- Đăng nhập, đăng ký, khôi phục mật khẩu, quản lý phiên và các thao tác quản trị ghi dữ liệu hiện chưa được triển khai trên D1. Nhiều trang chỉ là giao diện minh họa/local state.
- Cấu hình D1 hiện tại được giữ nguyên. Việc đọc file không xác minh database ID, môi trường hoặc trạng thái D1 remote.

## 2. Danh sách 23 file thuộc thay đổi loại bỏ Supabase

Trong 23 file này: **21 file sửa**, **2 file xóa**, **0 file thêm**.

### 2.1. File đã sửa (21)

**Trang ứng dụng (18):**

1. [app/dang-ky/page.tsx](../app/dang-ky/page.tsx)
2. [app/dang-nhap/page.tsx](../app/dang-nhap/page.tsx)
3. [app/diem-danh/page.tsx](../app/diem-danh/page.tsx)
4. [app/hoc-tap/luc-luong-vu-trang/quan-ly-hoc-vien/page.tsx](../app/hoc-tap/luc-luong-vu-trang/quan-ly-hoc-vien/page.tsx)
5. [app/mang-xa-hoi/bai-viet/page.tsx](../app/mang-xa-hoi/bai-viet/page.tsx)
6. [app/mang-xa-hoi/tin-nhan/page.tsx](../app/mang-xa-hoi/tin-nhan/page.tsx)
7. [app/quan-tri/linh-vuc/page.tsx](../app/quan-tri/linh-vuc/page.tsx)
8. [app/quan-tri/nhat-ky/page.tsx](../app/quan-tri/nhat-ky/page.tsx)
9. [app/quan-tri/noi-dung/page.tsx](../app/quan-tri/noi-dung/page.tsx)
10. [app/quan-tri/phan-quyen/page.tsx](../app/quan-tri/phan-quyen/page.tsx)
11. [app/quan-tri/yeu-cau/page.tsx](../app/quan-tri/yeu-cau/page.tsx)
12. [app/quen-mat-khau/page.tsx](../app/quen-mat-khau/page.tsx)
13. [app/tai-khoan/page.tsx](../app/tai-khoan/page.tsx)
14. [app/theo-doi-hoc-tap/page.tsx](../app/theo-doi-hoc-tap/page.tsx)
15. [app/thi-truc-tuyen/ket-qua/page.tsx](../app/thi-truc-tuyen/ket-qua/page.tsx)
16. [app/thu-vien/page.tsx](../app/thu-vien/page.tsx)
17. [app/tin-tuc/page.tsx](../app/tin-tuc/page.tsx)
18. [app/yeu-cau-quan-tri/page.tsx](../app/yeu-cau-quan-tri/page.tsx)

**Menu tài khoản và dependency (3):**

19. [components/UserMenu.tsx](../components/UserMenu.tsx)
20. [package.json](../package.json)
21. [package-lock.json](../package-lock.json)

### 2.2. File đã xóa (2)

- `.env.example` — chỉ có hai biến `NEXT_PUBLIC_SUPABASE_*`.
- `supabase/schema.sql` — schema starter PostgreSQL; không phải migration D1. Thư mục rỗng `supabase/` cũng được gỡ.

Không có file source nào được thêm trong bộ 23 file. Báo cáo hiện tại là tài liệu mới, nằm ngoài bộ đó.

## 3. Kiểm tra phụ thuộc trong mã nguồn và package

Đã tìm toàn bộ `app/`, `components/` và `lib/` với các từ khóa Supabase/package/API auth. Không tìm thấy:

- import `@supabase/*`, khởi tạo `createClient`, `createBrowserClient` hoặc `createServerClient`;
- gọi `signInWithPassword`, `signUp`, `signOut`, reset password, Supabase REST/Storage/Realtime;
- API route, middleware hoặc Server Action xác thực bằng Supabase.

API route duy nhất trong source là [app/api/health/db/route.ts](../app/api/health/db/route.ts); route này chỉ kiểm tra D1 bằng `SELECT 1`. Helper [lib/db.ts](../lib/db.ts) lấy binding Cloudflare D1 phía server, không có logic Supabase.

Kiểm tra `package.json` và `package-lock.json`: không có chuỗi `@supabase`/Supabase. `npm ls` cho `@supabase/ssr`, `@supabase/supabase-js` và một số package Supabase liên quan trả về `(empty)`.

## 4. Tham chiếu lịch sử và artefact ngoài mã nguồn đang hoạt động

### Tài liệu

Các tài liệu dưới đây còn nhắc Supabase dưới dạng kết quả kiểm toán cũ, bối cảnh thiết kế, nguồn tham khảo hoặc hướng dẫn lịch sử; chúng không được import hay thực thi:

- Báo cáo/snapshot cũ: [BAO_CAO_RA_SOAT_SUPABASE_D1.md](./BAO_CAO_RA_SOAT_SUPABASE_D1.md), [HTS_FULL_PROJECT_AUDIT.md](./HTS_FULL_PROJECT_AUDIT.md), [HTS_PHASE_1_FINAL_REVIEW.md](./HTS_PHASE_1_FINAL_REVIEW.md), [HTS_PHASE_1_IMPLEMENTATION_PLAN.md](./HTS_PHASE_1_IMPLEMENTATION_PLAN.md), [HTS_DOT_1_README.md](./HTS_DOT_1_README.md), [HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md](./HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md).
- Tài liệu thiết kế có dẫn chiếu lịch sử: [HTS_MASTER_ARCHITECTURE.md](./HTS_MASTER_ARCHITECTURE.md), [HTS_D1_AUTH_RBAC_DESIGN.md](./HTS_D1_AUTH_RBAC_DESIGN.md), [HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md](./HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md), [HTS_AI_REPORTING_DESIGN.md](./HTS_AI_REPORTING_DESIGN.md), [HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md](./HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md), [HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md](./HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md), [HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md](./HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md).
- [README_HTS_v5.0.md](../README_HTS_v5.0.md) ghi rõ Cloudflare Workers + D1 là kiến trúc duy nhất và Supabase chỉ thuộc lịch sử.

### ZIP và thư mục build/cache

- [HTS_FULL_SOURCE_REVIEW.zip](../HTS_FULL_SOURCE_REVIEW.zip) là bản lưu đã tồn tại trước lượt này; danh sách entry còn có `.env.example`, `package.json`, `package-lock.json` và `supabase/schema.sql`. Không sửa hoặc xóa archive.
- `.open-next/` đã được build lại và không còn tham chiếu Supabase; đây là Worker entrypoint được khai báo trong Wrangler.
- `.wrangler/tmp/dev-ehUHca/worker.js` còn chứa bundle Supabase cũ. Đây là artefact tạm cũ, không phải entrypoint hiện tại; không xóa trong lượt chỉ-đọc.
- `.next/` sau build không còn tham chiếu Supabase.

## 5. Trạng thái các luồng tài khoản và quản trị

| Luồng | Trạng thái sau Giai đoạn 1 |
|---|---|
| Đăng nhập | Form chỉ hiển thị thông báo chưa khả dụng; không gọi API, không xác minh tài khoản, không tạo session và không gửi/lưu thông tin. |
| Đăng ký | Biểu mẫu có thể được điền; submit chỉ kiểm tra lựa chọn lĩnh vực và thông báo dữ liệu chưa gửi/lưu. Không tạo account, credential hoặc membership. |
| Quên mật khẩu | Chỉ có kiểm tra email phía giao diện; không gửi email, không tạo token khôi phục. |
| Trang tài khoản và menu | Là giao diện khung; không đọc session/hồ sơ D1; chưa có đăng xuất. |
| Duyệt yêu cầu/quản lý quyền | Nút trong trang yêu cầu được ghi rõ là thử nghiệm; trạng thái hiển thị không tạo/revoke grant trong D1. Không có kiểm tra quyền server-side. |
| Quản lý người dùng, nội dung, lĩnh vực, nhật ký | Dữ liệu minh họa hoặc trạng thái cục bộ; không có API D1 nghiệp vụ, audit persistence hay authorization thực tế. Trang gia hạn còn dùng `localStorage`, không phải session hoặc nguồn quyền đáng tin cậy. |

Không tìm thấy luồng session D1 hoặc authorization nghiệp vụ phía server. Các kiểm tra/guard ở giao diện không thay thế authorization phía server; vì vậy các luồng trên phải được coi là **chưa triển khai**, dù giao diện vẫn tồn tại.

## 6. Cấu hình Cloudflare D1

Các file/cấu hình hiện có được giữ nguyên; không có thao tác sửa trong lượt rà soát:

- [wrangler.jsonc](../wrangler.jsonc) giữ `DB` binding và tên database; Worker `main` trỏ `.open-next/worker.js`, có assets binding `ASSETS`.
- [lib/db.ts](../lib/db.ts) vẫn lấy D1 qua `getCloudflareContext`.
- [app/api/health/db/route.ts](../app/api/health/db/route.ts) vẫn chỉ chạy `SELECT 1`.
- `wrangler.jsonc` chưa khai báo `migrations_dir`, R2 binding hoặc các environment riêng.

Không gọi Wrangler tới remote, không kiểm tra database ID, và không xác nhận D1 local/remote/production. Cấu hình khai báo binding không đủ để kết luận database đã tồn tại hay đang được production sử dụng.

## 7. Git diff và thay đổi ngoài phạm vi 23 file

`git diff --name-status` cho thấy **29 đường dẫn tracked**: 23 file trong mục 2 và thêm 6 file:

- [README_HTS_v5.0.md](../README_HTS_v5.0.md) — đã dirty trước Giai đoạn 1; các dòng kiến trúc được cập nhật theo quyết định Cloudflare-only.
- [docs/HTS_DATABASE_AND_SECURITY_PLAN.md](./HTS_DATABASE_AND_SECURITY_PLAN.md), [docs/HTS_DOT_1_README.md](./HTS_DOT_1_README.md), [docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md](./HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md) — cập nhật nội dung kiến trúc/hướng dẫn cũ; thuộc phần tài liệu.
- `eslint.config.mjs` và `next.config.ts` — đã có thay đổi trong working tree **trước** Giai đoạn 1; không phải thay đổi của việc gỡ Supabase.

Ngoài tracked diff, working tree có nhiều mục untracked đã tồn tại trước Giai đoạn 1, gồm `.wrangler/`, `HTS_FULL_SOURCE_REVIEW.zip`, `app/api/`, `lib/db.ts`, `wrangler.jsonc`, `open-next.config.ts`, các file kiểu Cloudflare và các tài liệu thiết kế. Các mục này không được coi là file mới do lượt rà soát hiện tại tạo ra. `.open-next/` được tái tạo bởi build ở Giai đoạn 1.

Trong lượt rà soát này không sửa source hay cấu hình; chỉ tạo báo cáo này.

## 8. Kiểm tra và kết luận chuyển giai đoạn

- TypeScript `npm run typecheck`: **đạt**.
- ESLint `npm run lint`: **đạt**.
- Next.js build và OpenNext Cloudflare build đã **đạt trong Giai đoạn 1**; build OpenNext trên Windows có cảnh báo tương thích nền tảng.
- Không chạy migration/SQL, không thay đổi D1, không kết nối Production, không deploy và không commit.

**Kết luận:**

1. **Đã loại bỏ Supabase khỏi mã nguồn đang hoạt động chưa?** Có: không còn import/client/API/dependency Supabase trong source, manifest, lockfile hoặc OpenNext bundle hiện tại.
2. **Còn phụ thuộc nào cần xử lý không?** Không còn runtime dependency. Còn tham chiếu lịch sử trong tài liệu, ZIP lưu trữ và bundle tạm cũ `.wrangler/tmp`; chúng không được dùng bởi mã nguồn/Worker entry hiện tại. Cần quyết định riêng nếu muốn xóa hoặc tạo lại các bản lưu/cache này.
3. **Có thể chuyển sang Giai đoạn 2 chưa?** Có thể bắt đầu kiểm tra/chuẩn hóa cấu hình D1 sau khi chủ dự án phê duyệt. Chưa đủ căn cứ xác nhận môi trường D1 remote/production; không nên tạo migration hoặc bắt đầu bước triển khai database trước khi xác định môi trường và được phê duyệt.

**Trạng thái:** Dừng tại đây và chờ chủ dự án phê duyệt Giai đoạn 2.
