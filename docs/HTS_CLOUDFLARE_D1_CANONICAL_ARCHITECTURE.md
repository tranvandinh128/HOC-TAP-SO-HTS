# HTS – Kiến trúc chuẩn Cloudflare Workers, D1 và R2

**Phiên bản:** 1.0
**Ngày:** 26/11/2026
**Trạng thái:** Tài liệu kiến trúc chuẩn duy nhất cho các giai đoạn phát triển tiếp theo. Đây là quyết định kiến trúc và yêu cầu thiết kế; không phải bằng chứng triển khai.

## 1. Thứ bậc và phạm vi

Tài liệu này là nguồn chuẩn cho kiến trúc backend, dữ liệu, xác thực, phân quyền, lưu trữ tệp và bảo vệ API của HTS. Tài liệu chuyên đề có thể bổ sung chi tiết nghiệp vụ nhưng không được đưa ra kiến trúc backend trái với tài liệu này. Khi có mâu thuẫn:

1. Quyết định nghiệp vụ đã được chủ dự án xác nhận được giữ nguyên.
2. Tài liệu này là chuẩn kỹ thuật Cloudflare.
3. Tài liệu chuyên đề bổ sung cho miền nghiệp vụ của nó.
4. Báo cáo kiểm toán/snapshot lịch sử chỉ là bằng chứng tại thời điểm ghi nhận, không phải hướng dẫn triển khai hiện hành.

**Quyết định nền tảng:** Cloudflare Workers + D1 là backend và cơ sở dữ liệu chính thức duy nhất. Next.js chạy qua OpenNext trên Cloudflare Workers. Cloudflare R2 là đích lưu tệp riêng tư khi HTS triển khai nghiệp vụ lưu tệp. Không duy trì Supabase hoặc hai database song song. Không kết nối trực tiếp D1/R2 từ trình duyệt.

Tài liệu này không xác nhận D1/R2 production tồn tại, không lựa chọn tài khoản/môi trường production, không tạo schema/migration và không cho phép triển khai production.

## 2. Nguyên tắc bất biến

1. **Một người, một account:** Một account có thể tham gia nhiều lĩnh vực, tổ chức, lớp, nhóm và khóa học. Membership riêng theo phạm vi; không nhân bản account.
2. **Tách membership và quyền:** Tư cách học tập không cấp quyền quản trị. Role, permission, scope, membership và assignment là quan hệ riêng.
3. **Server là ranh giới bảo vệ:** Mọi đọc/ghi, phê duyệt, tải tệp, export và tác vụ nền đều xác thực và authorize phía Worker/server. UI, route guard phía client, `localStorage` và payload trình duyệt không phải nguồn quyền.
4. **Deny-by-default:** Thiếu session, quyền, membership, scope, phê duyệt hoặc dữ liệu kiểm chứng thì từ chối.
5. **Học tập miễn phí:** Mọi hoạt động học tập trong bảy lĩnh vực miễn phí. Account, membership hay phê duyệt đặc biệt là điều kiện truy cập khi áp dụng, không phải học phí.
6. **Pi không tự cấp quyền:** Thanh toán gói quản trị thành công chỉ ghi nhận giao dịch và cho phép đưa yêu cầu xét duyệt; chỉ quyết định có thẩm quyền mới tạo/kích hoạt grant.
7. **Không tự nâng quyền:** Người dùng không thể tự đặt role, permission, scope, trạng thái xác minh, entitlement hoặc ngoại lệ miễn phí qua request.
8. **Tối thiểu hóa dữ liệu:** Không đưa bí mật, token, mật khẩu, giấy tờ, sinh trắc hoặc dữ liệu Lực lượng vũ trang nhạy cảm vào log, source code, prompt AI hay public storage.
9. **Không suy luận trạng thái môi trường:** File cấu hình và D1 local không chứng minh trạng thái D1 remote/production.
10. **Không tạo bảng trùng:** Tên bảng trong tài liệu là danh mục logic/ứng viên cho đến khi inventory schema/migrations được chủ dự án phê duyệt.

## 3. Kiến trúc runtime

```text
Browser
  └─ HTTPS → Next.js / OpenNext on Cloudflare Workers
       ├─ kiểm tra origin/CSRF, rate limit, validate input
       ├─ xác thực cookie session và trạng thái account
       ├─ authorize permission + role grant + scope + membership
       ├─ D1 binding (truy cập server-side)
       ├─ R2 private binding qua Worker sau kiểm tra quyền
       ├─ email/Pi/AI integrations chỉ qua server adapters được phê duyệt
       └─ audit/security events
```

- **Next.js/OpenNext Worker:** xử lý route/API, session, authorization, nghiệp vụ và quyền truy cập tệp.
- **D1:** nguồn sự thật cho account, trạng thái, memberships, grants, scope, quyết định, nghiệp vụ và metadata.
- **R2:** lưu bytes của tệp; private-by-default. D1 lưu metadata/object reference tối thiểu.
- **Dịch vụ ngoài:** email, Pi, AI/OCR chỉ được gọi từ server qua tích hợp đã được phê duyệt; không đặt secret ở client.
- **Browser:** chỉ gửi yêu cầu và dữ liệu đầu vào; mọi định danh/quyền/trạng thái từ client phải được kiểm chứng lại server-side.

## 4. Lĩnh vực, vai trò và phạm vi

### 4.1. Bảy lĩnh vực học tập

Danh mục sản phẩm đã xác nhận:

| Slug | Lĩnh vực | Chính sách truy cập |
|---|---|---|
| `cong-dan` | Công dân học tập | Nội dung mở có thể xem không cần đăng nhập; cá nhân hóa/ghi tiến độ cần account phù hợp. |
| `cong-nhan` | Công nhân học tập | Nội dung mở có thể xem không cần đăng nhập; cá nhân hóa/ghi tiến độ cần account phù hợp. |
| `sinh-vien` | Sinh viên học tập | Có thể yêu cầu account/membership; miễn phí học tập. |
| `thpt` | Học sinh THPT | Có thể yêu cầu account/membership; miễn phí học tập, bảo vệ dữ liệu trẻ em. |
| `thcs` | Học sinh THCS | Có thể yêu cầu account/membership; miễn phí học tập, bảo vệ dữ liệu trẻ em. |
| `tieu-hoc` | Học sinh tiểu học | Có thể yêu cầu account/membership; miễn phí học tập, bảo vệ dữ liệu trẻ em. |
| `luc-luong-vu-trang` | Lực lượng vũ trang | Chặn nội dung/API/tệp nội bộ đến khi tư cách được xác minh và membership được phê duyệt. |

### 4.2. Ma trận quyền chuẩn

Quyết định cho từng request là giao của `account status + session + action permission + role grant + scope + membership/assignment + trạng thái/hiệu lực`. Ma trận này không cấp quyền nếu thiếu grant hay approval.

| Vai trò | Phạm vi hợp lệ | Quyền và giới hạn |
|---|---|---|
| Learner | Membership của chính account; tài nguyên mở được phép | Học, làm bài, xem tiến độ/kết quả của mình; không cần gói quản trị. Không xem dữ liệu người khác hoặc tự xác minh vào lĩnh vực hạn chế. |
| Teacher | Lớp/môn/trường/năm học có assignment còn hiệu lực | Thực hiện nghiệp vụ được cấp; không suy rộng từ role, không tự cấp quyền, không duyệt/chốt nếu thiếu permission. |
| Group Leader | Nhóm/đơn vị được giao | Điều phối trong scope; không tự bổ nhiệm, mở rộng scope hoặc export ngoài quyền. |
| Field Admin | Từng lĩnh vực/scope/action được Super Admin cấp | Quản lý trong grant có hiệu lực; không tự cấp/đổi quyền, không quản trị lĩnh vực khác, không duyệt grant của mình. Cần gói Pi trừ account root được miễn. |
| Super Admin tối cao (Root) | `platform`, account root đã bootstrap và xác minh | Quản trị nền tảng và quyết định cấp quyền theo thẩm quyền; MFA và audit bắt buộc. Đây là account duy nhất được miễn phí quản trị vĩnh viễn. |
| Người xác nhận tư cách đơn vị | Hồ sơ/đơn vị cụ thể được giao | Chỉ xác nhận tư cách theo quy trình được duyệt; không tự cấp role HTS hoặc xem hồ sơ ngoài yêu cầu được giao. Cách xác thực identity còn cần chốt. |

### 4.3. Chính sách quản trị và Pi đã chốt

- Tất cả hoạt động học tập ở cả bảy lĩnh vực miễn phí.
- Account Super Admin tối cao của chủ dự án được miễn phí quản trị vĩnh viễn. Định danh email `tranvandinh1281984@gmail.com` chỉ là thông tin đối chiếu bootstrap; quyết định quyền phải gắn với đúng `account_id` được xác minh, không chỉ email hoặc role do client gửi.
- Mọi account quản trị khác, gồm Field Admin và quyền quản trị bổ sung, trả phí bằng Pi theo gói:

| Thời hạn | Giá |
|---:|---:|
| 10 ngày | 0,00314 Pi |
| 30 ngày | 0,00942 Pi |
| 90 ngày | 0,02826 Pi |
| 365 ngày | 0,11461 Pi |

- Trạng thái thanh toán, quyết định xét duyệt và grant là ba trạng thái riêng. Paid không tự kích hoạt quyền; Super Admin phải phê duyệt và grant phải ghi rõ account/role/scope/thời hạn.
- Hết hạn/thu hồi admin không khóa account, xóa dữ liệu hoặc làm mất quyền học tập hợp lệ.
- Giá và thời hạn đã chốt; cơ chế Pi chính thức, giao dịch bất thường, refund/appeal và thời điểm bắt đầu/cộng nối hạn vẫn cần đặc tả vận hành được phê duyệt.

## 5. Tài khoản, xác thực và session

### 5.1. Kiến trúc xác thực

HTS tự xây dựng xác thực phía server trên Cloudflare Workers, dùng D1 làm nguồn dữ liệu account/credential/session. Không dùng Supabase Auth, Supabase database hoặc auth service thứ hai làm fallback/song song.

Luồng dự kiến:

1. Worker chuẩn hóa định danh đăng nhập, kiểm tra trạng thái account và rate limit.
2. Mật khẩu xác minh bằng credential verifier phía server; lưu hash, không bao giờ lưu plaintext.
3. Email verification và password recovery dùng token ngẫu nhiên một lần, chỉ lưu digest, có hạn dùng và chống replay.
4. Session ngẫu nhiên/opaque được kiểm tra server-side; cookie có `HttpOnly`, `Secure`, `SameSite` phù hợp với deployment.
5. Logout, reset password, account lock, role/security event hoặc thu hồi session làm session liên quan mất hiệu lực ở server.
6. MFA bắt buộc cho Root Super Admin; chi tiết MFA/recovery phải được chốt trước khi triển khai.

### 5.2. Bảng lõi xác thực dự kiến

Đây là tên logic ứng viên, không xác nhận đã tồn tại:

- `accounts`: định danh duy nhất, trạng thái và timestamps.
- `account_identity_links`: email/identity đã xác minh; unique sau chuẩn hóa.
- `user_profiles`: hồ sơ cơ bản tách khỏi credential và role.
- `auth_credentials`: password hash, thuật toán/version và timestamps.
- `auth_sessions`: session digest, account, trạng thái, expiry/revocation metadata.
- `email_verifications`, `password_reset_tokens`, `account_recovery_requests`: quy trình một lần, có expiry và audit.

Các bảng cần được hợp nhất với schema/migration thực sau inventory; không tạo bảng trùng nếu có tên/semantics tương đương.

### 5.3. Các quyết định kỹ thuật chưa chốt

Chưa xác định thuật toán/password verifier tương thích Workers, email provider, MFA factor/recovery, idle/absolute timeout, giới hạn session đồng thời, retention IP/device metadata và chính sách recovery. Không tự chọn hoặc ghi credential thật trước khi có spike và phê duyệt.

## 6. Mô hình dữ liệu D1 và quan hệ

### 6.1. Nhóm dữ liệu chuẩn

| Nhóm | Bảng logic ứng viên | Quan hệ chính |
|---|---|---|
| Account/auth | `accounts`, `account_identity_links`, `user_profiles`, `auth_credentials`, `auth_sessions`, `email_verifications`, `password_reset_tokens`, `account_recovery_requests` | Account là gốc; hồ sơ/credential/session/identity không chứa nguồn quyền. |
| Lĩnh vực/membership | `learning_fields`, `learning_field_memberships` | N:M accounts↔fields; trạng thái riêng từng field; membership đặc biệt có approval. |
| Role/permission/scope | `roles`, `permissions`, `role_permissions`, `role_grants`, `permission_grants`, `role_grant_history`, `organization_scopes`, `scope_relations` | Grant liên kết account + role/permission + scope + trạng thái/hiệu lực + actor. |
| Quản trị | `admin_requests`, `admin_request_reviews` | Yêu cầu và quyết định tách khỏi grant; chỉ actor có quyền mới tạo grant sau phê duyệt. |
| Audit/security | `audit_events`, `security_events` | Audit nghiệp vụ/quyết định tách ý nghĩa khỏi auth/security event; append-only qua service policy. |
| Gói và Pi | `entitlement_plans`, `entitlement_plan_prices`, `entitlement_subscriptions`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications` | Order lưu snapshot; transaction unique/idempotent; paid không tự tạo grant. |
| Tệp và xác minh | `attachments`, `military_member_approval_requests`, quan hệ hồ sơ–attachment | R2 giữ bytes private; D1 giữ metadata tối thiểu. Chưa duyệt không có membership nội dung. |
| Học tập cơ bản | `courses`, `lessons`, `learning_progress` | Nối tới field/account; học không phụ thuộc entitlement quản trị. |
| Mở rộng | curriculum, assignment/submission, attendance, reporting, AI job, exam và các miền khác | Dùng tài liệu chuyên đề; inventory/hợp nhất bảng trước khi thiết kế migration riêng. |

### 6.2. Chuẩn hóa và chống trùng

- Trước migration phải so sánh tên, ý nghĩa, cột, FK, index, dữ liệu và lịch sử migration. Alias như `profiles`/`user_profiles`, `learning_categories`/`learning_fields`, `user_roles`/RBAC grants, các bảng audit theo miền, `entitlements`/`entitlement_subscriptions` và các bảng attachment/export phải được đối chiếu chứ không tạo song song.
- `audit_events` dùng cho hành động nghiệp vụ/quyết định; `security_events` cho login/recovery/lockout/session. Không sao chép cùng một event vào nhiều bảng nếu không có mục đích/retention riêng.
- R2 object bytes không được sao chép vào D1; bảng quan hệ riêng chỉ thêm nếu thiếu semantics cần thiết.
- Không dùng schema Supabase/PostgreSQL cũ làm schema mục tiêu hoặc giả định đã chạy production.

## 7. Thứ tự triển khai/migration đề xuất

Thứ tự này là phụ thuộc logic để đánh giá sau phê duyệt; không phải migration đã tạo hoặc được phép chạy. Bước kiểm kê là cổng trước migration; các ID dưới đây đồng bộ với [kế hoạch Giai đoạn 1](./HTS_PHASE_1_IMPLEMENTATION_PLAN.md).

1. Inventory D1/migrations/environment và backup/restore thử nghiệm; chuẩn hóa canonical names, constraints và FK.
2. `0001_platform_reference`: `learning_fields`, `roles`, `permissions`; seed versioned/idempotent.
3. `0002_accounts_profiles_scopes`: `accounts`, `account_identity_links`, `user_profiles`, `organization_scopes`, `scope_relations`.
4. `0003_audit_security`: `audit_events`, `security_events`.
5. `0004_auth_sessions_credentials`: `auth_credentials`, `auth_sessions`, email verification, password reset và account recovery.
6. `0005_role_permission_grants`: `role_permissions`, `role_grants`, `permission_grants`, `role_grant_history`.
7. `0006_memberships_admin_workflow`: `learning_field_memberships`, `admin_requests`, `admin_request_reviews`.
8. `0007_attachments_military_verification`: `attachments`, military approval request/document relations; R2 binding/policy chỉ sau khi được duyệt.
9. `0008_admin_entitlements_pi`: plans/prices, orders, transactions, verifications, subscriptions/entitlements; payment integration tách cổng.
10. `0009_learning_core`: courses, lessons, progress; giữ đường học miễn phí.
11. `0010_indexes_constraints_hardening`: indexes, checks/constraints, idempotency, backup/restore, staged tests và security acceptance.
12. Các miền chuyên đề (curriculum/AI, attendance, reporting, exams, social và các nhóm còn lại) theo phê duyệt riêng và inventory/hợp nhất bảng.

Quy ước: không sửa migration đã chạy; thay đổi phá hủy/rename cần migration chuyển đổi riêng, backup, kiểm thử restore/rollback và phê duyệt. D1 remote/production chỉ được thay đổi qua change plan và approval riêng.

## 8. Bảo vệ API, quyền và dữ liệu

Mọi API/action/route xử lý dữ liệu phải:

1. Xác thực session server-side, account active, expiry/revocation và MFA theo policy.
2. Xác định action permission từ endpoint; không tin `account_id`, role, scope, price, approval status hoặc owner từ client.
3. Kiểm tra grant, permission, quan hệ scope, membership/assignment và trạng thái đặc biệt từ D1.
4. Từ chối nếu thiếu hoặc mâu thuẫn dữ liệu; không mặc định quyền truy cập.
5. Query theo scope ở server; phân tách read/write/approve/export/manage.
6. Dùng prepared statements, schema/input validation, giới hạn tốc độ, chống CSRF/origin phù hợp cookie session, idempotency cho thao tác nhạy cảm và lỗi không rò dữ liệu.
7. Ghi audit/security event tối thiểu; không ghi cookie/token/password/payment secret, hồ sơ hoặc payload nhạy cảm.
8. Đối với `luc-luong-vu-trang`, deny cả metadata, tìm kiếm, API, preview, object và URL trước khi membership được xác minh/phê duyệt.

Cloudflare D1 không sử dụng PostgreSQL RLS. Authorization được thực thi trong Worker/server và trong query/service boundary; không sao chép hướng dẫn RLS/Supabase vào triển khai D1.

## 9. R2 và lưu trữ tệp

- R2 là đích chuẩn cho bytes khi HTS triển khai lưu file; D1 lưu owner, purpose, scope, object key opaque, MIME/size/checksum, classification, trạng thái và expiry tối thiểu.
- Private-by-default; không đưa object key, tên/email/số hồ sơ vào URL hoặc object key; không public bucket cho tài liệu riêng tư.
- Upload/download/preview/export/delete qua Worker sau authorization. Signed URL nếu được chọn phải rất ngắn hạn, giới hạn thao tác và chỉ cấp sau kiểm tra quyền; endpoint kiểm tra quyền mỗi lần.
- Kiểm tra kích thước/loại nội dung/checksum, quarantine và malware scan theo quyết định kỹ thuật; cấu hình retention/xóa và audit truy cập.
- **Chưa chốt:** account/bucket/region, môi trường tách biệt, upload proxy so với signed URL, quét malware, key/permissions, backup và retention. Không dùng hồ sơ quân sự thật trước phê duyệt của cơ quan có thẩm quyền.

## 10. Các chính sách miền không được thay đổi

- **Lực lượng vũ trang:** xác minh tư cách và phê duyệt membership trước khi truy cập; mua gói quản trị không thay thế approval.
- **Điểm danh:** quy tắc 10 phút và các ngoại lệ nghiệp vụ được nêu trong thiết kế attendance; không mặc định triển khai khuôn mặt hay kết luận vắng mặt/vi phạm tự động.
- **Giáo dục/AI/báo cáo:** AI đề xuất, người có thẩm quyền rà soát/duyệt; không tự publish/chấm chính thức/cấp quyền. Dữ liệu trẻ em và nhạy cảm bị giới hạn.
- **Báo cáo ngành giáo dục:** Công dân học tập/Công nhân học tập không thuộc báo cáo quản lý giáo dục nhà trường/ngành theo quyết định hiện hành; vẫn là lĩnh vực HTS và có thể tham gia báo cáo HTS chung theo quyền.
- **Tài liệu lịch sử:** giữ nguyên kết luận tại thời điểm kiểm toán; chỉ thêm ghi chú trạng thái/cross-reference, không viết lại bằng chứng.

## 11. Cổng phê duyệt và quyết định còn thiếu

Trước migration hoặc phát triển luồng account cần chốt: môi trường D1 và quyền inventory chỉ-đọc; migration framework/backup/restore/rollback; password hash, email provider, MFA và recovery; session timeouts/retention; account bootstrap Root và kiểm soát khẩn cấp; ma trận role/permission/scope; R2 account/region/access/scan/retention; Pi verification environment/finality/refund/appeal; cơ quan xác minh Lực lượng vũ trang, dữ liệu tối thiểu và retention; retention audit/security và dữ liệu trẻ em.

Quyết định sản phẩm đã chốt (bảy lĩnh vực, học miễn phí, duy nhất Root được miễn quản trị vĩnh viễn, gói Pi, không tự nâng quyền, Lực lượng vũ trang phải được duyệt) không mở lại qua các mục kỹ thuật chưa chốt.

## 12. Tài liệu chuyên đề và lịch sử

- [Bản đồ chuyển đổi tài liệu](./HTS_DOCUMENTATION_CLOUDFLARE_MIGRATION_MAP.md) liệt kê toàn bộ tài liệu trong `docs`.
- [Thiết kế account/auth/RBAC](./HTS_D1_AUTH_RBAC_DESIGN.md)
- [Kế hoạch Giai đoạn 1](./HTS_PHASE_1_IMPLEMENTATION_PLAN.md) và [rà soát cuối](./HTS_PHASE_1_FINAL_REVIEW.md)
- [Thiết kế truy cập Lực lượng vũ trang](./HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md)
- [Thiết kế gói quản trị Pi](./HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md)
- [Thiết kế giáo dục/AI](./HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md), [báo cáo AI](./HTS_AI_REPORTING_DESIGN.md), [điểm danh](./HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md)
- [Kế hoạch database và bảo mật](./HTS_DATABASE_AND_SECURITY_PLAN.md)
- Báo cáo lịch sử: [kiểm toán Supabase/D1](./BAO_CAO_RA_SOAT_SUPABASE_D1.md), [kiểm toán tổng thể](./HTS_FULL_PROJECT_AUDIT.md), [báo cáo loại bỏ Supabase](./HTS_SUPABASE_REMOVAL_REPORT.md)

## 13. Trạng thái

Đây là kiến trúc mục tiêu chuẩn cho các công việc tương lai. Chưa có D1 schema/migration nghiệp vụ, auth production, R2 binding/tệp thật, thanh toán Pi, R2/AI integration hoặc quyền server-side được nghiệm thu chỉ bởi việc có tài liệu. Mọi thay đổi database, dữ liệu và production đều cần cổng phê duyệt riêng.
