
"use client";

import { useMemo, useState } from "react";

type Article = {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  status: "Đã duyệt" | "Bản nháp";
};

const categories = [
  "Tất cả tin tức",
  "Công nghệ số",
  "Pi Network",
  "Giáo dục",
  "Khoa học",
  "Đời sống",
  "Kỹ năng học tập",
];

const articles: Article[] = [
  {
    id: 1,
    title: "Kỹ năng bảo vệ tài khoản trong môi trường số",
    summary:
      "Tìm hiểu cách sử dụng mật khẩu mạnh, xác thực nhiều lớp và nhận biết các hình thức lừa đảo trực tuyến.",
    category: "Công nghệ số",
    source: "Bài viết kiến thức HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Đã duyệt",
  },
  {
    id: 2,
    title: "Tìm hiểu hệ sinh thái Pi Network",
    summary:
      "Giới thiệu những kiến thức cơ bản về hệ sinh thái Pi Network, ứng dụng và các nguyên tắc bảo vệ tài khoản.",
    category: "Pi Network",
    source: "Nội dung giới thiệu HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Bản nháp",
  },
  {
    id: 3,
    title: "Phương pháp tự học trong thời đại số",
    summary:
      "Một số phương pháp lập kế hoạch, tìm kiếm tài liệu và tự đánh giá kết quả học tập.",
    category: "Giáo dục",
    source: "Bài viết kiến thức HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Đã duyệt",
  },
  {
    id: 4,
    title: "Ứng dụng khoa học trong đời sống hằng ngày",
    summary:
      "Khám phá cách vận dụng kiến thức khoa học để giải quyết những vấn đề thiết thực trong cuộc sống.",
    category: "Khoa học",
    source: "Bài viết kiến thức HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Đã duyệt",
  },
  {
    id: 5,
    title: "Kỹ năng quản lý thời gian và công việc",
    summary:
      "Hướng dẫn xây dựng mục tiêu, sắp xếp công việc và duy trì thói quen học tập hiệu quả.",
    category: "Kỹ năng học tập",
    source: "Bài viết kiến thức HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Đã duyệt",
  },
  {
    id: 6,
    title: "Sử dụng công nghệ để nâng cao chất lượng cuộc sống",
    summary:
      "Những ứng dụng công nghệ thiết thực trong sinh hoạt, lao động và kết nối cộng đồng.",
    category: "Đời sống",
    source: "Bài viết kiến thức HTS",
    publishedAt: "Nội dung tham khảo",
    status: "Bản nháp",
  },
];

export default function TinTucPage() {
  const [category, setCategory] = useState(categories[0]);
  const [keyword, setKeyword] = useState("");

  const filteredArticles = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === categories[0] || article.category === category;

      const matchesKeyword =
        !search ||
        article.title.toLowerCase().includes(search) ||
        article.summary.toLowerCase().includes(search);

      return matchesCategory && matchesKeyword;
    });
  }, [category, keyword]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            TIN TỨC VÀ TRI THỨC
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-blue-50">
            Cập nhật kiến thức công nghệ, giáo dục, Pi Network,
            khoa học và đời sống. Kết nối thông tin hữu ích với
            cộng đồng học tập trên nền tảng số.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Chuyên mục</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">
              {categories.length - 1}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Bài viết mẫu</p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {articles.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Kết quả tìm kiếm</p>
            <p className="mt-2 text-3xl font-bold text-purple-700">
              {filteredArticles.length}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Khám phá tin tức
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="news-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Tìm kiếm nội dung
              </label>

              <input
                id="news-search"
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="news-category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Chọn chuyên mục
              </label>

              <select
                id="news-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white p-3"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-800">
              Bài viết mới
            </h2>

            <span className="text-sm text-slate-500">
              {filteredArticles.length} bài viết
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {article.category}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        article.status === "Đã duyệt"
                          ? "text-green-700"
                          : "text-amber-700"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-7 text-slate-800">
                    {article.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {article.summary}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <p>Nguồn: {article.source}</p>
                    <p>{article.publishedAt}</p>
                  </div>

                  <button
                    type="button"
                    disabled
                    title="Trang chi tiết bài viết sẽ được kết nối sau"
                    className="mt-5 w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
                  >
                    Chưa có trang chi tiết
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-semibold text-slate-700">
                Không tìm thấy bài viết phù hợp.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Hãy thử từ khóa hoặc chuyên mục khác.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900">
            Định hướng nội dung HỌC TẬP SỐ
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-green-900">
            <li>Kiến thức công nghệ thiết thực cho người dân và người lao động.</li>
            <li>Cập nhật Pi Network từ nguồn chính thức, hướng dẫn an toàn tài khoản và nhận biết lừa đảo.</li>
            <li>Thông tin tuyển sinh, học bổng, chương trình đào tạo từ nguồn giáo dục đáng tin cậy.</li>
            <li>Kiến thức khoa học, kỹ năng học tập, lao động và đời sống.</li>
            <li>Thông tin có nguồn, ngày đăng và đường dẫn tham khảo rõ ràng.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">
            Quy trình biên tập và xuất bản
          </h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-amber-900">
            <li>AI có thể hỗ trợ tìm hiểu và soạn bản nháp.</li>
            <li>Biên tập viên kiểm tra nội dung, nguồn tin và độ chính xác.</li>
            <li>Người có thẩm quyền xem trước và phê duyệt.</li>
            <li>Chỉ xuất bản sau khi được phê duyệt.</li>
            <li>Lưu lịch sử chỉnh sửa và thông tin người xuất bản.</li>
          </ol>

          <p className="mt-4 text-sm leading-6 text-amber-900">
            AI không được tự ý xuất bản, sửa hoặc xóa bài viết đã công bố.
            Tin tức từ nguồn bên ngoài phải được con người kiểm tra trước
            khi đăng tải.
          </p>
        </div>

        <p className="text-sm leading-6 text-slate-500">
          Lưu ý: Đây là giao diện thử nghiệm với dữ liệu minh họa,
          chưa kết nối nguồn tin trực tuyến, AI, Supabase hoặc hệ thống
          quản trị xuất bản.
        </p>
      </section>
    </main>
  );
}
