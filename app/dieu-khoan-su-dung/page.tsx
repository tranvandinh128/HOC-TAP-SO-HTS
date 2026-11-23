
import Link from "next/link";

const terms = [
  {
    title: "1. Giới thiệu nền tảng",
    content:
      "HỌC TẬP SỐ (HTS) là nền tảng hỗ trợ học tập, chia sẻ kiến thức, rèn luyện kỹ năng và kết nối cộng đồng học tập. Khi truy cập hoặc sử dụng nền tảng, người dùng cần đọc, hiểu và tuân thủ các điều khoản này.",
  },
  {
    title: "2. Đối tượng sử dụng",
    content:
      "Nền tảng phục vụ 7 nhóm: Công dân học tập; Công nhân học tập; Sinh viên học tập; Học sinh THPT; Học sinh THCS; Học sinh tiểu học; Lực lượng vũ trang (Quân đội – Công an). Người dùng cần sử dụng đúng nhóm và phạm vi được phép.",
  },
  {
    title: "3. Đăng ký và quản lý tài khoản",
    content:
      "Một tài khoản có thể đăng ký nhiều nhóm học tập theo quy định. Người dùng phải cung cấp thông tin chính xác, tự chịu trách nhiệm bảo vệ tài khoản và không được sử dụng tài khoản của người khác khi chưa được phép. Đăng ký học tập không đồng nghĩa với việc được cấp quyền quản trị.",
  },
  {
    title: "4. Quyền của người sử dụng",
    content:
      "Người dùng được truy cập các chức năng phù hợp với nhóm học tập và quyền hạn của mình; xem bài giảng, tài liệu, tin tức, tham gia hoạt động học tập, kiểm tra và gửi phản hồi theo phạm vi hệ thống cho phép.",
  },
  {
    title: "5. Trách nhiệm của người sử dụng",
    content:
      "Người dùng phải cung cấp thông tin trung thực, tuân thủ quy định học tập, tôn trọng cộng đồng, không phát tán nội dung trái pháp luật, không gian lận trong kiểm tra và không tìm cách truy cập trái phép dữ liệu hoặc chức năng của hệ thống.",
  },
  {
    title: "6. Quy định về nội dung và học liệu",
    content:
      "Bài giảng, tài liệu, hình ảnh và các nội dung trên HTS chỉ được sử dụng đúng mục đích học tập và trong phạm vi được cấp phép. Không tự ý sao chép, sửa đổi, phân phối hoặc sử dụng nội dung vi phạm quyền sở hữu trí tuệ.",
  },
  {
    title: "7. Quy định về trí tuệ nhân tạo (AI)",
    content:
      "Các nội dung do AI hỗ trợ tạo ra phải được kiểm tra trước khi công bố. AI chỉ đóng vai trò hỗ trợ nghiên cứu, biên soạn và đề xuất. AI không được tự ý xuất bản, xóa hoặc chỉnh sửa nội dung đã công bố. Người có thẩm quyền phải xem xét và chịu trách nhiệm về nội dung được duyệt.",
  },
  {
    title: "8. Quyền quản trị và phân quyền",
    content:
      "Hệ thống có các vai trò người học (learner), quản trị viên lĩnh vực (field_admin) và quản trị viên cấp cao (super_admin). Quản trị viên lĩnh vực chỉ được thao tác trong phạm vi được giao. Chỉ quản trị viên cấp cao được phê duyệt, thay đổi, tạm dừng hoặc thu hồi quyền quản trị theo quy định.",
  },
  {
    title: "9. Thời hạn quyền quản trị",
    content:
      "Quyền quản trị viên lĩnh vực được cấp theo từng chu kỳ 5 ngày. Khi hết hạn, các chức năng quản trị bị khóa nhưng tài khoản cá nhân vẫn được duy trì. Người dùng có thể gửi yêu cầu gia hạn để quản trị viên cấp cao xem xét và phê duyệt.",
  },
  {
    title: "10. Bản quyền và sở hữu trí tuệ",
    content:
      "Tên gọi, thương hiệu, giao diện, mã nguồn, tài liệu và các nội dung thuộc quyền sở hữu của HTS hoặc bên cấp phép được bảo vệ theo quy định pháp luật. Người dùng không được sử dụng trái phép hoặc gây ảnh hưởng đến quyền và lợi ích hợp pháp của chủ sở hữu.",
  },
  {
    title: "11. Bảo vệ dữ liệu và thông tin cá nhân",
    content:
      "HTS thực hiện việc thu thập, xử lý và lưu trữ dữ liệu theo chính sách bảo mật được công bố. Người dùng cần bảo vệ thông tin đăng nhập. Tuyệt đối không cung cấp mật khẩu ví Pi, passphrase, khóa bí mật, mã OTP hoặc thông tin xác thực nhạy cảm cho hệ thống hay bất kỳ cá nhân nào.",
  },
  {
    title: "12. Giới hạn và an toàn hệ thống",
    content:
      "Người dùng không được phát tán mã độc, tấn công, gây quá tải, dò tìm lỗ hổng trái phép, can thiệp dữ liệu hoặc phá hoại hoạt động của HTS. Khi phát hiện sự cố, cần thông báo cho bộ phận hỗ trợ.",
  },
  {
    title: "13. Tạm ngừng hoặc chấm dứt quyền sử dụng",
    content:
      "HTS có thể áp dụng biện pháp hạn chế hoặc tạm ngừng chức năng khi phát hiện dấu hiệu vi phạm, rủi ro bảo mật hoặc yêu cầu hợp pháp. Việc xử lý cần có căn cứ, đúng thẩm quyền và được ghi nhận theo quy trình.",
  },
  {
    title: "14. Thay đổi điều khoản",
    content:
      "Điều khoản có thể được cập nhật để phù hợp với chức năng, hoạt động và quy định pháp luật. Phiên bản cập nhật sẽ được công bố trên nền tảng. Người dùng nên thường xuyên theo dõi để nắm rõ các thay đổi.",
  },
  {
    title: "15. Liên hệ và giải quyết phản ánh",
    content:
      "Khi có thắc mắc, khiếu nại hoặc cần hỗ trợ, người dùng có thể gửi thông tin qua trang Liên hệ. Các phản ánh sẽ được tiếp nhận và xem xét theo quy trình của đơn vị quản lý HTS.",
  },
];

export default function DieuKhoanSuDungPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            ĐIỀU KHOẢN SỬ DỤNG
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-blue-50">
            Quy định quyền, trách nhiệm và nguyên tắc sử dụng
            nền tảng HỌC TẬP SỐ một cách an toàn, minh bạch
            và hiệu quả.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">
              Nguyên tắc sử dụng HTS
            </h2>
            <p className="mt-2 text-sm leading-7 text-blue-900">
              Đúng mục đích – Đúng quyền hạn – Tôn trọng bản quyền –
              Bảo vệ dữ liệu – Cùng xây dựng cộng đồng học tập số.
            </p>
          </div>

          <div className="space-y-8">
            {terms.map((item) => (
              <section
                key={item.title}
                className="border-b border-slate-100 pb-6 last:border-0"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-3 leading-8 text-slate-600">
                  {item.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">
              Thông báo
            </h2>
            <p className="mt-2 text-sm leading-7 text-amber-900">
              Đây là bản dự thảo điều khoản sử dụng phục vụ xây dựng
              HTS. Trước khi đưa vào áp dụng chính thức, đơn vị quản lý
              cần rà soát pháp lý, xác định chủ thể chịu trách nhiệm,
              cơ chế tiếp nhận khiếu nại và quy trình xử lý dữ liệu.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quy-dinh-hoc-tap"
              className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Quy định học tập
            </Link>

            <Link
              href="/chinh-sach-bao-mat"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Chính sách bảo mật
            </Link>

            <Link
              href="/lien-he"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Liên hệ
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
