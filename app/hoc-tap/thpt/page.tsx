
import Link from "next/link";

const subjects = [
  {
    icon: "📐",
    title: "Toán học",
    description:
      "Đại số, hình học, giải tích, xác suất, thống kê và vận dụng toán học vào thực tiễn.",
  },
  {
    icon: "⚛️",
    title: "Vật lý",
    description:
      "Cơ học, nhiệt học, điện học, quang học, vật lý hiện đại và các bài tập vận dụng.",
  },
  {
    icon: "🧪",
    title: "Hóa học",
    description:
      "Kiến thức hóa học vô cơ, hữu cơ, phản ứng hóa học và thực hành an toàn.",
  },
  {
    icon: "🧬",
    title: "Sinh học",
    description:
      "Di truyền học, tế bào, sinh thái học, cơ thể sống và kiến thức khoa học tự nhiên.",
  },
  {
    icon: "📖",
    title: "Ngữ văn",
    description:
      "Đọc hiểu, nghị luận, cảm thụ văn học, kỹ năng viết và trình bày quan điểm.",
  },
  {
    icon: "🌐",
    title: "Ngoại ngữ",
    description:
      "Từ vựng, ngữ pháp, nghe, nói, đọc, viết và luyện tập giao tiếp.",
  },
  {
    icon: "🗺️",
    title: "Lịch sử và Địa lý",
    description:
      "Lịch sử dân tộc, lịch sử thế giới, địa lý tự nhiên, kinh tế và xã hội.",
  },
  {
    icon: "💻",
    title: "Tin học và công nghệ",
    description:
      "Tư duy thuật toán, lập trình cơ bản, kỹ năng số và ứng dụng công nghệ.",
  },
  {
    icon: "⚖️",
    title: "Giáo dục kinh tế và pháp luật",
    description:
      "Kiến thức kinh tế, pháp luật, quyền và nghĩa vụ công dân, trách nhiệm xã hội.",
  },
  {
    icon: "🏃",
    title: "Giáo dục thể chất",
    description:
      "Rèn luyện sức khỏe, thể lực, kỹ năng vận động và lối sống lành mạnh.",
  },
];

const activities = [
  {
    title: "Ôn tập kiến thức",
    description:
      "Hệ thống hóa kiến thức theo môn học, chủ đề và từng khối lớp 10, 11, 12.",
  },
  {
    title: "Luyện đề và kiểm tra",
    description:
      "Thực hành câu hỏi trắc nghiệm, tự luận và đề ôn tập theo cấu trúc phù hợp.",
  },
  {
    title: "Định hướng nghề nghiệp",
    description:
      "Tìm hiểu ngành nghề, năng lực bản thân và lựa chọn hướng học tập sau THPT.",
  },
  {
    title: "Chuẩn bị kỳ thi tốt nghiệp",
    description:
      "Lập kế hoạch ôn tập, luyện kỹ năng làm bài và theo dõi kết quả học tập.",
  },
];

export default function THPTHocTapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-r from-blue-950 to-cyan-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-100">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            Học sinh trung học phổ thông
          </h1>

          <p className="max-w-3xl text-base leading-8 text-blue-50 md:text-lg">
            Cùng học tập, rèn luyện tư duy, phát triển năng lực,
            nâng cao kỹ năng số và chuẩn bị hành trang cho kỳ thi
            tốt nghiệp THPT cũng như tương lai nghề nghiệp.
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

          <p className="mt-4 text-sm text-blue-100">
            Dành cho học sinh lớp 10, lớp 11 và lớp 12 có tài khoản đăng ký.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Các môn học và lĩnh vực kiến thức
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Nội dung học tập được tổ chức theo môn học, khối lớp và
            chủ đề. Học sinh có thể sử dụng tài liệu, bài giảng và
            bài luyện tập phù hợp với nhu cầu của mình.
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                    {index + 1}
                  </span>

                  <h3 className="font-bold text-blue-900">
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
        <div className="mx-auto max-w-6xl rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Mục tiêu học tập
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-blue-900">
            <li>✓ Chủ động học tập và củng cố kiến thức các môn học.</li>
            <li>✓ Phát triển tư duy độc lập và khả năng giải quyết vấn đề.</li>
            <li>✓ Rèn luyện kỹ năng số và kỹ năng tự học.</li>
            <li>✓ Chuẩn bị tốt cho kỳ thi và lựa chọn nghề nghiệp tương lai.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/dang-ky"
              className="inline-block rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900"
            >
              Tham gia HỌC TẬP SỐ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
