
import Link from "next/link";

const subjects = [
  {
    icon: "📐",
    title: "Toán học",
    description:
      "Rèn luyện tư duy logic, số học, đại số, hình học, thống kê và giải quyết bài toán thực tế.",
  },
  {
    icon: "📖",
    title: "Ngữ văn",
    description:
      "Phát triển kỹ năng đọc hiểu, cảm thụ văn học, viết văn, diễn đạt và trình bày suy nghĩ.",
  },
  {
    icon: "🌍",
    title: "Tiếng Anh",
    description:
      "Học từ vựng, ngữ pháp, luyện nghe, nói, đọc, viết và giao tiếp cơ bản.",
  },
  {
    icon: "⚛️",
    title: "Khoa học tự nhiên",
    description:
      "Tìm hiểu vật lý, hóa học, sinh học và vận dụng kiến thức khoa học vào cuộc sống.",
  },
  {
    icon: "🗺️",
    title: "Lịch sử và Địa lý",
    description:
      "Khám phá lịch sử dân tộc, lịch sử thế giới, địa lý tự nhiên và đời sống xã hội.",
  },
  {
    icon: "💻",
    title: "Tin học và công nghệ",
    description:
      "Làm quen với máy tính, Internet an toàn, tư duy thuật toán và kỹ năng số.",
  },
  {
    icon: "⚖️",
    title: "Giáo dục công dân",
    description:
      "Tìm hiểu đạo đức, pháp luật, quyền và nghĩa vụ, trách nhiệm với gia đình và xã hội.",
  },
  {
    icon: "🎨",
    title: "Nghệ thuật",
    description:
      "Phát triển khả năng cảm thụ âm nhạc, mỹ thuật, sáng tạo và thể hiện bản thân.",
  },
  {
    icon: "🏃",
    title: "Giáo dục thể chất",
    description:
      "Rèn luyện thể lực, kỹ năng vận động, sức khỏe và lối sống tích cực.",
  },
  {
    icon: "🛠️",
    title: "Công nghệ và hướng nghiệp",
    description:
      "Tìm hiểu kỹ thuật, ứng dụng công nghệ và khám phá sở thích nghề nghiệp.",
  },
];

const activities = [
  {
    title: "Học theo từng khối lớp",
    description:
      "Tổ chức nội dung phù hợp với chương trình học lớp 6, lớp 7, lớp 8 và lớp 9.",
  },
  {
    title: "Luyện tập và củng cố",
    description:
      "Thực hành câu hỏi, bài tập, đề ôn tập và kiểm tra kiến thức sau mỗi chủ đề.",
  },
  {
    title: "Phát triển kỹ năng tự học",
    description:
      "Xây dựng thói quen đọc sách, tìm kiếm thông tin và chủ động giải quyết vấn đề.",
  },
  {
    title: "Chuẩn bị chuyển cấp",
    description:
      "Ôn tập kiến thức nền tảng và chuẩn bị cho kỳ thi tuyển sinh vào lớp 10.",
  },
];

export default function THCSHocTapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-emerald-950 to-teal-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-100">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Học sinh trung học cơ sở
          </h1>

          <p className="max-w-3xl text-base leading-8 text-emerald-50 md:text-lg">
            Xây dựng nền tảng kiến thức vững chắc, rèn luyện tư duy,
            hình thành kỹ năng tự học, phát triển nhân cách và
            chuẩn bị tốt cho giai đoạn học tập tiếp theo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dang-ky"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 hover:bg-emerald-50"
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

          <p className="mt-4 text-sm text-emerald-100">
            Dành cho học sinh lớp 6, lớp 7, lớp 8 và lớp 9 có tài khoản đăng ký.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Các môn học và lĩnh vực kiến thức
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Hệ thống học tập hỗ trợ học sinh tiếp cận kiến thức theo
            từng môn học, chủ đề và khối lớp, kết hợp học lý thuyết
            với thực hành và vận dụng vào đời sống.
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
            Hoạt động học tập và rèn luyện
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {activities.map((activity, index) => (
              <article
                key={activity.title}
                className="rounded-xl border border-slate-200 p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                    {index + 1}
                  </span>

                  <h3 className="font-bold text-emerald-900">
                    {activity.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl bg-emerald-50 p-8">
          <h2 className="text-2xl font-bold text-emerald-950">
            Mục tiêu học tập
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-emerald-900">
            <li>✓ Nắm vững kiến thức cơ bản của các môn học.</li>
            <li>✓ Hình thành tư duy độc lập và khả năng sáng tạo.</li>
            <li>✓ Biết sử dụng công nghệ và Internet an toàn.</li>
            <li>✓ Phát triển kỹ năng giao tiếp và làm việc nhóm.</li>
            <li>✓ Có định hướng học tập và nghề nghiệp phù hợp.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/dang-ky"
              className="inline-block rounded-lg bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-900"
            >
              Tham gia HỌC TẬP SỐ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
