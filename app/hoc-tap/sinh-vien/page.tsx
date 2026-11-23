
import Link from "next/link";

const topics = [
  {
    icon: "🎓",
    title: "Kiến thức chuyên ngành",
    description:
      "Học tập kiến thức nền tảng, chuyên sâu và cập nhật kiến thức mới theo ngành đào tạo.",
  },
  {
    icon: "💻",
    title: "Công nghệ và kỹ năng số",
    description:
      "Phát triển năng lực sử dụng công nghệ, trí tuệ nhân tạo, dữ liệu và các công cụ số.",
  },
  {
    icon: "🌍",
    title: "Ngoại ngữ và hội nhập",
    description:
      "Rèn luyện ngoại ngữ, giao tiếp đa văn hóa và khả năng học tập trong môi trường quốc tế.",
  },
  {
    icon: "🔬",
    title: "Nghiên cứu khoa học",
    description:
      "Tìm hiểu phương pháp nghiên cứu, tư duy phản biện, sáng tạo và giải quyết vấn đề.",
  },
  {
    icon: "💼",
    title: "Kỹ năng nghề nghiệp",
    description:
      "Chuẩn bị kỹ năng làm việc, viết CV, phỏng vấn, quản lý thời gian và phát triển sự nghiệp.",
  },
  {
    icon: "🤝",
    title: "Kỹ năng mềm",
    description:
      "Rèn luyện giao tiếp, thuyết trình, làm việc nhóm, lãnh đạo và hợp tác.",
  },
  {
    icon: "🚀",
    title: "Khởi nghiệp và đổi mới sáng tạo",
    description:
      "Phát triển ý tưởng, tư duy kinh doanh, lập kế hoạch và xây dựng dự án khởi nghiệp.",
  },
  {
    icon: "📚",
    title: "Học tập suốt đời",
    description:
      "Xây dựng thói quen tự học, học trực tuyến và chủ động cập nhật tri thức.",
  },
];

export default function SinhVienHocTapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-indigo-900 to-blue-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Sinh viên học tập
          </h1>

          <p className="max-w-3xl text-base leading-8 text-blue-50 md:text-lg">
            Kết nối tri thức, phát triển tư duy, làm chủ công nghệ,
            nâng cao năng lực nghiên cứu và chuẩn bị hành trang nghề nghiệp
            cho tương lai.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dang-ky"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-800 hover:bg-blue-50"
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

          <p className="mt-4 text-sm text-blue-100">
            Nội dung dành cho sinh viên có tài khoản đăng ký và đăng nhập.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Các lĩnh vực học tập
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Hệ thống cung cấp các chủ đề học tập đa dạng, hỗ trợ sinh viên
            nâng cao kiến thức chuyên môn, kỹ năng thực hành và năng lực
            thích ứng với thị trường lao động.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Các hoạt động học tập
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="mb-2 font-bold text-indigo-800">
                Học trực tuyến
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                Tiếp cận bài giảng, tài liệu và khóa học phục vụ nhu cầu
                học tập mọi lúc, mọi nơi.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="mb-2 font-bold text-indigo-800">
                Kiểm tra và đánh giá
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                Tham gia bài kiểm tra, ôn tập kiến thức và theo dõi kết quả
                học tập theo quyền được cấp.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="mb-2 font-bold text-indigo-800">
                Cộng đồng sinh viên
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                Trao đổi kiến thức, chia sẻ kinh nghiệm và hợp tác trong
                các hoạt động học tập.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-indigo-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-900">
            Học hôm nay – Làm chủ tương lai
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-800">
            HỌC TẬP SỐ khuyến khích sinh viên chủ động học tập,
            nghiên cứu, sáng tạo và phát triển năng lực suốt đời.
          </p>

          <Link
            href="/dang-ky"
            className="mt-6 inline-block rounded-lg bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800"
          >
            Tham gia HỌC TẬP SỐ
          </Link>
        </div>
      </section>
    </main>
  );
}
