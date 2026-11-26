# Thiết kế Trung tâm Bài giảng AI và Kho Học liệu Giáo dục Việt Nam

**Ngày thiết kế:** 26/11/2026
**Kiến trúc chuẩn:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md)
**Tài liệu đối chiếu:**

- `README_HTS_v5.0.md`
- `docs/HTS_D1_AUTH_RBAC_DESIGN.md`

`BAO_CAO_RA_SOAT_SUPABASE_D1.md` là báo cáo lịch sử, không phải chỉ dẫn triển khai hiện hành.

**Cơ sở dữ liệu chính:** Cloudflare D1
**Trạng thái:** Tài liệu thiết kế, chưa triển khai mã nguồn hoặc migration

## 1. Mục tiêu

Trung tâm Bài giảng AI và Kho Học liệu Giáo dục Việt Nam là phân hệ phục vụ:

- chương trình Việt Nam từ lớp 1 đến lớp 12;
- sinh viên, công dân, công nhân và lực lượng vũ trang;
- bài giảng có nguồn trích dẫn;
- học liệu chính thức và học liệu được phép sử dụng;
- trợ lý AI cho học sinh, sinh viên và người học;
- cá nhân hóa theo lớp, môn, tiến độ và năng lực;
- giáo viên giao bài, theo dõi, rà soát và kiểm duyệt;
- AI hỗ trợ nhưng không thay quyền phê duyệt con người.

Phân hệ không mặc định tạo hoặc công bố nội dung chính thức. Nội dung AI chỉ là bản nháp hoặc đề xuất cho đến khi người có thẩm quyền kiểm duyệt.

## 2. Các thực thể nghiệp vụ chính

Sơ đồ quan hệ tổng quát:

```text
Account
  ├── Learning Field Membership
  ├── School/Unit Membership
  ├── Class Membership
  ├── Group Membership
  ├── Role Grant
  ├── Teacher Assignment
  └── Group Leader Assignment

Curriculum Framework
  ├── Education Stage
  ├── Grade
  ├── Academic Year
  ├── Subject
  ├── Topic
  └── Learning Standard

Learning Material
  ├── Source Reference
  ├── File/Object
  ├── Version
  ├── Extraction Result
  ├── Classification
  ├── Review Decision
  └── Publication State

Lesson
  ├── Lesson Version
  ├── Lesson Sections
  ├── Quiz/Exercise
  ├── Source/Citation
  ├── AI Generation Job
  ├── Teacher Review
  └── Publication Decision

Learner Progress
  ├── Lesson Attempt
  ├── Study Event
  ├── Score/Assessment
  ├── Mastery Level
  └── Learning Recommendation

AI Assistant
  ├── Session
  ├── Message
  ├── Retrieved Context
  ├── Grounding Citation
  ├── Safety Event
  └── Usage/Cost Ledger
```

### 2.1. Kho học liệu

Kho học liệu lưu:

- tài liệu chính thức;
- tài liệu được cấp phép;
- tài liệu tham khảo;
- bài giảng của giáo viên;
- học liệu do AI tạo ở trạng thái nháp;
- ảnh, PDF, DOCX, XLSX, CSV, audio và video trong phạm vi được phép.

Kho học liệu không lưu toàn bộ nội dung nhạy cảm trong D1. D1 lưu metadata, version, trạng thái, trích dẫn, owner và object reference. Tệp lưu ở Cloudflare R2 hoặc dịch vụ object storage đã được phê duyệt.

### 2.2. Chương trình giáo dục

Cấu trúc đề xuất:

```text
Education System
  → Curriculum Framework
  → Education Stage
  → Grade
  → Academic Year
  → Subject
  → Topic
  → Standard/Outcome
  → Lesson
```

Ví dụ miền dữ liệu:

- Education Stage: Tiểu học, THCS, THPT.
- Grade: 1 đến 12.
- Subject: môn được cấu hình theo chương trình.
- Curriculum Version: chương trình hiện hành, phiên bản mới và phiên bản lịch sử.
- Topic: chủ đề có thể thuộc nhiều môn hoặc nhiều cấp.

Không ghi đè phiên bản chương trình cũ khi thay đổi curriculum. Mỗi lesson phải trỏ tới curriculum version, môn, cấp, chủ đề và tiêu chuẩn học tập phù hợp.

## 3. Mối quan hệ cốt lõi

### 3.1. Kho học liệu — bài giảng

- Một học liệu có thể tạo nhiều bài giảng.
- Một bài giảng có thể lấy nguồn từ nhiều học liệu.
- Mỗi bài giảng lưu danh sách source/citation mà AI sử dụng.
- Mỗi học liệu có nhiều phiên bản.
- Bài giảng chỉ trỏ tới bản học liệu đã được duyệt tại thời điểm tạo.
- Khi source thay đổi, tạo mới/rebuild lesson; không ghi đè bài đã công bố.

### 3.2. Bài giảng — giáo viên

- Giáo viên phải có `teacher_assignment` đúng trường/lớp/môn/năm học.
- Giáo viên có thể tạo bản nháp, giao bài, xem kết quả và yêu cầu AI sửa bản nháp.
- Giáo viên không tự công bố ngoài permission và quy trình review.
- Giáo viên xác nhận kết quả chuyên môn; người được trường ủy quyền mới phê duyệt chính thức.
- Mọi thay đổi điểm, bài giảng và trạng thái công bố lưu actor, thời gian, lý do và version.

### 3.3. Bài giảng — học sinh

- Học sinh truy cập bài giảng theo membership của lớp và năm học.
- Bài giảng lớp/học phần chỉ hiển thị khi account có learner membership hợp lệ.
- Progress lưu account, lesson, lớp, môn, năm học và curriculum version.
- Không dùng account Super Admin hoặc Field Admin làm thay learner membership.
- Super Admin không tự động xem chi tiết điểm hoặc tiến độ trẻ em ngoài scope được cấp.

### 3.4. Bài giảng — AI

- AI chỉ nhận object/document/context được Worker cấp quyền.
- AI không truy cập toàn bộ kho học liệu bằng trình duyệt.
- AI tạo draft/quiz/explanation/summary.
- AI có thể đề xuất mức độ khó, mức thành thạo và route ôn tập.
- AI không quyết định công bố, phê duyệt, chuyển lớp hoặc xác minh tư cách.

### 3.5. Tiến độ — lớp — học sinh

- Progress gắn với account, class, subject, lesson và curriculum version.
- Một account có thể thuộc nhiều lớp theo nhiều năm học.
- Không trộn progress của năm học hoặc lớp khác.
- Tính mastery từ dữ liệu assessment đã xác minh.
- Giáo viên chỉ xem progress trong lớp/môn/năm học được phân công.

## 4. Tài khoản, vai trò và quyền sử dụng

Thiết kế sử dụng model `accounts`, `role_grants`, `permission_grants`, `scope_relations`, `class_memberships`, `teacher_assignments` trong tài liệu RBAC D1.

### 4.1. Learner

Quyền:

- xem bài giảng được công bố trong field/class/subject đang có membership;
- mở tài liệu được phép;
- tương tác trợ lý AI trong phạm vi bài học;
- làm bài tập và xem kết quả tạm/thông qua giáo viên;
- xem progress của chính mình;
- yêu cầu review khi nội dung mâu thuẫn.

Không có quyền tự thêm source chính thức, sửa bài giảng hoặc công bố.

### 4.2. Teacher

Chỉ khi `teacher_assignment` và role/permission grant đang hiệu lực:

- xem và tạo nội dung trong scope;
- yêu cầu AI tạo bài giảng nháp;
- chỉnh sửa có lý do;
- giao bài cho lớp;
- xem điểm/progress của học sinh được phân công;
- kiểm duyệt hoặc đề xuất công bố;
- xem nguồn trích dẫn.

Không mặc định được:

- đổi curriculum chính thức;
- công bố học liệu chưa được cấp quyền;
- xem lớp/môn ngoài assignment;
- thay đổi role Super Admin.

### 4.3. Field Admin

- quản lý nội dung và chủ đề trong lĩnh vực được cấp;
- tạo, sửa, tạm dừng, phát hành học liệu theo permission riêng;
- quản lý review workflow;
- xem thống kê nhiều cấp trong phạm vi;
- không tự mở lĩnh vực ngoài scope;
- không tự cấp role, hết hạn grant hoặc vượt scope.

### 4.4. Super Admin

- quản lý cấu hình toàn nền tảng;
- cấp và thu hồi role/permission;
- xem audit và thống kê toàn hệ thống;
- không tự trở thành learner/teacher/group leader;
- không bypass assignment, membership hoặc review khi thao tác chuyên môn.

### 4.5. Group Leader

- giao nhiệm vụ trong group đã xác minh;
- theo dõi progress/minimal data của thành viên;
- yêu cầu giáo viên/trưởng đơn vị kiểm duyệt;
- không tự thay curriculum hoặc công bố official lesson.

### 4.6. Quyền dữ liệu nhạy cảm

- Không hiển thị danh sách học sinh cho người không có permission.
- Không export hàng loạt nếu chưa có permission và lý do.
- AI session với trẻ em phải giới hạn dữ liệu cá nhân.
- Không gửi thông tin định danh, dữ liệu gia đình, dữ liệu sinh trắc hoặc đơn vị nhạy cảm đến AI bên ngoài khi chưa phê duyệt.

## 5. Bảng D1 đề xuất

### 5.1. Chương trình và tổ chức học tập

#### `education_systems`

- `id`
- `code`
- `name`
- `country`
- `status`
- `created_at`
- `updated_at`

#### `curriculum_frameworks`

- `id`
- `education_system_id`
- `code`
- `name`
- `source_reference_id`
- `status`
- `effective_from`
- `effective_to`
- `created_at`

#### `curriculum_versions`

- `id`
- `framework_id`
- `version_code`
- `title`
- `status`
- `source_reference_id`
- `published_at`
- `published_by`
- `created_at`

#### `education_stages`

- `id`
- `education_system_id`
- `code`
- `name`
- `sort_order`
- `status`

Ví dụ: `primary`, `lower_secondary`, `upper_secondary`.

#### `grades`

- `id`
- `education_system_id`
- `stage_id`
- `grade_number`
- `name`
- `status`

Chỉ lưu lớp 1 đến 12; các chương trình mở rộng lưu stage riêng.

#### `academic_years`

- `id`
- `school_id`
- `name`
- `starts_on`
- `ends_on`
- `status`

#### `subjects`

- `id`
- `field_id`
- `code`
- `name`
- `stage_type`
- `is_active`

#### `curriculum_subjects`

- `id`
- `curriculum_version_id`
- `subject_id`
- `grade_id`
- `weekly_units`
- `status`

#### `topics`

- `id`
- `subject_id`
- `parent_topic_id`
- `curriculum_version_id`
- `code`
- `title`
- `description`
- `sort_order`
- `status`

#### `learning_standards`

- `id`
- `topic_id`
- `grade_id`
- `code`
- `description`
- `source_reference_id`
- `status`

### 5.2. Kho học liệu

#### `learning_materials`

- `id`
- `title`
- `field_id`
- `material_type`
- `license_type`
- `ownership_status`
- `official_status`
- `created_by`
- `current_version_id`
- `status`
- `created_at`
- `updated_at`

#### `learning_material_versions`

- `id`
- `material_id`
- `version_number`
- `object_key`
- `mime_type`
- `file_size`
- `checksum_sha256`
- `source_reference_id`
- `extraction_status`
- `created_by`
- `created_at`
- `approved_by`
- `approved_at`

#### `learning_material_classifications`

- `id`
- `material_version_id`
- `subject_id`
- `grade_id`
- `topic_id`
- `curriculum_version_id`
- `confidence`
- `classification_status`
- `reviewed_by`
- `reviewed_at`

#### `learning_material_sources`

- `id`
- `material_id`
- `source_type`
- `title`
- `publisher`
- `url`
- `isbn`
- `document_code`
- `publication_date`
- `license_reference`
- `verification_status`
- `verified_by`
- `verified_at`

#### `source_references`

- `id`
- `source_id`
- `reference_text`
- `page_or_section`
- `object_key`
- `quote_or_summary`
- `reliability`
- `created_at`

### 5.3. Bài giảng và nội dung

#### `lessons`

- `id`
- `title`
- `field_id`
- `curriculum_version_id`
- `subject_id`
- `grade_id`
- `topic_id`
- `owner_account_id`
- `source_type`
- `status`
- `current_version_id`
- `created_at`
- `updated_at`

Status: `draft`, `ai_draft`, `in_review`, `needs_revision`, `approved`, `published`, `archived`, `withdrawn`.

#### `lesson_versions`

- `id`
- `lesson_id`
- `version_number`
- `title`
- `summary`
- `content_object_key`
- `generated_by_ai`
- `ai_job_id`
- `status`
- `created_by`
- `created_at`
- `reviewed_by`
- `reviewed_at`
- `published_at`

#### `lesson_sections`

- `id`
- `lesson_version_id`
- `section_type`
- `title`
- `content_object_key`
- `sort_order`
- `source_ids`

Section type: `objective`, `theory`, `example`, `worked_solution`, `exercise`, `summary`, `assessment`, `citation`.

#### `lesson_citations`

- `id`
- `lesson_version_id`
- `source_reference_id`
- `material_version_id`
- `location`
- `citation_text`
- `used_for`

#### `lesson_review_requests`

- `id`
- `lesson_version_id`
- `reviewer_account_id`
- `scope_type`
- `scope_id`
- `status`
- `requested_by`
- `requested_at`
- `decided_at`
- `decision_reason`

#### `lesson_publication_records`

- `id`
- `lesson_version_id`
- `decision`
- `authorized_by`
- `effective_at`
- `scope_type`
- `scope_id`
- `audit_reference`

No direct publication by AI.

### 5.4. Bài tập, đánh giá và progress

#### `exercise_sets`

- `id`
- `lesson_version_id`
- `title`
- `difficulty`
- `purpose`
- `created_by`
- `status`

#### `questions`

- `id`
- `exercise_set_id`
- `question_type`
- `prompt_object_key`
- `answer_object_key`
- `rubric_object_key`
- `difficulty`
- `ai_generated`
- `review_status`

#### `learning_assignments`

- `id`
- `lesson_version_id`
- `exercise_set_id`
- `class_id`
- `group_id`
- `assigned_by`
- `assigned_at`
- `due_at`
- `status`
- `scope_type`
- `scope_id`

#### `assignment_submissions`

- `id`
- `assignment_id`
- `learner_account_id`
- `submission_object_key`
- `submitted_at`
- `status`
- `automated_score`
- `final_score`
- `teacher_confirmed_by`
- `approved_by`

#### `learning_progress`

- `id`
- `learner_account_id`
- `class_id`
- `subject_id`
- `lesson_id`
- `curriculum_version_id`
- `status`
- `completion_percent`
- `time_spent_seconds`
- `mastery_score`
- `last_activity_at`
- `updated_at`

UNIQUE `(learner_account_id, class_id, subject_id, lesson_id, curriculum_version_id)`.

#### `learning_events`

- `id`
- `learner_account_id`
- `class_id`
- `lesson_id`
- `event_type`
- `occurred_at`
- `duration_seconds`
- `event_metadata`

Không lưu hành vi nhạy cảm hoặc dữ liệu sinh trắc trong event metadata.

#### `mastery_snapshots`

- `id`
- `learner_account_id`
- `subject_id`
- `topic_id`
- `curriculum_version_id`
- `mastery_score`
- `calculated_at`
- `calculation_version`

### 5.5. AI job và trợ lý

#### `ai_jobs`

- `id`
- `job_type`
- `account_id`
- `scope_type`
- `scope_id`
- `input_object_key`
- `source_material_ids`
- `provider_name`
- `model_name`
- `model_parameters`
- `status`
- `requested_at`
- `started_at`
- `completed_at`
- `output_object_key`
- `token_usage`
- `cost_estimate`
- `cost_currency`
- `error_code`
- `safety_status`

Job type: `extract`, `classify`, `index`, `lesson_draft`, `explain`, `solve_hint`, `generate_question`, `grade`, `summarize`, `recommend`.

#### `ai_extractions`

- `id`
- `material_version_id`
- `job_id`
- `extracted_text_object_key`
- `confidence`
- `needs_manual_review`
- `review_status`
- `reviewed_by`
- `reviewed_at`

OCR không được ghi trực tiếp thành học liệu chính thức.

#### `ai_sessions`

- `id`
- `account_id`
- `learner_account_id`
- `scope_type`
- `scope_id`
- `lesson_id`
- `subject_id`
- `status`
- `started_at`
- `ended_at`

Nếu người học là trẻ em, session không lưu dữ liệu ngoài mục đích học tập đã phê duyệt.

#### `ai_messages`

- `id`
- `session_id`
- `role`
- `content_object_key`
- `source_context_ids`
- `citation_ids`
- `safety_status`
- `created_at`

#### `ai_usage_ledger`

- `id`
- `account_id`
- `job_id`
- `provider_name`
- `model_name`
- `input_tokens`
- `output_tokens`
- `billable_units`
- `estimated_cost`
- `confirmed_cost`
- `currency`
- `occurred_at`

Không gửi wallet passphrase hoặc secret provider key vào D1 hoặc metadata.

### 5.6. Quản lý nguồn, kiểm duyệt và audit

#### `content_review_requests`

- `id`
- `entity_type`
- `entity_id`
- `entity_version_id`
- `requested_by`
- `review_scope`
- `status`
- `requested_at`
- `decided_at`

#### `content_review_decisions`

- `id`
- `review_request_id`
- `reviewer_account_id`
- `decision`
- `reason`
- `old_status`
- `new_status`
- `decided_at`

#### `copyright_clearance`

- `id`
- `material_id`
- `clearance_status`
- `license_type`
- `authorized_scope`
- `authorized_by`
- `document_reference`
- `expires_at`
- `reviewed_at`

#### `audit_events`

Sử dụng hoặc mở rộng bảng audit trong tài liệu RBAC:

- lưu source upload;
- AI job;
- draft;
- review;
- publish;
- export;
- access to sensitive learner data;
- cost limit change;
- AI provider change.

Không ghi prompt hoặc nội dung nhạy cảm dạng plaintext không cần thiết.

## 6. Nơi lưu trữ tệp

### 6.1. Cloudflare R2 đề xuất

Tách các bucket/bounded namespace:

- `hts-public-materials`
- `hts-approved-lessons`
- `hts-private-materials`
- `hts-import-staging`
- `hts-ai-extraction`
- `hts-exam-submissions`
- `hts-sensitive-import`

Không public các bucket private.

Mỗi object lưu:

- object key;
- checksum;
- MIME type;
- kích thước;
- owner;
- field/scope;
- classification;
- retention policy;
- signed URL metadata;
- download log.

### 6.2. Quy tắc truy cập

- Upload qua Worker, không cho client tự upload vào bucket private.
- Kiểm tra loại tệp, kích thước, checksum và malware.
- Signed URL ngắn hạn chỉ cấp sau khi kiểm tra role/membership.
- Không public URL cho file nhạy cảm.
- Dữ liệu import OCR tách khỏi dữ liệu chính thức.
- Hết hạn retention thì ẩn/xóa theo quy trình đã phê duyệt.

## 7. Tìm kiếm học liệu

Dùng kiến trúc tìm kiếm tách khỏi D1:

- metadata và relation lưu D1;
- text index lưu Vectorize/DB tìm kiếm đã phê duyệt hoặc hệ thống tương đương;
- full-text search có thể dùng index worker-side nếu chưa có dịch vụ riêng;
- embeddings lưu trong vector index;
- mỗi vector trỏ về object/material/section;
- khi học liệu thay đổi, index tạo bản mới hoặc reindex.

Metadata search D1 hỗ trợ:

- field;
- cấp học;
- lớp;
- môn;
- topic;
- curriculum version;
- academic year;
- license status;
- official status;
- source verification;
- publication status.

Semantic search AI chỉ dùng context được quyền truy cập.

## 8. Kiến trúc API AI

Kiến trúc đề xuất:

```text
Next.js / Browser
  -> Cloudflare Worker/API
  -> Auth & Session
  -> Scope & Permission Guard
  -> Content Policy Guard
  -> D1 Metadata & State
  -> R2 Object Access
  -> AI Provider Adapter
  -> Citation/Post-processing/Safety
  -> D1 Job Ledger / Audit
```

### 8.1. Provider adapter

Tạo abstraction:

- `AIProviderClient`
- `generateText`
- `generateStructuredOutput`
- `extractText`
- `embedText`
- `moderateText`
- `transcribe`
- `summarizeVideo`

Mỗi provider chỉ cấu hình ở server. Không truyền API key sang browser.

### 8.2. API đề xuất

#### Danh mục và curriculum

- `GET /api/curriculum/frameworks`
- `GET /api/curriculum/versions`
- `GET /api/curriculum/grades`
- `GET /api/curriculum/subjects`
- `GET /api/curriculum/topics`

#### Kho học liệu

- `POST /api/materials/import`
- `POST /api/materials/:id/version`
- `GET /api/materials`
- `GET /api/materials/:id`
- `POST /api/materials/:id/classify`
- `POST /api/materials/:id/review`
- `POST /api/materials/:id/publish`

#### Bài giảng

- `POST /api/lessons`
- `POST /api/lessons/:id/ai-draft`
- `PUT /api/lessons/:id/version`
- `POST /api/lessons/:id/review`
- `POST /api/lessons/:id/approve`
- `POST /api/lessons/:id/publish`

#### Lớp và bài tập

- `POST /api/classes/:id/assignments`
- `GET /api/classes/:id/progress`
- `POST /api/assignments/:id/submissions`
- `POST /api/submissions/:id/review`
- `POST /api/submissions/:id/approve`

#### AI assistant

- `POST /api/ai/sessions`
- `POST /api/ai/sessions/:id/messages`
- `POST /api/ai/explain`
- `POST /api/ai/hints`
- `POST /api/ai/questions`
- `POST /api/ai/grade-draft`

Tất cả API phải kiểm tra account/session/role/scope trước xử lý.

## 9. Quy trình AI và người duyệt

### 9.1. Nhập tài liệu

1. Người có quyền upload tài liệu.
2. Worker kiểm tra loại tệp, kích thước và checksum.
3. Lưu R2 staging.
4. Tạo `learning_material_version`.
5. AI/OCR trích xuất vào vùng tạm.
6. Hệ thống phát hiện thiếu trường, trùng lặp và nguồn không rõ.
7. Người nhập/giáo viên/Field Admin đối chiếu source.
8. Chỉ khi có clearance và review mới chuyển trạng thái approved.

OCR không được tự xác nhận nội dung chính thức.

### 9.2. Phân loại học liệu

AI đề xuất:

- cấp học;
- lớp;
- môn;
- chủ đề;
- curriculum version;
- loại học liệu;
- license/source.

Giáo viên hoặc người có thẩm quyền xác nhận từng kết quả. Không tự gán tuổi/lớp nếu dữ liệu không rõ.

### 9.3. Tạo bài giảng

1. Giáo viên chọn lesson scope.
2. Worker kiểm tra assignment và permission.
3. Worker lấy curriculum và source đã approved.
4. Worker tạo AI job và ghi ledger.
5. AI tạo bản nháp kèm citation.
6. Worker lưu lesson version có trạng thái `ai_draft`.
7. Giáo viên rà soát, sửa và xác nhận.
8. Người có thẩm quyền review và approve.
9. Field Admin/Super Admin theo scope công bố nếu policy cho phép.

AI không tự publish.

### 9.4. Trợ lý AI cho người học

- Truy vấn chỉ theo lesson/topic/account scope đã cho phép.
- Không công khai answer key khi chưa kết thúc assessment.
- Hướng dẫn từng bước thay vì đưa đáp án hoàn chỉnh khi người học đang làm bài.
- Cảnh báo khi câu hỏi ngoài chương trình hoặc không có nguồn.
- Tìm kiếm trích dẫn từ học liệu approved.
- Không kết luận gian lận, sức khỏe hoặc năng lực đặc biệt ngoài dữ liệu học tập đã phê duyệt.

### 9.5. Chấm bài

AI có thể:

- đề xuất điểm;
- phân tích lỗi;
- đề xuất rubric;
- đánh dấu bài cần xác minh.

Giáo viên hoặc người được ủy quyền:

- rà soát;
- điều chỉnh;
- xác nhận;
- phê duyệt kết quả chính thức.

Lưu mọi thay đổi điểm cũ/mới, người thực hiện, thời gian và lý do.

## 10. Cá nhân hóa

Nền tảng có thể cá nhân hóa theo:

- lớp;
- môn;
- curriculum version;
- lesson progress;
- mastery topic;
- assessment history;
- thời gian học;
- permission và nội dung được phép.

Không cá nhân hóa dựa trên dữ liệu nhạy cảm nếu chưa phê duyệt.

AI recommendation cần:

- nêu lý do;
- trỏ tới bài học/tiêu chuẩn;
- không tạo xếp hạng thiếu công bằng;
- không khóa học sinh vào nhãn năng lực cố định;
- cho phép giáo viên chỉnh sửa hoặc ẩn recommendation.

## 11. Kiểm soát bản quyền và nguồn

- Bắt buộc license/source cho học liệu nhập vào kho.
- Phân biệt public domain, tài liệu chính thức, tài liệu được cấp phép, tài liệu không rõ quyền.
- Không xử lý tài liệu không rõ quyền ở mode publish.
- Chỉ có Field Admin/Super Admin được cấp permission mới duyệt clearance.
- AI output lưu nguồn; không tự suy ra nguồn chính thức.
- Khi nguồn xóa hoặc license hết hạn, material chuyển trạng thái withdrawn/restricted.
- Mọi export/pdf/copy/download có audit.

## 12. Kiểm soát chi phí AI

D1 lưu usage ledger:

- provider;
- model;
- input/output tokens;
- billable unit;
- estimated cost;
- confirmed cost;
- account/request scope;
- job type.

Worker áp dụng:

- giới hạn token theo request;
- giới hạn bài/tuần/tháng theo nhu cầu an toàn, vận hành và ngân sách; không dùng role/gói quản trị để thu phí hoặc làm điều kiện truy cập hoạt động học tập;
- giới hạn theo trường/lớp nếu được cấu hình;
- quota kỹ thuật áp dụng minh bạch, nhất quán theo chính sách nền tảng; quota không phải học phí và không yêu cầu mua gói quản trị;
- circuit breaker khi provider lỗi;
- cache cho prompt bền vững;
- batch xử lý tài liệu;
- fallback provider theo adapter;
- cảnh báo quota;
- từ chối job khi vượt budget mà không tự tạo chi phí ngoài policy.

Không ghi API key hoặc secret provider trong D1/Audit.

## 13. Bảo mật dữ liệu học sinh

- account là định danh duy nhất;
- không gửi danh tính học sinh sang AI ngoài mục đích được phép;
- không gửi nội dung nhạy cảm hoặc danh sách lớp hàng loạt;
- không lưu prompt chứa CCCD, sinh trắc hoặc dữ liệu gia đình;
- dữ liệu trẻ em yêu cầu tăng cường privacy;
- guard theo learner membership và teacher assignment;
- export phải có lý do, scope, permission và audit;
- retention policy cho AI session, submission và OCR staging;
- R2 private file mặc định.
- ứng dụng AI không dùng dữ liệu học sinh để quảng cáo hoặc huấn luyện mô hình bên ngoài nếu chưa được phê duyệt.

## 14. Chỉ mục và version

Mỗi publication:

- lưu curriculum version;
- lưu lesson version;
- lưu material version;
- lưu source/citation;
- lưu reviewer/approver;
- lưu effective date;
- không ghi đè version đã publish;
- tạo bản mới khi curriculum/source/lesson thay đổi.

Index và vector embedding phải gắn material/lesson version. Khi phát hành lại, reindex hoặc thay context index. Không để vector cũ làm nguồn cho lesson mới.

## 15. Luồng API bảo mật

Worker xử lý:

1. xác thực session;
2. xác minh account active;
3. xác minh role grant;
4. xác minh scope target;
5. xác minh membership/assignment;
6. xác minh curriculum version;
7. xác minh source clearance;
8. kiểm tra quota AI;
9. tạo AI job;
10. gọi provider adapter;
11. kiểm tra kết quả;
12. lưu draft/job/ledger/audit;
13. trả response không chứa object ngoài quyền.

Không tin:

- `account_id`;
- `role`;
- `scope_id`;
- `review_status`;
- `published_state`;
- `curriculum_version`;
- `source_id`;

do browser gửi mà không đối chiếu D1.

## 16. Xung đột cần thống nhất

1. Danh mục curriculum chính thức chuẩn theo nguồn nào.
2. Chuẩn môn học và chủ đề theo từng cấp.
3. Ai được phép upload official source.
4. Ai được phép approve/publish.
5. Copyright clearance policy.
6. Nguồn AI/OCR provider được phê duyệt.
7. Dữ liệu trẻ em được gửi AI ở mức nào.
8. Quyết định hỏi đáp tiếp tục ở mức nào.
9. Policy chấm bài tự động.
10. Ngưỡng confidence và manual review.
11. Quy tắc cost quota.
12. Vị trí R2 và retention.
13. Lịch sử và archive sau khi kết thúc năm học.

## 17. Trình tự triển khai đề xuất

1. Chốt curriculum framework và taxonomy.
2. Chốt bảng grade/subject/topic/curriculum.
3. Chốt account/RBAC/scope trước khi nội dung.
4. Tạo migration D1 nền.
5. Tạo storage metadata và R2 namespace.
6. Xây dựng import source/clearance.
7. Xây dựng OCR/extraction ở queue riêng.
8. Xây dựng classification/manual review.
9. Xây dựng lesson version/review/publish.
10. Xây dựng assignment/submission/progress.
11. Xây dựng AI adapter/provider abstraction.
12. Xây dựng assistant RAG/citation.
13. Xây dựng quota/cost ledger.
14. Kiểm thử với dữ liệu giả lập và dữ liệu trẻ em giả lập.
15. Nghiệm thu phân quyền, copyright, AI safety và cost.

## 18. Các điểm cần chủ dự án phê duyệt

1. Curriculum Việt Nam nào được coi là official baseline.
2. Cơ quan/đơn vị cung cấp source chính thức.
3. License và copyright cho mỗi loại học liệu.
4. Ngân sách, quota và provider AI.
5. Nhà cung cấp AI/OCR được phép.
6. Nhà cung cấp embedding/vector search được phép.
7. Khuôn khổ gửi dữ liệu học sinh tới AI bên ngoài.
8. Có lưu prompt/chat transcript hay không.
9. Retention policy cho R2, OCR staging và AI sessions.
10. Ai được approve/publish lesson.
11. Ai được review/approve điểm.
12. Quy tắc chấm bài tự động.
13. Ngưỡng confidence cho manual review.
14. Cá nhân hóa progress và mastery có áp dụng cho người chưa thành niên.
15. Quy tắc export và tải học liệu hàng loạt.
16. Policy cho lực lượng vũ trang và dữ liệu nội bộ hạn chế.
17. Hệ thống tìm kiếm Vectorize vs dịch vụ khác.
18. Quota kỹ thuật/ngân sách AI theo lĩnh vực, bảo đảm không biến quyền học tập hoặc trợ lý AI giảng dạy thành quyền lợi phải mua gói quản trị.
19. Quy trình xóa/ẩn học liệu khi license hết hạn.
20. Quy trình backup/restore và reindex toàn bộ kho.
