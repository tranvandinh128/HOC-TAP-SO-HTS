# HỌC TẬP SỐ (HTS – DIGITAL LEARNING)

**TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.**

| Thông tin | Nội dung |
|---|---|
| Tên dự án | HỌC TẬP SỐ (HTS – Digital Learning) |
| Phiên bản tài liệu | 4.0 |
| Trạng thái | Đang phát triển |
| Mã nguồn | GitHub – `tranvandinh128/HOC-TAP-SO-HTS` |
| Nhánh phát triển chính | `main` |
| Framework | Next.js – React |
| Ngôn ngữ | TypeScript |
| Cơ sở dữ liệu mục tiêu | Cloudflare D1 |
| Nền tảng triển khai mục tiêu | Cloudflare Workers |
| Định hướng triển khai Next.js | OpenNext Cloudflare Adapter |

> **Lưu ý:** README này mô tả định hướng kiến trúc, yêu cầu nghiệp vụ và kế hoạch phát triển. Một chức năng được mô tả ở đây không đồng nghĩa chức năng đó đã hoàn thành, kiểm thử hoặc đưa vào vận hành.

---

# I. GIỚI THIỆU DỰ ÁN

HỌC TẬP SỐ (HTS – Digital Learning) là nền tảng học tập số hướng tới xây dựng hệ sinh thái giáo dục, đào tạo, chia sẻ tri thức và kết nối cộng đồng trên Internet.

Dự án ứng dụng công nghệ số, trí tuệ nhân tạo (AI), cơ sở dữ liệu trực tuyến và các giải pháp quản trị hiện đại nhằm hỗ trợ người dân, công nhân, sinh viên, học sinh và lực lượng vũ trang học tập mọi lúc, mọi nơi.

HTS hướng tới xây dựng một môi trường học tập có tổ chức, có khả năng mở rộng, quản lý nội dung theo lĩnh vực, quản lý thành viên theo nhóm và phân quyền quản trị rõ ràng.

## 1. Mục tiêu

- Xây dựng nền tảng học tập trực tuyến đa lĩnh vực.
- Tạo kho tri thức số phục vụ nhiều nhóm đối tượng.
- Kết nối người học, người viết nội dung và chuyên gia.
- Ứng dụng AI để hỗ trợ biên soạn, chỉnh sửa và tổ chức kiến thức.
- Xây dựng hệ thống quản trị nội dung có kiểm duyệt.
- Quản lý tài khoản, nhóm học tập và quyền truy cập.
- Lưu trữ dữ liệu lâu dài, có khả năng sao lưu và khôi phục.
- Phát triển hệ thống theo hướng mở rộng, bảo mật và dễ bảo trì.

## 2. Đối tượng phục vụ

- Người dân.
- Công nhân và người lao động.
- Học sinh, sinh viên.
- Giáo viên và người làm công tác giáo dục.
- Người nghiên cứu, người viết nội dung.
- Cán bộ, chiến sĩ và các đối tượng thuộc lực lượng vũ trang theo phạm vi được phép.
- Các tổ chức, nhóm học tập và cộng đồng chuyên môn.

# II. ĐỊNH HƯỚNG PHÁT TRIỂN NỀN TẢNG

HTS được xây dựng theo mô hình nền tảng học tập số đa lĩnh vực.

Mỗi lĩnh vực có thể có các chuyên mục, nhóm học tập, bài học, tài liệu, tin tức và hoạt động riêng.

Người dùng có thể đăng ký một hoặc nhiều nhóm học tập. Quyền truy cập nội dung được xác định theo nhóm và lĩnh vực đã đăng ký, đồng thời chịu sự kiểm soát của hệ thống phân quyền.

## 1. Nguyên tắc tổ chức

- Một tài khoản có thể tham gia nhiều nhóm học tập.
- Mỗi nhóm thuộc một lĩnh vực hoặc phạm vi quản lý xác định.
- Nội dung phải được phân loại và gắn đúng lĩnh vực.
- Người dùng chỉ được truy cập nội dung phù hợp với quyền được cấp.
- Quản trị viên chỉ được thao tác trong phạm vi quyền hạn hợp lệ.
- Các hoạt động quản trị quan trọng phải có nhật ký.
- Không tự động cấp quyền quản trị chỉ dựa trên thông tin đăng ký.

## 2. Các nhóm nội dung định hướng

- Giáo dục và đào tạo.
- Kiến thức phổ thông.
- Công nghệ thông tin và trí tuệ nhân tạo.
- Khoa học và đời sống.
- Kỹ năng nghề nghiệp.
- Kiến thức pháp luật và công dân.
- Sức khỏe và an toàn.
- Kinh tế và sản xuất.
- Văn hóa và xã hội.
- Lĩnh vực dành cho lực lượng vũ trang theo phạm vi được phép.
- Các lĩnh vực khác được bổ sung trong quá trình phát triển.

Danh mục trên là định hướng tổ chức nội dung, không phải danh sách chức năng đã hoàn thiện.

# III. HỆ THỐNG TÀI KHOẢN VÀ PHÂN QUYỀN

HTS sử dụng mô hình phân quyền theo vai trò kết hợp phạm vi lĩnh vực, nhóm học tập và thời hạn được giao.

## 1. Super Admin – Quản trị viên tối cao

Super Admin là cấp quản trị toàn nền tảng.

Quyền hạn định hướng:

- Quản lý toàn bộ hệ thống.
- Quản lý tài khoản và hồ sơ người dùng.
- Tạo, khóa, mở khóa hoặc thu hồi quyền theo quy trình.
- Cấp quyền và thu hồi quyền Field Admin.
- Quản lý lĩnh vực và nhóm học tập.
- Giám sát hoạt động quản trị của các lĩnh vực.
- Theo dõi tình trạng phê duyệt thành viên và nội dung.
- Xem bảng tổng hợp quyền quản trị toàn hệ thống.
- Theo dõi nhật ký hoạt động.
- Xử lý các trường hợp vượt phạm vi hoặc có tranh chấp.
- Quản lý cấu hình và chính sách bảo mật.

Hệ thống dự kiến chỉ có một tài khoản Super Admin chịu trách nhiệm quản trị toàn nền tảng, việc khởi tạo tài khoản này phải thực hiện theo quy trình bảo mật riêng.

Không sử dụng tài khoản thử nghiệm hoặc mã định danh giả để tự động nâng quyền Super Admin.

## 2. Field Admin – Quản trị viên lĩnh vực

Field Admin chịu trách nhiệm quản lý lĩnh vực được Super Admin giao.

Quyền hạn:

- Quản lý nội dung trong lĩnh vực được phân công.
- Quản lý nhóm học tập thuộc phạm vi được giao.
- Xem xét và phê duyệt thành viên theo quyền được cấp.
- Duyệt bài viết, tài liệu và nội dung chuyên môn.
- Quản lý người viết nội dung trong lĩnh vực.
- Theo dõi hoạt động của các nhóm thuộc phạm vi quản lý.
- Đề xuất thay đổi cơ cấu nhóm.
- Báo cáo các vấn đề vượt thẩm quyền lên Super Admin.

Mỗi quyền quản trị cần xác định rõ lĩnh vực, phạm vi, thời hạn, trạng thái và người cấp quyền.

Field Admin không mặc nhiên có quyền quản trị toàn bộ nền tảng.

## 3. Trưởng nhóm – Group Leader

Trưởng nhóm quản lý hoạt động học tập trong nhóm được giao.

Quyền hạn định hướng:

- Quản lý hoạt động của nhóm.
- Theo dõi thành viên trong nhóm.
- Hỗ trợ người học.
- Tổ chức hoạt động học tập.
- Tiếp nhận phản ánh và đề xuất.
- Gửi đề xuất nội dung hoặc nhân sự đến Field Admin.

Trưởng nhóm không mặc nhiên có quyền:

- Cấp quyền quản trị.
- Xác minh chức vụ, quân hàm hoặc đơn vị.
- Xem dữ liệu ngoài phạm vi nhóm.
- Xuất dữ liệu thành viên toàn lĩnh vực.
- Sửa hoặc xóa nhật ký quản trị.
- Phê duyệt nội dung ngoài phạm vi được giao.

## 4. Member – Thành viên

Thành viên có thể:

- Đăng ký và quản lý tài khoản.
- Đăng ký tham gia nhiều nhóm học tập.
- Truy cập nội dung thuộc nhóm đã được chấp thuận.
- Đọc bài viết và tài liệu.
- Tham gia hoạt động học tập.
- Gửi câu hỏi, phản hồi và đóng góp nội dung.
- Theo dõi lịch sử học tập theo chức năng được triển khai.

# IV. QUẢN LÝ THÀNH VIÊN VÀ QUY TRÌNH PHÊ DUYỆT

HTS cần có quy trình đăng ký, xét duyệt và quản lý thành viên minh bạch.

## 1. Quy trình chung

1. Người dùng tạo tài khoản.
2. Người dùng hoàn thiện thông tin cần thiết.
3. Người dùng lựa chọn lĩnh vực hoặc nhóm muốn tham gia.
4. Hệ thống ghi nhận yêu cầu đăng ký.
5. Người có thẩm quyền xem xét.
6. Kết quả được thông báo cho người đăng ký.
7. Khi được chấp thuận, tài khoản được cấp quyền truy cập đúng phạm vi.

## 2. Quy trình đối với lĩnh vực lực lượng vũ trang

Việc xác minh và phân nhóm thành viên thuộc lĩnh vực lực lượng vũ trang phải tuân thủ quy trình riêng.

- Hồ sơ cần có xác nhận hoặc tài liệu của chỉ huy đơn vị theo quy định áp dụng.
- Sau khi có xác nhận, hồ sơ được chuyển đến Field Admin phụ trách.
- Super Admin được thông báo để giám sát.
- Field Admin hoặc Super Admin có thẩm quyền và quyền còn hiệu lực có thể xem xét phê duyệt.
- Một quyết định phê duyệt hợp lệ là đủ để hoàn thành bước chấp thuận theo quy trình.
- Trường hợp có ý kiến bất đồng phải ghi nhận, xử lý theo quy trình khiếu nại hoặc đình chỉ phù hợp.
- Không xóa lịch sử xét duyệt và quyết định trước đó.

Việc phân nhóm theo đơn vị phải được người có thẩm quyền xác nhận từng trường hợp. Không tự động ghép thành viên từ các đơn vị khác nhau.

Cấu trúc nhóm trên HTS chỉ phục vụ mục đích học tập và quản lý cộng đồng, không được dùng để suy diễn hoặc công khai sơ đồ tổ chức quân sự thực tế.

## 3. Đề xuất trưởng nhóm

Hệ thống có thể hỗ trợ đề xuất nhân sự dựa trên những thông tin được phép xác minh.

Đối với lĩnh vực lực lượng vũ trang, thứ tự xem xét định hướng:

1. Chức vụ đã được xác minh.
2. Cơ cấu ngành đã được xác nhận.
3. Quân hàm khi chức vụ và cấp trách nhiệm tương đương.
4. Tuổi đời khi các tiêu chí trách nhiệm tương đương.

Hệ thống chỉ đưa ra đề xuất, không tự động bổ nhiệm.

Đề xuất phải được gửi đến Field Admin và Super Admin để xem xét theo thẩm quyền. Người có thẩm quyền và quyền còn hiệu lực có thể phê duyệt.

Việc thay đổi trưởng nhóm, giữ người cũ làm hỗ trợ hoặc duy trì cơ cấu hiện tại phải do người phê duyệt quyết định. Không tự động chuyển người cũ thành phó nhóm.

# V. QUẢN LÝ NỘI DUNG VÀ BIÊN TẬP

HTS tổ chức nội dung theo lĩnh vực, chuyên mục và nhóm học tập.

## 1. Các loại nội dung

- Bài học.
- Bài viết chuyên môn.
- Tài liệu tham khảo.
- Tin tức.
- Hướng dẫn thực hành.
- Câu hỏi và bài tập.
- Nội dung truyền thông giáo dục.
- Tài liệu đa phương tiện.
- Nội dung do cộng đồng đóng góp.

## 2. Hai luồng biên tập độc lập

**Luồng 1 – AI hỗ trợ biên soạn**

- AI hỗ trợ tìm ý tưởng và xây dựng bản nháp.
- AI hỗ trợ chỉnh sửa, tóm tắt và trình bày.
- AI có thể đề xuất tiêu đề, chuyên mục và từ khóa.
- Nội dung AI tạo ra phải được người có thẩm quyền kiểm tra.
- AI không tự xuất bản nội dung.
- AI không tự xóa bài đã đăng.
- AI không tự thay đổi nội dung đã xuất bản.

**Luồng 2 – Biên tập thủ công**

- Người viết chủ động tạo nội dung.
- Nội dung được lưu thành bản nháp.
- Người có thẩm quyền kiểm tra và phê duyệt.
- Nội dung chỉ được xuất bản sau khi hoàn thành quy trình duyệt.

## 3. Quy trình xuất bản

1. Tạo nội dung.
2. Lưu bản nháp.
3. Gắn lĩnh vực và chuyên mục.
4. Gửi duyệt.
5. Field Admin đúng lĩnh vực kiểm tra.
6. Phê duyệt hoặc yêu cầu chỉnh sửa.
7. Xuất bản sau khi được duyệt.
8. Lưu lịch sử thay đổi và nhật ký.

Tin tức thu thập từ nguồn bên ngoài luôn phải ở trạng thái bản nháp để con người kiểm tra, xác minh và ghi nguồn trước khi phê duyệt.

Chỉ Field Admin có thẩm quyền trong lĩnh vực tương ứng mới được duyệt và xuất bản nội dung của lĩnh vực đó, trừ khi có quy định phân quyền khác được Super Admin phê duyệt.

# VI. QUY TRÌNH GỬI NỘI DUNG RA NGOÀI HỆ THỐNG

Việc gửi tài liệu hoặc nội dung ra ngoài HTS phải có quy trình kiểm soát.

Các bước:

1. Tạo yêu cầu gửi.
2. Xác định nội dung và mục đích.
3. Tạo bản trích yếu.
4. Xác định phiên bản tài liệu.
5. Xác định người nhận và kênh gửi.
6. Trình người có thẩm quyền phê duyệt.
7. Gửi đúng phiên bản và đúng người nhận đã được duyệt.
8. Lưu nhật ký gửi và kết quả thực hiện.

Nếu thay đổi nội dung, tệp, phiên bản, người nhận hoặc kênh gửi thì phải xem xét và phê duyệt lại.

Phê duyệt trên HTS không thay thế thẩm quyền phát hành chính thức của cơ quan, tổ chức hoặc đơn vị liên quan.

# VII. CÔNG NGHỆ VÀ KIẾN TRÚC HỆ THỐNG

## 1. Công nghệ nền tảng

| Thành phần | Công nghệ định hướng |
|---|---|
| Frontend | Next.js |
| UI | React |
| Ngôn ngữ | TypeScript |
| Backend | Next.js Server / Cloudflare Workers |
| Database | Cloudflare D1 |
| ORM / truy vấn dữ liệu | Lựa chọn theo kiến trúc triển khai |
| Triển khai Next.js trên Cloudflare | OpenNext Cloudflare Adapter |
| Quản lý mã nguồn | GitHub |
| Môi trường phát triển | Windows, VS Code, Node.js |
| Kiểm thử | TypeScript, ESLint, Build |
| AI | Tích hợp theo từng chức năng được phê duyệt |

Phiên bản Next.js mục tiêu cần được xác nhận tương thích với OpenNext Cloudflare Adapter trước khi triển khai.

## 2. Kiến trúc mục tiêu

HTS hướng tới mô hình:

**Người dùng → Giao diện Next.js → Backend/Cloudflare Workers → Cloudflare D1**

Trong đó:

- Giao diện tiếp nhận thao tác người dùng.
- Backend xử lý nghiệp vụ và xác thực.
- Backend kiểm tra quyền trước khi đọc hoặc ghi dữ liệu.
- D1 lưu trữ dữ liệu nghiệp vụ.
- Cloudflare Workers xử lý các yêu cầu phía máy chủ.
- Nhật ký hệ thống ghi nhận các thao tác quan trọng.

Không cho phép trình duyệt tự quyết định quyền quản trị hoặc truy cập trực tiếp dữ liệu nhạy cảm mà không qua kiểm tra phía máy chủ.

## 3. Định hướng chuyển đổi dữ liệu

Cloudflare D1 là cơ sở dữ liệu chính trong kiến trúc mục tiêu.

Supabase không tiếp tục là nền tảng cơ sở dữ liệu vận hành chính của HTS sau khi quá trình chuyển đổi hoàn tất.

Tuy nhiên:

- Không xóa dự án Supabase cũ trong giai đoạn chuyển đổi.
- Không tự ý xóa dữ liệu hoặc bảng cũ.
- Phải đối chiếu dữ liệu trước và sau khi chuyển đổi.
- Phải kiểm thử chức năng đọc, ghi và phân quyền.
- Chỉ gỡ các package hoặc mã Supabase sau khi đã thay thế và kiểm thử thành công.
- Phải có phương án sao lưu và khôi phục.

# VIII. CƠ SỞ DỮ LIỆU

Cloudflare D1 là nền tảng lưu trữ dữ liệu mục tiêu của HTS.

Cơ sở dữ liệu cần phục vụ các nghiệp vụ:

- Tài khoản và hồ sơ người dùng.
- Vai trò và quyền quản trị.
- Lĩnh vực và nhóm học tập.
- Đăng ký thành viên.
- Phê duyệt thành viên.
- Bài viết và tài liệu.
- Quy trình biên tập.
- Quản lý nội dung và xuất bản.
- Hoạt động học tập.
- Thông báo.
- Nhật ký hệ thống.
- Yêu cầu gửi tài liệu.
- Lịch sử xét duyệt.
- Thống kê và báo cáo.

## 1. Nguyên tắc thiết kế bảng

- Mỗi bảng có mục đích nghiệp vụ rõ ràng.
- Khóa chính và khóa ngoại phải được thiết kế phù hợp.
- Có trường thời gian tạo và cập nhật khi cần.
- Có trạng thái xử lý rõ ràng.
- Có liên kết giữa tài khoản, lĩnh vực và nhóm.
- Phân biệt dữ liệu người dùng với dữ liệu quản trị.
- Có chỉ mục phù hợp cho các truy vấn thường xuyên.
- Có cơ chế kiểm tra tính toàn vẹn dữ liệu.
- Có phương án sao lưu và phục hồi.

## 2. Nguyên tắc migration

- Không chạy migration phá hủy khi chưa đánh giá tác động.
- Không tự ý xóa bảng đang chứa dữ liệu.
- Migration phải có phiên bản và được lưu trong mã nguồn.
- Kiểm tra migration trên môi trường thử nghiệm trước.
- Ghi nhận kết quả thực hiện.
- Có kế hoạch khôi phục khi migration thất bại.

Các bảng hiện có trong D1 phải được kiểm tra và đối chiếu trước khi tạo bảng mới hoặc thay đổi cấu trúc.

# IX. XÁC THỰC VÀ BẢO MẬT

Bảo mật là yêu cầu bắt buộc trong toàn bộ quá trình phát triển.

## 1. Xác thực người dùng

Hệ thống định hướng hỗ trợ:

- Đăng ký tài khoản.
- Đăng nhập bằng email và mật khẩu.
- Đăng xuất.
- Quản lý phiên đăng nhập.
- Đổi mật khẩu.
- Khôi phục mật khẩu.
- Quản lý thông tin tài khoản.

Việc xác thực phải được xử lý an toàn phía máy chủ.

## 2. Bảo vệ tài khoản

- Không lưu mật khẩu dạng văn bản thuần.
- Sử dụng thuật toán băm mật khẩu phù hợp.
- Sử dụng cookie phiên đăng nhập có cấu hình bảo mật.
- Kiểm tra quyền ở backend.
- Có cơ chế giới hạn đăng nhập và chống thử mật khẩu hàng loạt.
- Có quy trình thu hồi phiên đăng nhập.
- Bảo vệ các thao tác thay đổi quyền.
- Không để lộ khóa bí mật trong mã nguồn công khai.

## 3. Phân quyền

Mỗi yêu cầu truy cập dữ liệu phải được kiểm tra:

- Người dùng đã đăng nhập hay chưa.
- Vai trò hiện tại.
- Lĩnh vực được giao.
- Nhóm được quản lý.
- Trạng thái tài khoản.
- Thời hạn quyền.
- Quyền cụ thể đối với thao tác đang thực hiện.

Ẩn nút trên giao diện không được xem là biện pháp phân quyền đầy đủ.

## 4. Bảo vệ dữ liệu

- Chỉ thu thập thông tin cần thiết.
- Giới hạn quyền truy cập theo mục đích.
- Có nhật ký thao tác quản trị.
- Có cơ chế sao lưu.
- Có quy trình xử lý sự cố.
- Không đưa dữ liệu nhạy cảm hoặc tài liệu nội bộ chưa được phép lên GitHub công khai.
- Không sử dụng dữ liệu thật để thử nghiệm khi chưa được phép.

Đối với dữ liệu quân sự, quân nhân, thông tin cơ yếu hoặc tài liệu thuộc phạm vi bảo vệ đặc biệt, phải tuân thủ quy định và thẩm quyền cho phép. HTS không được sử dụng để lưu trữ hoặc phát tán bí mật nhà nước, bí mật quân sự hay thông tin chưa được phép công bố.

# X. GIAO DIỆN VÀ TRẢI NGHIỆM NGƯỜI DÙNG

HTS định hướng giao diện:

- Hiện đại, dễ sử dụng.
- Tương thích điện thoại, máy tính bảng và máy tính.
- Có điều hướng rõ ràng.
- Hỗ trợ tìm kiếm nội dung.
- Phân loại nội dung theo lĩnh vực.
- Hiển thị nội dung theo quyền truy cập.
- Có trang quản trị riêng.
- Có thông báo trạng thái và kết quả thao tác.
- Tối ưu tốc độ tải trang.
- Có khả năng mở rộng các module mới.

# XI. CẤU TRÚC MÃ NGUỒN

Cấu trúc dự án được tổ chức theo hướng module hóa.

```text
HOC-TAP-SO-HTS/
│
├── app/                  # Trang và tuyến xử lý Next.js
├── components/           # Thành phần giao diện dùng chung
├── docs/                 # Tài liệu thiết kế và nghiệp vụ
├── lib/                  # Logic dùng chung, tiện ích
├── supabase/             # Thành phần cũ cần rà soát trong giai đoạn chuyển đổi
│
├── public/               # Tài nguyên tĩnh
├── .env.example          # Mẫu biến môi trường
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

Cấu trúc trên là mô tả các thư mục và tệp đã được ghi nhận trong dự án tại thời điểm cập nhật tài liệu. Khi bổ sung module Cloudflare, migration hoặc API, cần cập nhật lại cây thư mục theo cấu trúc thực tế.

Không xóa thư mục hoặc mã nguồn cũ chỉ vì chưa sử dụng. Phải rà soát quan hệ phụ thuộc trước khi loại bỏ.

# XII. QUY TRÌNH PHÁT TRIỂN VÀ KIỂM TRA MÃ NGUỒN

Dự án sử dụng GitHub để quản lý mã nguồn và VS Code để phát triển.

## 1. Quy trình làm việc

1. Mở dự án trên máy tính.
2. Kiểm tra nhánh Git hiện tại.
3. Đồng bộ mã nguồn mới nhất.
4. Phân tích cấu trúc và các thành phần liên quan.
5. Thực hiện thay đổi từng module.
6. Chạy kiểm tra TypeScript.
7. Chạy ESLint.
8. Chạy Build.
9. Khắc phục lỗi.
10. Kiểm tra lại các chức năng bị ảnh hưởng.
11. Commit thay đổi.
12. Push lên GitHub.
13. Triển khai thử nghiệm và kiểm tra sau triển khai.

## 2. Các lệnh phát triển trên Windows PowerShell

Cài đặt thư viện:

```powershell
npm.cmd install
```

Chạy môi trường phát triển:

```powershell
npm.cmd run dev
```

Kiểm tra TypeScript:

```powershell
npm.cmd run typecheck
```

Kiểm tra ESLint:

```powershell
npm.cmd run lint
```

Tạo bản Build:

```powershell
npm.cmd run build
```

Chạy các bước kiểm tra tổng hợp nếu script `check` đã được cấu hình:

```powershell
npm.cmd run check
```

**Lưu ý:** Nếu lệnh kiểm tra thất bại, cần đọc thông báo lỗi, xác định nguyên nhân và xử lý trước khi triển khai.

Không sử dụng `--force` hoặc `--legacy-peer-deps` để che giấu xung đột phiên bản thư viện.

# XIII. QUẢN LÝ MÃ NGUỒN VÀ PHIÊN BẢN

GitHub là nơi lưu trữ và quản lý mã nguồn dự án.

Nguyên tắc:

- Nhánh `main` là nhánh chính.
- Các thay đổi lớn nên thực hiện trên nhánh phát triển riêng.
- Không commit khóa bí mật hoặc thông tin đăng nhập.
- Mỗi lần commit cần có nội dung mô tả rõ ràng.
- Kiểm tra thay đổi trước khi merge.
- Không xóa lịch sử Git tùy tiện.
- Cần giữ khả năng quay lại phiên bản ổn định.

Các thay đổi về cơ sở dữ liệu phải đi kèm migration và tài liệu liên quan.

# XIV. LỘ TRÌNH PHÁT TRIỂN

## Giai đoạn 1 – Hoàn thiện nền tảng kỹ thuật

- Rà soát toàn bộ mã nguồn.
- Kiểm tra cấu hình Next.js và TypeScript.
- Nâng cấp phiên bản tương thích.
- Xây dựng cấu hình Cloudflare.
- Hoàn thiện kết nối Cloudflare D1.
- Kiểm tra môi trường phát triển và triển khai.

## Giai đoạn 2 – Hoàn thiện quản trị

- Xây dựng Super Admin.
- Xây dựng Field Admin.
- Hoàn thiện cơ chế phân quyền.
- Quản lý lĩnh vực và nhóm.
- Quản lý tài khoản.
- Quản lý thành viên.
- Xây dựng nhật ký quản trị.
- Xây dựng bảng tổng hợp quyền quản trị.

## Giai đoạn 3 – Hoàn thiện xác thực và thành viên

- Đăng ký.
- Đăng nhập.
- Đăng xuất.
- Quản lý phiên.
- Khôi phục mật khẩu.
- Đăng ký nhóm học tập.
- Phê duyệt thành viên.
- Kiểm soát quyền truy cập.

## Giai đoạn 4 – Hoàn thiện nội dung học tập

- Quản lý chuyên mục.
- Quản lý bài viết.
- Quản lý tài liệu.
- Quy trình biên tập.
- Quy trình duyệt bài.
- Xuất bản nội dung.
- Tìm kiếm và phân loại.

## Giai đoạn 5 – Tích hợp AI

- Hỗ trợ biên soạn.
- Hỗ trợ chỉnh sửa.
- Tóm tắt nội dung.
- Gợi ý phân loại.
- Kiểm tra nội dung.
- Quản lý bản nháp AI.
- Bảo đảm con người kiểm duyệt trước khi xuất bản.

## Giai đoạn 6 – Hoàn thiện các chức năng mở rộng

- Thống kê.
- Báo cáo.
- Thông báo.
- Hoạt động học tập.
- Tương tác cộng đồng.
- Quản lý đa lĩnh vực.
- Tối ưu hiệu năng.
- Sao lưu và phục hồi.

Các giai đoạn được triển khai tuần tự và chỉ được xác nhận hoàn thành khi có kiểm thử thực tế.

# XV. NGUYÊN TẮC QUẢN TRỊ VÀ VẬN HÀNH

HTS tuân thủ các nguyên tắc:

1. Đúng người, đúng quyền, đúng phạm vi.
2. Mọi quyền quản trị phải có căn cứ cấp quyền.
3. Không tự động nâng cấp quyền người dùng.
4. Không để AI tự quyết định xuất bản.
5. Nội dung phải có người chịu trách nhiệm.
6. Thao tác quan trọng phải có nhật ký.
7. Dữ liệu phải được bảo vệ và sao lưu.
8. Thay đổi cơ sở dữ liệu phải được kiểm soát.
9. Không xóa dữ liệu khi chưa đánh giá tác động.
10. Mọi chức năng phải được kiểm thử trước khi đưa vào vận hành.

# XVI. ĐỊNH HƯỚNG PHÁT TRIỂN LÂU DÀI

HỌC TẬP SỐ hướng tới trở thành nền tảng tri thức số đa lĩnh vực, hỗ trợ người dân và cộng đồng tiếp cận kiến thức, học tập thường xuyên và chia sẻ kinh nghiệm.

Dự án sẽ từng bước phát triển theo hướng:

- Hệ sinh thái học tập mở rộng.
- Quản lý nội dung tập trung.
- Quản trị đa cấp, đa lĩnh vực.
- Ứng dụng AI có kiểm soát.
- Dữ liệu tập trung, an toàn.
- Tích hợp các dịch vụ số phù hợp.
- Khả năng mở rộng quy mô người dùng và nội dung.

**HỌC TẬP SỐ – TRI THỨC CHO MỌI NGƯỜI, HỌC TẬP SUỐT ĐỜI.**

---

# XVII. LỊCH SỬ CẬP NHẬT TÀI LIỆU

| Phiên bản | Nội dung |
|---|---|
| 1.0 | Hình thành ý tưởng và giới thiệu dự án |
| 2.0 | Bổ sung các nhóm chức năng và định hướng quản trị |
| 3.0 | Tổng hợp yêu cầu nghiệp vụ và kiến trúc cập nhật |
| 4.0 | Chuẩn hóa mô hình phân quyền, quy trình nội dung, bảo mật và định hướng Cloudflare D1 |

**Tài liệu được cập nhật theo tiến độ phát triển thực tế.** Mọi thay đổi về kiến trúc, nghiệp vụ, cơ sở dữ liệu và phân quyền cần được phản ánh trong tài liệu dự án.
