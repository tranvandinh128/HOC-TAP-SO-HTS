
import Link from "next/link";

const learningGroups = [
  {
    number: "01",
    name: "Công dân học tập",
    description: "Học tập suốt đời, nâng cao kiến thức và kỹ năng phục vụ cuộc sống.",
    access: "Truy cập mở, không bắt buộc tài khoản",
  },
  {
    number: "02",
    name: "Công nhân học tập",
    description: "Bổ sung kiến thức nghề nghiệp, kỹ năng lao động và ứng dụng công nghệ.",
    access: "Truy cập mở, không bắt buộc tài khoản",
  },
  {
    number: "03",
    name: "Sinh viên học tập",
    description: "Hỗ trợ học tập, nghiên cứu, kỹ năng nghề nghiệp và phát triển bản thân.",
    access: "Đăng ký tài khoản",
  },
  {
    number: "04",
    name: "Học sinh THPT",
    description: "Củng cố kiến thức, ôn tập, kiểm tra và định hướng nghề nghiệp.",
    access: "Đăng ký tài khoản",
  },
  {
    number: "05",
    name: "Học sinh THCS",
    description: "Phát triển kiến thức nền tảng, tư duy và kỹ năng tự học.",
    access: "Đăng ký tài khoản",
  },
  {
    number: "06",
    name: "Học sinh tiểu học",
    description: "Học tập qua nội dung trực quan, bài tập và hoạt động tương tác phù hợp.",
    access: "Đăng ký tài khoản",
  },
  {
    number: "07",
    name: "Lực lượng vũ trang",
    description: "Phục vụ học tập, bồi dưỡng kiến thức và kỹ năng trong Quân đội – Công an.",
    access: "Đăng ký tài khoản",
  },
];

const principles = [
  "Lấy người học làm trung tâm, tạo cơ hội học tập bình đẳng.",
  "Nội dung học tập phù hợp với từng đối tượng và lĩnh vực.",
  "Ứng dụng công nghệ số và trí tuệ nhân tạo có kiểm soát.",
  "Tôn trọng quyền riêng tư, bảo vệ dữ liệu cá nhân.",
  "Thông tin cần có nguồn tham khảo và được kiểm tra trước khi công bố.",
  "Quản trị theo đúng phạm vi phân quyền và trách nhiệm.",
];

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            NỀN TẢNG HỌC TẬP SỐ
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            GIỚI THIỆU HỌC TẬP SỐ
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-50 md:text-lg">
            Kết nối tri thức – Phát triển kỹ năng – Thúc đẩy học tập suốt đời.
            HỌC TẬP SỐ hướng tới xây dựng môi trường học tập trực tuyến,
            hỗ trợ nhiều nhóm đối tượng tiếp cận kiến thức và phát triển
            năng lực trong thời đại chuyển đổi số.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
            >
              Khám phá nền tảng
            </Link>

            <Link
              href="/dang-ky"
              className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Đăng ký học tập
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900">
              Tầm nhìn
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Xây dựng nền tảng học tập số thân thiện, thiết thực và
              có khả năng mở rộng, góp phần hình thành xã hội học tập,
              thúc đẩy học tập suốt đời và phổ cập kiến thức số.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900">
              Sứ mệnh
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Kết nối người học với tri thức, tài liệu, hoạt động
              tương tác và công cụ hỗ trợ học tập; tạo điều kiện để
              mỗi người chủ động nâng cao kiến thức và kỹ năng.
            </p>
          </div>
        </div>

        <section>
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              HỆ THỐNG HỌC TẬP
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              07 lĩnh vực học tập
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Nền tảng được tổ chức theo từng nhóm đối tượng.
              Một tài khoản có thể đăng ký nhiều lĩnh vực học tập
              phù hợp với nhu cầu của người sử dụng.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {learningGroups.map((group) => (
              <article
                key={group.number}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-sm font-bold text-blue-700">
                  LĨNH VỰC {group.number}
                </span>

                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {group.name}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-7 text-slate-600">
                  {group.description}
                </p>

                <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs font-medium leading-5 text-blue-800">
                  {group.access}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-blue-950 p-7 text-white md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Định hướng phát triển
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              ["Học liệu số", "Xây dựng kho bài giảng, tài liệu và nội dung học tập."],
              ["Kiểm tra và đánh giá", "Hỗ trợ bài tập, câu hỏi, đề kiểm tra và theo dõi kết quả."],
              ["Trí tuệ nhân tạo", "Hỗ trợ nghiên cứu, biên soạn và cá nhân hóa trải nghiệm học tập."],
              ["Cộng đồng học tập", "Tăng cường giao lưu, chia sẻ kiến thức và hoạt động tương tác."],
              ["Quản trị hệ thống", "Phân quyền quản lý theo lĩnh vực, bảo đảm trách nhiệm và minh bạch."],
              ["Chuyển đổi số", "Từng bước mở rộng các tiện ích và dịch vụ học tập trực tuyến."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl bg-white/10 p-5">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-blue-100">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Nguyên tắc hoạt động
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <span className="font-bold text-green-700">✓</span>
                <p className="text-sm leading-7 text-slate-700">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-7 text-center">
          <h2 className="text-2xl font-bold text-blue-950">
            Cùng xây dựng cộng đồng học tập số
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-700">
            Mỗi người học là một thành viên của cộng đồng tri thức.
            Hãy chủ động học tập, chia sẻ kiến thức và cùng phát triển
            một môi trường học tập tích cực, an toàn và hữu ích.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Trở về trang chủ HTS
          </Link>
        </section>

        <p className="text-center text-xs leading-6 text-slate-500">
          HỌC TẬP SỐ – Kết nối tri thức, phát triển cộng đồng,
          thúc đẩy học tập suốt đời.
        </p>
      </section>
    </main>
  );
}
