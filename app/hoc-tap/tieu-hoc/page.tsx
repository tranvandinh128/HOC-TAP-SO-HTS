
import Link from "next/link";

const subjects = [
  {
    icon: "🔢",
    title: "Toán học",
    description:
      "Làm quen với các con số, phép tính, hình học, đo lường và giải quyết những bài toán gần gũi với cuộc sống.",
  },
  {
    icon: "📖",
    title: "Tiếng Việt",
    description:
      "Luyện đọc, viết, chính tả, tập làm văn, mở rộng vốn từ và hình thành kỹ năng sử dụng tiếng Việt.",
  },
  {
    icon: "🌍",
    title: "Tiếng Anh",
    description:
      "Học từ vựng, mẫu câu, phát âm, nghe và giao tiếp tiếng Anh thông qua hình ảnh và trò chơi.",
  },
  {
    icon: "🌱",
    title: "Tự nhiên và Xã hội",
    description:
      "Khám phá con người, gia đình, trường học, thiên nhiên, môi trường và cuộc sống xung quanh.",
  },
  {
    icon: "💻",
    title: "Tin học và công nghệ",
    description:
      "Làm quen với máy tính, thiết bị số, kỹ năng sử dụng Internet an toàn và tư duy công nghệ.",
  },
  {
    icon: "🎨",
    title: "Nghệ thuật",
    description:
      "Phát triển năng khiếu thông qua âm nhạc, mỹ thuật, hoạt động sáng tạo và trải nghiệm.",
  },
  {
    icon: "🏃",
    title: "Giáo dục thể chất",
    description:
      "Rèn luyện sức khỏe, vận động, thể lực và hình thành thói quen sinh hoạt lành mạnh.",
  },
  {
    icon: "❤️",
    title: "Đạo đức và kỹ năng sống",
    description:
      "Học cách lễ phép, trung thực, tự lập, yêu thương, chia sẻ và có trách nhiệm.",
  },
  {
    icon: "🛠️",
    title: "Hoạt động trải nghiệm",
    description:
      "Tham gia hoạt động thực hành, khám phá, làm việc nhóm và vận dụng kiến thức vào cuộc sống.",
  },
];

const skills = [
  {
    title: "Kỹ năng tự học",
    description:
      "Hình thành thói quen đọc sách, chuẩn bị bài và chủ động hoàn thành nhiệm vụ học tập.",
  },
  {
    title: "Kỹ năng giao tiếp",
    description:
      "Biết lắng nghe, diễn đạt suy nghĩ, hợp tác và ứng xử phù hợp với mọi người.",
  },
  {
    title: "Kỹ năng an toàn",
    description:
      "Nhận biết tình huống nguy hiểm, bảo vệ bản thân và sử dụng Internet an toàn.",
  },
  {
    title: "Tư duy sáng tạo",
    description:
      "Khuyến khích đặt câu hỏi, khám phá, thử nghiệm và tìm cách giải quyết vấn đề.",
  },
];

export default function TieuHocPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-100">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Học sinh tiểu học
          </h1>

          <p className="max-w-3xl text-base leading-8 text-orange-50 md:text-lg">
            Khơi dậy niềm yêu thích học tập, xây dựng nền tảng kiến thức,
            phát triển kỹ năng, nuôi dưỡng nhân cách và tạo môi trường
            học tập vui vẻ, an toàn cho các em.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dang-ky"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-orange-800 hover:bg-orange-50"
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

          <p className="mt-4 text-sm text-orange-100">
            Dành cho học sinh lớp 1 đến lớp 5 có tài khoản đăng ký.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Các môn học và lĩnh vực kiến thức
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Nội dung được xây dựng phù hợp với lứa tuổi tiểu học,
            giúp các em học thông qua hình ảnh, câu chuyện, bài tập,
            trò chơi và hoạt động trải nghiệm.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article
              key={subject.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 text-4xl" aria-hidden="true">
                {subject.icon}
              </div>

              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {subject.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600">
                {subject.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Phát triển kỹ năng cho học sinh
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((skill, index) => (
              <article
                key={skill.title}
                className="rounded-xl border border-slate-200 p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-800">
                    {index + 1}
                  </span>

                  <h3 className="font-bold text-orange-900">
                    {skill.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  {skill.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-orange-50 p-8">
          <h2 className="text-2xl font-bold text-orange-950">
            Mục tiêu giáo dục
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-orange-900">
            <li>✓ Hình thành nền tảng kiến thức cơ bản vững chắc.</li>
            <li>✓ Nuôi dưỡng tình yêu học tập và tinh thần ham hiểu biết.</li>
            <li>✓ Rèn luyện đạo đức, ý thức kỷ luật và lòng nhân ái.</li>
            <li>✓ Phát triển thể chất, trí tuệ và năng lực sáng tạo.</li>
            <li>✓ Biết sử dụng công nghệ và Internet an toàn.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/dang-ky"
              className="inline-block rounded-lg bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800"
            >
              Tham gia HỌC TẬP SỐ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
