
import Link from "next/link";

const importSteps = [
  {
    number: "01",
    title: "Chuẩn bị tệp dữ liệu",
    description:
      "Chuẩn bị dữ liệu học viên, danh sách lớp, chương trình đào tạo hoặc kết quả kiểm tra theo mẫu được hệ thống hỗ trợ.",
  },
  {
    number: "02",
    title: "Tải tệp lên hệ thống",
    description:
      "Chọn tệp Excel hoặc CSV từ thiết bị. Hệ thống sẽ kiểm tra định dạng và khả năng đọc dữ liệu.",
  },
  {
    number: "03",
    title: "Đối chiếu và kiểm tra",
    description:
      "Xem trước dữ liệu, kiểm tra trường thông tin bắt buộc, bản ghi trùng lặp và những nội dung chưa hợp lệ.",
  },
  {
    number: "04",
    title: "Xác nhận nhập dữ liệu",
    description:
      "Người có thẩm quyền kiểm tra lần cuối và xác nhận trước khi ghi dữ liệu vào hệ thống.",
  },
];

const dataTypes = [
  {
    icon: "👥",
    title: "Danh sách học viên",
    description: "Thông tin tài khoản và danh sách học viên được phép quản lý.",
  },
  {
    icon: "🏫",
    title: "Lớp và chương trình đào tạo",
    description: "Danh mục lớp học, khóa học và chương trình đào tạo.",
  },
  {
    icon: "📅",
    title: "Dữ liệu chuyên cần",
    description: "Thông tin tham gia học tập, tình trạng có mặt và vắng mặt.",
  },
  {
    icon: "📝",
    title: "Kết quả kiểm tra",
    description: "Mã kỳ thi, mã học viên, môn học, điểm và trạng thái xác minh.",
  },
  {
    icon: "📚",
    title: "Tài liệu học tập",
    description: "Danh mục tài liệu và nội dung học tập được phép sử dụng.",
  },
  {
    icon: "📊",
    title: "Dữ liệu báo cáo",
    description: "Các bảng thống kê và báo cáo phục vụ công tác đào tạo.",
  },
];

const rules = [
  "Chỉ sử dụng dữ liệu thuộc phạm vi quản lý và được phép đưa lên hệ thống.",
  "Hỗ trợ định dạng Excel (.xlsx, .xls) và CSV khi chức năng nhập liệu được kết nối.",
  "Phải có bước xem trước và kiểm tra dữ liệu trước khi xác nhận nhập.",
  "Phát hiện bản ghi trùng lặp, thiếu thông tin hoặc sai định dạng phải thông báo rõ ràng.",
  "Không tự động ghép kết quả kiểm tra khi mã học viên hoặc mã kỳ thi bị thiếu, trùng hoặc không khớp.",
  "Lưu lại người thực hiện, thời gian nhập, nguồn dữ liệu và kết quả xử lý.",
  "Không tải tài liệu mật, dữ liệu nghiệp vụ hoặc thông tin quân sự nhạy cảm lên hệ thống chưa được cấp phép.",
];

export default function NhapDuLieuPage() {
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
          <div className="text-4xl">📥</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            NHẬP DỮ LIỆU
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Quản lý việc tiếp nhận và cập nhật dữ liệu học tập dành cho
            nhóm Lực lượng vũ trang (Quân đội – Công an). Hỗ trợ quy trình
            chuẩn hóa, kiểm tra và xác nhận dữ liệu trước khi đưa vào hệ thống.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Các nhóm dữ liệu hỗ trợ
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dataTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quy trình nhập dữ liệu
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {importSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-lg bg-slate-50 p-5"
              >
                <span className="text-sm font-bold text-green-700">
                  BƯỚC {step.number}
                </span>
                <h3 className="mt-2 font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Nguyên tắc kiểm tra và quản lý dữ liệu
          </h2>
          <ul className="mt-4 space-y-3">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="font-bold text-green-700">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">
            Trang hiện xây dựng giao diện và quy trình nghiệp vụ. Chức năng
            tải tệp, xem trước, kiểm tra dữ liệu, nhập vào cơ sở dữ liệu,
            xuất kết quả và lưu nhật ký sẽ được kết nối trong giai đoạn
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
