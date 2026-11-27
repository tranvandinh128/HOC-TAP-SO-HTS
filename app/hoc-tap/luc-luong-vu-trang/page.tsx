import FieldAccessNotice from "@/components/FieldAccessNotice";
import MilitaryLearningDashboard from "@/components/MilitaryLearningDashboard";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

export const dynamic = "force-dynamic";

export default async function LucLuongVuTrangPage() {
  const accessStatus = await getMilitaryFieldAccessStatus();

  if (accessStatus === "granted") {
    return <MilitaryLearningDashboard />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 md:px-8">
      <section className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
          HỌC TẬP SỐ – HTS
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">
          Lực lượng vũ trang
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-200">
          Khu vực học tập giới hạn. Nội dung chỉ được hiển thị sau khi máy chủ
          xác minh phiên đăng nhập và membership hợp lệ.
        </p>
      </section>

      <div className="mx-auto mt-6 max-w-4xl">
        <FieldAccessNotice status={accessStatus} />
      </div>
    </main>
  );
}
