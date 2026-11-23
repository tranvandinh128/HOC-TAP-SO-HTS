
import Link from "next/link";

const reportItems = [
  {
    icon: "👥",
    title: "Tổng hợp học viên",
    description:
      "Thống kê số lượng người tham gia học tập theo nhóm và chương trình.",
    details: [
      "Tổng số học viên",
      "Số người đã tham gia",
      "Số người chưa tham gia",
    ],
  },
  {
    icon: "📚",
    title: "Báo cáo học tập",
    description:
      "Theo dõi tình hình tham gia và kết quả hoàn thành các nội dung học tập.",
    details: [
      "Số bài học đã hoàn thành",
      "Tiến độ học tập",
      "Kết quả tự học và ôn tập",
    ],
  },
  {
    icon: "🎖️",
    title: "Báo cáo huấn luyện",
    description:
      "Tổng hợp tiến độ thực hiện chương trình huấn luyện được phê duyệt.",
    details: [
      "Chương trình đã triển khai",
      "Tiến độ thực hiện",
      "Kết quả đánh giá",
    ],
  },
  {
    icon: "📝",
    title: "Báo cáo kiểm tra",
    description:
      "Tổng hợp kết quả kiểm tra, đánh giá và tình hình hoàn thành bài kiểm tra.",
    details: [
      "Số lượt kiểm tra",
      "Kết quả đánh giá",
      "Các trường hợp cần xác minh",
    ],
  },
];

const reportProcess = [
  "Lựa chọn loại báo cáo cần tổng hợp.",
  "Chọn chương trình, khoảng thời gian và phạm vi được phân quyền.",
  "Hệ thống tổng hợp dữ liệu đã được ghi nhận.",
  "Kiểm tra, đối chiếu và xác nhận tính chính xác.",
  "Xuất báo cáo theo định dạng được hệ thống hỗ trợ.",
  "Lưu lịch sử lập và xuất báo cáo để phục vụ tra cứu.",
];

const safeguards = [
  "Chỉ người dùng được cấp quyền mới được xem dữ liệu báo cáo tương ứng.",
  "Không hiển thị thông tin cá nhân vượt quá phạm vi nhiệm vụ được giao.",
  "Không đưa dữ liệu mật, dữ liệu quân sự nhạy cảm lên hệ thống chưa được cấp phép.",
  "Mọi thao tác xem, chỉnh sửa, xác nhận và xuất báo cáo phải được ghi nhật ký phù hợp.",
  "Số liệu báo cáo phải lấy từ dữ liệu thực tế đã được xác nhận, không tự tạo số liệu.",
];

export default function BaoCaoPage() {
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
          <div className="text-4xl">📊</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            HỆ THỐNG BÁO CÁO VÀ THỐNG KÊ
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Tổng hợp, theo dõi và đánh giá tình hình học tập,
            huấn luyện và kiểm tra của cán bộ, chiến sĩ thuộc
            lực lượng vũ trang trên nền tảng HỌC TẬP SỐ.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Các loại báo cáo
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Lựa chọn nhóm báo cáo phù hợp với nhiệm vụ và quyền truy cập.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {reportItems.map((item) => (
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
            Quy trình lập báo cáo
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {reportProcess.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Nguyên tắc quản lý dữ liệu báo cáo
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {safeguards.map((item) => (
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
            Chức năng thống kê dữ liệu thực tế, lọc báo cáo,
            xuất Excel/PDF, phân quyền và lưu lịch sử sẽ được
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
