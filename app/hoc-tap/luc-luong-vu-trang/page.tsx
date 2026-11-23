
import Link from "next/link";

const learningAreas = [
  {
    icon: "⚖️",
    title: "Pháp luật và kỷ luật",
    description:
      "Tìm hiểu kiến thức pháp luật, quy định, điều lệnh, kỷ luật và trách nhiệm của cán bộ, chiến sĩ trong thực hiện nhiệm vụ.",
  },
  {
    icon: "🇻🇳",
    title: "Quốc phòng và an ninh",
    description:
      "Bồi dưỡng kiến thức quốc phòng, an ninh, truyền thống yêu nước, ý thức bảo vệ Tổ quốc và trách nhiệm công dân.",
  },
  {
    icon: "📚",
    title: "Chính trị và truyền thống",
    description:
      "Tìm hiểu lịch sử dân tộc, truyền thống Quân đội nhân dân Việt Nam, Công an nhân dân và phẩm chất người chiến sĩ.",
  },
  {
    icon: "💻",
    title: "Công nghệ và chuyển đổi số",
    description:
      "Nâng cao kỹ năng sử dụng công nghệ số, khai thác thông tin, bảo vệ dữ liệu và nhận diện nguy cơ trên không gian mạng.",
  },
  {
    icon: "🏃",
    title: "Thể chất và sức khỏe",
    description:
      "Rèn luyện thể lực, sức bền, tác phong, tinh thần tự giác và xây dựng lối sống khoa học.",
  },
  {
    icon: "🧭",
    title: "Kỹ năng công tác",
    description:
      "Bồi dưỡng kỹ năng giao tiếp, làm việc nhóm, quản lý thời gian, tổ chức công việc và xử lý tình huống phù hợp.",
  },
  {
    icon: "🌐",
    title: "Ngoại ngữ và kiến thức xã hội",
    description:
      "Phát triển năng lực ngoại ngữ, hiểu biết xã hội, kiến thức khoa học và khả năng học tập suốt đời.",
  },
  {
    icon: "🛡️",
    title: "An toàn thông tin",
    description:
      "Nâng cao nhận thức về an toàn thông tin, bảo vệ tài khoản, phòng tránh lừa đảo và tuân thủ quy định bảo mật.",
  },
];

const objectives = [
  "Nâng cao trình độ chuyên môn, nghiệp vụ và kiến thức pháp luật.",
  "Xây dựng ý thức tổ chức kỷ luật, tinh thần trách nhiệm và tác phong chính quy.",
  "Bồi dưỡng bản lĩnh chính trị, đạo đức và truyền thống của lực lượng vũ trang.",
  "Phát triển năng lực tự học, nghiên cứu và ứng dụng công nghệ số.",
  "Rèn luyện sức khỏe, kỹ năng phối hợp và tinh thần phục vụ nhân dân.",
];

export default function LucLuongVuTrangPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Lực lượng vũ trang
          </h1>

          <p className="mb-2 text-lg font-semibold text-blue-200">
            Quân đội – Công an
          </p>

          <p className="max-w-3xl leading-8 text-slate-200">
            Xây dựng môi trường học tập, bồi dưỡng kiến thức, nâng cao
            trình độ chuyên môn, nghiệp vụ, ý thức kỷ luật, bản lĩnh
            chính trị và năng lực ứng dụng công nghệ số cho cán bộ,
            chiến sĩ.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dang-ky"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
            >
              Đăng ký học tập
            </Link>

            <Link
              href="/dang-nhap"
              className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Đăng nhập
            </Link>
          </div>

          <p className="mt-4 text-sm text-blue-200">
            Dành cho người học thuộc nhóm Lực lượng vũ trang có tài khoản
            được đăng ký và xác thực theo quy định của hệ thống.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Các lĩnh vực học tập
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Nội dung học tập được tổ chức theo lĩnh vực, cấp độ và
            đối tượng phù hợp. Việc triển khai chương trình cụ thể
            phải tuân thủ quy định của cơ quan, đơn vị quản lý.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {learningAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 text-4xl" aria-hidden="true">
                {area.icon}
              </div>

              <h3 className="mb-3 font-bold text-slate-900">
                {area.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Mục tiêu học tập và rèn luyện
          </h2>

          <div className="rounded-2xl border border-slate-200 p-6">
            <ul className="space-y-4">
              {objectives.map((objective, index) => (
                <li
                  key={objective}
                  className="flex items-start gap-3 leading-7 text-slate-700"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-900">
                    {index + 1}
                  </span>

                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-blue-950 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Nguyên tắc tổ chức học tập
          </h2>

          <div className="mt-5 space-y-3 leading-7 text-blue-100">
            <p>
              • Nội dung học tập phù hợp với chức năng, nhiệm vụ và
              đối tượng của từng đơn vị.
            </p>
            <p>
              • Không đăng tải tài liệu mật, thông tin nghiệp vụ,
              dữ liệu cá nhân hoặc nội dung chưa được phép công khai.
            </p>
            <p>
              • Việc kiểm tra, đánh giá và quản lý kết quả học tập
              thực hiện theo phân quyền được phê duyệt.
            </p>
            <p>
              • Khuyến khích tự học, học tập thường xuyên và chia sẻ
              kiến thức phù hợp với quy định của đơn vị.
            </p>
          </div>

          <Link
            href="/dang-ky"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-950 hover:bg-blue-50"
          >
            Tham gia HỌC TẬP SỐ
          </Link>
        </div>
      </section>
    </main>
  );
}
