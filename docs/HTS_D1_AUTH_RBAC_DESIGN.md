# Thiết kế tài khoản, xác thực và RBAC cho Cloudflare D1

**Ngày thiết kế:** 26/11/2026
**Kiến trúc chuẩn:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md)
**Cơ sở yêu cầu:** `README_HTS_v5.0.md`; `docs/BAO_CAO_RA_SOAT_SUPABASE_D1.md` là báo cáo lịch sử, không phải kiến trúc runtime.
**Cơ sở dữ liệu mục tiêu:** Cloudflare D1 duy nhất
**Trạng thái:** Tài liệu thiết kế, chưa lập trình hoặc tạo migration

**Quyết định kiến trúc (26/11/2026):** Đây là thiết kế xác thực/RBAC mục tiêu trên Cloudflare Workers + D1 duy nhất. Không dùng Supabase Auth/database làm fallback hoặc chạy song song. Các tham chiếu Supabase dưới đây chỉ mô tả dữ liệu lịch sử chưa xác minh; không kết nối, xóa hoặc chuyển dữ liệu bên ngoài trong các giai đoạn hiện tại.

**Chính sách quyền có phí và miễn phí:** Học tập không phụ thuộc gói quản trị; luồng gói Pi và cấp quyền được mô tả tại `docs/HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md`.

## 1. Tóm tắt kiến trúc

HTS phân biệt ba khái niệm:

1. **Account**: định danh người dùng duy nhất, đăng nhập bằng email và mật khẩu.
2. **Role và permission**: role nền tảng hoặc nghiệp vụ cùng quyền chi tiết.
3. **Membership và assignment**: tư cách trong lĩnh vực, trường, lớp, nhóm hoặc đơn vị.

Một người chỉ có một account. Một email chỉ được ánh xạ tới tối đa một account. Một account có thể:

- là learner trong nhiều lĩnh vực;
- là `field_admin` trong các lĩnh vực/phạm vi được cấp;
- là `super_admin`;
- là `teacher` khi được xác minh và phân công;
- là `group_leader` sau phê duyệt;
- thuộc nhiều trường/lớp/nhóm/đơn vị.

Không gộp role, scope và membership thành một cột `role` trong bảng hồ sơ.

## 2. Nguyên tắc tài khoản

### 2.1. Định danh email

- Email được chuẩn hóa: lowercase và trim ở máy chủ.
- `accounts.email_normalized` phải UNIQUE.
- Không cho đăng ký mới nếu email đã tồn tại ở trạng thái active, locked, suspended hoặc pending.
- Nếu tài khoản đã được xác minh email trước đó, không tạo account thứ hai.
- Trùng email từ dữ liệu cũ phải được đưa vào hàng đợi reconcile, không tự merge dữ liệu.
- Một account không được tạo bằng browser payload; account_id lấy từ phiên server-side đã xác thực.

### 2.2. Họ tên và hồ sơ

Hồ sơ cá nhân tách khỏi tài khoản xác thực:

- `account_id`
- họ tên hiển thị
- số điện thoại đã xác minh, nếu có
- avatar/file reference
- trạng thái account
- thời gian tạo/cập nhật

Thông tin nhạy cảm, CCCD, dữ liệu sinh trắc học hoặc dữ liệu quân sự không lưu trong bảng account trừ khi quy trình pháp lý, thẩm quyền và schema riêng được phê duyệt.

### 2.3. Account chính của chủ dự án

Email `tranvandinh1281984@gmail.com` là thông tin định danh Super Admin khởi tạo của chủ dự án. Đề xuất xử lý:

- account khởi tạo do quy trình bảo mật, không tự động tạo bằng đăng ký công khai;
- chỉ cấp `super_admin` qua bootstrapping một lần;
- không cho đăng ký công khai chọn Super Admin;
- ghi chi tiết bootstrap vào audit log;
- MFA bắt buộc;
- có quy trình khôi phục ngoài luồng người dùng thông thường;
- không lưu mật khẩu dạng plaintext hoặc secret recovery key trong D1 nếu có cơ chế Workers phù hợp hơn.

## 3. Xác thực và quản lý phiên

### 3.1. Đăng ký

Luồng đề xuất:

1. Người dùng nhập email và mật khẩu.
2. Worker chuẩn hóa email.
3. Worker kiểm tra account trùng.
4. Worker tạo account ở trạng thái `pending_verification`.
5. Worker tạo credential hash ở lớp xác thực được phê duyệt.
6. Worker gửi mã hoặc liên kết xác minh email có thời hạn và dùng một lần.
7. Sau xác minh, account chuyển `active`.
8. Mặc định tạo role `learner` nhưng không tự cấp role quản trị hoặc tư cách thành viên.

Không tự cấp `super_admin`, `field_admin`, `teacher`, `group_leader` hoặc membership chỉ dựa trên đăng ký.

### 3.2. Đăng nhập

Luồng đề xuất:

1. Worker chuẩn hóa email.
2. Worker lấy account theo email.
3. Worker kiểm tra status account.
4. Worker xác minh mật khẩu bằng credential verifier.
5. Worker tạo session ngẫu nhiên hoặc opaque session ID.
6. Worker lưu session trong bảng D1 hoặc cơ chế session được phê duyệt.
7. Worker đặt cookie HTTP-only, Secure, SameSite.
8. Worker ghi login success/failure ở audit log.

Không lưu mật khẩu plaintext trong D1.

Không tin cookie hoặc browser state nếu chưa đối chiếu với session server-side.

### 3.3. Quản lý session

Mỗi session lưu:

- session ID có digest, không lưu secret dạng rõ;
- account ID;
- IP hoặc fingerprint/metadata không nhạy cảm;
- user agent digest;
- thời gian tạo;
- thời gian hết hạn;
- thời gian hoạt động gần nhất;
- trạng thái active/revoked;
- lý do revoke;
- MFA đã xác minh, nếu có.

Chính sách đề xuất:

- idle timeout được chủ dự án phê duyệt;
- absolute timeout;
- rotation sau đăng nhập và đổi mật khẩu;
- revoke toàn bộ session sau reset password;
- revoke session cấp cao khi grant Super Admin thay đổi;
- MFA theo yêu cầu cho Super Admin và tài khoản quản trị nhạy cảm.

### 3.4. Đăng xuất

- revoke session hiện tại;
- ghi audit log;
- xóa cookie phiên;
- không chỉ redirect ở giao diện.

### 3.5. Đổi mật khẩu

Luồng:

1. Người dùng xác minh phiên hiện tại hoặc MFA nếu policy yêu cầu.
2. Worker xác minh mật khẩu hiện tại.
3. Worker kiểm tra mật khẩu mới theo policy.
4. Worker tạo credential mới.
5. Worker revoke các session cũ.
6. Worker yêu cầu đăng nhập lại.
7. Worker ghi audit event.

### 3.6. Quên và khôi phục mật khẩu

- Tạo reset token ngẫu nhiên hoặc ký liên kết dùng một lần.
- Chỉ lưu digest token trong D1.
- Token có thời hạn ngắn.
- Không tiết lộ email có tồn tại hay không.
- Reset thành công revoke token và mọi session.
- Ghi audit event, không ghi mật khẩu cũ/mới.

### 3.7. Khôi phục tài khoản Super Admin

Không tự thêm Super Admin qua UI hoặc SQL public. Phương án đề xuất:

- tối thiểu hai kênh xác minh do chủ dự án phê duyệt;
- recovery code một lần, có hạn và lưu hash;
- xác minh danh tính ngoài luồng bình thường;
- tài khoản Super Admin dự phòng bị tắt hoặc tạm khóa theo policy;
- MFA recovery chỉ do quy trình đã phê duyệt;
- mọi quyết định khôi phục ghi actor, thời gian, căn cứ và lý do;
- không chấp nhận email/social-only làm bằng chứng duy nhất.

## 4. Mô hình role, permission và scope

### 4.1. Tách role nền và role nghiệp vụ

Role nền:

- `learner`
- `field_admin`
- `super_admin`

Role nghiệp vụ:

- `teacher`
- `group_leader`
- `school_leadership`
- `education_sector_admin`
- `internal_viewer`
- `internal_editor`
- `internal_manager`
- `security_auditor`
- `internal_super_admin`

Không bắt buộc role nghiệp vụ được suy ra từ role nền.

### 4.2. Permission chi tiết

Permission đề xuất theo hành động:

- `account.view`
- `account.update`
- `account.lock`
- `account.unlock`
- `role.grant`
- `role.revoke`
- `role.renew`
- `learning_field.join`
- `learning_field.manage`
- `school.manage`
- `class.manage`
- `subject.manage`
- `teaching.assign`
- `exam.create`
- `exam.manage`
- `exam.grade.propose`
- `exam.grade.review`
- `exam.grade.confirm`
- `exam.grade.approve`
- `report.create`
- `report.submit`
- `report.review`
- `report.approve`
- `report.export`
- `audit.read`
- `audit.export`
- `member.view`
- `member.approve`
- `member.manage`
- `group.manage`
- `group_leader.propose`
- `group_leader.approve`

Không mặc định permission grant bao gồm sửa, duyệt, xóa và xuất.

### 4.3. Scope

Scope đề xuất:

- `platform`
- `learning_field`
- `education_sector`
- `education_unit`
- `school`
- `campus`
- `academic_year`
- `grade`
- `class`
- `subject`
- `unit`
- `group`
- `civic_village`

Quan hệ scope được lưu dữ liệu xác minh trong `scope_relations`; không suy ra quyền cha-con chỉ bằng tên hoặc type.

### 4.4. Quyền học tập, quyền quản trị và quyền truy cập đặc biệt

- **Quyền học tập:** miễn phí trong cả bảy lĩnh vực, gồm bài giảng/học liệu được phép, bài tập/kiểm tra/nộp bài, trợ lý AI giảng dạy theo chính sách nền tảng, lớp/nhóm, kết quả và tiến độ. Không yêu cầu entitlement hoặc gói quản trị để học.
- **Quyền quản trị:** là role/permission grant riêng, gắn account, role, lĩnh vực/scope, trạng thái và thời hạn. Mọi tài khoản quản trị khác ngoài tài khoản Super Admin tối cao đã xác minh của chủ dự án cần gói thời hạn Pi. Giao dịch Pi đã xác minh chỉ cho phép gửi yêu cầu xét duyệt; không tự tạo grant hoặc kích hoạt quyền.
- Tài khoản Super Admin tối cao được miễn phí quản trị vĩnh viễn; ngoại lệ được ràng buộc với đúng account đã bootstrap/xác minh, không chỉ role name, email do client gửi hoặc cờ tự khai.
- **Quyền truy cập đặc biệt:** membership hoặc nội dung có thể cần xác minh/phê duyệt trước khi truy cập (ví dụ Lực lượng vũ trang). Đây là điều kiện tư cách/phạm vi, không phải phí học tập và không được suy ra từ việc mua gói quản trị.
- Khi quyền quản trị hết hạn, bị tạm khóa hoặc thu hồi, chỉ thao tác quản trị bị chặn; learner membership, dữ liệu và quyền học tập hợp lệ được giữ độc lập.

## 5. Bảng D1 đề xuất

### 5.1. Tài khoản và xác thực

#### `accounts`

- `id TEXT PRIMARY KEY`
- `email_normalized TEXT NOT NULL UNIQUE`
- `display_name TEXT`
- `status TEXT NOT NULL`
- `email_verified_at TEXT`
- `mfa_required INTEGER NOT NULL DEFAULT 0`
- `mfa_verified_at TEXT`
- `locked_at TEXT`
- `locked_reason TEXT`
- `created_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`

CHECK status: `pending_verification`, `active`, `locked`, `suspended`, `disabled`, `pending_recovery`.

#### `account_identity_links`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `identity_type TEXT NOT NULL`
- `identity_value_normalized TEXT NOT NULL`
- `verified_at TEXT`
- `created_at TEXT NOT NULL`
- UNIQUE `(identity_type, identity_value_normalized)`
- FK tới `accounts(id) ON DELETE RESTRICT`

Phase đầu HTS dùng identity `email`.

#### `auth_credentials`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL UNIQUE`
- `password_hash TEXT NOT NULL`
- `password_algorithm TEXT NOT NULL`
- `password_updated_at TEXT NOT NULL`
- `credential_version INTEGER NOT NULL DEFAULT 1`
- `created_at TEXT NOT NULL`
- FK tới `accounts(id) ON DELETE CASCADE`

Không lưu mật khẩu dạng plaintext.

#### `auth_sessions`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `session_digest TEXT NOT NULL UNIQUE`
- `device_fingerprint_hash TEXT`
- `ip_hash TEXT`
- `mfa_verified INTEGER NOT NULL DEFAULT 0`
- `status TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `expires_at TEXT NOT NULL`
- `last_seen_at TEXT`
- `revoked_at TEXT`
- `revoked_reason TEXT`
- FK tới `accounts(id) ON DELETE CASCADE`

#### `password_reset_tokens`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `token_digest TEXT NOT NULL UNIQUE`
- `status TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `expires_at TEXT NOT NULL`
- `used_at TEXT`
- FK tới `accounts(id) ON DELETE CASCADE`

#### `email_verifications`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `token_digest TEXT NOT NULL UNIQUE`
- `email_normalized TEXT NOT NULL`
- `status TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `expires_at TEXT NOT NULL`
- `verified_at TEXT`
- FK tới `accounts(id) ON DELETE CASCADE`

#### `account_recovery_requests`

- `id TEXT PRIMARY KEY`
- `account_id TEXT`
- `requester_email_normalized TEXT NOT NULL`
- `status TEXT NOT NULL`
- `verification_method TEXT`
- `requested_at TEXT NOT NULL`
- `reviewed_by TEXT`
- `reviewed_at TEXT`
- `resolution TEXT`
- `reason TEXT`

### 5.2. Hồ sơ và memberships

#### `user_profiles`

- `account_id TEXT PRIMARY KEY`
- `display_name TEXT`
- `phone TEXT`
- `avatar_reference TEXT`
- `privacy_settings TEXT`
- `created_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`
- FK tới `accounts(id) ON DELETE CASCADE`

#### `learning_field_memberships`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `field_id TEXT NOT NULL`
- `status TEXT NOT NULL`
- `joined_at TEXT`
- `approved_by TEXT`
- `approved_at TEXT`
- `left_at TEXT`
- UNIQUE `(account_id, field_id)`
- FK tới `accounts(id) ON DELETE CASCADE`

Status: `pending`, `active`, `suspended`, `rejected`, `revoked`, `completed`.

#### `school_memberships`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `school_id TEXT NOT NULL`
- `campus_id TEXT`
- `academic_year_id TEXT`
- `status TEXT NOT NULL`
- `verified_at TEXT`
- `verified_by TEXT`
- `started_at TEXT`
- `ended_at TEXT`
- UNIQUE `(account_id, school_id, campus_id, academic_year_id)`

#### `class_memberships`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `class_id TEXT NOT NULL`
- `member_type TEXT NOT NULL`
- `status TEXT NOT NULL`
- `academic_year_id TEXT NOT NULL`
- `approved_by TEXT`
- `approved_at TEXT`
- `started_at TEXT`
- `ended_at TEXT`
- UNIQUE `(account_id, class_id, academic_year_id, member_type)`

`member_type`: `student`, `teacher`, `group_leader`, `observer`, `temporary_member`.

#### `group_memberships`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `group_id TEXT NOT NULL`
- `member_type TEXT NOT NULL`
- `status TEXT NOT NULL`
- `approved_by TEXT`
- `approved_at TEXT`
- `started_at TEXT`
- `ended_at TEXT`
- UNIQUE `(account_id, group_id, member_type)`

#### `unit_memberships`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `unit_id TEXT NOT NULL`
- `status TEXT NOT NULL`
- `verified_by TEXT`
- `verified_at TEXT`
- `started_at TEXT`
- `ended_at TEXT`
- UNIQUE `(account_id, unit_id)`

### 5.3. Role và permission

#### `roles`

- `id TEXT PRIMARY KEY`
- `code TEXT NOT NULL UNIQUE`
- `name TEXT NOT NULL`
- `role_type TEXT NOT NULL`
- `is_platform_role INTEGER NOT NULL DEFAULT 0`
- `is_active INTEGER NOT NULL DEFAULT 1`

Role type: `platform`, `education`, `group`, `unit`, `internal`, `civic`.

#### `permissions`

- `id TEXT PRIMARY KEY`
- `code TEXT NOT NULL UNIQUE`
- `description TEXT NOT NULL`
- `is_sensitive INTEGER NOT NULL DEFAULT 0`

#### `role_permissions`

- `role_id TEXT NOT NULL`
- `permission_id TEXT NOT NULL`
- PRIMARY KEY `(role_id, permission_id)`

#### `role_grants`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `role_id TEXT NOT NULL`
- `scope_type TEXT NOT NULL`
- `scope_id TEXT NOT NULL`
- `status TEXT NOT NULL`
- `starts_at TEXT NOT NULL`
- `ends_at TEXT`
- `granted_by TEXT NOT NULL`
- `granted_at TEXT NOT NULL`
- `reason TEXT`
- `revoked_at TEXT`
- `revoked_by TEXT`
- `revoked_reason TEXT`
- UNIQUE `(account_id, role_id, scope_type, scope_id)`

Status: `pending`, `active`, `suspended`, `expired`, `revoked`, `rejected`.

Không cho grant `super_admin` ở scope field-only. Grant Super Admin phải scope `platform`.

#### `permission_grants`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `permission_id TEXT NOT NULL`
- `scope_type TEXT NOT NULL`
- `scope_id TEXT NOT NULL`
- `status TEXT NOT NULL`
- `starts_at TEXT NOT NULL`
- `ends_at TEXT`
- `granted_by TEXT NOT NULL`
- `granted_at TEXT NOT NULL`
- `reason TEXT`

Dùng cho permission bổ sung hoặc loại trừ role. Không cho browser tự gửi.

#### `role_grant_history`

- `id TEXT PRIMARY KEY`
- `role_grant_id TEXT NOT NULL`
- `account_id TEXT NOT NULL`
- `role_id TEXT NOT NULL`
- `scope_type TEXT NOT NULL`
- `scope_id TEXT NOT NULL`
- `action TEXT NOT NULL`
- `actor_account_id TEXT NOT NULL`
- `occurred_at TEXT NOT NULL`
- `old_status TEXT`
- `new_status TEXT`
- `old_ends_at TEXT`
- `new_ends_at TEXT`
- `reason TEXT`

Không cho sửa hoặc xóa bản ghi lịch sử.

#### `admin_requests`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `requested_role TEXT NOT NULL`
- `requested_scope_type TEXT NOT NULL`
- `requested_scope_id TEXT NOT NULL`
- `reason TEXT NOT NULL`
- `status TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `reviewed_by TEXT`
- `reviewed_at TEXT`
- `review_note TEXT`

Status: `pending`, `approved`, `rejected`, `needs_revision`, `revoked`.

#### `admin_request_reviews`

- `id TEXT PRIMARY KEY`
- `request_id TEXT`
- `reviewer_account_id TEXT NOT NULL`
- `decision TEXT NOT NULL`
- `reason TEXT`
- `occurred_at TEXT NOT NULL`

### 5.4. Scope và assignment nghiệp vụ

#### `organization_scopes`

- `id TEXT PRIMARY KEY`
- `scope_type TEXT NOT NULL`
- `parent_id TEXT`
- `external_code TEXT`
- `name TEXT NOT NULL`
- `status TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`

#### `scope_relations`

- `id TEXT PRIMARY KEY`
- `parent_scope_id TEXT NOT NULL`
- `child_scope_id TEXT NOT NULL`
- `relation_type TEXT NOT NULL`
- `status TEXT NOT NULL`
- `started_at TEXT`
- `ended_at TEXT`
- UNIQUE `(parent_scope_id, child_scope_id, relation_type)`

#### `teacher_assignments`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `school_id TEXT NOT NULL`
- `campus_id TEXT`
- `academic_year_id TEXT NOT NULL`
- `class_id TEXT`
- `subject_id TEXT`
- `status TEXT NOT NULL`
- `assigned_by TEXT NOT NULL`
- `assigned_at TEXT NOT NULL`
- `approved_by TEXT`
- `approved_at TEXT`
- `started_at TEXT`
- `ended_at TEXT`

Không cấp role `teacher` vì có account trong dòng tham gia; role grant/assignment phải được xác minh riêng.

#### `group_leader_assignments`

- `id TEXT PRIMARY KEY`
- `account_id TEXT NOT NULL`
- `group_id TEXT NOT NULL`
- `role_type TEXT NOT NULL`
- `status TEXT NOT NULL`
- `assigned_by TEXT NOT NULL`
- `approved_by TEXT`
- `approved_at TEXT`
- `started_at TEXT`
- `ended_at TEXT`

Role type: `leader`, `deputy`, `support`.

Chỉ khi assignment được approve mới tạo role grant `group_leader` có scope `group`.

#### `group_leader_proposals`

- `id TEXT PRIMARY KEY`
- `group_id TEXT NOT NULL`
- `candidate_account_id TEXT NOT NULL`
- `proposal_type TEXT NOT NULL`
- `basis TEXT`
- `missing_evidence TEXT`
- `status TEXT NOT NULL`
- `proposed_by TEXT`
- `proposed_at TEXT NOT NULL`
- `reviewed_by TEXT`
- `reviewed_at TEXT`
- `decision_reason TEXT`

Proposal không cấp quyền.

### 5.5. Nhật ký

#### `audit_events`

- `id TEXT PRIMARY KEY`
- `actor_account_id TEXT`
- `action TEXT NOT NULL`
- `entity_type TEXT NOT NULL`
- `entity_id TEXT`
- `scope_type TEXT`
- `scope_id TEXT`
- `outcome TEXT NOT NULL`
- `occurred_at TEXT NOT NULL`
- `reason TEXT`
- `request_id TEXT`
- `metadata_json TEXT`

Không ghi mật khẩu, token, passphrase, dữ liệu định danh nhạy cảm hoặc nội dung bí mật trong metadata.

#### `security_events`

- `id TEXT PRIMARY KEY`
- `account_id TEXT`
- `event_type TEXT NOT NULL`
- `outcome TEXT NOT NULL`
- `occurred_at TEXT NOT NULL`
- `session_id TEXT`
- `ip_hash TEXT`
- `device_hash TEXT`
- `details TEXT`

Security event ghi login failed, MFA challenge, lockout, session revoked và recovery.

## 6. Chỉ mục đề xuất

Tất cả migration tương lai phải tạo index khi schema đã chốt:

- `idx_accounts_email_normalized`
- `idx_accounts_status`
- `idx_auth_sessions_account_status`
- `idx_auth_sessions_expires_at`
- `idx_password_reset_account_status`
- `idx_email_verifications_account_status`
- `idx_role_grants_account_status`
- `idx_role_grants_role_scope_status`
- `idx_role_grants_scope_status`
- `idx_role_grants_ends_at`
- `idx_role_grant_history_grant_occurred`
- `idx_permission_grants_account_permission_scope`
- `idx_learning_field_memberships_account_status`
- `idx_class_memberships_account_class_status`
- `idx_group_memberships_account_group_status`
- `idx_teacher_assignments_account_status`
- `idx_teacher_assignments_school_academic_year`
- `idx_group_leader_assignments_account_status`
- `idx_scope_relations_parent`
- `idx_scope_relations_child`
- `idx_admin_requests_status_created`
- `idx_audit_events_actor_occurred`
- `idx_audit_events_scope_occurred`
- `idx_security_events_account_occurred`

### Quy tắc foreign key

- Soft delete cho account, role grant và membership quan trọng.
- Cascade chỉ dùng cho dữ liệu phiên hoặc credential phụ thuộc trực tiếp.
- Restrict cho hồ sơ, grant, lịch sử, unit và dữ liệu đã được phê duyệt.
- Không xóa cứng audit, role history hoặc membership history.
- Không cho browser đưa account_id, role_id, scope_id hoặc status.

## 7. Quy trình hoạt động của từng loại quyền

### 7.1. Learner

1. Người dùng đăng ký tài khoản và xác minh email.
2. Người dùng chọn lĩnh vực đăng ký.
3. Worker kiểm tra field open hoặc quy trình yêu cầu.
4. Tạo `learning_field_memberships` với status phù hợp.
5. Tạo/lấy role grant `learner` theo scope field.
6. Người dùng truy cập hoạt động học tập miễn phí và progress trong scope đã xác minh; không cần mua gói quản trị.

Công dân và Công nhân là nội dung mở; quyền cá nhân hóa vẫn có thể yêu cầu account. Lĩnh vực/khu vực đặc biệt có thể yêu cầu membership được xác minh và phê duyệt trước khi truy cập, nhưng không thu phí học tập.

### 7.2. Super Admin

1. Role grant `super_admin` scope `platform` chỉ được bootstrap hoặc cấp theo quy trình khôi phục bảo mật.
2. Super Admin xem/xử lý yêu cầu quản trị.
3. Super Admin cấp hoặc thu hồi `field_admin`, role nghiệp vụ hoặc permission với lý do.
4. Role không tự động tạo teacher/group_leader/membership.
5. Mọi grant Super Admin và thay đổi grant nhạy cảm ghi audit.
6. Super Admin có thể quản trị toàn nền tảng nhưng không thay quyền chuyên môn đã giao trừ trường hợp có quyền nghiệp vụ riêng.
7. Tài khoản Super Admin tối cao đã được xác minh của chủ dự án là ngoại lệ duy nhất được miễn phí quản trị vĩnh viễn; tất cả account quản trị khác phải có gói Pi và thời hạn còn hiệu lực.

### 7.3. Field Admin

1. Người dùng gửi `admin_requests`.
2. Worker xác minh account và lĩnh vực đã tham gia.
3. Nếu có gói trả phí, người dùng chọn gói và thanh toán Pi; Worker xác minh giao dịch và ghi nhận trạng thái đã thanh toán/chờ duyệt riêng với role grant.
4. Super Admin xem xét scope, permission, yêu cầu quản trị và trạng thái thanh toán; thanh toán thành công không buộc Super Admin phải cấp quyền.
5. Chỉ khi Super Admin phê duyệt mới tạo `role_grants` field_admin đúng scope. Grant có starts_at, ends_at và status; đề xuất bắt đầu tính hạn khi grant kích hoạt, theo chính sách phải được chốt trước khi triển khai.
6. Hết hạn hoặc bị revoke thì Worker từ chối thao tác quản trị mới ngay lập tức.
7. Field Admin không được cấp thêm role cho chính mình hoặc user khác; quyền learner và tiến độ học tập vẫn giữ nguyên.

Các gói, trạng thái thanh toán, đối soát Pi, xử lý gia hạn và audit được thiết kế riêng; tên bảng và migration chỉ được chốt sau kiểm kê schema hiện hữu.

### 7.4. Teacher

1. Nhà trường hoặc người có thẩm quyền gửi assignment.
2. Worker xác minh account, trường, năm học, khối/lớp/môn.
3. Người có thẩm quyền phê duyệt assignment.
4. Tạo `teacher_assignments`.
5. Tạo role grant `teacher` hoặc permission grant theo scope class/subject.
6. Không tự động cấp quyền dựa trên tên, chức vụ hoặc role Super Admin.

Nếu account vừa là học sinh và giáo viên, hai membership/role được giữ riêng.

### 7.5. Group Leader

1. Hệ thống có thể tạo `group_leader_proposals`.
2. Proposal nêu căn cứ và dữ liệu thiếu.
3. Người có thẩm quyền rà soát.
4. Phê duyệt tạo `group_leader_assignments`.
5. Sau đó tạo role grant `group_leader` scope group.
6. Không chuyển role leader cũ thành deputy nếu không có quyết định phê duyệt rõ.

### 7.6. Student/Member trong lớp, trường hoặc đơn vị

1. Người dùng gửi đăng ký hoặc được hồ sơ/danh sách xác minh đề xuất.
2. Người có thẩm quyền xác nhận membership.
3. Tạo/lưu membership theo academic year.
4. Khi kết thúc năm học, membership được kết thúc hoặc lưu trữ.
5. Không tự gán user vào lớp bằng field_id hoặc tên gần giống.

## 8. Quy tắc kiểm tra quyền server-side

Mọi API thực hiện chuỗi kiểm tra sau:

1. Đọc account từ session hợp lệ.
2. Kiểm tra account status.
3. Kiểm tra MFA nếu policy yêu cầu.
4. Lấy role_grants đang active.
5. Kiểm tra thời hạn và scope target.
6. Kiểm tra permission cụ thể.
7. Kiểm tra quan hệ scope trong `scope_relations`.
8. Kiểm tra membership trong đúng năm học hoặc đơn vị.
9. Từ chối mặc định khi thiếu dữ liệu.
10. Ghi audit cho thao tác nhạy cảm.

Ví dụ:

- Super Admin: chỉ kết luận platform permission do grant Super Admin.
- Field Admin: phải có permission + field/scope đang active.
- Teacher: phải có assignment hiện hiệu lực + role/permission class/subject.
- Group leader: phải có assignment và role grant group đang active.
- Learner: phải có field membership và membership group/class nếu chức năng yêu cầu.

## 9. Luồng cấp vai trò

### 9.1. Field Admin

- Bước 1: learner gửi yêu cầu.
- Bước 2: Worker tạo admin request pending.
- Bước 3: Super Admin kiểm tra account và scope.
- Bước 4: cấp hoặc từ chối.
- Bước 5: tạo grant và grant history.
- Bước 6: worker thông báo kết quả.

### 9.2. Teacher

- Bước 1: xác minh danh tính hoặc danh sách đơn vị.
- Bước 2: assignment.
- Bước 3: phê duyệt chuyên môn.
- Bước 4: tạo role/permission grant scoped.
- Bước 5: ghi assignment history và audit.

### 9.3. Group Leader

- Bước 1: đề xuất.
- Bước 2: hiển thị căn cứ và dữ liệu thiếu.
- Bước 3: Field Admin/Super Admin người có quyền phê duyệt quyết định.
- Bước 4: tạo assignment.
- Bước 5: tạo grant role scoped.

Không tự động cấp role.

## 10. Rủi ro bảo mật

1. Bỏ qua server check chỉ dựa trên UI role.
2. Gửi role, scope, user_id hoặc status duyệt từ client.
3. Tạo Super Admin tự động hoặc cấp qua shell/migration không kiểm soát.
4. Reuse email cũ hoặc account trùng.
5. Scope cha được cấp mà chưa xác minh quan hệ cha-con.
6. Permission grant mở rộng ngoài role cần thiết.
7. Session không rotate sau đăng nhập/đổi mật khẩu.
8. Reset password không revoke session.
9. Không có MFA cho Super Admin.
10. Không có recovery procedure cho tài khoản Super Admin.
11. Xóa grant history hoặc audit log.
12. Role grant hết hạn nhưng cache/UI vẫn hiển thị quyền.
13. Dùng role Super Admin để thay thế role giáo viên/trưởng nhóm.
14. Gắn membership sai năm học hoặc sai scope.
15. Ghi mật khẩu, token, passphrase, CCCD hoặc dữ liệu sinh trắc trong audit metadata.

## 11. Quy tắc migration và dữ liệu

Trước khi lập trình migration:

1. Thiết kế schema tài khoản D1 từ yêu cầu nghiệp vụ và inventory D1 được phê duyệt.
2. Xác định tài khoản/membership seed từ nguồn được chủ dự án phê duyệt; không mặc định lấy từ dữ liệu bên ngoài.
3. Nếu sau này có yêu cầu chuyển dữ liệu cũ, lập kế hoạch riêng về mapping, xác minh danh tính, trùng email và rollback trước khi truy xuất hoặc nhập dữ liệu.
4. Không merge dữ liệu mơ hồ.
5. Không cấp Super Admin từ dữ liệu role cũ nếu chưa xác minh.
6. Không ánh xạ role cũ sang `field_admin` nếu chưa có quyết định scope và xác minh.
7. Chuyển role `teacher` và membership thành assignment riêng chỉ khi có dữ liệu nguồn được phê duyệt.
8. Tạo membership learner theo lĩnh vực từ nguồn dữ liệu được xác minh.
9. Kiểm tra foreign key, UNIQUE email và UNIQUE account-field.
10. Chạy test migration với dữ liệu giả lập.
11. Sao lưu và có rollback/recovery.

Không chạy migration trong giai đoạn thiết kế này.

## 12. Danh sách kiểm thử bắt buộc trước vận hành

- cùng một account đăng nhập nhiều lĩnh vực;
- account vừa learner và teacher;
- account vừa Super Admin và learner;
- account vừa Field Admin và teacher;
- account vừa Group Leader và learner;
- account không Super Admin không thể grant Super Admin;
- hoạt động học tập vẫn được truy cập miễn phí khi account không có gói/entitlement quản trị;
- chỉ account Super Admin tối cao đã xác minh được miễn gói; account quản trị khác không thể tự đặt cờ miễn phí hoặc bỏ qua thanh toán;
- thanh toán Pi thành công nhưng chưa được Super Admin phê duyệt không tạo grant quản trị;
- grant quản trị hết hạn/thu hồi không xóa learner membership hoặc tiến độ học tập;
- lĩnh vực cần xác minh từ chối truy cập đến khi membership được phê duyệt, không yêu cầu mua gói quản trị;
- Field Admin không thể grant ngoài field;
- grant hết hạn bị chặn;
- grant revoked bị chặn;
- membership sai năm học bị chặn;
- scope con không kế thừa quyền cha khi quan hệ chưa xác minh;
- reset password revoke toàn bộ session;
- đổi mật khẩu revoke session cũ;
- email trùng không tạo account mới;
- Super Admin recovery được ghi nhật ký;
- audit không thể sửa/xóa bởi người dùng thường;
- cookie/session không thể giả mạo role.

## 13. Những nội dung cần chủ dự án phê duyệt

1. Xác nhận Email `tranvandinh1281984@gmail.com` là account Super Admin khởi tạo duy nhất.
2. Quy trình bootstrap và khóa khôi phục Super Admin.
3. Có MFA bắt buộc cho Super Admin và tài khoản Field Admin hay chỉ Super Admin.
4. Idle timeout và absolute timeout của session.
5. Chính sách hết hạn (vô hiệu hóa ngay hay trạng thái chờ gia hạn) và quy tắc cộng nối khi gia hạn.
6. Xử lý đơn đã thanh toán nhưng bị từ chối, sai/thiếu/thừa giao dịch và hoàn tiền nếu có.
7. Chính sách credential/password và recovery cho hệ thống xác thực Cloudflare tự xây dựng.
8. Chính sách reset password và recovery account.
9. Vai trò `school_leadership`, `education_sector_admin` có tham gia nền hay chỉ role nghiệp vụ.
10. Ma trận permission cho teacher và group leader.
11. Quy tắc tạo và phê duyệt member trong trường/lớp/đơn vị.
12. Quy tắc archive membership khi kết thúc năm học.
13. Quy tắc xử lý email trùng trong dữ liệu nguồn được chủ dự án phê duyệt.
14. Policy giữ/lưu/xóa password reset và session.
15. Phương án backup/restore D1, rotation key và incident response.

## 14. Trình tự triển khai đề xuất

1. Chốt schema account/identity/session.
2. Chốt role và permission core.
3. Chốt scope relation.
4. Tạo migration D1 account/auth nền.
5. Tạo migration membership và role grant.
6. Thiết kế API đăng ký/xác minh đăng nhập/đăng xuất.
7. Thiết kế API reset password/recovery.
8. Thiết kế API grant/revoke/renew Field Admin.
9. Tạo guard server-side dùng account/session/role/grant/scope.
10. Xây dựng teacher và group_leader assignment.
11. Kiểm thử dữ liệu giả lập.
12. Chỉ sau phê duyệt mới áp dụng schema D1 và bật production; không kết nối Supabase làm hệ thống chạy song song.
