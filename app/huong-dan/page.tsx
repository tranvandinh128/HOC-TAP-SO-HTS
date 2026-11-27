
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Truy cập nền tảng",
    description:
      "Mở trang chủ HỌC TẬP SỐ, tìm hiểu các lĩnh vực học tập và lựa chọn nội dung phù hợp với nhu cầu.",
  },
  {
    number: "02",
    title: "Đăng ký tài khoản",
    description:
      "Người thuộc nhóm cần tài khoản thực hiện đăng ký bằng thông tin được yêu cầu. Một tài khoản có thể đăng ký nhiều lĩnh vực học tập.",
  },
  {
    number: "03",
    title: "Đăng nhập hệ thống",
    description:
      "Sử dụng email và mật khẩu đã đăng ký để truy cập các chức năng dành cho tài khoản.",
  },
  {
    number: "04",
    title: "Lựa chọn lĩnh vực học tập",
    description:
      "Chọn nhóm học tập phù hợp. Nội dung được cung cấp theo lĩnh vực mà tài khoản đã đăng ký.",
  },
  {
    number: "05",
    title: "Tham gia học tập",
    description:
      "Đọc tài liệu, xem bài giảng, tham gia hoạt động tương tác và sử dụng thư viện học liệu.",
  },
  {
    number: "06",
    title: "Kiểm tra và theo dõi kết quả",
    description:
      "Tham gia các bài kiểm tra được tổ chức và theo dõi tiến độ học tập khi chức năng được triển khai.",
  },
];

const groups = [
  "Công dân học tập",
  "Công nhân học tập",
  "Sinh viên học tập",
  "Học sinh THPT",
  "Học sinh THCS",
  "Học sinh tiểu học",
  "Lực lượng vũ trang (Quân đội – Công an)",
];

const faqs = [
  {
    question: "Tôi có phải đăng ký tài khoản mới được học không?",
    answer:
      "Các dịch vụ học tập thông thường được truy cập công khai theo chính sách HTS. Tài khoản chỉ cần thiết khi lưu tiến độ, theo dõi kết quả hoặc sử dụng chức năng quản trị.",
  },
  {
    question: "Một tài khoản có thể tham gia nhiều lĩnh vực không?",
    answer:
      "Có. Một tài khoản có thể đăng ký nhiều lĩnh vực học tập. Quyền truy cập nội dung phụ thuộc vào các lĩnh vực đã đăng ký.",
  },
  {
    question: "Làm thế nào để lấy lại mật khẩu?",
    answer:
      "Truy cập chức năng Quên mật khẩu và thực hiện hướng dẫn. Chức năng gửi email đặt lại mật khẩu cần được kết nối với hệ thống xác thực.",
  },
  {
    question: "Tôi có thể tự cấp quyền quản trị cho mình không?",
    answer:
      "Không. Quyền quản trị phải được quản trị viên cấp cao xem xét và phê duyệt theo phạm vi lĩnh vực được giao.",
  },
  {
    question: "Tôi có phải cung cấp mật khẩu ví Pi không?",
    answer:
      "Không. HTS tuyệt đối không yêu cầu người dùng cung cấp hoặc lưu mật khẩu ví Pi (passphrase) dưới bất kỳ hình thức nào.",
  },
];

export default function HuongDanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            HƯỚNG DẪN SỬ DỤNG
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-blue-50">
            Hướng dẫn người dùng truy cập, đăng ký, đăng nhập,
            lựa chọn lĩnh vực và sử dụng các chức năng học tập
            trên nền tảng HỌC TẬP SỐ.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            I. Giới thiệu các nhóm học tập
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            HỌC TẬP SỐ được tổ chức thành 07 lĩnh vực dành cho
            các đối tượng khác nhau:
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {groups.map((group, index) => (
              <div
                key={group}
                className="flex items-center gap-3 rounded-lg bg-blue-50 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-semibold text-slate-800">
                  {group}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            II. Các bước sử dụng nền tảng
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-blue-700">
                  BƯỚC {step.number}
                </span>

                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            III. Truy cập nhanh các chức năng
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Trang chủ", href: "/" },
              { label: "Đăng ký tài khoản", href: "/dang-ky" },
              { label: "Đăng nhập", href: "/dang-nhap" },
              { label: "Bài giảng", href: "/bai-giang" },
              { label: "Thư viện học liệu", href: "/thu-vien" },
              { label: "Tin tức và tri thức", href: "/tin-tuc" },
              { label: "Cộng đồng học tập", href: "/mang-xa-hoi" },
              { label: "Trò chơi học tập", href: "/tro-choi" },
              { label: "Thi trực tuyến", href: "/thi-truc-tuyen" },
              { label: "Theo dõi học tập", href: "/theo-doi-hoc-tap" },
              { label: "Thông tin tài khoản", href: "/tai-khoan" },
              { label: "Quên mật khẩu", href: "/quen-mat-khau" },
              { label: "Giới thiệu HTS", href: "/gioi-thieu" },
              { label: "Liên hệ hỗ trợ", href: "/lien-he" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 p-4 text-sm font-semibold text-blue-800 transition hover:border-blue-400 hover:bg-blue-50"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            IV. Hỏi đáp thường gặp
          </h2>

          <div className="mt-5 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-slate-100 pb-5 last:border-0"
              >
                <h3 className="font-bold text-slate-800">
                  {index + 1}. {faq.question}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">
            V. Lưu ý về an toàn tài khoản
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-amber-900">
            <li>Không chia sẻ mật khẩu đăng nhập cho người khác.</li>
            <li>Không cung cấp mã xác thực hoặc thông tin bảo mật cho người lạ.</li>
            <li>Không cung cấp mật khẩu ví Pi (passphrase) cho bất kỳ ai hoặc bất kỳ website nào.</li>
            <li>Kiểm tra địa chỉ website trước khi đăng nhập.</li>
            <li>Báo cho bộ phận hỗ trợ khi phát hiện dấu hiệu bất thường.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-950 p-7 text-center text-white">
          <h2 className="text-2xl font-bold">
            Bạn cần hỗ trợ thêm?
          </h2>

          <p className="mt-3 leading-7 text-blue-100">
            Hãy liên hệ bộ phận hỗ trợ để được hướng dẫn sử dụng
            nền tảng HỌC TẬP SỐ.
          </p>

          <Link
            href="/lien-he"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
          >
            Liên hệ hỗ trợ
          </Link>
        </section>

        <p className="text-center text-xs leading-6 text-slate-500">
          HỌC TẬP SỐ – Kết nối tri thức, phát triển cộng đồng,
          thúc đẩy học tập suốt đời.
        </p>
      </div>
    </main>
  );
}
