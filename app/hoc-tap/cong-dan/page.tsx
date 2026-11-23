
import Link from "next/link";

const learningTopics = [
  {
    title: "Kỹ năng số",
    description: "Sử dụng Internet, điện thoại thông minh và các dịch vụ số an toàn, hiệu quả.",
    icon: "💻",
  },
  {
    title: "Kiến thức pháp luật",
    description: "Tìm hiểu pháp luật, quyền và nghĩa vụ của công dân trong đời sống.",
    icon: "⚖️",
  },
  {
    title: "Sức khỏe và đời sống",
    description: "Bổ sung kiến thức chăm sóc sức khỏe, gia đình và cộng đồng.",
    icon: "❤️",
  },
  {
    title: "Khoa học và công nghệ",
    description: "Cập nhật kiến thức khoa học, công nghệ và những ứng dụng thiết thực.",
    icon: "🔬",
  },
  {
    title: "Kỹ năng nghề nghiệp",
    description: "Phát triển kỹ năng làm việc, giao tiếp và thích ứng với xã hội hiện đại.",
    icon: "🧰",
  },
  {
    title: "Văn hóa và xã hội",
    description: "Tìm hiểu lịch sử, văn hóa, môi trường và trách nhiệm cộng đồng.",
    icon: "🌱",
  },
];

export default function CongDanHocTapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-100">
            HỌC TẬP SỐ – HTS
          </p>
          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Công dân học tập
          </h1>
          <p className="max-w-3xl text-base leading-8 text-emerald-50 md:text-lg">
            Nền tảng học tập mở dành cho mọi công dân. Kết nối tri thức,
            phát triển kỹ năng, nâng cao hiểu biết và xây dựng xã hội học tập
            suốt đời.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#chu-de-hoc-tap"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-50"
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
            Học tập mở dành cho mọi người
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Công dân có thể chủ động lựa chọn chủ đề, học theo nhu cầu và
            thời gian phù hợp. Các nội dung được định hướng thiết thực,
            dễ hiểu và có thể ứng dụng trong cuộc sống.
          </p>
        </div>

        <div
          id="chu-de-hoc-tap"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {learningTopics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 text-4xl" aria-hidden="true">
                {topic.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {topic.title}
              </h3>
              <p className="leading-7 text-slate-600">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Nguyên tắc tham gia học tập
          </h2>
          <ul className="space-y-3 leading-7 text-slate-700">
            <li>• Truy cập và tìm hiểu nội dung học tập mở miễn phí.</li>
            <li>• Chủ động lựa chọn kiến thức phù hợp với nhu cầu cá nhân.</li>
            <li>• Tôn trọng bản quyền, chia sẻ thông tin có trách nhiệm.</li>
            <li>• Bảo vệ dữ liệu cá nhân và thực hiện an toàn trên môi trường số.</li>
            <li>• Khuyến khích học tập suốt đời và lan tỏa tri thức trong cộng đồng.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-emerald-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-emerald-900">
            Học tập suốt đời – Phát triển bản thân
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-800">
            HỌC TẬP SỐ đồng hành cùng công dân trong hành trình tiếp cận
            tri thức, nâng cao năng lực và đóng góp tích cực cho xã hội.
          </p>
        </div>
      </section>
    </main>
  );
}
