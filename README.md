# HỌC TẬP SỐ (HTS) -- README dự án

> **Lưu ý trạng thái:** Tài liệu này tổng hợp yêu cầu và lộ trình. Không
> phải xác nhận mọi chức năng đã được lập trình hoặc đang vận hành. Chỉ
> đánh dấu hoàn thành sau khi kiểm tra mã nguồn, cơ sở dữ liệu và chạy
> thử.

## 1. Tổng quan

-   Tên: **HỌC TẬP SỐ** -- **DIGITAL LEARNING**
-   Ký hiệu Token dự kiến: **HTS**
-   Định hướng: Sáng tạo nội dung học tập số trong cuộc Cách mạng công
    nghiệp 4.0.
-   Thông điệp: **Tri thức số cho mọi người -- Học tập không giới hạn --
    Kết nối cộng đồng -- Kiến tạo tương lai.**

HTS hướng tới hệ sinh thái kết hợp giáo dục, đào tạo, công nghệ, nội
dung cộng đồng, mạng xã hội học tập và thương mại điện tử. Ưu tiên trải
nghiệm điện thoại, tương thích máy tính.

## 2. Công nghệ

Cấu hình được ghi nhận: - Next.js **15.2.4** - React 19, TypeScript,
Tailwind CSS 4 - Supabase / PostgreSQL: cơ sở dữ liệu, xác thực và phân
quyền theo kế hoạch - GitHub: kho mã nguồn chính thức - Cloudflare hoặc
Vercel: phương án triển khai, cần chọn theo khả năng tương thích với các
tính năng Next.js/server đang dùng.

Next.js là framework, không phải dịch vụ lưu trữ. Không tự ý nâng phiên
bản hoặc đổi nền tảng triển khai khi chưa kiểm tra tương thích.

## 3. Bảy nhóm học tập

  Nhóm                                       Truy cập
  ------------------------------------------ ----------------------------------------
  Công dân học tập                           Miễn phí, mở, không bắt buộc tài khoản
  Công nhân học tập                          Miễn phí, mở, không bắt buộc tài khoản
  Sinh viên học tập                          Cần tài khoản
  Học sinh THPT                              Cần tài khoản
  Học sinh THCS                              Cần tài khoản
  Học sinh tiểu học                          Cần tài khoản
  Lực lượng vũ trang (Quân đội -- Công an)   Cần tài khoản

Một tài khoản có thể đăng ký **nhiều nhóm/lĩnh vực**. Hệ thống lưu riêng
từng lĩnh vực và chỉ cho truy cập nội dung tương ứng. Đăng ký học tập
không tự động cấp quyền quản trị.

Nội dung định hướng: - **Công dân:** dịch vụ công, kỹ năng số, an toàn
mạng, pháp luật và kỹ năng công dân số. - **Công nhân:** tay nghề, an
toàn lao động, máy móc, tự động hóa, kỷ luật và cải tiến sản xuất. -
**Sinh viên:** chuyên ngành, ngoại ngữ, tin học, nghiên cứu, kỹ năng
mềm, AI và nghề nghiệp. - **THPT:** nội dung lớp 10--12, môn học, ôn tập
và luyện thi tốt nghiệp. - **THCS:** nội dung lớp 6--9, môn học và đánh
giá kiến thức. - **Tiểu học:** nội dung lớp 1--5, kiến thức nền tảng và
kỹ năng sống. - **Lực lượng vũ trang:** giáo dục quân sự/nghiệp vụ,
chính trị, hậu cần, kỹ thuật, an toàn thông tin, an ninh mạng, chuyển
đổi số, công nghệ mới và đổi mới sáng tạo.

## 4. Tài khoản và phân quyền

### Vai trò

-   `learner`: người học; dùng nội dung theo nhóm đã đăng ký.
-   `field_admin`: quản trị viên lĩnh vực; chỉ quản lý lĩnh vực được
    giao và còn hiệu lực.
-   `super_admin`: quản trị viên cấp cao; quản lý toàn hệ thống và phân
    quyền.

Theo mô hình đã thống nhất, chỉ **một `super_admin` hoạt động tại một
thời điểm**.

### Quy tắc

-   Chỉ `super_admin` duyệt/từ chối yêu cầu quản trị; cấp, gia hạn, điều
    chỉnh, tạm khóa hoặc thu hồi quyền `field_admin`.
-   `field_admin` không được tự nâng quyền, cấp quyền cho người khác,
    thay đổi quyền `super_admin` hoặc truy cập lĩnh vực ngoài phạm vi.
-   Người gửi yêu cầu quản trị vẫn chỉ có quyền người học trong thời
    gian chờ.
-   Phân quyền phải được thực thi ở máy chủ và cơ sở dữ liệu (RLS),
    không chỉ ẩn/hiện nút giao diện.
-   Mọi lần cấp, thay đổi, từ chối, gia hạn, tạm khóa và thu hồi quyền
    phải có nhật ký.

### Thời hạn quyền quản trị 05 ngày

-   Chu kỳ 05 ngày áp dụng cho **quyền quản trị**, không áp dụng cho tài
    khoản người học.
-   Hết hạn, chức năng quản trị bị khóa; tài khoản cá nhân vẫn tồn tại.
-   Không bắt buộc đổi tên đăng nhập hoặc mật khẩu mỗi 05 ngày. Quản trị
    viên không thể tự gia hạn.
-   Khi hết hạn, `field_admin` gửi yêu cầu gia hạn; lưu người yêu cầu,
    lĩnh vực, thời điểm và lý do.
-   Thông báo gửi đến `tranvandinh1281984@gmail.com` sau khi dịch vụ
    email được cấu hình và kiểm thử.
-   Chỉ `super_admin` chấp nhận/từ chối. Chấp nhận: gia hạn thêm 05
    ngày. Từ chối: quyền tiếp tục bị khóa.
-   Liên kết chấp nhận/từ chối phải an toàn, dùng một lần, có thời hạn
    và yêu cầu `super_admin` xác thực. Không dùng URL công khai dễ đoán,
    không gửi mật khẩu nguyên văn qua email.
-   Khi bị từ chối, hiển thị hướng dẫn liên hệ **0961256384**. Khi đang
    chờ, hiển thị "Đang chờ xét duyệt", không hiển thị thông báo từ
    chối.

### Trang quản trị cấp cao

Theo dõi mã tài khoản, tên đăng nhập, người được giao, thông tin liên hệ
cần thiết, đơn vị nếu cần, lĩnh vực, ngày cấp/hết hạn và trạng thái bàn
giao/kích hoạt/đang dùng/hết hạn/tạm khóa/thu hồi. Có bộ lọc theo lĩnh
vực, người dùng, trạng thái và thời hạn.

Không lưu mật khẩu dạng văn bản thuần để quản trị viên xem lại. Dùng cơ
chế băm mật khẩu và quy trình đặt lại/cấp lại an toàn.

## 5. Quản trị nội dung và AI

Có hai luồng: 1. **Tham khảo AI:** AI nghiên cứu, đề xuất và soạn bản
nháp. 2. **Quản trị viên tự viết:** tạo và biên tập nội dung trực tiếp.

Nguyên tắc: - AI chỉ nghiên cứu, soạn thảo và chỉnh sửa bản nháp; AI
không tự phê duyệt, xuất bản hoặc xóa bài đã xuất bản. - `field_admin`
được viết, biên tập, xem trước và phê duyệt/xuất bản trong đúng lĩnh vực
được giao. - Tin/bài từ nguồn bên ngoài luôn ở trạng thái bản nháp để
con người kiểm tra và duyệt. - Chỉ người có thẩm quyền đúng phạm vi mới
được sửa/xóa nội dung đã xuất bản. - Lưu đơn vị xuất bản, tiêu đề, ngày
đăng và URL nguồn. Ưu tiên nguồn chính thức/báo chí uy tín; không sao
chép nguyên văn toàn bộ bài. - Phân biệt thông tin đã xác minh, nhận
định và nội dung AI tổng hợp; đánh dấu nguồn mâu thuẫn hoặc thông tin
chưa chắc chắn. - Lưu lịch sử phiên bản, người sửa/duyệt, thời điểm và
nhật ký.

### Nội dung AI hằng ngày dự kiến

Nhu cầu: **05 bản nháp tiếng Việt mỗi ngày**, phân bổ giữa các lĩnh vực
học tập và đời sống, gửi `super_admin` xem xét; không tự động xuất bản.
Chủ đề gồm công nghệ thiết thực, Pi Network từ nguồn chính thức, an toàn
ví Pi, tuyển sinh/học bổng từ nguồn chính thức, khoa học, kỹ năng nghề
nghiệp/đời sống và nội dung tương tác.

Lịch đề xuất: **14:30 hằng ngày, giờ Việt Nam**. Website cần tác vụ định
kỳ phía máy chủ, dịch vụ email và kiểm thử thực tế. Tác vụ ChatGPT không
đồng nghĩa website HTS đã có bộ lập lịch hoặc đã gửi email.

**An toàn Pi:** tuyệt đối không yêu cầu, thu thập hoặc lưu Pi wallet
passphrase trong HTS, AI, biểu mẫu, email, cơ sở dữ liệu hay nhật ký.

## 6. Các phân hệ toàn nền tảng

-   Trang chủ, giới thiệu; mục "Giới thiệu Tổ đề tài" đặt cuối phần nội
    dung trang chủ, ngay trước Footer.
-   Bài giảng, khóa học, tài liệu và thư viện số.
-   Tin tức -- sự kiện.
-   Theo dõi lịch sử, tiến độ và kết quả học tập.
-   Kiểm tra, thi trực tuyến, ngân hàng câu hỏi và chấm điểm.
-   Trò chơi kiến thức: trắc nghiệm, ghép cặp, ô chữ, thử thách tuần,
    bảng xếp hạng, huy hiệu; không cá cược/cờ bạc hoặc khuyến khích chi
    tiêu không phù hợp.
-   Mạng xã hội học tập: hồ sơ, bài viết, hình ảnh/video, bình luận,
    chia sẻ, kết bạn, nhóm, nhắn tin và gọi thoại/video.
-   Sàn thương mại điện tử nhiều người bán.
-   Token HTS, từ thiện, doanh thu/phí, hỗ trợ, báo cáo, bảo mật và sao
    lưu.

## 7. Lực lượng vũ trang -- biểu mẫu và bảo vệ dữ liệu

### Đăng ký nhận quà công đoàn

Theo mẫu: họ tên, cấp bậc, chức vụ, đơn vị, CCCD, số điện thoại, nơi
nhận, thông tin người nhận hộ (nếu có), ghi chú và năm đăng ký. Nơi nhận
theo mẫu: VPVT, Hải đội 433, Trạm Nghệ An, Hải Phòng (Hải đoàn).

### Đăng ký nhận quân trang

Theo mẫu: họ tên, cấp bậc, chức vụ, đơn vị, CCCD, số điện thoại, số điện
thoại nhận hộ, nơi nhận, cỡ quân phục đông/hè (cỡ 3, 4, 5), số mũ, số
giày, đơn vị nợ quân trang năm và ghi chú; lập theo năm cấp, có phần
tổng hợp.

### Phân quyền

-   Người dùng thông thường chỉ gửi và xem trạng thái đăng ký của chính
    mình; không xem danh sách tổng hợp hoặc dữ liệu người khác.
-   Chỉ `super_admin` và tài khoản quản trị Lực lượng vũ trang được
    `super_admin` phê duyệt mới được xem, quản lý, sửa và xuất danh sách
    trong phạm vi được phép.
-   Kiểm soát quyền ở máy chủ và cơ sở dữ liệu; ghi nhật ký xem, sửa,
    xuất và tải dữ liệu.
-   Không đưa dữ liệu thật của quân nhân/đơn vị lên GitHub công khai.
-   Chỉ triển khai trên hạ tầng, tài khoản được cơ quan/đơn vị có thẩm
    quyền cho phép. Không đưa bí mật nhà nước hoặc dữ liệu chưa được phê
    duyệt lên môi trường công cộng.

## 8. Khu vực dữ liệu nội bộ

Đăng nhập HTS không tự động cấp quyền vào khu vực nội bộ. Người dùng gửi
yêu cầu; người có thẩm quyền phê duyệt; sau đó xác thực bổ sung. Quyền
được cấp theo nhiệm vụ, phạm vi tài liệu và thời hạn, có thể đình
chỉ/thu hồi.

Khu vực nội bộ cần tách biệt kho dữ liệu, quyền truy cập, nhật ký và sao
lưu. Các vai trò dự kiến `internal_viewer`, `internal_editor`,
`internal_manager`, `security_auditor`, `internal_super_admin` độc lập
với vai trò HTS. Chỉ xử lý tài liệu nội bộ thông thường đã được phép lưu
trên hạ tầng đã chọn. Phân loại và phê duyệt dữ liệu trước khi lưu.

## 9. Điểm danh, thi và đối chiếu điểm

### Điểm danh

Theo yêu cầu, nhận diện khuôn mặt định kỳ **10 phút/lần** cho Sinh viên,
học sinh các cấp và Lực lượng vũ trang; không áp dụng cho Công dân/Công
nhân. Dữ liệu khuôn mặt là sinh trắc học nhạy cảm: chỉ triển khai khi có
căn cứ pháp lý, thông báo và cơ chế đồng ý phù hợp, đánh giá quyền riêng
tư và biện pháp bảo vệ. Lỗi nhận diện/camera/đường truyền phải chuyển
xác minh thủ công; không tự động kết luận vắng hoặc xử phạt.

### Giám sát thi

-   Áp dụng cho Sinh viên, học sinh các cấp và Lực lượng vũ trang; không
    bắt buộc với Công dân/Công nhân.
-   Ghi nhận sự kiện có thể phát hiện như chuyển tab, rời cửa sổ, sao
    chép/dán khi trình duyệt và thiết bị hỗ trợ.
-   Đủ **04 lần vi phạm** thì đánh dấu bài thi cần xem xét.
-   Người thi vẫn tiếp tục làm bài; hệ thống không tự động dừng bài hoặc
    đánh trượt.
-   Người có thẩm quyền xác minh sau kỳ thi. Mọi điều chỉnh điểm phải
    lưu người thực hiện, thời gian, lý do và căn cứ.
-   Không cam kết phát hiện/ngăn chặn tuyệt đối mọi hình thức gian lận.

### Danh sách dự thi và đối chiếu điểm

-   Quản lý theo trường/đơn vị, lớp/nhóm, họ tên, số báo danh và mã kỳ
    thi/đợt thi.
-   Nhập Excel/CSV có ánh xạ cột, xem trước, kiểm tra dữ liệu, bản ghi
    trùng và nhật ký.
-   Số báo danh là khóa chính trong đúng kỳ thi/đợt thi; họ tên dùng
    kiểm tra chéo.
-   Không tự ghép/gán điểm khi thiếu hoặc trùng mã, thiếu tên, sai lệch
    hay kết quả mơ hồ; đưa vào ngoại lệ để xác minh.
-   Không ghi đè điểm đã chốt nếu chưa mở lại đúng thẩm quyền và lưu lý
    do.
-   Lưu tệp gốc, lịch sử nhập, bảng điểm dự kiến, trạng thái đối chiếu,
    người xác nhận và phiên bản chính thức.
-   Hỗ trợ xuất Excel/CSV; PDF có thể bổ sung theo mẫu được duyệt.

## 10. Sàn thương mại điện tử và Pi

Theo yêu cầu đã thống nhất: thanh toán đơn hàng trên sàn **100% bằng
Pi**, không COD hoặc chuyển khoản ngân hàng.

### Giá Pi bắt buộc

Mọi sản phẩm đăng bán phải có giá Pi (π), hiển thị tại thẻ/danh sách,
trang chi tiết, giỏ hàng, bước xác nhận, lịch sử và màn hình quản lý
đơn. Không chỉ hiển thị VNĐ để người mua tự quy đổi.

### Hai phương thức định giá

1.  **Giá Pi cố định:** do người bán hoặc quản trị viên có thẩm quyền
    thiết lập.
2.  **Giá Pi tham chiếu thị trường:** quy đổi từ cặp Pi thực tế được OKX
    hỗ trợ tại thời điểm lấy dữ liệu.

Với giá tham chiếu, lưu nguồn, cặp giao dịch, đơn vị tiền, thời điểm cập
nhật và phương thức quy đổi. Giá OKX chỉ là giá tham chiếu thị trường,
không phải giá chính thức được Pi Core Team bảo đảm.

Nếu nguồn giá lỗi/không hợp lệ/quá hạn, không dùng giá cũ như hiện tại;
tạm ngừng xác nhận đơn cho sản phẩm dùng giá tham chiếu. Giá cố định vẫn
có thể tiếp tục. Lưu giá áp dụng tại thời điểm tạo đơn để lịch sử không
thay đổi theo thị trường.

### Xác minh thanh toán

Máy chủ xác minh mã giao dịch, trạng thái, số Pi, địa chỉ nhận và mã đơn
trước khi xác nhận đã thanh toán. Không tin ảnh chụp màn hình hoặc dữ
liệu do trình duyệt/người mua tự khai. Không yêu cầu/lưu Pi wallet
passphrase.

## 11. Cơ sở dữ liệu và bảo mật

Nhóm bảng dự kiến cần rà soát, **không phải xác nhận đã tồn tại**: - Hồ
sơ/lĩnh vực: `profiles`, `learning_fields`, `user_learning_fields`,
`user_roles`. - Quyền quản trị: `admin_requests`, `admin_permissions`,
`admin_renewal_logs`, `admin_notifications`, `audit_logs`. - Nội
dung/AI: `articles`, `article_revisions`, `article_sources`,
`ai_content_requests`, `ai_content_drafts`, `content_approvals`,
`news_sources`. - Học tập/thi: khóa học, bài học, tiến độ, ngân hàng câu
hỏi, kỳ thi, phiên thi, điểm danh, nhập dữ liệu và đối chiếu điểm. - Trò
chơi: `learning_games`, `game_sessions`. - Thương mại: sản phẩm, giá Pi,
dữ liệu tham chiếu, đơn hàng và xác minh giao dịch. - Biểu mẫu và thông
báo khác khi được phê duyệt.

**Không chạy schema SQL cũ khi chưa rà soát.** Tài liệu yêu cầu cảnh báo
schema cũ có mô hình `learner/admin/super_admin` và hàm kiểm tra quyền
quá rộng, không phù hợp mô hình `learner/field_admin/super_admin`. Kiểm
tra schema thực tế trước khi viết migration, tránh tạo bảng trùng.

Bắt buộc xác thực/phân quyền phía máy chủ, RLS, quyền đọc/ghi theo người
dùng/lĩnh vực/nhiệm vụ, nhật ký, lịch sử phiên bản, sao lưu/khôi phục và
kiểm thử bảo mật. Không đưa `.env.local`, `service_role` key, mật khẩu,
khóa API, token bí mật hoặc dữ liệu cá nhân/nhạy cảm vào GitHub. Không
đặt bí mật máy chủ trong biến môi trường công khai phía trình duyệt.

## 12. Chạy dự án

Yêu cầu: Node.js 20.9 trở lên và npm.

``` bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`.

Windows PowerShell:

``` powershell
Copy-Item .env.example .env.local
npm run dev
```

Không commit `.env.local`.

## 13. Kết nối Supabase -- chỉ sau khi rà soát

1.  Xác nhận đúng dự án Supabase HTS và kiểm tra schema hiện tại.
2.  Đối chiếu migrations, bảng, quan hệ, chỉ mục, trigger và RLS.
3.  Thiết kế theo mô hình nhiều lĩnh vực và ba vai trò `learner`,
    `field_admin`, `super_admin`.
4.  Kiểm tra chính sách đọc/ghi ở database và xác thực server-side.
5.  Kiểm thử bằng các tài khoản/nhóm quyền khác nhau trước khi đưa dữ
    liệu thật vào.

Không chạy `supabase/schema.sql` cũ chỉ vì có hướng dẫn trong README.
Phải rà soát SQL và trạng thái database trước.

## 14. Lộ trình triển khai đề xuất

1.  Rà soát mã nguồn, cấu trúc thư mục, route, giao diện và cấu hình.
2.  Hoàn thiện database, đăng nhập, hồ sơ, đăng ký nhiều lĩnh vực và
    RLS.
3.  Hoàn thiện quản trị, yêu cầu cấp quyền, thời hạn 05 ngày, gia hạn và
    nhật ký.
4.  Hoàn thiện nội dung, thư viện, AI draft, xem trước và phê duyệt.
5.  Phát triển nhóm học tập, tiến độ, điểm danh, thi, nhập dữ liệu và
    báo cáo.
6.  Xem xét khu vực nội bộ và biểu mẫu Lực lượng vũ trang sau khi có phê
    duyệt về dữ liệu, quyền và hạ tầng.
7.  Phát triển mạng xã hội, trò chơi và tương tác.
8.  Phát triển marketplace, giá Pi và xác minh thanh toán.
9.  Nghiên cứu Token HTS, từ thiện và tích hợp khác khi đủ điều kiện.
10. Kiểm thử bảo mật, quyền riêng tư, sao lưu/khôi phục và triển khai
    chính thức.

## 15. Bảng trạng thái -- cập nhật sau kiểm tra thực tế

  -----------------------------------------------------------------------
  Hạng mục                            Trạng thái ghi nhận
  ----------------------------------- -----------------------------------
  Bộ khung Next.js và giao diện ban   Đã có trong bản khởi tạo; cần đối
  đầu                                 chiếu commit mới nhất

  Trang chủ và 7 nhóm học tập         Có giao diện ban đầu; cần kiểm thử
                                      route/nội dung

  Đăng nhập/xác thực thật             Chưa được xác nhận hoàn thành

  Đăng ký nhiều nhóm                  Yêu cầu đã thống nhất; cần kiểm tra
                                      mã nguồn và DB

  Phân quyền server-side/RLS          Chưa được xác nhận hoàn thành

  Quản trị 5 ngày và gia hạn email    Yêu cầu đã thống nhất; chưa xác
                                      nhận vận hành

  AI soạn nháp và quy trình duyệt     Yêu cầu đã thống nhất; chưa xác
                                      nhận vận hành

  Điểm danh, giám sát thi, chấm điểm  Chưa xác nhận triển khai

  Nhập Excel/CSV và đối chiếu điểm    Chưa xác nhận triển khai

  Biểu mẫu quà công đoàn/quân trang   Đã mô tả yêu cầu; chưa xác nhận
                                      triển khai

  Khu vực dữ liệu nội bộ              Định hướng; cần phê duyệt và hạ
                                      tầng phù hợp

  Marketplace và thanh toán Pi        Yêu cầu đã thống nhất; chưa xác
                                      nhận vận hành

  Token HTS, từ thiện, mạng xã        Định hướng; chưa xác nhận vận hành
  hội/video                           

  Sao lưu, khôi phục, kiểm thử bảo    Cần triển khai và nghiệm thu
  mật                                 
  -----------------------------------------------------------------------

Không đánh dấu "Hoàn thành" chỉ vì đã tạo route hoặc giao diện.

## 16. Nguyên tắc làm việc với mã nguồn

-   Một kho mã nguồn chính thức trên GitHub.
-   Trước khi sửa, xác định đúng đường dẫn và đọc phiên bản hiện tại.
-   Sửa theo từng nhóm chức năng; tránh thay đổi hàng loạt không kiểm
    soát.
-   Commit có nội dung rõ ràng; kiểm tra build và các luồng liên quan
    sau khi sửa.
-   Không tạo bảng SQL trùng; kiểm tra schema trước migration.
-   Không đưa dữ liệu thật, thông tin quân nhân, bí mật hoặc dữ liệu cá
    nhân vào kho công khai.
-   Chức năng nhạy cảm chỉ triển khai sau khi có phê duyệt về dữ liệu,
    quyền truy cập và môi trường lưu trữ.

## 17. Tài liệu tham chiếu

README này được đối chiếu từ: 1. **ĐỀ TÀI DỰ THI CẤP QUÂN CHỦNG -- BẢN
HOÀN THIỆN**. 2. **HỌC TẬP SỐ (HTS) -- TỔNG HỢP YÊU CẦU BỔ SUNG: QUẢN
TRỊ TÀI KHOẢN, PHÂN QUYỀN, AI VÀ NỘI DUNG**, bao gồm phần yêu cầu giá Pi
và thanh toán Pi.

Khi có thay đổi yêu cầu, cập nhật tài liệu nguồn và README đồng bộ.
README mô tả mục tiêu và trạng thái đã kiểm chứng, không thay thế kiểm
thử nghiệm thu.
