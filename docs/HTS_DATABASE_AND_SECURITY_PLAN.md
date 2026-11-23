
# HTS – KẾ HOẠCH CƠ SỞ DỮ LIỆU VÀ BẢO MẬT

## 1. Mục đích
Tài liệu xác định các nguyên tắc cần tuân thủ khi xây dựng cơ sở dữ liệu, xác thực tài khoản, phân quyền quản trị, lưu nhật ký và bảo vệ dữ liệu của nền tảng HỌC TẬP SỐ (HTS).

Đây là tài liệu định hướng triển khai. Không phải SQL migration và không xác nhận rằng các chức năng đã hoạt động.

## 2. Nhóm học tập
HTS có 7 nhóm học tập:
1. Công dân học tập.
2. Công nhân học tập.
3. Sinh viên học tập.
4. Học sinh THPT.
5. Học sinh THCS.
6. Học sinh tiểu học.
7. Lực lượng vũ trang (Quân đội – Công an).

Công dân học tập và Công nhân học tập được truy cập nội dung mở, không bắt buộc tạo tài khoản đối với các chức năng học tập công khai. Các nhóm còn lại cần tài khoản theo quy định của hệ thống.

Đăng ký lĩnh vực học tập không đồng nghĩa với việc được cấp quyền quản trị.

## 3. Mô hình vai trò
Hệ thống sử dụng ba vai trò:
- `learner`: người học.
- `field_admin`: quản trị viên được giao một lĩnh vực cụ thể.
- `super_admin`: quản trị viên cấp cao.

### 3.1. Quyền của learner
- Truy cập nội dung theo lĩnh vực đã đăng ký và chính sách truy cập.
- Quản lý thông tin tài khoản của chính mình.
- Theo dõi tiến độ học tập và kết quả được phép xem.
- Gửi yêu cầu xin quyền quản trị lĩnh vực nếu đáp ứng điều kiện.

### 3.2. Quyền của field_admin
- Quản lý nội dung trong lĩnh vực được giao.
- Xem và xử lý dữ liệu thuộc phạm vi được phân công.
- Không được tự cấp quyền cho mình hoặc người khác.
- Không được quản trị lĩnh vực khác nếu chưa được giao.
- Không được thay đổi, thu hồi hoặc can thiệp quyền super_admin.

### 3.3. Quyền của super_admin
- Tiếp nhận, phê duyệt hoặc từ chối yêu cầu quản trị.
- Cấp, thay đổi, tạm đình chỉ và thu hồi quyền field_admin.
- Quản lý phạm vi lĩnh vực được phân công.
- Kiểm tra nhật ký và hoạt động quản trị theo thẩm quyền.

Chỉ super_admin được thực hiện các quyết định cấp, đổi hoặc thu hồi quyền quản trị.

## 4. Quy trình yêu cầu quản trị
1. Người dùng đăng nhập.
2. Hệ thống xác định lĩnh vực học tập đã đăng ký.
3. Người dùng gửi yêu cầu quản trị đúng lĩnh vực của mình.
4. Yêu cầu được lưu với trạng thái `pending`.
5. super_admin xem xét và phê duyệt hoặc từ chối.
6. Nếu được phê duyệt, hệ thống mới cấp vai trò field_admin và gắn lĩnh vực được giao.
7. Mọi quyết định phải được ghi vào nhật ký.

Không cho phép người dùng tự sửa vai trò hoặc lĩnh vực được giao bằng cách gửi dữ liệu từ trình duyệt.

## 5. Các nhóm dữ liệu dự kiến
Tên bảng dưới đây là định hướng thiết kế, chưa phải danh sách bảng đã được triển khai:
- `profiles`: hồ sơ người dùng.
- `learning_fields`: danh mục lĩnh vực học tập.
- `user_roles`: vai trò và phạm vi phân quyền.
- `admin_requests`: yêu cầu quản trị.
- `announcements`: thông báo.
- `courses`: khóa học.
- `lessons`: bài học.
- `learning_progress`: tiến độ học tập.
- `exams`: kỳ thi và bài kiểm tra.
- `exam_results`: kết quả thi.
- `exam_import_batches`: đợt nhập kết quả.
- `exam_import_rows`: các dòng dữ liệu nhập.
- `audit_logs`: nhật ký hoạt động.
- Các bảng đăng ký quà tặng, đồng phục và dữ liệu nghiệp vụ khác sẽ được thiết kế riêng theo phạm vi sử dụng và mức độ bảo mật.

Trước khi tạo hoặc sửa bảng phải kiểm tra schema hiện tại, dữ liệu hiện có, khóa ngoại, chỉ mục và chính sách RLS.

## 6. Xác thực tài khoản
Định hướng sử dụng Supabase Auth:
- Đăng ký bằng email và mật khẩu.
- Xác minh email theo cấu hình hệ thống.
- Đăng nhập và đăng xuất.
- Khôi phục mật khẩu.
- Liên kết hồ sơ người dùng với mã định danh Auth.
- Không lưu mật khẩu dạng văn bản trong bảng hồ sơ.
- Không đưa khóa bí mật dịch vụ Supabase vào mã nguồn phía trình duyệt.

Số điện thoại chỉ được sử dụng sau khi xác định quy trình xác minh phù hợp.

## 7. Nguyên tắc bảo mật cơ sở dữ liệu
- Bật Row Level Security (RLS) cho các bảng chứa dữ liệu người dùng hoặc dữ liệu quản trị.
- Người dùng chỉ được đọc hoặc sửa dữ liệu thuộc quyền của mình.
- field_admin chỉ thao tác trong lĩnh vực được giao.
- Chỉ super_admin được phê duyệt và thay đổi quyền quản trị.
- Không dựa riêng vào việc ẩn nút hoặc chặn trang ở giao diện.
- Kiểm tra quyền tại máy chủ và cơ sở dữ liệu.
- Không tin tưởng role, user_id hoặc field_id do trình duyệt tự gửi lên nếu chưa xác minh.
- Không sử dụng service role key ở phía client.
- Kiểm tra chính sách RLS bằng các tài khoản thuộc từng vai trò trước khi vận hành.

## 8. Nhật ký quản trị
Cần ghi lại các hoạt động quan trọng:
- Gửi, phê duyệt và từ chối yêu cầu quản trị.
- Cấp, thay đổi, đình chỉ và thu hồi vai trò.
- Khóa hoặc mở khóa tài khoản.
- Tạo, sửa, ẩn hoặc xóa nội dung.
- Xem, xuất dữ liệu nhạy cảm theo chính sách được phê duyệt.

Mỗi bản ghi cần có người thực hiện, hành động, đối tượng liên quan, thời điểm, kết quả và thông tin cần thiết để kiểm tra. Người dùng thông thường không được tự sửa hoặc xóa nhật ký.

## 9. Dữ liệu quà tặng và đồng phục
- Người đăng ký chỉ được xem thông tin đăng ký của chính mình.
- field_admin thuộc lực lượng được giao nhiệm vụ chỉ được xử lý dữ liệu trong phạm vi được phê duyệt.
- super_admin quản lý theo thẩm quyền.
- Quyền xem, sửa, tổng hợp và xuất dữ liệu phải được phân biệt.
- Hoạt động truy cập và xuất dữ liệu cần được ghi nhật ký.
- Không đưa dữ liệu thật hoặc dữ liệu nhạy cảm lên kho mã nguồn công khai.

## 10. Điểm danh và nhận diện khuôn mặt
Định hướng điểm danh theo chu kỳ 10 phút/lần đối với các nhóm học sinh, sinh viên và lực lượng vũ trang theo quy định được phê duyệt.

Không áp dụng điểm danh bắt buộc này đối với Công dân học tập và Công nhân học tập.

Trước khi triển khai nhận diện khuôn mặt phải:
- Xác định căn cứ pháp lý, mục đích và phạm vi xử lý.
- Có quy trình thông báo và chấp thuận phù hợp.
- Đánh giá rủi ro dữ liệu sinh trắc học.
- Sử dụng hạ tầng lưu trữ được cấp có thẩm quyền phê duyệt.
- Có phương án xử lý khi nhận diện không thành công.

Một lần nhận diện thất bại không được tự động kết luận người học vắng mặt hoặc áp dụng hình thức kỷ luật. Trường hợp lỗi phải chuyển sang trạng thái cần xác minh.

## 11. Thi và giám sát thi
- Hệ thống ghi nhận các sự kiện vi phạm theo quy chế thi.
- Khi đạt ngưỡng 4 lần, hệ thống đánh dấu cảnh báo để người có thẩm quyền xem xét.
- Người học vẫn được tiếp tục làm bài, không tự động dừng bài thi hoặc kết luận trượt.
- Việc xử lý kết quả phải do người có thẩm quyền quyết định theo quy chế.

## 12. Nhập và đối chiếu điểm thi
Dữ liệu danh sách thi dự kiến gồm:
- Trường học hoặc đơn vị.
- Lớp hoặc nhóm.
- Họ và tên.
- Số báo danh.
- Mã kỳ thi hoặc ca thi.
- Môn thi hoặc nội dung thi.
- Điểm và trạng thái xác minh.

Quy trình:
1. Nhập tệp Excel hoặc CSV.
2. Cho phép ánh xạ cột dữ liệu.
3. Hiển thị bản xem trước trước khi ghi dữ liệu.
4. Đối chiếu theo số báo danh trong đúng kỳ thi hoặc ca thi.
5. Kiểm tra họ tên để xác nhận chéo.
6. Đưa trường hợp trùng số báo danh, thiếu thông tin hoặc không khớp vào danh sách cần xử lý.
7. Không tự động gán điểm khi có dữ liệu mơ hồ.
8. Lưu lịch sử nhập, người thực hiện và kết quả xử lý.
9. Chỉ người có thẩm quyền mới được sửa điểm đã chốt; phải lưu điểm cũ, điểm mới và lý do.

## 13. Sao lưu và phục hồi
- Xác định lịch sao lưu phù hợp.
- Kiểm tra khả năng phục hồi định kỳ.
- Giới hạn người được phép truy cập bản sao lưu.
- Không lưu bản sao dữ liệu nhạy cảm ở nơi công khai.
- Có quy trình ứng phó khi mất dữ liệu hoặc phát hiện truy cập trái phép.

## 14. Trình tự triển khai đề xuất
1. Kiểm tra cấu trúc Supabase hiện tại và dữ liệu đang có.
2. Thống nhất mô hình bảng và quan hệ dữ liệu.
3. Thiết kế migration có thể kiểm tra và khôi phục.
4. Thiết lập Supabase Auth.
5. Thiết lập RLS và các hàm kiểm tra quyền.
6. Hoàn thiện quy trình yêu cầu, duyệt và thu hồi quyền quản trị.
7. Kết nối giao diện quản trị với dữ liệu thật.
8. Kiểm thử bằng tài khoản thuộc từng vai trò.
9. Kiểm tra nhật ký, sao lưu và phục hồi.
10. Chỉ triển khai dữ liệu nhạy cảm sau khi có phê duyệt và hạ tầng phù hợp.

## 15. Những việc chưa được coi là hoàn thành
Việc tạo tài liệu hoặc kiểu dữ liệu TypeScript không có nghĩa là:
- Cơ sở dữ liệu đã được tạo đầy đủ.
- Supabase Auth đã hoạt động.
- RLS đã được cấu hình an toàn.
- Quy trình phê duyệt quản trị đã hoạt động.
- Nhật ký đã được ghi vào cơ sở dữ liệu.
- Nhận diện khuôn mặt hoặc giám sát thi đã được triển khai.

Mọi chức năng chỉ được xác nhận hoàn thành sau khi có mã triển khai, cấu hình phù hợp và kết quả kiểm thử.

## 16. Nguyên tắc đối với dữ liệu thuộc phạm vi quân đội
Dữ liệu thuộc phạm vi quân đội, dữ liệu cá nhân nhạy cảm, dữ liệu sinh trắc học và dữ liệu nghiệp vụ nội bộ chỉ được xử lý trên hệ thống, hạ tầng và theo quy trình được cấp có thẩm quyền phê duyệt. Không tự ý đưa các dữ liệu này lên GitHub công khai hoặc dịch vụ chưa được phê duyệt.
