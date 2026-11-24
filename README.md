# HỌC TẬP SỐ (HTS) – DIGITAL LEARNING

**Thông điệp:** TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.

**Phiên bản tài liệu:** 2.0  
**Ngày cập nhật:** 24/11/2026  
**Trạng thái:** Đang phát triển và hoàn thiện theo từng giai đoạn.

---

## I. GIỚI THIỆU DỰ ÁN

HỌC TẬP SỐ (HTS – Digital Learning) là nền tảng học tập số hướng tới xây dựng hệ sinh thái giáo dục, đào tạo và kết nối cộng đồng trên môi trường Internet.

Dự án ứng dụng công nghệ số, trí tuệ nhân tạo (AI), cơ sở dữ liệu trực tuyến và các giải pháp quản trị hiện đại nhằm hỗ trợ người dân, công nhân, sinh viên, học sinh và lực lượng vũ trang học tập mọi lúc, mọi nơi.

**Mục tiêu chính:**
- Phổ cập tri thức và thúc đẩy học tập suốt đời.
- Xây dựng thư viện tài liệu, bài giảng và chương trình đào tạo số.
- Hỗ trợ tự học, kiểm tra, đánh giá và theo dõi kết quả học tập.
- Ứng dụng AI trong xây dựng và hỗ trợ nội dung giáo dục.
- Phát triển mạng xã hội học tập và cộng đồng chia sẻ tri thức.
- Xây dựng sàn thương mại điện tử phục vụ hệ sinh thái HTS.
- Từng bước nghiên cứu tích hợp Pi Network và Token HTS.

## II. BẢY LĨNH VỰC HỌC TẬP

Nền tảng có 07 lĩnh vực chính:

| STT | Mã lĩnh vực | Tên lĩnh vực | Quy định truy cập |
|---|---|---|---|
| 1 | cong-dan | Công dân học tập | Mở, miễn phí |
| 2 | cong-nhan | Công nhân học tập | Mở, miễn phí |
| 3 | sinh-vien | Sinh viên học tập | Cần tài khoản |
| 4 | thpt | Học sinh THPT | Cần tài khoản |
| 5 | thcs | Học sinh THCS | Cần tài khoản |
| 6 | tieu-hoc | Học sinh tiểu học | Cần tài khoản |
| 7 | luc-luong-vu-trang | Lực lượng vũ trang (Quân đội – Công an) | Cần tài khoản |

**Quy định đặc biệt:**
- Công dân học tập và Công nhân học tập được truy cập miễn phí, không bắt buộc đăng ký hoặc đăng nhập.
- Năm lĩnh vực còn lại yêu cầu tài khoản theo quy định.
- Người dùng có thể đăng ký nhiều lĩnh vực bằng cùng một tài khoản.
- Hồ sơ và lịch sử học tập được lưu giữ lâu dài theo chính sách dữ liệu của hệ thống.

## III. KIẾN TRÚC TÀI KHOẢN VÀ PHÂN QUYỀN

### Nguyên tắc tổng thể

**MỘT TÀI KHOẢN – HAI CHỨC NĂNG – BA CẤP QUYỀN.**

Một tài khoản đăng nhập có thể sử dụng chức năng học tập và được cấp thêm quyền quản trị lĩnh vực nếu được Super Admin phê duyệt.

### 1. Người học – learner
- Đăng ký và đăng nhập tài khoản.
- Sử dụng các lĩnh vực học tập được phép.
- Lưu hồ sơ, tiến độ và lịch sử học tập.
- Gửi yêu cầu đăng ký làm quản trị viên lĩnh vực.
- Không được tự cấp quyền quản trị.

### 2. Quản trị viên lĩnh vực – field_admin
- Sử dụng chính tài khoản người học hiện có.
- Chỉ quản trị lĩnh vực được Super Admin phê duyệt.
- Không được tự phê duyệt yêu cầu của mình.
- Không được tự cấp quyền cho người khác.
- Không được thay đổi quyền Super Admin.

**Thời hạn quyền quản trị:**
- Có thời hạn 05 ngày.
- Thời gian được tính từ lần đăng nhập đầu tiên sau khi được phê duyệt.
- Mỗi lĩnh vực có thời hạn quản trị độc lập.
- Hết hạn phải gửi yêu cầu gia hạn và chờ Super Admin phê duyệt.
- Mỗi lần cấp mới hoặc gia hạn phải lưu thành lịch sử riêng.
- Hết hạn hoặc thu hồi quyền quản trị không làm mất tài khoản và dữ liệu học tập.

### 3. Quản trị cấp cao – super_admin

Hệ thống chỉ có duy nhất một tài khoản Super Admin.

Quyền hạn:
- Quản lý toàn bộ hệ thống HTS.
- Quản lý tài khoản người dùng.
- Quản lý cả 07 lĩnh vực học tập.
- Phê duyệt, từ chối và thu hồi quyền quản trị lĩnh vực.
- Cấp mới và gia hạn quyền quản trị.
- Quản lý nội dung, cấu hình, báo cáo và nhật ký.
- Theo dõi hoạt động của các quản trị viên.
- Kiểm soát các chức năng và dữ liệu thuộc phạm vi quản lý hệ thống.

**Quy định bảo vệ Super Admin:**
- Chỉ tồn tại một tài khoản.
- Quyền không có thời hạn.
- Không cho phép người dùng tự nâng cấp thành Super Admin.
- Quản trị viên lĩnh vực không được thay đổi hoặc chiếm quyền Super Admin.
- Tài khoản phải được bảo vệ bằng cơ chế xác thực mạnh.

## IV. BẢO MẬT VÀ DỮ LIỆU NỘI BỘ

HTS phải phân biệt rõ dữ liệu học tập thông thường và dữ liệu nội bộ cần bảo vệ.

Đặc biệt, các danh sách quân nhân, thông tin nhận quà công đoàn và danh sách nhận quân trang phải được bảo vệ riêng.

Nguyên tắc:
- Đăng nhập HTS không đồng nghĩa với được truy cập dữ liệu nội bộ.
- Quyền quản trị lĩnh vực không tự động cấp quyền xem dữ liệu nhạy cảm.
- Chỉ người được cấp quyền riêng, đúng phạm vi và còn hiệu lực mới được truy cập.
- Việc xem, sửa, tải xuống và quản lý dữ liệu phải được kiểm soát ở phía máy chủ.
- Ghi nhật ký các thao tác quan trọng.
- Có cơ chế thu hồi quyền và bảo vệ dữ liệu.
- Không đưa dữ liệu nhạy cảm, mật khẩu hoặc khóa bí mật vào mã nguồn công khai.

## V. CÁC CHỨC NĂNG CHÍNH

1. Trang chủ và giới thiệu nền tảng.
2. Bảy lĩnh vực học tập.
3. Đăng ký, đăng nhập và quản lý tài khoản.
4. Quản trị hệ thống và phân quyền.
5. Quản lý bài giảng, khóa học và thư viện số.
6. Thi trực tuyến, kiểm tra và chấm điểm.
7. Theo dõi tiến độ và kết quả học tập.
8. Tin tức và sự kiện.
9. Mạng xã hội học tập.
10. Nhắn tin, gọi thoại và gọi video.
11. Sàn thương mại điện tử nhiều người bán.
12. Token Học Tập Số (HTS).
13. Hoạt động từ thiện.
14. Quản lý doanh thu và chính sách phí.
15. AI hỗ trợ xây dựng nội dung học tập.
16. Thống kê, báo cáo và xuất dữ liệu.
17. Bảo mật, nhật ký và sao lưu dữ liệu.

## VI. QUY ĐỊNH RIÊNG CHO SÀN THƯƠNG MẠI ĐIỆN TỬ

- Phát triển theo mô hình nhiều người bán.
- Cá nhân, hộ kinh doanh và doanh nghiệp có thể đăng ký gian hàng theo quy định.
- Người bán quản lý sản phẩm và đơn hàng.
- Tất cả sản phẩm bắt buộc hiển thị giá Pi (π).
- Định hướng thanh toán đơn hàng bằng Pi Network 100%.
- Không triển khai COD hoặc chuyển khoản ngân hàng theo phương án đã thống nhất.
- Có thể sử dụng giá Pi cố định hoặc giá tham chiếu từ nguồn giao dịch được hỗ trợ.
- Máy chủ phải xác minh giao dịch trước khi xác nhận thanh toán.
- Tuyệt đối không yêu cầu hoặc lưu Pi Wallet Passphrase.

## VII. CÔNG NGHỆ SỬ DỤNG

| Thành phần | Công nghệ/định hướng |
|---|---|
| Framework website | Next.js 15.2.4 |
| Giao diện | React 19 |
| Ngôn ngữ | TypeScript |
| CSS | Tailwind CSS 4 |
| Mã nguồn | GitHub |
| Cơ sở dữ liệu định hướng | Cloudflare D1 (SQLite) |
| API và xử lý nghiệp vụ | Cloudflare Workers hoặc lớp máy chủ phù hợp |
| Xác thực | Tích hợp giải pháp xác thực an toàn |
| AI | Các dịch vụ AI phù hợp |
| Triển khai | Cloudflare hoặc nền tảng tương thích Next.js |

**Lưu ý kỹ thuật quan trọng:**

Cloudflare D1 là cơ sở dữ liệu SQLite, không cung cấp sẵn hệ thống xác thực tài khoản và Row Level Security như Supabase.

Do đó:
- Phải thiết kế cơ chế xác thực riêng hoặc tích hợp dịch vụ xác thực phù hợp.
- Kiểm tra quyền ở phía máy chủ/API.
- Không chỉ dựa vào việc ẩn hoặc hiện nút trên giao diện.
- Phải rà soát cấu trúc bảng trước khi tạo hoặc sửa dữ liệu.
- Phải có phương án sao lưu và khôi phục.
- Không chuyển hệ thống chính thức khi chưa kiểm thử đầy đủ.

## VIII. NGUYÊN TẮC PHÁT TRIỂN

1. Duy trì một mã nguồn chính thức trên GitHub.
2. Không tự ý xóa chức năng đã có nếu chưa rà soát ảnh hưởng.
3. Mỗi chức năng phải có cấu trúc thư mục và mã nguồn rõ ràng.
4. Ưu tiên thiết kế tương thích điện thoại và máy tính.
5. Dữ liệu phải được lưu trữ ổn định và có khả năng khôi phục.
6. Mọi chức năng quản trị phải được kiểm tra quyền ở phía máy chủ.
7. Không đưa mật khẩu, khóa API hoặc thông tin bí mật vào mã nguồn công khai.
8. Mọi thay đổi cơ sở dữ liệu phải được kiểm tra và có phương án sao lưu.
9. Kiểm thử từng chức năng trước khi triển khai chính thức.
10. Giữ nguyên các yêu cầu nghiệp vụ đã thống nhất trong hồ sơ dự án.

## IX. LỘ TRÌNH TRIỂN KHAI

**Giai đoạn 1:** Hoàn thiện cấu trúc website, trang chủ và giao diện.

**Giai đoạn 2:** Hoàn thiện cơ sở dữ liệu, tài khoản và đăng nhập.

**Giai đoạn 3:** Hoàn thiện quản trị Super Admin, phân quyền và quản trị lĩnh vực.

**Giai đoạn 4:** Xây dựng các lĩnh vực học tập, khóa học và thư viện.

**Giai đoạn 5:** Phát triển thi trực tuyến, chấm điểm và báo cáo.

**Giai đoạn 6:** Phát triển tin tức, mạng xã hội và các tiện ích cộng đồng.

**Giai đoạn 7:** Phát triển sàn thương mại điện tử và thanh toán Pi.

**Giai đoạn 8:** Nghiên cứu Token HTS, AI và các tính năng mở rộng.

**Giai đoạn 9:** Kiểm thử bảo mật, sao lưu, tối ưu và triển khai chính thức.

## X. NGUYÊN TẮC QUAN TRỌNG NHẤT

- Một tài khoản dùng chung cho chức năng học tập và quản trị được cấp phép.
- Công dân và công nhân được học miễn phí, không bắt buộc đăng nhập.
- Quản trị lĩnh vực chỉ hoạt động khi được Super Admin phê duyệt.
- Quyền quản trị lĩnh vực có thời hạn 05 ngày kể từ lần đăng nhập đầu tiên sau phê duyệt.
- Lịch sử cấp quyền và gia hạn phải được lưu đầy đủ.
- Super Admin là tài khoản duy nhất có quyền quản lý toàn hệ thống.
- Dữ liệu nội bộ nhạy cảm phải được bảo vệ riêng.
- Dữ liệu học tập phải được lưu giữ độc lập với thời hạn quyền quản trị.

---

**HỌC TẬP SỐ (HTS)**

**TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.**
