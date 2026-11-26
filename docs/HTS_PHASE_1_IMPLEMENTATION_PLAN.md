# Kế hoạch triển khai nền tảng HTS – Giai đoạn 1

**Trạng thái:** Kế hoạch triển khai; chưa tạo schema/migration, chưa kết nối môi trường production.
**Kiến trúc chuẩn:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md).
**Quyết định kiến trúc (26/11/2026):** Supabase không còn là backend mục tiêu; Cloudflare Workers + D1 là nền tảng duy nhất. Các nội dung dưới đây nhắc Supabase chỉ là lịch sử/tên schema cũ để giải thích nguồn tài liệu, không phải chỉ dẫn duy trì, kết nối hoặc dùng nó làm hệ thống song song. Không xử lý tài nguyên hoặc dữ liệu Supabase bên ngoài trong kế hoạch này.
**Phạm vi:** Nền tảng D1, account/auth/session, RBAC theo scope, membership đa lĩnh vực, xác minh Lực lượng vũ trang, audit, R2 riêng tư, bảo vệ API và gói quản trị Pi.
**Nguyên tắc:** Tên bảng trong tài liệu nguồn là đề xuất, không chứng minh bảng đã tồn tại. Mọi bước đụng tới môi trường thật cần kiểm kê, backup/restore đã thử, phê duyệt và kế hoạch rollback riêng.

## 1. Kết luận và ranh giới Giai đoạn 1

Giai đoạn 1 tạo nền tảng backend an toàn để sau này nối từng phân hệ HTS, không triển khai đồng loạt toàn bộ danh mục bảng. Mục tiêu đầu tiên là một account duy nhất có thể tham gia nhiều lĩnh vực, dùng nhiều role với permission/scope riêng; server/Worker là nơi duy nhất xác thực và quyết định quyền.

Các nguyên tắc nghiệp vụ bắt buộc:

1. **D1 là cơ sở dữ liệu chính thức mục tiêu**, truy cập qua Worker/Next.js server bằng binding; không truy cập D1 trực tiếp từ trình duyệt và không giả định đã biết trạng thái D1 remote.
2. **Học tập miễn phí ở cả bảy lĩnh vực.** Membership, đăng nhập, hoặc xác minh tư cách có thể là điều kiện truy cập nhưng không phải học phí. Gói quản trị không được khóa học tập, dữ liệu học tập hoặc tài khoản khi hết hạn.
3. **Quản trị có phí bằng Pi:** ngoài tài khoản Super Admin tối cao đã được xác minh của chủ dự án, mọi tài khoản quản trị cần gói 10/30/90/365 ngày theo mức giá đã chốt trong tài liệu hiện hành. Pi đã thanh toán không tự cấp quyền; chỉ quyết định Super Admin mới tạo/kích hoạt grant.
4. **Miễn phí vĩnh viễn cho đúng tài khoản chủ dự án:** ngoại lệ được ràng buộc vào `account_id` đã bootstrap/xác minh bằng quy trình server-side một lần, không suy ra từ email do client gửi, role do client khai, hay cờ mà người dùng tự sửa. Grant Super Admin tối cao không hết hạn; không cho tự bootstrap/tự nâng quyền.
5. **Lực lượng vũ trang là khu vực chặn mặc định:** chỉ membership đã xác minh và phê duyệt mới được truy cập. Trạng thái đăng ký chờ duyệt, có tài khoản, có quyền admin hoặc đã mua gói đều không thay thế phê duyệt membership.
6. **Mặc định từ chối (deny-by-default):** mọi endpoint, truy vấn, tệp và tác vụ nền phải kiểm tra session, account status, action permission, role grant, scope, membership/approval và hiệu lực thời gian ở server.
7. Không lưu mật khẩu rõ, token phiên rõ, bí mật thanh toán hoặc dữ liệu giấy tờ trong log; không đặt file nhạy cảm trong bucket/public URL. Không lưu dữ liệu bí mật nhà nước/quân sự trên HTS thông thường.

### Ngoài phạm vi triển khai mặc định

Giai đoạn 1 không đồng nghĩa triển khai Dân Cư Số, toàn bộ Trung tâm Báo cáo, AI/OCR, mạng xã hội, marketplace, thi/chấm điểm, điểm danh sinh trắc hoặc các biểu mẫu quân sự. Các bảng tương ứng được kiểm kê ở mục 5 để giữ một danh mục hợp nhất và ngăn tạo bảng trùng; chỉ mở phân hệ sau khi có phê duyệt riêng, nền quyền đã nghiệm thu và yêu cầu dữ liệu rõ ràng.

## 2. Căn cứ và hiện trạng đã biết

Các nguồn chính được đối chiếu:

- [HTS_FULL_PROJECT_AUDIT.md](./HTS_FULL_PROJECT_AUDIT.md): hiện trạng chủ yếu là UI mẫu; chưa thấy migration D1 nghiệp vụ, auth server-side, API nghiệp vụ hoặc R2 binding/luồng tệp.
- [BAO_CAO_RA_SOAT_SUPABASE_D1.md](./BAO_CAO_RA_SOAT_SUPABASE_D1.md): báo cáo lịch sử về D1 local; không chứng minh trạng thái D1 remote.
- [HTS_D1_AUTH_RBAC_DESIGN.md](./HTS_D1_AUTH_RBAC_DESIGN.md): account, session, membership, role, permission, scope, review và event model.
- [HTS_MASTER_ARCHITECTURE.md](./HTS_MASTER_ARCHITECTURE.md): hợp nhất các bảng ứng viên, quy tắc chống trùng và lộ trình.
- [HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md](./HTS_FIELD_ACCESS_AND_VERIFICATION_DESIGN.md): chặn truy cập, hồ sơ và phê duyệt Lực lượng vũ trang.
- [HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md](./HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md): gói quản trị Pi, xác minh giao dịch, cấp grant và ngoại lệ chủ dự án.
- [HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md](./HTS_AI_TEACHING_AND_CURRICULUM_DESIGN.md), [HTS_AI_REPORTING_DESIGN.md](./HTS_AI_REPORTING_DESIGN.md), [HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md](./HTS_ATTENDANCE_AND_BIOMETRIC_DESIGN.md), [HTS_DATABASE_AND_SECURITY_PLAN.md](./HTS_DATABASE_AND_SECURITY_PLAN.md) và [README_HTS_v5.0.md](../README_HTS_v5.0.md): các bảng chuyên ngành/legacy cần chuẩn hóa.

Tại thời điểm lập kế hoạch, các tài liệu nêu binding D1 và kiểm tra kết nối, nhưng **không chứng minh** D1 production hoặc R2 đã tồn tại/được phê duyệt. Tình trạng tài nguyên/dữ liệu Supabase bên ngoài chưa được xác minh và không bị thay đổi. Không được lấy báo cáo local làm bằng chứng về remote.

## 3. Kiến trúc mục tiêu

```text
Browser
  └─ HTTPS → Next.js/OpenNext Worker
       ├─ kiểm tra origin/CSRF, giới hạn tốc độ, validate input
       ├─ xác thực cookie session → tra digest trong D1
       ├─ authorize: account status + role/permission + scope
       │            + membership/approval + subscription/entitlement
       ├─ D1 binding: truy vấn có điều kiện scope, transaction/idempotency
       ├─ R2 private binding: object chỉ qua Worker sau kiểm tra quyền
       └─ ghi security_events/audit_events cho quyết định cần kiểm toán
```

### Trách nhiệm của từng lớp

- **D1:** nguồn sự thật cho account, trạng thái, memberships, grants, scope, quyết định, giao dịch và metadata. Bật/kiểm tra foreign keys; dùng ràng buộc `UNIQUE`, `CHECK`, chỉ mục phù hợp và giao dịch cho các thay đổi cần nguyên tử.
- **Worker/server:** xác thực và cấp cookie, kiểm tra quyền cho từng request, xác định actor từ session chứ không từ payload, xác minh thanh toán, bảo vệ R2, ghi event và trả lỗi không tiết lộ dữ liệu.
- **Browser:** giao diện và dữ liệu do người dùng yêu cầu; không phải nơi quyết định role, field, owner, giá, payment status, file key hoặc quyền truy cập.
- **R2:** private-by-default; D1 giữ object metadata/reference, không giữ bytes. Object key ngẫu nhiên, không suy đoán được; không trả URL công khai hoặc URL ký dài hạn. Worker kiểm tra lại quyền tại mỗi lần tải/cấp URL.
- **Email và Pi:** gọi từ server qua tích hợp được phê duyệt. Không ghi secret/API key/wallet passphrase vào D1, response, log hoặc bundle phía client.

### Quy trình authorize tối thiểu cho mọi API

1. Xác thực session server-side, kiểm tra session chưa hết hạn/thu hồi, account còn active và MFA khi policy yêu cầu.
2. Xác định action permission từ route/operation; không nhận role hoặc permission quyết định từ browser.
3. Nạp grant còn hiệu lực và kiểm tra `scope_type/scope_id` cùng quan hệ scope đã xác minh; không suy quyền cha-con từ chuỗi hoặc tên.
4. Với học tập, kiểm tra membership/quyền nội dung. Với Lực lượng vũ trang, yêu cầu membership `approved/active` trước khi trả cả metadata, danh sách, nội dung, API hoặc tệp.
5. Với admin, kiểm tra Super Admin/Field Admin grant, scope, hạn, trạng thái và entitlement Pi; tài khoản chủ dự án chỉ miễn gói theo account ID đặc quyền đã xác minh.
6. Chỉ truy vấn/trả dữ liệu thuộc scope được phép; giới hạn trường nhạy cảm, phân biệt view/edit/approve/export.
7. Ghi audit/security event cho quyết định và hành động nhạy cảm; không ghi secret, token, nội dung giấy tờ hoặc payload không cần thiết.
8. Thực hiện thao tác; trả lỗi 401/403/404 theo chính sách chống dò tài nguyên, lỗi 5xx có correlation ID nhưng không lộ chi tiết nội bộ.

Không dùng UI guard hoặc `localStorage` làm ranh giới bảo vệ D1; cookie phải được đối chiếu với session server-side.

## 4. Quy ước chuẩn hóa và chống tạo bảng trùng

Danh sách dưới đây là **tên logic chuẩn đề xuất để đặc tả sau kiểm kê**, không phải lệnh tạo bảng. Trước khi chốt tên vật lý phải inventory schema/migrations/relations/indexes của D1. Không lấy Supabase làm schema hoặc runtime thay thế. Mọi yêu cầu giữ/chuyển dữ liệu ngoài D1 phải được chủ dự án xác nhận và phê duyệt riêng trước khi truy cập; không tạo bản sao bảng.

| Tên/ý nghĩa xuất hiện trong tài liệu | Tên chuẩn đề xuất | Quy tắc hợp nhất |
|---|---|---|
| `profiles` | `user_profiles` | Hồ sơ tách khỏi account/auth; chuyển dữ liệu chỉ sau khi đối chiếu ID và quyền riêng tư. |
| `learning_categories`, `user_field_memberships` | `learning_fields`, `learning_field_memberships` | Danh mục lĩnh vực và membership là hai quan hệ riêng; không dùng một cột `learning_group` thay cho membership nhiều lĩnh vực. |
| `user_roles`, `admin_permission_grants`, `admin_permission_definitions`, `admin_permission_groups` | `roles`, `permissions`, `role_permissions`, `role_grants`, `permission_grants` | Chuẩn hóa role catalog, role-permission catalog, grant account/scope; không tạo bảng admin permission song song. |
| `organization_scope_relations` | `scope_relations` | Một bảng quan hệ scope có kiểm chứng, không giữ cả hai tên. |
| `audit_logs`, `permission_audit`, `admin_permission_audit`, `report_activity_logs`, `military_access_audit`, `civic_access_audit` | `audit_events` | Dùng `event_domain`, action, actor, target, scope, outcome, timestamp và correlation ID; không tạo log theo từng phân hệ nếu cùng mục đích. |
| `security_events` | `security_events` | Giữ riêng cho sự kiện xác thực/bảo mật (login fail, lockout, recovery, revoke); có thể cùng correlation ID với audit nhưng không thay audit nghiệp vụ. |
| `military_unit_memberships` | `unit_memberships` | Dùng membership tổ chức chung với loại/scope phù hợp; không tạo bảng membership đơn vị thứ hai. |
| `military_learning_groups`, `military_group_members` | `organization_scopes` + `group_memberships` | Chỉ khi mô hình scope chung đáp ứng được; nếu cần quan hệ domain riêng, duy trì bảng quan hệ chứ không lưu object/file trùng. |
| `group_leader_history`, `group_leader_approvals`, `group_membership_history`, `class_membership_history` | `role_grant_history`, `audit_events` và các bảng quan hệ chuẩn | Lịch sử grant/assignment dùng một nguồn chuẩn; không tạo history table nếu chỉ lặp các sự kiện đã có. |
| `entitlements`, `entitlement_subscriptions` | `entitlement_subscriptions` | Một bảng entitlement có trạng thái/hiệu lực/account/scope và liên kết yêu cầu/grant; không giữ hai bảng đồng nghĩa. |
| `entitlement_audit`, `entitlement_audit_logs` | `audit_events` + `role_grant_history` | Kế toán/quyết định grant và audit có ranh giới rõ; không tạo hai bảng audit cùng sự kiện. |
| `pi_payment_transactions`, `entitlement_transactions` | `pi_payment_transactions` | Một giao dịch xác minh Pi; liên kết order, không tạo bản sao theo loại entitlement. |
| `attachments`, `report_attachments`, `data_exports` | `attachments`, quan hệ `report_attachments` khi module báo cáo cần, `data_exports` khi export được duyệt | `attachments` lưu metadata/object reference; quan hệ nghiệp vụ không sao chép bytes. `data_exports` là artifact có expiry riêng, không thay audit. |
| `military_unit_approval_documents` | `attachments` + quan hệ request-document | Metadata/tệp dùng chung; nếu cần bảng nối domain thì chỉ lưu FK, loại tài liệu và trạng thái review, không lưu object thứ hai. |
| `lessons` | `lessons` | Thiết kế canonical theo yêu cầu học tập và inventory D1; không tạo bảng “D1 lessons” trùng. |
| `learning_progress` | `learning_progress` | Một bảng progress có account/class/subject/lesson/curriculum scope; chuyển đổi từ `user_id` legacy có mapping rõ. |
| `entitlement_plans` + `entitlement_plan_prices` | Giữ cả hai nếu cần lịch sử giá | Plan là danh mục; price/version lưu snapshot/hiệu lực; mỗi order chụp giá để giá mới không đổi đơn cũ. |

`member_statuses` trong danh sách rà soát là thuật ngữ/danh mục trạng thái, không được biến thành bảng trước khi chứng minh cần lookup table. Status ổn định có thể là enum/check có phiên bản trong schema. `military_access_audit` và các audit tương tự được hấp thụ vào `audit_events`, không có nghĩa bỏ audit truy cập đặc biệt.

## 5. Danh mục bảng D1 hợp nhất theo nhóm

### 5.1. Lõi bắt buộc cho Giai đoạn 1

| Nhóm | Tên chuẩn đề xuất | Quan hệ/ghi chú |
|---|---|---|
| Account | `accounts` | Định danh đăng nhập duy nhất; gốc của hồ sơ, credentials, sessions, memberships, grants và orders. `email_normalized` unique; trạng thái account được kiểm tra server-side. |
| Identity | `account_identity_links` | Nhiều identity đã xác minh có thể thuộc một account; identity chuẩn hóa unique. Phase đầu tối thiểu email; không tạo account trùng khi email legacy trùng mà chưa reconcile. |
| Hồ sơ | `user_profiles` | 1:1 với account; không chứa role làm nguồn quyền, mật khẩu hay giấy tờ nhạy cảm. |
| Credential/session | `auth_credentials`, `auth_sessions` | Credentials liên kết account; session chỉ lưu digest/token hash và trạng thái/expiry/revoke metadata. Cookie chứa secret ngẫu nhiên HTTP-only; server so digest. |
| Email/password recovery | `email_verifications`, `password_reset_tokens`, `account_recovery_requests` | Token digest, expiry, one-time use; reset/recovery thành công revoke các session theo policy. |
| Danh mục lĩnh vực | `learning_fields` | Bảy field chính thức; seed bằng migration có kiểm soát, không cho client tạo field tùy ý. |
| Membership đa lĩnh vực | `learning_field_memberships` | N:M accounts↔fields; trạng thái/approval riêng từng field. Membership không tạo role admin và không tính phí học tập. |
| Catalog quyền | `roles`, `permissions`, `role_permissions` | Role/permission chuẩn, có phiên bản/seeding review; role `learner`, `field_admin`, `super_admin` tối thiểu, role chuyên ngành thêm theo scope được duyệt. |
| Grant quyền | `role_grants`, `permission_grants`, `role_grant_history` | Grant thuộc account + role/permission + scope + trạng thái + khoảng hiệu lực + actor/lý do; lịch sử append-only ở tầng ứng dụng và kiểm soát DB. |
| Scope | `organization_scopes`, `scope_relations` | Cây/đồ thị phạm vi và quan hệ đã xác minh; grant tham chiếu scope cụ thể; Super Admin tối cao chỉ có scope `platform`. |
| Yêu cầu quản trị | `admin_requests`, `admin_request_reviews` | Yêu cầu có account/role/scope/lý do; review ghi reviewer/quyết định/lý do. Chỉ Super Admin có thẩm quyền tạo/cập nhật grant sau quyết định. |
| Event | `audit_events`, `security_events` | `audit_events` dùng cho hành động/quyết định nhạy cảm, quyền và dữ liệu; `security_events` cho auth/security. Chỉ service ghi; user/admin thông thường không update/delete. |
| Tệp | `attachments` | Metadata private object: owner, purpose, scope, object key ngẫu nhiên, mime/size/checksum, trạng thái/quarantine/expiry. R2 giữ bytes. |
| Lực lượng vũ trang | `military_member_approval_requests` | Gắn account, field/unit scope, trạng thái quy trình, actor/quyết định/lý do tối thiểu; chưa duyệt thì không kích hoạt membership. |
| Tài liệu xác minh | `military_unit_approval_documents` **hoặc** quan hệ với `attachments` | Chốt sau thiết kế FK/cấu trúc inventory: chỉ link tới attachment và ghi loại/trạng thái review; không chứa bytes, URL công khai hoặc nội dung giấy tờ trong log. |
| Thanh toán quyền admin | `entitlement_plans`, `entitlement_plan_prices`, `entitlement_subscriptions`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications` | Mô tả ở mục 5.3; tài khoản chủ dự án miễn gói theo account ID đặc quyền, không qua giá/đơn; tài khoản admin còn lại cần paid + approval + grant active. |

### 5.2. Học tập cơ bản miễn phí – nền dữ liệu tối thiểu

Các bảng này cần cho một luồng nội dung/progress cơ bản, không phải toàn bộ hệ thống curriculum. Tất cả phải liên kết account/field và được bảo vệ ở server. Trường `field_id` phải trỏ tới `learning_fields`.

| Tên chuẩn | Quan hệ/ghi chú |
|---|---|
| `courses` | Thuộc một field; trạng thái draft/published/archived; admin chỉ sửa trong permission/scope. Thiết kế từ yêu cầu và inventory D1 được duyệt. |
| `lessons` | Thuộc course và field; xác định versioning trước khi xuất bản; không ghi đè nội dung đã publish. |
| `learning_progress` | N:M account/lesson (có scope class/field/curriculum khi có); learner chỉ đọc/sửa progress của mình, server xác minh lesson access. Migrate từ `profiles`/`learning_progress` legacy sau mapping. |

Phân hệ học tập không được phụ thuộc vào subscription quản trị. Nếu dùng quota kỹ thuật AI sau này, quota phải được mô tả là giới hạn vận hành, không phải học phí hoặc điều kiện mua admin package.

### 5.3. Gói quản trị Pi và miễn trừ chủ dự án

| Tên chuẩn đề xuất | Quan hệ/ghi chú |
|---|---|
| `entitlement_plans` | Gói 10, 30, 90, 365 ngày; cấu hình khả dụng và ngày hiệu lực. |
| `entitlement_plan_prices` | Giá Pi theo phiên bản, hiệu lực; giá trị đã chốt: 0,00314 / 0,00942 / 0,02826 / 0,11461 Pi. Không ghi đè giá snapshot của đơn cũ. |
| `pi_payment_orders` | Account + `admin_request` + plan/price snapshot + expected amount/receiver/network + trạng thái/expiry; không nhận giá hoặc receiver đáng tin từ browser. |
| `pi_payment_transactions` | Transaction ID Pi unique/idempotent; order link; amount/receiver/network/context và trạng thái đối soát. Dùng chung cho payment domain nếu tương lai được phê duyệt; không nhân bản trong `entitlement_transactions`. |
| `pi_payment_verifications` | Kết quả xác minh server-side, thời điểm/nguồn và sai lệch; không lưu secret ví. |
| `entitlement_subscriptions` | Lịch sử quyền quản trị mua/gắn account/request/order/role/scope và thời hạn; tách trạng thái thanh toán khỏi approval và grant. |
| `audit_events` + `role_grant_history` | Audit giao dịch, quyết định, cấp/gia hạn/thu hồi; thay cho `entitlement_audit` và `entitlement_audit_logs` song song. |

Quy tắc cấp quyền: `paid` chỉ chuyển yêu cầu sang chờ xét duyệt; không tự tạo grant. Chỉ Super Admin duyệt mới kích hoạt `role_grants` với scope và thời hạn cụ thể. Ngoại lệ chủ dự án dùng đúng account ID đã bootstrap, Super Admin platform scope và miễn phí vĩnh viễn; không cho account khác tự sửa để được miễn. Hết hạn/thu hồi admin không khóa account hoặc membership học tập.

### 5.4. Xác minh Lực lượng vũ trang

Giai đoạn 1 phải triển khai trạng thái chặn và quy trình approve trước khi mở bất kỳ nội dung/tệp nội bộ nào. `military_member_approval_requests` là hồ sơ workflow; `learning_field_memberships` chỉ active sau quyết định được phép. Nếu cần unit/group sau phê duyệt, tái sử dụng `unit_memberships`, `group_memberships`, `organization_scopes` và `scope_relations` nếu đủ semantics; tránh clone `military_*_memberships` cùng dữ liệu.

Các bảng `military_learning_groups`, `military_group_members`, `military_unit_memberships`, `military_access_audit` và bảng biểu mẫu quân sự là ứng viên/alias cần rà soát, không mặc định tạo trong migration lõi. Dùng `audit_events` cho truy cập/duyệt/thu hồi đặc thù với `event_domain` phù hợp. Không đưa dữ liệu mật, hồ sơ thật hoặc file chưa được cấp thẩm quyền cho phép vào R2/HTS.

### 5.5. Danh mục phân hệ khác đã kiểm kê – chưa thuộc migration nền

Các bảng sau đã xuất hiện trong README, báo cáo D1 hoặc tài liệu chuyên ngành. Ghi ở đây để không bỏ sót inventory; chỉ triển khai khi có scope, chủ dữ liệu, retention, quyền, kiểm thử và phê duyệt riêng.

**Giáo dục, tổ chức, curriculum và phân công**

`education_sectors`, `education_units`, `education_systems`, `curriculum_frameworks`, `curriculum_versions`, `education_stages`, `schools`, `campuses`, `academic_years`, `grades`, `classes`, `subjects`, `content_topics`, `curriculum_subjects`, `topics`, `learning_standards`, `school_memberships`, `class_memberships`, `class_membership_history`, `student_memberships`, `teacher_assignments`, `school_leadership_assignments`, `group_memberships`, `group_membership_history`, `unit_memberships`, `group_leader_assignments`, `group_leader_proposals`.

Chuẩn hóa `organization_scopes/scope_relations` với các bảng tổ chức chuyên ngành; `class_memberships` hoặc `student_memberships` phải có duy nhất một semantics canonical sau inventory. Không tạo cả `student_memberships` và `class_memberships` nếu chỉ khác tên cho cùng quan hệ.

**Kho học liệu, nội dung, bài tập và AI**

`learning_materials`, `learning_material_versions`, `learning_material_classifications`, `learning_material_sources`, `source_references`, `lesson_versions`, `lesson_sections`, `lesson_citations`, `lesson_review_requests`, `lesson_publication_records`, `exercise_sets`, `questions`, `learning_assignments`, `assignment_submissions`, `learning_events`, `learning_sessions`, `mastery_snapshots`, `content_review_requests`, `content_review_decisions`, `copyright_clearance`, `ai_jobs`, `ai_extractions`, `ai_sessions`, `ai_messages`, `ai_usage_ledger`.

`ai_extractions` và `report_ai_extractions` có thể là pipeline AI chung và quan hệ kết quả đặc thù báo cáo; phải xác định một nguồn job (`ai_jobs`) và tránh lưu trùng extraction/payload. Không cho AI truy cập D1/R2 trực tiếp hoặc quyết định quyền/xác minh/duyệt.

**Thi, điểm và điểm danh**

`exams`, `exam_schedules`, `exam_candidates`, `exam_questions`, `exam_attempts`, `exam_answers`, `exam_results`, `exam_result_versions`, `exam_import_batches`, `exam_import_rows`, `exam_warnings`, `exam_score_reviews`, `exam_score_approvals`, `attendance_sessions`, `attendance_records`, `attendance_verifications`.

Đây là schema nghiệp vụ riêng; chỉ kết nối sau khi có account/membership/assignment, retention và quy trình duyệt. Không lưu ảnh/khuôn mặt trong D1; `biometric_processing_authorizations` chỉ cân nhắc sau đánh giá pháp lý, ưu tiên bảng consent chung đã có.

**Trung tâm Báo cáo số**

`report_domains`, `report_org_units`, `report_memberships`, `report_groups`, `report_group_members`, `report_group_role_history`, `report_templates`, `report_template_fields`, `report_template_versions`, `report_campaigns`, `report_requests`, `report_request_reviews`, `report_submissions`, `report_submission_versions`, `report_approvals`, `report_attachments`, `report_ai_extractions`, `report_activity_logs`.

Tái sử dụng organization/membership/scope, `attachments`, `ai_jobs`, `audit_events` và `data_exports` khi semantics phù hợp. `report_attachments` chỉ là quan hệ nếu cần, không lưu lại object bytes; `report_activity_logs` không được trùng `audit_events`.

**Dân Cư Số – dữ liệu nhạy cảm, ngoài Giai đoạn 1**

`civic_areas`, `civic_village_admin_assignments`, `civic_households`, `civic_residents`, `civic_household_members`, `civic_residency_events`, `civic_import_jobs`, `civic_import_records`, `civic_documents`, `civic_data_corrections`, `civic_access_audit`, `civic_retention_policies`.

Không thu thập/di trú dữ liệu thật trước khi có căn cứ, thẩm quyền và đánh giá riêng. Audit/retention có thể dùng hạ tầng chung; bảng nghiệp vụ không được tạo chỉ vì có tên trong README.

**Workflow nội dung/biểu mẫu và trưởng nhóm Lực lượng vũ trang**

`content_submission_requests`, `content_submission_summaries`, `content_approval_records`, `content_delivery_records`, `military_gift_registration_forms`, `military_uniform_registration_forms`, `military_registration_versions`, `group_leader_approvals`, `group_leader_history`.

Giữ nguyên cấu trúc hai biểu mẫu gốc trong README khi/ nếu được duyệt triển khai. `group_leader_history` có thể hợp nhất với lịch sử assignment/grant/audit; không tạo song song cho cùng sự kiện.

**Commerce, nền tảng, tương tác và thông báo**

`sellers`, `shops`, `products`, `product_price_history`, `orders`, `order_items`, `notifications`, `announcements`, `contextual_help`, `news_articles`, `social_posts`, `social_comments`, `social_likes`, `chat_threads`, `chat_messages`, `platform_public_profile`, `feature_guides`, `feature_guide_versions`.

Marketplace `orders` là đơn hàng sản phẩm, không được nhầm với `pi_payment_orders` cho entitlement; giao dịch thanh toán có thể dùng một payment ledger chung sau thiết kế. Các bảng social/news/help không thuộc nền tảng auth cơ bản.

**Cross-cutting**

`attachments`, `data_exports`, `retention_policies`, `audit_events`, `security_events`, `notifications`, `announcements`, `contextual_help`. `audit_logs`, `permission_audit`, `admin_permission_audit`, `report_activity_logs`, `military_access_audit`, `civic_access_audit`, `entitlement_audit` và `entitlement_audit_logs` là các tên cũ/miền nghiệp vụ cần hợp nhất, không phải các bảng audit song song.

## 6. Quan hệ dữ liệu nền

```text
accounts 1─1 user_profiles
accounts 1─N auth_credentials / auth_sessions / email_verifications /
              password_reset_tokens / account_recovery_requests
accounts N─M learning_fields qua learning_field_memberships
accounts N─M roles/permissions qua role_grants / permission_grants
roles N─M permissions qua role_permissions
role_grants ── organization_scopes; scope_relations mô tả quan hệ đã xác minh
accounts 1─N admin_requests 1─N admin_request_reviews
admin_requests ── entitlement_subscriptions ── pi_payment_orders
pi_payment_orders 1─N pi_payment_transactions / pi_payment_verifications
admin_requests (approved) ── role_grants (active, đúng scope/thời hạn)
accounts ── military_member_approval_requests
military_member_approval_requests (approved) ── active learning_field_memberships
attachments ── private R2 object; domain record chỉ tham chiếu object/attachment
accounts ── learning_progress ── lessons ── courses ── learning_fields
audit_events/security_events tham chiếu actor/target/scope; không chứa secrets
```

Mọi FK/xóa cascade cần được xét theo retention: không cascade xóa lịch sử thanh toán, quyết định quyền, audit hoặc hồ sơ cần lưu. Dùng trạng thái disabled/revoked/expired và quy trình xóa/ẩn danh được phê duyệt thay vì hard-delete mặc định.

## 7. Thứ tự công việc và phụ thuộc kỹ thuật

| Bước | Công việc | Phụ thuộc / cổng hoàn thành |
|---|---|---|
| 0. Chốt phạm vi và quyền truy cập môi trường | Chỉ định D1 local/test/staging/production; xác minh ai có quyền đọc schema; không truy cập tài nguyên bên ngoài hoặc production nếu chưa được phê duyệt. | Chủ dự án phê duyệt môi trường và phương thức chỉ-đọc. |
| 1. Inventory, backup và đối chiếu | Thu thập schema/migrations/indexes/FK/trigger/table row counts theo quyền; xác định bảng trùng; backup và diễn tập restore trên môi trường thử nghiệm. | Không lập migration trước khi inventory và backup/restore pass. |
| 2. Chốt đặc tả dữ liệu và chính sách | Chốt canonical names, trạng thái, FK, scope, email normalization, session/MFA, Super Admin root account, xử lý tài khoản cũ, Lực lượng vũ trang, giá Pi/refund/expiry, retention và R2. | Quyết định tại mục 10 được ghi nhận; thiết kế được review. |
| 3. Chuẩn bị migration framework và schema nền trên môi trường thử nghiệm | Chọn cơ chế migration tương thích Wrangler/D1, versioning, forward-only/rollback strategy, FK enforcement, indexes và seed catalogs idempotent. Không chạy production. | Bước 1–2 xong; có bản backup restore được; code review bảo mật. |
| 4. Tạo lõi account và event | Theo thứ tự migration mục 8: fields/accounts, profiles, roles/permissions/scopes, audit/security, credentials/identity/session/recovery. | Schema review; test constraints; secrets/mail provider chỉ ở server config. |
| 5. Tạo membership và RBAC | Learning fields/memberships, role/permission grants, history, scope relations, admin requests/reviews; bootstrap root duy nhất theo runbook. | Account/session được test; không có endpoint cấp role tự do; bootstrap one-time. |
| 6. Tạo workflow Lực lượng vũ trang và R2 private | Request/document metadata, R2 private binding, upload/download broker, virus/type/size policy, expiry/deletion; khóa toàn bộ endpoints trước approve. | Unit/authority/data policy và R2 region/retention đã chốt; test bằng dữ liệu tổng hợp. |
| 7. Tạo luồng gói quản trị Pi | Catalog/version giá, order/transaction/verification, entitlement record; kết nối test/sandbox theo tài liệu Pi chính thức; cấp grant vẫn cần Super Admin. | Bước 5 xong; Pi integration được phê duyệt; không có production payment trước cổng go-live. |
| 8. Nối học tập tối thiểu miễn phí | Field/course/lesson/progress API; policy free; R2 content private hoặc public-published theo phân loại và authorization. | Membership/access checks và API guard dùng chung đã nghiệm thu; subscription không nằm trên đường cấp quyền học. |
| 9. Kiểm thử bảo mật, backup/restore và staging | Test matrix mọi role/scope/state, brute-force/rate limits, session revoke, IDOR, upload/download, payment idempotency, backup restore, migration upgrade. | Không còn lỗi Critical/High; rollback/restore đã diễn tập; chủ dự án duyệt staging. |
| 10. Cổng production riêng | Chỉ sau phê duyệt go-live: backup production, đối soát schema/data, migration theo change window, health/alerts, rollback, incident contacts. | Cần quyết định và phê duyệt riêng. Không nằm trong công việc tài liệu hiện tại. |

## 8. Thứ tự migration D1 đề xuất (sau phê duyệt)

Thứ tự này là phụ thuộc logic, không phải migration/SQL được tạo trong tài liệu:

1. **`0001_platform_reference`**: `learning_fields`, `roles`, `permissions`; seed bảy lĩnh vực và role/permission tối thiểu bằng dữ liệu versioned/idempotent. Nếu FK accounts→default field không cần thiết, không thêm FK giả.
2. **`0002_accounts_profiles_scopes`**: `accounts`, `account_identity_links`, `user_profiles`, `organization_scopes`, `scope_relations`. Thiết kế `accounts` độc lập để account chưa verified vẫn biểu diễn được.
3. **`0003_audit_security`**: `audit_events`, `security_events`; actor FK có thể nullable cho sự kiện chưa xác thực, nhưng phải lưu IP/device metadata tối thiểu theo policy.
4. **`0004_auth_sessions_credentials`**: `auth_credentials`, `auth_sessions`, `email_verifications`, `password_reset_tokens`, `account_recovery_requests`; unique digest, expiry/status checks, indexes cho lookup session/account/expiry.
5. **`0005_role_permission_grants`**: `role_permissions`, `role_grants`, `permission_grants`, `role_grant_history`; FK đến accounts/roles/permissions/scopes; mọi state transition ghi history/event cùng transaction.
6. **`0006_memberships_admin_workflow`**: `learning_field_memberships`, `admin_requests`, `admin_request_reviews`; FK accounts/fields/scope/reviewer; unique membership theo account+field; chỉ trạng thái active mới đủ để authorize.
7. **`0007_attachments_military_verification`**: `attachments` và `military_member_approval_requests`; thêm quan hệ `military_unit_approval_documents` chỉ nếu inventory xác nhận metadata workflow riêng chưa đáp ứng được bằng attachment relation. Không bật truy cập nội dung trước endpoint gate.
8. **`0008_admin_entitlements_pi`**: `entitlement_plans`, `entitlement_plan_prices`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications`, `entitlement_subscriptions`; unique external transaction ID/idempotency; FK tới request/account/plan/order/grant; không cascade xóa chứng từ.
9. **`0009_learning_core`**: `courses`, `lessons`, `learning_progress`; dùng canonical schema đã được duyệt và đối chiếu D1. `lesson_versions` chỉ được thêm nếu release/version requirement được chốt trước khi xuất bản.
10. **`0010_indexes_constraints_hardening`**: hoàn tất indexes, partial unique constraints nếu tương thích SQLite/D1, check constraints/status, query plans, referential integrity và migration invariants; chỉ tạo index được workload/test chứng minh cần.

Migration implementation nên nhỏ, tuần tự và forward-compatible; không sửa migration đã chạy. Thay đổi phá hủy/rename cần migration chuyển đổi riêng, backup, kiểm thử dữ liệu, rollback/restore đã thử và phê duyệt. Không đưa dữ liệu bí mật hoặc tài khoản chủ dự án vào seed công khai.

## 9. Bảo vệ session, API và dữ liệu

### Session và account security

- Session ID sinh ngẫu nhiên mật mã; chỉ digest lưu trong D1; cookie `HttpOnly`, `Secure`, `SameSite` theo flow; không đặt token trong `localStorage`.
- Kiểm tra expiry/revocation/account status trên mọi request nhạy cảm; xoay session sau login, MFA elevation và password change; reset password/recovery/lock account revoke session liên quan.
- Có CSRF/origin protection với cookie auth, rate-limit đăng nhập/đăng ký/reset/verify, response recovery không tiết lộ email tồn tại, chống replay token và log sự kiện bất thường.
- MFA bắt buộc Super Admin theo README/thiết kế; cơ chế MFA, recovery và factor storage phải được chốt. Không tự bịa schema MFA trước quyết định chọn TOTP/WebAuthn/managed provider.
- Idle timeout, absolute timeout, số session thiết bị, IP/device hashing và retention phải theo policy được duyệt; không thu fingerprint thừa.

### Quyền và chống tự nâng quyền

- Public registration tạo account learner/membership theo chính sách nhưng **không nhận `role`, scope, admin exemption hoặc trạng thái verified từ client**.
- Không có route self-service để tạo/sửa role grants, permission grants, root account ID hoặc entitlement active. Người Field Admin không được cấp quyền cho mình/người khác hoặc đổi scope.
- Root bootstrap là thao tác server-side một lần theo runbook, xác thực chủ dự án độc lập; account ID root không lấy từ request, không dựa email-only. Mọi thay đổi đặc quyền cần audit và cơ chế break-glass/recovery được chủ dự án duyệt.
- Khi kiểm tra quyền, server dùng database state + policy đã phê duyệt; không coi `super_admin` label đơn lẻ là miễn phí nếu account không phải root được xác minh.
- Kiểm tra quyền học và quyền admin tách biệt. Một user có nhiều role/membership nhưng quyết định trên từng request chỉ dùng quyền phù hợp với target scope và action cụ thể.

### R2 và tệp

- Bucket private, bindings tách môi trường; object key opaque/không chứa email, tên, số hồ sơ hoặc nội dung nhạy cảm. D1 lưu metadata tối thiểu và reference, không lưu bytes.
- Worker xác thực/authorize upload, download, preview, export và delete; kiểm tra loại MIME dựa trên nội dung, kích thước, checksum, tên tệp, quarantine/malware scan nếu được phê duyệt.
- Upload bằng Worker proxy hoặc URL ký cực ngắn, single-purpose; nếu dùng signed URL thì chỉ cấp sau kiểm quyền và không để URL thay thế authorization về sau.
- Không cache public; response tệp riêng tư dùng cache-control phù hợp; chống content sniffing; không render HTML/SVG nguy hiểm trực tiếp từ origin tin cậy.
- Có retention/expiry, xử lý xóa D1 metadata + object theo chính sách, audit xem/tải/xuất có mục đích cần thiết. Không tải giấy tờ thật Lực lượng vũ trang cho đến khi cơ quan/hạ tầng/phạm vi lưu được chấp thuận.

### Nhật ký

- `security_events`: login success/fail, lockout, reset/recovery, MFA challenge, session revoke và security alerts.
- `audit_events`: grant/revoke/approve, thay đổi giá, xác minh Pi, xem/tải/export dữ liệu nhạy cảm, quyết định membership, publish/update nội dung theo scope.
- Tối thiểu actor (nullable cho unauthenticated), action, target type/id, scope, outcome, timestamp UTC, correlation ID, reason tối thiểu; không log token, password, cookie, wallet secrets, giấy tờ hoặc prompt/payload nhạy cảm.
- Append-only qua API/DB access design, giới hạn đọc audit theo permission riêng; cảnh báo khi có hành vi đặc quyền bất thường. Retention/immutability backup cần phê duyệt và kiểm thử.

## 10. Tiêu chí nghiệm thu

### D1 và migration

- Có inventory ký duyệt gồm tên bảng canonical, alias đã hợp nhất, FK, unique/check/index, nguồn dữ liệu, retention và migration state; không có bảng trùng cùng semantics.
- Migration mới được kiểm thử trên D1 test/staging trống và trên bản sao dữ liệu giả/đã giảm định danh; chạy hai lần không tạo seed trùng; restore/rollback procedure được diễn tập.
- D1 không truy cập từ browser; mọi truy vấn nhạy cảm chạy server-side qua binding. Không coi health check `SELECT 1` là nghiệm thu nghiệp vụ.

### Authentication/session

- Đăng ký, xác minh email, login/logout, reset/recovery có trạng thái rõ; không lưu plaintext password/token; email không tiết lộ tài khoản tồn tại.
- Cookie có thuộc tính bảo mật; session hết hạn, revoke, account locked, password reset và quyền bị thu hồi đều chặn request kế tiếp, kể cả session/cache cũ.
- MFA bắt buộc cho root Super Admin; recovery không thể tự cấp Super Admin.

### RBAC, membership, admin payment

- Một account tham gia đồng thời nhiều field và giữ tiến độ riêng; join field không tạo role quản trị.
- Tạo request admin không cấp grant; Field Admin không thể tự cấp quyền, đổi scope, approve quyền của chính mình hoặc truy cập field khác.
- Chỉ root owner account đã bootstrap được miễn quản trị vĩnh viễn. Account admin khác không có grant admin khả dụng nếu chưa có đúng gói Pi đã xác minh, được Super Admin approve và grant còn hạn.
- Pi paid nhưng chưa approve/rejected không cấp quyền; sai số Pi, sai người nhận/network/order, transaction chưa final, lặp hoặc xác minh lỗi không chuyển sang paid/grant. Xử lý giao dịch/refund theo quyết định được duyệt.
- Hết hạn/revoke admin chặn thao tác quản trị ở server nhưng giữ account, dữ liệu và học tập miễn phí.
- Test mọi kết hợp role + permission + scope + expiry/status, bao gồm IDOR/đoán ID, field A→field B, thiếu membership, permission chỉ-read so với approve/export.

### Lực lượng vũ trang

- Trước approve, truy cập mọi page/API/list/search/metadata/object/download đều deny; phản hồi không làm lộ tên, hồ sơ, nội dung hoặc object key.
- Sau approve, chỉ membership và scope cụ thể active mới cho phép; suspension/revoke chặn ngay cả session cũ; request/decision/history có audit actor và thời điểm.
- File xác minh private, không có URL công khai; log không chứa file body/secret; dữ liệu thử nghiệm là synthetic.

### R2/API/security/operations

- Upload/download/review/export đều có authorization phía server, kiểm tra content/size, expiry, owner/scope; URL hoặc object key của người khác không đủ để truy cập.
- Thay role/scope/status/account_id trong browser payload không làm thay đổi quyền; lỗi authorization là deny-by-default.
- Có rate limit, CSRF/origin defense cho cookie-auth actions, safe error responses, correlation ID, alerting cho sự kiện đặc quyền.
- Backup/restore, retention/delete, incident response, key rotation và quy trình revoke session được test; không có credential hoặc dữ liệu nhạy cảm trong repo/log.
- Học một nội dung miễn phí không đòi mua admin package; test cả account có/không có subscription; các gate membership hợp pháp (đặc biệt Lực lượng vũ trang) không bị nhầm là phí.

## 11. Quyết định cần chủ dự án chốt trước khi phát triển

### Cổng bắt buộc trước khi lập migration

1. D1 nào là local/test/staging/production; có migration/schema/data remote hiện hữu không; ai được cấp quyền inventory chỉ-đọc? Tình trạng Supabase bên ngoài chưa xác minh và không được truy cập/thay đổi theo kế hoạch này.
2. Chính sách chuyển account: map ID, xác minh lại email/password reset, xử lý trùng email, tài khoản không verified và legacy sessions (không chuyển session secret).
3. Canonical schema: có dùng `account_identity_links` song song email trong `accounts`; quy tắc status và retention; danh sách chính thức 7 learning fields và field nào mở không cần login.
4. Root bootstrap: bằng chứng xác minh account chủ dự án, quy trình bootstrap một lần, MFA factor/recovery, account mất quyền truy cập, break-glass/backup administrator trong khi yêu cầu vẫn chỉ một Super Admin tối cao.
5. Session: chọn idle/absolute timeout, giới hạn session đồng thời, logout-all/reset-password behavior, thiết bị/IP metadata và retention.
6. Role/permission/scope: ma trận action × role × scope; cách cấp Field Admin nhiều lĩnh vực; thời hạn; ai có quyền đọc audit; quyền khẩn cấp.
7. Lực lượng vũ trang: nguồn/cơ quan xác minh, giấy tờ/thông tin tối thiểu, xác nhận đơn vị bắt buộc, ai có quyền approve. README nói một người có quyền hợp lệ approve là đủ; thiết kế xác minh nêu phương án cần thống nhất nếu muốn hai cấp. Chốt khiếu nại, bổ sung, từ chối, suspension/revoke, retention và hạ tầng được phép.
8. R2: bucket/account/region được phép, phân loại dữ liệu, chủ sở hữu vận hành, giới hạn loại/kích thước, malware scanning, signed URL/proxy, retention/xóa và backup. Chưa lưu hồ sơ quân sự thật nếu chưa có phê duyệt thẩm quyền.
9. Pi: phương thức/API Pi Network chính thức được phép, mainnet/testnet, receiver, xác minh finality, idempotency, đối soát, đơn trả thiếu/thừa/sai, giao dịch paid nhưng bị từ chối, refund/appeal và thời điểm bắt đầu/cộng nối hạn.
10. Giá: xác nhận giá Pi và versioning; ngoại lệ duy nhất của root owner; kiểm soát ai được thay giá; chính sách admin bổ sung ngoài Field Admin.
11. Email/MFA/security: email provider, domain sender, rate limits, CAPTCHA/bot policy nếu cần; tiêu chuẩn mật khẩu/hash tương thích Workers; secret/key rotation và incident contact.
12. Retention/privacy: thời hạn sessions, security/audit, payment, hồ sơ xác minh, attachments, học tập; yêu cầu xóa/ẩn danh/legal hold; căn cứ xử lý dữ liệu trẻ em và dữ liệu đặc biệt.

### Quyết định kỹ thuật cần spike trước khi chốt thiết kế chi tiết

- Cách lưu/verify password hash an toàn và tương thích Workers runtime; không chọn thuật toán chỉ dựa vào thư viện phía Node nếu không tương thích Cloudflare.
- Triển khai MFA và email verification/reset; có nên dùng identity/auth provider quản lý thay vì tự quản password/session.
- Cách cấp R2 upload/download an toàn trong OpenNext/Workers, giới hạn thời gian signed URL và xử lý content scanning.
- Cơ chế xác minh Pi chính thức và môi trường test; không chấp nhận callback/redirect client làm bằng chứng thanh toán.
- Migration framework D1, transaction/atomicity giới hạn, foreign key enforcement, backup/restore và quan sát/alerting phù hợp.

## 12. Những việc tài liệu này không thực hiện

Tài liệu này chỉ lập kế hoạch. Không tạo thư mục/bảng/migration D1, không chạy SQL, không truy cập/ghi D1 remote hoặc bất kỳ tài nguyên Supabase bên ngoài, Pi Network hay R2; không upload file, không bật authentication/payment production và không commit Git. Mọi trạng thái nêu trên là mục tiêu/tiêu chí; chưa được coi là chức năng đã triển khai.
