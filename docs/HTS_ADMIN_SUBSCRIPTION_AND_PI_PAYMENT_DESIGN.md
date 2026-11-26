# HTS – Thiết kế gói quyền quản trị và thanh toán Pi Network

**Trạng thái:** Tài liệu thiết kế; chưa tích hợp thanh toán, chưa tạo bảng D1, chưa lập migration và chưa chạy SQL.
**Kiến trúc chuẩn:** [HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md](./HTS_CLOUDFLARE_D1_CANONICAL_ARCHITECTURE.md).
**Đối chiếu nghiệp vụ:** `README_HTS_v5.0.md` mục 29, 43 và 45; `docs/HTS_MASTER_ARCHITECTURE.md`; `docs/HTS_D1_AUTH_RBAC_DESIGN.md`. `BAO_CAO_RA_SOAT_SUPABASE_D1.md` chỉ là bằng chứng kiểm toán lịch sử.

## 1. Mục tiêu và ranh giới quyền

HTS tách riêng ba loại quyền, không dùng một gói trả phí để thay thế membership hoặc quyền khác:

| Loại quyền | Chính sách |
|---|---|
| Học tập | Miễn phí trong cả bảy lĩnh vực: bài giảng/chương trình, học liệu được phép, bài tập/kiểm tra/nộp bài, trợ lý AI giảng dạy theo chính sách nền tảng, lớp/nhóm, kết quả và tiến độ. Không yêu cầu mua gói quản trị. |
| Quản trị | Tài khoản được cấp quyền quản trị cần gói thời hạn thanh toán bằng Pi Network. Ngoại lệ duy nhất là tài khoản Super Admin tối cao đã xác minh của chủ dự án Trần Văn Dĩnh (`tranvandinh1281984@gmail.com`), được miễn phí quản trị vĩnh viễn. Mọi tài khoản quản trị khác, gồm Field Admin và quyền quản trị bổ sung, phải có gói. |
| Truy cập đặc biệt | Membership/nội dung giới hạn có thể yêu cầu xác minh và phê duyệt trước khi truy cập, ví dụ Lực lượng vũ trang. Đây là điều kiện tư cách/phạm vi, không phải phí học tập; mua gói quản trị không thay thế phê duyệt membership. |

Quyền quản trị phải gắn với `account_id`, role/permission, lĩnh vực, scope, trạng thái, thời gian hiệu lực và người phê duyệt. Hết hạn, tạm khóa hoặc thu hồi quyền quản trị không khóa tài khoản, xóa dữ liệu hay làm mất quyền học tập miễn phí hợp lệ.

Ngoại lệ Super Admin phải gắn với đúng account đã bootstrap và xác minh trong quy trình an toàn; địa chỉ email trên là thông tin nhận diện chủ dự án nhưng khi vận hành phải ràng buộc với account ID đã xác minh, không chỉ role do client gửi, email không kiểm chứng hoặc cờ có thể tự sửa. Không cho phép tài khoản khác tự cấp hoặc tự nhận ngoại lệ.

## 2. Gói và giá

| Thời hạn | Giá |
|---:|---:|
| 10 ngày | 0,00314 Pi |
| 30 ngày | 0,00942 Pi |
| 90 ngày | 0,02826 Pi |
| 365 ngày | 0,11461 Pi |

Chỉ chấp nhận Pi Network cho gói quyền quản trị này. Không hỗ trợ tiền mặt, chuyển khoản ngân hàng, COD hoặc phương thức thanh toán khác. Giá gói, thời hạn, trạng thái khả dụng và phiên bản giá phải được hiển thị trước khi tạo đơn. Đơn đã tạo lưu snapshot giá/thời hạn; thay đổi bảng giá chỉ áp dụng cho đơn mới.

Gói là điều kiện thanh toán, không phải quyết định cấp quyền và không bảo đảm yêu cầu quản trị sẽ được chấp thuận.

## 3. Quy trình đơn hàng, xác minh và phê duyệt

1. Người dùng gửi yêu cầu quản trị/gia hạn với role, lĩnh vực, scope và lý do; chọn gói phù hợp.
2. Máy chủ tạo đơn liên kết account, yêu cầu quản trị, phiên bản gói/giá và Pi cần thanh toán. Client không được tự xác nhận giá, người nhận, trạng thái thanh toán hoặc quyền.
3. Người dùng thanh toán bằng Pi Network qua luồng tích hợp được phê duyệt. Giao diện chỉ gửi định danh giao dịch cần thiết, không gửi bí mật ví.
4. Máy chủ xác minh giao dịch với nguồn/tích hợp Pi Network được phê duyệt: mã giao dịch, trạng thái cuối cùng, số Pi chính xác, địa chỉ nhận cấu hình, mạng/ngữ cảnh ứng dụng và liên kết tới đúng đơn. Chống xử lý lặp bằng mã giao dịch duy nhất và tính idempotent.
5. Xác minh thành công cập nhật **trạng thái thanh toán** và đưa yêu cầu sang **chờ Super Admin xét duyệt**. Không tạo hoặc kích hoạt role grant tự động.
6. Super Admin xem account, yêu cầu, role, lĩnh vực/scope, lịch sử và kết quả thanh toán; quyết định chấp thuận, từ chối hoặc yêu cầu bổ sung. Mọi quyết định có actor, thời điểm và lý do.
7. Chỉ khi được Super Admin chấp thuận, hệ thống mới tạo/kích hoạt grant với account, role, scope, starts_at và ends_at cụ thể. Thanh toán thành công nhưng chưa được duyệt không cấp quyền.
8. Khi gia hạn, vẫn xác minh Pi và lưu một quyết định gia hạn mới; không ghi đè lịch sử grant/giao dịch cũ.

Không xác nhận thanh toán dựa trên ảnh chụp màn hình, callback chưa xác thực hoặc dữ liệu do trình duyệt tự khai. Cần xác minh giao dịch phía máy chủ bằng phương thức chính thức được Pi Network cho phép; giao thức/API và điều kiện vận hành phải được nghiên cứu, phê duyệt trước khi tích hợp thật.

## 4. Trạng thái độc lập

Lưu trạng thái thanh toán tách khỏi quyết định quản trị và trạng thái quyền:

| Luồng | Trạng thái gợi ý | Ý nghĩa |
|---|---|---|
| Thanh toán | `created`, `pending_payment`, `verifying`, `paid`, `failed`, `expired`, `cancelled`, `refunded` (nếu được hỗ trợ/phê duyệt) | Kết quả của đơn và giao dịch Pi; `paid` không có nghĩa là đã được cấp quyền. |
| Xét duyệt | `pending`, `needs_revision`, `approved`, `rejected` | Quyết định của Super Admin đối với role/scope được đề nghị. |
| Entitlement/grant | `pending_activation`, `active`, `suspended`, `expired`, `revoked` | Hiệu lực quyền quản trị ở server. Quyền chỉ hoạt động khi grant được duyệt, đúng scope và còn hạn. |

Trạng thái hoàn tiền không được giả định nếu chưa có chính sách và khả năng kỹ thuật được xác nhận. Nếu giao dịch đã paid nhưng yêu cầu bị từ chối, không cấp grant; đơn chuyển sang quy trình xử lý/đối soát được ghi nhận, không tự tuyên bố đã hoàn tiền.

## 5. Mô hình dữ liệu logic cần đối chiếu

Đây là các thực thể nghiệp vụ, chưa phải schema hoặc migration:

| Thực thể logic | Dữ liệu tối thiểu cần liên kết |
|---|---|
| Gói và phiên bản giá | Mã gói, số ngày, giá Pi, trạng thái, thời điểm hiệu lực, người thay đổi và lịch sử phiên bản |
| Yêu cầu quản trị | Account, role, lĩnh vực/scope, lý do, trạng thái xét duyệt và người quyết định |
| Đơn thanh toán | Account, yêu cầu, gói/giá snapshot, số Pi phải trả, trạng thái, thời hạn đơn |
| Giao dịch Pi | Mã giao dịch nội bộ, transaction ID Pi, số Pi thực tế, địa chỉ nhận, mạng/ngữ cảnh, thời điểm và trạng thái |
| Kết quả xác minh | Đơn/giao dịch, nguồn và thời điểm xác minh, kết quả, lỗi/khác biệt, thông tin đối soát tối thiểu |
| Entitlement/grant | Account, role, scope, order tham chiếu, trạng thái, starts_at/ends_at, người cấp và quyết định |
| Nhật ký | Actor, entity, action, trạng thái trước/sau, scope, thời điểm, lý do và correlation ID |

Các tên bảng ứng viên trong hồ sơ hiện có gồm `entitlement_plans`, `entitlement_plan_prices`, `entitlement_subscriptions`/`entitlements`, `pi_payment_orders`, `pi_payment_transactions`, `pi_payment_verifications`, `entitlement_audit_logs`/`entitlement_audit`, cùng `role_grants` và `role_grant_history`. Phải kiểm kê D1 và hợp nhất tên/bảng tương đương trước khi chốt; không tạo bảng trùng. Lưu ý đây chỉ là danh sách đề xuất, không xác nhận bảng đã tồn tại.

## 6. Hiệu lực, gia hạn và hết hạn

- **Đề xuất mặc định:** thời hạn bắt đầu lúc Super Admin kích hoạt grant; thời gian giao dịch đã paid nhưng chờ duyệt không làm hao hụt thời hạn. Cấu hình ngày bắt đầu cần được phê duyệt trước triển khai.
- **Đề xuất gia hạn:** nếu duyệt trước khi grant hiện tại hết hạn, cộng nối từ `ends_at` hiện tại; nếu đã hết hạn, tính từ thời điểm kích hoạt grant mới. Lưu riêng mỗi lần cấp/gia hạn và giá gói tương ứng.
- Khi hết hạn, Worker/API từ chối thao tác quản trị mới ngay cả khi giao diện/cache còn cũ. Hành vi trạng thái có thể là hết hiệu lực ngay hoặc chờ gia hạn theo cấu hình; trong mọi trường hợp, quyền không được tiếp tục chỉ vì đơn gia hạn đang pending.
- Tạm khóa/thu hồi có hiệu lực ngay ở server và được ghi audit. Không xóa account, membership, lịch sử học tập, giao dịch hoặc grant history.
- Thông báo sắp hết hạn và luồng yêu cầu gia hạn là hỗ trợ nghiệp vụ; không tự động gia hạn hoặc cấp quyền.

## 7. Bảo mật và audit

- Không lưu Pi Wallet Passphrase, private key, seed phrase, thông tin xác thực bí mật ví hoặc yêu cầu người dùng cung cấp chúng.
- Chỉ lưu định danh giao dịch và dữ liệu cần để xác minh/đối soát; không đưa secret vào log, audit, metadata hay thông báo.
- Máy chủ là nguồn quyết định duy nhất cho giá, trạng thái giao dịch, quyền Super Admin, scope và grant. Mặc định từ chối khi xác minh không rõ ràng, dữ liệu sai lệch hoặc giao dịch lặp.
- Bảo vệ endpoint xác minh bằng xác thực nguồn gọi phù hợp, kiểm tra chữ ký/token theo phương thức tích hợp chính thức, idempotency, giới hạn truy cập và audit. Không tin redirect thành công ở client.
- Audit bất biến về tạo/hủy đơn, xác minh/đối soát, quyết định Super Admin, cấp/gia hạn/tạm khóa/thu hồi grant, hết hạn và thay đổi giá. Ghi lý do cần thiết nhưng không lưu bí mật ví.

## 8. Tiêu chí nghiệm thu thiết kế

- Học viên đủ điều kiện truy cập hoạt động học tập mà không cần mua gói quản trị.
- Thành viên Lực lượng vũ trang chưa được duyệt không truy cập khu vực nội bộ dù có tài khoản hoặc đã mua gói quản trị.
- Pi đã xác minh nhưng chưa được Super Admin duyệt không tạo quyền; chỉ Super Admin có thẩm quyền mới cấp đúng account/role/scope/thời hạn.
- Chỉ tài khoản Super Admin tối cao đã xác minh của chủ dự án được miễn gói; account quản trị khác không thể tự đặt ngoại lệ.
- Hết hạn/thu hồi chặn thao tác quản trị nhưng không xóa dữ liệu hoặc quyền học tập.
- Sai số tiền, sai người nhận, sai đơn, giao dịch trùng, trạng thái không cuối cùng và xác minh lỗi không được đánh dấu paid.
- Không có passphrase/private key trong lưu trữ hoặc log; lịch sử thanh toán, duyệt, cấp và thu hồi có thể đối soát.

## 9. Việc bắt buộc trước khi phát triển

1. Kiểm kê schema/migration D1 và hợp nhất thực thể bảng, khóa và liên kết hiện có.
2. Phê duyệt quy trình Pi Network chính thức được phép dùng, địa chỉ nhận, mạng và cách đối soát.
3. Chốt xử lý đơn đã thanh toán nhưng bị từ chối, giao dịch sai/thiếu/thừa, hoàn tiền hoặc khiếu nại.
4. Chốt cấu hình hết hạn/chờ gia hạn, ngày bắt đầu và quy tắc cộng nối.
5. Phê duyệt ma trận role/scope, người xét duyệt, MFA và quy trình audit.
6. Đánh giá yêu cầu pháp lý, điều khoản Pi Network và vận hành trước khi nhận thanh toán thật.

Tài liệu này không tạo bảng D1, không chạy SQL, không tích hợp thanh toán Pi thật, không thay đổi mã nguồn ứng dụng và không xác nhận bất kỳ chức năng nào đã vận hành.
