# HỌC TẬP SỐ (HTS) – DIGITAL LEARNING

**Thông điệp:** TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.

**Phiên bản tài liệu:** 3.0 – Bản tổng hợp yêu cầu và kiến trúc cập nhật  
**Ngày cập nhật:** 24/11/2026  
**Trạng thái:** Đang phát triển; các hạng mục ghi “đã thống nhất” là yêu cầu nghiệp vụ, không đồng nghĩa đã được lập trình hoặc nghiệm thu.

---

## I. GIỚI THIỆU DỰ ÁN

HỌC TẬP SỐ (HTS – Digital Learning) là nền tảng học tập số hướng tới xây dựng hệ sinh thái giáo dục, đào tạo và kết nối cộng đồng trên Internet. Dự án ứng dụng công nghệ số, trí tuệ nhân tạo (AI), cơ sở dữ liệu trực tuyến và các giải pháp quản trị hiện đại nhằm hỗ trợ người dân, công nhân, sinh viên, học sinh và lực lượng vũ trang học tập mọi lúc, mọi nơi.

### Mục tiêu
- Phổ cập tri thức và thúc đẩy học tập suốt đời.
- Xây dựng thư viện tài liệu, bài giảng và chương trình đào tạo số.
- Hỗ trợ tự học, kiểm tra, đánh giá và theo dõi kết quả học tập.
- Ứng dụng AI trong xây dựng nội dung, OCR và hỗ trợ đánh giá.
- Xây dựng mạng xã hội học tập và cộng đồng chia sẻ tri thức.
- Phát triển công cụ quản trị giáo dục, trường học, giáo viên, học sinh và báo cáo.
- Phát triển sàn thương mại điện tử và nghiên cứu tích hợp Pi Network/Token HTS theo yêu cầu riêng của dự án.

## II. BẢY LĨNH VỰC HỌC TẬP

| STT | Mã lĩnh vực | Tên lĩnh vực | Quy định truy cập |
|---|---|---|---|
| 1 | `cong-dan` | Công dân học tập | Mở, miễn phí |
| 2 | `cong-nhan` | Công nhân học tập | Mở, miễn phí |
| 3 | `sinh-vien` | Sinh viên học tập | Cần tài khoản |
| 4 | `thpt` | Học sinh THPT | Cần tài khoản |
| 5 | `thcs` | Học sinh THCS | Cần tài khoản |
| 6 | `tieu-hoc` | Học sinh tiểu học | Cần tài khoản |
| 7 | `luc-luong-vu-trang` | Lực lượng vũ trang (Quân đội – Công an) | Cần tài khoản |

Công dân học tập và Công nhân học tập được truy cập học tập mở, không bắt buộc đăng nhập. Năm lĩnh vực còn lại yêu cầu tài khoản theo quy định. Một tài khoản có thể đăng ký nhiều lĩnh vực. Việc thay đổi quyền quản trị không làm mất hồ sơ và lịch sử học tập.

## III. KIẾN TRÚC TÀI KHOẢN VÀ QUẢN TRỊ HTS

### 1. Super Admin HTS
- Quản lý cấu hình và hoạt động toàn hệ thống HTS.
- Quản lý tài khoản và các lĩnh vực học tập.
- Cấp, gia hạn, thu hồi các quyền quản trị theo chính sách.
- Cấp/thu hồi quyền quản trị cao cấp ngành Giáo dục.
- Theo dõi nhật ký và kiểm soát bảo mật.

Quy định “một tài khoản Super Admin duy nhất” trong tài liệu cũ cần được kiểm tra lại với phương án vận hành, khôi phục và an toàn tài khoản trước khi triển khai thực tế; không tự tạo hoặc thay đổi tài khoản đặc quyền bằng mã nguồn.

### 2. Quản trị cao cấp ngành Giáo dục
- Được xem hồ sơ chi tiết và báo cáo trong phạm vi toàn ngành giáo dục tham gia HTS.
- Có thể xem dữ liệu trường, cơ sở/phân hiệu, giáo viên, học sinh và báo cáo liên quan.
- Quyền xem toàn ngành không tự động cho phép sửa, duyệt, xuất dữ liệu hoặc truy cập các lĩnh vực HTS khác.
- Mọi quyền bổ sung phải được cấp riêng, đúng phạm vi, có thời hạn nếu cần và có nhật ký.

### 3. Quản trị cấp 1 tại trường
Gồm hai nhóm quyền nghiệp vụ độc lập:

**Giáo viên**
- Chỉ truy cập lớp, môn học, học sinh và năm học được phân công.
- Soạn bài giảng, học liệu, đề kiểm tra, đáp án và tiêu chí chấm.
- Xem gợi ý chấm điểm của AI; rà soát, chỉnh sửa có lý do và xác nhận kết quả chuyên môn.
- Chỉ xem và thao tác báo cáo trong phạm vi được giao.
- Không tự động có quyền duyệt chính thức nếu chưa được ủy quyền.

**Ban giám hiệu**
- Quản lý toàn bộ trường và tất cả cơ sở/phân hiệu trực thuộc trường.
- Quản lý giáo viên, học sinh, lớp, năm học, phân công và báo cáo của trường.
- Phân công người có thẩm quyền duyệt theo quy chế của trường.
- Không mặc định mọi thành viên Ban giám hiệu đều được sửa mọi điểm hoặc duyệt mọi báo cáo.

**Một tài khoản có thể đồng thời là giáo viên và thành viên Ban giám hiệu.** Hệ thống cộng hợp các quyền được cấp hợp lệ trên cùng một tài khoản; không tạo tài khoản trùng.

## IV. CẤU TRÚC QUẢN LÝ GIÁO DỤC

Cấu trúc nghiệp vụ dự kiến:

**Ngành giáo dục → đơn vị quản lý giáo dục được ủy quyền → trường → cơ sở/phân hiệu → năm học → cấp học → khối lớp → lớp → giáo viên/học sinh.**

Cấu trúc phải linh hoạt theo tổ chức và thẩm quyền thực tế; không hard-code các cấp hành chính cũ. Ban giám hiệu quản lý toàn bộ trường và các cơ sở/phân hiệu trực thuộc đã được xác minh. Giáo viên chỉ làm việc với lớp/môn/học sinh được phân công.

## V. PHÂN QUYỀN VÀ KIỂM SOÁT TRUY CẬP

Áp dụng kết hợp:
- RBAC: vai trò nghiệp vụ.
- Scope-based access: phạm vi trường, cơ sở, lớp, môn học, năm học.
- Granular permissions: quyền chi tiết theo hành động.

Các hành động phải phân biệt: xem, tạo, sửa, xóa, rà soát điểm, xác nhận kết quả, duyệt điểm, rà soát báo cáo, duyệt báo cáo, gửi báo cáo và xuất dữ liệu.

Mọi thao tác nhạy cảm phải được kiểm tra tại máy chủ/API. Ẩn nút trên giao diện không phải là biện pháp bảo mật. Khi thiếu phân công, thiếu phạm vi, hết hạn hoặc không xác định được đối tượng dữ liệu, mặc định từ chối truy cập.

## VI. QUY TRÌNH KIỂM TRA, AI CHẤM ĐIỂM VÀ PHÊ DUYỆT

1. AI/OCR đọc bài làm và đề xuất điểm theo từng câu hỏi hoặc tiêu chí; đưa ra căn cứ và độ tin cậy.
2. Bài viết tay khó đọc, ảnh không rõ, dữ liệu không khớp hoặc độ tin cậy thấp phải chuyển xác minh thủ công.
3. Giáo viên được phân công rà soát, chỉnh sửa điểm kèm lý do và xác nhận kết quả chuyên môn.
4. Người được trường ủy quyền theo quy chế riêng mới có quyền phê duyệt chính thức.
5. Chỉ sau bước phê duyệt mới ghi nhận điểm chính thức.
6. Mọi thay đổi phải lưu giá trị cũ/mới, người thao tác, thời điểm và lý do.

Bài thi trắc nghiệm, tự luận, thực hành có thể dùng tiêu chí chấm tương ứng. AI chỉ hỗ trợ đề xuất; không thay thế trách nhiệm chuyên môn và thẩm quyền phê duyệt của người được giao nhiệm vụ.

## VII. BÁO CÁO VÀ QUẢN LÝ DỮ LIỆU TỔNG HỢP

- Báo cáo được lập, kiểm tra, phê duyệt và gửi theo quy chế.
- Lưu phiên bản/snapshot báo cáo đã gửi.
- Khi có điều chỉnh, tạo phiên bản mới và giữ lịch sử cũ.
- Quản trị cao cấp ngành Giáo dục được xem báo cáo toàn ngành nhưng không tự động có quyền sửa hoặc duyệt.

### Quy tắc loại trừ đúng phạm vi

Hai lĩnh vực **Công dân học tập (`cong-dan`)** và **Công nhân học tập (`cong-nhan`)** được loại khỏi tổng hợp quản lý giáo dục ở cấp trường, cơ sở/phân hiệu, khối/lớp, giáo viên/học sinh và báo cáo ngành giáo dục.

Đây chỉ là quy tắc tổng hợp báo cáo quản lý giáo dục. Không xóa dữ liệu, không khóa học tập, không loại khỏi nền tảng HTS và không ảnh hưởng quyền truy cập học tập của người dùng. Không loại trừ các lĩnh vực khác nếu chưa có quyết định mới.

## VIII. CÁC CHỨC NĂNG CHÍNH CỦA HTS

1. Trang chủ, giới thiệu và hướng dẫn.
2. Bảy lĩnh vực học tập.
3. Đăng ký, đăng nhập, hồ sơ và quản lý tài khoản.
4. Quản trị Super Admin, quản trị lĩnh vực và phân quyền.
5. Quản trị giáo dục, trường, cơ sở/phân hiệu, năm học, lớp, giáo viên và học sinh.
6. Quản lý bài giảng, khóa học và thư viện số.
7. Thi trực tuyến, OCR, AI hỗ trợ chấm điểm, xác nhận và phê duyệt.
8. Theo dõi tiến độ, kết quả và báo cáo.
9. Tin tức, sự kiện và mạng xã hội học tập.
10. Nhắn tin, gọi thoại/video theo lộ trình và điều kiện kỹ thuật.
11. Sàn thương mại điện tử nhiều người bán.
12. Nghiên cứu Token HTS/Pi Network.
13. Hoạt động cộng đồng, từ thiện.
14. Quản lý doanh thu, chính sách phí và thống kê.
15. AI hỗ trợ xây dựng nội dung.
16. Bảo mật, nhật ký, sao lưu và khôi phục.

Các chức năng trong danh sách là phạm vi dự án; không có nghĩa tất cả đã hoàn thành.

## IX. QUY ĐỊNH RIÊNG CHO SÀN THƯƠNG MẠI ĐIỆN TỬ

- Định hướng mô hình nhiều người bán; cá nhân, hộ kinh doanh và doanh nghiệp đăng ký theo quy định.
- Người bán quản lý sản phẩm và đơn hàng theo quyền được cấp.
- Theo phương án đã nêu trong README hiện tại, sản phẩm hiển thị giá Pi và định hướng thanh toán bằng Pi; không triển khai COD hoặc chuyển khoản ngân hàng trong phương án đó.
- Máy chủ phải xác minh giao dịch trước khi xác nhận thanh toán.
- Không yêu cầu hoặc lưu Pi Wallet Passphrase.
- Tích hợp thanh toán chỉ triển khai sau khi rà soát yêu cầu kỹ thuật, pháp lý và điều kiện của nền tảng.

## X. BẢO MẬT VÀ DỮ LIỆU NỘI BỘ

- Phân biệt dữ liệu học tập thông thường và dữ liệu nội bộ cần bảo vệ đặc biệt.
- Đăng nhập HTS không đồng nghĩa được truy cập mọi dữ liệu.
- Danh sách quân nhân, dữ liệu nhận quà công đoàn/quân trang, thông tin định danh, số điện thoại và dữ liệu sinh trắc học phải có quyền riêng theo mục đích, phạm vi, thời hạn và thẩm quyền.
- Ghi nhật ký xem, sửa, tải xuống, xuất dữ liệu và các thao tác quản trị quan trọng.
- Có cơ chế thu hồi quyền, sao lưu, khôi phục và xử lý sự cố.
- Không đưa dữ liệu thật nhạy cảm, mật khẩu, khóa API, token hoặc bí mật xác thực vào GitHub công khai.
- Không dùng dữ liệu thật nhạy cảm trong môi trường thử nghiệm hoặc dịch vụ chưa được phê duyệt.

## XI. CÔNG NGHỆ VÀ ĐIỂM CẦN XÁC MINH

| Thành phần | Thông tin từ mã nguồn/tài liệu hiện có |
|---|---|
| Framework | Next.js 15.2.4 |
| Giao diện | React 19 |
| Ngôn ngữ | TypeScript |
| CSS | Tailwind CSS 4 (theo README hiện có) |
| Mã nguồn | GitHub – repository `tranvandinh128/HOC-TAP-SO-HTS` |
| Cơ sở dữ liệu | Chưa xác minh hệ thống đang chạy thật |
| Triển khai | Cần đối chiếu môi trường thực tế trước khi thay đổi |

**Lưu ý bắt buộc:** snapshot mã nguồn được rà soát có thư mục `supabase/` và file `supabase/schema.sql`, trong khi README mô tả định hướng Cloudflare D1. Đây là điểm chưa thống nhất cần xác minh với DB đang vận hành. Không được mặc định chọn Supabase hoặc D1, không chạy SQL và không thay đổi dữ liệu trước khi kiểm kê hệ thống thật.

Cloudflare D1 là SQLite và không cung cấp sẵn cơ chế xác thực/RLS tương đương Supabase. Nếu D1 là DB thực tế, phải thiết kế xác thực và kiểm tra quyền ở lớp máy chủ/API. Nếu Supabase là DB thực tế, phải rà soát RLS, policies, trigger và schema hiện hành. Không áp dụng file SQL mẫu lên DB đang có khi chưa đối chiếu.

## XII. NGUYÊN TẮC PHÁT TRIỂN VÀ QUẢN LÝ NHÁNH

- `main` là nhánh ổn định, không thử nghiệm trực tiếp.
- Phát triển bổ sung quản trị giáo dục trên nhánh `feature/hts-education-management`.
- Không dùng ZIP snapshot thay cho bản clone Git có lịch sử; ZIP không có `.git`.
- Không xóa hoặc ghi đè chức năng cũ khi chưa đánh giá ảnh hưởng.
- Chia công việc thành các commit nhỏ, có nội dung rõ ràng.
- Kiểm thử từng phần; chỉ merge về `main` khi có nghiệm thu và đồng ý rõ ràng.
- Không đưa `.env`, khóa bí mật, danh sách thật hoặc dữ liệu cá nhân nhạy cảm lên repository công khai.

## XIII. LỘ TRÌNH TRIỂN KHAI

1. Kiểm kê mã nguồn, routes, components, auth, API và tài liệu.
2. Xác minh DB thực tế, schema, môi trường và cơ chế sao lưu.
3. Thiết kế RBAC + scope + quyền chi tiết và phương án tương thích vai trò cũ.
4. Thiết kế cấu trúc tổ chức giáo dục và phân công.
5. Thiết kế quy trình kiểm tra, AI/OCR, giáo viên xác nhận và người có thẩm quyền phê duyệt.
6. Thiết kế báo cáo, snapshot/version và quy tắc loại trừ hai lĩnh vực.
7. Triển khai API/server authorization và giao diện quản trị.
8. Kiểm thử chức năng, hồi quy, bảo mật, backup/restore và preview.
9. Nghiệm thu và chỉ merge khi được chấp thuận.

## XIV. TRẠNG THÁI TRIỂN KHAI

| Hạng mục | Trạng thái |
|---|---|
| Repository GitHub và nhánh `feature/hts-education-management` | Đã tạo nhánh |
| Snapshot mã nguồn và tài liệu để rà soát | Đã nhận và kiểm kê sơ bộ |
| Ba tầng quản trị giáo dục | Đã thống nhất yêu cầu |
| Giáo viên/Ban giám hiệu và quyền kiêm nhiệm | Đã thống nhất yêu cầu |
| Quy trình duyệt điểm và báo cáo theo trường | Đã thống nhất yêu cầu |
| Quy tắc loại trừ đúng hai lĩnh vực khỏi báo cáo giáo dục | Đã thống nhất yêu cầu |
| Xác minh DB thực tế và schema | Chưa hoàn thành |
| Thiết kế DB/migration cuối cùng | Chưa duyệt |
| Tích hợp API và phân quyền máy chủ | Chưa thực hiện trong gói bổ sung ban đầu |
| Kiểm thử bảo mật và nghiệm thu | Chưa thực hiện |

## XV. NGUYÊN TẮC QUAN TRỌNG NHẤT

HTS là nền tảng học tập mở và hệ sinh thái quản trị có phân quyền. Mọi quyền phải đúng vai trò, đúng phạm vi, đúng mục đích và có thể kiểm tra lại. Quyền xem không đồng nghĩa quyền sửa hoặc duyệt. AI hỗ trợ con người, không tự thay thế người có thẩm quyền. Dữ liệu học tập được bảo toàn; hai lĩnh vực Công dân học tập và Công nhân học tập chỉ được loại khỏi báo cáo quản lý giáo dục theo đúng phạm vi đã thống nhất. Mọi thay đổi cơ sở dữ liệu phải được kiểm kê, sao lưu, thiết kế, thử nghiệm và phê duyệt trước khi thực hiện.

---

**HỌC TẬP SỐ (HTS)**  
**TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.**
