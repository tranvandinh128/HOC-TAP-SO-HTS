# HỌC TẬP SỐ (HTS) -- DIGITAL LEARNING

## README DỰ ÁN -- BẢN TỔNG HỢP YÊU CẦU VÀ KIẾN TRÚC

**Phiên bản:** 5.0\
**Ngày cập nhật:** 26/11/2026\
**Trạng thái:** Tài liệu yêu cầu và định hướng kiến trúc. Không đồng
nghĩa các chức năng đã được lập trình, kết nối dữ liệu hoặc nghiệm thu.

> **Thông điệp:** TRI THỨC SỐ CHO MỌI NGƯỜI -- HỌC TẬP KHÔNG GIỚI HẠN --
> KẾT NỐI CỘNG ĐỒNG -- KIẾN TẠO TƯƠNG LAI.

------------------------------------------------------------------------

# PHẦN A -- NỀN TẢNG VÀ CÁC NGUYÊN TẮC ĐÃ CÓ

## 1. Giới thiệu dự án

**HỌC TẬP SỐ (HTS -- Digital Learning)** là hệ sinh thái học tập, đào
tạo, chia sẻ tri thức, kết nối cộng đồng và hỗ trợ quản lý hoạt động
theo lĩnh vực. Nền tảng hướng tới người dân, công nhân, sinh viên, học
sinh và lực lượng vũ trang; ưu tiên trải nghiệm điện thoại, đồng thời
tương thích máy tính và máy tính bảng.

### Mục tiêu

-   Phổ cập tri thức và thúc đẩy học tập suốt đời.
-   Cung cấp bài giảng, khóa học, tài liệu và thư viện số.
-   Hỗ trợ tự học, kiểm tra, đánh giá và theo dõi tiến độ.
-   Ứng dụng AI để hỗ trợ soạn thảo, OCR, trích xuất, tổng hợp và phân
    tích dữ liệu.
-   Xây dựng mạng xã hội học tập và cộng đồng chia sẻ tri thức.
-   Phát triển quản trị giáo dục, trường/lớp, nhóm học tập và báo cáo
    theo phân cấp.
-   Phát triển thương mại điện tử, Token HTS/Pi Network và các hoạt động
    cộng đồng theo lộ trình.
-   Bổ sung Trung tâm Báo cáo số dùng chung cho bảy lĩnh vực.
-   Bổ sung phân hệ Dân Cư Số để quản lý dữ liệu dân cư cấp thôn trong
    phạm vi được giao và được phép.

## 2. Bảy lĩnh vực chính thức của HTS

  ----------------------------------------------------------------------------
  STT               Mã lĩnh vực            Tên lĩnh vực      Quy định truy cập
  ----------------- ---------------------- ----------------- -----------------
  1                 `cong-dan`             Công dân học tập  Nội dung học tập
                                                             mở, miễn phí

  2                 `cong-nhan`            Công nhân học tập Nội dung học tập
                                                             mở, miễn phí

  3                 `sinh-vien`            Sinh viên học tập Cần tài khoản

  4                 `thpt`                 Học sinh THPT     Cần tài khoản

  5                 `thcs`                 Học sinh THCS     Cần tài khoản

  6                 `tieu-hoc`             Học sinh tiểu học Cần tài khoản

  7                 `luc-luong-vu-trang`   Lực lượng vũ      Cần tài khoản và
                                           trang (Quân đội   phê duyệt theo
                                           -- Công an)       quy định riêng
  ----------------------------------------------------------------------------

Công dân học tập và Công nhân học tập có thể truy cập nội dung học tập
mở mà không bắt buộc đăng nhập. Các chức năng cá nhân hóa, gửi báo cáo,
tham gia nhóm, lưu lịch sử hoặc tải lên tài liệu có thể yêu cầu tài
khoản và xác thực phù hợp. Một tài khoản có thể đăng ký nhiều lĩnh vực;
quyền và dữ liệu của từng lĩnh vực phải được phân tách đúng phạm vi.

**Lưu ý về báo cáo:** Quy tắc loại trừ Công dân học tập và Công nhân học
tập chỉ áp dụng đối với báo cáo quản lý giáo dục ở cấp trường/lớp/giáo
viên/học sinh và báo cáo ngành giáo dục. Không loại hai lĩnh vực này
khỏi Trung tâm Báo cáo số dùng chung hoặc khỏi HTS.

## 3. Các phân hệ cấp cao trên trang chủ

Các phân hệ cấp cao được tổ chức độc lập, không nhồi toàn bộ chức năng
vào một mục duy nhất. Danh mục dưới đây là phạm vi kiến trúc; thứ tự và
tên hiển thị cuối cùng cần đối chiếu giao diện hiện tại trước khi sửa:

1.  Trang chủ, giới thiệu và hướng dẫn.
2.  Bảy lĩnh vực học tập.
3.  Bài giảng, khóa học và thư viện số.
4.  Tin tức -- sự kiện.
5.  Mạng xã hội học tập.
6.  Sàn thương mại điện tử nhiều người bán.
7.  Token HTS / tích hợp Pi Network.
8.  Hoạt động cộng đồng và từ thiện.
9.  **Trung tâm Báo cáo số** -- phân hệ dùng chung cho bảy lĩnh vực.
10. **Dân Cư Số** -- phân hệ quản trị dữ liệu dân cư cấp thôn, có phạm
    vi và phê duyệt riêng.
11. Thống kê, doanh thu, chính sách phí và các tiện ích quản trị.
12. Hỗ trợ, bảo mật, nhật ký và sao lưu.

Trung tâm Báo cáo số và Dân Cư Số là hai phân hệ độc lập. Dân Cư Số
không phải lĩnh vực học tập thứ tám và không được tự động gộp dữ liệu
dân cư vào dữ liệu học tập.

## 4. Công nghệ và môi trường

Thông tin kỹ thuật theo hồ sơ sửa đổi ngày 25/11/2026 và tài liệu dự án:

- Framework ứng dụng: Next.js; hồ sơ nền ghi nhận 15.2.4, phần sửa đổi ngày 25/11/2026 nêu định hướng 15.5.29.
- Giao diện: React 19.
- Ngôn ngữ: TypeScript.
- CSS: Tailwind CSS 4 (cần đối chiếu cấu hình thực tế).
- Mã nguồn: GitHub, repository được ghi nhận là `tranvandinh128/HOC-TAP-SO-HTS`.
- Kiến trúc mục tiêu theo bản sửa đổi: Cloudflare Workers kết hợp Cloudflare D1 (SQLite), sử dụng OpenNext Cloudflare Adapter sau khi kiểm thử tương thích.
- Cloudflare Workers + D1 là backend chính thức duy nhất của HTS; không duy trì Supabase hoặc hai hệ thống database song song. Mã nguồn không kết nối Supabase. Không xóa hay thay đổi dự án/dữ liệu Supabase bên ngoài khi chưa xác minh và phê duyệt; trạng thái dữ liệu bên ngoài chưa được xác nhận.

**Điểm phải xác minh trước khi thay đổi:** Hai tài liệu ghi hai phiên bản Next.js khác nhau (15.2.4 và 15.5.29). README này ghi nhận 15.5.29 là định hướng cập nhật mới hơn trong hồ sơ ngày 25/11/2026, nhưng phiên bản đang chạy phải lấy trực tiếp từ `package.json`, lockfile và môi trường triển khai. Không tự nâng cấp chỉ vì README ghi phiên bản mục tiêu.

**Quy tắc database:** D1 là database ứng dụng duy nhất; chỉ truy cập qua Worker/server, không kết nối trình duyệt trực tiếp. D1 không thay thế xác thực hay authorization: các chức năng này phải được thực hiện phía máy chủ. Chưa xác nhận D1 production hoặc schema hiện hữu; không chạy migration lên production trước khi có thiết kế được duyệt, inventory, backup/restore và kế hoạch rollback.

Next.js là framework, không phải dịch vụ lưu trữ. Không tự thay đổi phiên bản Next.js, Workers, D1 hoặc adapter khi chưa kiểm tra tương thích và chạy thử.

## 5. Tài khoản, vai trò và quản trị nền tảng

### 5.1. Các vai trò nền tảng

-   `learner`: thành viên/người học; truy cập nội dung và chức năng theo
    lĩnh vực, nhóm và phân công.
-   `field_admin`: quản trị viên lĩnh vực; chỉ quản lý lĩnh vực, chức
    năng và phạm vi được Super Admin giao, còn hiệu lực.
-   `super_admin`: quản trị viên cấp cao toàn nền tảng; quản lý tài
    khoản, lĩnh vực, cấu hình và cấp/thu hồi quyền quản trị.

Các vai trò nghiệp vụ ở cấp trường, lớp, nhóm, thôn hoặc đơn vị là vai
trò theo phạm vi, không thay thế cơ chế phân quyền nền tảng. Một người
có thể có nhiều vai trò hợp lệ nhưng phải có phạm vi và thời hạn rõ
ràng.

### 5.2. Super Admin

-   Quản lý cấu hình và hoạt động toàn HTS.
-   Quản lý tài khoản và các lĩnh vực.
-   Phê duyệt, cấp, gia hạn, giới hạn, tạm khóa hoặc thu hồi quyền quản
    trị.
-   Phê duyệt người quản trị cấp cao của các phân hệ khi được quy định.
-   Theo dõi nhật ký và kiểm soát an toàn.
-   Không mặc định mọi quyền xem đều bao gồm quyền sửa, duyệt hoặc xuất
    dữ liệu.

Quy định một tài khoản Super Admin duy nhất trong tài liệu cũ cần được
đánh giá cùng phương án khôi phục, MFA và quản trị khẩn cấp trước khi
triển khai thực tế. Không tạo hoặc thay đổi tài khoản đặc quyền chỉ bằng
chỉnh sửa mã nguồn.

### 5.3. Quản trị viên lĩnh vực

-   Chỉ hoạt động trong lĩnh vực/phạm vi được cấp.
-   Quản lý nội dung, biểu mẫu, nhóm, thành viên và quy trình thuộc phạm
    vi được giao.
-   Không tự nâng quyền, không cấp quyền ngoài thẩm quyền, không truy
    cập lĩnh vực khác.
-   Quyền quản trị phải có trạng thái, thời hạn, lịch sử và khả năng thu
    hồi.

### 5.4. RBAC và phạm vi dữ liệu

Áp dụng kết hợp: - RBAC: vai trò. - Scope-based access: phạm vi lĩnh
vực, trường, lớp, nhóm, đơn vị hoặc thôn. - Granular permissions: quyền
chi tiết theo hành động.

Phân biệt rõ các hành động: xem, tạo, sửa, xóa, gửi, yêu cầu, rà soát,
xác nhận, duyệt, từ chối, xuất, tải xuống và quản trị thành viên. Kiểm
tra quyền ở server/API và database; ẩn nút trên giao diện không phải
biện pháp bảo mật. Mặc định từ chối khi thiếu quyền, sai phạm vi hoặc
không xác định được đối tượng.

## 6. Quản trị giáo dục và cấu trúc trường/lớp

Cấu trúc nghiệp vụ dự kiến:

**Ngành giáo dục → đơn vị quản lý được ủy quyền → trường → cơ sở/phân
hiệu → năm học → cấp học → khối → lớp → giáo viên/học sinh.**

-   Ban giám hiệu quản lý trường và cơ sở/phân hiệu trực thuộc đã được
    xác minh.
-   Giáo viên chỉ thao tác lớp, môn học, học sinh và năm học được phân
    công.
-   Một tài khoản có thể đồng thời là giáo viên và thành viên Ban giám
    hiệu; quyền được cộng hợp theo các phân công hợp lệ, không tạo tài
    khoản trùng.
-   Thành viên lớp được xác định theo hồ sơ và danh sách lớp đã được
    người có thẩm quyền xác nhận.
-   Khi kết thúc năm học, nhóm lớp được lưu trữ theo năm học; không trộn
    học sinh của các năm hoặc lớp khác nhau.
-   Việc chuyển lớp, chuyển trường, thôi học hoặc thay đổi vai trò phải
    có lịch sử hiệu lực.

### 6.1. Kiểm tra, chấm điểm và phê duyệt

1.  AI/OCR có thể đọc bài làm và đề xuất kết quả theo câu hỏi/tiêu chí,
    kèm căn cứ và độ tin cậy.
2.  Bài viết tay khó đọc, ảnh mờ, dữ liệu không khớp hoặc độ tin cậy
    thấp phải chuyển xác minh thủ công.
3.  Giáo viên được phân công rà soát, chỉnh sửa có lý do và xác nhận
    chuyên môn.
4.  Người được trường ủy quyền mới có quyền phê duyệt chính thức.
5.  Chỉ sau phê duyệt mới ghi nhận kết quả chính thức.
6.  Lưu giá trị cũ/mới, người thao tác, thời điểm và lý do.

AI hỗ trợ, không thay thế trách nhiệm chuyên môn hoặc người có thẩm
quyền.

## 7. Nội dung, AI và mạng xã hội học tập

-   Có hai luồng nội dung: AI hỗ trợ tạo bản nháp và người quản trị tự
    soạn.
-   AI chỉ nghiên cứu, soạn thảo, tóm tắt và chỉnh sửa bản nháp; không
    tự phê duyệt, xuất bản hoặc xóa nội dung đã xuất bản.
-   Nội dung từ nguồn bên ngoài phải giữ nguồn tham chiếu và ở trạng
    thái chờ người có thẩm quyền kiểm tra.
-   Lưu lịch sử phiên bản, nguồn, người tạo, người sửa, người duyệt và
    thời điểm.
-   Mạng xã hội học tập có thể gồm hồ sơ, bài viết, hình ảnh/video, bình
    luận, chia sẻ, kết bạn, nhóm, nhắn tin và gọi thoại/video theo lộ
    trình.
-   Có công cụ báo cáo vi phạm, kiểm duyệt nội dung, chặn người dùng và
    bảo vệ trẻ em.
-   Không để AI tự động công khai dữ liệu cá nhân hoặc thông tin chưa
    được xác minh.

------------------------------------------------------------------------

# PHẦN B -- PHÂN HỆ MỚI: TRUNG TÂM BÁO CÁO SỐ

## 8. Mục tiêu và vị trí

**Tên phân hệ:** TRUNG TÂM BÁO CÁO SỐ\
**Tên chức năng đầy đủ:** Hệ thống yêu cầu, thực hiện, kiểm duyệt, tổng
hợp và lưu nhật ký báo cáo theo phân cấp.

Đây là phân hệ cấp toàn nền tảng, hiển thị trên trang chủ HTS ngang hàng
với các phân hệ lớn như Mạng xã hội học tập, Token HTS và Sàn thương mại
điện tử. Không đặt bên trong riêng mục Học tập hoặc Quản trị.

Trung tâm Báo cáo số phục vụ cả bảy lĩnh vực. Khi thành viên truy cập,
hệ thống chỉ hiển thị lĩnh vực, nhóm, biểu mẫu và nhiệm vụ mà tài khoản
được phép sử dụng.

### Mục tiêu

-   Cho phép thành viên gửi yêu cầu thực hiện một nội dung học tập/công
    việc/báo cáo.
-   Sau khi yêu cầu được duyệt, thành viên mới được gửi báo cáo chính
    thức theo nội dung đã được chấp thuận.
-   Tự động tổ chức thành viên thành nhóm theo lớp, đơn vị hoặc cơ cấu
    được xác minh.
-   Hỗ trợ người phụ trách giao việc, theo dõi, phản hồi và duyệt.
-   Tổng hợp dữ liệu từ nhóm lên cấp quản lý theo phân quyền.
-   Tạo nhật ký hoạt động, lịch sử phiên bản và báo cáo thống kê.
-   Hỗ trợ nhập nội dung bằng bàn phím, hình ảnh, tệp tài liệu, âm
    thanh/video và AI hỗ trợ tổng hợp.

## 9. Bảy lĩnh vực báo cáo

Trung tâm Báo cáo số có bảy khu vực tương ứng đúng bảy lĩnh vực HTS:

1.  Công dân học tập.
2.  Công nhân học tập.
3.  Sinh viên học tập.
4.  Học sinh THPT.
5.  Học sinh THCS.
6.  Học sinh tiểu học.
7.  Lực lượng vũ trang.

Mỗi lĩnh vực có: - Danh mục chủ đề/nội dung có thể yêu cầu báo cáo. - Bộ
biểu mẫu riêng, có thể có nhiều mẫu và nhiều phiên bản. - Cơ cấu tổ chức
và nhóm riêng. - Cấp tiếp nhận, rà soát và phê duyệt riêng. - Kỳ báo
cáo, thời hạn, trạng thái và quy tắc tổng hợp riêng. - Quyền xem, sửa,
duyệt, xuất và lưu trữ riêng.

Không dùng một biểu mẫu cứng cho tất cả lĩnh vực. Quản trị lĩnh vực được
giao quyền có thể cấu hình biểu mẫu động theo trường dữ liệu, kiểu dữ
liệu, trường bắt buộc, tệp đính kèm và điều kiện hiển thị.

## 10. Quy trình bắt buộc: yêu cầu trước, báo cáo sau

**Nguyên tắc nghiệp vụ bắt buộc:** Trước khi gửi báo cáo chính thức về
bất kỳ nội dung nào, thành viên phải gửi yêu cầu về nội dung đó và chờ
người có thẩm quyền xem xét.

### 10.1. Bước 1 -- Chọn lĩnh vực và nội dung

Người dùng chọn lĩnh vực đang tham gia, chủ đề/nội dung cần thực hiện,
lớp/nhóm/đơn vị (hệ thống gợi ý từ hồ sơ đã xác minh), mục tiêu, thời
gian dự kiến và người nhận.

### 10.2. Bước 2 -- Gửi yêu cầu

Yêu cầu gồm tối thiểu: - Mã yêu cầu tự sinh. - Người gửi và lĩnh vực. -
Nhóm/lớp/đơn vị theo hồ sơ. - Chủ đề và mục đích. - Nội dung đề nghị
thực hiện hoặc báo cáo. - Thời gian/kỳ dự kiến. - Biểu mẫu hoặc tài liệu
tham chiếu nếu có. - Người/cấp tiếp nhận dự kiến. - Tệp đính kèm (nếu
cần).

### 10.3. Bước 3 -- Xem xét yêu cầu

Người phụ trách có thể: - Chấp thuận. - Từ chối và nêu lý do. - Yêu cầu
bổ sung/chỉnh sửa. - Chuyển đúng cấp/người xử lý nếu yêu cầu gửi sai
nơi.

Khi được chấp thuận, hệ thống tạo nhiệm vụ hoặc phiên báo cáo, mở đúng
biểu mẫu và thông báo thời hạn. Khi bị từ chối hoặc cần bổ sung, người
gửi nhìn thấy trạng thái và lý do.

### 10.4. Bước 4 -- Gửi báo cáo chính thức

Người dùng nhập nội dung theo biểu mẫu đã được duyệt, đính kèm tài liệu
và xác nhận trước khi gửi. Báo cáo được gắn với yêu cầu gốc; không cho
gửi báo cáo không có yêu cầu đã được duyệt, trừ trường hợp có quy trình
ngoại lệ được Super Admin cấu hình và ghi nhật ký.

### 10.5. Bước 5 -- Rà soát và phê duyệt

Báo cáo đi theo luồng đã cấu hình cho lĩnh vực: người phụ trách trực
tiếp → trưởng nhóm/đơn vị → quản lý cấp trên. Một số cấp có thể chỉ được
xem và theo dõi; quyền duyệt phải được cấp riêng.

Người duyệt có thể chấp thuận, trả lại để bổ sung, từ chối hoặc chuyển
cấp. Mỗi quyết định phải lưu người thực hiện, thời gian, lý do và phiên
bản báo cáo được xử lý.

### 10.6. Bước 6 -- Tổng hợp và lưu nhật ký

Khi báo cáo được gửi/duyệt, hệ thống cập nhật danh sách, thống kê và
nhật ký trong phạm vi được phép. Cấp trên xem được dữ liệu tổng hợp từ
cấp dưới theo quyền; không cần nhập lại dữ liệu gốc. Dữ liệu đã gửi được
lưu snapshot/phiên bản; chỉnh sửa tạo phiên bản mới, không ghi đè lịch
sử.

### 10.7. Báo cáo định kỳ

Có thể tạo một đợt/nhiệm vụ báo cáo định kỳ được duyệt trước, xác định
rõ đối tượng, nội dung, biểu mẫu, thời gian và người tiếp nhận. Mỗi lần
nộp vẫn phải liên kết với nhiệm vụ/đợt đã được duyệt và có dấu thời gian
riêng.

## 11. Tự động tạo nhóm và phân cấp

### 11.1. Nguyên tắc chung

-   Nhóm được tạo dựa trên hồ sơ, danh sách thành viên, phân công hoặc
    cơ cấu tổ chức đã được xác minh.
-   Không cho người dùng tự chọn một lớp/đơn vị để truy cập dữ liệu nếu
    chưa có tư cách thành viên được xác nhận.
-   Thành viên có thể thuộc nhiều nhóm nếu có nhiều phân công hợp lệ; dữ
    liệu từng nhóm phải tách phạm vi.
-   Mọi thay đổi thành viên, trưởng nhóm, nhóm phó và cấp quản lý phải
    lưu lịch sử.
-   Không gộp thành viên khác lớp/đơn vị chỉ vì tên gần giống hoặc cùng
    lĩnh vực.

### 11.2. Ví dụ học sinh trong lớp

-   Khi nhà trường/giáo viên tạo lớp và danh sách học sinh được xác
    nhận, HTS tự tạo nhóm lớp tương ứng với năm học.
-   Học sinh thuộc lớp nào được tự động đưa vào nhóm lớp đó.
-   Giáo viên chủ nhiệm được phân công chính thức là **Trưởng nhóm
    lớp**.
-   Trưởng nhóm có quyền tổ chức hoạt động, theo dõi yêu cầu và báo cáo
    của lớp trong phạm vi được giao.
-   Hệ thống có thể thống kê mức độ tham gia/tương tác của thành viên để
    **đề xuất** một ứng viên nhóm phó.
-   Người có mức độ tham gia tích cực đứng thứ hai có thể được đề xuất
    làm **Nhóm phó**, nhưng không tự động được cấp quyền chỉ dựa trên số
    lượt tương tác. Giáo viên chủ nhiệm/người có thẩm quyền phải xác
    nhận, kiểm tra tính phù hợp và phê duyệt.
-   Tiêu chí hoạt động phải minh bạch, chống spam và không tạo áp lực
    cạnh tranh không lành mạnh. Có thể xét mức độ hoàn thành nhiệm vụ,
    hỗ trợ bạn học, chất lượng đóng góp và sự ổn định, không chỉ đếm số
    lần nhấn hoặc bình luận.
-   Hết năm học, nhóm được lưu trữ; lớp mới tạo nhóm mới theo danh sách
    được xác nhận.

### 11.3. Ví dụ phân cấp lĩnh vực Lực lượng vũ trang

Ví dụ cấu trúc minh họa: Hải đoàn 128 → Hải đội 433 → Tàu 658. Khi một
thành viên được xác minh thuộc Tàu 658, báo cáo của người đó được phân
loại vào danh sách Tàu 658; cấp Hải đội và Hải đoàn được tổng hợp trong
phạm vi được cấp quyền.

Các đơn vị khác như Tàu 659 phải có danh sách riêng, không trộn với Tàu
658. Một báo cáo chỉ lưu một bản ghi gốc; cấp trên xem hoặc tổng hợp
theo tham chiếu, không nhân bản tùy tiện.

**Giới hạn đặc biệt:** Phân hệ Lực lượng vũ trang chỉ phục vụ hoạt động
học tập/báo cáo thông thường đã được phép. Không biến HTS thành hệ thống
chỉ huy, quản lý nhân sự quân đội, quản lý tác chiến hoặc kho lưu trữ bí
mật. Không đưa bí mật nhà nước, kế hoạch/tình hình tác chiến, vị trí,
năng lực hoặc dữ liệu quân sự nhạy cảm lên hạ tầng chưa được phê duyệt.

## 12. Biểu mẫu và các phương thức nhập liệu

### 12.1. Biểu mẫu động

Quản trị lĩnh vực được giao quyền có thể: - Tạo, sửa, sao chép, tạm dừng
và phát hành biểu mẫu. - Đặt mã, tên, mô tả, phiên bản và thời gian hiệu
lực. - Thêm trường văn bản, số, ngày, lựa chọn, nhiều lựa chọn, bảng,
tệp đính kèm và xác nhận. - Đánh dấu trường bắt buộc/không bắt buộc. -
Quy định đối tượng, đơn vị, kỳ báo cáo, hạn nộp và luồng duyệt. - Xem
trước biểu mẫu trên điện thoại và máy tính. - Không làm thay đổi nội
dung các báo cáo đã gửi theo phiên bản cũ.

### 12.2. Các phương thức đưa thông tin vào

-   Nhập trực tiếp bằng bàn phím.
-   Chụp ảnh hoặc tải ảnh lên.
-   Tải tệp PDF, Word, Excel, CSV và các định dạng được hệ thống cho
    phép.
-   Gửi âm thanh hoặc video nếu dung lượng, định dạng và chính sách lưu
    trữ cho phép.
-   Nhập danh sách có cấu trúc từ Excel/CSV.
-   AI hỗ trợ OCR, nhận dạng văn bản, trích xuất trường, chuyển giọng
    nói thành văn bản, tóm tắt video/tài liệu và đề xuất nội dung báo
    cáo.

### 12.3. Quy tắc AI

-   AI chỉ tạo bản nháp/đề xuất; người gửi phải kiểm tra và xác nhận
    trước khi nộp.
-   AI không tự phê duyệt yêu cầu, không tự duyệt báo cáo và không tự
    công bố dữ liệu.
-   Luôn giữ tệp gốc, nội dung trích xuất, kết quả AI, người xác nhận và
    thời điểm.
-   Nếu ảnh mờ, chữ không rõ, dữ liệu thiếu hoặc có mâu thuẫn, phải đánh
    dấu cần xác minh; không tự đoán để điền thành dữ liệu chính thức.
-   AI không tự suy luận chức vụ, tư cách thành viên, đơn vị hoặc quyền
    quản trị.
-   Không gửi dữ liệu cá nhân nhạy cảm đến dịch vụ AI bên ngoài nếu chưa
    có phê duyệt, căn cứ xử lý và biện pháp bảo vệ phù hợp.

## 13. Giao diện và chức năng chính

### 13.1. Trang Trung tâm Báo cáo số

-   Tổng quan báo cáo của tôi.
-   Gửi yêu cầu báo cáo.
-   Yêu cầu đang chờ xử lý.
-   Biểu mẫu được giao.
-   Báo cáo của tôi.
-   Nhóm/lớp/đơn vị của tôi.
-   Nhật ký hoạt động.
-   Thông báo và hạn nộp.

### 13.2. Trang người phụ trách/nhóm trưởng

-   Danh sách yêu cầu mới.
-   Yêu cầu chờ duyệt/bổ sung/từ chối.
-   Danh sách báo cáo cần rà soát.
-   Thành viên nhóm và trạng thái tham gia.
-   Tiến độ hoàn thành.
-   Nhật ký và thống kê.
-   Xuất/in danh sách trong phạm vi được phép.

### 13.3. Trang quản lý lĩnh vực

-   Quản lý chủ đề và biểu mẫu.
-   Quản lý nhóm/cơ cấu tổ chức.
-   Giao đợt báo cáo.
-   Cấu hình luồng duyệt.
-   Xem thống kê nhiều cấp.
-   Quản lý quyền người phụ trách.
-   Nhật ký, lịch sử phiên bản và xuất báo cáo.

### 13.4. Trạng thái tham khảo

`draft`, `submitted_request`, `pending_request_review`,
`approved_request`, `rejected_request`, `needs_revision`,
`reporting_open`, `submitted_report`, `pending_review`, `approved`,
`rejected`, `closed`, `archived`.

Tên trạng thái thực tế phải thống nhất trong API và database; không dùng
trạng thái giao diện làm căn cứ duy nhất cho phân quyền.

## 14. Thống kê, tổng hợp và in ấn

-   Cá nhân: báo cáo của bản thân.
-   Nhóm/lớp: danh sách thành viên, yêu cầu và báo cáo của nhóm.
-   Trường/đơn vị: tổng hợp các nhóm trực thuộc.
-   Cấp lĩnh vực: tổng hợp các đơn vị thuộc phạm vi.
-   Super Admin: thống kê toàn hệ thống theo quyền và mục đích được
    phép.

Hỗ trợ lọc theo lĩnh vực, chủ đề, biểu mẫu, kỳ, đơn vị, lớp, trạng thái
và thời gian. Hỗ trợ PDF, Excel/CSV khi được cấp quyền. Mỗi bản xuất
phải có người xuất, thời gian, bộ lọc/phạm vi và nhật ký. Không hiển thị
dữ liệu ngoài phạm vi chỉ vì người dùng có quyền tải file.

------------------------------------------------------------------------

# PHẦN C -- PHÂN HỆ MỚI: DÂN CƯ SỐ

## 15. Mục tiêu và vị trí

**Tên phân hệ:** DÂN CƯ SỐ\
**Phạm vi:** Hỗ trợ quản lý thông tin dân cư, hộ gia đình, thành viên và
các biến động hành chính ở cấp thôn theo thẩm quyền được xác nhận.

Dân Cư Số là phân hệ riêng trên HTS, không phải lĩnh vực học tập thứ tám
và không mặc định là cơ sở dữ liệu dân cư quốc gia. Hệ thống chỉ quản lý
dữ liệu mà đơn vị vận hành có căn cứ, thẩm quyền và mục đích hợp pháp để
xử lý.

Mục tiêu: - Tổ chức danh sách hộ gia đình và thành viên theo thôn. - Hỗ
trợ tra cứu, cập nhật và lập báo cáo trong phạm vi thôn được giao. - Hỗ
trợ nhập liệu từ bàn phím, ảnh, tài liệu, Excel/CSV và các nguồn được
phép. - Dùng OCR/AI để hỗ trợ trích xuất, phân loại và phát hiện dữ liệu
trùng/thiếu. - Lưu lịch sử thay đổi, người cập nhật, người xác nhận và
thời gian. - Giúp trưởng thôn theo dõi dữ liệu thuộc phạm vi được giao
và lập báo cáo quản lý. - Không thay thế cơ quan đăng ký, quản lý cư trú
hoặc cơ sở dữ liệu nhà nước có thẩm quyền.

## 16. Mô hình tổ chức và cấp quyền

### 16.1. Quản trị cao cấp Dân Cư Số

-   Được Super Admin HTS phê duyệt và giao phạm vi.
-   Quản lý cấu hình phân hệ, danh mục địa bàn và quy trình phê duyệt
    trưởng thôn.
-   Xem thống kê theo phạm vi được giao.
-   Không tự mở rộng quyền truy cập hoặc cấp quyền toàn quốc nếu chưa
    được Super Admin cho phép.

### 16.2. Trưởng thôn

-   Phải được quản trị cao cấp/Super Admin có thẩm quyền phê duyệt trước
    khi kích hoạt.
-   Chỉ quản trị thôn được giao, không mặc định xem thôn khác.
-   Quản lý danh sách hộ và thành viên trong phạm vi được cấp.
-   Tổ chức cán bộ hỗ trợ nhập liệu nếu được giao quyền.
-   Xem, yêu cầu cập nhật, xác nhận và lập báo cáo theo quyền.
-   Không tự cấp quyền quản trị cao hơn, không tự chuyển dữ liệu ra
    ngoài phạm vi.
-   Mọi quyền phải có thời hạn/trạng thái, người phê duyệt, căn cứ và
    nhật ký.

### 16.3. Cán bộ hỗ trợ nhập liệu

-   Chỉ được cấp các quyền cụ thể như nhập mới, đề xuất sửa, đính kèm
    tài liệu hoặc đối chiếu.
-   Không mặc định có quyền duyệt/xóa/xuất toàn bộ dữ liệu.
-   Các thay đổi quan trọng phải được trưởng thôn hoặc người được ủy
    quyền xác nhận.

### 16.4. Người dân/thành viên hộ

-   Có thể được cấp cổng tra cứu hoặc yêu cầu cập nhật thông tin của
    chính mình/hộ mình khi quy trình cho phép.
-   Không được xem thông tin cá nhân của hộ khác.
-   Có cơ chế gửi yêu cầu chỉnh sửa và theo dõi trạng thái.

## 17. Dữ liệu và nghiệp vụ Dân Cư Số

Các nhóm dữ liệu dự kiến, chỉ bật trường nào thực sự cần thiết và được
phép xử lý: - Địa bàn: tỉnh/thành, xã/phường, thôn/tổ dân phố theo danh
mục hiện hành. - Hộ gia đình: mã hộ nội bộ, địa chỉ, trạng thái và thông
tin liên hệ cần thiết. - Thành viên: mã thành viên nội bộ, họ tên và các
thuộc tính cần thiết cho mục đích quản lý đã được phê duyệt. - Quan hệ
thành viên -- hộ gia đình. - Biến động: chuyển đến/chuyển đi, thay đổi
thành viên, thay đổi địa chỉ hoặc sự kiện khác được phép ghi nhận. - Tài
liệu tham chiếu và nguồn nhập. - Nhật ký cập nhật, xác nhận, tra cứu và
xuất dữ liệu.

**Nguyên tắc dữ liệu:** Không dùng số CCCD làm khóa chính. Dùng mã định
danh nội bộ ngẫu nhiên; chỉ thu thập số định danh hoặc ảnh giấy tờ khi
có căn cứ pháp lý, thẩm quyền, mục đích rõ ràng và biện pháp bảo vệ
tương ứng. Không thu thập trường thông tin "cho đủ" nếu không cần.

## 18. Nhập dữ liệu từ căn cước, danh sách, ảnh và tệp

### 18.1. Quy trình nhập

1.  Người có quyền tạo một đợt nhập và chọn nguồn dữ liệu.
2.  Tải ảnh/tài liệu/danh sách lên vùng lưu trữ riêng, giới hạn quyền
    truy cập.
3.  OCR/AI đọc và trích xuất thông tin vào vùng dữ liệu tạm.
4.  Hệ thống chuẩn hóa định dạng, phát hiện trường thiếu, bản ghi nghi
    trùng và sai lệch.
5.  Hiển thị bản xem trước để người nhập đối chiếu với nguồn gốc.
6.  Người được giao xác nhận từng bản ghi hoặc từng lô theo quy trình.
7.  Chỉ dữ liệu đã xác nhận mới được ghi vào hồ sơ chính thức.
8.  Lưu nguồn, người nhập, người xác nhận, thời gian, phiên bản và nhật
    ký.

### 18.2. Các hình thức nhập

-   Nhập thủ công bằng bàn phím.
-   Chụp/tải ảnh giấy tờ nếu được phép.
-   Tải danh sách Excel/CSV.
-   Tải PDF/Word hoặc ảnh chụp danh sách.
-   AI hỗ trợ tách dòng, nhận dạng cột, chuẩn hóa và gợi ý ghép bản ghi.
-   Video/âm thanh chỉ dùng để trích xuất nội dung phục vụ nhập liệu khi
    phù hợp; không tự động biến mọi lời nói/hình ảnh thành hồ sơ chính
    thức.

### 18.3. Kiểm soát chất lượng

-   Không tự động xác nhận danh tính chỉ dựa trên OCR.
-   Không tự ghép hai người vì tên giống nhau.
-   Không ghi đè hồ sơ đã xác nhận khi phát hiện dữ liệu khác biệt.
-   Trường hợp mơ hồ phải đưa vào hàng đợi xác minh.
-   Giữ tệp nguồn theo chính sách lưu trữ đã được phê duyệt; xóa hoặc ẩn
    danh khi hết mục đích/thời hạn theo quy định.
-   Có cơ chế sửa sai và truy vết lịch sử.

## 19. Bảo vệ dữ liệu dân cư và giới hạn sử dụng

Dữ liệu định danh và thông tin hộ gia đình có mức độ nhạy cảm cao. Trước
khi triển khai thật cần xác định rõ căn cứ pháp lý, vai trò của đơn vị
vận hành, mục đích xử lý, quyền của chủ thể dữ liệu, thời hạn lưu trữ,
nơi lưu trữ và nhà cung cấp xử lý dữ liệu.

Bắt buộc: - Không công khai danh sách dân cư hoặc dữ liệu căn cước. -
Phân quyền theo địa bàn và nhiệm vụ; trưởng thôn chỉ truy cập thôn được
giao. - Mã hóa dữ liệu khi truyền và khi lưu; quản lý khóa an toàn. -
Lưu nhật ký xem, sửa, tìm kiếm, tải xuống, xuất và chia sẻ dữ liệu. -
Hạn chế xuất dữ liệu hàng loạt; yêu cầu lý do và quyền riêng. - Có MFA
cho tài khoản quản trị, thu hồi phiên đăng nhập và quy trình xử lý sự
cố. - Không dùng dữ liệu dân cư để quảng cáo, chấm điểm xã hội, giám sát
trái mục đích hoặc chia sẻ tùy tiện. - Không đưa ảnh căn cước, danh sách
dân cư hoặc dữ liệu thật lên GitHub, môi trường demo, công cụ AI công
cộng hay hệ thống chưa được phê duyệt. - Kiểm thử với dữ liệu giả lập
trước khi nhập dữ liệu thật. - Có quy trình sao lưu, khôi phục, lưu giữ
và xóa dữ liệu phù hợp.

**Giới hạn quan trọng:** Dân Cư Số của HTS là công cụ hỗ trợ quản lý nội
bộ trong phạm vi được phép; không được quảng bá hoặc thiết kế như hệ
thống thay thế Cơ sở dữ liệu quốc gia về dân cư hay hệ thống đăng ký cư
trú chính thức khi chưa có tích hợp và thẩm quyền hợp pháp.

------------------------------------------------------------------------

# PHẦN D -- KIẾN TRÚC DỮ LIỆU, BẢO MẬT VÀ TRIỂN KHAI

## 20. Nhóm bảng dữ liệu đề xuất

Tên bảng dưới đây là gợi ý thiết kế, **không xác nhận bảng đã tồn tại**.
Phải kiểm tra schema thực tế và quy ước đặt tên trước khi tạo migration.

### 20.1. Trung tâm Báo cáo số

-   `report_domains`: bảy lĩnh vực.
-   `report_org_units`: cây tổ chức theo lĩnh vực.
-   `report_memberships`: thành viên thuộc đơn vị/nhóm.
-   `report_groups`: nhóm lớp/nhóm công việc.
-   `report_group_members`: thành viên nhóm và vai trò.
-   `report_group_role_history`: lịch sử trưởng nhóm/nhóm phó.
-   `report_templates`: biểu mẫu và phiên bản.
-   `report_template_fields`: cấu trúc trường biểu mẫu.
-   `report_campaigns`: đợt/nhiệm vụ báo cáo.
-   `report_requests`: yêu cầu báo cáo trước khi nộp.
-   `report_request_reviews`: kết quả xem xét yêu cầu.
-   `report_submissions`: báo cáo chính thức.
-   `report_submission_versions`: lịch sử phiên bản.
-   `report_approvals`: rà soát và phê duyệt.
-   `report_attachments`: tệp đính kèm.
-   `report_ai_extractions`: kết quả OCR/AI, có liên kết nguồn.
-   `report_activity_logs`: nhật ký hoạt động.

### 20.2. Dân Cư Số

-   `civic_areas`: địa bàn và phạm vi quản lý.
-   `civic_village_admin_assignments`: trưởng thôn/người quản lý được
    giao.
-   `civic_households`: hồ sơ hộ.
-   `civic_residents`: hồ sơ thành viên.
-   `civic_household_members`: quan hệ người -- hộ.
-   `civic_residency_events`: biến động được phép ghi nhận.
-   `civic_import_jobs`: đợt nhập dữ liệu.
-   `civic_import_records`: bản ghi tạm/OCR chờ xác minh.
-   `civic_documents`: tài liệu tham chiếu, quyền truy cập riêng.
-   `civic_data_corrections`: yêu cầu chỉnh sửa và kết quả xử lý.
-   `civic_access_audit`: nhật ký xem/sửa/xuất dữ liệu.
-   `civic_retention_policies`: chính sách thời hạn lưu trữ nếu cần.

### 20.3. Các nguyên tắc database

-   Dùng khóa chính nội bộ ổn định, không dùng CCCD làm khóa chính.
-   Có `created_at`, `updated_at`, người tạo/cập nhật và trạng thái phù
    hợp.
-   Có foreign key, unique constraint, index và kiểm tra dữ liệu.
-   Tách dữ liệu tạm OCR khỏi dữ liệu đã xác minh.
-   Dùng snapshot/version cho báo cáo đã gửi.
-   Không xóa cứng lịch sử phê duyệt và nhật ký quan trọng.
-   Chính sách RLS hoặc cơ chế kiểm soát ở tầng server phải giới hạn
    đúng người, vai trò và phạm vi.
-   Không để người dùng tự gửi `user_id`, `unit_id`, `village_id`, vai
    trò hoặc trạng thái duyệt để tự cấp quyền; server phải xác minh từ
    nguồn tin cậy.

## 21. Bảo mật, nhật ký và sao lưu toàn HTS

-   Xác thực và phân quyền server-side.
-   RLS/policies nếu nền tảng database hỗ trợ; nếu không, phải có lớp
    kiểm tra quyền tương đương ở server.
-   Không lưu mật khẩu dạng văn bản thuần.
-   Không đưa `.env`, `.env.local`, service-role key, API key, token bí
    mật, wallet passphrase hoặc thông tin đăng nhập lên GitHub.
-   Không đưa dữ liệu cá nhân thật, danh sách học sinh/quân nhân/dân cư
    lên repository công khai.
-   Nhật ký các thao tác nhạy cảm: cấp quyền, đổi vai trò, xem/sửa/xuất
    dữ liệu, duyệt, từ chối, xóa/ẩn, đăng nhập bất thường.
-   Có kế hoạch backup/restore và kiểm tra phục hồi định kỳ.
-   Kiểm thử quyền bằng nhiều tài khoản thuộc các lớp/đơn vị/thôn khác
    nhau.
-   Có giới hạn tải tệp, kiểm tra loại tệp, quét mã độc phù hợp và URL
    tải xuống có thời hạn.
-   Thực hiện đánh giá quyền riêng tư và bảo mật trước khi dùng dữ liệu
    thật.

## 22. Sàn thương mại điện tử và Pi Network -- yêu cầu đang có

-   Định hướng mô hình nhiều người bán; cá nhân, hộ kinh doanh và doanh
    nghiệp đăng ký theo quy định.
-   Theo phương án đã ghi nhận trong README trước: sản phẩm hiển thị giá
    Pi và định hướng thanh toán bằng Pi; không triển khai COD hoặc
    chuyển khoản ngân hàng trong phương án đó.
-   Hai phương thức định giá dự kiến: giá Pi cố định hoặc giá Pi tham
    chiếu thị trường.
-   Với giá tham chiếu, lưu nguồn, cặp giao dịch, đơn vị, thời điểm và
    phương thức quy đổi. Khi nguồn lỗi hoặc quá hạn, không giả vờ hiển
    thị giá hiện tại.
-   Máy chủ xác minh mã giao dịch, trạng thái, số Pi, địa chỉ nhận và mã
    đơn trước khi xác nhận thanh toán.
-   Không yêu cầu hoặc lưu Pi Wallet Passphrase.
-   Token HTS/Pi Network là hạng mục nghiên cứu/triển khai riêng, cần
    xác minh điều kiện kỹ thuật, pháp lý và chính sách nền tảng.

## 23. Lộ trình triển khai đề xuất

Không triển khai đồng loạt tất cả phân hệ. Chia thành các giai đoạn có
kiểm thử và nghiệm thu.

### Giai đoạn 0 -- Rà soát nền tảng

1.  Kiểm kê repository, nhánh, commit, route, component, API và README.
2.  Xác định chính xác database đang chạy và môi trường triển khai.
3.  Đối chiếu schema, migrations, RLS/policies và backup.
4.  Lập danh sách chức năng đã có, đang làm, thiếu và lỗi.
5.  Không sửa hoặc xóa chức năng cũ khi chưa phân tích ảnh hưởng.

### Giai đoạn 1 -- Hoàn thiện lõi HTS

1.  Đăng ký/đăng nhập và hồ sơ.
2.  Đăng ký nhiều lĩnh vực.
3.  Vai trò, phạm vi và quyền quản trị.
4.  Cấu trúc trường/lớp/nhóm và phân công.
5.  Nhật ký và thông báo.

### Giai đoạn 2 -- Trung tâm Báo cáo số

1.  Trang chủ và trang tổng quan Trung tâm Báo cáo số.
2.  Cấu hình bảy lĩnh vực và cây tổ chức.
3.  Tự động tạo nhóm theo lớp/đơn vị đã xác minh.
4.  Vai trò trưởng nhóm/nhóm phó có đề xuất và phê duyệt.
5.  Quy trình yêu cầu trước -- duyệt yêu cầu -- mở biểu mẫu -- gửi báo
    cáo -- duyệt báo cáo.
6.  Biểu mẫu động và quản lý phiên bản.
7.  Nhập liệu đa phương thức, OCR/AI ở chế độ hỗ trợ.
8.  Nhật ký, thống kê, tổng hợp, in PDF và xuất Excel/CSV.
9.  Kiểm thử phân quyền chéo giữa lớp/đơn vị/lĩnh vực.

### Giai đoạn 3 -- Dân Cư Số

1.  Rà soát pháp lý, thẩm quyền và mục đích xử lý dữ liệu.
2.  Thiết kế cây địa bàn và phê duyệt quản trị cao cấp/trưởng thôn.
3.  Thiết kế hồ sơ hộ, thành viên và lịch sử biến động tối thiểu cần
    thiết.
4.  Tạo quy trình nhập thử bằng dữ liệu giả lập.
5.  OCR/AI trích xuất vào vùng chờ xác minh.
6.  Xây dựng kiểm tra trùng, đối chiếu, xác nhận và nhật ký.
7.  Kiểm thử giới hạn quyền giữa các thôn.
8.  Chỉ triển khai dữ liệu thật sau khi được phê duyệt và bảo đảm hạ
    tầng.

### Giai đoạn 4 -- Các phân hệ hệ sinh thái

1.  Bài giảng, thư viện, thi và đánh giá.
2.  Tin tức, sự kiện và mạng xã hội học tập.
3.  Marketplace và xác minh thanh toán Pi.
4.  Token HTS, từ thiện, doanh thu và chính sách phí.
5.  Các tiện ích AI và báo cáo mở rộng.

### Giai đoạn 5 -- Nghiệm thu

-   Kiểm thử chức năng, hồi quy, hiệu năng và bảo mật.
-   Kiểm thử phân quyền theo nhiều vai trò và phạm vi.
-   Kiểm thử sao lưu/khôi phục.
-   Kiểm thử import/export và dữ liệu trùng.
-   Kiểm thử AI/OCR với dữ liệu giả lập, đo lỗi và có bước xác nhận
    người dùng.
-   Chỉ đánh dấu hoàn thành sau khi có bằng chứng chạy thử và được người
    phụ trách chấp thuận.

## 24. Quy tắc làm việc với mã nguồn và README

-   Một repository chính thức trên GitHub.
-   `main` là nhánh ổn định; không thử nghiệm trực tiếp trên `main`.
-   Tiếp tục dùng nhánh tính năng phù hợp; trước khi tạo nhánh mới phải
    kiểm tra nhánh đang có và trạng thái PR.
-   Trước khi sửa phải đọc file hiện tại, xác định đúng đường dẫn và
    kiểm tra ảnh hưởng.
-   Không ghi đè/xóa chức năng cũ khi chưa có phân tích và đồng ý.
-   Chia công việc thành các commit nhỏ, có thông điệp rõ ràng.
-   Chạy lint, typecheck, build và kiểm thử liên quan sau mỗi nhóm thay
    đổi.
-   Không chạy SQL/migration khi chưa đối chiếu schema thực tế và có
    backup.
-   Không đưa dữ liệu thật hoặc bí mật lên GitHub.
-   README là tài liệu nguồn tổng hợp yêu cầu, kiến trúc, trạng thái và
    lộ trình. Khi có thay đổi được chấp thuận, cập nhật README đồng bộ
    với mã nguồn.
-   Mỗi chức năng phải ghi rõ trạng thái: `Đề xuất`,
    `Đã thống nhất yêu cầu`, `Đang thiết kế`, `Đang phát triển`,
    `Đã kiểm thử`, `Đã nghiệm thu`. Không đánh dấu hoàn thành chỉ vì có
    giao diện hoặc file mã nguồn.

## 25. Bảng trạng thái tại phiên bản 5.0

  -----------------------------------------------------------------------
  Hạng mục                            Trạng thái tài liệu
  ----------------------------------- -----------------------------------
  HTS và bảy lĩnh vực                 Đã có trong README nền

  Next.js 15.2.4 / React 19 /         Được ghi nhận; cần đối chiếu
  TypeScript                          repository hiện tại

  Super Admin / Field Admin / learner Yêu cầu nền đã có

  Quản trị trường, giáo viên, học     Yêu cầu nền đã có; cần kiểm tra mã
  sinh, lớp                           nguồn

  AI hỗ trợ nội dung và chấm điểm     Yêu cầu nền đã có; chưa xác nhận
                                      vận hành

  Trung tâm Báo cáo số cho bảy lĩnh   Bổ sung trong README 4.0; chưa xác
  vực                                 nhận đã lập trình

  Yêu cầu trước khi gửi báo cáo       Bổ sung trong README 4.0; chưa xác
                                      nhận đã lập trình

  Tự tạo nhóm lớp, giáo viên chủ      Bổ sung trong README 4.0; cần thiết
  nhiệm là trưởng nhóm                kế và phê duyệt

  Đề xuất nhóm phó theo mức độ tham   Bổ sung trong README 4.0; chưa
  gia, có người xác nhận              triển khai

  Biểu mẫu động, nhập đa phương thức  Yêu cầu thiết kế; chưa xác nhận
  và AI hỗ trợ                        tích hợp

  Nhật ký, tổng hợp, in PDF/Excel     Yêu cầu thiết kế; cần kiểm tra mã
                                      nguồn

  Dân Cư Số                           Phân hệ mới đề xuất; chưa xác minh
                                      pháp lý, hạ tầng hoặc triển khai

  Phê duyệt quyền trưởng thôn         Yêu cầu mới; chưa triển khai

  OCR căn cước/danh sách              Chỉ là yêu cầu hỗ trợ có điều kiện;
                                      cần phê duyệt và kiểm soát dữ liệu

  Môi trường và schema D1 thực tế  Chưa xác minh; không tự ý thay đổi

  RLS/server authorization và         Cần rà soát và kiểm thử
  backup/restore                      

  Marketplace, Pi, Token HTS          Yêu cầu nền theo README cũ; chưa
                                      xác nhận vận hành

  Kiểm thử bảo mật và nghiệm thu toàn Chưa hoàn thành
  hệ thống                            
  -----------------------------------------------------------------------

## 26. Các điểm cần xác nhận trong lần rà soát tiếp theo

Các mục dưới đây được giữ mở, không tự suy đoán: 1. Tên chính thức và
thứ tự các phân hệ trên trang chủ hiện tại. 2. Database thực tế và môi
trường production/test. 3. Cơ cấu tổ chức, chức danh và luồng duyệt
riêng của từng lĩnh vực. 4. Tiêu chí đề xuất nhóm phó và người phê duyệt
cuối cùng. 5. Danh mục biểu mẫu hiện có, đặc biệt hai mẫu báo cáo Lực
lượng vũ trang. 6. Phạm vi dữ liệu Dân Cư Số được phép thu thập và đơn
vị có thẩm quyền vận hành. 7. Nền tảng lưu trữ tệp và dịch vụ AI/OCR
được phép dùng. 8. Chính sách lưu trữ, xuất dữ liệu, đồng ý/thông báo và
xử lý yêu cầu của chủ thể dữ liệu. 9. Phạm vi triển khai thực tế của
từng giai đoạn.

------------------------------------------------------------------------

## NGUYÊN TẮC XUYÊN SUỐT

HTS là nền tảng học tập và hệ sinh thái cộng đồng có phân quyền. Mọi
quyền phải đúng vai trò, đúng phạm vi, đúng mục đích và có thể kiểm tra
lại. Quyền xem không đồng nghĩa quyền sửa hoặc duyệt. AI hỗ trợ con
người, không thay thế người có thẩm quyền. Dữ liệu gốc, lịch sử và nhật
ký phải được bảo toàn. Trung tâm Báo cáo số dùng chung cho bảy lĩnh vực
nhưng mỗi lĩnh vực có quy trình và dữ liệu riêng. Dân Cư Số chỉ xử lý dữ
liệu trong phạm vi được phép, có phê duyệt, xác minh và bảo vệ thích
hợp. Mọi thay đổi database phải được kiểm kê, sao lưu, thử nghiệm và phê
duyệt trước khi thực hiện.

**HỌC TẬP SỐ (HTS) -- DIGITAL LEARNING**\
**TRI THỨC SỐ CHO MỌI NGƯỜI -- HỌC TẬP KHÔNG GIỚI HẠN -- KẾT NỐI CỘNG
ĐỒNG -- KIẾN TẠO TƯƠNG LAI.**

---

# PHẦN E -- ĐẶC TẢ BỔ SUNG ĐƯỢC HỢP NHẤT TỪ HỒ SƠ SỬA ĐỔI NGÀY 25/11/2026

Phần này hợp nhất các yêu cầu chi tiết trong tài liệu “ĐỀ TÀI HTS BẢN SỬA ĐỔI, CẬP NHẬT 25-11-2026”. Khi có điểm khác nhau giữa mô tả cũ và phần sửa đổi có ngày cập nhật mới hơn, áp dụng phần sửa đổi mới hơn về mặt yêu cầu nghiệp vụ; các điểm liên quan cấu hình đang chạy vẫn phải kiểm tra trực tiếp trong repository và môi trường thực tế.

## 27. Danh mục nội dung của bảy lĩnh vực học tập

### 27.1. Công dân học tập
- Hướng dẫn sử dụng dịch vụ công trực tuyến.
- Kỹ năng sử dụng nền tảng số và các tiện ích số.
- Tương tác an toàn, văn minh trên môi trường mạng.
- Bảo vệ thông tin cá nhân, nhận diện và phòng chống lừa đảo trực tuyến.
- Kiến thức pháp luật, đời sống, xã hội và kỹ năng công dân số.

### 27.2. Công nhân học tập
- Kiến thức chuyên môn và tay nghề.
- An toàn lao động và vệ sinh công nghiệp.
- Sử dụng máy móc, thiết bị hiện đại.
- Ứng dụng công nghệ và tự động hóa.
- Kỷ luật lao động, văn hóa doanh nghiệp.
- Kỹ năng quản lý, sáng kiến và cải tiến sản xuất.

### 27.3. Sinh viên học tập
- Kiến thức chuyên ngành.
- Ngoại ngữ, tin học.
- Kỹ năng nghiên cứu khoa học.
- Kỹ năng mềm, tư duy sáng tạo.
- Trí tuệ nhân tạo và ứng dụng công nghệ.
- Kỹ năng nghề nghiệp và khởi nghiệp.

### 27.4. Học sinh THPT
Dành cho lớp 10, 11, 12; các môn/nội dung gồm Toán, Ngữ văn, Ngoại ngữ, Vật lý, Hóa học, Sinh học, Lịch sử, Địa lý, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ, Giáo dục thể chất và nội dung giáo dục khác; ôn tập, kiểm tra và luyện thi tốt nghiệp THPT.

### 27.5. Học sinh THCS
Dành cho lớp 6, 7, 8, 9; gồm Toán, Ngữ văn, Ngoại ngữ, Khoa học tự nhiên, Lịch sử và Địa lý, Giáo dục công dân, Tin học, Công nghệ, Nghệ thuật, Giáo dục thể chất; ôn tập, kiểm tra và đánh giá kiến thức.

### 27.6. Học sinh tiểu học
Dành cho lớp 1 đến lớp 5; gồm Tiếng Việt, Toán, Ngoại ngữ, Đạo đức, Tự nhiên và Xã hội, Khoa học, Lịch sử và Địa lý, Tin học, Công nghệ, Âm nhạc, Mỹ thuật, Giáo dục thể chất và kỹ năng sống.

### 27.7. Lực lượng vũ trang (Quân đội – Công an)
- Giáo dục quân sự, nghiệp vụ và giáo dục chính trị trong phạm vi được phép.
- Công tác hậu cần, kỹ thuật.
- An toàn thông tin, an ninh mạng.
- Chuyển đổi số, công nghệ mới, đổi mới sáng tạo và ứng dụng AI.
- Các biểu mẫu nghiệp vụ thông thường đã được đơn vị có thẩm quyền cho phép, gồm đăng ký nhận quà công đoàn và đăng ký nhận quân trang theo phụ lục biểu mẫu.
- Không đưa bí mật nhà nước, bí mật quân sự, thông tin cơ yếu, kế hoạch/tình hình tác chiến, vị trí, năng lực hoặc tài liệu nghiệp vụ hạn chế lên HTS thông thường hay hạ tầng chưa được phê duyệt.

## 28. Trang chủ và danh mục chức năng toàn nền tảng

### 28.1. Nguyên tắc giao diện
- Giao diện hiện đại, thân thiện, ưu tiên điện thoại và tương thích máy tính/máy tính bảng.
- Các phân hệ cấp cao được tổ chức độc lập, có lối truy cập rõ ràng.
- Phần “Giới thiệu Tổ đề tài” được bố trí ở cuối nội dung trang chủ, ngay phía trên Footer; không đặt ở đầu trang.
- Thứ tự hiển thị thực tế phải đối chiếu giao diện đang chạy trước khi sửa.

### 28.2. Các phân hệ/chức năng toàn HTS
1. Trang chủ, giới thiệu và hướng dẫn.
2. Bảy lĩnh vực học tập.
3. Bài giảng, khóa học, tài liệu và thư viện số.
4. Thi trực tuyến, kiểm tra, chấm điểm và theo dõi tiến độ.
5. Tin tức và sự kiện.
6. Mạng xã hội học tập: hồ sơ, bài viết, hình ảnh/video, bình luận, chia sẻ, kết bạn, nhóm, nhắn tin, gọi thoại/video theo lộ trình.
7. Sàn thương mại điện tử nhiều người bán.
8. Token Học Tập Số (HTS) và định hướng Pi Network.
9. Hoạt động cộng đồng, từ thiện.
10. Trung tâm Báo cáo số.
11. Dân Cư Số (phân hệ riêng, không phải lĩnh vực học tập thứ tám).
12. Thống kê, doanh thu, chính sách phí, hỗ trợ, liên hệ, bảo mật, nhật ký và sao lưu.

### 28.3. Theo dõi học tập
Đối với người dùng có tài khoản, lưu lịch sử bài học, kết quả kiểm tra/đánh giá, tiến độ hoàn thành, thời gian học, sự tiến bộ và khả năng xem lại nội dung. Với Công dân học tập và Công nhân học tập truy cập mở không tài khoản, có thể lưu cục bộ trên thiết bị hoặc bổ sung cơ chế nhận diện tự nguyện khi có nhu cầu và phù hợp chính sách.

## 29. Mô hình tài khoản: một tài khoản, hai chức năng, ba cấp quyền

### 29.1. Một tài khoản dùng lâu dài
- Mỗi người dùng có một tài khoản cá nhân duy nhất.
- Tài khoản dùng chung cho chức năng học tập và chức năng quản trị lĩnh vực nếu được cấp.
- Người dùng đăng ký một lần, đăng nhập lại bằng tài khoản cũ; không phải đăng ký lại mỗi lần truy cập.
- Hồ sơ, lịch sử học tập và kết quả học tập được lưu độc lập với quyền quản trị.
- Khi quyền quản trị hết hạn hoặc bị thu hồi, tài khoản và chức năng học tập vẫn hoạt động theo điều kiện truy cập của từng lĩnh vực.

### 29.2. Ba cấp quyền
1. **Người học (`learner`):** học tập theo lĩnh vực đã đăng ký và phạm vi được phép; không có quyền quản trị hệ thống.
2. **Quản trị viên lĩnh vực (`field_admin`):** dùng chính tài khoản người học; chỉ quản trị lĩnh vực, nhóm nội dung, hành động và dữ liệu được Super Admin phê duyệt giao.
3. **Quản trị cấp cao (`super_admin`):** quản lý con người, quyền quản trị và cấu hình toàn nền tảng; có quyền cấp, gia hạn, điều chỉnh, tạm khóa và thu hồi quyền quản trị.

### 29.3. Chu kỳ quyền Field Admin
- Quyền quản trị Field Admin có thời hạn theo gói 10, 30, 90 hoặc 365 ngày; thời hạn cụ thể gắn với tài khoản, vai trò, lĩnh vực/phạm vi và quyết định cấp quyền.
- Gói đã thanh toán không tự cấp quyền. Chỉ Super Admin được phê duyệt và kích hoạt grant; thời điểm bắt đầu tính hạn theo đề xuất tại mục 43.4 và phải được phê duyệt/cấu hình trước khi triển khai.
- Mỗi lĩnh vực có trạng thái và thời hạn riêng.
- Hết hạn thì quyền quản trị mất hiệu lực; tài khoản học tập không bị khóa.
- Người dùng gửi yêu cầu gia hạn; chỉ Super Admin được chấp nhận hoặc từ chối. Quy tắc cộng nối khi gia hạn và cách xử lý sau hết hạn phải theo cấu hình được công bố.
- Việc gia hạn không bắt buộc đổi tên đăng nhập/mật khẩu.
- Khi hết hạn, bị tạm khóa hoặc thu hồi, máy chủ phải từ chối thao tác quản trị mới; lịch sử quyết định vẫn được lưu.
- Email phê duyệt/gia hạn phải dùng liên kết xác thực an toàn, dùng một lần, có thời hạn và yêu cầu Super Admin xác thực; không gửi mật khẩu nguyên văn qua email.
- Địa chỉ email nhận yêu cầu và thông tin liên hệ hiển thị phải được cấu hình trong hệ thống, không hard-code vào nhiều nơi.

### 29.4. Super Admin duy nhất và an toàn vận hành
Hồ sơ nghiệp vụ đã thống nhất mô hình một tài khoản Super Admin duy nhất, không có thời hạn và không ai được tự nâng cấp thành Super Admin. Tài khoản Super Admin tối cao duy nhất của chủ dự án Trần Văn Dĩnh (`tranvandinh1281984@gmail.com`) được miễn phí quản trị vĩnh viễn; đây là ngoại lệ duy nhất không phải thanh toán Pi và không bị hết hạn quyền quản trị. Tất cả tài khoản quản trị khác, gồm Field Admin và mọi tài khoản được cấp quyền quản trị bổ sung, phải dùng gói có thời hạn và thanh toán Pi Network. Ngoại lệ phải gắn với đúng tài khoản Super Admin đã xác minh/khởi tạo, không suy ra từ role do client tự khai.

Đây là yêu cầu cần được triển khai cùng MFA, quy trình khôi phục tài khoản, kiểm soát khẩn cấp và nhật ký đặc quyền; không tạo hoặc thay đổi tài khoản đặc quyền chỉ bằng chỉnh sửa mã nguồn. Cần có phương án vận hành an toàn để tránh mất quyền quản trị toàn hệ thống nếu tài khoản duy nhất gặp sự cố.

## 30. Quản trị và tổ chức lĩnh vực Lực lượng vũ trang

### 30.1. Vai trò và trách nhiệm

| Vai trò | Quyền và phạm vi | Trách nhiệm/giới hạn |
|---|---|---|
| Super Admin | Quản lý con người và quyền quản trị toàn nền tảng; xem bảng tổng hợp quyền và nhật ký mọi lĩnh vực; phê duyệt thành viên toàn hệ thống. | Quản lý việc giao quyền, giám sát và xử lý vi phạm quyền; không mặc nhiên duyệt thay quyết định chuyên môn hằng ngày đã giao cho Field Admin. |
| Field Admin | Toàn quyền chuyên môn trong lĩnh vực/nhóm nội dung đã được Super Admin phê duyệt giao; xử lý thành viên, nội dung và hoạt động trong phạm vi. | Chủ động quyết định và chịu trách nhiệm trong phạm vi được giao; không tự mở rộng quyền. |
| Trưởng nhóm | Tổ chức, điều phối hoạt động học tập trong nhóm được giao. | Không tự xác minh chức vụ, quân hàm, đơn vị; không tự cấp quyền quản trị hoặc xuất danh sách nếu chưa có quyền riêng. |
| Thành viên/người học | Truy cập nội dung và nhóm theo lĩnh vực đã đăng ký, tư cách đã xác minh. | Khai báo đúng và tuân thủ quy định sử dụng. |

### 30.2. Bảng tổng hợp quyền của Super Admin
Trang quản trị cấp cao cần cho phép lọc theo lĩnh vực, quản trị viên, nhóm quyền, trạng thái và thời hạn. Mỗi quyết định giao quyền cần thể hiện:
- Lĩnh vực và nhóm nội dung.
- Tài khoản Field Admin.
- Hành động được cấp (ví dụ: duyệt thành viên, duyệt nội dung, duyệt yêu cầu gửi, quản lý nhóm).
- Người cấp và thời điểm cấp.
- Thời hạn, trạng thái (đang hiệu lực, tạm khóa, hết hạn, đã thu hồi).
- Nhật ký quyết định và lịch sử thay đổi.

### 30.3. Phê duyệt thành viên Lực lượng vũ trang
1. Người đăng ký gửi yêu cầu tham gia lĩnh vực/nhóm và chỉ khai báo dữ liệu được phép xử lý.
2. Nếu hồ sơ dựa trên danh sách đơn vị, xác nhận của chỉ huy đơn vị là điều kiện bắt buộc theo quy trình được đơn vị chấp thuận.
3. Sau xác nhận của chỉ huy, hồ sơ chuyển đến Field Admin phụ trách và đồng thời thông báo Super Admin.
4. Field Admin và Super Admin có thể xem xét; một người có quyền hợp lệ phê duyệt đồng ý là đủ theo quy trình đã thống nhất.
5. Nếu Field Admin chưa được cấp quyền duyệt thành viên hoặc quyền hết hạn/bị thu hồi, Field Admin chỉ được xem/đề xuất, không được duyệt.
6. Nếu có ý kiến trái chiều, phải ghi nhận và xử lý theo quy trình khiếu nại/đình chỉ đã cấu hình; không xóa lịch sử quyết định.
7. Sau khi hồ sơ được duyệt, tư cách thành viên mới được kích hoạt. Việc đưa vào nhóm cụ thể vẫn cần quản trị viên xác nhận.

### 30.4. Tổ chức nhóm Lực lượng vũ trang
- Nhóm HTS phải gắn với đơn vị/phạm vi đã được xác minh; không tự động trộn thành viên của đơn vị khác nhau.
- Có thể đề xuất xếp thành viên đã duyệt vào nhóm tương ứng, nhưng quản trị viên phải xác nhận trước khi kích hoạt.
- Ví dụ minh họa trong hồ sơ: Hải đoàn 128 → Hải đội 433 → Tàu 658. Tàu 659 và các đơn vị khác phải có danh sách riêng. Đây chỉ là ví dụ phân cấp báo cáo học tập; không phải công cụ mô phỏng hoặc công khai sơ đồ tổ chức quân sự.
- Một báo cáo chỉ có một bản ghi gốc; cấp trên xem/tổng hợp theo tham chiếu, không nhân bản tùy tiện.
- Trưởng nhóm chỉ quản lý thành viên và hoạt động thuộc nhóm; không tự xác nhận cấp bậc/chức vụ hoặc chuyển thành viên sang đơn vị khác.

### 30.5. Nguyên tắc đề xuất trưởng nhóm Lực lượng vũ trang
Thứ tự xem xét theo hồ sơ đã được xác minh:
1. **Chức vụ:** tiêu chí ưu tiên chính; chức vụ được xác minh cao hơn được xem xét trước.
2. **Cơ cấu ngành:** ghi nhận theo xác nhận được phép, ví dụ Tham mưu, Chính trị, Hậu cần, Kỹ thuật; không tự suy luận thứ bậc từ tên ngành.
3. **Quân hàm:** dùng để xem xét khi chức vụ/cấp trách nhiệm tương đương; quân hàm cao hơn nhưng chức vụ thấp hơn không tự động được ưu tiên.
4. **Tuổi đời:** tiêu chí phân định khi chức vụ và quân hàm tương đương theo dữ liệu xác minh.

Hệ thống chỉ tạo đề xuất, nêu căn cứ và dữ liệu còn thiếu, đồng thời thông báo Field Admin và Super Admin. Một người có quyền hợp lệ phê duyệt đồng ý là đủ. Người phê duyệt quyết định thay trưởng nhóm, giữ người cũ ở vai trò hỗ trợ/phó nhóm nếu phù hợp, hoặc giữ nguyên cơ cấu. Không tự động chuyển người cũ thành phó nhóm. Với lĩnh vực khác, hệ thống chỉ đề xuất ứng viên dựa trên hoạt động/đóng góp; quyết định cuối cùng do người có thẩm quyền phê duyệt.

### 30.6. Quyền trưởng nhóm
- Được tổ chức hoạt động và thông báo trong nhóm được giao.
- Chỉ xem dữ liệu tối thiểu cần thiết của thành viên trong phạm vi nhóm.
- Có thể đề xuất thành viên/đổi nhóm; quản trị viên có thẩm quyền xác nhận.
- Không mặc định được xác minh chức vụ, quân hàm, đơn vị.
- Không được cấp quyền Field Admin, sửa quyền Super Admin hoặc sửa/xóa nhật ký.
- Không mặc định được xuất danh sách/tải hồ sơ hàng loạt; cần quyền riêng, mục đích và phê duyệt.

### 30.7. Yêu cầu – trích yếu – phê duyệt – gửi nội dung ra ngoài HTS
1. Người gửi tạo yêu cầu, nêu mục đích, loại nội dung, người nhận và kênh gửi dự kiến.
2. HTS tạo bản trích yếu cho người duyệt, tối thiểu gồm loại nội dung, mục đích, phạm vi dữ liệu, số lượng/tệp, người nhận, căn cứ xác nhận và cảnh báo cần kiểm tra.
3. Yêu cầu được chuyển đến Field Admin phụ trách; Super Admin nhận thông tin giám sát theo cấu hình.
4. Người có quyền phê duyệt hợp lệ kiểm tra thẩm quyền phát hành, mục đích, người nhận, quyền sử dụng, dữ liệu cá nhân và điều kiện bảo vệ thông tin.
5. Hệ thống chỉ gửi đúng phiên bản nội dung, đúng người nhận và đúng kênh đã duyệt. Nếu nội dung, tệp hoặc người nhận thay đổi thì phải duyệt lại.
6. Lưu người yêu cầu, bản trích yếu, người duyệt, phiên bản nội dung/tệp, người nhận, thời điểm và kết quả gửi.
7. Phê duyệt trong HTS không thay thế thẩm quyền phát hành của cơ quan/đơn vị. HTS thông thường không tiếp nhận hoặc xử lý bí mật nhà nước, bí mật quân sự, thông tin cơ yếu, kế hoạch tác chiến hoặc tài liệu nghiệp vụ hạn chế.

## 31. Hai biểu mẫu Lực lượng vũ trang -- bảo toàn mẫu gốc

**Yêu cầu bảo toàn:** Hai mẫu dưới đây được lấy từ hai bảng gốc trong tài liệu người dùng tải lên. Không được xóa trường, tự ý đổi tên cột hoặc gộp hai mẫu thành một. Khi cần cải tiến giao diện, phải tạo phiên bản đề xuất riêng và giữ nguyên cấu trúc mẫu gốc để đối chiếu.

### 31.1. Phụ lục mẫu 01 -- Danh sách nhận quà công đoàn

Thông tin phần đầu mẫu:
- Đơn vị cấp trên.
- Đơn vị cấp dưới.
- Quốc hiệu: Cộng hòa Xã hội Chủ nghĩa Việt Nam.
- Tiêu ngữ: Độc lập – Tự do – Hạnh phúc.
- Tiêu đề: DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN.
- Dòng năm: DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN NĂM……

Các cột gốc được giữ nguyên theo nhóm:
- Thông tin người đăng ký: STT; Họ và tên; Cấp bậc; Chức vụ; Đơn vị; CCCD; SĐT.
- Nơi nhận: VPVT; Hải đội 433; Trạm Nghệ An; Hải Phòng (Hải đoàn).
- Thông tin người nhận hộ: Họ tên; Cấp bậc; Chức vụ; Đơn vị; SĐT; Địa chỉ.
- Ghi chú.
- Cuối danh sách có dòng “Tổng cộng”.

**Dòng cột theo đúng thứ tự của bảng gốc** (các cột “Nơi nhận” và “Thông tin người nhận hộ” là các nhóm cột trong mẫu Word):

```text
STT | Họ và tên | Cấp bậc | Chức vụ | Đơn vị | CCCD | SĐT | VPVT | Hải đội 433 | Trạm Nghệ An | Hải Phòng (Hải đoàn) | Họ tên người nhận hộ | Cấp bậc người nhận hộ | Chức vụ người nhận hộ | Đơn vị người nhận hộ | SĐT người nhận hộ | Địa chỉ người nhận hộ | Ghi chú
Tổng cộng
```

Quyền sử dụng: Người đăng ký thông thường chỉ được gửi thông tin và xem trạng thái hồ sơ của chính mình. Chỉ Quản trị cấp cao và tài khoản quản trị Lực lượng vũ trang được phê duyệt, cấp đúng quyền mới được xem danh sách tổng hợp, chỉnh sửa, tìm kiếm, tải hoặc xuất dữ liệu.

### 31.2. Phụ lục mẫu 02 -- Danh sách nhận quân trang

Thông tin phần đầu mẫu:
- Đơn vị cấp trên.
- Đơn vị cấp dưới.
- Quốc hiệu: Cộng hòa Xã hội Chủ nghĩa Việt Nam.
- Tiêu ngữ: Độc lập – Tự do – Hạnh phúc.
- Tiêu đề: DANH SÁCH TIÊU CHUẨN QUÂN TRANG NĂM.
- Dòng năm: DANH SÁCH NHẬN QUÂN TRANG NĂM…..

Các cột gốc được giữ nguyên theo nhóm:
- Thông tin người đăng ký: STT; Họ và tên; Cấp bậc; Chức vụ; Đơn vị; CCCD; SĐT; SĐT nhận hộ.
- Nơi nhận: VPVT; Hải đội 433; Trạm Nghệ An; Hải Phòng (Hải đoàn).
- Quân phục đông: cỡ số 3; cỡ số 4; cỡ số 5.
- Quân phục hè: cỡ số 3; cỡ số 4; cỡ số 5.
- Số mũ; Số giày; Đơn vị nợ quân trang năm; Ghi chú.
- Cuối danh sách có dòng tổng cộng.

**Dòng cột theo đúng thứ tự của bảng gốc** (các nhóm quân phục đông/hè giữ riêng từng cỡ):

```text
STT | Họ và tên | Cấp bậc | Chức vụ | Đơn vị | CCCD | SĐT | SĐT nhận hộ | VPVT | Hải đội 433 | Trạm Nghệ An | Hải Phòng (Hải đoàn) | Quân phục đông cỡ 3 | Quân phục đông cỡ 4 | Quân phục đông cỡ 5 | Quân phục hè cỡ 3 | Quân phục hè cỡ 4 | Quân phục hè cỡ 5 | Số mũ | Số giày | Đơn vị nợ quân trang năm | Ghi chú
Tổng cộng
```

Quyền sử dụng và bảo mật giống mẫu 01; việc xem, sửa, tổng hợp, tải và xuất phải được cấp riêng và ghi nhật ký.

### 31.3. Quy tắc dữ liệu và bảo mật hai biểu mẫu
- Chỉ triển khai trên môi trường lưu trữ được cơ quan/đơn vị có thẩm quyền cho phép.
- Không công khai danh sách; không đưa dữ liệu quân nhân thật lên GitHub công khai, môi trường demo hoặc dịch vụ AI chưa được phê duyệt.
- Kiểm soát quyền ở máy chủ và cơ sở dữ liệu; không chỉ ẩn nút/đường dẫn trên giao diện.
- Ghi nhật ký mọi thao tác xem, sửa, duyệt, tải xuống, xuất danh sách, thay đổi quyền và gửi dữ liệu.
- Người dùng thông thường chỉ xem hồ sơ do chính mình gửi và trạng thái xử lý; không xem danh sách tổng hợp của người khác.
- Chỉ thu thập trường thông tin được phép, đúng mục đích và thời hạn; CCCD không được dùng làm khóa chính.

## 32. Điểm danh, giám sát kiểm tra và chấm điểm

Các chức năng nâng cao chỉ triển khai sau khi hoàn thiện cơ sở dữ liệu, đăng nhập, phân quyền và quản trị; phải đánh giá quyền riêng tư, pháp lý, độ chính xác và khả năng thiết bị trước khi sử dụng dữ liệu thật.

### 32.1. Khu vực dữ liệu nội bộ
- Một tài khoản HTS không đồng nghĩa được truy cập khu vực nội bộ.
- Người dùng phải gửi yêu cầu; người có thẩm quyền phê duyệt; sau đó xác thực bổ sung.
- Quyền nội bộ cấp theo nhiệm vụ, tài liệu và thời hạn; có thể đình chỉ/thu hồi.
- Khu vực nội bộ tách biệt về kho tài liệu, quyền, nhật ký và sao lưu.
- Chỉ tiếp nhận tài liệu nội bộ thông thường đã được xác định là được phép lưu trên hạ tầng đã chọn; không đưa bí mật nhà nước hoặc tài liệu chưa được phân loại/phê duyệt lên hệ thống công cộng.
- Vai trò nội bộ dự kiến: `internal_viewer`, `internal_editor`, `internal_manager`, `security_auditor`, `internal_super_admin`. Các vai trò này độc lập với `learner`, `field_admin`, `super_admin`.
- Áp dụng MFA; mã hóa tài liệu; quản lý khóa độc lập; ghi nhật ký truy cập, xem, sửa, tải, xuất và thay đổi quyền.

### 32.2. Điểm danh nhận diện khuôn mặt
Phạm vi theo hồ sơ: Sinh viên, Học sinh THPT, THCS, Tiểu học và Lực lượng vũ trang; không yêu cầu điểm danh đối với Công dân học tập và Công nhân học tập.
- Sử dụng camera trên thiết bị phù hợp; chu kỳ dự kiến 10 phút/lần trong thời gian học, có thể cấu hình.
- Ghi nhận thời gian, kết quả và trạng thái nhận diện.
- Cho phép người có thẩm quyền xác minh lỗi thiết bị, ánh sáng, kết nối hoặc nguyên nhân khách quan.
- Thống kê chuyên cần theo cá nhân, lớp, khóa học và lĩnh vực trong phạm vi quyền.
- Dữ liệu khuôn mặt là dữ liệu sinh trắc học nhạy cảm; chỉ thu thập/xử lý khi có căn cứ pháp lý, thông báo, cơ chế đồng ý phù hợp và biện pháp bảo vệ. Với người chưa thành niên phải tuân thủ yêu cầu bảo vệ dữ liệu và quyền riêng tư.

### 32.3. Giám sát và cảnh báo trong kiểm tra/thi
Phạm vi: Sinh viên, Học sinh THPT, THCS, Tiểu học và Lực lượng vũ trang; không áp dụng bắt buộc cho Công dân học tập và Công nhân học tập.
- Ghi nhận dấu hiệu sao chép nội dung câu hỏi/bài thi khi trình duyệt và thiết bị có thể phát hiện.
- Ghi nhận hành vi dán nội dung từ nguồn bên ngoài khi có thể nhận biết.
- Theo dõi chuyển tab/rời cửa sổ làm bài nếu trình duyệt hỗ trợ.
- Ghi thời điểm, loại sự kiện và số lần cảnh báo; hiển thị cảnh báo cho người thi.
- Khi đủ 04 lần cảnh báo theo quy tắc được công bố, đánh dấu bài thi cần xem xét; người thi vẫn được tiếp tục làm bài.
- Sau bài thi, người có thẩm quyền kiểm tra nhật ký, xác minh và quyết định xử lý. Không tự động kết luận gian lận hoặc trừ điểm chỉ dựa trên cảnh báo kỹ thuật.
- Khả năng phát hiện phụ thuộc trình duyệt, hệ điều hành và thiết bị; không cam kết ngăn chặn tuyệt đối mọi hình thức gian lận.

### 32.4. Chấm điểm tự động
- Tự động chấm câu hỏi trắc nghiệm theo đáp án và thang điểm đã thiết lập.
- Tính điểm theo số câu đúng, trọng số và quy định từng bài.
- Tổng hợp kết quả theo người học, lớp, khóa học và lĩnh vực.
- Lưu kết quả, thời gian làm bài, lịch sử làm bài và sự kiện cảnh báo.
- Người có thẩm quyền được xem xét/điều chỉnh theo quy định; mọi điều chỉnh phải có người thực hiện, thời gian, lý do và nhật ký.
- Bài cần đánh giá chuyên môn không được tự động kết luận nếu chưa có quy trình chấm và phê duyệt.

### 32.5. Quản lý danh sách dự thi và tổng hợp điểm
Phạm vi: Sinh viên, Học sinh THPT, THCS, Tiểu học và Lực lượng vũ trang.
- Trước khi tham gia kỳ thi hoặc nhập danh sách phải có tối thiểu họ tên và số báo danh.
- Danh sách quản lý có thể gồm trường/đơn vị, lớp/nhóm, họ tên, số báo danh và mã kỳ thi/đợt thi.
- Số báo danh duy nhất trong phạm vi kỳ thi/đợt thi; không dùng số báo danh đơn lẻ để ghép giữa các kỳ thi khác nhau.
- Quản trị viên tải danh sách gốc Excel/CSV; hệ thống kiểm tra trường bắt buộc, định dạng, trùng lặp và dữ liệu thiếu.
- Kết quả được ghép ưu tiên theo số báo danh trong đúng kỳ thi, sau đó đối chiếu họ tên.
- Nếu số báo danh khớp nhưng họ tên khác, hoặc họ tên khớp nhưng số báo danh không khớp, phải cảnh báo và chờ xác minh; không tự động chốt điểm.
- Các ngoại lệ gồm: chưa có điểm, không có trong danh sách, sai lệch họ tên, sai lệch số báo danh, trùng số báo danh và cần xác minh.
- Tạo bảng kết quả dự kiến; quản trị viên xử lý cảnh báo và xác nhận trước khi chốt.
- Không ghi đè kết quả đã chốt nếu chưa có thao tác mở lại hoặc xác nhận cập nhật.
- Hỗ trợ xuất Excel/CSV và có thể bổ sung PDF theo mẫu được duyệt; lưu tệp nguồn, người nhập, thời điểm, số bản ghi khớp và ngoại lệ.

## 33. Sàn thương mại điện tử -- quy tắc giá và thanh toán Pi

### 33.1. Giá Pi bắt buộc
Tất cả sản phẩm đăng bán trên sàn HTS phải hiển thị giá bằng Pi (π). Giá Pi phải xuất hiện trên thẻ/danh sách sản phẩm, trang chi tiết, giỏ hàng, bước xác nhận đơn, lịch sử đơn hàng và trang quản lý đơn. Không được chỉ hiển thị giá VNĐ rồi yêu cầu người mua tự quy đổi. Nếu có giá VNĐ tham khảo, giá VNĐ không thay thế giá Pi.

### 33.2. Hai phương thức định giá
1. **Giá Pi cố định:** người bán hoặc quản trị viên có thẩm quyền nhập giá bán bằng Pi; không tự thay đổi theo giá tham chiếu.
2. **Giá Pi theo thị trường tham chiếu:** dùng dữ liệu cặp giao dịch Pi thực tế được OKX hỗ trợ tại thời điểm lấy dữ liệu; phải lưu nguồn, cặp giao dịch, đơn vị tiền, giá tham chiếu, phương thức quy đổi và thời điểm cập nhật.

Mỗi sản phẩm phải lưu phương thức định giá, giá Pi, người thiết lập và thời điểm cập nhật.

### 33.3. Dữ liệu quá hạn và lỗi nguồn giá
- Giá OKX chỉ là giá thị trường tham chiếu; không quảng bá là giá chính thức hoặc được Pi Core Team bảo đảm.
- Không sử dụng dữ liệu quá hạn như giá hiện tại.
- Nếu API/nguồn lỗi, dữ liệu không hợp lệ hoặc quá cũ, sản phẩm dùng giá tham chiếu phải cảnh báo và tạm ngừng xác nhận đơn theo giá đó cho đến khi có dữ liệu hợp lệ.
- Giá Pi cố định vẫn có thể tiếp tục sử dụng.
- Lưu giá áp dụng tại thời điểm tạo đơn để không làm thay đổi lịch sử khi thị trường biến động; quy định rõ đơn vị tiền, số chữ số thập phân và cách làm tròn.

### 33.4. Xác minh thanh toán
- Theo phương án đã thống nhất trong hồ sơ, đơn hàng thanh toán 100% bằng Pi; không triển khai COD hoặc chuyển khoản ngân hàng.
- Máy chủ xác minh mã giao dịch, trạng thái, số Pi, địa chỉ nhận và mã đơn/định danh liên quan trước khi xác nhận đã thanh toán.
- Không chấp nhận ảnh chụp màn hình hoặc dữ liệu do trình duyệt/người mua tự khai làm bằng chứng thanh toán.
- Lưu thông tin giao dịch cần thiết, trạng thái xác minh, thời gian và liên kết đơn hàng.
- Tuyệt đối không yêu cầu, thu thập hoặc lưu Pi Wallet Passphrase.

## 34. Token HTS, từ thiện, doanh thu và chính sách phí

### 34.1. Token HTS
- Tên: Học Tập Số.
- Ký hiệu: HTS.
- Tổng nguồn cung dự kiến trong hồ sơ ban đầu: 1.000.000 HTS.
- Cơ chế khai thác dự kiến: giảm dần theo từng giai đoạn.
- Nguồn bảo đảm giá trị dự kiến trong hồ sơ ban đầu: 150 Pi Network.
- Việc phát hành, phân phối, khai thác và sử dụng phải có quy chế công khai, minh bạch; xác định cơ chế quản lý nguồn bảo đảm và tuân thủ quy định pháp luật. Không mặc định HTS có giá trị quy đổi cố định khi chưa có cơ chế bảo đảm và xác nhận tương ứng.
- Token HTS/Pi Network là hạng mục nghiên cứu/triển khai riêng, không được xem là đã phát hành hoặc đang vận hành nếu chưa có bằng chứng.

### 34.2. Hoạt động từ thiện
- Hỗ trợ học sinh có hoàn cảnh khó khăn.
- Hỗ trợ người nghèo và các hoàn cảnh khó khăn.
- Hỗ trợ hoạt động giáo dục và cộng đồng.
- Công khai thông tin tiếp nhận và sử dụng nguồn đóng góp.
- Định hướng tiếp nhận đóng góp qua ví Pi Network dành cho hoạt động từ thiện cấp quốc gia trong tương lai; địa chỉ ví chỉ cập nhật sau khi được xác lập và xác minh.

### 34.3. Doanh thu và phí
Hồ sơ ban đầu nêu định hướng phân chia doanh thu thực thu từ hoạt động thương mại: 50% cho quỹ đóng góp vào ví Pi Network quốc gia theo cơ chế được công bố/xác nhận; 50% cho Tổ đề tài quản lý để tái đầu tư, duy trì và phát triển hoạt động. Việc phân chia phải căn cứ doanh thu thực tế, có sổ sách và báo cáo minh bạch.

Mức phí dự kiến trong hồ sơ ban đầu:
- Công dân học tập: miễn phí.
- Công nhân học tập: miễn phí.
- Sinh viên học tập: miễn phí.
- Học sinh các cấp: miễn phí.
- Lực lượng vũ trang: miễn phí.
- Đăng ký bán hàng: phí nền tảng dự kiến 0,001% tổng giá trị tiền hàng.
- Liên hệ cung cấp tài khoản học tập: miễn phí.

Mọi hoạt động học tập, bao gồm bài giảng, học liệu được phép, bài tập, kiểm tra, nộp bài, trợ lý AI giảng dạy, lớp/nhóm và theo dõi tiến độ, đều miễn phí; không áp dụng khoản phí tạo đề/kiểm tra để người học tiếp cận hoạt động học tập. Phí đăng ký bán hàng là phí dịch vụ thương mại, không phải điều kiện học tập. Gói quyền quản trị có phí và chỉ thanh toán Pi Network được quy định riêng tại mục 43.

Các mức phí thương mại, tỷ lệ doanh thu và cơ chế từ thiện còn lại là nội dung định hướng; phải được rà soát pháp lý, công bố minh bạch và phê duyệt trước khi áp dụng thực tế.

## 35. Nhóm bảng dữ liệu kỹ thuật bổ sung cần đối chiếu

Các tên dưới đây là tên bảng đề xuất được ghi trong hồ sơ, không xác nhận chúng đã tồn tại. Trước khi tạo migration phải kiểm tra schema D1 hiện có, khóa ngoại, dữ liệu, bảng trùng và phương án khôi phục.

### 35.1. Quản trị quyền và yêu cầu gửi nội dung
- `admin_permission_groups`
- `admin_permission_definitions`
- `admin_permission_grants`
- `admin_permission_audit`
- `content_submission_requests`
- `content_submission_summaries`
- `content_approval_records`
- `content_delivery_records`

### 35.2. Thành viên và nhóm Lực lượng vũ trang
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

### 35.3. Trạng thái nghiệp vụ tham khảo
- Yêu cầu tham gia: `draft`, `pending_unit_confirmation`, `pending_field_admin`, `approved`, `rejected`, `needs_revision`, `revoked`.
- Quyền quản trị: `pending`, `active`, `suspended`, `expired`, `revoked`.
- Yêu cầu gửi nội dung: `draft`, `pending_approval`, `needs_revision`, `approved`, `rejected`, `sending`, `sent`, `failed`, `revoked`.
- Đề xuất trưởng nhóm: `proposed`, `pending_review`, `approved`, `rejected`, `superseded`, `withdrawn`.
- Phân công trưởng nhóm: `active`, `ended`, `revoked`.

Tên trạng thái thực tế phải thống nhất trong API và database. Trạng thái giao diện không được dùng làm căn cứ duy nhất cho phân quyền.

## 36. Quy tắc triển khai và kiểm thử bổ sung

- Giữ nguyên chức năng hiện có khi chưa phân tích tác động và chưa được chấp thuận.
- Trước khi lập trình, đối chiếu đặc tả với toàn bộ bảng D1; lập danh sách bảng/cột cần giữ, bổ sung hoặc điều chỉnh.
- Chốt ma trận quyền Super Admin, Field Admin, trưởng nhóm và người học.
- Xây dựng xác thực server-side, phiên đăng nhập, kiểm tra quyền và nhật ký trước khi bật các chức năng duyệt.
- Dùng dữ liệu giả lập để kiểm thử quy trình yêu cầu thành viên, xác nhận đơn vị, phê duyệt, phân nhóm, đề xuất trưởng nhóm, gửi nội dung và gia hạn quyền.
- Kiểm thử cấp quyền, hết hạn, tạm khóa, thu hồi, truy cập chéo lĩnh vực/đơn vị và xuất dữ liệu.
- Chỉ đưa dữ liệu thật vào sau khi có phê duyệt của cơ quan/đơn vị có thẩm quyền và hoàn tất đánh giá bảo mật.
- Chạy lint, typecheck, build và kiểm thử hồi quy sau mỗi nhóm thay đổi.
- Mọi tính năng chỉ được chuyển trạng thái “Đã nghiệm thu” khi có bằng chứng kiểm thử và người phụ trách xác nhận.

---

# PHẦN F -- PHỤ LỤC BẢO TOÀN MẪU VÀ QUYẾT ĐỊNH NGHIỆP VỤ

## 37. Phụ lục biểu mẫu gốc và tài liệu đối chiếu

Hai bảng “DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN” và “DANH SÁCH NHẬN QUÂN TRANG” được bảo toàn trong tài liệu phụ lục Word đi kèm README này. Tài liệu phụ lục giữ nguyên bảng gốc, cấu trúc cột và các nhóm tiêu đề; README ghi lại toàn bộ danh mục trường để tiện triển khai biểu mẫu điện tử.

**Không xóa hai bảng gốc. Không thay đổi mẫu gốc khi chưa có xác nhận.** Nếu cần thêm trường, đổi tên hoặc thay đổi cách nhập, tạo phiên bản mới có số phiên bản và lưu liên kết với mẫu gốc.

## 38. Các quyết định nghiệp vụ cần giữ nhất quán

1. Một tài khoản người dùng dùng lâu dài cho học tập và quản trị khi được cấp; quyền quản trị tách biệt quyền học tập.
2. Một tài khoản có thể đăng ký nhiều lĩnh vực; dữ liệu và quyền của từng lĩnh vực phải được phân tách.
3. Chỉ Super Admin được cấp, gia hạn, điều chỉnh, tạm khóa và thu hồi quyền Field Admin.
4. Field Admin chỉ được quyết định chuyên môn trong đúng phạm vi quyền còn hiệu lực.
5. Trước khi gửi báo cáo chính thức phải có yêu cầu được duyệt; trước khi gửi nội dung/hồ sơ ra ngoài HTS phải có quy trình yêu cầu, trích yếu, phê duyệt và gửi đúng phiên bản.
6. AI hỗ trợ soạn thảo, OCR, tổng hợp và đề xuất; không tự cấp quyền, xác minh tư cách, phê duyệt, xuất bản hoặc thay thế người có thẩm quyền.
7. Trung tâm Báo cáo số phục vụ đủ bảy lĩnh vực; quy tắc loại Công dân/Công nhân khỏi báo cáo quản lý giáo dục không loại họ khỏi Trung tâm Báo cáo số chung.
8. Dân Cư Số là phân hệ riêng, không phải lĩnh vực học tập thứ tám; chỉ xử lý dữ liệu có căn cứ, thẩm quyền và mục đích hợp pháp.
9. Hai mẫu quà công đoàn và quân trang phải được giữ nguyên; dữ liệu thật chỉ cho người được cấp quyền cụ thể.
10. Dữ liệu lực lượng vũ trang, dữ liệu dân cư, dữ liệu trẻ em và dữ liệu sinh trắc học cần bảo vệ tăng cường; không đưa dữ liệu thật lên repository công khai hoặc dịch vụ chưa được phê duyệt.
11. Kiến trúc mục tiêu theo bản sửa đổi 25/11/2026 là Next.js + Cloudflare Workers + D1; phiên bản Next.js và trạng thái chuyển đổi dữ liệu phải xác minh trong mã nguồn/môi trường thực tế.
12. Không chạy migration, xóa bảng hoặc chuyển database khi chưa kiểm kê, sao lưu, kiểm thử và được phê duyệt.

## 39. Các điểm cần xác nhận trước khi triển khai

- Phiên bản Next.js thực tế trong `package.json`/lockfile: 15.2.4 hay 15.5.29.
- Môi trường D1 nào là production/test và schema/migrations nào đã tồn tại; trạng thái mọi tài nguyên Supabase bên ngoài vẫn chưa xác minh và không bị thay đổi.
- Danh sách bảng D1 thực tế, khóa ngoại, dữ liệu và migration hiện có.
- Cơ chế xác thực, phiên đăng nhập, MFA, kiểm tra quyền server-side và quy trình khôi phục Super Admin.
- Chính sách xử lý đơn quản trị đã thanh toán nhưng bị Super Admin từ chối, giao dịch sai/thiếu/thừa và hoàn tiền (nếu được hỗ trợ).
- Cấu hình hết hạn (hết hiệu lực ngay hay trạng thái chờ gia hạn), quy tắc cộng nối khi gia hạn và cách xử lý thanh toán đã xác minh nhưng đang chờ xét duyệt.
- Cơ quan/đơn vị có thẩm quyền cho phép lưu trữ và xử lý dữ liệu Lực lượng vũ trang, dân cư, sinh trắc học.
- Nguồn xác minh chức vụ, quân hàm, đơn vị; mẫu xác nhận của chỉ huy và phạm vi tệp được phép lưu.
- Người nhận, kênh gửi và loại nội dung được phép gửi qua HTS.
- Nền tảng lưu tệp, dịch vụ OCR/AI được phép dùng.
- Chính sách lưu trữ, xóa/ẩn danh, xuất dữ liệu, thông báo/đồng ý và xử lý yêu cầu của chủ thể dữ liệu.
- Quy trình duyệt, xử lý ý kiến trái chiều và khiếu nại khi Field Admin/Super Admin có quyết định khác nhau.
- Danh mục chức năng nào đã có mã nguồn, đang phát triển, chưa làm, đã kiểm thử và đã nghiệm thu.

## 40. Lịch sử phiên bản tài liệu

| Phiên bản | Nội dung |
|---|---|
| 4.0 | Bản README nền tổng hợp HTS, bảy lĩnh vực, Trung tâm Báo cáo số, Dân Cư Số, kiến trúc dữ liệu, bảo mật và lộ trình. |
| 5.0 | Hợp nhất README 4.0 với hồ sơ đề tài sửa đổi/cập nhật ngày 25/11/2026; bổ sung chi tiết quản trị tài khoản, Lực lượng vũ trang, hai mẫu biểu gốc, điểm danh/thi/chấm điểm, quản lý danh sách dự thi, giá Pi, Token, từ thiện, doanh thu, phí và định hướng Workers/D1; cập nhật hồ sơ chủ dự án, gói thời hạn, thanh toán Pi và thông báo hướng dẫn chức năng. |

**Ghi chú trạng thái:** README là tài liệu nguồn về yêu cầu và kiến trúc. Nội dung có trong README không tự chứng minh chức năng đã được lập trình, kết nối database, triển khai production hoặc nghiệm thu. Trạng thái phải được đối chiếu với mã nguồn, database, kiểm thử và môi trường đang vận hành.


## 42. Hồ sơ giới thiệu chủ dự án và đầu mối Quản trị cấp cao nhất

### 42.1. Nội dung hiển thị trên trang chủ
Trang chủ HTS cần có khu vực giới thiệu chủ dự án/đầu mối quản trị, với nội dung thống nhất sau:

| Trường thông tin | Nội dung |
|---|---|
| Họ và tên | Trần Văn Dĩnh |
| Địa chỉ | Thôn Tân Hưng, Thái Ninh, Hưng Yên |
| Số điện thoại | 0961256384 |
| Zalo | Trần Văn Dĩnh |
| Facebook | Trần Văn Dĩnh |
| Pi Network | `tranvandinh128` |
| Vai trò | Quản trị cấp cao nhất của HỌC TẬP SỐ |

Mục đích công khai thông tin:
- Để người dùng biết người phụ trách và đầu mối liên hệ của nền tảng.
- Để thành viên có thể liên hệ khi cần hỗ trợ, đề nghị tham gia lĩnh vực hoặc xin cấp quyền.
- Để tiếp nhận yêu cầu đăng ký làm quản trị viên lĩnh vực, gia hạn quyền và phản ánh sự cố.
- Tạo sự minh bạch về đầu mối quản trị và trách nhiệm hỗ trợ người dùng.

Thiết kế giao diện cần gọn, trang trọng, dễ đọc trên điện thoại và máy tính. Số điện thoại có thể là liên kết gọi điện; Zalo/Facebook là liên kết khi chủ dự án cung cấp URL chính xác. Không tự tạo URL giả định từ tên hiển thị.

### 42.2. Vai trò và quy trình tiếp nhận yêu cầu cấp quyền
- Chủ dự án được giới thiệu công khai là Quản trị cấp cao nhất của HTS.
- Các yêu cầu cấp mới, gia hạn, điều chỉnh, tạm khóa hoặc thu hồi quyền quản trị phải được xử lý bằng tài khoản Super Admin có xác thực.
- Người dùng gửi yêu cầu qua chức năng tương ứng; hệ thống tạo mã yêu cầu, ghi nhận tài khoản, lĩnh vực, phạm vi quyền đề nghị, thời hạn và thời điểm gửi.
- Super Admin xem xét, chấp thuận, từ chối hoặc yêu cầu bổ sung thông tin; mọi quyết định phải có thời gian và nhật ký.
- Thông tin giới thiệu trên trang chủ không tự nó cấp quyền. Quyền chỉ có hiệu lực sau khi được phê duyệt và ghi nhận ở máy chủ.
- Không cho phép người dùng tự chọn vai trò đặc quyền hoặc tự sửa trạng thái phê duyệt từ trình duyệt.

## 43. Quyền quản trị có phí, thời hạn và thanh toán Pi Network

### 43.1. Các gói thời hạn
Các gói dưới đây áp dụng cho mọi tài khoản được cấp quyền quản trị, gồm Field Admin và các quyền quản trị bổ sung, không phải học phí và không thay thế quyết định cấp quyền. Ngoại lệ duy nhất là tài khoản Super Admin tối cao của chủ dự án được miễn phí vĩnh viễn như mục 29.4. Các lựa chọn thời hạn:
- 10 ngày.
- 30 ngày.
- 90 ngày.
- 01 năm.

Giá gói được cấu hình tập trung, hiển thị trước khi người dùng xác nhận đăng ký và được Super Admin quản lý. Không tự ý thay đổi giá đã áp dụng cho giao dịch đã tạo.

### 43.2. Bảng giá các gói theo tỷ lệ thời hạn

Giá các gói được tính tỷ lệ thuận theo đơn giá gốc 10 ngày = **0,00314 π**. Cách tính: lấy 0,00314 π chia cho 10 ngày để có đơn giá mỗi ngày, sau đó nhân với số ngày sử dụng. Gói 01 năm được quy ước là 365 ngày.

| Thời hạn | Cách tính | Phí bằng Pi |
|---|---:|---:|
| 10 ngày | 0,00314 × 1 | **0,00314 π** |
| 30 ngày | 0,00314 × 3 | **0,00942 π** |
| 90 ngày | 0,00314 × 9 | **0,02826 π** |
| 01 năm (365 ngày) | 0,00314 × 36,5 | **0,11461 π** |

Các mức phí trên được tính theo cùng một đơn giá, không cộng thêm phụ phí theo thời hạn. Khi triển khai, hệ thống phải lưu giá áp dụng tại thời điểm người dùng tạo đơn; thay đổi cấu hình giá trong tương lai không làm thay đổi giao dịch đã xác nhận.

### 43.3. Phương thức thanh toán
- Chỉ nhận thanh toán bằng Pi Network (π) đối với các gói thời hạn nêu tại mục này.
- Không cung cấp lựa chọn COD hoặc chuyển khoản ngân hàng cho giao dịch mua/gia hạn quyền này.
- Trước khi thanh toán, người dùng phải nhìn thấy rõ gói thời hạn, số Pi phải trả, phạm vi quyền/dịch vụ được đăng ký và điều kiện áp dụng.
- Máy chủ xác minh giao dịch Pi thành công, đúng số tiền, địa chỉ nhận, mạng và đơn thanh toán. Xác minh thanh toán chỉ chuyển đơn sang trạng thái đã thanh toán/chờ xét duyệt; không tự kích hoạt hoặc gia hạn quyền.
- Chỉ Super Admin được phê duyệt và cấp/gia hạn quyền. Quyền chỉ có hiệu lực khi grant được kích hoạt với tài khoản, role, lĩnh vực/phạm vi và thời hạn cụ thể.
- Không xác nhận thanh toán chỉ dựa vào ảnh chụp màn hình hoặc thông tin do trình duyệt gửi lên.
- Không yêu cầu, thu thập hoặc lưu Pi Wallet Passphrase.
- Lưu mã giao dịch, gói đã mua, số Pi, thời điểm, trạng thái xác minh và liên kết với tài khoản; không lưu dữ liệu bí mật của ví.

### 43.4. Chu kỳ quyền và thời điểm bắt đầu
- Mỗi gói thời hạn phải gắn với một quyền/dịch vụ cụ thể, tài khoản, lĩnh vực/phạm vi và thời điểm bắt đầu/kết thúc.
- Đề xuất mặc định: thời hạn bắt đầu tại thời điểm Super Admin kích hoạt grant sau khi duyệt; thời gian chờ xét duyệt không làm giảm thời hạn đã mua. Chính sách này phải được cấu hình thống nhất và phê duyệt trước khi triển khai.
- Đề xuất mặc định: gia hạn được duyệt trước khi hết hạn thì cộng nối từ ngày hết hạn hiện tại; gia hạn sau khi hết hạn thì tính từ thời điểm kích hoạt grant mới. Mọi điều chỉnh phải theo chính sách được công bố và lưu lịch sử.
- Khi hết hạn, quyền quản trị mất hiệu lực ở máy chủ hoặc chuyển trạng thái chờ gia hạn theo cấu hình. Tài khoản, dữ liệu và quyền học tập miễn phí không bị xóa hoặc khóa theo.
- Hệ thống thông báo trước khi quyền hết hạn và cho phép gửi yêu cầu gia hạn.
- Các quyết định cấp, gia hạn, tạm khóa, thu hồi và hết hạn phải được ghi nhật ký.

### 43.5. Điều chỉnh giá Pi khi có chính sách giá cố định
Chủ dự án định hướng sau này khi HTS áp dụng một giá trị Pi cố định làm cơ sở quy đổi, thông số giá/cơ chế quy đổi sẽ được điều chỉnh trong trang cá nhân hoặc khu vực cấu hình quản trị phù hợp.

Yêu cầu triển khai an toàn:
- Chỉ Super Admin hoặc người được cấp quyền cấu hình giá mới được thay đổi giá trị Pi tham chiếu/chính sách quy đổi.
- Phải phân biệt **giá gói dịch vụ niêm yết trực tiếp bằng Pi** với **giá trị Pi dùng làm tham số quy đổi**; không tự động quy đổi nếu chưa xác định công thức và đơn vị.
- Lưu lịch sử giá trị cũ, giá trị mới, người thay đổi, thời điểm, lý do và thời điểm bắt đầu áp dụng.
- Thay đổi giá chỉ áp dụng cho giao dịch mới từ thời điểm hiệu lực; không sửa ngược số Pi của giao dịch đã thanh toán hoặc đơn đã xác nhận.
- Nếu giá gói được nhập trực tiếp bằng Pi thì giữ nguyên mức Pi cho đến khi Super Admin chủ động cập nhật.
- Giao diện phải hiển thị rõ giá đang có hiệu lực, thời điểm cập nhật và thông báo khi thay đổi.
- Không tự động lấy giá thị trường từ một nguồn không được phê duyệt để thay đổi giá gói.

### 43.6. Quản lý giao dịch và đối soát
Trạng thái thanh toán và trạng thái phê duyệt/cấp quyền là hai luồng riêng. Thanh toán có thể đi qua `created` → `pending_payment` → `verifying` → `paid`; trạng thái ngoại lệ gồm `expired`, `failed`, `cancelled` và `refunded` nếu chính sách hoàn tiền được phê duyệt. Sau khi thanh toán, yêu cầu quản trị ở trạng thái chờ Super Admin xét duyệt; grant chỉ chuyển thành `active` sau quyết định cấp quyền. Không dùng trạng thái thanh toán `paid` như bằng chứng quyền đã được cấp.

Mỗi đơn, giao dịch và lần xác minh cần liên kết và lưu tối thiểu:
- Mã giao dịch nội bộ và mã yêu cầu đăng ký.
- Tài khoản người mua.
- Gói thời hạn và quyền/dịch vụ tương ứng.
- Giá Pi áp dụng tại thời điểm tạo giao dịch.
- Mã giao dịch trên mạng Pi và thông tin xác minh cần thiết.
- Địa chỉ nhận đã cấu hình.
- Trạng thái và thời điểm thanh toán, xác minh, quyết định Super Admin, kích hoạt, hết hạn, thu hồi hoặc gia hạn.
- Lịch sử xử lý, người/cơ chế xác minh, người phê duyệt và lý do quyết định.

Các trạng thái trên là gợi ý thiết kế, phải được đối chiếu với tích hợp Pi Network được phê duyệt và quy trình nghiệp vụ trước khi lập trình. Không ghi passphrase, private key hoặc bí mật ví vào database, log hay audit. Thiết kế chi tiết: `docs/HTS_ADMIN_SUBSCRIPTION_AND_PI_PAYMENT_DESIGN.md`.

### 43.7. Học tập miễn phí, độc lập với quyền quản trị
Toàn bộ hoạt động học tập trong bảy lĩnh vực HTS miễn phí; người học không phải mua gói quản trị để học. Phạm vi miễn phí gồm truy cập bài giảng/chương trình học, sử dụng học liệu được phép cung cấp, làm và nộp bài tập/kiểm tra, dùng trợ lý AI giảng dạy theo chính sách nền tảng, tham gia lớp/nhóm học tập và theo dõi kết quả/tiến độ. Việc sử dụng AI có thể chịu quota kỹ thuật/ngân sách để bảo vệ hệ thống nhưng quota đó không phải học phí hoặc điều kiện mua quyền quản trị.

Quyền vào một lĩnh vực/khu vực đặc biệt vẫn có thể yêu cầu xác minh, membership và phê duyệt theo chính sách truy cập (ví dụ Lực lượng vũ trang); đây là điều kiện tư cách/phạm vi, không phải khoản phí. Hết hạn, tạm khóa hoặc thu hồi quyền quản trị không làm mất tài khoản, dữ liệu học tập hoặc quyền học tập miễn phí hợp lệ.

## 44. Thông báo hướng dẫn chức năng theo ngữ cảnh

### 44.1. Mục tiêu
Khi người dùng chọn một chức năng, HTS cần hiển thị thông báo ngắn gọn, dễ hiểu, giải thích:
- Chức năng dùng để làm gì.
- Ai được phép sử dụng.
- Cần kê khai hoặc chuẩn bị thông tin gì.
- Quy trình tiếp theo và người/cấp tiếp nhận.
- Điều kiện để được gửi, tham gia hoặc kích hoạt.
- Cảnh báo về quyền riêng tư và dữ liệu cần thiết nếu có.

Thông báo phải xuất hiện đúng thời điểm người dùng chọn chức năng, không chỉ nằm trong trang hướng dẫn chung. Nội dung hướng dẫn được quản trị theo từng lĩnh vực/chức năng, có thể cập nhật mà không phải sửa mã giao diện.

### 44.2. Ví dụ: học sinh xin tham gia lớp
Khi học sinh chọn chức năng “Tham gia lớp”, hiển thị thông báo cơ bản:

> Để được tham gia đúng lớp học, học sinh cần kê khai đầy đủ và chính xác thông tin theo yêu cầu, gồm thông tin định danh tài khoản, trường, năm học, khối, lớp và thông tin xác minh cần thiết. Nhà trường hoặc giáo viên/người được phân công sẽ kiểm tra và xác nhận tư cách thành viên. Sau khi được duyệt, hệ thống mới thêm học sinh vào nhóm lớp tương ứng. Mục đích là giúp giáo viên chủ nhiệm và giáo viên được phân công quản lý đúng thành viên, tổ chức hoạt động học tập, giao nhiệm vụ, theo dõi tiến độ và tổng hợp kết quả của lớp.

Quy trình:
1. Học sinh chọn trường, năm học, khối và lớp theo danh mục được cung cấp.
2. Học sinh khai báo các trường bắt buộc và gửi yêu cầu tham gia.
3. Hệ thống kiểm tra dữ liệu thiếu, định dạng và khả năng trùng hồ sơ.
4. Người có thẩm quyền của trường/lớp xác minh thông tin.
5. Khi được duyệt, hệ thống tạo/liên kết tư cách thành viên và đưa học sinh vào đúng nhóm lớp của năm học.
6. Giáo viên chủ nhiệm được phân công chính thức có vai trò Trưởng nhóm lớp; quyền giáo viên khác phụ thuộc phân công.
7. Học sinh xem trạng thái yêu cầu và thông báo kết quả.

Không cho học sinh tự nhập một mã lớp bất kỳ rồi được truy cập ngay. Không cho phép tự khai báo vai trò giáo viên hoặc tự thêm tài khoản khác vào lớp.

### 44.3. Các tình huống cần có hướng dẫn tương tự
- Đăng ký tài khoản và đăng nhập.
- Đăng ký tham gia một lĩnh vực.
- Xin tham gia lớp/nhóm/đơn vị.
- Đăng ký làm Field Admin hoặc xin gia hạn quyền.
- Tạo yêu cầu báo cáo và gửi báo cáo chính thức.
- Đăng ký người bán và tạo gian hàng.
- Tạo sản phẩm, đặt hàng và thanh toán bằng Pi.
- Đăng ký tham gia khu vực nội bộ.
- Gửi yêu cầu tra cứu/cập nhật dữ liệu Dân Cư Số khi được phép.
- Tải lên ảnh, tài liệu, video hoặc sử dụng OCR/AI.
- Thực hiện bài kiểm tra, kỳ thi và xem kết quả.
- Gửi nội dung cần phê duyệt hoặc phát hành ra ngoài HTS.

### 44.4. Nguyên tắc thiết kế thông báo
- Dùng ngôn ngữ phổ thông, ngắn gọn, tránh thuật ngữ kỹ thuật khó hiểu.
- Có nút/đường dẫn xem hướng dẫn chi tiết khi cần.
- Không hiển thị quá nhiều thông báo lặp lại; có thể cho phép người dùng xem lại hướng dẫn.
- Không yêu cầu người dùng cung cấp dữ liệu vượt quá mục đích của chức năng.
- Với dữ liệu trẻ em, dân cư, sinh trắc học hoặc lực lượng vũ trang, thông báo phải nêu rõ mục đích, phạm vi truy cập và yêu cầu xác minh phù hợp.
- Nội dung hướng dẫn không thay thế quy trình kiểm tra quyền ở máy chủ.

## 45. Bổ sung bảng dữ liệu đề xuất cho hồ sơ chủ dự án, gói thời hạn và hướng dẫn

Tên bảng dưới đây chỉ là đề xuất, không xác nhận đã tồn tại trong D1:
- `platform_public_profile`: thông tin giới thiệu công khai của chủ dự án/đầu mối liên hệ.
- `entitlement_plans`: các gói thời hạn 10 ngày, 30 ngày, 90 ngày và 01 năm.
- `entitlement_plan_prices`: giá Pi và lịch sử hiệu lực của từng gói.
- `entitlement_subscriptions`: quyền/dịch vụ đã đăng ký theo tài khoản.
- `pi_payment_orders`: yêu cầu thanh toán Pi.
- `pi_payment_transactions`: tham chiếu giao dịch trên Pi Network và trạng thái đối soát; cần đối chiếu bảng cùng mục đích trong hồ sơ rà soát D1.
- `pi_payment_verifications`: kết quả xác minh giao dịch.
- `entitlement_audit_logs`: nhật ký cấp, gia hạn, hết hạn, tạm khóa và thu hồi quyền.
- `feature_guides`: nội dung hướng dẫn theo chức năng/lĩnh vực.
- `feature_guide_versions`: lịch sử phiên bản hướng dẫn.

Không tạo các bảng này trước khi kiểm tra schema D1 hiện tại, tên bảng trùng, quan hệ, dữ liệu và migration hiện có. Các thay đổi phải có backup và được phê duyệt.

## 46. Các điểm cần chủ dự án xác nhận tiếp

1. Xử lý đơn đã thanh toán nhưng bị từ chối, giao dịch lỗi/thừa/thiếu và hoàn tiền (nếu có).
2. Phê duyệt đề xuất thời điểm bắt đầu tính hạn khi Super Admin kích hoạt grant, cấu hình hết hạn/chờ gia hạn và quy tắc cộng nối.
3. Chốt tích hợp Pi Network được phép, quy trình xác minh giao dịch và đối soát trước khi phát triển.
4. URL Zalo và Facebook chính xác nếu muốn gắn liên kết trực tiếp trên trang chủ.
5. Chính sách “giá trị Pi cố định” trong tương lai: giá Pi tham chiếu là tham số quy đổi hay giá niêm yết cố định cho từng gói.

---

## NGUYÊN TẮC XUYÊN SUỐT

HTS là nền tảng học tập và hệ sinh thái cộng đồng có phân quyền. Mọi quyền phải đúng vai trò, đúng phạm vi, đúng mục đích và có thể kiểm tra lại. Quyền xem không đồng nghĩa quyền sửa hoặc duyệt. AI hỗ trợ con người, không thay thế người có thẩm quyền. Dữ liệu gốc, lịch sử và nhật ký phải được bảo toàn. Trung tâm Báo cáo số dùng chung cho bảy lĩnh vực nhưng mỗi lĩnh vực có quy trình và dữ liệu riêng. Dân Cư Số chỉ xử lý dữ liệu trong phạm vi được phép, có phê duyệt, xác minh và bảo vệ thích hợp. Mọi thay đổi database phải được kiểm kê, sao lưu, thử nghiệm và phê duyệt trước khi thực hiện.

**HỌC TẬP SỐ (HTS) -- DIGITAL LEARNING**  
**TRI THỨC SỐ CHO MỌI NGƯỜI -- HỌC TẬP KHÔNG GIỚI HẠN -- KẾT NỐI CỘNG ĐỒNG -- KIẾN TẠO TƯƠNG LAI.**

## 41. Thông tin đề tài, đăng ký, công cụ hỗ trợ và Tổ đề tài

### 41.1. Thông tin nhận diện đề tài
- Tên nền tảng: **HỌC TẬP SỐ**.
- Tên tiếng Anh: **DIGITAL LEARNING**.
- Tên đề tài trong hồ sơ ban đầu: **Sáng tạo nội dung học tập số trong cuộc Cách mạng công nghiệp 4.0**; tên gọi đề tài/nền tảng được ghi nhận là **Học Tập Số kỷ nguyên 4.0**.
- Tên website dự kiến trong giai đoạn đầu: `hoctapso`; giai đoạn đầu có thể thử nghiệm trên website miễn phí, giai đoạn tiếp theo sử dụng tên miền riêng.
- Ký hiệu Token dự kiến: `HTS`.
- Định hướng: tri thức số cho mọi người, học tập suốt đời, công nghệ phục vụ cộng đồng và phát triển xã hội học tập.

### 41.2. Phương thức đăng ký và xác thực
- Đăng ký tài khoản bằng địa chỉ Gmail và số điện thoại theo phương thức xác thực được cấu hình.
- Mỗi người dùng có một tài khoản riêng; có đăng nhập, đăng xuất và khôi phục mật khẩu qua email hoặc phương thức xác minh phù hợp.
- Khôi phục/đổi mật khẩu không làm mất hồ sơ, dữ liệu hoặc lịch sử học tập.
- Định hướng tích hợp xác thực/chia sẻ thông tin từ VNeID và Pi Network trong tương lai chỉ khi đáp ứng điều kiện kỹ thuật, pháp lý và có sự đồng ý phù hợp của người dùng.
- Công dân học tập và Công nhân học tập được vào thẳng nội dung học tập mở, không cần tài khoản. Những chức năng cá nhân hóa, gửi báo cáo, tham gia nhóm, lưu lịch sử theo tài khoản hoặc tải tệp có thể yêu cầu đăng nhập.

### 41.3. Công cụ và nền tảng hỗ trợ được nêu trong hồ sơ
Danh sách này là tài liệu tham khảo, không có nghĩa HTS phải sử dụng tất cả dịch vụ hoặc đang kết nối với chúng:
- Công cụ tạo ứng dụng bằng AI: Lovable, Bolt.new, Replit, Vercel v0.
- Công cụ thiết kế website: WordPress, Wix, Webflow.
- Framework ứng dụng: Next.js.
- Quản lý mã nguồn: GitHub.
- Hạ tầng và triển khai: Cloudflare Workers/Pages/D1; Vercel; Netlify.
- Supabase/PostgreSQL chỉ là nền tảng được nghiên cứu trong tài liệu lịch sử; không thuộc kiến trúc vận hành HTS. Tài nguyên bên ngoài không bị xóa hoặc sửa bởi thay đổi mã nguồn.
- Công cụ AI hỗ trợ phân tích yêu cầu, thiết kế kiến trúc, viết và rà soát mã nguồn: ChatGPT.
- Việc lựa chọn dịch vụ phải dựa trên kiến trúc đã được xác nhận, khả năng tương thích, bảo mật, chi phí và điều kiện xử lý dữ liệu.

### 41.4. Nội dung tin tức và sự kiện
Các nhóm nội dung dự kiến:
- Giáo dục và đào tạo.
- Khoa học công nghệ và trí tuệ nhân tạo.
- Chuyển đổi số quốc gia.
- Kinh tế, xã hội và đời sống.
- Tin tức Quân đội, Công an trong phạm vi nguồn công khai được phép.
- Hoạt động cộng đồng và từ thiện.
- Sự kiện, thông báo và hoạt động của nền tảng.

Tin/bài từ nguồn bên ngoài phải lưu đơn vị xuất bản, tiêu đề, ngày đăng và URL; ưu tiên nguồn chính thức, báo chí uy tín. Nội dung tham khảo bên ngoài luôn ở trạng thái bản nháp để người có thẩm quyền kiểm tra. Không sao chép nguyên văn toàn bộ bài viết; phải phân biệt thông tin đã xác minh, nhận định và nội dung tổng hợp bởi AI.

### 41.5. Kế hoạch nội dung AI hằng ngày
Nhu cầu đã đề xuất là chuẩn bị 05 bản nháp tiếng Việt mỗi ngày, phân bổ giữa lĩnh vực học tập và đời sống, gửi Super Admin xem xét; không tự động xuất bản. Các nhóm chủ đề ưu tiên:
- Kiến thức công nghệ thiết thực cho người dân.
- Hệ sinh thái Pi Network, Mainnet và thông tin chính thức từ Pi Core Team.
- An toàn ví Pi, bảo vệ passphrase, nhận diện lừa đảo và giả mạo.
- Chương trình đào tạo, tuyển sinh, học bổng từ trường đại học/cơ quan chính thức.
- Khoa học, học tập, kỹ năng nghề nghiệp và kỹ năng đời sống.
- Nội dung tương tác, trò chơi kiến thức và hoạt động học tập.

Lịch đề xuất trong hồ sơ: 14:30 hằng ngày theo giờ Việt Nam. Đây là yêu cầu nội dung; không chứng minh website đã có bộ lập lịch hoặc hệ thống email. Muốn tự động hóa trên website phải có tác vụ định kỳ phía máy chủ, dịch vụ email và kiểm thử thực tế. Tuyệt đối không yêu cầu người dùng nhập, gửi hoặc lưu Pi Wallet Passphrase.

### 41.6. Trò chơi và tương tác học tập
Có thể phát triển trắc nghiệm, ghép cặp, ô chữ, thử thách tuần, bảng xếp hạng, huy hiệu và chế độ cá nhân/nhóm; mức độ khó phù hợp từng nhóm học tập. Không thiết kế trò chơi theo hướng cá cược/cờ bạc hoặc khuyến khích chi tiêu không phù hợp. Câu hỏi/đề thi do AI tạo phải được rà soát chuyên môn trước khi sử dụng chính thức.

### 41.7. Tổ đề tài
Theo hồ sơ đề tài ban đầu:
- **Chủ nhiệm đề tài:** Trần Văn Dĩnh – 1//QNCN – Nhân viên; đơn vị: Hải đội 433 – Hải đoàn 128.
- **Thành viên:** Hoàng Xuân Tuấn – Hải đội trưởng – Hải đội 433 – Hải đoàn 128.
- **Thành viên:** Trần Văn Hưng – Chính trị viên – Hải đội 433 – Hải đoàn 128.
- **Thành viên:** Vũ Văn Nam – Hải đội phó – Hải đội 433 – Hải đoàn 128.

Phần giới thiệu Tổ đề tài trên website đặt ở cuối nội dung trang chủ, ngay phía trên Footer. Thông tin liên hệ, hình ảnh và nội dung giới thiệu công khai cần được chủ thể xác nhận trước khi đăng tải. Không đưa thông tin nội bộ hoặc dữ liệu cá nhân không cần thiết lên website công khai.


### 41.8. Thông tin giới thiệu và liên hệ trên trang chủ
Thông tin do chủ dự án cung cấp để công khai trên trang chủ HTS:
- **Họ và tên:** Trần Văn Dĩnh.
- **Địa chỉ:** Thôn Tân Hưng, Thái Ninh, Hưng Yên.
- **Số điện thoại:** 0961256384.
- **Zalo:** Trần Văn Dĩnh.
- **Facebook:** Trần Văn Dĩnh.
- **Pi Network (Pinetwor theo cách ghi trong yêu cầu):** `tranvandinh128`.
- **Vai trò giới thiệu:** Quản trị cấp cao nhất của nền tảng HỌC TẬP SỐ; đầu mối tiếp nhận liên hệ, đề nghị tham gia, yêu cầu hỗ trợ và xin cấp quyền quản trị.

Các thông tin này cần được trình bày rõ ràng, dễ tìm ở khu vực giới thiệu trên trang chủ và/hoặc chân trang. Các liên kết Zalo/Facebook chỉ được gắn khi có URL/tài khoản chính xác do chủ dự án xác nhận; không tự suy đoán đường dẫn. Số điện thoại và địa chỉ chỉ hiển thị công khai theo đúng lựa chọn của chủ dự án.


---

# PHẦN PHỤ LỤC – HAI MẪU BIỂU NGHIỆP VỤ GỐC

Hai mẫu biểu dưới đây được tích hợp trực tiếp vào README HTS phiên bản 5.0. Bản Markdown trình bày lại đầy đủ cấu trúc tiêu đề, nhóm cột và trường thông tin để tiện tra cứu trên GitHub. Bản Word đi kèm giữ nguyên lưới bảng, gộp ô và bố cục của mẫu gốc. Không tự ý bỏ trường hoặc thay đổi ý nghĩa các cột khi chuyển thành biểu mẫu điện tử.

## MẪU BIỂU 01. DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN

**Phần tiêu đề mẫu gốc**
- Đơn vị cấp trên / Đơn vị cấp dưới.
- Quốc hiệu: Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam.
- Tiêu ngữ: Độc lập - Tự do - Hạnh phúc.
- Tên biểu: DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN.
- Dòng năm: DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN NĂM……

**Cấu trúc cột và nhóm thông tin theo mẫu gốc**

| Nhóm thông tin | Trường/cột |
|---|---|
| Thông tin người nhận | STT; Họ và tên; Cấp bậc; Chức vụ; Đơn vị; CCCD; SĐT |
| Nơi nhận | VPVT; Hải đội 433; Trạm Nghệ An; Hải Phòng (Hải đoàn) |
| Người nhận hộ | Họ tên; Địa chỉ; Ghi chú |
| Thông tin bổ sung | Ghi chú |

**Các dòng dữ liệu:** để trống để đơn vị nhập danh sách thực tế; mẫu gốc có các dòng trống và phần tổng hợp cuối bảng. Khi triển khai điện tử cần giữ khả năng tổng hợp số lượng theo nơi nhận và thông tin người nhận hộ.

## MẪU BIỂU 02. DANH SÁCH NHẬN QUÂN TRANG

**Phần tiêu đề mẫu gốc**
- Đơn vị cấp trên / Đơn vị cấp dưới.
- Quốc hiệu: Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam.
- Tiêu ngữ: Độc lập - Tự do - Hạnh phúc.
- Tên biểu: DANH SÁCH TIÊU CHUẨN QUÂN TRANG NĂM; DANH SÁCH NHẬN QUÂN TRANG NĂM…..

**Cấu trúc cột và nhóm thông tin theo mẫu gốc**

| Nhóm thông tin | Trường/cột |
|---|---|
| Thông tin cá nhân | STT; Họ và tên; Cấp bậc; Chức vụ; Đơn vị; CCCD; SĐT; SĐT nhận hộ |
| Nơi nhận | VPVT; Hải đội 433; Trạm Nghệ An; Hải Phòng (Hải đoàn) |
| Thông tin quân trang | Quân phục đông; Quân phục hè; Số mũ; Số giày |
| Theo dõi tồn/nợ | Đơn vị nợ quân trang năm |
| Thông tin bổ sung | Ghi chú |

**Các dòng dữ liệu:** để trống để đơn vị nhập danh sách thực tế; mẫu gốc có các dòng trống và phần tổng hợp cuối bảng. Khi triển khai điện tử cần giữ đầy đủ số lượng quân phục đông/hè, số mũ, số giày và thông tin đơn vị nợ quân trang.

### Nguyên tắc bảo toàn hai mẫu biểu
1. Hai mẫu biểu được đặt ngay trong cùng văn bản README, không còn bắt buộc người đọc phải mở một phụ lục riêng mới xem được nội dung.
2. Bản Word chứa nguyên bảng gốc với cấu trúc gộp ô và bố cục gốc.
3. Bản Markdown ghi rõ cấu trúc trường/cột để tra cứu và quản lý phiên bản trên GitHub.
4. Nếu cần cải tiến biểu mẫu, tạo phiên bản đề xuất mới và giữ lại mẫu gốc để đối chiếu; mọi trường dữ liệu cá nhân phải được phân quyền và bảo vệ phù hợp.
