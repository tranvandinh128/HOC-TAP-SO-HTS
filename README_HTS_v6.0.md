# HỌC TẬP SỐ (HTS) – DIGITAL LEARNING

**README dự án – bản hợp nhất và chuẩn hóa**

- **Phiên bản:** 6.0
- **Ngày cập nhật:** 27/11/2026
- **Vai trò tài liệu:** README gốc của repository; giới thiệu dự án, nguyên tắc kiến trúc và liên kết tới đặc tả chuẩn.
- **Trạng thái:** Tài liệu định hướng và đặc tả. Nội dung mô tả yêu cầu hoặc kiến trúc không đồng nghĩa chức năng đã được lập trình, kết nối dữ liệu, kiểm thử hoặc nghiệm thu.

> **TRI THỨC SỐ CHO MỌI NGƯỜI – HỌC TẬP KHÔNG GIỚI HẠN – KẾT NỐI CỘNG ĐỒNG – KIẾN TẠO TƯƠNG LAI.**

## Giới thiệu nhanh

HỌC TẬP SỐ (HTS) là nền tảng học tập số đa lĩnh vực, hướng tới học tập suốt đời, quản lý hoạt động giáo dục, chia sẻ học liệu, hỗ trợ báo cáo và kết nối cộng đồng. Hệ thống được thiết kế ưu tiên thiết bị di động, đồng thời hỗ trợ máy tính và máy tính bảng.

### Bảy lĩnh vực học tập

| Mã lĩnh vực | Tên lĩnh vực | Nguyên tắc truy cập |
|---|---|---|
| `cong-dan` | Công dân học tập | Nội dung học tập mở có thể xem không cần đăng nhập |
| `cong-nhan` | Công nhân học tập | Nội dung học tập mở có thể xem không cần đăng nhập |
| `sinh-vien` | Sinh viên học tập | Tài khoản và membership phù hợp theo chức năng |
| `thpt` | Học sinh THPT | Tài khoản và membership phù hợp; bảo vệ dữ liệu trẻ em |
| `thcs` | Học sinh THCS | Tài khoản và membership phù hợp; bảo vệ dữ liệu trẻ em |
| `tieu-hoc` | Học sinh tiểu học | Tài khoản và membership phù hợp; bảo vệ dữ liệu trẻ em |
| `luc-luong-vu-trang` | Lực lượng vũ trang | Khu vực hạn chế; phải xác minh tư cách và phê duyệt đúng phạm vi |

Một người dùng có một tài khoản HTS và có thể tham gia nhiều lĩnh vực/nhóm hợp lệ. Học tập trong cả bảy lĩnh vực là miễn phí. Tài khoản Pi không bắt buộc đối với học tập thông thường; Pi chỉ áp dụng cho các chức năng Pi hoặc quyền quản trị được quy định riêng.

### Các phân hệ chính

- Học tập, bài giảng, khóa học và thư viện số.
- Quản trị giáo dục, trường/lớp, giáo viên, học sinh và kết quả học tập.
- Trung tâm Bài giảng AI và hỗ trợ biên tập nội dung.
- Trung tâm Báo cáo số dùng chung cho bảy lĩnh vực.
- Điểm danh, kiểm tra và đánh giá theo chính sách từng nhóm.
- Quản trị tài khoản, membership, vai trò, quyền và phạm vi.
- Gói quản trị và tích hợp Pi Network theo quy trình phê duyệt.
- Các phân hệ hệ sinh thái như thương mại điện tử, cộng đồng và Token HTS theo lộ trình, không mặc định đã hoạt động.

## Kiến trúc kỹ thuật được chốt

- **Frontend/framework:** Next.js, React và TypeScript.
- **Runtime/backend mục tiêu:** Cloudflare Workers, đóng gói Next.js bằng OpenNext Cloudflare Adapter.
- **Cơ sở dữ liệu ứng dụng:** Cloudflare D1 (SQLite), là database chính thức duy nhất của HTS.
- **Lưu trữ tệp:** Cloudflare R2 private-by-default khi phân hệ tệp được triển khai.
- **Mã nguồn:** GitHub, repository `tranvandinh128/HOC-TAP-SO-HTS`.

Không duy trì Supabase song song hoặc làm fallback trong runtime HTS. Không truy cập D1/R2 trực tiếp từ trình duyệt. Mọi xác thực, phân quyền, kiểm tra membership/scope và quyền tải tệp phải được thực hiện ở server/Worker.

**Lưu ý phiên bản:** Hồ sơ cũ ghi nhận Next.js 15.2.4; kết quả build ngày 27/11/2026 ghi nhận Next.js 15.5.29. Phiên bản thực tế phải lấy từ `package.json`, lockfile và môi trường triển khai tại thời điểm làm việc; không nâng cấp chỉ dựa trên README.

## Quy tắc đọc và sử dụng README

1. README là tài liệu giới thiệu và điểm vào của repository.
2. Đặc tả nghiệp vụ/kỹ thuật chi tiết được quản lý trong tài liệu hợp nhất `HTS_TAI_LIEU_THONG_NHAT_BO_SUNG_2_MAU_BAO_CAO.md` (nếu tệp này được đặt trong `docs/` với đúng tên).
3. Phân biệt rõ:
   - **Đã quyết định:** chính sách/kiến trúc đã được chủ dự án xác nhận.
   - **Hiện trạng đã quan sát:** kết quả đọc mã nguồn hoặc kiểm tra tại thời điểm được ghi rõ.
   - **Đề xuất/chờ phê duyệt:** chưa được coi là chính sách hoặc chức năng đang hoạt động.
4. Tên bảng trong tài liệu là tên logic/candidate cho tới khi được đối chiếu với schema D1 thật.
5. Không coi giao diện, dữ liệu demo, feature flag tĩnh hoặc tài liệu thiết kế là chức năng backend đã triển khai.
6. Không đưa secrets, token, mật khẩu, private key, dữ liệu cá nhân thật hoặc dữ liệu quân sự nhạy cảm vào Git.

---

## Mục lục tài liệu đặc tả chuẩn

1. Mục tiêu, phạm vi và thứ bậc quyết định  
2. Tóm tắt điều hành và hiện trạng thực tế  
3. Nguyên tắc bất biến và kiến trúc kỹ thuật chuẩn  
4. Lĩnh vực học tập và chính sách truy cập  
5. Tài khoản, xác thực, phiên đăng nhập và khôi phục  
6. RBAC, permission, scope và membership  
7. Quy trình quản trị, Super Admin và Field Admin  
8. Gói quản trị và thanh toán Pi Network  
9. Xác minh truy cập Lực lượng vũ trang  
10. Quản trị giáo dục, chương trình và kết quả học tập  
11. Trung tâm Bài giảng AI và Kho học liệu  
12. Trung tâm Báo cáo số  
13. Điểm danh và dữ liệu sinh trắc học  
14. Tệp, Cloudflare R2 và xuất dữ liệu  
15. Nhật ký, bảo mật, quyền riêng tư và lưu giữ dữ liệu  
16. Danh mục dữ liệu D1 hợp nhất và quy tắc chống trùng  
17. Migration, sao lưu, môi trường và triển khai  
18. Kiểm thử và tiêu chí nghiệm thu  
19. Lộ trình triển khai theo giai đoạn  
20. Quyết định còn phải chốt  
21. Quy tắc quản lý tài liệu và danh mục tài liệu cũ  
22. Phụ lục: trạng thái kiểm tra mã nguồn ngày 27/11/2026

---

## 1. MỤC TIÊU, PHẠM VI VÀ THỨ BẬC QUYẾT ĐỊNH

HTS là nền tảng học tập số có nhiều lĩnh vực, nhóm người học và phân hệ quản trị. Tài liệu này hợp nhất các yêu cầu về tài khoản, quyền, học tập, giáo dục, AI, báo cáo, điểm danh, xác minh Lực lượng vũ trang, thanh toán quyền quản trị và hạ tầng dữ liệu.

### 1.1. Thứ bậc khi có mâu thuẫn

Khi các tài liệu cũ có nội dung không thống nhất, áp dụng thứ tự sau:

1. Quyết định nghiệp vụ mới nhất đã được chủ dự án xác nhận.
2. Kiến trúc Cloudflare Workers + D1 của HTS được chốt ngày 26/11/2026.
3. Các yêu cầu nghiệp vụ trong tài liệu tổng hợp này.
4. Thiết kế chuyên đề, chỉ bổ sung chi tiết trong phạm vi của chuyên đề và không được trái kiến trúc chuẩn.
5. Báo cáo kiểm toán, snapshot và hướng dẫn lịch sử chỉ dùng làm bằng chứng tại thời điểm ghi nhận, không tự động là chỉ dẫn hiện hành.

### 1.2. Phạm vi tài liệu

Tài liệu bao gồm kiến trúc backend, dữ liệu, xác thực, phân quyền, bảy lĩnh vực học tập, quản trị giáo dục, học liệu/AI, báo cáo, điểm danh, xác minh Lực lượng vũ trang, thanh toán Pi cho quyền quản trị, lưu trữ tệp và vận hành.

Tài liệu **không** tự động phê duyệt việc triển khai dữ liệu dân cư thật, hồ sơ quân sự, dữ liệu sinh trắc học, thanh toán Pi mainnet, hoặc đưa bất kỳ dịch vụ nào lên production. Các nội dung này cần thẩm quyền, đánh giá rủi ro và phê duyệt riêng.

---

## 2. TÓM TẮT ĐIỀU HÀNH VÀ HIỆN TRẠNG THỰC TẾ

### 2.1. Các quyết định nền tảng đã xác nhận

- **Cloudflare Workers + D1 là backend và cơ sở dữ liệu chính thức duy nhất của HTS.** Next.js được đóng gói/chạy qua OpenNext trên Cloudflare Workers.
- Cloudflare R2 là đích lưu bytes của tệp khi phân hệ lưu trữ tệp được triển khai; bucket phải private-by-default.
- Không duy trì Supabase song song, không dùng Supabase làm fallback, không truy cập D1/R2 trực tiếp từ trình duyệt.
- Một người dùng có một account duy nhất, có thể có nhiều membership, nhiều vai trò và nhiều scope hợp lệ.
- Học tập trong cả bảy lĩnh vực miễn phí. Gói Pi chỉ áp dụng cho quyền quản trị, không phải học phí.
- Pi đã thanh toán không tự cấp quyền quản trị. Chỉ quyết định có thẩm quyền của Super Admin mới tạo/kích hoạt grant.
- Chỉ đúng account Super Admin tối cao của chủ dự án đã bootstrap và xác minh mới được miễn phí quản trị vĩnh viễn.
- Khu vực Lực lượng vũ trang mặc định bị chặn cho đến khi tư cách thành viên được xác minh và phê duyệt.
- Mọi quyết định truy cập dữ liệu phải được thực hiện ở Worker/server; giao diện không phải ranh giới bảo mật.

### 2.2. Phân biệt trạng thái kiến trúc và trạng thái triển khai

| Hạng mục | Trạng thái theo hồ sơ và kiểm tra hiện có |
|---|---|
| Loại bỏ Supabase khỏi mã nguồn hoạt động | Báo cáo ngày 26/11/2026 ghi nhận không còn import/client/API/dependency Supabase trong source, manifest, lockfile và OpenNext bundle hiện tại. Các bản ZIP/tài liệu/cache cũ có thể còn dấu vết lịch sử. Không suy luận việc này xóa tài nguyên Supabase bên ngoài. |
| Cloudflare D1 binding | Có mã lấy binding D1 phía server và repository D1 trong snapshot mã nguồn được gửi. Binding cấu hình không chứng minh remote database đã tồn tại, đã có schema hoặc là production. |
| D1 schema/migrations | Tài liệu kiểm toán cũ ghi nhận tại thời điểm rà soát chưa có migrations trong repository; sau đó working tree có thư mục `migrations/` và nhiều tệp mới. Chưa có nội dung migration đầy đủ được kiểm chứng trong bộ tài liệu này, chưa xác nhận schema local/remote. Phải inventory trước khi chạy migration. |
| Auth/session | Có các module xác thực D1 được gửi để rà soát trong cuộc trao đổi: `lib/auth/security.ts`, `service.ts`, `http.ts`, `field-access.ts`. Có nền tảng token/session, password hashing, xử lý API và đọc quyền. Chưa chứng minh toàn bộ luồng đăng ký, login, reset, logout, MFA, email verification và authorization các API đã hoàn chỉnh. |
| Phân quyền Lực lượng vũ trang | Hàm `getMilitaryFieldAccessStatus()` được gửi hiện chỉ trả `sign-in-required`, `membership-unverified` hoặc `verification-unavailable`; chưa có nhánh `granted`. Đây là deny-by-default an toàn nhưng đồng nghĩa cơ chế phê duyệt membership chưa hoàn chỉnh trong đoạn mã được xem. |
| Giao diện và nghiệp vụ | Báo cáo loại bỏ Supabase ngày 26/11 ghi nhận nhiều trang tài khoản/quản trị vẫn là giao diện khung, dữ liệu minh họa/local state, chưa nối API D1 nghiệp vụ. Mã nguồn đã có thay đổi sau snapshot; cần kiểm tra lại từng module trước khi cập nhật trạng thái. |
| TypeScript | Ngày 27/11/2026, `npm.cmd run typecheck` hoàn tất không có lỗi. |
| ESLint | Ngày 27/11/2026, `npm.cmd run lint` hoàn tất không có lỗi/cảnh báo được in ra. |
| Next.js production build | Ngày 27/11/2026, `npm.cmd run build` thành công với Next.js 15.5.29; hiển thị `Generating static pages (42/42)`. Các route động được liệt kê riêng. |
| OpenNext Cloudflare build | Trước đó đã có một lần build thành công theo nhật ký dự án; cần chạy lại sau các thay đổi mới nhất để xác nhận trạng thái hiện tại. Windows có thể có cảnh báo tương thích; WSL là phương án được khuyến nghị. |
| D1 remote/production, R2 production, Pi payment production | Chưa xác minh; không được tuyên bố đã hoạt động. |

### 2.3. Lưu ý về số lượng trang

Số `42/42` trong Next.js build là số trang/đường dẫn được prerender trong bước tạo static pages, không phải tổng số tệp `page.tsx` trong thư mục `app/`. Các route có ký hiệu `ƒ` được xử lý động theo yêu cầu. Không dùng riêng con số này để kết luận trang đã bị xóa hoặc thiếu.

---

## 3. NGUYÊN TẮC BẤT BIẾN VÀ KIẾN TRÚC KỸ THUẬT CHUẨN

### 3.1. Kiến trúc runtime

```text
Trình duyệt
  └─ HTTPS
      └─ Next.js / OpenNext trên Cloudflare Workers
          ├─ kiểm tra Origin/CSRF, rate limit và validate input
          ├─ xác thực cookie session, account status
          ├─ authorize: action permission + role grant + scope
          │            + membership/approval + entitlement khi áp dụng
          ├─ truy cập Cloudflare D1 qua binding server-side
          ├─ truy cập R2 private qua Worker sau khi authorize
          ├─ gọi email / Pi / AI qua server adapters được phê duyệt
          └─ ghi security_events và audit_events
```

### 3.2. Trách nhiệm từng lớp

- **Browser:** hiển thị giao diện và gửi yêu cầu. Không được quyết định role, permission, owner, scope, trạng thái duyệt, giá, payment status hoặc quyền tải tệp.
- **Next.js/OpenNext Worker:** xác thực session, kiểm tra quyền, validate input, điều phối nghiệp vụ, truy cập D1/R2 và tích hợp ngoài.
- **D1:** nguồn sự thật cho account, credential metadata, session digest, membership, grant, scope, quyết định, dữ liệu nghiệp vụ và metadata tệp.
- **R2:** lưu bytes tệp private; D1 lưu metadata và object reference, không lưu bytes tệp.
- **AI/email/Pi:** chỉ gọi từ server qua adapter; secret không xuất hiện trong client bundle, response, source control hoặc log.

### 3.3. Nguyên tắc bất biến

1. Một người – một account; không nhân bản account để tham gia nhiều lĩnh vực.
2. Membership học tập, role, permission, scope, assignment và subscription là các khái niệm riêng.
3. Deny-by-default: thiếu session, quyền, membership, scope, phê duyệt hoặc dữ liệu kiểm chứng thì từ chối.
4. Mọi endpoint, Server Action, truy vấn dữ liệu nhạy cảm, tải tệp, export và tác vụ nền đều phải authorize ở server.
5. Học tập miễn phí; quyền quản trị và điều kiện truy cập đặc biệt được quản lý riêng.
6. Không tự nâng quyền, không nhận quyền từ payload hoặc localStorage.
7. Không ghi password, token, cookie, private key, Pi passphrase, giấy tờ hoặc sinh trắc vào log.
8. Không suy luận tình trạng D1 remote/production từ `wrangler.jsonc`, binding, health check hoặc SQLite local.
9. Không tạo bảng mới chỉ vì tên xuất hiện trong tài liệu; phải inventory và hợp nhất semantics trước.
10. Không đưa bí mật nhà nước/quân sự vào HTS thông thường hoặc dịch vụ AI công cộng.

---

## 4. LĨNH VỰC HỌC TẬP VÀ CHÍNH SÁCH TRUY CẬP

### 4.1. Bảy lĩnh vực chính thức

| Slug | Tên hiển thị | Chính sách truy cập |
|---|---|---|
| `cong-dan` | Công dân học tập | Nội dung mở có thể xem không cần đăng nhập; account cần cho cá nhân hóa/ghi tiến độ hoặc chức năng riêng. |
| `cong-nhan` | Công nhân học tập | Nội dung mở có thể xem không cần đăng nhập; account cần cho cá nhân hóa/ghi tiến độ hoặc chức năng riêng. |
| `sinh-vien` | Sinh viên học tập | Có thể yêu cầu account và membership phù hợp; miễn phí học tập. |
| `thpt` | Học sinh THPT | Có thể yêu cầu account/membership; miễn phí học tập; bảo vệ dữ liệu trẻ em. |
| `thcs` | Học sinh THCS | Có thể yêu cầu account/membership; miễn phí học tập; bảo vệ dữ liệu trẻ em. |
| `tieu-hoc` | Học sinh tiểu học | Có thể yêu cầu account/membership; miễn phí học tập; bảo vệ dữ liệu trẻ em. |
| `luc-luong-vu-trang` | Lực lượng vũ trang | Chặn nội dung/API/tệp nội bộ đến khi tư cách được xác minh và membership được phê duyệt. |

### 4.2. Pi là tùy chọn cho người học thông thường

Người không có tài khoản Pi vẫn có thể sử dụng HTS cho học tập phổ thông và dịch vụ không yêu cầu Pi. Khi người dùng chủ động chọn chức năng đặc thù Pi, HTS hướng dẫn họ cài ứng dụng Pi phù hợp, tạo tài khoản, hoàn tất KYC và tạo ví theo yêu cầu của chức năng. Chỉ chức năng quản trị riêng hoặc chức năng Pi mới áp dụng điều kiện tương ứng. Việc có tài khoản Pi/ví không tự cấp quyền quản trị HTS.

### 4.3. Báo cáo giáo dục

`cong-dan` và `cong-nhan` vẫn là lĩnh vực học tập HTS và vẫn có thể thuộc Trung tâm Báo cáo số dùng chung. Hai lĩnh vực này chỉ được loại khỏi báo cáo quản lý giáo dục nhà trường/ngành theo yêu cầu đã chốt. Không xóa dữ liệu, không khóa quyền học và không loại khỏi mọi báo cáo HTS.

---

## 5. TÀI KHOẢN, XÁC THỰC, PHIÊN ĐĂNG NHẬP VÀ KHÔI PHỤC

### 5.1. Nguyên tắc account

- Mỗi người có một `account_id` duy nhất.
- Email đăng nhập được chuẩn hóa; email đã xác minh cần unique theo chính sách.
- Hồ sơ cá nhân tách khỏi credential và role.
- Một account có thể liên kết nhiều identity đã xác minh nếu sau này được phê duyệt; không tạo account trùng do thay đổi phương thức đăng nhập.
- Account status (active, suspended, locked, disabled hoặc trạng thái canonical sau thiết kế) phải được kiểm tra ở server.

### 5.2. Luồng xác thực cần có

1. Đăng ký: validate input, normalize email, rate limit, tạo account/credential và quy trình xác minh email theo chính sách.
2. Đăng nhập: kiểm tra account status, credential, rate limit; tạo session ngẫu nhiên.
3. Session: cookie chứa token opaque; D1 chỉ lưu digest, expiry, revoke metadata.
4. Đăng xuất: revoke session phía server và xóa cookie.
5. Đăng xuất mọi thiết bị: revoke tất cả session còn hiệu lực theo account.
6. Đổi/reset mật khẩu: token một lần có digest, expiry, chống replay; sau khi đổi mật khẩu revoke session theo policy.
7. Khôi phục account đặc quyền: quy trình độc lập, không thể tự cấp lại Super Admin chỉ bằng email hoặc form thông thường.
8. MFA: bắt buộc cho Root Super Admin; lựa chọn TOTP/WebAuthn/managed provider và recovery cần quyết định riêng.

### 5.3. Cookie và password hashing

Cookie session cần `HttpOnly`, `Secure` trong production, `SameSite` phù hợp, `Path=/`, thời hạn hợp lý. Không đặt token trong `localStorage`.

Password hashing phải dùng thuật toán phù hợp Cloudflare Workers runtime, salt ngẫu nhiên, tham số được version hóa và có kế hoạch nâng cấp. Đoạn mã đã gửi hiện sử dụng PBKDF2-SHA256 310.000 iterations và salt 16 byte; đây là quan sát về mã, chưa phải đánh giá độc lập toàn bộ cấu hình production. Cần benchmark trên Workers, giới hạn input và kiểm tra migration/rehash policy.

### 5.4. Phiên và thời gian

Mã `service.ts` được gửi lưu `expiresAt` bằng `toISOString()` nhưng truy vấn đang so sánh `s.expires_at > CURRENT_TIMESTAMP`. Cần kiểm thử so sánh thời gian trên SQLite/D1 và thống nhất UTC/ISO hoặc epoch. Không coi vấn đề này đã sửa. Có thể dùng biểu thức SQLite nhất quán như `julianday(s.expires_at) > julianday('now')` nếu schema lưu ISO text; phải kiểm thử với dữ liệu thật trên môi trường test trước khi thay đổi.

### 5.5. Rate limit và chống CSRF

- Rate limit đăng nhập, đăng ký, reset, verify, gửi mã và endpoint nhạy cảm.
- Với cookie-auth mutation, kiểm tra Origin/CSRF theo chính sách đã chốt; xử lý các client hợp lệ và proxy đúng cách.
- IP lấy từ header tin cậy của Cloudflare Worker; không tin header do client tự giả lập nếu không được Cloudflare thiết lập.
- Response reset/recovery không tiết lộ email có tồn tại hay không.
- Các token xác minh/khôi phục phải one-time, có expiry và revoke sau sử dụng.

---

## 6. RBAC, PERMISSION, SCOPE VÀ MEMBERSHIP

### 6.1. Phân biệt các quan hệ

- **Account:** ai đang sử dụng hệ thống.
- **Membership:** người đó là thành viên/người học thuộc lĩnh vực, lớp, nhóm, trường hoặc đơn vị nào.
- **Role:** loại vai trò được giao.
- **Permission:** hành động cụ thể được phép (read, create, update, approve, publish, export, manage...).
- **Scope:** phạm vi tài nguyên mà grant áp dụng.
- **Assignment:** phân công nghiệp vụ như giáo viên phụ trách lớp/môn/năm học.
- **Entitlement/subscription:** điều kiện thời hạn cho một số quyền quản trị có phí; không thay thế role grant hoặc membership.

Một account có thể đồng thời là learner ở nhiều field, teacher ở một số lớp, education manager trong scope được giao và Field Admin ở một field khác nếu được cấp đúng. Quyền của request là giao của trạng thái account/session, permission, grant, scope, membership/assignment, approval và thời hạn.

### 6.2. Vai trò chuẩn

| Vai trò | Phạm vi | Quyền/giới hạn |
|---|---|---|
| Learner | Account và membership của chính mình; nội dung mở được phép | Học, làm bài, xem tiến độ/kết quả của mình; không xem dữ liệu người khác hoặc tự xác minh quyền đặc biệt. |
| Teacher | Lớp/môn/trường/năm học được phân công | Quản lý nội dung/kết quả trong assignment và permission cụ thể; không tự duyệt nếu thiếu quyền. |
| Group Leader | Nhóm/đơn vị được giao | Điều phối trong scope; không tự bổ nhiệm, mở scope hoặc export ngoài quyền. |
| Education Manager / School Leadership | Đơn vị/trường/cơ sở được giao | Xem/quản lý theo permission riêng; quyền sửa, duyệt, xuất không tự động phát sinh từ tên vai trò. |
| Education Sector Admin | Ngành/đơn vị giáo dục được giao | Xem báo cáo/hồ sơ trong scope; quyền sửa/duyệt/export phải cấp riêng. |
| Field Admin | Một hoặc nhiều lĩnh vực/scope được Super Admin cấp | Quản lý trong grant có hiệu lực; không tự cấp quyền, không đổi scope, không duyệt grant của mình. Gói Pi áp dụng trừ Root được miễn. |
| Root Super Admin | Scope `platform`, account duy nhất đã bootstrap/xác minh | Quản trị nền tảng, quyết định grant; MFA, audit và quy trình khôi phục bắt buộc. |
| Người xác nhận tư cách đơn vị | Hồ sơ/đơn vị được giao | Chỉ xác nhận tư cách theo quy trình; không tự cấp role HTS và không xem hồ sơ ngoài yêu cầu. |

### 6.3. Quy tắc authorize cho mọi request

1. Xác thực session server-side, expiry/revocation và account status.
2. Xác định action permission từ route/operation, không nhận permission từ browser.
3. Nạp role/permission grant còn hiệu lực và kiểm tra scope cụ thể.
4. Kiểm tra quan hệ scope trong DB, không suy quan hệ cha-con từ tên hoặc loại scope.
5. Kiểm tra membership/assignment phù hợp; với Lực lượng vũ trang phải có approval active.
6. Kiểm tra entitlement Pi khi action là quản trị thuộc phạm vi phải trả phí.
7. Truy vấn có điều kiện theo scope và chỉ trả trường được phép.
8. Ghi audit/security event khi cần.
9. Từ chối mặc định khi dữ liệu quyền không đủ hoặc dịch vụ xác minh lỗi.

Không sử dụng UI guard, menu ẩn, `localStorage`, ID khó đoán hoặc route động làm thay thế authorization.

---

## 7. QUY TRÌNH QUẢN TRỊ, SUPER ADMIN VÀ FIELD ADMIN

### 7.1. Root Super Admin

- Chỉ có một Root Super Admin tối cao theo quyết định sản phẩm.
- Account root phải được bootstrap server-side một lần, xác minh chủ dự án độc lập và gắn với `account_id` cố định.
- Email `tranvandinh1281984@gmail.com` chỉ là thông tin nhận diện/đối chiếu trong hồ sơ, không phải bằng chứng quyền khi request; không cấp root dựa trên email do client gửi.
- Root có platform scope, MFA bắt buộc, audit các hành động đặc quyền và quy trình break-glass/recovery được phê duyệt.
- Không seed mật khẩu, token hoặc thông tin bí mật root vào repo/migration công khai.

### 7.2. Field Admin và các role nghiệp vụ

- Người dùng gửi yêu cầu role/scope/lý do.
- Super Admin xem xét và phê duyệt/từ chối/yêu cầu bổ sung.
- Grant phải ghi account, role, permission, scope, trạng thái, thời điểm bắt đầu/kết thúc, người cấp và lý do.
- Field Admin chỉ được thao tác trong scope/permission đã cấp; không thể cấp quyền cho mình, thay đổi scope, approve quyền của chính mình hoặc truy cập field khác.
- Quyền Teacher/Education Manager/Group Leader cũng cần assignment/grant cụ thể, không tự phát sinh từ membership.

### 7.3. Các trạng thái tách biệt

Yêu cầu quản trị, thanh toán, phê duyệt và grant là các luồng độc lập. Một yêu cầu được thanh toán không có nghĩa được duyệt; được duyệt chưa có nghĩa grant đã kích hoạt nếu chưa ghi nhận đúng thời hạn/scope.

---

## 8. GÓI QUẢN TRỊ VÀ THANH TOÁN PI NETWORK

### 8.1. Chính sách đã chốt

Học tập miễn phí ở cả bảy lĩnh vực. Gói Pi chỉ áp dụng cho tài khoản có quyền quản trị, ngoại trừ đúng Root Super Admin tối cao của chủ dự án đã xác minh.

| Thời hạn | Giá đã ghi nhận trong tài liệu |
|---:|---:|
| 10 ngày | 0,00314 Pi |
| 30 ngày | 0,00942 Pi |
| 90 ngày | 0,02826 Pi |
| 365 ngày | 0,11461 Pi |

Chỉ dùng Pi Network cho gói quản trị theo thiết kế hiện tại. Không dùng thanh toán này làm điều kiện học tập. Giá phải có version/snapshot; thay đổi giá chỉ áp dụng đơn mới.

### 8.2. Quy trình

1. Người dùng gửi admin request với role, field/scope và lý do.
2. Server tạo order và snapshot plan/price/amount/receiver/network/context.
3. Người dùng thanh toán qua luồng Pi chính thức được phê duyệt.
4. Server xác minh transaction ID, trạng thái cuối, amount chính xác, receiver, network/context và liên kết đúng order.
5. Xác minh paid chỉ chuyển yêu cầu sang chờ Super Admin xét duyệt.
6. Super Admin approve/reject/needs revision; ghi actor, thời gian, lý do.
7. Chỉ khi approve mới tạo/kích hoạt role grant đúng account/role/scope/period.
8. Gia hạn tạo lịch sử mới, không ghi đè giao dịch/grant cũ.

Không chấp nhận ảnh chụp màn hình, redirect thành công từ client hoặc callback chưa xác thực làm bằng chứng thanh toán. Không yêu cầu/lưu Pi Wallet Passphrase, private key hoặc seed phrase.

### 8.3. Trạng thái độc lập

- Payment: `created`, `pending_payment`, `verifying`, `paid`, `failed`, `expired`, `cancelled`, và `refunded` chỉ khi cơ chế được xác nhận.
- Review: `pending`, `needs_revision`, `approved`, `rejected`.
- Grant/entitlement: `pending_activation`, `active`, `suspended`, `expired`, `revoked`.

Paid không tự tạo grant. Nếu paid nhưng bị từ chối, không cấp quyền; xử lý đối soát/hoàn tiền/khiếu nại theo chính sách được duyệt, không tự tuyên bố đã refund.

### 8.4. Hiệu lực và hết hạn

Đề xuất mặc định: thời hạn bắt đầu khi Super Admin kích hoạt grant; thời gian chờ duyệt không làm hao hụt hạn. Gia hạn trước khi hết hạn có thể cộng nối từ `ends_at`; gia hạn sau hết hạn tính từ lần kích hoạt mới. Đây là đề xuất cần chủ dự án phê duyệt trước khi code.

Hết hạn/thu hồi phải chặn thao tác quản trị mới ở server nhưng không khóa account, xóa dữ liệu hoặc làm mất quyền học tập miễn phí.

---

## 9. XÁC MINH TRUY CẬP LĨNH VỰC LỰC LƯỢNG VŨ TRANG

### 9.1. Nguyên tắc

- Khu vực Lực lượng vũ trang là khu vực hạn chế, mặc định deny.
- Có account, đã đăng nhập, có membership học tập chung, có role quản trị hoặc đã mua gói Pi đều không thay thế xác minh tư cách.
- Chỉ membership được xác minh và phê duyệt đúng scope, còn active mới được truy cập nội dung nội bộ.
- Trước approval, không trả nội dung, metadata, danh sách, kết quả tìm kiếm, file key hoặc thông tin có thể tiết lộ tài nguyên nội bộ.
- Tài khoản không Pi vẫn được sử dụng các chức năng học tập thông thường; Pi không phải điều kiện xác minh tư cách Lực lượng vũ trang.

### 9.2. Luồng nghiệp vụ

1. Người dùng chọn đăng ký lĩnh vực Lực lượng vũ trang.
2. Hiển thị thông báo về phạm vi hạn chế, yêu cầu tư cách và dữ liệu cần cung cấp.
3. Người dùng gửi yêu cầu; trạng thái ban đầu `pending`/chờ xác minh.
4. Người có thẩm quyền được giao kiểm tra hồ sơ/đơn vị theo quy trình được phê duyệt.
5. Người duyệt approve/reject/request-more-information/suspend/revoke; ghi actor, thời điểm, scope và lý do tối thiểu.
6. Khi approved, hệ thống mới kích hoạt membership đúng field/unit/group và hiệu lực.
7. Mỗi request đọc/ghi/tải file kiểm tra lại membership/approval active; revoke/suspend phải chặn ngay cả session cũ.

### 9.3. Trạng thái hiện tại trong mã được gửi

`getMilitaryFieldAccessStatus()` hiện có các trạng thái `granted`, `sign-in-required`, `membership-unverified`, `verification-unavailable`, nhưng code đang trả về `membership-unverified` cho mọi người dùng đã xác thực. Do đó, trạng thái hiện tại là **fail-closed nhưng chưa có đường cấp quyền**. Cần triển khai bảng/workflow phê duyệt và kiểm tra ở mọi page/API/file endpoint trước khi chuyển sang `granted`.

### 9.4. Dữ liệu và thẩm quyền

- Chỉ thu thông tin tối thiểu cần thiết để xác minh; xác định ai có thẩm quyền, đơn vị xác minh, hồ sơ nào được phép tiếp nhận và thời hạn lưu.
- Không lưu bí mật nhà nước/quân sự trong HTS thông thường; không tải hồ sơ thật lên R2 trước khi có phê duyệt về cơ quan, môi trường, vùng lưu, quyền truy cập và retention.
- Tài liệu xác minh nên tham chiếu attachment private; không lưu bytes trong D1, không dùng URL công khai.
- Quyết định xác minh là quyết định con người/cơ quan có thẩm quyền, không để AI tự xác minh hoặc approve.

---

## 10. QUẢN TRỊ GIÁO DỤC, CHƯƠNG TRÌNH VÀ KẾT QUẢ HỌC TẬP

### 10.1. Phạm vi

Quản lý ngành/đơn vị giáo dục, trường, cơ sở, năm học, khối, lớp, môn, học sinh, giáo viên và phân công. Cấu trúc phạm vi logic:

`Ngành giáo dục → đơn vị quản lý được ủy quyền → trường → cơ sở/chi nhánh → năm học → khối/lớp → môn học → phân công giáo viên/học sinh`.

Quan hệ trực thuộc phải được kiểm chứng bằng dữ liệu tổ chức trong D1, không chỉ dựa trên `scope.type` hoặc tên.

### 10.2. Vai trò

- `super_admin`: quản trị HTS toàn nền tảng.
- `education_sector_admin`: quyền trong phạm vi ngành/đơn vị được giao; xem chi tiết không đồng nghĩa có quyền sửa/duyệt/export.
- `school_leadership`: quản lý trường/cơ sở được giao; quyền duyệt phụ thuộc policy và assignment.
- `teacher`: chỉ làm việc với lớp/môn/học sinh được phân công và permission tương ứng.
- `learner`: quyền học và xem dữ liệu cá nhân theo membership.

Một account có thể có nhiều role assignment đồng thời, mỗi assignment có scope, permission, người cấp, trạng thái và thời hạn.

### 10.3. Quy trình kết quả học tập

1. AI hoặc hệ thống đánh giá có thể đề xuất điểm và độ tin cậy.
2. Điểm không rõ/độ tin cậy thấp chuyển `needs_manual_review`.
3. Giáo viên rà soát, điều chỉnh có lý do; lưu giá trị cũ/mới, người sửa và thời điểm.
4. Giáo viên xác nhận chuyển `pending_approval`.
5. Người được trường/đơn vị ủy quyền phê duyệt mới chuyển `approved`.
6. Công bố kết quả chính thức là bước phát hành riêng, có audit.

Thang 0–10 chỉ là mặc định tham khảo trong ví dụ, không áp dụng mặc định cho mọi cấp học/môn/loại đánh giá. Quy chế và thang điểm cần cấu hình theo quy định hiện hành được chủ dự án phê duyệt.

### 10.4. Báo cáo giáo dục

Báo cáo quản lý giáo dục nhà trường/ngành loại `cong-dan` và `cong-nhan` theo yêu cầu. Không loại hai field này khỏi học tập hoặc báo cáo HTS dùng chung. Dữ liệu báo cáo chỉ gồm phần người yêu cầu có permission/scope hợp lệ.

---

## 11. TRUNG TÂM BÀI GIẢNG AI VÀ KHO HỌC LIỆU

### 11.1. Mục tiêu

Quản lý chương trình giáo dục, kho học liệu, nguồn tham khảo, bài giảng, phiên bản nội dung, bài tập, câu hỏi, bài nộp, tiến độ và trợ lý AI. Dữ liệu curriculum cần có phiên bản/hiệu lực để theo dõi thay đổi chương trình và sách giáo khoa.

### 11.2. Thực thể nghiệp vụ logic

- Chương trình: education systems, curriculum frameworks/versions, education stages, grades, academic years, subjects, curriculum subjects, topics, learning standards.
- Kho học liệu: learning materials, versions, classifications, sources, source references.
- Bài giảng: lessons, lesson versions, sections, citations, review requests, publication records.
- Bài tập/đánh giá: exercise sets, questions, assignments, submissions, learning progress/events, mastery snapshots.
- AI: jobs, extractions, sessions, messages, usage ledger.
- Kiểm duyệt: content review requests/decisions, copyright clearance và audit.

Tên bảng chi tiết thuộc danh mục ứng viên tại Mục 16; phải hợp nhất với schema hiện hữu trước migration.

### 11.3. Vai trò AI và người duyệt

- AI hỗ trợ phân tích, phân loại, trích xuất, soạn nháp, gợi ý bài tập, giải thích và phản hồi học tập.
- AI không tự cấp quyền, xác minh tư cách Lực lượng vũ trang, approve, publish nội dung, công bố điểm chính thức, kết luận vi phạm hoặc ra quyết định kỷ luật.
- Nội dung từ nguồn bên ngoài phải ghi nguồn và ở trạng thái nháp chờ người có quyền rà soát.
- Người có quyền đúng field/scope chịu trách nhiệm duyệt và phát hành.
- AI chỉ nhận dữ liệu tối thiểu được phép, đã giảm định danh khi phù hợp; không truy cập trực tiếp D1/R2.

### 11.4. Bản quyền và nguồn

Mỗi học liệu/bài giảng cần lưu nguồn, tác giả/chủ sở hữu nếu biết, giấy phép/quyền sử dụng, phiên bản, thời điểm nhập và người duyệt. Không sao chép nội dung có bản quyền vượt phạm vi được phép. Bài giảng đã publish cần versioning; sửa đổi không âm thầm ghi đè lịch sử đã công bố.

### 11.5. Tìm kiếm và cá nhân hóa

Tìm kiếm lọc theo field, cấp học, lớp, môn, chủ đề, chương trình, nguồn, trạng thái duyệt và quyền người dùng. Cá nhân hóa dựa trên progress/membership có quyền; không dùng dữ liệu trẻ em hoặc dữ liệu nhạy cảm cho quảng cáo/huấn luyện AI ngoài chính sách được phê duyệt.

---

## 12. TRUNG TÂM BÁO CÁO SỐ

### 12.1. Mục tiêu và quy trình

Trung tâm Báo cáo hỗ trợ tạo mẫu, yêu cầu báo cáo, thu thập dữ liệu, rà soát, phê duyệt, phát hành, export và lưu trữ. Báo cáo chính thức phải gắn với yêu cầu/đợt/campaign đã được duyệt, trừ ngoại lệ được cấu hình và audit.

Quy trình gợi ý:

1. Người dùng có quyền tạo yêu cầu báo cáo, chọn mẫu/phạm vi/thời hạn.
2. Hệ thống kiểm tra role, permission, scope và quyền dữ liệu.
3. AI phân tích yêu cầu, gợi ý template hoặc tạo bản nháp; không tự tạo quyết định phê duyệt.
4. Người có quyền rà soát dữ liệu, chỉnh sửa và xác nhận.
5. Người duyệt đúng thẩm quyền phê duyệt/phát hành.
6. Export PDF/Excel được kiểm tra quyền và ghi audit; file có owner, scope, expiry và retention.

### 12.2. AI trong báo cáo

AI chỉ tổng hợp dữ liệu người dùng có quyền truy cập, nêu nguồn và thời điểm dữ liệu, cảnh báo dữ liệu thiếu/mâu thuẫn, phân biệt dữ kiện với suy luận. AI không tự ký, duyệt hoặc gửi báo cáo chính thức; không đưa dữ liệu nhạy cảm ra dịch vụ ngoài nếu chưa được phê duyệt.

### 12.3. Dữ liệu báo cáo

Các khái niệm logic gồm report domains/org units/memberships/groups, templates/fields/versions, campaigns, requests/reviews, submissions/versions, approvals, attachments, AI extractions và activity/audit. Tái sử dụng `organization_scopes`, memberships, `attachments`, `ai_jobs`, `audit_events` và `data_exports` khi semantics phù hợp. Không tạo `report_activity_logs` nếu trùng `audit_events`; `report_attachments` chỉ là bảng quan hệ nếu cần.

### 12.5. Hai mẫu báo cáo bổ sung: quà Công đoàn và quân trang

Tài liệu Excel người dùng cung cấp có **02 trang tính riêng**, tương ứng với 02 mẫu nghiệp vụ độc lập. HTS cần đưa chúng vào Trung tâm Báo cáo số dưới dạng hai mẫu báo cáo riêng, không gộp thành một biểu mẫu vì mục đích và nhóm dữ liệu khác nhau.

#### Mẫu 1 – Danh sách nhận quà Công đoàn

**Tên mẫu theo tệp nguồn:** “DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN” và tiêu đề kỳ báo cáo “DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN NĂM……”.

Các trường thể hiện trong biểu mẫu:
- Thông tin tổ chức: Đơn vị cấp trên, Đơn vị cấp dưới.
- Thông tin người nhận: STT, Họ và tên, Cấp bậc, Chức vụ, Đơn vị, CCCD, SĐT.
- Nơi nhận: VPVT, Hải đội 433, Trạm Nghệ An, Hải Phòng (Hải đoàn).
- Thông tin người nhận hộ: Họ tên, cấp bậc, chức vụ, đơn vị, SĐT, địa chỉ.
- Ghi chú và dòng Tổng cộng.

**Mục đích nghiệp vụ:** lập danh sách người được nhận quà Công đoàn, xác định nơi nhận; ghi nhận thông tin người nhận hộ khi người nhận không trực tiếp nhận quà; tổng hợp số lượng cuối danh sách.

#### Mẫu 2 – Danh sách nhận quân trang

**Tên mẫu theo tệp nguồn:** “DANH SÁCH TIÊU CHUẨN QUÂN TRANG NĂM” và “DANH SÁCH NHẬN QUÂN TRANG NĂM…..”.

Các trường thể hiện trong biểu mẫu:
- Thông tin tổ chức: Đơn vị cấp trên, Đơn vị cấp dưới.
- Thông tin quân nhân/người nhận: STT, Họ và tên, Cấp bậc, Chức vụ, Đơn vị, CCCD, SĐT, SĐT nhận hộ.
- Nơi nhận: VPVT, Hải đội 433, Trạm Nghệ An, Hải Phòng (Hải đoàn).
- Thông tin quân trang: Quân phục đông và Quân phục hè, mỗi loại có các cỡ số 3, 4, 5.
- Các thông tin bổ sung: Số mũ, Số giày, Đơn vị nợ quân trang năm…, Ghi chú và dòng Tổng cộng.

**Mục đích nghiệp vụ:** thống kê người nhận và số lượng/cỡ quân trang theo từng loại; theo dõi số mũ, số giày và phần quân trang đơn vị còn nợ theo năm.

#### Quy tắc triển khai hai mẫu trong HTS

1. Tạo hai `report_templates` độc lập, có mã mẫu ổn định, tên, phiên bản, đơn vị quản lý, năm/kỳ báo cáo, trạng thái và người tạo/cập nhật.
2. Cho phép nhập trực tiếp, nhập Excel theo mẫu, kiểm tra dữ liệu, lưu bản nháp, trình duyệt, phê duyệt và xuất Excel/PDF. Không mặc định dữ liệu Excel tải lên là đã được xác minh.
3. Với mẫu quà Công đoàn, phần “Nơi nhận” là lựa chọn theo các địa điểm có trong mẫu nguồn; thông tin người nhận hộ là nhóm trường riêng và chỉ nhập khi có người nhận hộ.
4. Với mẫu quân trang, số lượng theo cỡ số phải được lưu tách biệt theo loại quân phục (đông/hè) và cỡ (3/4/5), không nhập chung vào một ô văn bản. Số mũ, số giày và quân trang còn nợ là các trường riêng.
5. Có dòng tổng cộng và chức năng tổng hợp theo đơn vị, nơi nhận, loại quân trang/cỡ số và năm khi phù hợp. Công thức tính tổng phải được kiểm thử, không suy đoán đơn vị tính nếu biểu mẫu/chủ quản chưa xác nhận.
6. CCCD, số điện thoại, địa chỉ và thông tin người nhận hộ là dữ liệu cá nhân. Phải giới hạn quyền xem/sửa/xuất theo nhiệm vụ; che/mask khi không cần hiển thị đầy đủ; ghi audit khi truy cập hoặc export. Không đưa các trường này vào báo cáo công khai.
7. Tên địa điểm trong tệp là các giá trị có sẵn của mẫu nguồn, không mặc định rằng mọi đơn vị đều sử dụng tất cả lựa chọn. Quản trị có thẩm quyền được cấu hình danh mục theo đơn vị và từng kỳ.
8. Hai mẫu này là mẫu nghiệp vụ được bổ sung từ tệp Excel ngày 27/11/2026; chưa có căn cứ để kết luận chúng đã được triển khai trong cơ sở dữ liệu hoặc giao diện HTS. Cần xác nhận đơn vị chủ quản, người lập, người kiểm tra/người duyệt, quy tắc tính tổng và thời hạn lưu trước khi phát hành chính thức.

### 12.4. Xuất dữ liệu

PDF/Excel phải giới hạn trường, bản ghi và phạm vi theo quyền. Export có người yêu cầu, lý do/mục đích, thời điểm, scope, thời hạn, trạng thái và audit. Không tạo link public dài hạn cho file riêng tư.

---

## 13. ĐIỂM DANH VÀ DỮ LIỆU SINH TRẮC HỌC

### 13.1. Mục tiêu và chu kỳ

Điểm danh cần gắn với buổi học/lớp/nhóm/đơn vị, lịch và chính sách. Yêu cầu sản phẩm đã nêu chu kỳ 15 phút, khoảng nhận diện 10 phút cho các nhóm áp dụng; cần đặc tả chính xác mốc bắt đầu/kết thúc, grace period, ngoại lệ và cách tính thời gian tham gia trước khi triển khai.

`Công dân học tập` và `Công nhân học tập` không áp dụng kiểm tra điểm danh định kỳ theo nhận diện khuôn mặt như yêu cầu bổ sung; điều này không mặc nhiên có nghĩa miễn mọi hình thức điểm danh nếu nghiệp vụ khác được duyệt.

### 13.2. Phương thức xác nhận

Không mặc định bắt buộc nhận diện khuôn mặt. Cần có phương thức thay thế tương đương như QR có thời hạn, mã buổi học, giáo viên xác nhận hoặc quy trình thủ công có audit. Mất mạng, thiết bị không hỗ trợ, không thể/không muốn dùng sinh trắc phải có cách xử lý không gây bất lợi không hợp lý.

### 13.3. Dữ liệu và quyền

Các bảng logic có thể gồm `attendance_sessions`, `attendance_records`, `attendance_verifications`; không tạo bảng tên khác cùng semantics. Quan hệ tới account, membership, class/group, course/lesson và teacher assignment phải kiểm tra server-side. Mọi sửa kết quả/xác minh thủ công/export cần audit.

### 13.4. Sinh trắc học

- Chỉ xem xét sau đánh giá pháp lý, quyền riêng tư, tính cần thiết/tương xứng, consent/thông báo phù hợp và phê duyệt thẩm quyền.
- Không lưu ảnh chụp liên tục hoặc mẫu khuôn mặt trong D1.
- Không sử dụng ảnh/mẫu cho quảng cáo, nhận diện cảm xúc, huấn luyện AI hoặc mục đích ngoài điểm danh đã thông báo.
- Nếu có lưu mẫu được phép, cần kho chuyên dụng, mã hóa, tách khóa, quyền truy cập hạn chế, audit, retention ngắn nhất và quy trình xóa kiểm chứng.
- Với trẻ em và Lực lượng vũ trang, yêu cầu bảo vệ và phê duyệt đặc biệt; không gửi dữ liệu định danh/sinh trắc tới AI công cộng.

---

## 14. TỆP, CLOUDFLARE R2 VÀ XUẤT DỮ LIỆU

- R2 private-by-default; bucket và binding tách môi trường.
- D1 lưu metadata: owner, purpose, scope, object key opaque, MIME/size/checksum, trạng thái/quarantine/expiry; không lưu bytes.
- Object key ngẫu nhiên, không chứa email, tên, số hồ sơ hoặc nội dung nhạy cảm.
- Worker kiểm tra session, permission, owner, scope và membership trước upload/download/preview/export/delete.
- Kiểm tra loại MIME dựa trên nội dung, kích thước, checksum, tên file và quarantine/malware scanning nếu được duyệt.
- URL ký nếu dùng phải ngắn hạn, single-purpose; URL/object key không tự nó là quyền truy cập.
- File riêng tư không cache public; chống content sniffing; không render HTML/SVG không tin cậy từ origin đáng tin.
- Retention, expiry, xóa object và metadata, backup và audit phải được xác định trước triển khai.
- Không upload giấy tờ Lực lượng vũ trang hoặc dữ liệu sinh trắc thật trước khi được phê duyệt về thẩm quyền và hạ tầng lưu trữ.

---

## 15. NHẬT KÝ, BẢO MẬT, QUYỀN RIÊNG TƯ VÀ LƯU GIỮ DỮ LIỆU

### 15.1. Phân biệt nhật ký

- `security_events`: login success/fail, lockout, reset/recovery, MFA challenge, session revoke, security alert.
- `audit_events`: approve/reject, grant/revoke, thay đổi giá, xác minh Pi, xem/tải/export dữ liệu nhạy cảm, quyết định membership, publish/update nội dung theo scope.

Không tạo nhiều bảng audit chỉ khác tên nhưng cùng mục đích. Có thể dùng `event_domain` để phân biệt lĩnh vực; vẫn phải giữ ranh giới giữa sự kiện bảo mật và audit nghiệp vụ.

### 15.2. Trường tối thiểu

Actor (nullable khi chưa xác thực), action, target type/id, scope, outcome, timestamp UTC, correlation ID và reason tối thiểu. Không log password, token, cookie, wallet secrets, nội dung giấy tờ, ảnh/mẫu sinh trắc hoặc payload nhạy cảm không cần thiết.

### 15.3. Quyền và tính toàn vẹn

Chỉ service được phép ghi; user/admin thông thường không được sửa/xóa. Quyền đọc audit phải riêng và giới hạn theo scope. Cần chính sách retention, backup/immutability phù hợp, cảnh báo hành vi đặc quyền và quy trình xử lý sự cố.

### 15.4. Quyền riêng tư và dữ liệu đặc biệt

Trước khi xử lý dữ liệu trẻ em, sinh trắc, hồ sơ xác minh, dân cư hoặc thông tin đơn vị, phải xác định mục đích, căn cứ, người có thẩm quyền, trường dữ liệu tối thiểu, retention, quyền truy cập, xử lý yêu cầu chủ thể và quy trình sự cố. Không đưa dữ liệu mật hoặc dữ liệu vượt thẩm quyền vào HTS.

---

## 16. DANH MỤC DỮ LIỆU D1 HỢP NHẤT VÀ QUY TẮC CHỐNG TRÙNG

> **Cảnh báo:** Danh sách dưới đây là mô hình logic/canonical để thiết kế và đối chiếu, không phải danh sách bảng đã tồn tại. Không chạy SQL/migration chỉ dựa vào danh sách này. Phải inventory D1 local/test/remote được phê duyệt trước.

### 16.1. Lõi nền tảng và xác thực – ưu tiên Giai đoạn 1

| Nhóm | Tên logic canonical/ứng viên | Ghi chú |
|---|---|---|
| Account | `accounts`, `account_identity_links`, `user_profiles` | Một account duy nhất; profile tách credential/role. |
| Credential/session | `auth_credentials`, `auth_sessions`, `email_verifications`, `password_reset_tokens`, `account_recovery_requests` | Token chỉ lưu digest; expiry, revoke, one-time use. |
| Danh mục | `learning_fields`, `roles`, `permissions`, `role_permissions` | Seed có version, idempotent; bảy field chính thức. |
| Membership | `learning_field_memberships` | N:M account-field; status/approval riêng. |
| RBAC/scope | `role_grants`, `permission_grants`, `role_grant_history`, `organization_scopes`, `scope_relations` | Grant có account, role/permission, scope, hiệu lực, actor. |
| Workflow admin | `admin_requests`, `admin_request_reviews` | Request không tự cấp grant. |
| Audit | `audit_events`, `security_events` | Audit nghiệp vụ và security tách mục đích. |
| Tệp | `attachments` | Metadata/private object reference; bytes ở R2. |
| Xác minh Lực lượng vũ trang | `military_member_approval_requests` | Workflow xác minh; membership chỉ active sau phê duyệt. |

### 16.2. Gói quản trị và Pi

`entitlement_plans`, `entitlement_plan_prices`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications`, `entitlement_subscriptions`. Tên `entitlements` và `entitlement_subscriptions` cần hợp nhất thành một semantics được chốt; không tạo hai bảng trùng. `role_grants` là nguồn quyền thực tế, subscription/payment chỉ là điều kiện/nguồn tham chiếu.

### 16.3. Học tập cơ bản miễn phí

`courses`, `lessons`, `learning_progress`. Bổ sung `lesson_versions` chỉ khi yêu cầu versioning đã được chốt. Tất cả dữ liệu liên kết field và membership/permission; không phụ thuộc admin subscription.

### 16.4. Giáo dục, tổ chức và phân công

Các ứng viên: `education_sectors`, `education_units`, `education_systems`, `curriculum_frameworks`, `curriculum_versions`, `education_stages`, `schools`, `campuses`, `academic_years`, `grades`, `classes`, `subjects`, `content_topics`, `curriculum_subjects`, `topics`, `learning_standards`, `school_memberships`, `class_memberships`, `student_memberships`, `teacher_assignments`, `school_leadership_assignments`, `group_memberships`, `unit_memberships`, `group_leader_assignments`, `group_leader_proposals`.

`class_memberships` và `student_memberships` chỉ giữ cả hai nếu semantics khác nhau rõ ràng; nếu cùng quan hệ thì chọn một canonical. `organization_scopes/scope_relations` dùng chung cho cây tổ chức nếu đáp ứng semantics, không thay thế các bảng domain cần thiết.

### 16.5. Học liệu, nội dung, bài tập và AI

`learning_materials`, `learning_material_versions`, `learning_material_classifications`, `learning_material_sources`, `source_references`, `lesson_versions`, `lesson_sections`, `lesson_citations`, `lesson_review_requests`, `lesson_publication_records`, `exercise_sets`, `questions`, `learning_assignments`, `assignment_submissions`, `learning_events`, `mastery_snapshots`, `content_review_requests`, `content_review_decisions`, `copyright_clearance`, `ai_jobs`, `ai_extractions`, `ai_sessions`, `ai_messages`, `ai_usage_ledger`.

`ai_jobs` là nguồn điều phối job chung; `report_ai_extractions` chỉ là quan hệ/kết quả domain nếu thật sự cần, không sao chép payload hoặc pipeline AI.

### 16.6. Thi, điểm và điểm danh

`exams`, `exam_schedules`, `exam_candidates`, `exam_questions`, `exam_attempts`, `exam_answers`, `exam_results`, `exam_result_versions`, `exam_import_batches`, `exam_import_rows`, `exam_warnings`, `exam_score_reviews`, `exam_score_approvals`, `attendance_sessions`, `attendance_records`, `attendance_verifications`.

Đây là phân hệ nghiệp vụ riêng, không tạo trong migration lõi nếu chưa có scope, owner, retention, policy và test.

### 16.7. Trung tâm Báo cáo số

`report_domains`, `report_org_units`, `report_memberships`, `report_groups`, `report_group_members`, `report_group_role_history`, `report_templates`, `report_template_fields`, `report_template_versions`, `report_campaigns`, `report_requests`, `report_request_reviews`, `report_submissions`, `report_submission_versions`, `report_approvals`, `report_attachments`, `report_ai_extractions`, `report_activity_logs`, `data_exports`.

Tái sử dụng account/membership/scope, `attachments`, `ai_jobs`, `audit_events` và `data_exports` nếu semantics phù hợp. `report_activity_logs` không tạo nếu trùng audit; `report_attachments` chỉ là bảng nối khi cần.

### 16.8. Dân Cư Số – ngoài Giai đoạn 1

`civic_areas`, `civic_village_admin_assignments`, `civic_households`, `civic_residents`, `civic_household_members`, `civic_residency_events`, `civic_import_jobs`, `civic_import_records`, `civic_documents`, `civic_data_corrections`, `civic_access_audit`, `civic_retention_policies`.

Chưa thu thập/di trú dữ liệu thật khi chưa có căn cứ, thẩm quyền và đánh giá riêng. Audit/retention có thể dùng hạ tầng chung; không tạo bảng chỉ vì tên xuất hiện trong README.

### 16.9. Workflow Lực lượng vũ trang và biểu mẫu

`military_member_approval_requests`, `military_unit_approval_documents` (chỉ khi metadata workflow riêng là cần thiết), `military_gift_registration_forms`, `military_uniform_registration_forms`, `military_registration_versions`, `content_submission_requests`, `content_submission_summaries`, `content_approval_records`, `content_delivery_records`.

Tệp xác minh dùng `attachments` + bảng quan hệ nếu cần; không lưu bytes hoặc URL công khai. `group_leader_history`, `group_leader_approvals`, `group_membership_history`, `class_membership_history` cần hợp nhất với grant/assignment history và audit nếu cùng semantics.

### 16.10. Commerce, tương tác và thông báo

`sellers`, `shops`, `products`, `product_price_history`, `orders`, `order_items`, `notifications`, `announcements`, `contextual_help`, `news_articles`, `social_posts`, `social_comments`, `social_likes`, `chat_threads`, `chat_messages`, `platform_public_profile`, `feature_guides`, `feature_guide_versions`.

Marketplace `orders` là đơn hàng sản phẩm; `pi_payment_orders` là đơn thanh toán quyền quản trị. Có thể thiết kế payment ledger dùng chung sau này nhưng không nhầm hai nghiệp vụ và không nhân bản giao dịch.

### 16.11. Quy tắc hợp nhất tên trùng

| Tên/biến thể xuất hiện | Hướng canonical đề xuất |
|---|---|
| `profiles` | `user_profiles` |
| `learning_categories`, `user_field_memberships` | Tách `learning_fields` và `learning_field_memberships` |
| `user_roles`, `admin_permission_grants`, `admin_permission_definitions`, `admin_permission_groups` | Chuẩn hóa `roles`, `permissions`, `role_permissions`, `role_grants`, `permission_grants` |
| `organization_scope_relations` | `scope_relations` |
| `audit_logs`, `permission_audit`, `admin_permission_audit`, `report_activity_logs`, `military_access_audit`, `civic_access_audit`, `entitlement_audit*` | `audit_events` với `event_domain`, action, actor, target, scope, outcome; giữ `security_events` riêng cho security |
| `military_unit_memberships` | `unit_memberships` nếu semantics tương đương |
| `military_learning_groups`, `military_group_members` | `organization_scopes` + `group_memberships` nếu đáp ứng semantics |
| `entitlements`, `entitlement_subscriptions` | Chọn một bảng entitlement subscription canonical; `role_grants` vẫn là nguồn quyền |
| `pi_payment_transactions`, `entitlement_transactions` | `pi_payment_transactions` nếu cùng giao dịch Pi |
| `attachments`, `report_attachments`, `data_exports` | `attachments` cho metadata; bảng nối `report_attachments` nếu cần; `data_exports` cho artifact export có expiry |
| `lessons` | Một bảng `lessons`; versioning tách nếu yêu cầu |

`member_statuses` có thể chỉ là danh mục trạng thái/enum/check, không mặc định tạo bảng lookup.

---

## 17. MIGRATION, SAO LƯU, MÔI TRƯỜNG VÀ TRIỂN KHAI

### 17.1. Môi trường

Phải phân biệt D1 local, test, staging và production. `wrangler.jsonc`, binding `DB`, database name/ID hoặc `.wrangler/state` không chứng minh database remote/production đang tồn tại hoặc đang chứa schema nào.

### 17.2. Quy trình bắt buộc trước migration

1. Chủ dự án xác nhận môi trường và quyền truy cập chỉ-đọc.
2. Inventory schema, migrations, indexes, FK, triggers, bảng, quan hệ và dữ liệu cần thiết theo quyền.
3. Xác định bảng trùng semantics và mapping dữ liệu.
4. Backup và diễn tập restore trên môi trường thử nghiệm.
5. Chốt canonical schema, retention, account mapping, root bootstrap, role/scope, membership, R2, Pi và dữ liệu đặc biệt.
6. Thiết lập migration framework tương thích Wrangler/D1; migration nhỏ, tuần tự, idempotent cho seed.
7. Test migration trên D1 test trống và bản sao dữ liệu giả/đã giảm định danh.
8. Chỉ sau khi test, backup/restore và phê duyệt mới xem xét staging/production.

Không sửa migration đã chạy; thay đổi phá hủy/rename phải có migration chuyển đổi riêng, backup, test, rollback/restore và phê duyệt. D1 cần kiểm tra foreign-key enforcement, unique/check constraints, indexes và transaction semantics phù hợp giới hạn D1.

### 17.3. Thứ tự migration logic đề xuất

Đây là thứ tự phụ thuộc, không phải migration đã tạo hoặc được phép chạy:

1. `0001_platform_reference`: `learning_fields`, `roles`, `permissions` và seed versioned.
2. `0002_accounts_profiles_scopes`: `accounts`, `account_identity_links`, `user_profiles`, `organization_scopes`, `scope_relations`.
3. `0003_audit_security`: `audit_events`, `security_events`.
4. `0004_auth_sessions_credentials`: credentials, sessions, email verification, reset/recovery.
5. `0005_role_permission_grants`: role/permission grants và history.
6. `0006_memberships_admin_workflow`: memberships, admin requests/reviews.
7. `0007_attachments_military_verification`: attachments và workflow xác minh Lực lượng vũ trang; chỉ sau phê duyệt hạ tầng/dữ liệu.
8. `0008_admin_entitlements_pi`: plan/prices/orders/transactions/verifications/subscriptions.
9. `0009_learning_core`: courses, lessons, learning_progress.
10. `0010_indexes_constraints_hardening`: indexes, constraints và kiểm thử invariants.

### 17.4. Ranh giới production

Không chạy migration, SQL, deploy, thay binding hoặc thao tác database remote nếu chưa có xác nhận rõ ràng của chủ dự án, backup/restore đã thử, change plan và rollback. Không truy cập/xóa tài nguyên Supabase bên ngoài; báo cáo loại bỏ Supabase chỉ nói về repository/runtime được kiểm tra.

---

## 18. KIỂM THỬ VÀ TIÊU CHÍ NGHIỆM THU

### 18.1. Kỹ thuật

- `npm.cmd run typecheck` không lỗi.
- `npm.cmd run lint` không lỗi.
- `npm.cmd run build` thành công.
- `npx.cmd opennextjs-cloudflare build` thành công sau thay đổi cuối.
- Preview local chạy và truy cập D1 local đúng cấu hình; không nhầm local với remote.
- Unit/integration tests cho auth, permission, scope, membership, payment state, audit và file access.

### 18.2. Authentication/session

- Register, email verification, login, logout, logout-all, password reset/recovery có trạng thái rõ.
- Không lưu plaintext password/token; session expiry/revoke/account locked/password reset chặn request kế tiếp.
- Cookie bảo mật; rate limit; chống CSRF/origin; response không tiết lộ account existence.
- MFA bắt buộc Root; recovery không thể tự cấp Super Admin.

### 18.3. RBAC/membership

- Một account tham gia nhiều field và giữ tiến độ riêng.
- Join field không cấp role admin.
- Field Admin không tự cấp quyền, không đổi scope, không duyệt quyền của mình và không truy cập field khác.
- Teacher chỉ truy cập lớp/môn được phân công.
- Kiểm thử mọi tổ hợp role + permission + scope + expiry/status, IDOR, field A sang field B, read so với approve/export.

### 18.4. Pi/admin

- Paid chưa approve không cấp grant.
- Chỉ Root Super Admin đã xác minh được miễn gói.
- Sai amount/receiver/network/order, giao dịch trùng hoặc chưa final không được đánh dấu paid.
- Hết hạn/revoke chặn thao tác admin nhưng không khóa học tập.

### 18.5. Lực lượng vũ trang

- Trước approval, page/API/list/search/metadata/object/download đều deny và không rò rỉ metadata.
- Sau approval chỉ membership/scope active được phép.
- Suspend/revoke chặn ngay cả session cũ.
- File xác minh private, không public URL; dữ liệu thử nghiệm synthetic.

### 18.6. AI, báo cáo, điểm danh và R2

- AI không publish/approve/chốt điểm/xác minh tư cách.
- Báo cáo chính thức có yêu cầu/đợt và phê duyệt, export có scope/audit.
- Điểm danh có phương thức thay thế; sinh trắc chỉ sau phê duyệt.
- Upload/download/preview/export/delete đều authorize server-side; object key không đủ để truy cập.
- Backup/restore, retention, deletion và incident response được test.

---

## 19. LỘ TRÌNH TRIỂN KHAI THEO GIAI ĐOẠN

### Giai đoạn 0 – Chốt phạm vi và bảo toàn hiện trạng

- Sao lưu source/working tree và ghi nhận Git status.
- Kiểm kê tài liệu, mã nguồn, secrets, migrations và artefact.
- Xác định D1 local/test/staging/production; chưa truy cập remote khi chưa phê duyệt.
- Chốt chính sách dữ liệu nhạy cảm và phạm vi từng module.

### Giai đoạn 1 – Nền tảng kiến trúc và bảo mật

- Chốt schema canonical sau inventory.
- Hoàn thiện account, credentials, sessions, recovery, rate limit, origin/CSRF.
- Hoàn thiện roles, permissions, scope, membership, audit/security events.
- Bootstrap Root an toàn và MFA.
- Kiểm thử deny-by-default và chống IDOR.

### Giai đoạn 2 – Membership và xác minh Lực lượng vũ trang

- Tạo workflow request/review/approval/suspend/revoke.
- Kích hoạt membership chỉ sau approval.
- Gắn authorization vào mọi page/API/file/data query.
- Chưa nhận hồ sơ thật nếu chưa có phê duyệt thẩm quyền và hạ tầng.

### Giai đoạn 3 – Học tập cơ bản miễn phí và quản trị giáo dục

- Nối courses/lessons/progress với D1.
- Xây dựng tổ chức, lớp, môn, năm học, assignments và kết quả.
- Quy trình AI đề xuất – giáo viên rà soát – người được ủy quyền duyệt – phát hành.
- Bảo đảm không yêu cầu mua gói quản trị để học.

### Giai đoạn 4 – Pi và entitlement quản trị

- Chỉ sau khi tích hợp Pi chính thức/test được phê duyệt.
- Xác minh giao dịch server-side, idempotency, order snapshot.
- Tách paid/review/grant; chỉ Super Admin cấp quyền.

### Giai đoạn 5 – Bài giảng AI, báo cáo và kho tệp

- Nối AI qua provider adapter, giới hạn dữ liệu và audit.
- Template, campaigns, requests, approvals, submissions và exports.
- R2 private, upload/download broker và retention.

### Giai đoạn 6 – Thi, điểm danh và các module nhạy cảm

- Thi/giám sát/nhập điểm theo scope và quy trình duyệt.
- Điểm danh với phương thức thay thế; sinh trắc chỉ sau phê duyệt riêng.
- Dân Cư Số, marketplace, social và biểu mẫu chuyên ngành chỉ mở theo scope, chủ dữ liệu, retention và đánh giá rủi ro riêng.

### Giai đoạn 7 – Staging, nghiệm thu và production

- Test matrix đầy đủ, security review, backup/restore và rollback drill.
- Chủ dự án duyệt staging.
- Production chỉ sau change approval, backup, monitoring, incident contact và kế hoạch rollback.

---

## 20. QUYẾT ĐỊNH CÒN PHẢI CHỐT

1. D1 nào là local/test/staging/production; schema hiện hữu và ai được inventory chỉ-đọc.
2. Canonical schema cuối cùng, status, FK, unique/check/index và retention.
3. Mapping account cũ, duplicate email, verify lại email/password reset; không chuyển session secret.
4. Root bootstrap, MFA factor, recovery, break-glass và account ID đặc quyền.
5. Session idle/absolute timeout, số session đồng thời, IP/device metadata và retention.
6. Ma trận action × role × scope; quyền đọc audit; thời hạn grant; Field Admin nhiều field.
7. Cơ quan/đơn vị xác minh Lực lượng vũ trang, hồ sơ tối thiểu, người duyệt, khiếu nại, suspension/revoke và retention.
8. R2 bucket/account/region được phép, private policy, scanning, signed URL/proxy và backup.
9. Pi integration chính thức, network, receiver, finality, idempotency, đối soát, refund/appeal và thời điểm bắt đầu/cộng nối hạn.
10. Email provider, domain sender, CAPTCHA/bot policy và secret rotation.
11. Chính sách dữ liệu trẻ em, sinh trắc, dân cư, hồ sơ xác minh, retention, xóa/ẩn danh/legal hold.
12. Chu kỳ điểm danh 15 phút/10 phút, grace period, phương thức thay thế và phạm vi áp dụng.
13. Quy chế curriculum, versioning, thang điểm theo cấp học/môn và quy trình công bố.
14. Quyền, retention và ngoại lệ của Trung tâm Báo cáo; phạm vi báo cáo chính thức và export.

---

## 21. QUẢN LÝ TÀI LIỆU VÀ DANH MỤC TÀI LIỆU CŨ

### 21.1. Tài liệu chuẩn duy nhất trong `docs/`

Sau khi chủ dự án xác nhận bản hợp nhất này, đề xuất giữ duy nhất một tài liệu chuẩn trong `docs/`:

`docs/HTS_TAI_LIEU_THONG_NHAT.md`

Tài liệu này thay thế vai trò hướng dẫn/thiết kế phân tán của các tài liệu được hợp nhất. Không xóa tài liệu gốc ngay khi vừa chép file mới. Nên sao lưu thư mục `docs/` cũ ở ngoài repository hoặc nhánh/archive riêng trước khi thay thế.

### 21.2. Nhóm tài liệu được hợp nhất

Các nội dung sau đã được đối chiếu và hợp nhất theo chủ đề:

- Báo cáo rà soát Supabase/D1, báo cáo loại bỏ Supabase, báo cáo kết nối D1.
- Kiến trúc Cloudflare D1 canonical, kiến trúc tổng thể HTS, kế hoạch database/security.
- Thiết kế D1 Auth/RBAC, kế hoạch Giai đoạn 1, rà soát Giai đoạn 1, Giai đoạn 1–2.
- Thiết kế và rà soát xác minh Lực lượng vũ trang, kế hoạch khắc phục truy cập.
- Thiết kế quản trị giáo dục, bài giảng AI/curriculum, Trung tâm Báo cáo AI.
- Thiết kế điểm danh/sinh trắc học.
- Thiết kế subscription và thanh toán Pi.
- Hướng dẫn branch upload và gói bổ sung đợt 1.

### 21.3. Tài liệu lịch sử và bản sao

Các báo cáo kiểm toán/snapshot vẫn có giá trị chứng cứ lịch sử nhưng không nên tiếp tục nằm cùng tài liệu chuẩn đang áp dụng. Nếu cần giữ để tra cứu, lưu ngoài `docs/` hiện hành, ví dụ thư mục archive riêng hoặc kho lưu trữ an toàn. Không đưa các ZIP source review, cache build, `.wrangler`, `.next`, `.open-next`, `node_modules`, `.env` hoặc secrets vào tài liệu chuẩn.

### 21.4. Quy tắc thay thế an toàn

1. Sao lưu nguyên trạng `docs/` cũ.
2. Đưa file hợp nhất vào `docs/HTS_TAI_LIEU_THONG_NHAT.md`.
3. Mở file trong VS Code để kiểm tra tiếng Việt/Markdown và mục lục.
4. So sánh từng tên tài liệu cũ với danh mục hợp nhất; không xóa mã nguồn, migration hoặc cấu hình.
5. Chỉ xóa/di chuyển tài liệu cũ sau khi chủ dự án xác nhận bản mới đầy đủ.
6. Chạy `git status --short`, `git diff --check`; không commit/push trước khi rà soát secrets và xác nhận cuối.

---

## 22. PHỤ LỤC – TRẠNG THÁI KIỂM TRA MÃ NGUỒN NGÀY 27/11/2026

### 22.1. Các tệp đã được xem trong trao đổi

- `lib/auth/service.ts`
- `lib/auth/security.ts`
- `lib/db.ts`
- `lib/d1/repository.ts`
- `lib/auth/http.ts`
- `lib/auth/field-access.ts`

Đây là kiểm tra các tệp được người dùng dán vào hội thoại, không phải kiểm toán toàn bộ repository hoặc xác nhận toàn bộ route/API đã dùng đúng các hàm này.

### 22.2. Nhận xét cụ thể

- `lib/auth/security.ts`: token opaque ngẫu nhiên, SHA-256 digest, cookie HttpOnly, PBKDF2-SHA256, kiểm tra password format và so sánh byte không dừng sớm. Cần benchmark password hashing trên Workers, kiểm tra input của `verifyPassword()` và rà soát toàn bộ luồng session.
- `lib/auth/service.ts`: tạo session 7 ngày; đọc user từ `auth_sessions`, `auth_credentials`, `profiles`; tải Super Admin, Field Admin, staff grants, learning fields và target groups. Cần thống nhất so sánh `expires_at` với định dạng ISO được lưu; kiểm tra account status/role grants và các nơi gọi authorization.
- `lib/db.ts`: lấy D1 binding qua `getCloudflareContext({ async: true })`, phân biệt lỗi runtime và thiếu binding. Cấu trúc hợp lý; cần xác minh type/environment config và runtime thực tế.
- `lib/d1/repository.ts`: bind parameters, validate values, bọc lỗi cho first/all/run/batch. Repository không tự authorize; mọi service/API caller phải kiểm tra quyền và scope.
- `lib/auth/http.ts`: có same-origin check cho mutation, JSON size/type validation, schema probe và safe error response. Cần parse Content-Type chính xác thay vì chỉ `includes()`, kiểm tra tương thích Origin trong các luồng triển khai hợp lệ và hiểu rằng schema probe chỉ kiểm tra một số bảng được liệt kê.
- `lib/auth/field-access.ts`: fail-closed; hiện không có nhánh cấp `granted`, nên workflow membership approval cần triển khai trước khi mở khu vực Lực lượng vũ trang.

### 22.3. Các điểm phải xử lý trước production

1. Kiểm tra expiry timestamp trong D1 bằng test case hết hạn/đang hạn, chuẩn hóa UTC.
2. Kiểm tra account status, session revoke và reset-password invalidation trên mọi request.
3. Rà soát toàn bộ API/Server Actions để đảm bảo authorize server-side và scope-filtered queries.
4. Hoàn thiện workflow Lực lượng vũ trang trước khi có bất kỳ nội dung/metadata/file nội bộ nào được trả về.
5. Kiểm tra rate limit không dùng giá trị IP không đáng tin; test qua Cloudflare runtime.
6. Rà soát migration/schema thực, bảng `profiles` so với canonical `user_profiles`/`accounts`, và các bảng auth/grant hiện dùng.
7. Kiểm tra secrets trong `http-source.txt`, ZIP và mọi tệp cấu hình trước khi stage Git.
8. Chạy lại OpenNext Cloudflare build sau các thay đổi cuối và test local preview.

---

## KẾT LUẬN

Tài liệu này là bản hợp nhất để làm nguồn tham chiếu duy nhất cho yêu cầu nghiệp vụ và kiến trúc HTS. Nó không biến các thiết kế thành chức năng đã triển khai. Hiện tại TypeScript, ESLint và Next.js build đã được xác nhận thành công trong lần kiểm tra ngày 27/11/2026; OpenNext cần chạy lại sau thay đổi cuối. Auth/D1 đã có một số module nền được gửi để rà soát, nhưng authorization nghiệp vụ, membership Lực lượng vũ trang, schema/migrations thực, các API phân hệ, R2 và Pi production vẫn cần hoàn thiện/kiểm chứng.

**Không triển khai migration hoặc production, không xóa dữ liệu và không xóa tài liệu gốc cho đến khi inventory, backup/restore, rà soát bảo mật và phê duyệt của chủ dự án hoàn tất.**


### Bổ sung nguồn tài liệu – 27/11/2026

Tệp `Mẫu nhận quà công đoàn và quân trang(1).xlsx` được kiểm tra có hai trang tính: `DANH SÁCH NHẬN QUÀ CÔNG ĐOÀN` và `DANH SÁCH NHẬN QUÂN TRANG`. Hai mẫu đã được mô tả thành hai mục độc lập tại **12.5**. Nội dung mô tả bám theo tiêu đề và trường dữ liệu thực tế trong hai trang tính; các quy tắc triển khai trong HTS được đánh dấu là yêu cầu đề xuất, không phải chức năng đã tồn tại.


---

# PHỤ LỤC README – DÂN CƯ SỐ (PHÂN HỆ ĐỀ XUẤT, CHƯA MẶC ĐỊNH ĐƯỢC PHÊ DUYỆT)

Dân Cư Số từng được mô tả trong hồ sơ README phiên bản trước như một phân hệ hỗ trợ quản lý hộ gia đình, thành viên và biến động hành chính ở cấp thôn. Nội dung dưới đây được giữ lại để không thất lạc yêu cầu lịch sử, nhưng **không thuộc phạm vi lõi đã chốt để triển khai ngay** và không phải cơ sở dữ liệu dân cư quốc gia.

## Mục tiêu và giới hạn

- Chỉ hỗ trợ đơn vị được giao quản lý dữ liệu trong phạm vi có căn cứ và thẩm quyền hợp pháp.
- Có thể tổ chức thông tin hộ, thành viên, địa bàn và lịch sử biến động; mọi thay đổi phải có người thực hiện, người xác nhận, thời điểm và lý do.
- Không thay thế cơ quan đăng ký/quản lý cư trú hoặc hệ thống dữ liệu nhà nước có thẩm quyền.
- Không triển khai dữ liệu dân cư thật trước khi có phê duyệt pháp lý, bảo mật, lưu trữ, phân quyền, thời hạn lưu và quy trình xử lý sự cố.

## Vai trò và giới hạn quyền

- Quản trị phân hệ: chỉ được cấp quyền và phạm vi bởi Super Admin có thẩm quyền.
- Trưởng thôn: chỉ thao tác trong địa bàn được giao; không mặc định xem địa bàn khác.
- Cán bộ hỗ trợ: chỉ được nhập hoặc đề xuất sửa theo quyền cụ thể; không mặc định được duyệt, xóa hoặc xuất toàn bộ dữ liệu.
- Người dân/thành viên hộ: chỉ xem hoặc đề nghị cập nhật dữ liệu liên quan đến mình theo quy trình được phê duyệt.

## Nhập liệu và bảo vệ dữ liệu

Có thể nghiên cứu nhập liệu bằng biểu mẫu, Excel/CSV, tài liệu hoặc OCR hỗ trợ. AI chỉ trích xuất/đề xuất; con người phải đối chiếu và xác nhận. Không dùng số CCCD làm khóa chính; không tự suy đoán dữ liệu thiếu hoặc mờ. Không đưa ảnh giấy tờ, danh sách dân cư hay dữ liệu thật lên GitHub, môi trường demo hoặc công cụ AI công cộng.

Bắt buộc có phân quyền theo địa bàn và nhiệm vụ, MFA cho tài khoản quản trị, mã hóa, nhật ký truy cập/sửa/xuất/chia sẻ, giới hạn xuất hàng loạt, sao lưu/khôi phục và chính sách lưu giữ/xóa. Chỉ sử dụng dữ liệu giả lập trong giai đoạn thiết kế và kiểm thử.

---

# LỊCH SỬ VÀ PHẠM VI CẬP NHẬT README

- **v6.0 – 27/11/2026:** Hợp nhất README v5.0 với tài liệu HTS tổng hợp chuẩn; chuẩn hóa kiến trúc Workers + D1; làm rõ trạng thái đã quan sát/chưa triển khai; giữ Dân Cư Số ở phụ lục đề xuất; đưa hai mẫu báo cáo Công đoàn và quân trang vào đặc tả Trung tâm Báo cáo số.
- README không phải biên bản nghiệm thu. Trạng thái triển khai phải được cập nhật sau khi kiểm tra source, migrations, D1, môi trường và kết quả kiểm thử thực tế.

