# Rà soát cuối kế hoạch triển khai HTS – Giai đoạn 1

**Ngày rà soát:** 26/11/2026
**Phạm vi:** Đọc mã nguồn, cấu hình, tài liệu và danh sách tệp hiện có; không truy vấn database.
**Căn cứ kế hoạch:** [HTS_PHASE_1_IMPLEMENTATION_PLAN.md](./HTS_PHASE_1_IMPLEMENTATION_PLAN.md)
**Trạng thái:** Báo cáo rà soát tài liệu, không phải xác nhận triển khai hoặc schema production.
**Kiến trúc hiện hành:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md). Findings và giới hạn của snapshot này được giữ nguyên.

**Cập nhật quyết định 26/11/2026:** Báo cáo dưới đây là snapshot trước khi chủ dự án quyết định loại bỏ Supabase khỏi mã nguồn. Mọi kết luận/đề xuất cũ về việc giữ Supabase làm ứng viên tích hợp hoặc chờ quyết định giữa hai nền tảng đã bị thay thế: Cloudflare Workers + D1 là backend duy nhất. Không có thay đổi nào trong snapshot này xác nhận hoặc cho phép xóa dữ liệu/dự án bên ngoài.

## 1. Kết luận điều hành

1. Repository khai báo Cloudflare D1 binding tên `DB`, nhưng phần mã D1 tìm thấy mới có helper lấy binding và API health chạy `SELECT 1`. Chưa thấy API nghiệp vụ D1 hoặc auth/RBAC server-side được triển khai.
2. Không tìm thấy thư mục `migrations/`, file migration hoặc script migration trong repository. `supabase/schema.sql` khi rà soát còn tồn tại là schema starter PostgreSQL/Supabase, không phải migration D1; file đã bị xóa trong Giai đoạn 1. Đây là kết luận lịch sử về repository, không chứng minh remote hoặc local D1 không có schema.
3. Có SQLite state dưới `.wrangler/state/v3/d1/`; đây là dấu vết môi trường D1 local. Theo giới hạn “không chạy SQL”, tệp này không được mở/truy vấn trong lần rà soát. Báo cáo D1 trước đó từng ghi nhận local chỉ có `_cf_METADATA`, nhưng phát hiện tệp hiện có không cho phép xác nhận độc lập trạng thái schema hiện tại.
4. Không kết nối/kiểm tra D1 remote, Supabase remote hay production. Tên database, database ID và binding trong cấu hình chỉ là cấu hình tham chiếu, không chứng minh database đang tồn tại, môi trường nào đang dùng, hoặc bảng nào đã được tạo.
5. Bảy lĩnh vực và quy tắc một account nhiều membership/role đã nhất quán ở tài liệu thiết kế và danh mục giao diện. Mã giao diện hiện là danh mục tĩnh; chưa có D1 seed/membership backend để chứng minh quy tắc hoạt động.
6. Các chính sách miễn phí học tập, miễn phí vĩnh viễn cho đúng account Super Admin tối cao của chủ dự án, và gói quản trị Pi được ghi nhận rõ trong tài liệu. Chưa có cơ chế vận hành nào được kiểm chứng trong mã.
7. Ma trận quyền và thứ tự migration dưới đây là quyết định thiết kế đề xuất cho lần triển khai sau; không có bảng nào được tạo trong lần rà soát.

## 2. Bằng chứng cấu hình và mã nguồn

| Hạng mục | Bằng chứng đọc được | Kết luận / giới hạn |
|---|---|---|
| Cloudflare D1 | [wrangler.jsonc](../wrangler.jsonc) khai báo binding `DB`, database name và database ID; [cloudflare-env.d.ts](../cloudflare-env.d.ts) khai báo kiểu `D1Database`. | Khai báo không chứng minh remote database tồn tại hay đang là production. Không đọc hoặc ghi remote. |
| Kết nối server | [lib/db.ts](../lib/db.ts) lấy `DB` từ `getCloudflareContext({ async: true })`, báo lỗi nếu binding không có. | Không thấy helper xác thực session, kiểm tra account, role, permission hoặc scope. |
| API D1 hiện thấy | [app/api/health/db/route.ts](../app/api/health/db/route.ts) thực hiện `SELECT 1 AS ok`, trả trạng thái kết nối; handler bắt lỗi và trả lỗi chung. | Đây chỉ là health probe, không kiểm tra schema, migration, dữ liệu hay authorization; không gọi endpoint trong lần rà soát. |
| OpenNext/Worker | [open-next.config.ts](../open-next.config.ts) chỉ gọi `defineCloudflareConfig()`. | Không thấy trong file này cấu hình auth, migration hay R2. |
| Wrangler bindings | `wrangler.jsonc` có D1 `DB` và static assets `ASSETS`; không có mục `r2_buckets` hoặc `migrations_dir`. | Chưa thấy R2 binding hay đường dẫn migrations được khai báo tại file này. Không thay đổi cấu hình. |
| Scripts | [package.json](../package.json) có `dev`, `build`, `start`, `lint`, `typecheck`, `check`; không có script migration D1. Wrangler có trong devDependencies. | Chưa có workflow migration được khai báo ở package scripts. |
| D1 usage trong source | Tìm thấy `getDB()` và truy vấn D1 ở route health; không tìm thấy truy vấn nghiệp vụ khác trong các file mã/config được rà soát. | Không có bằng chứng luồng account, course, membership, payment hoặc RBAC đang đọc/ghi D1. |
| R2 | Cấu hình Worker không khai báo R2; báo cáo kiểm toán tổng thể cũng ghi nhận chưa thấy R2 binding/API upload/download. | Không có bằng chứng R2 được kết nối. Không suy luận bucket production không tồn tại. |

`compatibility_date` hiện khai báo trong `wrangler.jsonc` là cấu hình Worker; rà soát này không kiểm tra khả năng deploy/compatibility thực tế.

## 3. D1 local, D1 remote và migration

### 3.1. D1 local

- Glob danh sách file phát hiện SQLite state của Miniflare/Wrangler dưới `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/`, gồm một database file và metadata/WAL/SHM.
- Tệp state cho biết có artefact D1 local; không tự xác định nó thuộc lần chạy nào, có còn hiện hành hay schema bên trong là gì.
- Không mở tệp SQLite, không chạy `sqlite3`, Wrangler, SQL, query schema hay migration trong lần rà soát này.
- [BAO_CAO_RA_SOAT_SUPABASE_D1.md](./BAO_CAO_RA_SOAT_SUPABASE_D1.md) ghi nhận từ lần kiểm tra trước: local chỉ có `_cf_METADATA`, không có bảng nghiệp vụ hoặc migration. Đây là kết quả được báo cáo ở lần đó, không được nâng thành kết luận cho mọi local state hoặc remote.

### 3.2. D1 remote/production

- Không truy cập Cloudflare account/API, không chạy lệnh `wrangler d1`, không dùng database ID trong cấu hình để kết nối.
- Vì vậy chưa xác nhận được môi trường nào là development, test, staging hoặc production; schema/table/index/data/migration history; backup/restore; hay có ứng dụng production nào đang dùng database này.
- Tuyệt đối không suy luận trạng thái production từ `.wrangler`, file SQLite local, binding `DB`, health route hoặc tài liệu trước đây.

### 3.3. Migration và nguy cơ bảng trùng

- Tìm kiếm file/folder tên migration và folder `migrations/` không cho kết quả trong repository; `wrangler.jsonc` không khai báo migration directory; `package.json` không có migration script.
- Schema SQL duy nhất tìm được lúc rà soát là `supabase/schema.sql` (đã xóa trong Giai đoạn 1), dùng PostgreSQL: `profiles`, `learning_categories`, `courses`, `lessons`, `learning_progress`, enum `hts_role`, function/trigger và RLS. Đây không phải D1 migration và không chứng minh đã được áp dụng ở môi trường remote.
- Vì không truy vấn D1 local và không có quyền kiểm tra remote, **chưa thể xác nhận không có bảng hoặc migration ở database**. Trước khi migration tương lai, cần inventory trực tiếp trên môi trường được chủ dự án xác định và cấp quyền chỉ-đọc.
- Không tạo song song các cặp/tên đồng nghĩa đã ghi trong kế hoạch: `profiles` → `user_profiles`; `learning_categories` → `learning_fields`; `user_field_memberships` → `learning_field_memberships`; `user_roles`/`admin_permission_*` → bộ `roles`/`permissions`/`role_permissions`/grant; `organization_scope_relations` → `scope_relations`; các audit nghiệp vụ theo miền → `audit_events`; `entitlements` → một bảng entitlement canonical; `entitlement_transactions` và `pi_payment_transactions` phải đối chiếu một ledger giao dịch; `military_unit_memberships` → membership tổ chức chung nếu đủ semantics.
- Các bảng legacy Supabase nếu có dữ liệu phải được map và chuyển đổi có phê duyệt; không tự merge account/email trùng, không xóa Supabase và không coi schema starter là dữ liệu đang chạy.

## 4. Đối chiếu 7 lĩnh vực học tập và mô hình account

### 4.1. Bảy lĩnh vực

Danh mục tĩnh trong [lib/categories.ts](../lib/categories.ts) chứa đủ bảy slug/tên:

| Slug | Lĩnh vực | Cờ truy cập trong danh mục giao diện | Ý nghĩa cần giữ |
|---|---|---|---|
| `cong-dan` | Công dân học tập | `open: true` | Nội dung mở; đăng nhập có thể cần cho cá nhân hóa/ghi tiến độ. |
| `cong-nhan` | Công nhân học tập | `open: true` | Nội dung mở; đăng nhập có thể cần cho cá nhân hóa/ghi tiến độ. |
| `sinh-vien` | Sinh viên học tập | `open: false` | Có thể yêu cầu account/membership; không phải yêu cầu thanh toán. |
| `thpt` | Học sinh THPT | `open: false` | Có thể yêu cầu account/membership; không phải yêu cầu thanh toán. |
| `thcs` | Học sinh THCS | `open: false` | Có thể yêu cầu account/membership; không phải yêu cầu thanh toán. |
| `tieu-hoc` | Học sinh tiểu học | `open: false` | Có thể yêu cầu account/membership; không phải yêu cầu thanh toán. |
| `luc-luong-vu-trang` | Lực lượng vũ trang | `open: false` | Chặn mặc định; phải xác minh và phê duyệt membership trước khi truy cập nội dung/tệp/API nội bộ. |

Danh mục trên phù hợp với README và thiết kế. Các cờ `open` hiện chỉ là dữ liệu giao diện, không phải authorization server-side hay bằng chứng các field đã được seed vào D1. **Mọi hoạt động học tập của cả bảy field đều miễn phí.** Điều kiện account, membership, xác minh hoặc phê duyệt không được trình bày/áp dụng như học phí.

### 4.2. Một account, nhiều vai trò và memberships

- Thiết kế D1/Auth và kiến trúc hợp nhất yêu cầu một `account_id` duy nhất; một account có thể có nhiều `learning_field_memberships`, role grants, permission grants và tổ chức/lớp/nhóm membership đồng thời.
- Membership trong field, role và scope là ba quan hệ khác nhau. Tham gia field không cấp Field Admin; role `teacher`/`group_leader` cần assignment/approval riêng; hết hạn admin không xóa tài khoản, học liệu hoặc tiến độ hợp lệ.
- Mã hiện có chưa có D1 schema hoặc endpoint xác thực/phân quyền để thực thi các quy tắc này.
- `supabase/schema.sql` cũ dùng một cột `profiles.role` với `learner/admin/super_admin`, không có `field_admin` hay membership đa lĩnh vực. Không dùng mô hình một cột role làm schema mục tiêu.
- Schema Supabase có policy cập nhật profile self và helper xem `admin`/`super_admin` đều là admin. Theo phân tích trong báo cáo kiểm toán, tổ hợp này có rủi ro tự nâng quyền **nếu schema/policies đó được áp dụng**. Không có bằng chứng schema đã áp dụng trên remote; không được kết luận có lỗ hổng đang tồn tại ở production. Không dùng RLS Supabase làm bảo vệ D1.

## 5. Đối chiếu miễn phí học tập và quyền quản trị Pi

| Chính sách đã chốt trong tài liệu | Kết luận rà soát | Tình trạng mã/DB |
|---|---|---|
| Tất cả hoạt động học tập trong 7 lĩnh vực miễn phí. | Đã được README, thiết kế quản trị Pi và kế hoạch Giai đoạn 1 xác nhận. Login/membership/verification là điều kiện truy cập khi áp dụng, không phải phí học. | Chưa xác minh logic billing/access backend; không thấy D1 nghiệp vụ. |
| Tài khoản Super Admin tối cao của chủ dự án miễn phí quản trị vĩnh viễn. | Ngoại lệ duy nhất; phải bind vào account ID đã bootstrap/xác minh, không dựa email/client role/cờ tự khai. Grant platform không hết hạn. | Chưa có bootstrap/auth/MFA/grant enforcement để chứng minh hoạt động. |
| Các tài khoản quản trị khác trả Pi theo gói đã chốt. | Gói 10/30/90/365 ngày với giá 0,00314 / 0,00942 / 0,02826 / 0,11461 Pi; áp dụng cho Field Admin và mọi quyền quản trị bổ sung. | Không thấy order/payment/API Pi, entitlement hoặc giao dịch được lưu/xác minh. |
| Paid không tự cấp quyền. | Thanh toán xác minh chỉ đưa request tới bước Super Admin xét duyệt; grant cần account, role, scope, status và thời hạn. | Chưa có luồng thực tế. |
| Membership Lực lượng vũ trang cần phê duyệt. | Không thể thay thế bằng gói admin, account active hoặc UI state; mọi API/tệp phải chặn trước approve. | Chưa có membership verification/server gate. |
| Admin hết hạn/thu hồi không làm mất học tập miễn phí. | Tách trạng thái admin entitlement khỏi learner membership/progress/account. | Chưa có code để kiểm thử. |

Giá gói, quy tắc bắt đầu thời hạn, cộng nối gia hạn và xử lý Pi đã thanh toán nhưng request bị từ chối cần được xác nhận/triển khai theo tài liệu chuyên ngành; báo cáo này không thực hiện payment hay kiểm chứng API Pi.

## 6. Ma trận quyền đề xuất theo vai trò, lĩnh vực và phạm vi

Ma trận dưới đây là baseline để chủ dự án duyệt và sau đó chuyển thành permission tests. Quyền luôn là giao của `role + permission/action + scope + trạng thái + hiệu lực`; mỗi ô không thay thế kiểm tra server-side.

| Vai trò | Phạm vi hợp lệ | Được phép (khi đủ grant/membership) | Không được phép / điều kiện |
|---|---|---|---|
| Learner | Field membership của chính account; tài nguyên public được phép; progress/assignment của bản thân. Có thể ở nhiều field đồng thời. | Đọc nội dung đã publish/được cấp; học, làm bài, nộp bài; đọc/cập nhật dữ liệu học tập của chính mình. | Không quản trị, không tự xác minh mình vào field hạn chế, không đọc người học khác hoặc thay `account_id/scope` trong request. Không cần mua admin package để học. |
| Teacher | Chỉ class/school/subject/academic-year có membership/teacher assignment đang active. | Tạo draft/giao việc, xem tối thiểu dữ liệu học sinh thuộc assignment, xác nhận chuyên môn khi có permission. | Không có quyền tự suy rộng từ role teacher; không sửa/chốt/duyệt điểm hoặc xem lớp khác nếu thiếu permission; không cấp role/admin. |
| Group Leader | Nhóm cụ thể đã được phê duyệt; permission/assignment còn hiệu lực. | Điều phối hoạt động và xem dữ liệu tối thiểu của nhóm trong scope. | Không tự bổ nhiệm, mở rộng nhóm, duyệt membership nhạy cảm ngoài ủy quyền, xem/xuất dữ liệu hàng loạt hoặc cấp quyền quản trị. |
| Field Admin | Field và scope/action được Super Admin cấp chính xác (có thể nhiều field với grants riêng). | Quản lý nội dung/thành viên và xử lý nghiệp vụ chỉ trong permission/scope; xử lý yêu cầu Lực lượng vũ trang chỉ khi có quyền xác minh/duyệt được phê duyệt. | Không tự cấp/đổi/thu hồi role, không tự nâng scope, không duyệt grant của mình, không quản trị field ngoài grant. Phải có gói Pi đã xác minh và Super Admin approve; trừ root owner duy nhất. |
| Super Admin tối cao – account chủ dự án | Scope `platform`, gắn với root account ID đã bootstrap/xác minh. | Quản lý role/grant, cấu hình và xét duyệt theo thẩm quyền; đọc audit/điều tra khi được phép và ghi lại hoạt động. | Là tài khoản duy nhất có miễn phí quản trị vĩnh viễn. MFA bắt buộc; không tạo lại qua đăng ký hoặc input client; truy cập dữ liệu nhạy cảm vẫn cần mục đích/permission phù hợp. |
| Người xác nhận tư cách đơn vị | Chỉ hồ sơ/đơn vị được giao trong workflow; đây là quyền nghiệp vụ cần phê duyệt, không mặc định là role quản trị HTS. | Xác nhận tư cách theo quy trình được duyệt, tối thiểu hóa dữ liệu được xem. | Không cấp role Field Admin/Super Admin, không duyệt/payment-grant hoặc xem/tải hồ sơ ngoài request được giao. Cần chủ dự án chốt cách xác thực/identity của người này. |

### Ma trận truy cập theo lĩnh vực

| Lĩnh vực | Người chưa đăng nhập | Learner đã đăng nhập | Field Admin/Teacher/Group Leader | Điều kiện đặc biệt |
|---|---|---|---|---|
| Công dân học tập | Nội dung mở công khai được phép | Tùy chọn account/membership cho tiến độ và dịch vụ cá nhân | Chỉ theo grant/assignment cụ thể | Học miễn phí; không nhầm public access với quyền sửa/xuất. |
| Công nhân học tập | Nội dung mở công khai được phép | Tùy chọn account/membership cho tiến độ và dịch vụ cá nhân | Chỉ theo grant/assignment cụ thể | Học miễn phí; không nhầm public access với quyền sửa/xuất. |
| Sinh viên học tập | Không cấp dữ liệu cá nhân | Account/membership phù hợp | Chỉ scope/assignment đã duyệt | Có thể yêu cầu đăng nhập; vẫn miễn phí. |
| Học sinh THPT | Không cấp dữ liệu cá nhân | Account/membership phù hợp | Chỉ scope/assignment; bảo vệ dữ liệu trẻ em theo policy | Có thể yêu cầu đăng nhập; vẫn miễn phí. |
| Học sinh THCS | Không cấp dữ liệu cá nhân | Account/membership phù hợp | Chỉ scope/assignment; bảo vệ dữ liệu trẻ em theo policy | Có thể yêu cầu đăng nhập; vẫn miễn phí. |
| Học sinh tiểu học | Không cấp dữ liệu cá nhân | Account/membership phù hợp | Chỉ scope/assignment; bảo vệ dữ liệu trẻ em theo policy | Có thể yêu cầu đăng nhập; vẫn miễn phí. |
| Lực lượng vũ trang | Chỉ cảnh báo và trạng thái request của chính người dùng nếu đã xác thực | Nội dung/API/object bị deny đến khi membership được xác minh và approve | Chỉ quản lý nội dung/thành viên được phép trong scope, sau phê duyệt role riêng | Phê duyệt membership bắt buộc; không lưu bí mật nhà nước/quân sự trên HTS chưa được cấp phép; học vẫn miễn phí. |

Super Admin có năng lực quản trị platform, nhưng không đồng nghĩa mọi truy vấn dữ liệu học tập/nhạy cảm mặc nhiên được phép. Mọi đọc, sửa, approve, export và cấp file phải được phân quyền độc lập và audit.

## 7. Danh mục canonical cần giữ cho Giai đoạn 1

Đây là danh sách ứng viên cần inventory và chốt; không xác nhận đã có trong D1.

**Identity/auth:** `accounts`, `account_identity_links`, `user_profiles`, `auth_credentials`, `auth_sessions`, `email_verifications`, `password_reset_tokens`, `account_recovery_requests`.

**Fields/membership/RBAC/scope:** `learning_fields`, `learning_field_memberships`, `roles`, `permissions`, `role_permissions`, `organization_scopes`, `scope_relations`, `role_grants`, `permission_grants`, `role_grant_history`, `admin_requests`, `admin_request_reviews`.

**Security/storage/armed-forces access:** `security_events`, `audit_events`, `attachments`, `military_member_approval_requests`; quan hệ request-document dùng `attachments` hoặc một bảng link rõ ràng nếu metadata review cần riêng. `military_access_audit` hợp nhất vào `audit_events`.

**Admin payment:** `entitlement_plans`, `entitlement_plan_prices`, `entitlement_subscriptions`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications`; dùng `role_grants/role_grant_history` cho hiệu lực và quyết định cấp quyền, không tạo `entitlement_audit` song song.

**Learning MVP:** `courses`, `lessons`, `learning_progress`, sau khi map/migrate schema legacy có phê duyệt. Mọi endpoint learning vẫn miễn phí và không dựa vào subscription quản trị.

Các nhóm báo cáo, Dân Cư Số, curriculum/AI đầy đủ, thi/điểm danh, marketplace/social/news và biểu mẫu nghiệp vụ khác giữ ngoài migration nền cho tới khi có quyết định phạm vi riêng; canonical inventory chi tiết nằm trong kế hoạch Giai đoạn 1.

## 8. Quyết định còn thiếu cần chủ dự án phê duyệt

### Cổng dữ liệu và migration

1. Chỉ định D1 local/test/staging/production và người được phép đọc metadata/schema remote; xác nhận database ID/name trong config có đúng môi trường không.
2. Cấp quyền inventory chỉ-đọc cho migration history, schema, tables/indexes/FK, số lượng dữ liệu; không chạy migration hay sửa DB trong bước inventory.
3. Xác nhận có Supabase/D1 production data thật không, account nào cần chuyển, mapping ID/email và chính sách xử lý trùng/không xác minh; giữ Supabase cho tới khi migration được phê duyệt.
4. Chọn migration framework, backup/restore ownership, thời gian lưu bản backup, quy trình test restore, forward/rollback và change approval.
5. Duyệt canonical table names và semantics để giải quyết aliases; chọn tên/quan hệ duy nhất cho `class_memberships` vs `student_memberships`, military document relation, account email identity và payment ledger.

### Account, role, scope và bảo mật

6. Xác nhận danh sách seed role tối thiểu, ma trận permission đầy đủ, Field Admin được cấp nhiều field thế nào, scope tree/quan hệ nào hợp lệ và ai có quyền audit/export.
7. Chốt quy trình bootstrap root owner account ID, bằng chứng xác minh ngoài email, MFA, backup/recovery/break-glass trong yêu cầu một Super Admin tối cao; định nghĩa xử lý nếu mất account.
8. Chốt auth provider hay tự quản password/session; thuật toán hash tương thích Workers; email provider; MFA factor; idle/absolute timeout, giới hạn session, reset/lock/revoke và retention.
9. Xác nhận điều kiện account/membership ở sáu lĩnh vực ngoài Lực lượng vũ trang, nội dung mở, quyền progress không đăng nhập và chính sách trẻ em; thống nhất với các `open` flags hiện có.

### Lực lượng vũ trang, R2, Pi và retention

10. Chốt nguồn/cơ quan xác minh, thông tin/tài liệu tối thiểu, đơn vị xác nhận và vai trò có thẩm quyền approve. README nói một người đủ thẩm quyền chấp thuận là đủ; thiết kế khác để mở cơ chế hai cấp. Chốt bổ sung, từ chối, khiếu nại, đình chỉ/thu hồi.
11. Phê duyệt liệu có được phép lưu hồ sơ/tài liệu xác minh hay không, R2 region/account, key/permissions, loại file, giới hạn, malware scanning, retention, xóa và backup. Không dùng dữ liệu quân sự thật trước phê duyệt.
12. Chốt R2 access pattern (Worker proxy hay URL ký ngắn hạn), cache headers, URL expiry và xử lý upload/download/xóa; hiện Wrangler chưa khai báo R2 binding.
13. Chốt tích hợp Pi chính thức/test environment, receiver/network, finality, idempotency, lỗi/thiếu/thừa tiền, paid nhưng bị từ chối, refund/khiếu nại, ngày bắt đầu và quy tắc cộng nối.
14. Xác nhận giá gói/version và quyền thay giá; đặc tả root exemption chỉ áp dụng root owner account, vĩnh viễn, không áp dụng cho tài khoản admin khác.
15. Phê duyệt retention cho auth/security/audit/payment/attachments/progress và quy trình xóa/ẩn danh/legal hold; xác định incident response và key rotation.

## 9. Cổng nghiệm thu trước khi coi Giai đoạn 1 sẵn sàng

- Inventory D1 đã được xác nhận ở môi trường cụ thể; có backup restore-test pass và bảng đối chiếu alias/canonical; không tạo migration trùng.
- Tất cả API và file access đều xác thực session và kiểm tra permission/scope/membership phía server; test payload giả mạo `account_id`, role, field, status, amount và object key đều không vượt quyền.
- Kiểm thử account nhiều membership/role, scope chéo, hết hạn/thu hồi session/grant, quyền view vs edit/approve/export và deny-by-default.
- Root owner duy nhất được miễn phí quản trị vĩnh viễn sau bootstrap/MFA; các account quản trị khác yêu cầu paid Pi đã xác minh + Super Admin approval + active scoped grant; payment không tự cấp quyền.
- Mọi chức năng học tập được truy cập miễn phí; expiry admin không ảnh hưởng progress; Lực lượng vũ trang bị chặn tất cả API/metadata/object cho tới khi approved.
- R2 riêng tư, kiểm quyền từng upload/download, không có URL công khai, metadata không lộ PII; retention/xóa và audit đã test bằng dữ liệu tổng hợp.
- Migration đã test upgrade/rollback/restore trên non-production sau phê duyệt; không có lỗi bảo mật Critical/High còn mở; production go-live có change approval riêng.

## 10. Phạm vi thao tác trong lần rà soát

Chỉ đọc file mã nguồn/cấu hình/tài liệu và liệt kê file migration/config có trong workspace. Không sửa mã nguồn hoặc cấu hình; không chạy SQL, Wrangler, migration hoặc API; không mở/truy vấn SQLite local; không kết nối/ghi production, D1 remote, Supabase remote, R2 hay Pi; không xóa Supabase; không commit/push Git. Tệp state `.wrangler` không được coi là production data hay schema evidence.
