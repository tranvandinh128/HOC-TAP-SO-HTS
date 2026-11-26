
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TinTucDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.trim().length === 0) {
    notFound();
  }

  const title = slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Tin tức và kiến thức
          </h1>

          <p className="mt-3 text-blue-100">
            Cập nhật thông tin, chia sẻ tri thức và kinh nghiệm học tập.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
              Tin tức HTS
            </span>
            <span>Đang chờ kết nối dữ liệu bài viết</span>
          </div>

          <h2 className="text-2xl font-bold leading-relaxed text-slate-900 md:text-3xl">
            {title}
          </h2>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="leading-8 text-slate-600">
              Nội dung chi tiết của bài viết sẽ được hiển thị tại đây
              sau khi hệ thống quản lý tin tức được kết nối với cơ sở
              dữ liệu D1 qua API phía máy chủ.
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm leading-7 text-amber-900">
                <strong>Lưu ý:</strong> Đây là giao diện khung.
                Bài viết thực tế cần được quản trị viên có thẩm quyền
                kiểm duyệt và xuất bản trước khi hiển thị cho người đọc.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/tin-tuc"
              className="inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              ← Quay lại trang tin tức
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
