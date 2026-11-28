# HỌC TẬP SỐ (HTS)
# TÀI LIỆU TỔNG HỢP CHUẨN – KIẾN TRÚC, NGHIỆP VỤ, DỮ LIỆU, BẢO MẬT VÀ LỘ TRÌNH TRIỂN KHAI

**Phiên bản:** 1.3 – Bản bổ sung phạm vi hệ sinh thái ngày 28/11/2026  
**Ngày cập nhật:** 28/11/2026  
**Phạm vi:** Hợp nhất các tài liệu thiết kế, kế hoạch, báo cáo kiểm toán và báo cáo triển khai đã được cung cấp trong cuộc trao đổi; bổ sung phần trạng thái kiểm tra mã nguồn được xác nhận trong cuộc trao đổi ngày 27/11/2026.  
**Trạng thái:** Tài liệu chuẩn nghiệp vụ/kỹ thuật hợp nhất để thay thế bộ tài liệu phân tán trong `docs/`. Đây không phải xác nhận HTS đã hoàn tất triển khai hoặc đủ điều kiện vận hành production.

> **Quy tắc đọc tài liệu:** Các nội dung được gắn nhãn **ĐÃ QUYẾT ĐỊNH** là chính sách/kiến trúc đã được xác nhận trong hồ sơ. Nội dung **HIỆN TRẠNG ĐÃ QUAN SÁT** chỉ phản ánh mã nguồn hoặc kết quả kiểm tra được cung cấp tại thời điểm ghi nhận. Nội dung **ĐỀ XUẤT/CHỜ PHÊ DUYỆT** chưa được coi là chức năng hoặc chính sách đã triển khai. Tên bảng là tên logic/canonical đề xuất cho đến khi kiểm kê schema D1 thực tế.

---

## MỤC LỤC

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
23. Trung tâm Kỹ thuật số (DTC)
24. Phạm vi hệ sinh thái: thương mại điện tử, mạng xã hội, Token HTS và từ thiện
25. Dân Cư Số và các phân hệ quản trị dữ liệu ngoài học tập
26. Bảng công việc, thứ tự ưu tiên và điều kiện mở giai đoạn

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

Tài liệu bao gồm kiến trúc backend, dữ liệu, xác thực, phân quyền, bảy lĩnh vực học tập, quản trị giáo dục, học liệu/AI, báo cáo, điểm danh, xác minh Lực lượng vũ trang, thanh toán Pi cho quyền quản trị, lưu trữ tệp và vận hành. Bản 1.3 bổ sung phạm vi nghiệp vụ cấp cao cho Mạng xã hội HTS, Sàn thương mại điện tử, Token HTS, hoạt động cộng đồng/từ thiện, Dân Cư Số và nguyên tắc tích hợp các phân hệ này với nền tảng dùng chung.

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
\n\n---\n\n# PHẦN CẬP NHẬT ĐƯỢC CHỦ DỰ ÁN XÁC NHẬN – 28/11/2026

> Phần này bổ sung và làm rõ yêu cầu phát triển HTS, đặc biệt là phân hệ **Lực lượng vũ trang**. Đây là đặc tả mục tiêu và kế hoạch giao việc cho AI/Copilot, không phải bằng chứng rằng các chức năng đã được lập trình hoặc nghiệm thu. Khi có khác biệt với lộ trình cũ trong tài liệu, phần cập nhật này là yêu cầu mới hơn do chủ dự án xác nhận; các nguyên tắc bảo mật, kiến trúc Workers + D1 và giới hạn production vẫn giữ nguyên.

## A. Định hướng phát triển tổng thể HTS

1. Phát triển HTS theo hướng nền tảng học tập, giảng dạy, quản lý giáo dục và kết nối cộng đồng học tập trên môi trường số.
2. Ưu tiên hoàn thiện Web2 trước; thiết kế kiến trúc có khả năng mở rộng Web3 về sau, không đưa tính năng Web3/Pi chưa được phê duyệt vào luồng bắt buộc của người học thông thường.
3. Giữ lại và kế thừa chức năng đang hoạt động; không xây dựng lại toàn bộ hệ thống, không xóa hoặc đổi tên tùy tiện route, component, API, migration hay dữ liệu hiện có.
4. Một tài khoản HTS có thể đăng ký nhiều lĩnh vực/nhóm học tập hợp lệ. Membership, vai trò, quyền, phạm vi, phân công và gói quản trị là các khái niệm độc lập.
5. Học tập thông thường trong cả bảy lĩnh vực miễn phí. Người học không cần tài khoản Pi, ví Pi hoặc giấy tờ định danh chỉ để truy cập nội dung học tập mở.
6. Pi chỉ là điều kiện của chức năng Pi hoặc một số entitlement quản trị đã được quy định. Pi UID phải được xác minh phía server; không lưu passphrase/secret ví. KYC, sở hữu ví hoặc thanh toán không tự động cấp role quản trị.
7. Super Admin tối cao chỉ được khởi tạo/xác minh theo quy trình có thẩm quyền; không tự tạo tài khoản Super Admin từ giao diện đăng ký thông thường. Super Admin có quyền phê duyệt/cấp và thu hồi phạm vi Field Admin.
8. Dùng feature flag tập trung với ba trạng thái `ACTIVE`, `COMING_SOON`, `HIDDEN`; kiểm tra ở cả server và client. Feature flag chỉ điều khiển khả năng hiển thị/khả dụng, không thay thế authorization.

## B. Bảy lĩnh vực học tập và quy tắc riêng

| Lĩnh vực | Quy tắc cốt lõi |
|---|---|
| Công dân học tập | Nội dung mở; không bắt buộc đăng nhập hoặc điểm danh định kỳ bằng nhận diện khuôn mặt. |
| Công nhân học tập | Nội dung mở; không bắt buộc đăng nhập hoặc điểm danh định kỳ bằng nhận diện khuôn mặt. |
| Sinh viên học tập | Học tập miễn phí; tài khoản/membership áp dụng theo chức năng. |
| Học sinh THPT | Học tập miễn phí; bảo vệ dữ liệu trẻ em và quyền của người giám hộ theo chính sách được duyệt. |
| Học sinh THCS | Học tập miễn phí; bảo vệ dữ liệu trẻ em và quyền của người giám hộ theo chính sách được duyệt. |
| Học sinh Tiểu học | Học tập miễn phí; bảo vệ dữ liệu trẻ em và quyền của người giám hộ theo chính sách được duyệt. |
| Lực lượng vũ trang | Khu vực hạn chế; mặc định từ chối cho đến khi tư cách và membership được xác minh/phê duyệt đúng thẩm quyền, đúng đơn vị và phạm vi. |

## C. Phân hệ Lực lượng vũ trang – phạm vi chức năng mục tiêu

Phân hệ được tổ chức thành **06 nhóm, 30 chức năng con**. Danh mục dưới đây là phạm vi sản phẩm cần khảo sát, thiết kế và triển khai theo từng giai đoạn; không khẳng định hiện đã có đủ các module.

### Nhóm 1 – Đào tạo, giáo dục (01–06)

1. Quản lý chương trình đào tạo.
2. Giáo dục chính trị.
3. Giáo dục pháp luật.
4. Huấn luyện nghiệp vụ.
5. Đào tạo công nghệ thông tin.
6. Đào tạo ngoại ngữ.

Mỗi chức năng cần xem xét danh mục chương trình, kế hoạch, nội dung/tài liệu, bài học, đối tượng học, tiến độ, kết quả và báo cáo theo quyền.

### Nhóm 2 – Huấn luyện, rèn luyện (07–11)

7. Kế hoạch huấn luyện.
8. Giáo dục thể chất và rèn luyện thể lực.
9. Điều lệnh, điều lệ và kỷ luật.
10. Kỹ năng chuyên môn.
11. Kết quả huấn luyện.

Quản lý lịch/kế hoạch, nội dung, người phụ trách, đối tượng tham gia, kết quả và thống kê; không tự đưa tài liệu mật hoặc dữ liệu nghiệp vụ nhạy cảm vào hệ thống thông thường.

### Nhóm 3 – Quản lý, điều hành (12–16)

12. Quản lý quân số học tập.
13. Quản lý cán bộ, giáo viên/giảng viên.
14. Quản lý đơn vị, tổ chức.
15. Lịch công tác và kế hoạch.
16. Hồ sơ học tập.

Hỗ trợ danh sách, tìm kiếm, lọc, nhóm, tiến độ, tổng hợp và xuất dữ liệu theo permission, scope và mục đích được duyệt. Không mặc định đây là hệ thống quản lý nhân sự/quân số chính thức của Quân đội.

### Nhóm 4 – Thi, kiểm tra, đánh giá (17–21)

17. Ngân hàng câu hỏi.
18. Thi trực tuyến.
19. Kiểm tra định kỳ.
20. Chấm điểm và xếp loại.
21. Theo dõi tiến độ và kết quả.

Hỗ trợ loại câu hỏi phù hợp, trộn câu hỏi/đáp án, lịch thi, lượt làm bài, tự động chấm câu hỏi có đáp án xác định, lưu lịch sử và báo cáo. AI chỉ gợi ý; điểm chính thức/xếp loại phải do người có thẩm quyền rà soát và phê duyệt. Có biện pháp chống gian lận tương xứng, không thu thập dữ liệu quá mức.

### Nhóm 5 – Học liệu, nghiên cứu (22–26)

22. Thư viện số.
23. Bài giảng điện tử.
24. Giáo trình và tài liệu tham khảo.
25. Nghiên cứu khoa học.
26. Sáng kiến, kinh nghiệm.

Quản lý phân loại, tìm kiếm, tác giả, nguồn, phiên bản, bản quyền, trạng thái rà soát/phê duyệt và lưu trữ. Không tải lên, lập chỉ mục, tóm tắt hoặc phân phối tài liệu mật/chưa được phép; nội dung hạn chế phải có kiểm soát truy cập trước khi trả cả metadata, kết quả tìm kiếm hay tệp.

### Nhóm 6 – Báo cáo, chuyển đổi số (27–30)

27. Trung tâm báo cáo.
28. Thống kê, phân tích.
29. Trợ lý AI học tập.
30. Dashboard tổng hợp.

Hỗ trợ báo cáo theo đơn vị/kỳ, tiến độ/kết quả/điểm danh, biểu đồ và export Excel/PDF theo quyền. AI được phân tích dữ liệu người dùng được phép xem và soạn bản nháp; báo cáo chính thức phải có người rà soát, phê duyệt.

## D. Các dịch vụ giáo dục dùng chung ngoài phân hệ Lực lượng vũ trang

- Quản lý chương trình, môn học, khóa học, bài học, lớp và nhóm học tập theo từng lĩnh vực.
- Một tài khoản có thể tham gia nhiều nhóm học; dữ liệu và nội dung chỉ hiển thị theo membership, vai trò và phạm vi hợp lệ.
- Dịch vụ giáo viên có thể gồm lập kế hoạch bài dạy, quản lý lớp/học sinh, ngân hàng câu hỏi, gợi ý chấm bài bằng AI, phân tích chất lượng dạy-học, thư viện học liệu và công cụ quản trị.
- Lớp học trực tuyến/nhóm học có thể gồm phòng học video, tài liệu, giao bài, thảo luận, điểm danh theo chính sách, kết quả và phân tích. WebRTC/video là hạng mục cần thiết kế, kiểm thử chi phí/bảo mật và phê duyệt riêng trước khi vận hành thực tế.
- AI hỗ trợ giáo viên và người học: giải thích, gợi ý, tạo bản nháp, phân tích tiến độ; giáo viên/người có thẩm quyền quyết định nội dung công bố và kết quả chính thức.

## E. Chính sách AI và nội dung

1. AI không được tự cấp role/permission/scope, xác minh danh tính hoặc membership Lực lượng vũ trang, phê duyệt quyền quản trị, phê duyệt thanh toán, công bố nội dung chính thức, ký hoặc phê duyệt báo cáo, hay chốt điểm chính thức.
2. Nội dung do AI tạo phải có trạng thái bản nháp, nguồn/phiên bản khi có, người chịu trách nhiệm và lịch sử chỉnh sửa.
3. Tin/bài lấy từ nguồn ngoài phải ghi nguồn, ngày truy cập và giữ ở trạng thái chờ con người rà soát; không tự đăng.
4. AI chỉ được xử lý dữ liệu mà người dùng hiện tại có quyền truy cập. Không đưa dữ liệu cá nhân nhạy cảm, hồ sơ quân sự, tài liệu mật hoặc dữ liệu sinh trắc sang dịch vụ AI ngoài khi chưa có phê duyệt và đánh giá riêng.
5. AI không xóa nội dung đã xuất bản; mọi thao tác sửa/ẩn/gỡ nội dung đã công bố thuộc người có thẩm quyền và phải audit.

## F. Quy tắc an toàn riêng cho Lực lượng vũ trang

- Mặc định deny. Chưa xác minh hoặc chưa được duyệt thì không trả nội dung, metadata, danh sách, kết quả tìm kiếm, preview, tệp hay export nội bộ.
- Quyết định duyệt phải ràng buộc account, tư cách, đơn vị, vai trò, scope, thời hạn và người duyệt. Thu hồi/đình chỉ phải chặn cả phiên hiện có, API, tìm kiếm, cache và URL tải tệp.
- Không dùng tài khoản Pi, ví Pi, KYC hoặc gói trả phí làm bằng chứng thay thế cho tư cách quân nhân hay phê duyệt của đơn vị.
- Không coi HTS là hệ thống lưu trữ bí mật nhà nước/quân sự. Chỉ dùng tài liệu được phép lưu trữ trong môi trường này; dữ liệu thực nhạy cảm cần thẩm quyền, đánh giá và phê duyệt riêng.
- Dữ liệu quân số, hồ sơ cá nhân, CCCD, số điện thoại, điểm thi và tệp phải tối thiểu hóa, che/mask, giới hạn export, audit và có thời hạn lưu.

## G. Kế hoạch triển khai phân hệ Lực lượng vũ trang – 08 giai đoạn

Thực hiện tuần tự, không giao AI làm đồng thời nhiều giai đoạn chồng lấn. Mỗi giai đoạn phải báo cáo kết quả và chờ chủ dự án xác nhận trước khi chuyển giai đoạn tiếp theo.

| Giai đoạn | Phạm vi | Kết quả bắt buộc |
|---|---|---|
| 1. Kiểm kê, lập bản đồ | Đọc cấu trúc `app/hoc-tap/luc-luong-vu-trang/`, `components/`, `lib/`, `app/api/`, `migrations/`, `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc`; rà soát module học viên, huấn luyện, điểm danh, giám sát, thi trực tuyến, tài liệu, báo cáo, import. | Báo cáo chức năng có sẵn/thiếu/đang hoạt động, tệp liên quan, phụ thuộc, rủi ro và đề xuất thay đổi. **Chỉ đọc, chưa sửa mã.** |
| 2. Menu và Dashboard | Hoàn thiện menu nhóm 6 nhóm/30 chức năng, mở rộng/thu gọn, icon, tìm kiếm, dashboard, responsive; tái sử dụng layout/component hiện có. | Điều hướng hợp lệ, trạng thái `ACTIVE`/`COMING_SOON`/`HIDDEN`, không làm hỏng header/sidebar chung hoặc sáu lĩnh vực còn lại. |
| 3. Đào tạo, giáo dục | Triển khai/hoàn thiện nhóm chức năng 01–06 và huấn luyện 07–11 theo inventory và scope được duyệt. | Kế hoạch, nội dung, người học, tiến độ, kết quả, thống kê; không dùng dữ liệu giả để giả lập đã kết nối backend. |
| 4. Quản lý, điều hành | Triển khai chức năng 12–16. | Quản lý quân số học tập, cán bộ/giáo viên, tổ chức, lịch/kế hoạch và hồ sơ; lọc/xuất theo quyền. |
| 5. Thi, kiểm tra, đánh giá | Triển khai chức năng 17–21. | Ngân hàng câu hỏi, lịch thi, lượt làm bài, chấm tự động phù hợp, rà soát điểm, phê duyệt và lịch sử. |
| 6. Học liệu, nghiên cứu | Triển khai chức năng 22–26. | Thư viện/bài giảng/tài liệu/nghiên cứu/sáng kiến có nguồn, phiên bản, bản quyền, duyệt và phân quyền. |
| 7. Báo cáo, phân tích, AI | Triển khai chức năng 27–30. | Trung tâm báo cáo, dashboard, thống kê và AI hỗ trợ; báo cáo chính thức có người duyệt. |
| 8. Kiểm thử và rà soát bảo mật | Kiểm thử toàn phân hệ và hồi quy các chức năng chung/sáu lĩnh vực còn lại. | Báo cáo typecheck, lint, build, test quyền, test deny-by-default, API, D1, R2, export, lỗi còn lại và tiêu chí nghiệm thu. |

### Quy tắc bắt buộc ở từng giai đoạn

1. Trước khi sửa, kiểm tra mã và schema D1/migrations hiện có; không tạo bảng trùng hoặc migration chỉ vì tên bảng xuất hiện trong tài liệu.
2. Không xóa, đổi tên, di chuyển hoặc viết lại trang/module đang có nếu chưa có lý do và phê duyệt rõ. Không phục hồi phần đã xóa theo suy đoán.
3. Không sửa package/dependency nếu không thật sự cần; không tự thay đổi cấu hình deploy, secret, database remote hoặc production.
4. Không dùng `git reset`, `git clean`, `git checkout` để ghi đè thay đổi; không commit, push, pull, sync hoặc đổi branch nếu chủ dự án chưa yêu cầu.
5. Không sửa chồng lên công việc Copilot đang chạy. Chỉ giao một giai đoạn tại một thời điểm; đợi Copilot hoàn tất và báo cáo trước khi giao giai đoạn tiếp theo.
6. Sau mỗi giai đoạn, chạy lần lượt `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`. Nếu lệnh nào lỗi, dừng chuyển giai đoạn, chỉ xử lý lỗi thuộc phạm vi được phép và báo cáo trung thực. Không tắt rule, không bỏ qua lỗi để làm xanh kiểm tra.
7. Không chạy migration remote, deploy hoặc thay đổi production. Mọi thao tác đó cần yêu cầu/phê duyệt riêng.
8. Sau mỗi giai đoạn báo cáo: chức năng hoàn thành/chưa hoàn thành; tệp tạo/sửa; API/service; schema/migration liên quan; quyền và bảo mật; ảnh hưởng tới chức năng cũ; kết quả ba lệnh kiểm tra; rủi ro và việc cần chủ dự án quyết định.

## H. Trạng thái tính năng và tiêu chí nghiệm thu

- `ACTIVE`: đã triển khai và kiểm thử đủ trong môi trường được nêu; cần ghi rõ phạm vi kiểm thử và phụ thuộc.
- `COMING_SOON`: đã có thiết kế/điểm vào nhưng chưa sẵn sàng cho người dùng; không được giả vờ là chức năng hoàn chỉnh.
- `HIDDEN`: chưa công bố/không cho truy cập; server vẫn phải từ chối request trực tiếp nếu chưa được cấp quyền.
- Một module chỉ được coi là hoàn thành khi UI, API/service, dữ liệu, authorization, audit, xử lý lỗi và kiểm thử tương ứng hoạt động. Giao diện tĩnh hoặc dữ liệu demo không đạt tiêu chí này.
- Không mở Lực lượng vũ trang cho người dùng thật trước khi kiểm thử độc lập xác minh tư cách, phê duyệt, thu hồi, session revoke, tìm kiếm, cache, tệp và export.

## I. Các quyết định tiếp tục cần chủ dự án xác nhận trước khi vận hành thực tế

1. Cơ quan/đơn vị có thẩm quyền xác minh và phê duyệt thành viên Lực lượng vũ trang; loại giấy tờ/chứng cứ được phép tiếp nhận.
2. Phân cấp đơn vị, phạm vi dữ liệu, người duyệt, thời hạn membership và quy trình khi chuyển đơn vị/ra quân/đình chỉ.
3. Phân loại tài liệu nào được phép lưu trong HTS; thời hạn lưu và cách xử lý khi có yêu cầu xóa/thu hồi.
4. Chính sách điểm danh, chu kỳ nhận diện (yêu cầu ban đầu nêu chu kỳ 15 phút và khoảng nhận diện 10 phút), ngoại lệ và phương thức thay thế không sinh trắc. Không triển khai nhận diện khuôn mặt trước khi phê duyệt riêng.
5. Quy tắc tính điểm/xếp loại, người có quyền chốt điểm, thời hạn phúc khảo và lưu lịch sử.
6. Nhà cung cấp AI/video/email, dữ liệu được phép gửi, vị trí xử lý, chi phí, lưu giữ và cơ chế tắt khẩn cấp.
7. Danh mục feature flag, owner, trạng thái mặc định và quy trình phát hành từng nhóm người dùng.

## J. Chỉ dẫn giao việc cho AI/Copilot

Chủ dự án sẽ cung cấp một prompt nguyên tắc chung, sau đó gửi riêng từng prompt giai đoạn 1 đến 8. AI phải bắt đầu bằng kiểm kê, không viết mã trước khi báo cáo hiện trạng và đề xuất tệp cần thay đổi. Chỉ chuyển giai đoạn sau khi chủ dự án xem xét, xác nhận báo cáo của giai đoạn trước. AI phải tuân thủ toàn bộ giới hạn tại các mục trên và kiến trúc chuẩn của HTS.


## K. Liên kết giữa hai mẫu báo cáo bổ sung và phân hệ Lực lượng vũ trang

Hai mẫu **Danh sách nhận quà Công đoàn** và **Danh sách nhận quân trang** tại mục 12.5 vẫn là hai mẫu báo cáo nghiệp vụ độc lập. Không mặc định cả hai mẫu đều thuộc phân hệ Lực lượng vũ trang hoặc được phép dùng chung cho mọi đơn vị. Đơn vị quản lý, đối tượng được xem, trường dữ liệu, người duyệt và thời hạn lưu phải được cấu hình theo thẩm quyền.

- Mẫu quà Công đoàn: dữ liệu CCCD, số điện thoại, địa chỉ và người nhận hộ là dữ liệu cá nhân; chỉ thu thập khi có mục đích, quyền và căn cứ phù hợp.
- Mẫu quân trang: thông tin cấp phát và tiêu chuẩn cần giới hạn theo đơn vị/nhiệm vụ; không tự suy diễn đây là hồ sơ hậu cần chính thức hay dữ liệu được phép đưa lên môi trường công khai.
- Không đưa dữ liệu người thật vào dữ liệu demo, prompt AI công cộng, GitHub hoặc báo cáo chia sẻ công khai.
- Import Excel phải qua vùng staging, kiểm tra định dạng/trùng lặp/thiếu dữ liệu, hiển thị cảnh báo và có người xác nhận trước khi ghi nhận chính thức.
- Công thức tổng hợp, đơn vị tính, kỳ báo cáo và quy tắc xác nhận số liệu phải do đơn vị nghiệp vụ chốt; AI không tự quyết định.

## L. Bảng kiểm bàn giao cho từng giai đoạn Copilot

| Hạng mục | Nội dung phải có trong báo cáo bàn giao |
|---|---|
| Phạm vi | Giai đoạn, yêu cầu đã xử lý, yêu cầu chưa xử lý và lý do. |
| Mã nguồn | Danh sách file tạo/sửa/xóa (xóa phải có phê duyệt), mô tả thay đổi và phụ thuộc. |
| Dữ liệu | Bảng D1 đã dùng, migration hiện có, schema được kiểm tra; nêu rõ không chạy remote migration. |
| API và bảo mật | Endpoint/service, session, role, permission, scope, membership, deny-by-default và audit. |
| Giao diện | Route, trạng thái feature flag, responsive, loading/empty/error states và khả năng truy cập. |
| Hồi quy | Xác nhận không làm ảnh hưởng sáu lĩnh vực còn lại, header/sidebar, auth và chức năng chung. |
| Kiểm tra | Kết quả nguyên văn/tóm tắt của typecheck, lint, build; lỗi và cảnh báo chưa xử lý. |
| Quyết định | Rủi ro, giả định, nội dung cần chủ dự án xác nhận trước khi tiếp tục. |

## M. Quy tắc bảo toàn tài liệu và thay thế bản cũ

1. Hai tệp được cập nhật giữ nguyên tên chuẩn để thuận tiện thay thế trong repository.
2. Bản mới được tạo từ nội dung hiện hành đã đọc, giữ lại các phần kiến trúc, bảo mật, tài khoản, Pi, báo cáo và hai mẫu Excel; phần bổ sung ngày 28/11/2026 làm rõ phạm vi mới.
3. Không xóa bản gốc trong Library hoặc lịch sử Git bằng thao tác tự động. Khi đưa vào repository, chủ dự án/Copilot cần thay đúng hai tệp đích sau khi đã lưu bản dự phòng và xem `git diff`.
4. Không xóa các tài liệu nguồn, migration hoặc mã nguồn khác chỉ vì tài liệu này được cập nhật. Danh mục tài liệu cũ chỉ được dọn sau khi đối chiếu và có phê duyệt riêng.


### Lịch sử cập nhật – 28/11/2026

Bổ sung các yêu cầu mới của chủ dự án về định hướng HTS, 30 chức năng thuộc phân hệ Lực lượng vũ trang, kế hoạch triển khai 08 giai đoạn, cơ chế giao việc Copilot tuần tự, dịch vụ giáo dục dùng chung, AI, feature flag và các kiểm soát an toàn. Hai mẫu báo cáo Công đoàn/quân trang được giữ độc lập, có kiểm soát dữ liệu và phê duyệt.


---


## PHÂN HỆ MỚI: TRUNG TÂM GIAO DỊCH VÀ BẢO MẬT SỐ (DTC)

> **Tên chính thức đề xuất:** Trung tâm Giao dịch và Bảo mật số (Digital Transaction & Security Center – DTC), thuộc hệ sinh thái HỌC TẬP SỐ (HTS). Tên này mở rộng hơn “Trung tâm Kỹ thuật số”, thể hiện đúng trọng tâm trao đổi tài liệu, xác thực, chữ ký và bảo mật. Tên hiển thị tiếng Việt có thể rút gọn thành **Trung tâm Kỹ thuật số**.

### DTC.1. Mục tiêu và phạm vi

DTC là phân hệ độc lập về nghiệp vụ, giao diện, API và dữ liệu, nhưng tích hợp với HTS qua tài khoản, danh tính, phân quyền, audit và hạ tầng Cloudflare. Phạm vi gồm:
- Cá nhân gửi/nhận tài liệu với cá nhân.
- Cơ quan/đơn vị gửi/nhận tài liệu với cá nhân hoặc cơ quan/đơn vị.
- Gửi một người hoặc nhiều người nhận.
- Ký tài liệu, mã hóa đầu cuối, xác minh chữ ký, xác nhận tiếp nhận, quản lý phiên bản và nhật ký.
- Kho tài liệu riêng tư và danh bạ khóa công khai đã xác minh.

DTC là hệ thống trao đổi tài liệu được bảo vệ; không mặc nhiên là hệ thống lưu trữ bí mật nhà nước/quân sự hoặc thay thế hệ thống văn thư/chữ ký số chuyên ngành có thẩm quyền.

### DTC.2. Các quyết định đã được chủ dự án xác nhận

| Hạng mục | Quyết định |
|---|---|
| Phạm vi người dùng | Cá nhân và cơ quan/đơn vị |
| Người nhận | Cá nhân và nhóm/tổ chức |
| Chữ ký | Bắt buộc trước khi gửi |
| Mã hóa | Mã hóa đầu cuối; máy chủ không có khóa giải mã dạng rõ |
| Phương thức bảo vệ khóa | Đăng ký cả hai phương thức; người dùng chọn khi thao tác |
| Phương thức A | Sinh trắc học của thiết bị/passkey để mở quyền sử dụng khóa |
| Phương thức B | Tương tác chuột/chạm làm nguồn entropy bổ sung, kết hợp CSPRNG |
| Vai trò Pi Wallet | Chỉ liên kết/xác minh danh tính; không làm khóa mã hóa DTC |
| Sao lưu khóa | Bản sao khóa được mã hóa, do người dùng kiểm soát |
| Hạ tầng mục tiêu | Next.js/OpenNext trên Cloudflare Workers, D1 metadata, R2 private cho gói tài liệu mã hóa |

Các quyết định trên là yêu cầu/kiến trúc mục tiêu, chưa chứng minh chức năng đã được lập trình, kiểm thử hoặc đưa vào production.

### DTC.3. Nguyên tắc mật mã bắt buộc

1. Không tự thiết kế thuật toán mã hóa, chữ ký hoặc trao đổi khóa. Chỉ dùng thư viện và giao thức chuẩn đã được đánh giá.
2. Mỗi người dùng có cặp khóa mã hóa và cặp khóa ký độc lập; không tái sử dụng một cặp khóa cho cả hai mục đích.
3. Khóa bí mật được tạo trên thiết bị bằng CSPRNG, không tạo trực tiếp từ khuôn mặt, địa chỉ ví Pi, mật khẩu đăng nhập hoặc tọa độ chuột.
4. Sinh trắc học không phải khóa bí mật. Passkey/WebAuthn hoặc cơ chế bảo vệ khóa của hệ điều hành chỉ xác thực người dùng và mở quyền sử dụng khóa được bảo vệ trên thiết bị.
5. Chuyển động chuột/chạm chỉ là nguồn entropy bổ sung; phải trộn với CSPRNG của nền tảng. Không coi số lần di chuyển, thời gian thao tác hoặc phần trăm tiến độ giao diện là bằng chứng định lượng về độ an toàn.
6. Pi Wallet Address chỉ là định danh công khai. Nếu cần xác minh quyền kiểm soát ví, dùng challenge có nonce, mục đích và thời hạn; không bao giờ yêu cầu/lưu Pi Wallet Passphrase.
7. Chữ ký bao phủ nội dung tài liệu và metadata giao dịch quan trọng (người gửi, người nhận, mã tài liệu, phiên bản và thông tin chống phát lại). Sửa nội dung sau khi ký làm chữ ký không còn hợp lệ.
8. Với nhiều người nhận, tạo khóa dữ liệu ngẫu nhiên cho tài liệu và bọc khóa dữ liệu riêng cho từng người nhận bằng cơ chế mã hóa khóa chuẩn.
9. Máy chủ chỉ lưu/chuyển gói mã hóa và metadata cần thiết; không ghi nội dung rõ, private key, passphrase hoặc dữ liệu sinh trắc vào log.
10. Phải phân biệt chữ ký mật mã nội bộ DTC với chữ ký số có giá trị pháp lý sử dụng chứng thư số/dịch vụ tin cậy được cấp phép. DTC không tự tuyên bố giá trị pháp lý nếu chưa tích hợp và đánh giá phù hợp.

### DTC.4. Phương thức A – Sinh trắc học/passkey

- Người dùng đăng ký passkey hoặc cơ chế xác thực thiết bị tương thích.
- Khóa xác thực được bảo vệ bởi thiết bị; xác thực khuôn mặt/vân tay/PIN diễn ra cục bộ theo khả năng của hệ điều hành.
- Sau xác thực, thiết bị cho phép sử dụng khóa bí mật DTC đã được bảo vệ để ký hoặc giải mã.
- Không tải ảnh khuôn mặt, template sinh trắc hoặc dữ liệu nhận diện lên HTS.
- Phải có phương án thay thế an toàn cho thiết bị không hỗ trợ Face ID hoặc khi sinh trắc không khả dụng.
- Đăng nhập Google/HTS không tự động được coi là đã thực hiện xác thực sinh trắc học.

### DTC.5. Phương thức B – Tạo entropy tương tác

Tên giao diện: **DTC Interactive Entropy Generator – Bộ tạo entropy tương tác DTC**.

Quy trình mục tiêu:
1. Người dùng di chuyển chuột hoặc thao tác chạm trong vùng tương tác.
2. Thiết bị thu thập đặc điểm sự kiện và thời điểm ở mức tối thiểu cần thiết.
3. Nguồn sự kiện được trộn với CSPRNG của nền tảng qua cơ chế mật mã chuẩn.
4. Khóa được sinh bằng CSPRNG; không dùng trực tiếp chuỗi tọa độ làm khóa.
5. Không lưu đường đi chuột/chạm thô để tái tạo khóa; chỉ lưu trạng thái kiểm thử tối thiểu nếu thực sự cần.
6. Nếu nguồn ngẫu nhiên hệ thống không khả dụng hoặc kiểm tra thất bại, phải dừng thao tác, không hạ cấp sang nguồn yếu.
7. Điện thoại/máy tính bảng cần hỗ trợ tương tác chạm tương đương.

Phương thức này không thay thế CSPRNG và không được quảng cáo bằng các mức “100% an toàn” dựa trên chuyển động người dùng.

### DTC.6. Hệ khóa và danh tính

Mỗi danh tính DTC có hai cặp khóa độc lập:
- `encryption_public_key` / `encryption_private_key`: mã hóa và giải mã khóa dữ liệu.
- `signing_public_key` / `signing_private_key`: ký và xác minh chữ ký.

Khóa công khai DTC phải có fingerprint, thuật toán, phiên bản, thời điểm hiệu lực, trạng thái và lịch sử thay thế/thu hồi. Địa chỉ Pi lưu riêng trong liên kết danh tính; không dùng thay khóa công khai DTC.

### DTC.7. Sao lưu và khôi phục khóa

- Tạo bản sao khóa bí mật được mã hóa ngay trên thiết bị.
- Dùng cơ chế dẫn xuất khóa từ bí mật khôi phục mạnh, có salt và tham số được version hóa; dùng thuật toán mã hóa xác thực chuẩn.
- Máy chủ chỉ lưu ciphertext, nonce, salt, phiên bản thuật toán và metadata cần thiết; không lưu mật khẩu sao lưu hoặc khóa giải mã.
- Mật khẩu đăng nhập HTS và bí mật sao lưu DTC phải tách biệt.
- Người dùng phải xác nhận và kiểm thử khôi phục trước khi đánh dấu sao lưu hoàn tất.
- Mất khóa và mất bản sao/secret khôi phục có thể khiến tài liệu cũ không thể giải mã; không hứa hẹn khôi phục không có cơ sở.
- Khi khóa bị nghi lộ: khóa/revoke, đăng ký khóa mới, thông báo đối tác và xử lý tài liệu cũ theo quy trình chuyển tiếp được thiết kế.
- Khóa mới không tự động giải mã tài liệu đã mã hóa cho khóa cũ.

### DTC.8. Quy trình gửi và nhận

**Gửi:** xác thực HTS → chọn người nhận → kiểm tra danh tính/fingerprint khóa → chọn phương thức mở khóa → ký nội dung và metadata → mã hóa tài liệu → bọc khóa dữ liệu cho từng người nhận → gửi gói mã hóa → ghi nhận trạng thái.

**Nhận:** xác thực HTS → kiểm tra quyền nhận → tải gói mã hóa → xác thực người dùng bằng phương thức đã đăng ký → giải mã trên thiết bị → xác minh chữ ký và metadata → hiển thị nội dung → cho phép xác nhận đã nhận.

Phân biệt `DELIVERED` (đã chuyển tới hộp thư) với `RECEIVED` (người nhận xác nhận). Không suy luận đã đọc chỉ từ trạng thái chuyển phát.

### DTC.9. Vai trò và phân quyền

- Người dùng cá nhân: gửi/nhận/ký tài liệu thuộc danh tính của mình.
- Thành viên cơ quan: thao tác trong tổ chức và phạm vi được cấp.
- Người ký cơ quan: ký theo thẩm quyền và quy trình phê duyệt của tổ chức.
- Quản lý cơ quan: quản lý thành viên/quy trình, không mặc nhiên được giải mã tài liệu cá nhân.
- Quản trị DTC: cấu hình, vận hành, cảnh báo và quản lý trạng thái khóa; không mặc nhiên đọc nội dung.
- Super Admin HTS: quản lý nền tảng; không mặc nhiên có khóa bí mật hoặc quyền giải mã.

Mọi truy cập phải authorize phía Worker theo account, permission, scope, membership, trạng thái khóa và quan hệ người nhận. Feature flag/UI không thay thế authorization.

### DTC.10. API và dữ liệu dự kiến

Nhóm API độc lập dưới `app/api/digital-center/` (tên đường dẫn dự kiến, phải inventory trước khi tạo):
- `profile/`, `keys/`, `keys/register/`, `keys/public/`, `keys/rotate/`, `keys/revoke/`
- `identity/pi/`, `contacts/`, `organizations/`
- `documents/create/`, `documents/sign/`, `documents/encrypt/`, `documents/send/`, `documents/receive/`, `documents/verify/`
- `inbox/`, `outbox/`, `receipts/`, `audit/`, `admin/`

Bảng logic ứng viên (không phải bảng đã tồn tại):
- `dtc_profiles`, `dtc_identity_links`, `dtc_pi_identity_links`
- `dtc_key_records`, `dtc_public_keys`, `dtc_key_revocations`
- `dtc_encrypted_key_backups`, `dtc_key_recovery_events`
- `dtc_organizations`, `dtc_organization_memberships`, `dtc_contacts`
- `dtc_documents`, `dtc_document_recipients`, `dtc_document_versions`
- `dtc_document_envelopes`, `dtc_document_signatures`, `dtc_delivery_receipts`
- `dtc_security_audit_events`

Không tạo bảng trùng semantics với `accounts`, `user_profiles`, `attachments`, `audit_events`, `security_events` hoặc `data_exports`. Phải inventory schema D1 trước khi chốt canonical names/migrations. D1 lưu metadata; R2 private lưu bytes gói mã hóa. Không tạo URL public dài hạn.

### DTC.11. Trạng thái và vòng đời tài liệu

Các trạng thái đề xuất: `DRAFT`, `PENDING_SIGNATURE`, `SIGNED`, `ENCRYPTED`, `SENT`, `DELIVERED`, `RECEIVED`, `REJECTED`, `EXPIRED`, `REVOKED`. Chuyển trạng thái phải được kiểm tra ở server, có actor/time/reason/audit; trạng thái `RECEIVED` cần hành động xác nhận rõ ràng từ người nhận.

### DTC.12. Bảo mật, quyền riêng tư và giới hạn sử dụng

- DTC chỉ tiếp nhận tài liệu được phép xử lý trên hạ tầng HTS; không lưu bí mật nhà nước/quân sự hoặc dữ liệu vượt thẩm quyền.
- Quản trị kỹ thuật không có quyền giải mã mặc định; mọi ngoại lệ truy cập nội dung phải được xác định bằng chính sách riêng và phê duyệt rõ.
- Không gửi nội dung đã mã hóa đầu cuối sang AI để tóm tắt/phân tích; chỉ xử lý sau khi người dùng giải mã và chủ động chọn chức năng được phép.
- Chống thay thế khóa công khai bằng fingerprint, xác minh danh tính ngoài băng hoặc cơ chế transparency/audit phù hợp; cảnh báo khi khóa người nhận thay đổi.
- Chống replay, sửa metadata, thay người nhận, IDOR, tải tệp trái phép, lạm dụng endpoint và dò mật khẩu khôi phục.
- Có rate limit, audit, cảnh báo, retention, backup/restore và quy trình ứng phó sự cố.
- Phải kiểm thử độc lập thư viện mật mã, giao thức, triển khai key management và khôi phục trước khi dùng dữ liệu thật.

### DTC.13. Kế hoạch triển khai riêng – 09 giai đoạn

| Giai đoạn | Phạm vi | Đầu ra/điều kiện chuyển tiếp |
|---|---|---|
| 1 | Khảo sát HTS, auth, D1, R2, Cloudflare, Git và các ranh giới bảo mật | Báo cáo chỉ đọc, chưa sửa mã; chủ dự án duyệt |
| 2 | Hồ sơ DTC và liên kết danh tính Pi | Luồng challenge xác minh, không thu passphrase |
| 3 | Hệ khóa, fingerprint, đăng ký/luân chuyển/thu hồi | Cặp khóa độc lập, test vector và review thiết kế |
| 4 | Passkey/sinh trắc học thiết bị | Mở khóa cục bộ, fallback và kiểm thử thiết bị |
| 5 | Entropy tương tác chuột/chạm | Kết hợp CSPRNG, test nguồn ngẫu nhiên, không tự chế crypto |
| 6 | Sao lưu/khôi phục khóa mã hóa | Kiểm thử restore trên thiết bị mới, mất khóa và revoke |
| 7 | Chữ ký, mã hóa đầu cuối, gửi/nhận cá nhân và nhóm | Interoperability, chống replay, xác minh chữ ký |
| 8 | Tổ chức, danh bạ, hộp thư, biên nhận, audit và quản trị | Ma trận quyền, kiểm thử IDOR và không rò rỉ metadata |
| 9 | Kiểm thử bảo mật, nghiệm thu và thử nghiệm có kiểm soát | Báo cáo độc lập, backup/restore, phê duyệt trước production |

Sau mỗi giai đoạn, báo cáo tệp tạo/sửa, API/service, schema/migration, quyền, rủi ro, hồi quy HTS và kết quả `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`. Không chạy remote migration/deploy nếu chưa được chủ dự án phê duyệt.

### DTC.14. Tiêu chí nghiệm thu bổ sung

- Không thể gửi nếu chữ ký thiếu hoặc không hợp lệ.
- Thay đổi nội dung/metadata được ký phải làm xác minh thất bại.
- Máy chủ không đọc được nội dung tài liệu hoặc private key ở dạng rõ.
- Khóa công khai giả mạo/thay thế phải bị phát hiện hoặc cảnh báo.
- Chỉ đúng người nhận có khóa phù hợp mới giải mã được.
- Gửi nhóm tạo quyền giải mã độc lập cho từng người nhận.
- Khóa bị revoke bị chặn cho giao dịch mới.
- Sao lưu mã hóa không giải mã được nếu thiếu secret khôi phục.
- Mất thiết bị có quy trình phục hồi/thu hồi được kiểm thử.
- Pi address chỉ xác minh danh tính/liên kết, không thay khóa DTC.
- Hai phương thức A/B không làm thay đổi chuẩn tài liệu, thuật toán hoặc chữ ký.
- Không có dữ liệu sinh trắc, Pi passphrase, private key hoặc nội dung rõ trong log.
- Kiểm thử quyền truy cập, cache, tìm kiếm, metadata, file, export và session cũ.

### DTC.15. Thứ tự tích hợp vào HTS và quản lý nhánh

DTC được phát triển trên nhánh riêng, đề xuất tên `feature/digital-technology-center`, tạo từ `main` tại một commit nền đã được xác định và ổn định. Nhánh này:
- Dùng chung nền tảng HTS (đăng nhập, account identity, permission/scope, D1, R2, audit và Cloudflare Workers) qua interface/service được xác định; không tạo một hệ thống account độc lập.
- Giữ API, UI, schema và tests DTC trong phạm vi riêng; chỉ thay đổi module dùng chung khi có thiết kế tác động và phê duyệt.
- Không merge thẳng vào `main`; tích hợp qua Pull Request sau review, test và phê duyệt.
- Không pull/merge/rebase/reset/checkout/commit/push tự động trong khi Copilot đang có thay đổi chưa bàn giao.
- Không tạo branch từ working tree bẩn của máy cá nhân; nhánh GitHub phải xuất phát từ commit nền đã thống nhất. Sau đó người dùng fetch branch và kiểm tra working tree trước khi chuyển nhánh.
- Migration DTC phải riêng, tuần tự, có inventory D1, test local/staging, backup/restore và phê duyệt; không chạy production tự động.
- DTC có thể phát triển độc lập nhưng không được sao chép auth/account hoặc làm suy yếu authorization của HTS.

### DTC.16. Các quyết định chưa được xác nhận

1. Nhà cung cấp/thư viện mật mã và giao thức cụ thể sau đánh giá chuyên gia.
2. Có tích hợp chữ ký số pháp lý/chứng thư số hay chỉ chữ ký mật mã nội bộ trong giai đoạn đầu.
3. Cơ chế xác minh ví Pi chính thức được hỗ trợ tại thời điểm tích hợp.
4. Danh mục loại tài liệu được phép xử lý và chính sách lưu trữ.
5. Thời hạn giữ gói mã hóa, metadata, biên nhận và audit.
6. Quy tắc tổ chức: ai được tạo tổ chức, người ký, người duyệt, thay người đại diện.
7. Chính sách khôi phục, chuyển thiết bị, lưu bản sao và xử lý khi người dùng qua đời/rời cơ quan.
8. Có cho phép gửi tài liệu tới người chưa có tài khoản HTS hay không; nếu có, cần quy trình nhận diện/khóa riêng.
9. Kiểm định độc lập, phạm vi thử nghiệm và thẩm quyền cho phép đưa vào vận hành.

### Lịch sử cập nhật DTC – 28/11/2026

Bổ sung theo quyết định của chủ dự án: phạm vi cá nhân và cơ quan; người nhận cá nhân và nhóm; chữ ký bắt buộc; đăng ký cả phương thức sinh trắc học/passkey và entropy tương tác; Pi Wallet chỉ làm định danh; sao lưu khóa dạng mã hóa do người dùng kiểm soát; triển khai thành nhánh riêng liên kết với nền tảng HTS.


---

# BỔ SUNG PHẠM VI HỆ SINH THÁI HTS – BẢN 1.3

> **Phân loại:** Các nội dung dưới đây được tổng hợp từ Đề tài HTS bản sửa đổi/cập nhật ngày 25/11/2026 và các quyết định kiến trúc đã có đến ngày 28/11/2026. Đây là đặc tả phạm vi và yêu cầu để lập kế hoạch; không phải bằng chứng phân hệ đã lập trình, có dữ liệu thật, đã kết nối thanh toán hoặc được phép vận hành. Các thông số kinh tế/token cần được chủ dự án và bộ phận có thẩm quyền xác nhận trước khi công bố hoặc áp dụng.

## 24. PHẠM VI HỆ SINH THÁI: THƯƠNG MẠI ĐIỆN TỬ, MẠNG XÃ HỘI, TOKEN HTS VÀ TỪ THIỆN

### 24.1. Vị trí trong kiến trúc tổng thể

HTS được tổ chức thành các phân hệ nghiệp vụ cấp cao, dùng chung nền tảng tài khoản, xác thực, phân quyền, thông báo, nhật ký, hạ tầng và quy trình vận hành. Danh mục tối thiểu:

1. Trang chủ, giới thiệu và hướng dẫn.
2. Bảy lĩnh vực học tập.
3. Bài giảng, khóa học và thư viện số.
4. Quản trị giáo dục.
5. Tin tức – sự kiện và quản trị nội dung.
6. Trung tâm Bài giảng AI và Kho học liệu.
7. Trung tâm Báo cáo số.
8. Trung tâm Kỹ thuật số (DTC).
9. Mạng xã hội học tập HTS.
10. Sàn thương mại điện tử nhiều người bán.
11. Token Học Tập Số (HTS).
12. Hoạt động cộng đồng và từ thiện.
13. Dân Cư Số – phân hệ quản trị dữ liệu dân cư có phạm vi, thẩm quyền và phê duyệt riêng.
14. Trung tâm quản trị hệ sinh thái, bảo mật, nhật ký, hỗ trợ, doanh thu và vận hành.

Các phân hệ nghiệp vụ có thể có giao diện, API, bảng dữ liệu và quyền quản trị riêng nhưng không được tự tạo hệ thống tài khoản độc lập hoặc bỏ qua cơ chế phân quyền server-side dùng chung. Không mặc định mọi phân hệ phải triển khai cùng lúc.

### 24.2. Sàn thương mại điện tử HTS

**Phạm vi theo đề án:**
- Mô hình nhiều người bán; công dân, hộ kinh doanh và doanh nghiệp có thể gửi đăng ký gian hàng.
- Quản lý hồ sơ người bán, gian hàng, danh mục, sản phẩm/dịch vụ, giá, tồn kho, trạng thái hiển thị.
- Tìm kiếm, xem chi tiết, giỏ hàng, xác nhận đơn, quản lý đơn hàng và lịch sử mua bán.
- Đánh giá sản phẩm, hỗ trợ, khiếu nại/tranh chấp và quản lý người bán.
- Quản lý phí nền tảng, doanh thu, đối soát và báo cáo.
- Theo hồ sơ đề án, thanh toán đơn hàng trên sàn bằng Pi Network 100%; không triển khai COD hoặc chuyển khoản ngân hàng trong phạm vi chính sách đang ghi nhận. Mọi sản phẩm đăng bán phải hiển thị giá Pi.

**Quy tắc định giá Pi đã nêu trong đề án:**
1. Giá Pi cố định do người bán/quản trị viên có thẩm quyền thiết lập; hoặc
2. Giá Pi quy đổi theo dữ liệu thị trường tham chiếu từ cặp giao dịch Pi được OKX hỗ trợ.
3. Khi dùng giá tham chiếu phải hiển thị nguồn, cặp giao dịch, đơn vị tiền và thời điểm cập nhật.
4. Không mô tả giá OKX là giá chính thức do Pi Core Team bảo đảm.
5. Nếu nguồn dữ liệu lỗi hoặc quá hạn, không dùng giá cũ như giá hiện tại; tạm dừng xác nhận đơn với sản phẩm dùng giá tham chiếu. Giá cố định có thể tiếp tục dùng.
6. Giá Pi phải nhất quán ở thẻ sản phẩm, trang chi tiết, giỏ hàng, bước xác nhận và lịch sử/quản lý đơn.

**Xác minh thanh toán:**
- Máy chủ phải xác minh giao dịch Pi qua cơ chế chính thức được hỗ trợ tại thời điểm triển khai; kiểm tra tối thiểu mã giao dịch, trạng thái, số Pi, địa chỉ nhận và mã đơn hàng.
- Không chấp nhận ảnh chụp màn hình hoặc dữ liệu do trình duyệt/người mua tự khai làm bằng chứng thanh toán.
- Tuyệt đối không yêu cầu hoặc lưu Pi Wallet passphrase.
- Không ghi nhận đơn đã thanh toán chỉ vì giao diện nhận được tín hiệu từ client.
- Tách biệt giao dịch mua hàng trên sàn với khoản Pi dùng cho gói/quyền quản trị HTS.

**Các nội dung phải thiết kế trước khi phát triển:** xác minh người bán, chính sách hàng hóa bị cấm/hạn chế, hoàn tiền/hủy đơn, xử lý giao dịch trùng hoặc hoàn tất chậm, giao nhận, thuế và hóa đơn, tranh chấp, bảo vệ người mua, giới hạn tài khoản, chống gian lận, lưu trữ chứng từ và quy trình đối soát. Các chính sách phí/tỷ lệ doanh thu trong đề án là dự kiến, chưa tự động trở thành cấu hình có hiệu lực.

### 24.3. Mạng xã hội học tập HTS

**Phạm vi chức năng theo đề án:**
- Hồ sơ cá nhân và trang cá nhân.
- Đăng bài viết, hình ảnh, video và chia sẻ tài liệu/kiến thức.
- Bình luận, tương tác, chia sẻ.
- Kết bạn/theo dõi và nhắn tin trực tiếp.
- Nhóm học tập, cộng đồng theo lĩnh vực hoặc chủ đề.
- Gọi thoại và gọi video trực tuyến theo lộ trình.
- Kết nối nội dung xã hội với bài học, sự kiện, thư viện và hoạt động cộng đồng khi được người dùng cho phép.

**Yêu cầu bổ sung bắt buộc trước khi mở chức năng công khai:**
- Quy tắc quyền riêng tư cho hồ sơ, bài viết, nhóm và danh sách bạn bè.
- Chặn, báo cáo, kiểm duyệt, xử lý nội dung vi phạm và cơ chế khiếu nại.
- Quyền kiểm soát bình luận, tin nhắn, lời mời và thông báo.
- Quy trình bảo vệ trẻ em và tài khoản học sinh chưa thành niên; không mặc định cho phép nhắn tin riêng hoặc gọi video không kiểm soát.
- Quản lý bản quyền, nguồn nội dung, gỡ nội dung theo yêu cầu hợp lệ.
- Giới hạn tải lên, loại tệp, quét mã độc, thời hạn lưu trữ và quyền truy cập media.
- Chống spam, giả mạo, lừa đảo, quấy rối và lạm dụng nền tảng.
- Nhật ký kiểm duyệt và phân quyền moderator theo phạm vi; AI chỉ hỗ trợ phát hiện/đề xuất, quyết định xử lý thuộc người có thẩm quyền.
- Gọi thoại/video cần lựa chọn nhà cung cấp, mô hình chi phí, bảo mật, ghi âm/ghi hình và thông báo/đồng ý riêng; không mặc định ghi âm.

### 24.4. Token Học Tập Số (HTS)

**Thông tin định hướng được ghi trong đề án 25/11/2026:**
- Tên: Học Tập Số.
- Ký hiệu: HTS.
- Tổng nguồn cung dự kiến: 1.000.000 HTS.
- Cơ chế khai thác: giảm dần theo từng giai đoạn.
- Nguồn bảo đảm giá trị dự kiến: 150 Pi Network.

Các thông số trên được ghi nhận là **định hướng/đề xuất**, không phải token đã phát hành, tài sản bảo chứng đã xác lập hoặc cam kết giá trị. Không được công bố HTS có giá quy đổi cố định nếu chưa có cơ chế bảo đảm, kiểm chứng tài sản, quy chế và xác nhận tương ứng.

**Phân biệt bắt buộc:**
- Pi Network là mạng/tài sản thanh toán hoặc định danh được HTS tích hợp theo từng chức năng.
- Token HTS là tài sản/đơn vị token của dự án, có thiết kế và quy chế riêng.
- Pi dùng thanh toán gói quản trị hoặc đơn hàng không tự động trở thành HTS Token.
- Pi Wallet không thay thế ví/khóa quản lý token HTS và không được yêu cầu người dùng cung cấp passphrase.

**Các quyết định bắt buộc trước phát hành:**
1. Mạng blockchain, tiêu chuẩn token, issuer/contract và cơ chế quản trị.
2. Tổng cung, lịch phát hành, phân bổ, khóa/mở khóa, cơ chế giảm dần và xử lý token chưa phân phối.
3. Cơ chế quản lý 150 Pi dự kiến: chủ thể sở hữu, ví lưu ký, kiểm toán, xác minh số dư, thay đổi và công bố.
4. Tiện ích thực tế của token trong hệ sinh thái; không thiết kế tiện ích chỉ để tạo kỳ vọng tăng giá.
5. Quy định chuyển nhượng, niêm yết, thanh khoản, thuế, kế toán, chống rửa tiền và bảo vệ người tham gia theo tư vấn pháp lý.
6. Cảnh báo rủi ro, điều kiện tham gia, xử lý lỗi giao dịch, mất khóa và tranh chấp.
7. Kiểm toán hợp đồng thông minh, bảo mật khóa phát hành và quy trình ứng phó sự cố.
8. Không phát hành, bán, phân phối đại trà hoặc quảng bá lợi nhuận trước khi hoàn tất đánh giá pháp lý và phê duyệt.

### 24.5. Hoạt động cộng đồng và từ thiện

Đề án định hướng chuyên mục đóng góp tự nguyện để hỗ trợ học sinh khó khăn, người nghèo, hoạt động giáo dục và cộng đồng; công khai thông tin tiếp nhận và sử dụng nguồn đóng góp.

- Pi Network được nêu là phương thức định hướng cho hoạt động từ thiện trong tương lai; địa chỉ ví chỉ được cập nhật sau khi được xác lập và xác minh.
- Mỗi chiến dịch phải có đơn vị/chủ thể chịu trách nhiệm, mục tiêu, thời hạn, phương thức tiếp nhận, quy trình chi và báo cáo.
- Công khai số liệu phù hợp nhưng không công khai dữ liệu cá nhân của người nhận hỗ trợ nếu không có căn cứ/đồng ý.
- Tách bạch quỹ từ thiện khỏi doanh thu thương mại, phí nền tảng và nguồn bảo đảm Token HTS.
- Không đưa địa chỉ ví chưa xác minh vào giao diện hoặc mã nguồn.
- Các tỷ lệ phân chia doanh thu và mức phí ghi trong đề án là thông số dự kiến; phải được xác nhận, tư vấn pháp lý/kế toán và công bố trước khi áp dụng.

### 24.6. Mô hình dữ liệu và ranh giới phân hệ

Tên bảng dưới đây chỉ là nhóm thực thể logic để thiết kế, không phải lệnh tạo bảng và không khẳng định schema đã tồn tại.

| Miền nghiệp vụ | Nhóm thực thể logic cần quản lý |
|---|---|
| Marketplace | seller_applications, seller_profiles, stores, products, product_variants, inventory, carts, orders, order_items, payment_intents, pi_transactions, shipments, reviews, disputes, platform_fees, settlement_records |
| Social | social_profiles, posts, post_media, comments, reactions, follows, friendships, groups, group_memberships, direct_conversations, messages, blocks, reports, moderation_actions |
| Token HTS | token_projects, token_networks, token_contracts, token_supply_events, token_allocations, token_wallet_links, token_transactions_mirror, token_policy_versions, token_audit_events |
| Charity | charity_campaigns, donation_intents, verified_wallets, donation_transactions, disbursements, beneficiary_records_restricted, charity_reports |
| Dân Cư Số | quản lý riêng theo mục 25; không trộn với bảng học tập và không dùng dữ liệu dân cư làm hồ sơ người học mặc định |

Mọi bảng phải được đối chiếu với schema D1 thực tế trước khi thiết kế migration. Không tạo bảng trùng tên/chức năng. Dữ liệu giao dịch blockchain phải giữ mã tham chiếu gốc và trạng thái xác minh; dữ liệu mirror trong D1 không được coi là nguồn sự thật thay cho blockchain.

## 25. DÂN CƯ SỐ VÀ CÁC PHÂN HỆ QUẢN TRỊ DỮ LIỆU NGOÀI HỌC TẬP

### 25.1. Vị trí và giới hạn

Dân Cư Số là phân hệ quản trị dữ liệu dân cư cấp thôn/địa bàn theo phạm vi được giao; không phải lĩnh vực học tập thứ tám, không mặc định là cơ sở dữ liệu dân cư quốc gia và không thay thế hệ thống đăng ký cư trú chính thức.

Chỉ thu thập, lưu trữ và xử lý dữ liệu khi có căn cứ, mục đích, thẩm quyền, sự cho phép của cơ quan/đơn vị liên quan và hạ tầng đáp ứng yêu cầu. Không sử dụng dữ liệu thật để thử nghiệm hoặc đưa dữ liệu căn cước lên dịch vụ công cộng chưa được phê duyệt.

### 25.2. Quyền và phạm vi

- Quản trị cấp cao của phân hệ chỉ được giao quyền theo địa bàn và nhiệm vụ.
- Quản trị cấp thôn chỉ thao tác trong địa bàn được phê duyệt.
- Người nhập dữ liệu không mặc nhiên có quyền xác nhận dữ liệu chính thức.
- Người rà soát/xác nhận phải được giao quyền riêng; mọi thao tác nhập, sửa, xác nhận, tra cứu và xuất đều có nhật ký.
- Quyền Dân Cư Số tách biệt với learner, field_admin, teacher và education_manager của HTS.
- Không cho phép truy cập chéo địa bàn qua thay đổi ID hoặc gọi API trực tiếp.

### 25.3. Quy trình nhập và xác minh

1. Người có quyền tạo đợt nhập và chọn nguồn dữ liệu hợp lệ.
2. Tệp/ảnh được đưa vào vùng lưu trữ riêng, giới hạn quyền.
3. OCR/AI trích xuất vào vùng dữ liệu tạm, không ghi thẳng vào hồ sơ chính thức.
4. Hệ thống chuẩn hóa định dạng, phát hiện trường thiếu, trùng và sai lệch.
5. Người nhập đối chiếu bản xem trước với nguồn gốc.
6. Người được giao thẩm quyền xác nhận từng bản ghi hoặc lô.
7. Chỉ dữ liệu đã xác nhận mới được đưa vào hồ sơ chính thức.
8. Lưu nguồn, người nhập, người xác nhận, thời gian, phiên bản và nhật ký.

OCR căn cước/danh sách chỉ là công cụ hỗ trợ, không thay thế kiểm tra nguồn và xác nhận của người có thẩm quyền.

### 25.4. Điều kiện mở triển khai

Trước khi dùng dữ liệu thật phải có: văn bản/phê duyệt về thẩm quyền; danh mục trường dữ liệu tối thiểu; mục đích xử lý; căn cứ và thông báo phù hợp; thời hạn lưu trữ; quy trình chỉnh sửa/xóa/tra cứu/xuất; phương án bảo vệ, backup/restore; kiểm thử phân quyền chéo địa bàn; và đánh giá rủi ro. Nếu chưa đủ điều kiện, chỉ dùng dữ liệu giả lập.

## 26. BẢNG CÔNG VIỆC, THỨ TỰ ƯU TIÊN VÀ ĐIỀU KIỆN MỞ GIAI ĐOẠN

| Mã | Hạng mục | Điều kiện đầu ra tối thiểu |
|---|---|---|
| HTS-00 | Bảo toàn hiện trạng, sao lưu repository và tài liệu | Có snapshot commit, working tree sạch/được ghi nhận, backup và danh sách tệp |
| HTS-01 | Khôi phục điểm vào README và tài liệu chuẩn trong docs | Có README.md gốc; docs có một tài liệu chuẩn; liên kết hoạt động |
| HTS-02 | Kiểm kê D1, migrations, R2 và môi trường | Có schema thực tế, migration ledger, backup/restore thử nghiệm, phân biệt local/staging/production |
| HTS-03 | Hoàn thiện Auth/session | Đăng ký, đăng nhập, đăng xuất, khôi phục, xác minh email/điện thoại theo chính sách; session revoke và rate limit |
| HTS-04 | Hoàn thiện RBAC/membership/scope | Ma trận quyền; kiểm tra server-side; test truy cập chéo; Root Super Admin được bootstrap an toàn |
| HTS-05 | Thành viên và xác minh Lực lượng vũ trang | Có nguồn xác nhận, quy trình duyệt, quyền nhóm và kiểm thử deny-by-default |
| HTS-06 | Bảy lĩnh vực học tập và học liệu nền | Membership nhiều lĩnh vực; quyền nội dung; tiến độ; dữ liệu học tập đúng phạm vi |
| HTS-07 | Quản trị giáo dục | Trường/lớp/nhóm, giáo viên, học sinh, phân công, kết quả và phê duyệt |
| HTS-08 | Trung tâm AI và Kho học liệu | Draft/review/publish, nguồn, bản quyền, kiểm duyệt con người, audit |
| HTS-09 | Trung tâm Báo cáo số | Quy trình yêu cầu trước – duyệt – nhập – gửi – duyệt; 7 vùng; 2 mẫu Lực lượng vũ trang có quyền riêng |
| HTS-10 | Thi, chấm điểm, đối chiếu danh sách và điểm danh | Kỳ thi, số báo danh, ngoại lệ, xác nhận; chính sách sinh trắc được phê duyệt riêng |
| HTS-11 | R2 và quản lý tệp | Private-by-default, authorization trước tải/xem/xuất, kiểm tra tệp, audit và backup |
| HTS-12 | Dân Cư Số | Chỉ triển khai sau phê duyệt thẩm quyền/pháp lý; dữ liệu giả lập trước; cách ly phạm vi |
| HTS-13 | Mạng xã hội HTS | Quyền riêng tư, moderation, child safety, báo cáo/chặn, tin nhắn/media và kiểm thử |
| HTS-14 | Sàn thương mại điện tử | Seller approval, sản phẩm, giá Pi, order lifecycle, server-side payment verification, dispute/settlement |
| HTS-15 | Token HTS | Chỉ nghiên cứu/thiết kế trước; legal review, tokenomics, custody, contract audit; chưa phát hành khi chưa duyệt |
| HTS-16 | Từ thiện, doanh thu và phí | Ví xác minh, quy chế chiến dịch, đối soát, công khai và tách quỹ |
| HTS-17 | DTC | Phát triển nhánh riêng; threat model, mật mã được chuyên gia đánh giá, key lifecycle, test và kiểm định độc lập |
| HTS-18 | Kiểm thử tích hợp và nghiệm thu | Typecheck, lint, build, OpenNext, test bảo mật, backup/restore, UAT và rollback |
| HTS-19 | Staging/production | Chỉ triển khai sau phê duyệt; giám sát, cảnh báo, runbook và kế hoạch khôi phục |

Không được hiểu thứ tự bảng là cho phép triển khai tất cả song song. HTS-00 đến HTS-05 là nền tảng ưu tiên; các phân hệ phụ thuộc phải chờ điều kiện dữ liệu, xác thực, phân quyền và kiểm thử. DTC, Dân Cư Số, sinh trắc học, thanh toán và Token HTS có cổng phê duyệt riêng.

### 26.1. Quy tắc cập nhật trạng thái

Mỗi hạng mục chỉ được chuyển trạng thái theo bằng chứng:
- **Chưa bắt đầu:** chưa có đầu ra có thể kiểm tra.
- **Đang thực hiện:** có nhánh/tệp/mã nguồn đang làm nhưng chưa nghiệm thu.
- **Đã có nền tảng:** có cấu trúc hoặc một phần mã nguồn; nghiệp vụ chưa hoàn tất.
- **Đã tích hợp:** API, database và giao diện kết nối được trong môi trường xác định.
- **Đã kiểm thử:** có test evidence và kết quả lặp lại được.
- **Đã nghiệm thu:** đạt tiêu chí nghiệp vụ, bảo mật và được người có thẩm quyền xác nhận.
- **Production:** đang vận hành trên môi trường production đã xác minh.

Không dùng các cụm “đã hoàn thành”, “đã hoạt động” hoặc “đã bảo mật” nếu chỉ mới có giao diện, cấu trúc thư mục, migration chưa chạy hoặc tài liệu thiết kế.

### 26.2. Các quyết định cần chủ dự án xác nhận

1. Danh mục phân hệ cấp cao và thứ tự hiển thị trên trang chủ.
2. Có coi 12–14 miền nghiệp vụ trong mục 24.1 là cấu trúc cấp cao chính thức hay không.
3. Mô hình phê duyệt người bán, vận chuyển, hoàn tiền và tranh chấp trên sàn Pi.
4. Cơ chế pháp lý/kỹ thuật của Token HTS và ý nghĩa thực tế của khoản dự kiến 150 Pi.
5. Tỷ lệ doanh thu, phí nền tảng và khoản phí dịch vụ trong đề án có còn hiệu lực hay chỉ là đề xuất.
6. Chính sách mạng xã hội với học sinh chưa thành niên, nhắn tin và gọi video.
7. Thẩm quyền, phạm vi địa bàn và căn cứ xử lý dữ liệu Dân Cư Số.
8. Chu kỳ điểm danh chính xác 15 phút/10 phút, grace period và phương thức thay thế không sinh trắc.
9. Môi trường được phép lưu trữ dữ liệu Lực lượng vũ trang và dữ liệu nội bộ.
10. Điều kiện kiểm định, nghiệm thu và cho phép đưa DTC vào sử dụng.

### Lịch sử cập nhật – 28/11/2026 – Bản 1.3

- Bổ sung đầy đủ phạm vi cấp cao cho Mạng xã hội HTS, Sàn thương mại điện tử, Token HTS và hoạt động từ thiện theo đề án sửa đổi ngày 25/11/2026.
- Bổ sung Dân Cư Số như phân hệ riêng, không phải lĩnh vực học tập thứ tám.
- Bổ sung ma trận công việc HTS-00 đến HTS-19 và cổng phê duyệt riêng cho phân hệ nhạy cảm.
- Bổ sung quy tắc phân biệt yêu cầu, mã nguồn, tích hợp, kiểm thử, nghiệm thu và production.
