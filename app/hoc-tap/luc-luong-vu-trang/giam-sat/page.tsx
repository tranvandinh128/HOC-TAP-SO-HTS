
import Link from "next/link";

const monitoringItems = [
  {
    icon: "📊",
    title: "Tổng quan học tập",
    description: "Theo dõi tình hình tham gia và tiến độ hoàn thành chương trình.",
    details: [
      "Số lượng học viên tham gia",
      "Tình trạng học tập",
      "Tiến độ hoàn thành",
      "Các chương trình đang triển khai",
    ],
  },
  {
    icon: "📅",
    title: "Giám sát chuyên cần",
    description: "Theo dõi việc tham gia các buổi học và huấn luyện.",
    details: [
      "Lịch học và lịch huấn luyện",
      "Thời gian tham gia",
      "Tình trạng có mặt hoặc vắng mặt",
      "Các trường hợp cần xác minh",
    ],
  },
  {
    icon: "📚",
    title: "Theo dõi tiến độ",
    description: "Đánh giá mức độ hoàn thành nội dung học tập của từng học viên.",
    details: [
      "Bài học đã hoàn thành",
      "Nội dung đang thực hiện",
      "Nội dung chưa hoàn thành",
      "Tiến độ theo chương trình",
    ],
  },
  {
    icon: "📝",
    title: "Giám sát kiểm tra",
    description: "Theo dõi tình hình tổ chức kiểm tra và các trường hợp cần rà soát.",
    details: [
      "Danh sách kỳ kiểm tra",
      "Tình trạng tham gia",
      "Kết quả kiểm tra",
      "Các cảnh báo cần người có thẩm quyền xác minh",
    ],
  },
  {
    icon: "🔔",
    title: "Cảnh báo và xử lý",
    description: "Tổng hợp những vấn đề phát sinh trong quá trình học tập.",
    details: [
      "Học viên có tiến độ chậm",
      "Trường hợp vắng học cần xác minh",
      "Lỗi kỹ thuật khi tham gia học",
      "Các yêu cầu hỗ trợ chưa xử lý",
    ],
  },
  {
    icon: "📈",
    title: "Thống kê và báo cáo",
    description: "Tổng hợp số liệu phục vụ quản lý và đánh giá chất lượng đào tạo.",
    details: [
      "Báo cáo theo thời gian",
      "Báo cáo theo chương trình",
      "Thống kê chuyên cần",
      "Thống kê kết quả học tập",
    ],
  },
];

const principles = [
  "Chỉ người có thẩm quyền mới được truy cập dữ liệu giám sát theo phạm vi được giao.",
  "Không tự động kết luận vi phạm hoặc đánh giá học viên chỉ dựa trên cảnh báo của hệ thống.",
  "Các trường hợp bất thường phải được kiểm tra và xác minh trước khi xử lý.",
  "Kết quả kiểm tra và dữ liệu chuyên cần phải có lịch sử cập nhật, người thực hiện và thời gian.",
  "Thông tin cá nhân và dữ liệu học tập phải được bảo vệ theo quy định.",
  "Không đưa tài liệu mật, thông tin nghiệp vụ hoặc dữ liệu quân sự nhạy cảm lên hệ thống chưa được cấp phép.",
];

export default function GiamSatPage() {
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
          <div className="text-4xl">📡</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            GIÁM SÁT HỌC TẬP
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Theo dõi tình hình học tập, chuyên cần, tiến độ đào tạo,
            kiểm tra và tổng hợp báo cáo dành cho nhóm Lực lượng
            vũ trang (Quân đội – Công an).
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Các chức năng giám sát
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Các chức năng được phân chia thành từng nội dung
            để thuận tiện theo dõi và quản lý.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {monitoringItems.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-2 text-sm text-slate-700"
                    >
                      <span className="text-green-700">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quy trình giám sát
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            <li>Tiếp nhận dữ liệu học tập từ các chức năng liên quan.</li>
            <li>Tổng hợp tình hình chuyên cần và tiến độ học viên.</li>
            <li>Phát hiện những trường hợp cần kiểm tra, xác minh.</li>
            <li>Chuyển thông tin đến người có thẩm quyền xử lý.</li>
            <li>Cập nhật kết quả xác minh và phương án xử lý.</li>
            <li>Lưu lịch sử và tổng hợp báo cáo theo quy định.</li>
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Nguyên tắc giám sát và bảo vệ dữ liệu
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">
            Hiện tại trang được xây dựng giao diện và cấu trúc chức năng.
            Việc kết nối dữ liệu thực tế, phân quyền, cập nhật trạng thái,
            cảnh báo và xuất báo cáo sẽ được triển khai trong giai đoạn
            hoàn thiện hệ thống.
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
