# HỌC TẬP SỐ (HTS) – DIGITAL LEARNING

**README chính của repository `tranvandinh128/HOC-TAP-SO-HTS`**

- **Phiên bản README:** 8.0
- **Ngày cập nhật:** 28/11/2026
- **Chủ dự án:** Trần Văn Dĩnh
- **Trạng thái:** Tài liệu giới thiệu và định hướng repository. Các mô tả về chức năng, kiến trúc hoặc kế hoạch không mặc nhiên chứng minh chức năng đã được lập trình, tích hợp, kiểm thử hay nghiệm thu.

> **TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.**

---

## 1. Giới thiệu dự án

**HỌC TẬP SỐ (HTS)** được định hướng là hệ sinh thái học tập số và dịch vụ số đa lĩnh vực, phục vụ công dân, công nhân, sinh viên, học sinh các cấp, lực lượng vũ trang, cơ quan, đơn vị và cộng đồng.

HTS hướng tới học tập suốt đời, quản trị hoạt động giáo dục, quản lý học liệu, hỗ trợ trí tuệ nhân tạo, báo cáo số và từng bước phát triển các dịch vụ cộng đồng, thương mại, giao dịch số. Hệ thống ưu tiên trải nghiệm trên điện thoại nhưng vẫn hỗ trợ máy tính và máy tính bảng.

HTS được phát triển theo từng giai đoạn. Việc một phân hệ được nêu trong README hoặc tài liệu thiết kế chỉ thể hiện phạm vi/định hướng, không có nghĩa phân hệ đó đã sẵn sàng sử dụng.

## 2. Bảy lĩnh vực học tập

| Mã lĩnh vực | Tên lĩnh vực | Nguyên tắc truy cập |
|---|---|---|
| `cong-dan` | Công dân học tập | Học liệu mở, miễn phí; không bắt buộc đăng nhập để tiếp cận nội dung mở. |
| `cong-nhan` | Công nhân học tập | Học liệu mở, miễn phí; không bắt buộc đăng nhập để tiếp cận nội dung mở. |
| `sinh-vien` | Sinh viên học tập | Tài khoản/membership áp dụng theo chức năng; học tập thông thường miễn phí. |
| `thpt` | Học sinh THPT | Tài khoản/membership theo chức năng; bảo vệ dữ liệu học sinh. |
| `thcs` | Học sinh THCS | Tài khoản/membership theo chức năng; bảo vệ dữ liệu học sinh. |
| `tieu-hoc` | Học sinh Tiểu học | Tài khoản/membership theo chức năng; bảo vệ dữ liệu trẻ em. |
| `luc-luong-vu-trang` | Lực lượng vũ trang | Khu vực có kiểm soát; yêu cầu xác minh tư cách và phê duyệt theo quy trình. |

Một người dùng có **một tài khoản HTS**, nhưng có thể tham gia nhiều lĩnh vực, nhóm học tập, lớp hoặc đơn vị theo điều kiện tương ứng. Đăng ký học tập không tự động tạo quyền quản trị.

Học tập thông thường trong cả bảy lĩnh vực được định hướng miễn phí. Tài khoản Pi và ví Pi không phải điều kiện bắt buộc để sử dụng các chức năng học tập phổ thông; Pi chỉ áp dụng cho những chức năng đặc thù được công bố rõ.

## 3. Phạm vi hệ sinh thái và các phân hệ

Các nhóm chức năng dưới đây là phạm vi kiến trúc tổng thể, được triển khai theo thứ tự và điều kiện nghiệm thu riêng:

1. Trang chủ, giới thiệu, hướng dẫn và tài khoản HTS.
2. Bảy lĩnh vực học tập và quản lý membership.
3. Khóa học, bài giảng, bài học, tiến độ và kết quả học tập.
4. Quản trị giáo dục: trường, lớp, nhóm, giáo viên, học sinh và phân công.
5. Thư viện số, kho học liệu và quản lý tệp.
6. Tin tức, sự kiện và hệ thống quản trị nội dung (CMS).
7. Trung tâm Bài giảng AI và quy trình hỗ trợ biên tập nội dung.
8. Trung tâm Báo cáo số dùng chung cho các lĩnh vực.
9. Phân hệ Lực lượng vũ trang: xác minh thành viên, nhóm và biểu mẫu nghiệp vụ được phép.
10. Trung tâm Kỹ thuật số (DTC): định hướng giao dịch tài liệu, bảo mật, chữ ký và biên nhận; cần triển khai, đánh giá chuyên môn và kiểm định riêng.
11. Mạng xã hội học tập HTS.
12. Sàn thương mại điện tử nhiều người bán.
13. Tích hợp Pi cho các luồng thanh toán/chức năng Pi được phê duyệt.
14. Token Học Tập Số (HTS) – nghiên cứu, thẩm định và chỉ triển khai sau các cổng pháp lý, kỹ thuật, quản trị.
15. Hoạt động cộng đồng và từ thiện.
16. Dân Cư Số – phân hệ dữ liệu riêng, không phải lĩnh vực học tập thứ tám; chỉ triển khai khi có thẩm quyền và căn cứ phù hợp.
17. Quản trị hệ sinh thái, bảo mật, nhật ký, hỗ trợ và vận hành.

Các phân hệ có thể dùng chung tài khoản và hạ tầng nền tảng, nhưng phải có ranh giới dữ liệu, API, quyền truy cập, nhật ký và quy trình nghiệp vụ riêng. Không được truy cập dữ liệu giữa các phân hệ nếu không có quyền và mục đích hợp lệ.

## 4. Nguyên tắc nghiệp vụ và quản trị

- Một người – một tài khoản HTS; nhiều membership và phạm vi tham gia được quản lý trên cùng tài khoản.
- Phân biệt rõ **tài khoản (account), membership, role, permission, scope, assignment và entitlement/subscription**.
- Root Super Admin được khởi tạo bằng quy trình an toàn, không thông qua đăng ký thông thường.
- Root Super Admin quản lý việc cấp, điều chỉnh, tạm khóa và thu hồi quyền Field Admin theo quy trình có kiểm soát.
- Field Admin chỉ thao tác trong lĩnh vực/phạm vi được giao; không tự mở rộng quyền hoặc tự phê duyệt quyền của mình.
- Mọi quyết định phân quyền phải được kiểm tra ở phía máy chủ. Ẩn nút hoặc ẩn trang trên giao diện không phải biện pháp bảo mật.
- AI có thể hỗ trợ soạn thảo, chỉnh sửa, trích xuất và đề xuất; không tự xuất bản, tự xóa nội dung đã công bố hoặc tự quyết định nghiệp vụ quan trọng khi chưa có người có thẩm quyền duyệt.
- Nội dung lấy từ nguồn bên ngoài phải ghi nhận nguồn và đi qua quy trình rà soát của con người trước khi xuất bản.
- Dữ liệu học sinh, trẻ em, sinh trắc học, quân nhân và dân cư cần căn cứ, mục đích, phạm vi, thời hạn lưu trữ và kiểm soát truy cập riêng.
- Không đưa bí mật nhà nước/quân sự, dữ liệu nhạy cảm không được phép, mật khẩu, token bí mật, private key hoặc Pi Wallet passphrase vào repository.
- Không coi giao diện demo, dữ liệu mẫu, local storage, feature flag hoặc tài liệu thiết kế là bằng chứng chức năng đã tích hợp.

## 5. Kiến trúc kỹ thuật mục tiêu

Kiến trúc kỹ thuật đã thống nhất cho hướng phát triển hiện tại:

| Lớp | Công nghệ/giải pháp | Vai trò |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Giao diện và trải nghiệm người dùng. |
| Runtime/backend | Cloudflare Workers, Next.js qua OpenNext Cloudflare Adapter | Xử lý nghiệp vụ và API phía máy chủ. |
| Cơ sở dữ liệu ứng dụng | Cloudflare D1 (SQLite) | Cơ sở dữ liệu chính thức của ứng dụng HTS. |
| Lưu trữ tệp | Cloudflare R2 | Lưu trữ đối tượng/tệp; mặc định private khi triển khai. |
| Quản lý mã nguồn | GitHub | Lưu trữ mã nguồn và lịch sử thay đổi. |

**Các nguyên tắc kỹ thuật bắt buộc:**

- D1 là cơ sở dữ liệu ứng dụng chính thức duy nhất theo quyết định kiến trúc hiện tại. Không duy trì Supabase làm database runtime song song hoặc phương án fallback.
- Trình duyệt không được kết nối trực tiếp tới D1 hoặc R2. Mọi thao tác phải đi qua Worker/server sau khi xác thực và kiểm tra quyền.
- Server phải kiểm tra session, trạng thái tài khoản, permission, role grant, scope, membership/approval và entitlement khi nghiệp vụ yêu cầu.
- Tệp riêng tư phải được kiểm tra quyền ở server trước khi tải lên, tải xuống, xem hoặc chia sẻ. D1 lưu metadata và tham chiếu đối tượng; R2 lưu nội dung tệp.
- Secrets và thông tin xác thực dịch vụ chỉ được lưu trong cơ chế cấu hình bí mật phù hợp; không đưa vào mã nguồn, client bundle hoặc log.
- Không tạo migration/bảng mới trước khi kiểm kê schema D1 thực tế và lịch sử migration.

**Phiên bản thư viện được ghi nhận trong đợt kiểm tra repository ngày 28/11/2026** gồm Next.js `^15.5.29`, React `^19.0.0`, TypeScript `^5.7.3`, `@opennextjs/cloudflare` `^1.20.18` và Wrangler `^4.148.0`. Đây là thông tin snapshot tại thời điểm kiểm tra; cần đối chiếu `package.json`, lockfile và môi trường thực tế trước khi nâng cấp hoặc thay đổi cấu hình.

## 6. Pi Network và Token HTS

- Pi Network là tích hợp tùy chọn cho các chức năng đặc thù Pi; người học thông thường không bắt buộc phải có tài khoản Pi.
- Với chức năng thanh toán Pi, máy chủ phải xác minh giao dịch theo quy trình đáng tin cậy; không chấp nhận trạng thái thanh toán chỉ do trình duyệt tự khai báo.
- Không bao giờ yêu cầu hoặc lưu Pi Wallet passphrase.
- Thanh toán Pi cho sàn thương mại và thanh toán Pi cho gói/quyền quản trị là hai luồng nghiệp vụ riêng; thanh toán không tự động cấp quyền quản trị.
- Token HTS là tài sản/token riêng được đề xuất cho dự án, không đồng nhất với Pi Network. Các thông số dự kiến trong đề án như tổng cung 1.000.000 HTS, cơ chế phát hành giảm dần và nguồn bảo đảm dự kiến 150 Pi chỉ là đề xuất cần thẩm định; không được hiểu là token đã phát hành, đã được bảo chứng hoặc có giá trị/lợi nhuận cam kết.
- Chỉ xem xét triển khai token sau khi xác định tiêu chuẩn/chuỗi, tokenomics, quản trị, lưu ký, bảo mật hợp đồng, nghĩa vụ pháp lý và cơ chế công bố rủi ro.

## 7. Trạng thái mã nguồn và giới hạn xác minh

Đợt rà soát read-only ngày **28/11/2026** trên repository/nhánh `main` đã ghi nhận một số nền tảng kỹ thuật, nhưng không phải kiểm toán toàn bộ mã nguồn hoặc kiểm thử xâm nhập. Các nhận định dưới đây chỉ phản ánh phạm vi đã kiểm tra tại thời điểm đó:

- Repository có cấu hình Next.js, OpenNext/Cloudflare và khai báo binding D1 `DB` trong cấu hình Worker.
- Có API kiểm tra kết nối D1 theo hướng chỉ đọc (`SELECT 1`). Kiểm tra này không chứng minh schema nghiệp vụ đã đầy đủ hoặc dữ liệu production đã sẵn sàng.
- Có mã nền tảng xác thực và quản lý session, bao gồm password hashing và cookie session. Điều này không chứng minh mọi luồng đăng ký, đăng nhập, xác minh, khôi phục và bảo vệ tài khoản đã hoàn thiện.
- Hàm kiểm tra quyền lĩnh vực được xem xét trong đợt rà soát vẫn có nhánh từ chối khi membership chưa được xác minh; không được mở quyền hạn chế chỉ dựa trên giao diện.
- Có nền tảng cấu trúc DTC được merge vào `main`; chưa có bằng chứng trong phạm vi kiểm tra rằng toàn bộ nghiệp vụ mật mã, ký số hoặc quy trình giao dịch DTC đã hoàn thiện và được kiểm định.
- Báo cáo kiểm tra trước đó ghi nhận `typecheck`, `lint` và `build` đã chạy thành công tại một thời điểm trước đó. Cần chạy lại cả ba lệnh sau các thay đổi/merge mới nhất.
- Chưa có đủ bằng chứng trong đợt rà soát để xác nhận D1 production, schema production, R2 production, backup/restore, thanh toán Pi production hoặc nghiệm thu bảo mật đã hoàn tất.

**Kết luận:** HTS có nền tảng mã nguồn và một số cấu phần kỹ thuật; không được tuyên bố toàn bộ hệ sinh thái đã tích hợp, vận hành ổn định hoặc sẵn sàng production khi chưa có bằng chứng kiểm thử và nghiệm thu tương ứng.

## 8. Tài liệu dự án

- **Tài liệu thống nhất bổ sung v1.3 (dự thảo):** [`docs/HTS_TAI_LIEU_THONG_NHAT_v1.3_DU_THAO.md`](docs/HTS_TAI_LIEU_THONG_NHAT_v1.3_DU_THAO.md) – tài liệu làm việc để rà soát và thống nhất kiến trúc, nghiệp vụ, dữ liệu, bảo mật và lộ trình. Vì là dự thảo, không tự động thay thế các quyết định đã được chủ dự án chốt.
- **README phiên bản 7.0:** `README_HTS_v7.0.md` – tài liệu phiên bản trước, được giữ lại để tra cứu lịch sử; README chính của GitHub là tệp `README.md` ở thư mục gốc.
- **Báo cáo kiểm toán và danh mục công việc:** lưu trong bộ tài liệu rà soát riêng; khi đưa vào repository cần thống nhất vị trí, phiên bản và trạng thái phê duyệt trước.

## 9. Lộ trình triển khai tổng thể

Việc triển khai phải theo danh mục công việc có thứ tự, có đầu ra và tiêu chí nghiệm thu. Trình tự tổng thể:

1. Bảo toàn hiện trạng dự án và dữ liệu làm việc.
2. Kiểm kê toàn bộ repository và chuẩn hóa tài liệu.
3. Đối chiếu yêu cầu nghiệp vụ, lập ma trận phạm vi và kiểm kê môi trường Cloudflare.
4. Kiểm kê schema D1, migration ledger, R2 và kiểm tra backup/restore.
5. Kiểm tra build pipeline và tương thích OpenNext.
6. Hoàn thiện Auth, quản lý phiên và bảo vệ tài khoản.
7. Thiết lập Root Super Admin an toàn; hoàn thiện RBAC, permission, scope, entitlement và membership.
8. Hoàn thiện quy trình Field Admin và xác minh thành viên Lực lượng vũ trang.
9. Xây dựng nền học tập dùng chung cho bảy lĩnh vực và quản trị giáo dục.
10. Hoàn thiện thư viện số, học liệu, AI, tin tức và CMS.
11. Xây dựng Trung tâm Báo cáo số và hai mẫu báo cáo Lực lượng vũ trang.
12. Hoàn thiện thi, chấm điểm, chính sách điểm danh và quản lý tệp R2.
13. Triển khai Dân Cư Số sau khi đáp ứng điều kiện thẩm quyền/pháp lý.
14. Phát triển Mạng xã hội HTS và Sàn thương mại điện tử HTS.
15. Tích hợp Pi cho các luồng đã được phê duyệt; nghiên cứu và thẩm định Token HTS.
16. Phát triển hoạt động cộng đồng, từ thiện và DTC theo phạm vi riêng.
17. Tích hợp dịch vụ dùng chung; kiểm thử bảo mật, quyền riêng tư và tích hợp.
18. Chuẩn bị staging, diễn tập vận hành, nghiệm thu và chỉ triển khai chính thức khi có phê duyệt.
19. Bảo trì, kiểm toán định kỳ và quản lý thay đổi.

Danh mục công việc chi tiết theo thứ tự STT 1 đến 38 là tài liệu điều hành riêng. README này chỉ nêu lộ trình tổng thể, không thay thế danh mục công việc chi tiết.

## 10. Quy tắc phát triển và kiểm soát thay đổi

1. Kiểm kê hiện trạng trước khi sửa; giữ nguyên chức năng đang có nếu chưa đánh giá tác động.
2. Khi cần thay đổi một tệp, xác định rõ đường dẫn và phạm vi; bảo toàn bản cũ khi cần thiết.
3. Không tạo bảng hoặc migration trùng; đối chiếu schema D1 thực tế và migration ledger trước.
4. Không thay đổi cấu hình production, dữ liệu remote, secrets hoặc dependency khi chưa có đánh giá và phê duyệt.
5. Thực hiện từng giai đoạn, từng nhiệm vụ; không chuyển sang giai đoạn tiếp theo khi tiêu chí nghiệm thu chưa đạt.
6. Sau mỗi giai đoạn thay đổi mã nguồn, chạy lần lượt:

   ```powershell
   npm.cmd run typecheck
   npm.cmd run lint
   npm.cmd run build
   ```

7. Nếu lệnh kiểm tra thất bại, dừng và xử lý lỗi; không vô hiệu hóa quy tắc lint để ép kiểm tra thành công.
8. Không tự ý commit, push, pull, đổi nhánh, chạy migration từ xa hoặc deploy khi chưa có yêu cầu rõ ràng của chủ dự án.
9. Mọi thay đổi quan trọng cần có mô tả, bằng chứng kiểm thử, đánh giá rủi ro và phương án khôi phục phù hợp.

---

**HỌC TẬP SỐ (HTS) – DIGITAL LEARNING**  
*Học tập suốt đời – Kết nối tri thức – Phát triển cộng đồng.*
