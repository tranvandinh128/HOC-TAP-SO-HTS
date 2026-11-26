# HỌC TẬP SỐ (HTS) – GÓI MÃ NGUỒN NỀN TẢNG QUẢN TRỊ GIÁO DỤC

**Kiến trúc chuẩn:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md). Cloudflare Workers + D1 là backend duy nhất. Các nhận xét Supabase/D1 ở phần snapshot là lịch sử, không phải chỉ dẫn duy trì hai database.

Phiên bản: 1.1
Nhánh đích: `feature/hts-education-management`
Nền tảng hiện có theo snapshot: Next.js 15.2.4, React 19, TypeScript 5.7.3.

## 1. Mục tiêu gói này

Gói này bổ sung một lớp mô hình nghiệp vụ TypeScript độc lập cho quản trị giáo dục: vai trò nhiều lớp, phạm vi tổ chức, quyền chi tiết, quy trình đề xuất điểm AI – giáo viên rà soát/xác nhận – người được trường ủy quyền phê duyệt, báo cáo theo phiên bản và nhật ký.

Gói không ghi đè các file hiện hữu (`lib/permissions.ts`, `lib/hts-model.ts`, các trang `app/quan-tri/*`) để tránh làm hỏng chức năng đang chạy. Mã mới nằm trong `lib/education-management/` và được xuất qua `index.ts`.

## 2. Kiến trúc quyền đã thống nhất

1. `super_admin`: quản trị toàn hệ thống HTS.
2. `education_sector_admin`: xem hồ sơ chi tiết và báo cáo trong phạm vi ngành giáo dục được HTS quản lý; quyền sửa, duyệt, xuất dữ liệu không tự động phát sinh, phải cấp riêng.
3. `school_leadership`: quản lý toàn trường và các cơ sở trực thuộc trong phạm vi được giao; việc duyệt điểm/báo cáo phụ thuộc chính sách và danh sách người được ủy quyền.
4. `teacher`: chỉ làm việc với lớp, môn, học sinh được phân công; có thể tạo nội dung/đề, rà soát và xác nhận kết quả nếu được cấp quyền tương ứng.
5. `learner`: người học.

Một tài khoản có thể có nhiều `UserRoleAssignment`; không ép một người chỉ có một vai trò. Mỗi assignment mang theo scope và danh sách quyền cụ thể, có thời hạn và người cấp.

## 3. Cấu trúc phạm vi

Ngành giáo dục → đơn vị quản lý được ủy quyền → trường → cơ sở/chi nhánh → năm học → khối/lớp → môn học → phân công giáo viên/học sinh.

`scopeMatches()` trong `permissions.ts` là bộ kiểm tra quan hệ phạm vi ở tầng domain. Đây là logic hỗ trợ; dữ liệu tổ chức thật phải được xác minh bằng quan hệ cha-con từ cơ sở dữ liệu. Không dùng việc một scope có type phù hợp làm bằng chứng rằng hai đơn vị có quan hệ trực thuộc nếu chưa kiểm tra DB.

## 4. Quy trình kết quả học tập

- AI chỉ đề xuất điểm và độ tin cậy; không tự công bố điểm chính thức.
- Độ tin cậy thấp hoặc dữ liệu không rõ phải chuyển `needs_manual_review`.
- Giáo viên rà soát, điều chỉnh phải ghi lý do, lưu điểm cũ/mới, người sửa và thời điểm.
- Giáo viên xác nhận chuyển sang `pending_approval`.
- Người duyệt phải có quyền và nằm trong chính sách phê duyệt đang hiệu lực của trường.
- Chỉ sau phê duyệt mới chuyển trạng thái `approved`; công bố chính thức cần quy trình phát hành riêng.

Thang điểm 0–10 trong hàm mẫu chỉ là mặc định tham khảo cho ví dụ. Trước khi dùng thật phải cấu hình theo cấp học, môn học, loại bài kiểm tra và quy chế tương ứng.

## 5. Báo cáo và hai lĩnh vực loại trừ

Hai lĩnh vực `cong-dan` và `cong-nhan` vẫn là lĩnh vực học tập của HTS. Hàm `includeInSchoolEducationReport()` chỉ đánh dấu loại hai lĩnh vực này khỏi báo cáo quản lý giáo dục nhà trường/ngành theo yêu cầu đã thống nhất. Không xóa dữ liệu, không khóa quyền học và không loại các lĩnh vực còn lại.

## 6. Cách tích hợp vào dự án

Giữ nguyên cấu trúc thư mục đích, sao chép toàn bộ thư mục `lib/education-management/` vào thư mục `lib/` hiện tại và `docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md` vào `docs/`.

Ví dụ import:

```ts
import {
  hasEducationPermission,
  applyAiProposal,
  teacherReviewScore,
  teacherConfirmResult,
  approveAcademicResult,
  includeInSchoolEducationReport,
} from "@/lib/education-management";
```

Không thay thế import hiện có từ `@/lib/permissions` cho đến khi có kế hoạch migration và kiểm thử tương thích.

## 7. Việc chưa được gói này thực hiện

- Chưa có API route/server action để đọc danh tính phiên đăng nhập.
- Chưa có migration SQL, bảng hoặc kết nối nghiệp vụ D1.
- Chưa xác định môi trường D1 production/schema. Thiết kế migration cần dựa trên inventory D1 được phê duyệt; không lấy schema cũ làm schema mục tiêu.
- Chưa có giao diện CRUD trường, cơ sở, lớp, môn, giáo viên, học sinh.
- Chưa kết nối OCR/AI, lưu tệp bài làm, máy chấm hoặc công bố điểm.
- Chưa có bộ kiểm thử tự động hoặc kiểm thử bảo mật.
- Chưa được coi là đủ điều kiện đưa vào vận hành dữ liệu thật.

## 8. Điều kiện bắt buộc trước khi chạy thật

1. Xác nhận nền tảng DB và xuất schema hiện tại.
2. Thiết kế bảng quan hệ tổ chức, phân công, kết quả, chính sách duyệt, audit và version report.
3. Thực thi quyền ở Worker/server/API và kiểm tra D1 theo scope; Cloudflare D1 không sử dụng PostgreSQL RLS.
4. Kiểm tra scope theo quan hệ tổ chức thật, không chỉ theo loại scope.
5. Kiểm thử chéo tài khoản: giáo viên nhiều lớp/môn, người vừa là giáo viên vừa là ban giám hiệu, quản trị ngành chỉ xem, người được ủy quyền duyệt, người không có quyền.
6. Kiểm tra log không thể bị người dùng thông thường sửa/xóa.
7. Chỉ dùng dữ liệu giả lập khi kiểm thử; không đưa danh sách học sinh, giáo viên, dữ liệu quân sự, sinh trắc học hoặc bí mật vào GitHub công khai.

## 9. Kiểm tra sau khi tải lên

- Xác nhận branch đang chọn là `feature/hts-education-management`.
- Sau khi upload, kiểm tra GitHub hiển thị `lib/education-management/` và `docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md`.
- Commit theo đợt; chưa tạo Pull Request/merge vào `main` cho đến khi đã kiểm thử và được chủ dự án đồng ý.
