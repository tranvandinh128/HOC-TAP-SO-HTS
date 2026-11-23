
import Link from "next/link";

const categories = [
  {
    icon: "📘",
    title: "Tài liệu chính trị, pháp luật",
    description:
      "Tài liệu tìm hiểu kiến thức chính trị, pháp luật và các nội dung giáo dục được phép phổ biến.",
    items: [
      "Tài liệu giáo dục chính trị",
      "Kiến thức pháp luật",
      "Tài liệu tuyên truyền, phổ biến",
    ],
  },
  {
    icon: "📚",
    title: "Tài liệu chuyên môn, nghiệp vụ",
    description:
      "Tài liệu phục vụ bồi dưỡng kiến thức chuyên môn và nâng cao năng lực công tác.",
    items: [
      "Tài liệu chuyên môn",
      "Hướng dẫn nghiệp vụ được phép công khai",
      "Tài liệu tham khảo",
    ],
  },
  {
    icon: "🎓",
    title: "Tài liệu học tập, bồi dưỡng",
    description:
      "Nguồn tài liệu hỗ trợ quá trình tự học, nghiên cứu và bồi dưỡng kiến thức.",
    items: [
      "Giáo trình và bài giảng",
      "Tài liệu ôn tập",
      "Câu hỏi và nội dung tham khảo",
    ],
  },
  {
    icon: "🎥",
    title: "Video và học liệu số",
    description:
      "Các học liệu đa phương tiện phục vụ học tập trực tuyến.",
    items: [
      "Video bài giảng",
      "Tài liệu trình chiếu",
      "Học liệu điện tử",
    ],
  },
];

const rules = [
  "Tài liệu phải có nguồn gốc rõ ràng và được kiểm tra trước khi đưa lên hệ thống.",
  "Chỉ đăng tải tài liệu được phép phổ biến trên nền tảng học tập số.",
  "Không tải lên tài liệu mật, tài liệu nội bộ hạn chế hoặc thông tin quân sự nhạy cảm.",
  "Tài liệu cần được phân loại theo chủ đề, đơn vị sử dụng và phạm vi được phép truy cập.",
  "Việc thêm, sửa, gỡ bỏ tài liệu phải được thực hiện bởi người có thẩm quyền và có nhật ký ghi nhận.",
];

export default function TaiLieuPage() {
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
          <div className="text-4xl">📚</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            THƯ VIỆN TÀI LIỆU HỌC TẬP
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Không gian lưu trữ, tra cứu và khai thác tài liệu
            học tập, bồi dưỡng kiến thức và học liệu số dành
            cho cán bộ, chiến sĩ thuộc lực lượng vũ trang.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Danh mục tài liệu
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tài liệu được phân loại theo nội dung để thuận tiện
            tra cứu và sử dụng.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{category.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {category.items.map((item) => (
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
            Hướng dẫn khai thác tài liệu
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            <li>Chọn danh mục tài liệu cần tra cứu.</li>
            <li>Tìm kiếm theo tên, chủ đề hoặc từ khóa.</li>
            <li>Kiểm tra thông tin nguồn và phạm vi sử dụng.</li>
            <li>Mở hoặc tải tài liệu nếu được cấp quyền.</li>
            <li>Phản hồi khi phát hiện tài liệu sai hoặc không còn phù hợp.</li>
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Quy định quản lý và bảo vệ tài liệu
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">
            Trang hiện xây dựng giao diện và danh mục tài liệu.
            Chức năng tìm kiếm thực tế, tải lên, phân loại,
            xem trực tuyến và phân quyền khai thác sẽ được
            kết nối cơ sở dữ liệu trong giai đoạn tiếp theo.
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
