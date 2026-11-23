
import Link from "next/link";

const terms = [
  {
    title: "1. Chấp nhận điều khoản",
    content:
      "Khi truy cập hoặc sử dụng nền tảng HỌC TẬP SỐ (HTS), người dùng cần đọc, hiểu và tuân thủ các điều khoản được công bố. Nếu không đồng ý, người dùng có thể ngừng sử dụng các chức năng tương ứng.",
  },
  {
    title: "2. Đối tượng sử dụng",
    content:
      "HTS phục vụ công dân, công nhân, sinh viên, học sinh tiểu học, THCS, THPT và lực lượng vũ trang (Quân đội – Công an). Một số nội dung được mở miễn phí không cần tài khoản; các nhóm học tập khác có thể yêu cầu đăng ký và xác thực tài khoản.",
  },
  {
    title: "3. Tài khoản người dùng",
    content:
      "Người dùng có trách nhiệm cung cấp thông tin chính xác, bảo vệ thông tin đăng nhập và không sử dụng tài khoản của người khác khi chưa được phép. Một tài khoản có thể đăng ký nhiều nhóm học tập theo quy định. Việc đăng ký nhóm học tập không đồng nghĩa với việc được cấp quyền quản trị.",
  },
  {
    title: "4. Quyền và trách nhiệm của người học",
    content:
      "Người học được sử dụng các bài giảng, tài liệu, bài kiểm tra và chức năng phù hợp với nhóm đã đăng ký. Người học có trách nhiệm tuân thủ quy định học tập, không gian lận, không phát tán nội dung trái pháp luật và không xâm phạm quyền của người khác.",
  },
  {
    title: "5. Quy định kiểm tra và thi trực tuyến",
    content:
      "Người dự thi phải tuân thủ hướng dẫn, thời gian và quy chế của từng kỳ kiểm tra. Hệ thống có thể ghi nhận dấu hiệu bất thường để phục vụ việc xem xét. Khi phát hiện bốn lần vi phạm quy tắc giám sát, hệ thống có thể tạo cảnh báo để người có thẩm quyền kiểm tra; không tự động dừng bài thi hoặc kết luận người học trượt chỉ dựa trên cảnh báo.",
  },
  {
    title: "6. Điểm danh và theo dõi học tập",
    content:
      "Chức năng điểm danh định kỳ có thể được áp dụng cho các nhóm học sinh, sinh viên và lực lượng vũ trang theo kế hoạch được phê duyệt. Việc nhận diện không thành công phải có phương án kiểm tra thủ công. Không tự động kết luận vắng mặt hoặc áp dụng hình thức xử lý khi chưa xác minh.",
  },
  {
    title: "7. Quy định đối với quản trị viên",
    content:
      "Quản trị viên lĩnh vực chỉ được quản lý nhóm học tập thuộc phạm vi được giao. Quản trị viên không được tự nâng quyền, tự cấp quyền cho người khác hoặc can thiệp vào lĩnh vực ngoài phạm vi. Quyền quản trị được cấp theo thời hạn năm ngày; việc gia hạn phải được quản trị viên cấp cao phê duyệt.",
  },
  {
    title: "8. Nội dung và quyền sở hữu trí tuệ",
    content:
      "Người dùng không được sao chép, phân phối, sửa đổi hoặc khai thác nội dung của HTS trái phép. Nội dung do người dùng đóng góp phải bảo đảm quyền sử dụng hợp pháp và không vi phạm quyền sở hữu trí tuệ của bên thứ ba.",
  },
  {
    title: "9. Sử dụng trí tuệ nhân tạo",
    content:
      "Các nội dung do AI hỗ trợ tạo ra phải được người có thẩm quyền kiểm tra trước khi công bố. AI không được tự ý xuất bản, sửa đổi hoặc xóa nội dung đã công bố. Người dùng không được sử dụng AI để tạo nội dung lừa đảo, vi phạm pháp luật hoặc gây tổn hại cho người khác.",
  },
  {
    title: "10. Thanh toán và Pi Network",
    content:
      "Đối với các chức năng thương mại có hỗ trợ Pi, phương thức thanh toán được quy định là thanh toán bằng Pi theo hướng dẫn của hệ thống. Giá Pi tham chiếu từ sàn OKX, nếu được sử dụng, chỉ là giá tham khảo thị trường tại thời điểm truy vấn, không phải giá chính thức do Pi Core Team công bố. Giao dịch chỉ được xác nhận sau khi máy chủ kiểm tra hợp lệ thông tin giao dịch.",
  },
  {
    title: "11. Hành vi bị nghiêm cấm",
    content:
      "Nghiêm cấm xâm nhập trái phép, phá hoại hệ thống, phát tán mã độc, gian lận thi cử, giả mạo danh tính, sử dụng dữ liệu trái phép, quấy rối người dùng khác hoặc lợi dụng nền tảng cho các hoạt động vi phạm pháp luật.",
  },
  {
    title: "12. Tạm ngừng hoặc hạn chế quyền sử dụng",
    content:
      "HTS có thể áp dụng biện pháp hạn chế chức năng, tạm khóa hoặc xử lý tài khoản khi phát hiện dấu hiệu vi phạm theo quy trình phù hợp. Việc xử lý cần có căn cứ, ghi nhận lý do và bảo đảm quyền được tiếp nhận, giải trình hoặc khiếu nại của người dùng theo quy định.",
  },
  {
    title: "13. Giới hạn trách nhiệm",
    content:
      "HTS nỗ lực duy trì hệ thống ổn định và an toàn nhưng không cam kết dịch vụ luôn hoạt động liên tục, không có lỗi hoặc gián đoạn. Các sự cố kỹ thuật sẽ được tiếp nhận và xử lý theo khả năng, mức độ ảnh hưởng và quy trình vận hành.",
  },
  {
    title: "14. Thay đổi điều khoản",
    content:
      "HTS có thể cập nhật điều khoản khi chức năng hoặc quy định pháp luật thay đổi. Nội dung cập nhật sẽ được công bố trên nền tảng. Người dùng nên kiểm tra định kỳ để nắm được các quy định mới.",
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
            Quy định quyền lợi, trách nhiệm và nguyên tắc sử dụng
            nền tảng HỌC TẬP SỐ dành cho người học, cộng đồng
            và đội ngũ quản trị.
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
              Học tập tích cực – Tôn trọng cộng đồng – Trung thực
              trong kiểm tra – Bảo vệ dữ liệu – Tuân thủ pháp luật.
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
              Đây là bản dự thảo điều khoản sử dụng phục vụ
              quá trình xây dựng HTS. Trước khi áp dụng chính thức,
              đơn vị quản lý cần rà soát, bổ sung thông tin pháp lý,
              quy trình khiếu nại, quy định thanh toán và các
              chính sách chuyên ngành có liên quan.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/chinh-sach-bao-mat"
              className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Chính sách bảo mật
            </Link>

            <Link
              href="/lien-he"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Liên hệ hỗ trợ
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Về trang chủ
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
