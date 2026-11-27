
import Link from "next/link";

import FieldAccessNotice from "@/components/FieldAccessNotice";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

export const dynamic = "force-dynamic";

const attendanceRules = [
  "Hệ thống dự kiến ghi nhận tình trạng tham gia học tập theo chu kỳ 10 phút.",
  "Việc nhận diện khuôn mặt chỉ được triển khai khi có căn cứ pháp lý, sự đồng ý phù hợp và hạ tầng được cấp phép.",
  "Nếu nhận diện không thành công, người học được chuyển sang xác minh thủ công.",
  "Không tự động kết luận vắng mặt hoặc xử phạt chỉ dựa trên kết quả nhận diện.",
  "Dữ liệu điểm danh phải được bảo vệ và chỉ người có thẩm quyền mới được truy cập.",
];

export default async function DiemDanhLucLuongVuTrangPage() {
  const accessStatus = await getMilitaryFieldAccessStatus();
  if (accessStatus !== "granted") {
    return <FieldAccessNotice status={accessStatus} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/hoc-tap/luc-luong-vu-trang"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Quay lại nhóm Lực lượng vũ trang
        </Link>

        <section className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-green-700 p-7 text-white">
          <div className="text-4xl">📋</div>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            ĐIỂM DANH HỌC TẬP
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-green-50">
            Theo dõi quá trình tham gia học tập, rèn luyện và xác minh
            tình trạng điểm danh của học viên thuộc lực lượng vũ trang.
          </p>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Thông tin điểm danh
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Chức năng ghi nhận thời gian, lớp học, đơn vị và tình trạng
              tham gia học tập sẽ được kết nối sau khi hoàn thiện hệ thống.
            </p>
            <div className="mt-5 rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Trạng thái hệ thống</p>
              <p className="mt-1 font-semibold text-amber-700">
                Chưa kết nối dữ liệu
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Các nội dung quản lý
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• Thông tin học viên và đơn vị</li>
              <li>• Lịch học và thời gian tham gia</li>
              <li>• Lịch sử điểm danh</li>
              <li>• Xác minh trường hợp chưa rõ trạng thái</li>
              <li>• Tổng hợp và xuất báo cáo</li>
            </ul>
          </div>
        </section>

        <section className="mt-7 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Quy định và nguyên tắc điểm danh
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
            {attendanceRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Lưu ý bảo mật
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Không tải lên hệ thống chưa được cấp phép các hình ảnh khuôn mặt,
            dữ liệu sinh trắc học, thông tin cá nhân nhạy cảm hoặc tài liệu
            thuộc bí mật quân sự, bí mật nhà nước.
          </p>
        </section>
      </div>
    </main>
  );
}
