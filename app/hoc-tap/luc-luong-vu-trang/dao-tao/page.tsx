
import Link from "next/link";

const programs = [
  {
    icon: "🎓",
    title: "Đào tạo cơ bản",
    description:
      "Các chương trình trang bị kiến thức nền tảng, kỹ năng học tập và kiến thức cần thiết theo vị trí công tác.",
    items: [
      "Kiến thức cơ bản",
      "Phương pháp học tập",
      "Kỹ năng công tác",
    ],
  },
  {
    icon: "📘",
    title: "Đào tạo chuyên môn",
    description:
      "Các chương trình nâng cao trình độ chuyên môn, nghiệp vụ theo kế hoạch được phê duyệt.",
    items: [
      "Kiến thức chuyên ngành",
      "Bồi dưỡng nghiệp vụ",
      "Cập nhật kiến thức mới",
    ],
  },
  {
    icon: "💻",
    title: "Đào tạo trực tuyến",
    description:
      "Hỗ trợ học tập từ xa thông qua bài giảng, học liệu số và các hoạt động tương tác.",
    items: [
      "Bài giảng điện tử",
      "Học liệu trực tuyến",
      "Kiểm tra kiến thức",
    ],
  },
  {
    icon: "🌱",
    title: "Đào tạo nâng cao",
    description:
      "Bồi dưỡng, cập nhật kiến thức và phát triển năng lực cá nhân trong quá trình công tác.",
    items: [
      "Bồi dưỡng nâng cao",
      "Kỹ năng quản lý",
      "Năng lực ứng dụng công nghệ",
    ],
  },
];

const process = [
  "Thông báo chương trình và đối tượng được tham gia.",
  "Người học tìm hiểu nội dung, thời gian và điều kiện tham gia.",
  "Đăng ký tham gia theo hướng dẫn của đơn vị quản lý.",
  "Người có thẩm quyền xem xét và xác nhận đăng ký.",
  "Tổ chức đào tạo trực tiếp hoặc trực tuyến.",
  "Đánh giá kết quả và ghi nhận quá trình hoàn thành.",
];

const principles = [
  "Chương trình đào tạo phải phù hợp với kế hoạch và quy định của đơn vị.",
  "Thông tin người học chỉ được sử dụng đúng mục đích quản lý đào tạo.",
  "Kết quả đào tạo phải dựa trên dữ liệu được xác nhận.",
  "Chỉ người được phân quyền mới được quản lý chương trình và kết quả.",
  "Không đưa tài liệu mật hoặc thông tin quân sự nhạy cảm lên hệ thống chưa được cấp phép.",
];

export default function DaoTaoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/hoc-tap/luc-luong-vu-trang"
          className="text-sm font-semibold text-green-700 hover:underline"
        >
          ← Quay lại nhóm Lực lượng vũ trang
        </Link>

        <section className="mt-5 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-800 p-7 text-white shadow-lg md:p-10">
          <div className="text-4xl">🎓</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            ĐÀO TẠO VÀ BỒI DƯỠNG
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Nền tảng hỗ trợ giới thiệu chương trình đào tạo,
            bồi dưỡng kiến thức, đăng ký tham gia và theo dõi
            kết quả học tập dành cho cán bộ, chiến sĩ thuộc
            lực lượng vũ trang.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Danh mục chương trình đào tạo
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Các chương trình được phân loại theo mục tiêu và
            nội dung đào tạo.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {programs.map((program) => (
              <article
                key={program.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{program.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {program.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {program.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-slate-700"
                    >
                      <span className="text-green-700">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quy trình tham gia đào tạo
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Theo dõi kết quả đào tạo
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="font-semibold text-slate-800">
                Tiến độ
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Theo dõi quá trình tham gia chương trình.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="font-semibold text-slate-800">
                Đánh giá
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Ghi nhận kết quả kiểm tra và đánh giá.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="font-semibold text-slate-800">
                Hoàn thành
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Theo dõi tình trạng hoàn thành chương trình.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Nguyên tắc tổ chức và quản lý
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">
            Trang hiện xây dựng giao diện và cấu trúc nội dung.
            Chức năng đăng ký đào tạo, phê duyệt, quản lý học viên,
            cập nhật kết quả và báo cáo sẽ được kết nối cơ sở dữ liệu
            trong giai đoạn hoàn thiện tiếp theo.
          </p>
        </section>

        <div className="mt-8">
          <Link
            href="/hoc-tap/luc-luong-vu-trang"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Quay lại nhóm Lực lượng vũ trang
          </Link>
        </div>
      </div>
    </main>
  );
}
