
import Link from "next/link";

const learnerGroups = [
  {
    icon: "👥",
    title: "Danh sách học viên",
    description:
      "Quản lý danh sách người học thuộc phạm vi đơn vị và chương trình được phân quyền.",
    items: [
      "Mã học viên",
      "Họ và tên",
      "Đơn vị hoặc bộ phận",
      "Chương trình tham gia",
    ],
  },
  {
    icon: "📝",
    title: "Thông tin đăng ký",
    description:
      "Theo dõi tình trạng đăng ký và xác nhận tham gia chương trình đào tạo.",
    items: [
      "Ngày đăng ký",
      "Chương trình đăng ký",
      "Tình trạng xác nhận",
      "Lịch học dự kiến",
    ],
  },
  {
    icon: "📚",
    title: "Quá trình học tập",
    description:
      "Theo dõi tiến độ tham gia các bài học và nội dung được giao.",
    items: [
      "Nội dung đã học",
      "Tiến độ hoàn thành",
      "Thời gian tham gia",
      "Nội dung cần tiếp tục",
    ],
  },
  {
    icon: "🏅",
    title: "Kết quả đánh giá",
    description:
      "Ghi nhận kết quả kiểm tra và tình trạng hoàn thành chương trình.",
    items: [
      "Kết quả kiểm tra",
      "Nhận xét đánh giá",
      "Tình trạng hoàn thành",
      "Lịch sử kết quả",
    ],
  },
];

const permissions = [
  "Học viên chỉ được xem và cập nhật thông tin cá nhân trong phạm vi được phép.",
  "Quản trị viên lĩnh vực chỉ quản lý học viên thuộc lĩnh vực được giao.",
  "Quản trị viên không được tự cấp thêm quyền cho tài khoản của mình.",
  "Mọi thay đổi thông tin quan trọng phải được ghi nhận trong nhật ký hệ thống.",
  "Dữ liệu cá nhân phải được bảo vệ và chỉ sử dụng đúng mục đích.",
  "Không đưa thông tin quân sự nhạy cảm hoặc tài liệu mật lên hệ thống chưa được cấp phép.",
];

const workflow = [
  "Tiếp nhận thông tin học viên và kiểm tra dữ liệu đăng ký.",
  "Xác nhận học viên thuộc chương trình và phạm vi quản lý.",
  "Ghi nhận quá trình tham gia học tập, đào tạo và huấn luyện.",
  "Cập nhật kết quả kiểm tra sau khi được xác nhận.",
  "Tổng hợp tình trạng hoàn thành chương trình.",
  "Lưu lịch sử thay đổi và phục vụ công tác báo cáo.",
];

export default function QuanLyHocVienPage() {
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
          <div className="text-4xl">👥</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            QUẢN LÝ HỌC VIÊN
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Hệ thống quản lý thông tin học viên, quá trình
            tham gia học tập, đào tạo, huấn luyện và kết quả
            đánh giá dành cho lực lượng vũ trang.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Các chức năng quản lý
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Các nội dung được tổ chức theo từng nhóm thông tin
            để thuận tiện quản lý và tra cứu.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {learnerGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{group.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {group.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
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
            Quy trình quản lý học viên
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {workflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Quyền truy cập và bảo vệ dữ liệu
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {permissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">
            Trang hiện xây dựng giao diện và cấu trúc chức năng.
            Việc thêm, sửa, tìm kiếm học viên, nhập danh sách,
            phân quyền và lưu dữ liệu thực tế sẽ được kết nối
            với API phía máy chủ Cloudflare trong giai đoạn sau.
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
