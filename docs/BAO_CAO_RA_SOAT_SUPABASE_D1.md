# Báo cáo rà soát kiến trúc Supabase và Cloudflare D1

**Ghi chú trạng thái 26/11/2026:** Báo cáo này lưu lại kết quả kiểm tra lịch sử. Chủ dự án đã chọn Cloudflare Workers + D1 làm backend duy nhất và loại bỏ Supabase khỏi mã nguồn; không dùng nội dung cũ như chỉ dẫn duy trì hai backend. Thay đổi này không xóa hoặc sửa tài nguyên bên ngoài.
**Kiến trúc hiện hành:** Xem [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md). Findings và giới hạn của báo cáo lịch sử bên dưới được giữ nguyên.

**Ngày rà soát:** 26/11/2026
**Tài liệu yêu cầu chính:** `README_HTS_v5.0.md`
**Quyết định kiến trúc:** Cloudflare D1 là cơ sở dữ liệu chính thức duy nhất của HTS.

## 1. Phạm vi và giới hạn

Báo cáo này là kết quả rà soát repository, cấu hình và trạng thái D1 local. Giai đoạn rà soát không:

- chạy SQL hoặc migration;
- ghi dữ liệu hoặc thay đổi database;
- truy cập dữ liệu Supabase remote;
- export schema/data production;
- truy cập D1 remote;
- xóa hoặc thay đổi cấu hình Supabase;
- sửa mã nguồn;
- cài đặt hoặc nâng cấp thư viện.

Việc xác định dữ liệu Supabase thực tế và schema D1 remote production chỉ có thể hoàn thành sau khi chủ dự án cung cấp hoặc phê duyệt phương thức rà soát remote.

## 2. Tổng hợp kết quả rà soát Supabase

### 2.1. Cấu hình Supabase trong repository

Các file liên quan:

- `.env.example`: khai báo `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `supabase/schema.sql`: schema starter duy nhất tìm thấy.
- `package.json`: khai báo `@supabase/supabase-js` và `@supabase/ssr`.
- `app/dang-nhap/page.tsx`: module đang gọi Supabase Auth trên client.
- `docs/HTS_DATABASE_AND_SECURITY_PLAN.md`: tài liệu định hướng, không phải migration.
- `docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md`: ghi nhận Supabase chưa được kết nối.

Không tìm thấy trong repository:

- Supabase CLI project config;
- migration Supabase;
- PostgreSQL dump;
- service role key hoặc bí mật;
- Storage bucket policy;
- cấu hình Supabase thực tế;
- bằng chứng Supabase production/test đã được áp dụng.

### 2.2. Bảng được khai báo trong `supabase/schema.sql`

#### `profiles`

- `id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `display_name text`
- `phone text`
- `learning_group text`
- `role public.hts_role NOT NULL DEFAULT 'learner'`
- `created_at timestamptz NOT NULL DEFAULT now()`
- `updated_at timestamptz NOT NULL DEFAULT now()`

Ràng buộc:

- `learning_group` chỉ nhận `student`, `high_school`, `middle_school`, `primary_school`, `armed_forces`.
- danh mục này không đủ cho đúng 7 lĩnh vực HTS v5.0.

#### `learning_categories`

- `id uuid PRIMARY KEY`
- `slug text UNIQUE NOT NULL`
- `title text NOT NULL`
- `description text`
- `is_open_access boolean NOT NULL DEFAULT false`
- `is_published boolean NOT NULL DEFAULT false`
- `created_at timestamptz NOT NULL DEFAULT now()`

#### `courses`

- `id uuid PRIMARY KEY`
- `category_id uuid NOT NULL REFERENCES learning_categories(id) ON DELETE RESTRICT`
- `title text NOT NULL`
- `description text`
- `status text NOT NULL DEFAULT 'draft'`
- `created_by uuid REFERENCES profiles(id)`
- `created_at timestamptz NOT NULL DEFAULT now()`

Ràng buộc trạng thái: `draft`, `published`, `archived`.

#### `lessons`

- `id uuid PRIMARY KEY`
- `course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE`
- `title text NOT NULL`
- `body text`
- `position integer NOT NULL DEFAULT 0`
- `is_published boolean NOT NULL DEFAULT false`
- `created_at timestamptz NOT NULL DEFAULT now()`

#### `learning_progress`

- `id uuid PRIMARY KEY`
- `user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE`
- `lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE`
- `completed boolean NOT NULL DEFAULT false`
- `completed_at timestamptz`
- UNIQUE `(user_id, lesson_id)`

### 2.3. Enum

`public.hts_role`:

- `learner`
- `admin`
- `super_admin`

Mâu thuẫn cần thống nhất:

- README yêu cầu `field_admin`, không dùng `admin`.
- README yêu cầu role nghiệp vụ theo phạm vi ngoài ba role nền tảng.

### 2.4. Function

- `public.is_hts_admin()`
- `public.protect_profile_role()`

### 2.5. Trigger

- `protect_profile_role_before_update`
- Trigger gọi function bảo vệ thay đổi role.

### 2.6. RLS policies

RLS được bật cho:

- `profiles`
- `learning_categories`
- `courses`
- `lessons`
- `learning_progress`

Logic policy bao gồm:

- hồ sơ chỉ đọc bởi chính chủ hoặc admin;
- người dùng cập nhật hồ sơ của chính mình;
- danh mục, khóa học và bài học công khai chỉ hiển thị bản published;
- admin quản lý danh mục, khóa học và bài học;
- learner quản lý progress của chính mình.

RLS Supabase không được chuyển sang D1 như cơ chế bảo mật mặc định. Quyền D1 phải được kiểm tra ở Worker/API server và mọi truy cập dữ liệu nhạy cảm phải xác minh scope.

### 2.7. Supabase Auth

Auth chỉ được gọi trong trang đăng nhập:

- `createClient()`
- `supabase.auth.signInWithPassword()`

Chưa có bằng chứng triển khai:

- đăng ký tài khoản;
- xác minh email;
- đăng xuất;
- reset password;
- đăng nhập bằng phiên server-side;
- MFA;
- thu hồi phiên;
- khôi phục Super Admin;
- liên kết account với hồ sơ ở luồng production.

### 2.8. Supabase Storage

Không tìm thấy bucket, Storage policy, signed URL hoặc upload/download API. Repository chỉ đề cập Storage ở các trang nội dung dưới dạng thông báo chưa kết nối.

### 2.9. Dữ liệu thực tế

Không có bằng chứng cho thấy:

- `schema.sql` đã chạy trên Supabase;
- Supabase đang có tài khoản;
- hồ sơ, khóa học hoặc tiến độ học tập thật đang tồn tại;
- Storage bucket hoặc dữ liệu tệp đang tồn tại;
- Supabase Auth đang là hệ xác thực production;
- dữ liệu nào đủ điều kiện chuyển sang D1.

Hiện chỉ có thể kết luận đây là schema starter khai báo, chưa phải dữ liệu hoặc hệ thống đã triển khai.

## 3. Tổng hợp trạng thái Cloudflare D1

### 3.1. Cấu hình

- Binding: `DB`
- Database name: `hts-hoc-tap-so`
- Database ID: `40918aec-b066-49c8-b57f-836b320d3242`
- `lib/db.ts`: lấy binding D1 qua OpenNext Cloudflare context.
- `app/api/health/db/route.ts`: chạy `SELECT 1` để kiểm tra kết nối.
- OpenNext: đã khai báo cấu hình Cloudflare.

### 3.2. D1 local

Khi rà soát bằng trạng thái local của Wrangler:

- database local không có bảng nghiệp vụ;
- chỉ có `_cf_METADATA`;
- không có thư mục migration;
- không có migration đã ghi nhận;
- không có view, trigger hoặc index ứng dụng.

### 3.3. D1 remote

Không kiểm tra D1 remote để tránh thay đổi dữ liệu hoặc môi trường. Chưa xác định được:

- database remote có phải production hay test;
- database remote đã có schema;
- có migration đã chạy;
- có dữ liệu thật;
- có backup/restore;
- có replica hoặc quy trình phục hồi.

### 3.4. Kết luận D1 hiện tại

D1 chỉ mới có binding và endpoint kiểm tra kết nối. D1 chưa phải nền tảng nghiệp vụ đã hoàn chỉnh.

## 4. Bảng và dữ liệu cần xem xét chuyển đổi

### 4.1. Có khả năng cần chuyển

Chỉ khi xác nhận dữ liệu Supabase thực tế tồn tại:

- `auth.users` cần chuyển hoặc ánh xạ sang account model mới.
- `profiles` có thể chuyển sang `user_profiles`.
- `learning_categories` có thể chuyển sang `learning_fields`.
- `courses` có thể chuyển sang bảng khóa học D1.
- `lessons` có thể chuyển sang bài học D1.
- `learning_progress` có thể chuyển sang tiến độ học tập D1.

### 4.2. Cần thiết kế lại cho SQLite

- role `admin` thành `field_admin`;
- nhiều lĩnh vực cho một tài khoản;
- role và scope-based permission;
- trường, cơ sở, năm học, khối, lớp;
- giáo viên, học sinh và phân công;
- Trung tâm Báo cáo số;
- Dân Cư Số;
- hai mẫu lực lượng vũ trang;
- điểm danh, thi, import điểm và chấm điểm;
- Marketplace, Pi, entitlements;
- audit log và export;
- OAuth/auth session thay cho Supabase Auth nếu Supabase được loại bỏ.

### 4.3. Không còn sử dụng theo cơ chế cũ

- PostgreSQL RLS;
- Supabase `is_hts_admin()`;
- profile role trigger;
- enum PostgreSQL `hts_role`;
- Supabase Auth session trực tiếp;
- Supabase Storage trực tiếp, trừ khi chủ dự án chấp thuận duy trì tệp trong giai đoạn chuyển.

### 4.4. Chưa đủ thông tin

- dữ liệu Supabase production;
- dữ liệu tài khoản và hồ sơ;
- tiến độ học tập thật;
- nội dung khóa học thật;
- storage thật;
- migration lịch sử;
- schema D1 production;
- dữ liệu D1 đã có;
- trạng thái backup.

## 5. Module mã nguồn còn phụ thuộc Supabase

### 5.1. Phụ thuộc runtime đã phát hiện

- `app/dang-nhap/page.tsx`
  - gọi `createClient`
  - gọi `signInWithPassword`
  - đọc `NEXT_PUBLIC_SUPABASE_URL`
  - đọc `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5.2. Phụ thuộc manifest

- `package.json`
  - `@supabase/supabase-js`
  - `@supabase/ssr`

### 5.3. Phụ thuộc tài liệu/giao diện

- `app/dang-ky/page.tsx`
- `app/quen-mat-khau/page.tsx`
- `app/tai-khoan/page.tsx`
- `components/UserMenu.tsx`
- `app/thu-vien/page.tsx`
- `app/quan-tri/nhat-ky/page.tsx`
- `app/quan-tri/nguoi-dung/page.tsx`
- `app/quan-tri/linh-vuc/page.tsx`
- `app/quan-tri/phan-quyen/page.tsx`
- `app/quan-tri/yeu-cau/page.tsx`
- `app/quan-tri/noi-dung/page.tsx`
- `app/mang-xa-hoi/tin-nhan/page.tsx`
- `app/mang-xa-hoi/bai-viet/page.tsx`
- `app/thi-truc-tuyen/ket-qua/page.tsx`
- `app/theo-doi-hoc-tap/page.tsx`

Các module trên hiện chủ yếu mô tả hoặc báo chưa kết nối Supabase. Chúng chưa phải dependency runtime trừ trang đăng nhập và các thư viện manifest.

## 6. Phương án kiến trúc D1 thống nhất

### 6.1. Kiến trúc xử lý

- Next.js/OpenNext chạy trên Cloudflare Workers.
- Workers truy cập D1 qua binding `DB`.
- Mọi API ghi dữ liệu qua Worker.
- Worker xác thực phiên, role, scope và permission.
- Không tin `user_id`, role, state duyệt hoặc unit id do trình duyệt gửi.
- Không dùng client trực tiếp truy cập database.
- D1 không phụ thuộc RLS Supabase.

### 6.1.1. Tài khoản duy nhất và vai trò đa cấp

HTS phải sử dụng một định danh tài khoản duy nhất cho một email. Email của chủ dự án, `tranvandinh1281984@gmail.com`, được xác định là tài khoản chính của Trần Văn Dĩnh. Email này không được tự động tạo nhiều tài khoản, nhiều hồ sơ hoặc nhiều role cấp cao; mọi role đều gắn qua grant có thẩm quyền.

#### Phân biệt ba nhóm thông tin

1. **Tài khoản**: định danh đăng nhập, hồ sơ cơ bản, trạng thái tài khoản và phiên đăng nhập.
2. **Vai trò và quyền**: vai trò nền tảng hoặc vai trò nghiệp vụ và danh sách permission chi tiết.
3. **Tư cách thành viên**: tư cách học tập, thành viên lớp, thành viên nhóm, thành viên đơn vị hoặc thôn theo phạm vi đã xác minh.

Các nhóm này không được gộp thành một cột role đơn trong bảng profile.

#### Vai trò được hỗ trợ

Một tài khoản có thể đồng thời có các role grant hợp lệ sau:

- `learner`: người học trong lĩnh vực đã đăng ký.
- `super_admin`: quản trị cấp cao nhất toàn nền tảng.
- `field_admin`: quản trị một hoặc nhiều lĩnh vực được cấp.
- `teacher`: giáo viên sau khi được xác minh và phân công.
- `group_leader`: trưởng nhóm sau khi được phê duyệt.
- Các role hoặc tư cách nghiệp vụ khác khi được thiết kế riêng, có scope và quyền rõ ràng.

Vai trò Super Admin không biến tài khoản thành giáo viên, thành viên lớp hoặc trưởng nhóm. Vai trò nghiệp vụ phải được cấp hoặc xác minh riêng.

#### Nguyên tắc role grant

- Một tài khoản chỉ có một `account_id`/định danh người dùng.
- Một email chỉ có tối đa một account đang hoạt động theo quy ước `UNIQUE` ở account hoặc identity map.
- Không tạo profile trùng cho cùng một email.
- Một tài khoản có thể tham gia nhiều lĩnh vực mà không tạo tài khoản khác.
- Mỗi role grant phải lưu:
  - tài khoản;
  - role;
  - scope;
  - trạng thái;
  - thời hạn bắt đầu/kết thúc;
  - người cấp;
  - thời điểm cấp;
  - lý do;
  - trạng thái tạm khóa/hết hạn/thu hồi;
  - lịch sử thay đổi.
- Quyền cấp cho scope cha có thể không tự động áp dụng scope con nếu quan hệ cha-con chưa được xác minh trong dữ liệu tổ chức.
- Quyền xem không đồng nghĩa quyền sửa, duyệt, xuất hoặc quản lý thành viên.
- Người dùng không được gửi role, scope, trạng thái hoặc người phê duyệt từ trình duyệt để tự nâng quyền.
- Server/Workers và D1 phải xác minh danh tính, role grant, scope và thời hạn trước mỗi thao tác nhạy cảm.
- Giao diện chuyển vai trò hoặc lĩnh vực phải đọc danh sách role/scope đang hiệu lực từ server, không dựa vào localStorage hoặc lựa chọn do người dùng tự khai.

### 6.2. Nhóm bảng nền

#### Tài khoản và xác thực

- `accounts`
- `account_identity_links`
- `auth_credentials`
- `auth_sessions`
- `password_reset_tokens`
- `email_verifications`
- `security_events`
- `user_profiles`
- `user_field_memberships`
- `member_statuses`

#### Role, permission và scope

- `roles`
- `permissions`
- `role_permissions`
- `role_grants`
- `permission_grants`
- `role_grant_history`
- `admin_requests`
- `admin_request_reviews`
- `permission_audit`
- `organization_scopes`
- `organization_scope_relations`
- `group_memberships`
- `group_membership_history`
- `class_memberships`
- `class_membership_history`

Các role nền tối thiểu:

- `learner`
- `field_admin`
- `super_admin`

Các role nghiệp vụ bổ sung:

- `teacher`
- `group_leader`

Các role và tư cách thành viên khác chỉ được thêm sau khi chốt scope và permission.

Một tài khoản có thể có nhiều role grant và nhiều lĩnh vực. Mỗi grant phải có scope, trạng thái, thời hạn, người cấp, lý do và lịch sử.

#### Học tập

- `learning_fields`
- `content_topics`
- `courses`
- `lessons`
- `learning_progress`
- `learning_sessions`

#### Giáo dục

- `education_sectors`
- `education_units`
- `schools`
- `campuses`
- `academic_years`
- `grades`
- `classes`
- `subjects`
- `teacher_assignments`
- `student_memberships`
- `class_memberships`
- `school_leadership_assignments`

#### Thi, điểm và điểm danh

- `exams`
- `exam_schedules`
- `exam_candidates`
- `exam_questions`
- `exam_attempts`
- `exam_answers`
- `exam_results`
- `exam_result_versions`
- `exam_import_batches`
- `exam_import_rows`
- `exam_warnings`
- `exam_score_reviews`
- `exam_score_approvals`
- `attendance_sessions`
- `attendance_records`
- `attendance_verifications`

#### Trung tâm Báo cáo số

- `report_domains`
- `report_org_units`
- `report_memberships`
- `report_groups`
- `report_group_members`
- `report_group_role_history`
- `report_templates`
- `report_template_fields`
- `report_template_versions`
- `report_campaigns`
- `report_requests`
- `report_request_reviews`
- `report_submissions`
- `report_submission_versions`
- `report_approvals`
- `report_attachments`
- `report_ai_extractions`
- `report_activity_logs`

#### Dân Cư Số

- `civic_areas`
- `civic_village_admin_assignments`
- `civic_households`
- `civic_residents`
- `civic_household_members`
- `civic_residency_events`
- `civic_import_jobs`
- `civic_import_records`
- `civic_documents`
- `civic_data_corrections`
- `civic_access_audit`
- `civic_retention_policies`

#### Lực lượng vũ trang

- `military_member_approval_requests`
- `military_unit_approval_documents`
- `military_unit_memberships`
- `military_learning_groups`
- `military_group_members`
- `group_leader_proposals`
- `group_leader_approvals`
- `group_leader_assignments`
- `group_leader_history`
- `military_access_audit`
- `military_gift_registration_forms`
- `military_uniform_registration_forms`
- `military_registration_versions`
- `content_submission_requests`
- `content_submission_summaries`
- `content_approval_records`
- `content_delivery_records`

#### Marketplace, Pi và entitlements

- `sellers`
- `shops`
- `products`
- `product_price_history`
- `orders`
- `order_items`
- `pi_payment_transactions`
- `pi_payment_verifications`
- `entitlement_plans`
- `entitlements`
- `entitlement_transactions`
- `entitlement_audit`

#### Hệ thống chung

- `notifications`
- `contextual_help`
- `news_articles`
- `social_posts`
- `social_comments`
- `social_likes`
- `chat_threads`
- `chat_messages`
- `attachments`
- `audit_events`
- `data_exports`
- `retention_policies`

### 6.3. Quy tắc D1

- migration có số phiên bản và khả năng kiểm soát;
- khóa chính UUID/TEXT ổn định;
- foreign key rõ ràng;
- index trên foreign key, state, scope và timestamp;
- timestamp được chuẩn hóa;
- transaction cho nghiệp vụ nhiều bảng;
- snapshot/version cho dữ liệu đã gửi;
- soft delete hoặc không xóa dữ liệu lịch sử quan trọng;
- import/OCR tách dữ liệu tạm khỏi dữ liệu đã xác minh;
- export chỉ được thực hiện trong scope và ghi audit;
- backup/restore có phương án kiểm thử.

## 7. Rủi ro và xung đột cần giải quyết

1. `supabase/schema.sql` có thể chưa từng được áp dụng.
2. Không biết Supabase production có dữ liệu hay không.
3. Không biết D1 remote đã có schema hay dữ liệu.
4. Role `admin` xung đột với `field_admin`.
5. `learning_group` cũ không đại diện đủ 7 lĩnh vực.
6. Supabase Auth cần thay thế hoặc migration sang hệ xác thực mới.
7. Chưa có quy trình tạo/khôi phục Super Admin.
8. Chưa có MFA cho tài khoản quản trị.
9. Chưa có migration framework D1.
10. Chưa có API nghiệp vụ server-side.
11. Chưa có lưu trữ tệp thay thế Supabase Storage.
12. Chưa có mô hình dân cư và thẩm quyền pháp lý.
13. Chưa có quy trình bảo toàn hai mẫu quân sự gốc.
14. Chưa có quy trình backup/restore D1 đã kiểm thử.
15. Chưa có test RBAC theo nhiều tài khoản và scope.
16. Chưa thống nhất khóa account theo email mà không tạo profile trùng.
17. Chưa có bảng role grant, lịch sử grant và membership riêng cho teacher/group_leader.
18. Chưa có ma trận phân quyền cho trường hợp cùng lúc learner, super_admin, field_admin, teacher và group_leader.

## 8. Những vấn đề cần chủ dự án xác nhận

1. Supabase project nào là project thực tế; nếu có, cần xuất schema/migration và dữ liệu.
2. D1 remote database nào là production; database hiện tại có migration hoặc dữ liệu nào.
3. Cơ chế xác thực thay thế Supabase Auth.
4. Có chuyển account Supabase hiện có sang account D1 hay yêu cầu đăng ký lại.
5. Quy tắc khôi phục tài khoản Super Admin duy nhất.
6. MFA có bắt buộc cho Super Admin và Field Admin hay chỉ Super Admin.
7. Đối chiếu mô hình gói quyền quản trị 10/30/90/365 ngày với schema thực tế; tài khoản Super Admin tối cao đã xác minh của chủ dự án là ngoại lệ miễn phí vĩnh viễn, các account quản trị khác thanh toán Pi.
8. Tên, cấu trúc và phạm vi hai mẫu quân sự gốc.
9. Nơi lưu trữ tệp thay thế Supabase Storage.
10. Phương án lưu Dân Cư Số, căn cứ pháp lý và đơn vị vận hành.
11. Quy định lịch backup/restore D1.
12. Quy tắc giá và thanh toán Pi.
13. Phê duyệt thời điểm bắt đầu tính hạn; thiết kế đề xuất bắt đầu khi Super Admin kích hoạt grant, không phải khi thanh toán được xác minh.
14. Dữ liệu nào thực sự cần chuyển; dữ liệu nào không còn sử dụng.
15. Tài liệu hoặc chương trình nào cần bảo lưu mà repository chưa ghi nhận.
16. Quy ước merge hoặc xác minh nếu Supabase hiện có nhiều account trùng email.
17. Quy trình khôi phục và kiểm soát khẩn cấp cho Super Admin duy nhất (số lượng tài khoản đã chốt).
18. Ma trận chi tiết của role `teacher`, `group_leader` và quyền của từng tư cách thành viên.
19. Quan hệ lớp, nhóm, đơn vị và scope cha-con cần dùng để kế thừa hoặc từ chối quyền.
20. Cách bootstrap Super Admin đã xác nhận theo account ID mà không tạo tài khoản trùng; ràng buộc ngoại lệ miễn phí với đúng tài khoản đã xác minh.

## 9. Thứ tự thực hiện các bước tiếp theo

1. Chủ dự án xác nhận trạng thái Supabase production/test và D1 remote.
2. Tạo bản export schema/data Supabase vào môi trường được phê duyệt.
3. Kiểm kê schema, migration, dữ liệu và Storage Supabase.
4. Kiểm kê bảng, migration và dữ liệu D1 remote.
5. Sao lưu Supabase và D1.
6. Chốt cơ chế xác thực Workers/D1.
7. Thiết kế migration nền D1:
   - accounts;
   - account identity links;
   - user profiles;
   - role;
   - permission;
   - role grants;
   - role grant history;
   - scope;
   - field memberships;
   - class/group/unit memberships;
   - session;
   - audit.
8. Thiết kế dữ liệu 7 lĩnh vực và membership.
9. Loại bỏ phụ thuộc runtime Supabase khỏi luồng đăng nhập.
10. Triển khai API server-side và guard RBAC/scope.
11. Thực hiện migration dữ liệu Supabase theo kế hoạch được phê duyệt.
12. Kiểm thử tài khoản, role, scope, trường/lớp/đơn vị và hai lĩnh vực mở.
13. Xây dựng từng nghiệp vụ lớn theo thứ tự:
   - giáo dục;
   - thi/điểm/điểm danh;
   - Trung tâm Báo cáo số;
   - Lực lượng vũ trang;
   - Dân Cư Số;
   - Marketplace/Pi;
   - các phân hệ hệ sinh thái còn lại.
14. Kiểm thử backup/restore và rollback migration.
15. Chỉ chuyển lưu lượng production sang D1 sau khi nghiệm thu và có phê duyệt.

## 10. Trạng thái kết thúc

Giai đoạn rà soát đã kết thúc. Không có thay đổi mã nguồn, database, migration, dữ liệu, cấu hình Supabase hoặc dependency.
