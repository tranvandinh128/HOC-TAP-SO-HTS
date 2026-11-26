# Báo cáo kiểm toán tổng thể dự án HỌC TẬP SỐ (HTS)

**Ngày kiểm toán:** 14/07/2026
**Phạm vi:** repository hiện có, gồm mã nguồn, tài liệu, manifest và cấu hình trong working tree.
**Ghi chú trạng thái:** Đây là báo cáo snapshot trước quyết định ngày 26/11/2026 về việc loại bỏ Supabase khỏi mã nguồn. Kết luận về Supabase phản ánh thời điểm kiểm toán, không mô tả trạng thái hiện tại sau Giai đoạn 1. Kiến trúc hiện hành được quy định tại [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md); findings lịch sử bên dưới không bị viết lại.
**Kết luận:** Chưa có đủ bằng chứng để coi HTS là hệ thống nghiệp vụ hoàn chỉnh hoặc sẵn sàng vận hành. Mã nguồn hiện chủ yếu là giao diện mẫu, một số logic domain TypeScript chưa nối với dịch vụ, đăng nhập Supabase phía trình duyệt và một endpoint kiểm tra D1. Các luồng học tập, phân quyền server-side, dữ liệu nghiệp vụ, R2 và thanh toán Pi chưa được kiểm chứng end-to-end.

## 1. Tóm tắt kết quả

- Kiểm kê được **52 route/page**, **12 tài liệu Markdown trong `docs/`**, một schema starter Supabase, một API route dùng D1 và các nhóm component/domain module trong `components/` và `lib/`.
- TypeScript check và ESLint đều thành công trên working tree hiện tại. Các lệnh này chỉ chứng minh mã hiện tại qua được hai kiểm tra tĩnh; không chứng minh giao diện, xác thực, quyền, dữ liệu hoặc thanh toán chạy đúng.
- Không có test script hoặc test file được phát hiện. Không chạy build vì build có thể ghi/đè output trong các thư mục build vốn đã tồn tại.
- Không chạy SQL/migration, không đọc/ghi D1 từ xa, không truy cập Supabase production, không gọi Pi Network/AI provider và không thay đổi dữ liệu hay cấu hình production.
- Phần lớn tính năng nhìn thấy trong UI dùng dữ liệu hard-code, trạng thái React cục bộ hoặc `localStorage`; nhiều trang tự ghi rõ chưa kết nối backend.
- Không tìm thấy R2 binding, R2 API, migration D1 nghiệp vụ, xác thực server-side, API nghiệp vụ hoặc tích hợp thanh toán Pi.
- Không có phân hệ nghiệp vụ nào được xác minh hoàn chỉnh từ giao diện tới server và lưu trữ thật. Kết quả kiểm tra build/quality tĩnh không được coi là nghiệm thu nghiệp vụ.

## 2. Cách phân loại

| Mã | Ý nghĩa |
|---|---|
| **A** | Hoàn thành và có bằng chứng kiểm chứng ở đúng phạm vi. |
| **B** | Có mã nguồn/logic nhưng chưa hoàn chỉnh hoặc chưa được nối, kiểm chứng end-to-end. |
| **C** | Có giao diện tương tác hoặc dữ liệu mẫu; không phải chức năng nghiệp vụ thật. |
| **D** | Mới có tài liệu thiết kế/yêu cầu. |
| **E** | Chưa thấy triển khai trong repository được rà soát. |
| **F** | Có lỗi, sai lệch hoặc rủi ro cần xử lý; có thể chồng lấp với B/C/D/E. |

Một mục có thể nhận nhiều mã, ví dụ **C/F** nghĩa là có giao diện mẫu nhưng còn rủi ro nếu bị hiểu là hệ thống thật.

## 3. Môi trường và phương pháp kiểm tra

### 3.1. Công nghệ

- Manifest khai báo Next.js `^15.5.29`, React `^19.0.0`, TypeScript `^5.7.3`, ESLint `^9.19.0`, OpenNext Cloudflare `^1.20.18`, Wrangler `^4.148.0`, Supabase JS và Supabase SSR.
- Dependency đã cài theo `npm ls --depth=0`: Next.js `15.5.29`, React/React DOM `19.3.1`, TypeScript `5.9.3`, ESLint `9.39.5`, Wrangler `4.148.0`, Supabase JS `2.119.2`, Supabase SSR `0.6.1`, OpenNext Cloudflare `1.20.18`. Đây là phiên bản trong working tree hiện tại, không xác nhận môi trường deploy.
- `tsconfig.json` bật `strict`; `package.json` có `lint`, `typecheck`, `check`, `build`, không có `test`.
- `README_HTS_v5.0.md` nói tới Tailwind CSS 4, nhưng `package.json` không khai báo `tailwindcss`; không thấy cấu hình PostCSS/Tailwind hay import Tailwind. Phần lớn page dùng utility class Tailwind trong khi `app/globals.css` chủ yếu định nghĩa CSS riêng. Chưa chạy build/browser để xác nhận ảnh hưởng giao diện.
- `wrangler.jsonc` khai báo binding D1 `DB`, tên database và database ID; chưa có `r2_buckets`. Binding trong file không chứng minh database hoặc bucket production tồn tại/kết nối được.
- `wrangler.jsonc` đặt `compatibility_date` là `2026-10-13`, ngày sau ngày kiểm toán. Cần xác minh ngày này hợp lệ trước khi deploy.

### 3.2. Lệnh kiểm tra đã chạy

| Lệnh | Kết quả | Giới hạn |
|---|---|---|
| `npm.cmd run typecheck -- --incremental false` | Thành công | Không ghi incremental state; chỉ kiểm tra kiểu. |
| `npm.cmd run lint` | Thành công | Chỉ lint theo ESLint config hiện tại. |
| `npm.cmd ls --depth=0` | Thành công | Xác nhận dependency cài đặt ở local, không xác nhận deploy. |
| Kiểm kê route và tài liệu | 52 route; 12 tài liệu Markdown | Không phải kiểm thử chức năng. |
| Quét mẫu secret phổ biến trong tệp văn bản thuộc phạm vi | Không thấy mẫu private key/token/wallet address phù hợp | Quét theo pattern không chứng minh tuyệt đối không có secret. Có email/số điện thoại và dữ liệu định danh trong tài liệu/mã nguồn; bản ZIP đã được khử định danh riêng. |

Không chạy `npm run build`, không khởi động server, không chạy test (repository không có test suite), không chạy SQL/migration và không truy cập môi trường remote.

## 4. Kiểm kê phân hệ và phân loại

| Phân hệ/chức năng | Mã | Bằng chứng và hiện trạng |
|---|---|---|
| Khung Next.js, route và component nền | **B/C** | Có App Router, component dùng chung và 52 route. Qua typecheck/lint; chưa có kiểm thử trình duyệt hoặc build trong lần kiểm toán này. |
| Trang chủ và danh mục 7 lĩnh vực | **C/F** | Có danh mục tĩnh trong `lib/categories.ts` và trang chủ/chi tiết lĩnh vực. Nội dung ghi chủ đề dự kiến; nhiều lĩnh vực chỉ hiện màn hình yêu cầu đăng nhập, không có API nội dung. Trang chủ nhấn mạnh hai lĩnh vực mở miễn phí, còn các lĩnh vực khác cần tài khoản; điều này không đồng nghĩa thu phí nhưng chưa diễn đạt rõ chính sách học tập miễn phí cho tất cả. |
| Bài giảng, khóa học và chương trình học | **C/D/E** | Có route giới thiệu và dữ liệu/đề mục mẫu. Chưa thấy kho bài học thật, API CRUD, cơ sở dữ liệu D1 nghiệp vụ, R2 hoặc nội dung course/lesson được lưu và phân quyền. Thiết kế curriculum/AI nằm trong tài liệu. |
| Thư viện học liệu | **C/E** | `app/thu-vien/page.tsx` dùng mảng học liệu mẫu; nút mở tệp bị disable và trang nêu chưa có tệp/storage. Không có R2 hoặc Storage backend được kết nối. |
| Đăng nhập | **B/F** | `app/dang-nhap/page.tsx` gọi `signInWithPassword` bằng Supabase JS ở client khi có hai biến `NEXT_PUBLIC_SUPABASE_*`. Không thấy session server-side, middleware/server guard, logout hoặc luồng hydration/quản lý phiên dùng chung. `.env.example` để trống; chưa kiểm chứng đăng nhập thật. |
| Đăng ký, xác minh email, quên/đặt lại mật khẩu, hồ sơ | **C/E** | Có form giao diện; đăng ký và khôi phục chỉ hiển thị thông báo chưa kết nối. Trang tài khoản chỉ là khung. Không thấy API tạo account, gửi email, xác minh hoặc reset. |
| RBAC và quản trị tài khoản | **B/C/F** | Có `AuthGuard`, `RoleGuard`, một số model/logic TypeScript và nhiều trang quản trị thử nghiệm. Không tìm thấy nơi dùng hai guard trong app; guard nhận role/auth từ props client, không phải authorization. Không có API quản trị kiểm tra role/scope ở server. |
| Yêu cầu/cấp/gia hạn quyền quản trị | **C/D/F** | Trang yêu cầu, phân quyền và gia hạn có UI/demo. Phân quyền chỉ tạo preview; yêu cầu và thay đổi trạng thái dùng dữ liệu mẫu. UI vẫn ghi chu kỳ 5 ngày và gia hạn 5 ngày, trái với chính sách gói 10/30/90/365 ngày trong README và tài liệu thiết kế mới. |
| Chính sách học miễn phí, gói quản trị Pi và thanh toán | **D/E/F** | Quyền miễn phí học tập, gói 10/30/90/365 ngày, giao dịch, xác minh, phê duyệt Super Admin và audit mới có trong README/thiết kế. Không thấy mã sản phẩm/gói, order/payment API, Pi SDK, xác minh giao dịch, grant có hạn hoặc nhật ký giao dịch được lưu. |
| Cloudflare D1 | **B/E** | Có `lib/db.ts` lấy binding `DB` và một route `/api/health/db` thực hiện `SELECT 1`. Không thấy migration D1 hay API nghiệp vụ/table D1. Báo cáo D1 hiện hữu ghi nhận local state chỉ có metadata Wrangler và không có bảng nghiệp vụ/migration; đây không phải bằng chứng về D1 remote. |
| Supabase/PostgreSQL | **B/F** | `supabase/schema.sql` là starter schema gồm profiles, categories, courses, lessons, progress, enum và RLS; không có bằng chứng schema đã áp dụng. Login còn gọi Supabase client, trong khi kiến trúc mới định hướng D1. Không xác minh được trạng thái Supabase remote. |
| Cloudflare R2/file upload/download | **D/E** | R2 chỉ được đề cập trong thiết kế. Không thấy binding R2, upload/download API, signed URL hoặc object storage implementation. |
| Quản trị nội dung/tin tức | **C/E** | Trang quản trị nội dung đổi trạng thái bằng React state và bộ dữ liệu mẫu; trang tin tức động tạo tiêu đề từ slug và ghi rõ chưa kết nối dữ liệu. Không có workflow lưu/duyệt/xuất bản ở server. |
| AI biên tập/AI giảng dạy/OCR | **C/D/E** | Trang AI biên tập cho preview nội dung; nút tạo draft và gửi duyệt bị disable, ghi rõ chưa kết nối AI. Kiến trúc provider, bài giảng AI, OCR, grounding, quota, ledger và review chỉ có trong tài liệu; không thấy provider client/API/key server-side. |
| Bài tập, thi và kết quả | **C/B/F** | Có câu hỏi hard-code và quiz tương tác; một luồng ghi kết quả/yêu cầu gia hạn dùng `localStorage`. Kết quả do trình duyệt kiểm soát, có thể sửa; chưa có server-side exam, thời gian thi, chấm điểm, chống sửa hoặc điểm chính thức. |
| Theo dõi tiến độ học tập | **C/E** | Trang thống kê hiển thị các giá trị 0 và nội dung mẫu, ghi rõ chưa kết nối dữ liệu thực. Không thấy progress API/storage. |
| Điểm danh | **C/D/E** | Trang có danh sách mẫu và thao tác đổi trạng thái bằng React; ghi rõ chưa có camera, nhận diện, lịch tự động hay database. Thiết kế attendance/sinh trắc chỉ có tài liệu. |
| Lĩnh vực Lực lượng vũ trang/xác minh đặc biệt | **C/D/F** | Có route giới thiệu và các màn hình báo cáo, nhập dữ liệu, quản lý học viên ở dạng nội dung/UI. Không có xác minh membership hoặc server gate; các route hiện không dùng `AuthGuard`/`RoleGuard`. Chưa thấy dữ liệu nội bộ thật, nhưng thiết kế yêu cầu phải chặn mọi endpoint/tệp trước khi được duyệt. |
| Trung tâm Báo cáo số, Dân Cư Số | **D/E** | Có yêu cầu/thiết kế và danh sách bảng ứng viên trong README/tài liệu. Không thấy các route/API/schema nghiệp vụ tương ứng triển khai đầy đủ. |
| Mạng xã hội, tin nhắn, gọi video | **C/E** | Trang tin nhắn chỉ thêm vào React state mẫu; gọi video chỉ tạo mã phòng ngẫu nhiên phía client và không kết nối WebRTC/signaling. Bài viết/mạng xã hội chưa có lưu trữ, moderation hoặc quyền server-side. |
| Marketplace, Token HTS, từ thiện và doanh thu | **D/E** | Được mô tả trong README/lộ trình; không thấy marketplace backend, token contract/integration, giao dịch từ thiện hoặc ledger doanh thu được triển khai. |
| Nhật ký/audit | **C/B/D** | Có UI với log mẫu và helper TypeScript tạo cấu trúc audit. Không thấy lưu audit vào D1/Supabase, append-only enforcement, API đọc có phân quyền hoặc kiểm thử không thể sửa/xóa. |
| CI/CD, test và deploy | **E/F** | Không có test script/test file phát hiện trong repository; không có bằng chứng pipeline/deployment/production health được xác minh. Cấu hình OpenNext/Wrangler là khai báo, không phải nghiệm thu deploy. |

### 4.1. Kết luận theo nhóm A–F

- **A:** Chỉ các bước kiểm tra tĩnh typecheck và lint đã chạy thành công. Không có phân hệ nghiệp vụ nào đủ bằng chứng để xếp A.
- **B:** Đăng nhập Supabase phía client, các domain helper giáo dục, helper audit, binding D1/health check và một số hành vi trình duyệt có mã nhưng chưa thành chức năng hoàn chỉnh.
- **C:** Phần lớn các route UI: trang chủ/lĩnh vực, nội dung, bài thi, thư viện, theo dõi học tập, điểm danh, quản trị, báo cáo, mạng xã hội và gọi video.
- **D:** Thiết kế tổng thể, RBAC/auth D1, giáo dục/AI, reporting, attendance/sinh trắc, xác minh Lực lượng vũ trang, gói quản trị/thanh toán Pi và nhiều schema dự kiến.
- **E:** D1 schema nghiệp vụ/migrations, R2, API server-side nghiệp vụ, auth đầy đủ, thanh toán Pi thật, AI provider, kho học liệu thật và phần lớn hệ sinh thái nghiệp vụ.
- **F:** Các rủi ro/bất nhất tại mục 5 bên dưới. Mức độ ảnh hưởng production chưa thể xác nhận vì không truy cập production.

## 5. Lỗi, rủi ro bảo mật và điểm cần xác minh

### 5.1. RLS starter schema có đường tự nâng role — nghiêm trọng nếu schema được áp dụng

Trong schema PostgreSQL `supabase/schema.sql` (đã xóa khỏi mã nguồn trong Giai đoạn 1), `is_hts_admin()` coi cả `admin` và `super_admin` là admin; trigger chỉ ngăn đổi role khi hàm trả false; policy `profiles update self` cho phép cập nhật profile của chính user. Do đó, nếu schema này được áp dụng với các policy như tại thời điểm kiểm toán, tài khoản đang là `admin` có thể cập nhật role của chính mình thành `super_admin`. Đây là rủi ro **có điều kiện**; repository không cung cấp bằng chứng schema đã chạy ở bất kỳ môi trường nào. Không kết luận hệ thống remote hiện đang khai thác được.

### 5.2. Không có authorization server-side

- `AuthGuard` và `RoleGuard` là component client; role/auth được truyền qua props, và không thấy route nào sử dụng chúng.
- Các trang quản trị hiển thị trực tiếp; hiện thao tác chủ yếu là demo nhưng nếu nối dữ liệu mà không thêm API authorization thì có thể lộ/sửa dữ liệu trái quyền.
- Route lĩnh vực đặc biệt và các trang con chưa có server-side membership gate. Nội dung hiện thấy chủ yếu là mô tả/mẫu; chưa có bằng chứng dữ liệu thật bị lộ.
- Không được dùng việc ẩn route/nút hoặc trạng thái localStorage làm cơ chế cấp quyền.

### 5.3. Mâu thuẫn chính sách quyền quản trị

- README và tài liệu mới quy định gói 10/30/90/365 ngày, trả bằng Pi; tài khoản Super Admin tối cao đã xác minh được miễn gói.
- `app/quan-tri/phan-quyen/page.tsx`, `app/quan-tri/gia-han/page.tsx` và điều khoản giao diện vẫn ghi chu kỳ 5 ngày. Tính năng gia hạn lưu tạm trên trình duyệt và đưa thông tin liên hệ trực tiếp vào mã nguồn.
- Nên thống nhất nội dung UI/Terms với chính sách đã chốt trước khi bật chức năng. Tại thời điểm kiểm toán chưa có thanh toán hoặc cấp quyền thật.

### 5.4. Domain helper giáo dục chưa đồng nhất

- Hai triển khai `scopeMatches`/`hasAnyEducationRole` khác nhau giữa `lib/permissions.ts` và `lib/education-management/permissions.ts`. Bản trong `lib/education-management/permissions.ts` trả `true` cho cùng scope trước khi xác minh scope tồn tại/active; nhánh Super Admin của `hasAnyEducationRole` trả `true` bất kể danh sách role yêu cầu. Bản `lib/permissions.ts` có kiểm tra chặt hơn ở các trường hợp này.
- `rejectAcademicResult` không kiểm tra thời hạn `effectiveFrom`/`effectiveTo` của approval policy như `approveAcademicResult`; thao tác từ chối có thể được cho phép khi policy hết hạn nếu được gọi với context phù hợp.
- Các helper có ghi rõ cần server xác minh; chưa thấy chúng được dùng trong API. Đây là lỗi tiềm tàng của code/domain layer, không phải bằng chứng đang có đường khai thác runtime.

### 5.5. Dữ liệu trình duyệt không đáng tin cậy

- Kết quả bài thi và đơn gia hạn được ghi vào `localStorage`; kết quả/điểm trên UI có thể bị sửa từ trình duyệt và không được coi là chính thức.
- Trang yêu cầu quản trị, phân quyền, nhật ký, quản lý nội dung/lĩnh vực và điểm danh thay đổi React state hoặc dùng dữ liệu hard-code, không có giao dịch server.
- Một câu hỏi bảo mật trong quiz chứa chuỗi giống mật khẩu mẫu hard-code. Không có bằng chứng đây là credential đang dùng; vẫn nên bỏ giá trị có hình thức giống password khỏi mã nguồn trước phát hành.

### 5.6. Endpoint health và cấu hình runtime

- `/api/health/db` không yêu cầu xác thực và cho biết trạng thái D1; hiện endpoint chỉ chạy `SELECT 1`, nên rủi ro lộ dữ liệu thấp nhưng có thể cung cấp tín hiệu vận hành cho người ngoài.
- Endpoint bắt mọi exception và chỉ trả lỗi chung; điều này che mất nguyên nhân chẩn đoán. Không đánh giá tác động thực tế khi deploy.
- `wrangler.jsonc` chứa D1 database ID và đặt compatibility date trong tương lai. Database ID không phải credential, nhưng đã được thay bằng placeholder trong ZIP để giảm lộ hạ tầng.

### 5.7. Dữ liệu cá nhân và thông tin đơn vị trong nguồn

README và một số trang/tài liệu có thông tin liên hệ cá nhân, họ tên thành viên, địa chỉ, số điện thoại, địa chỉ email/tài khoản và ví dụ định danh đơn vị. Một file quiz có chuỗi giống mật khẩu mẫu. Các nội dung này không phải dữ liệu nghiệp vụ cần thiết để ChatGPT đánh giá source.

Để đáp ứng yêu cầu đóng gói không chứa dữ liệu cá nhân/bí mật, chỉ **bản sao bên trong ZIP** được khử định danh/che giá trị liên quan. Các file gốc trong working tree không bị sửa. `.env.example` được giữ vì giá trị đang để trống; không tìm thấy file `.env` thật ở cấp gốc trong inventory. Quét pattern không thay thế việc rà soát credential ngoài repository.

## 6. Điểm chưa thống nhất giữa tài liệu và mã nguồn

1. **D1 so với Supabase:** README/kiến trúc mới chọn D1; code có D1 binding và endpoint health nhưng đăng nhập còn dùng Supabase client, `supabase/schema.sql` vẫn là schema starter và nhiều trang vẫn nói “sẽ kết nối Supabase”. Chưa có quyết định chuyển đổi được triển khai end-to-end.
2. **Tài khoản học tập so với miễn phí:** tài liệu mới xác nhận học miễn phí ở cả bảy lĩnh vực; UI thường nói hai lĩnh vực được truy cập tự do còn nhóm khác cần tài khoản. Đây không tự động là thu phí, nhưng cần giải thích rõ tài khoản/xác minh chỉ là điều kiện truy cập, không phải mua gói quản trị. Việc đăng ký hiện cũng chưa kết nối backend.
3. **Gói quản trị:** UI Terms/renewal/permissions vẫn 5 ngày; README và thiết kế hiện hành là 10/30/90/365 ngày thanh toán Pi.
4. **R2:** tài liệu mô tả bucket/object workflow; cấu hình không có R2 binding và mã nguồn không có file API storage.
5. **Next.js:** package/lock hiện giải quyết Next `15.5.29`; `docs/HTS_EDUCATION_MANAGEMENT_IMPLEMENTATION.md` còn ghi snapshot `15.2.4`. README cũng nêu hai mốc lịch sử/định hướng khác nhau.
6. **Tailwind:** README ghi Tailwind 4 nhưng dependency và cấu hình Tailwind không thấy trong repository.
7. **Ngày tài liệu/runtime:** nhiều tài liệu ghi ngày `26/11/2026`, còn `wrangler.jsonc` có compatibility date `2026-10-13`; cả hai đều ở tương lai so với ngày kiểm toán `14/07/2026`. Cần xác nhận đây là ngày dự kiến hay metadata nhập sai.
8. **Quyền đặc biệt:** tài liệu yêu cầu membership Lực lượng vũ trang phải được xác minh và chặn server-side; UI hiện chỉ mô tả quy trình, chưa có gate. Miễn phí học tập không được dùng để bỏ qua điều kiện phê duyệt đặc biệt.
9. **Schema và migration:** danh mục bảng trong README/thiết kế là ứng viên; chỉ schema Supabase starter được tìm thấy. Không được coi các bảng D1 trong tài liệu là đã tồn tại.

## 7. Khối lượng công việc còn lại và thứ tự ưu tiên

Không đưa ước lượng ngày công vì còn thiếu quyết định nghiệp vụ, môi trường/schema thật, acceptance criteria và nguồn lực tích hợp. Khối lượng tổng thể là **lớn**: cần xây backend, dữ liệu, kiểm soát truy cập, quy trình vận hành và kiểm thử trước khi hệ thống được coi là sản phẩm.

### P0 — Chốt an toàn và chính sách trước khi kết nối dữ liệu thật

1. Xác nhận nguồn sự thật: D1 hay Supabase, môi trường test/production, schema/migrations/backup và quy trình rollback; thực hiện bằng quyền truy cập được chủ dự án phê duyệt.
2. Xử lý thiết kế RLS tự nâng role trong schema starter trước bất kỳ lần áp dụng nào; xác minh schema remote riêng nếu được phê duyệt.
3. Thiết kế authentication/session và server-side authorization thống nhất; kiểm thử role, scope, hết hạn, thu hồi và truy cập chéo.
4. Đồng bộ nội dung miễn phí học tập, điều kiện account/membership đặc biệt và gói quản trị 10/30/90/365 ngày giữa README, Terms và UI.
5. Loại PII, secret và thông tin ví khỏi mọi gói chia sẻ; không đưa passphrase/private key vào ứng dụng hoặc log.

### P1 — Nền tảng backend và học tập cốt lõi

1. Chốt account, membership, role grant, scope, audit và schema D1; tạo migration chỉ sau khi được duyệt.
2. Triển khai API server-side cho đăng ký/xác minh/đăng nhập/đăng xuất/khôi phục và quyền; thay hoặc hoàn thiện Supabase theo quyết định nền tảng.
3. Triển khai nội dung bài giảng, khóa học, học liệu, tiến độ và lưu file R2/private storage; có quyền truy cập và audit.
4. Thay demo quản trị và dữ liệu local bằng API, validation, transaction, audit và test phù hợp.
5. Bảo vệ khu vực đặc biệt bằng server-side membership verification trên mọi route/API/file.

### P2 — Nghiệp vụ đánh giá và quản trị

1. Thi trực tuyến: đề/attempt/timing, lưu server-side, chấm server-side, kết quả chính thức, sửa điểm có version và phê duyệt.
2. Điểm danh: xác nhận scope, phương thức thay thế, audit/retention; chỉ xem xét sinh trắc sau phê duyệt pháp lý và privacy.
3. Báo cáo: request-before-report, template/version, approval, xuất file private, quyền theo trường và audit.
4. Thêm test tự động cho permission/scope, lifecycle grant, scoring workflow, payment state machine và truy cập chéo.

### P3 — Tích hợp có rủi ro/chi phí và mở rộng hệ sinh thái

1. Tích hợp thanh toán Pi thật: phương thức được Pi chấp thuận, xác minh server-side, idempotency, đối soát, xử lý giao dịch lỗi/từ chối và lịch sử; không tự cấp quyền sau payment.
2. Tích hợp AI/OCR với provider được duyệt, lọc dữ liệu/scope, nguồn trích dẫn, human review, quota, cost ledger và chính sách dữ liệu trẻ em/nhạy cảm.
3. Hoàn thiện mạng xã hội, moderation, chat/video, marketplace, Token HTS, từ thiện, Dân Cư Số và các phân hệ khác theo ưu tiên/ngân sách.
4. Rà soát pháp lý, bảo vệ dữ liệu, backup/restore, monitoring, incident response và nghiệm thu deploy.

## 8. Những điều chưa thể kiểm tra

- Schema, migrations, dữ liệu, người dùng và chính sách hiện hành của Supabase/D1 production; database ID trong cấu hình không được dùng để truy cập.
- R2 bucket, secrets, biến môi trường runtime, provider AI, email service, domain, Workers deployment và cấu hình production.
- Giao dịch Pi thật, ví nhận, trạng thái xác minh/gia hạn/hoàn tiền.
- Khả năng truy cập thực tế theo tài khoản/role vì không có credential test và không chạy ứng dụng.
- Build/deploy Cloudflare, giao diện trình duyệt và hành vi responsive thực tế.
- Việc schema starter Supabase đã từng được áp dụng ở môi trường nào.

Không tuyên bố hệ thống hoàn chỉnh hoặc an toàn production từ kết quả kiểm tra tĩnh này.

## 9. Working tree và giới hạn thay đổi

Trước khi tạo báo cáo, working tree đã có thay đổi sẵn ở `README_HTS_v5.0.md`, `eslint.config.mjs`, `next.config.ts` và nhiều file/thư mục untracked (gồm tài liệu, cấu hình Cloudflare, `lib/db.ts`, API health và output build). Các thay đổi sẵn có được giữ nguyên. Trong nhiệm vụ kiểm toán, không sửa mã nguồn/cấu hình, không chạy SQL/migration, không xóa dữ liệu, không commit/push. File báo cáo này là deliverable được tạo theo yêu cầu.

## 10. Phạm vi tạo ZIP

`HTS_FULL_SOURCE_REVIEW.zip` được tạo từ source/config/docs hiện có và báo cáo này. Bản ZIP loại `.git`, `node_modules`, `.next`, `.open-next`, `.wrangler`, cache/build, file `.env` thật, file backup, `cloudflare-env.d.ts`/`*.tsbuildinfo` và cấu hình editor cục bộ; giữ `package.json`, `package-lock.json`, schema SQL starter, cấu hình mẫu và `.env.example`.

Các bản sao trong ZIP được khử định danh/che thông tin liên hệ cá nhân, họ tên/địa chỉ/đơn vị cụ thể, tài khoản nhận diện cá nhân, D1 ID và chuỗi password-like trong quiz. File gốc không bị thay đổi. ZIP có 110 tệp, dung lượng 355.560 byte (khoảng 347,2 KiB); đã mở và giải nén thử thành công, xác nhận đủ các thư mục/tệp cần thiết, không có thư mục build/dependency bị loại trừ, và không phát hiện mẫu thông tin cá nhân/bí mật đã rà soát. Đây là kiểm tra theo mẫu, không bảo đảm tuyệt đối không còn dữ liệu nhạy cảm.
