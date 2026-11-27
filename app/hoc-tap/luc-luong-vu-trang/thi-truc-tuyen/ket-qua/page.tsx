
import Link from "next/link";

import FieldAccessNotice from "@/components/FieldAccessNotice";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

export const dynamic = "force-dynamic";

const resultFields = [
  "Họ và tên thí sinh",
  "Đơn vị công tác",
  "Lớp hoặc nhóm học tập",
  "Số báo danh",
  "Mã kỳ thi / mã ca thi",
  "Môn thi",
  "Thời gian làm bài",
  "Điểm số",
  "Trạng thái kết quả",
];

const resultRules = [
  "Kết quả sau khi hoàn thành bài thi được ghi nhận ở trạng thái tạm thời.",
  "Kết quả phải được kiểm tra, xác minh trước khi công nhận chính thức.",
  "Chỉ người có thẩm quyền mới được xác nhận và chốt kết quả.",
  "Kết quả đã chốt không được tự ý sửa đổi hoặc ghi đè.",
  "Nếu cần điều chỉnh kết quả đã chốt, phải được cấp có thẩm quyền cho phép và ghi rõ lý do.",
  "Mọi thay đổi phải lưu giá trị cũ, giá trị mới, người thực hiện và thời điểm thay đổi.",
  "Thí sinh được tra cứu kết quả thuộc phạm vi tài khoản và quyền truy cập của mình.",
];

export default async function KetQuaThiPage() {
  const accessStatus = await getMilitaryFieldAccessStatus();
  if (accessStatus !== "granted") {
    return <FieldAccessNotice status={accessStatus} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/hoc-tap/luc-luong-vu-trang/thi-truc-tuyen"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Quay lại trang thi trực tuyến
        </Link>

        <section className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-green-700 p-7 text-white shadow-lg md:p-9">
          <div className="text-4xl">📊</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            KẾT QUẢ THI TRỰC TUYẾN
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-green-50">
            Theo dõi, xác minh, quản lý và tổng hợp kết quả kiểm tra,
            sát hạch của học viên thuộc lực lượng vũ trang.
          </p>
        </section>

        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Thông tin kết quả cần quản lý
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resultFields.map((field) => (
              <div
                key={field}
                className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700"
              >
                {field}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Trạng thái kết quả
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-800">Tạm thời</p>
              <p className="mt-1 text-sm text-amber-700">
                Chờ kiểm tra và xác minh.
              </p>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-800">Đã xác nhận</p>
              <p className="mt-1 text-sm text-green-700">
                Đã được người có thẩm quyền xác nhận.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-100 p-4">
              <p className="font-semibold text-slate-800">Đã chốt</p>
              <p className="mt-1 text-sm text-slate-600">
                Kết quả chính thức đã được khóa.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Quy trình quản lý kết quả
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
            <li>Ghi nhận kết quả bài thi sau khi thí sinh hoàn thành.</li>
            <li>Kiểm tra thông tin thí sinh và mã kỳ thi.</li>
            <li>Xác minh các trường hợp bất thường hoặc có cảnh báo.</li>
            <li>Người có thẩm quyền xác nhận kết quả.</li>
            <li>Chốt kết quả và lưu lịch sử quản lý.</li>
            <li>Tổng hợp báo cáo và cho phép tra cứu theo quyền.</li>
          </ol>
        </section>

        <section className="mt-7 rounded-xl border border-green-100 bg-green-50 p-6">
          <h2 className="font-bold text-green-900">
            Nguyên tắc bảo vệ và điều chỉnh kết quả
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {resultRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Trạng thái triển khai
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-800">
            Trang hiện mới có giao diện và nội dung quản lý. Chưa kết nối
            dữ liệu thí sinh, điểm thi hoặc chức năng xác nhận kết quả.
            Không đưa dữ liệu thi thuộc phạm vi bí mật lên hệ thống
            chưa được cấp phép.
          </p>
        </section>

        <div className="mt-8">
          <Link
            href="/hoc-tap/luc-luong-vu-trang/thi-truc-tuyen"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Quay lại trang thi trực tuyến
          </Link>
        </div>
      </div>
    </main>
  );
}
