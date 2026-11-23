
import Link from "next/link";

const topics = [
  {
    icon: "🛠️",
    title: "Kỹ năng nghề nghiệp",
    description:
      "Bổ sung kiến thức chuyên môn, nâng cao tay nghề và khả năng thích ứng với công việc.",
  },
  {
    icon: "💻",
    title: "Kỹ năng số và công nghệ",
    description:
      "Sử dụng máy tính, điện thoại thông minh, Internet và các công cụ số trong lao động.",
  },
  {
    icon: "🏭",
    title: "An toàn và vệ sinh lao động",
    description:
      "Nhận biết nguy cơ, phòng tránh tai nạn và xây dựng môi trường làm việc an toàn.",
  },
  {
    icon: "📈",
    title: "Năng suất và chất lượng",
    description:
      "Tìm hiểu phương pháp làm việc khoa học, cải tiến quy trình và nâng cao hiệu quả lao động.",
  },
  {
    icon: "⚖️",
    title: "Pháp luật lao động",
    description:
      "Tìm hiểu quyền, nghĩa vụ của người lao động và các quy định liên quan đến việc làm.",
  },
  {
    icon: "🤝",
    title: "Văn hóa doanh nghiệp",
    description:
      "Rèn luyện tác phong công nghiệp, kỹ năng giao tiếp, hợp tác và làm việc nhóm.",
  },
  {
    icon: "💚",
    title: "Sức khỏe và đời sống",
    description:
      "Chăm sóc sức khỏe thể chất, tinh thần và cân bằng giữa công việc với gia đình.",
  },
  {
    icon: "🚀",
    title: "Khởi nghiệp và phát triển bản thân",
    description:
      "Phát triển tư duy sáng tạo, kỹ năng quản lý tài chính và định hướng nghề nghiệp.",
  },
];

export default function CongNhanHocTapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-blue-800 to-cyan-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Công nhân học tập
          </h1>

          <p className="max-w-3xl text-base leading-8 text-blue-50 md:text-lg">
            Không ngừng học tập, nâng cao tay nghề, làm chủ công nghệ,
            cải thiện năng suất lao động và xây dựng đội ngũ công nhân
            có kiến thức, kỹ năng trong thời đại số.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#chu-de-hoc-tap"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 hover:bg-blue-50"
            >
              Khám phá nội dung học tập
            </a>

            <Link
              href="/"
              className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Nội dung học tập dành cho công nhân
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Các chủ đề được xây dựng nhằm hỗ trợ người lao động học tập
            thường xuyên, nâng cao trình độ chuyên môn, kỹ năng nghề
            nghiệp và khả năng ứng dụng công nghệ vào thực tiễn.
          </p>
        </div>

        <div
          id="chu-de-hoc-tap"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {topics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 text-4xl" aria-hidden="true">
                {topic.icon}
              </div>

              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {topic.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Quyền lợi và nguyên tắc học tập
          </h2>

          <ul className="space-y-3 leading-7 text-slate-700">
            <li>
              • Được truy cập các nội dung học tập mở miễn phí.
            </li>
            <li>
              • Chủ động lựa chọn chủ đề phù hợp với công việc và nhu cầu.
            </li>
            <li>
              • Có thể học tập ngoài giờ làm việc, phù hợp với điều kiện cá nhân.
            </li>
            <li>
              • Chia sẻ kinh nghiệm, kiến thức và sáng kiến cải tiến trong lao động.
            </li>
            <li>
              • Tôn trọng bản quyền, bảo vệ thông tin cá nhân và tuân thủ quy định
              của nền tảng.
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900">
            Giỏi nghề – Vững kỹ năng – Làm chủ công nghệ
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-800">
            HỌC TẬP SỐ đồng hành cùng người lao động trên hành trình
            học tập suốt đời, nâng cao chất lượng nguồn nhân lực và
            xây dựng môi trường lao động hiện đại.
          </p>
        </div>
      </section>
    </main>
  );
}
