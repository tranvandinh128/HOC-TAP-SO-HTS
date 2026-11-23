
import Link from "next/link";

const sections = [
  {
    title: "1. Mục đích của chính sách",
    content:
      "Chính sách này quy định nguyên tắc thu thập, sử dụng, lưu trữ, bảo vệ và xử lý thông tin của người dùng khi truy cập và sử dụng nền tảng HỌC TẬP SỐ (HTS).",
  },
  {
    title: "2. Thông tin có thể được thu thập",
    content:
      "Tùy theo chức năng được sử dụng, HTS có thể xử lý thông tin tài khoản, họ tên, địa chỉ email, nhóm học tập đã đăng ký, tiến độ học tập, kết quả kiểm tra, lịch sử hoạt động và nội dung yêu cầu hỗ trợ. Chỉ thu thập thông tin cần thiết cho mục đích đã thông báo.",
  },
  {
    title: "3. Mục đích sử dụng thông tin",
    content:
      "Thông tin được sử dụng để xác thực tài khoản, quản lý nhóm học tập, cung cấp bài giảng, theo dõi tiến độ, tổ chức kiểm tra, hỗ trợ người dùng, bảo đảm an toàn hệ thống và thực hiện các nghĩa vụ pháp lý có liên quan.",
  },
  {
    title: "4. Lưu trữ và bảo vệ dữ liệu",
    content:
      "HTS áp dụng các biện pháp kỹ thuật và tổ chức phù hợp nhằm hạn chế truy cập trái phép, mất mát, thay đổi hoặc tiết lộ dữ liệu. Quyền truy cập thông tin được phân theo vai trò và phạm vi nhiệm vụ. Dữ liệu chỉ được lưu trữ trong thời gian cần thiết hoặc theo quy định pháp luật.",
  },
  {
    title: "5. Phân quyền truy cập",
    content:
      "Người dùng được truy cập thông tin thuộc tài khoản của mình theo chức năng được cấp. Quản trị viên lĩnh vực chỉ được xử lý dữ liệu thuộc lĩnh vực được giao. Quản trị viên cấp cao thực hiện việc phân quyền, phê duyệt và giám sát theo quy định của hệ thống. Mọi thao tác quản trị quan trọng cần được ghi nhận để kiểm tra.",
  },
  {
    title: "6. Điểm danh và dữ liệu nhận diện",
    content:
      "Nếu triển khai điểm danh bằng nhận diện khuôn mặt hoặc công nghệ sinh trắc học, HTS phải thông báo rõ mục đích, phạm vi, loại dữ liệu, thời gian lưu trữ và cơ sở xử lý; đồng thời đáp ứng yêu cầu pháp luật và có biện pháp bảo vệ phù hợp. Việc nhận diện thất bại cần được kiểm tra thủ công, không tự động kết luận người học vắng mặt hoặc áp dụng hình thức xử lý.",
  },
  {
    title: "7. Chia sẻ thông tin",
    content:
      "HTS không tùy tiện mua bán hoặc công khai dữ liệu cá nhân. Thông tin chỉ được chia sẻ khi có căn cứ phù hợp, có sự đồng ý khi pháp luật yêu cầu, phục vụ vận hành hệ thống với đơn vị xử lý dữ liệu được kiểm soát hoặc theo yêu cầu hợp pháp của cơ quan có thẩm quyền.",
  },
  {
    title: "8. Trí tuệ nhân tạo và nội dung học tập",
    content:
      "Khi sử dụng công cụ trí tuệ nhân tạo, HTS chỉ cung cấp dữ liệu cần thiết cho chức năng tương ứng và phải có biện pháp hạn chế thông tin cá nhân nhạy cảm. Nội dung do AI tạo ra cần được người có thẩm quyền kiểm tra trước khi công bố. AI không được tự ý công bố, sửa hoặc xóa nội dung đã xuất bản.",
  },
  {
    title: "9. Bảo vệ tài khoản và ví Pi",
    content:
      "Người dùng có trách nhiệm bảo vệ mật khẩu và thông tin xác thực của mình. HTS không yêu cầu người dùng cung cấp mật khẩu ví Pi, cụm mật khẩu ví (passphrase), mã OTP hoặc khóa bí mật. Những thông tin này không được đưa vào biểu mẫu, cơ sở dữ liệu, nhật ký hệ thống hoặc nội dung gửi cho AI.",
  },
  {
    title: "10. Quyền của người dùng",
    content:
      "Người dùng có thể yêu cầu xem, cập nhật, điều chỉnh hoặc thực hiện các quyền khác đối với dữ liệu cá nhân theo quy định pháp luật. Các yêu cầu được tiếp nhận và xử lý thông qua kênh liên hệ chính thức của HTS.",
  },
  {
    title: "11. Cookie và dữ liệu kỹ thuật",
    content:
      "HTS có thể sử dụng cookie hoặc công nghệ tương tự để duy trì phiên đăng nhập, ghi nhớ lựa chọn và cải thiện trải nghiệm. Người dùng có thể điều chỉnh cookie trong trình duyệt, tuy nhiên một số chức năng có thể bị ảnh hưởng.",
  },
  {
    title: "12. Thay đổi chính sách",
    content:
      "Chính sách có thể được cập nhật khi hệ thống bổ sung chức năng hoặc khi quy định pháp luật thay đổi. Phiên bản cập nhật sẽ được công bố trên trang này cùng thời điểm áp dụng.",
  },
];

export default function ChinhSachBaoMatPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            CHÍNH SÁCH BẢO MẬT
          </h1>
          <p className="mt-4 max-w-3xl leading-8 text-blue-50">
            Cam kết bảo vệ thông tin cá nhân, dữ liệu học tập
            và quyền riêng tư của người dùng trong quá trình
            sử dụng nền tảng HỌC TẬP SỐ.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">
              Nguyên tắc bảo vệ dữ liệu
            </h2>
            <p className="mt-2 text-sm leading-7 text-blue-900">
              Tôn trọng quyền riêng tư, minh bạch về mục đích
              xử lý, giới hạn quyền truy cập và bảo vệ dữ liệu
              trong suốt quá trình sử dụng HTS.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-slate-100 pb-6 last:border-0"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  {section.title}
                </h2>
                <p className="mt-3 leading-8 text-slate-600">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">
              Lưu ý về triển khai
            </h2>
            <p className="mt-2 text-sm leading-7 text-amber-900">
              Đây là nội dung chính sách dự thảo cho dự án HTS.
              Trước khi vận hành chính thức, đơn vị quản lý cần
              rà soát quy định pháp luật hiện hành, xác định đơn
              vị chịu trách nhiệm xử lý dữ liệu, thời hạn lưu trữ,
              quy trình tiếp nhận yêu cầu và các nhà cung cấp
              dịch vụ có quyền truy cập dữ liệu.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lien-he"
              className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Liên hệ về quyền riêng tư
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
