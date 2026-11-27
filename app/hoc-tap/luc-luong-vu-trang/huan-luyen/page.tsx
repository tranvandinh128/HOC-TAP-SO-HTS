
import Link from "next/link";

import FieldAccessNotice from "@/components/FieldAccessNotice";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

export const dynamic = "force-dynamic";

const trainingPrograms = [
  {
    icon: "📚",
    title: "Bồi dưỡng kiến thức",
    description:
      "Hệ thống bài học, tài liệu và nội dung bồi dưỡng kiến thức theo từng chuyên đề.",
    topics: [
      "Kiến thức chính trị, pháp luật",
      "Kiến thức chuyên môn, nghiệp vụ",
      "Kỹ năng công tác và đời sống",
    ],
  },
  {
    icon: "🎯",
    title: "Huấn luyện chuyên môn",
    description:
      "Quản lý nội dung học tập, chương trình huấn luyện và tiến độ hoàn thành.",
    topics: [
      "Chương trình huấn luyện theo kế hoạch",
      "Tài liệu nghiệp vụ được phép sử dụng",
      "Đánh giá kết quả huấn luyện",
    ],
  },
  {
    icon: "💻",
    title: "Học tập trực tuyến",
    description:
      "Học viên tiếp cận bài giảng, video và tài liệu học tập trên nền tảng số.",
    topics: [
      "Bài giảng trực tuyến",
      "Video hướng dẫn",
      "Câu hỏi ôn tập và tự kiểm tra",
    ],
  },
  {
    icon: "📊",
    title: "Theo dõi tiến độ",
    description:
      "Theo dõi quá trình tham gia học tập và kết quả hoàn thành chương trình.",
    topics: [
      "Tiến độ học tập cá nhân",
      "Kết quả kiểm tra",
      "Tổng hợp báo cáo theo quyền",
    ],
  },
];

const principles = [
  "Nội dung huấn luyện phải phù hợp với chương trình và kế hoạch được cấp có thẩm quyền phê duyệt.",
  "Tài liệu đưa lên hệ thống phải được kiểm tra và phân loại trước khi sử dụng.",
  "Chỉ sử dụng tài liệu được phép phổ biến trên nền tảng này.",
  "Không tải lên tài liệu mật, tài liệu nội bộ hạn chế hoặc thông tin quân sự nhạy cảm khi hệ thống chưa được cấp phép.",
  "Kết quả học tập và huấn luyện phải được quản lý theo đúng phạm vi phân quyền.",
  "Mọi hoạt động quản lý, chỉnh sửa và xác nhận kết quả phải có lịch sử ghi nhận.",
];

export default async function HuanLuyenPage() {
  const accessStatus = await getMilitaryFieldAccessStatus();
  if (accessStatus !== "granted") {
    return <FieldAccessNotice status={accessStatus} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/hoc-tap/luc-luong-vu-trang"
          className="text-sm font-semibold text-green-700 hover:underline"
        >
          ← Quay lại nhóm Lực lượng vũ trang
        </Link>

        <section className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-800 p-7 text-white shadow-lg md:p-10">
          <div className="text-4xl">🎖️</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            HUẤN LUYỆN VÀ BỒI DƯỠNG
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Nền tảng hỗ trợ tổ chức học tập, bồi dưỡng kiến thức,
            quản lý chương trình huấn luyện và theo dõi kết quả
            học tập dành cho cán bộ, chiến sĩ thuộc lực lượng
            vũ trang.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Các nội dung huấn luyện
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Lựa chọn nội dung phù hợp với chương trình và quyền truy cập
            được cấp.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {trainingPrograms.map((program) => (
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
                  {program.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex gap-2 text-sm text-slate-700"
                    >
                      <span className="text-green-700">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quy trình tổ chức huấn luyện
          </h2>

          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            <li>
              Xây dựng kế hoạch và xác định đối tượng tham gia.
            </li>
            <li>
              Chuẩn bị chương trình, bài giảng và tài liệu được phép sử dụng.
            </li>
            <li>
              Tổ chức học tập trực tiếp hoặc trực tuyến.
            </li>
            <li>
              Theo dõi tiến độ và việc tham gia học tập.
            </li>
            <li>
              Tổ chức kiểm tra, đánh giá theo kế hoạch.
            </li>
            <li>
              Tổng hợp kết quả và lập báo cáo theo thẩm quyền.
            </li>
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900">
            Nguyên tắc quản lý và bảo vệ thông tin
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-800">
            Trang hiện mới xây dựng giao diện và nội dung nền tảng.
            Chức năng quản lý chương trình, tải tài liệu, ghi nhận
            tiến độ và báo cáo sẽ được kết nối cơ sở dữ liệu ở giai
            đoạn hoàn thiện hệ thống.
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
