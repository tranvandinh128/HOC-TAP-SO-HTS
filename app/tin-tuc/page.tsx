
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    slug: "ung-dung-cong-nghe-so-trong-hoc-tap",
    title: "Ứng dụng công nghệ số trong học tập và đời sống",
    category: "Công nghệ",
    date: "Tin mẫu",
    description:
      "Tìm hiểu cách ứng dụng công nghệ số để nâng cao hiệu quả học tập, làm việc và tiếp cận tri thức.",
    icon: "💻",
  },
  {
    id: 2,
    slug: "ky-nang-hoc-tap-suot-doi",
    title: "Phát triển kỹ năng học tập suốt đời",
    category: "Giáo dục",
    date: "Tin mẫu",
    description:
      "Những phương pháp giúp mỗi người chủ động học tập, cập nhật kiến thức và phát triển bản thân.",
    icon: "📚",
  },
  {
    id: 3,
    slug: "kien-thuc-khoa-hoc-va-doi-song",
    title: "Kiến thức khoa học thiết thực trong đời sống",
    category: "Khoa học",
    date: "Tin mẫu",
    description:
      "Chia sẻ kiến thức khoa học, kinh nghiệm và giải pháp hữu ích phục vụ cộng đồng.",
    icon: "🔬",
  },
  {
    id: 4,
    slug: "ky-nang-nghe-nghiep-va-viec-lam",
    title: "Nâng cao kỹ năng nghề nghiệp và việc làm",
    category: "Đời sống",
    date: "Tin mẫu",
    description:
      "Cập nhật kỹ năng thực hành, tác phong làm việc và kiến thức nghề nghiệp.",
    icon: "🛠️",
  },
  {
    id: 5,
    slug: "kien-thuc-an-toan-tren-khong-gian-mang",
    title: "Kỹ năng an toàn trên không gian mạng",
    category: "Công nghệ",
    date: "Tin mẫu",
    description:
      "Nhận biết nguy cơ lừa đảo, bảo vệ tài khoản và dữ liệu cá nhân khi sử dụng Internet.",
    icon: "🔐",
  },
  {
    id: 6,
    slug: "hoat-dong-hoc-tap-cong-dong",
    title: "Hoạt động học tập và chia sẻ tri thức cộng đồng",
    category: "Sự kiện",
    date: "Tin mẫu",
    description:
      "Giới thiệu các hoạt động học tập, trao đổi kinh nghiệm và lan tỏa giá trị tích cực.",
    icon: "🤝",
  },
];

const categories = [
  "Tất cả",
  "Công nghệ",
  "Giáo dục",
  "Khoa học",
  "Đời sống",
  "Sự kiện",
];

export default function TinTucPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tất cả" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            TIN TỨC – SỰ KIỆN
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Cập nhật kiến thức công nghệ, giáo dục, khoa học,
            đời sống và các hoạt động học tập cộng đồng.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Khám phá tin tức
        </h2>

        <p className="mb-7 text-slate-600">
          Tìm kiếm và lựa chọn nội dung theo chủ đề bạn quan tâm.
        </p>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Nhập nội dung cần tìm..."
          className="mb-6 w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-green-700 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-green-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            Danh sách tin tức
          </h3>

          <span className="text-sm text-slate-500">
            {filteredNews.length} bài viết
          </span>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center bg-green-50 text-6xl">
                  {item.icon}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {item.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold leading-7 text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <Link
                    href={`/tin-tuc/${item.slug}`}
                    className="mt-5 inline-block font-semibold text-green-700 hover:underline"
                  >
                    Đọc bài viết →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-10 text-center text-slate-600">
            Không tìm thấy tin tức phù hợp.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-xl border border-green-100 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-900">
            Tri thức mới – Giá trị mới
          </h2>

          <p className="mt-3 leading-7 text-green-800">
            HỌC TẬP SỐ hướng tới chia sẻ thông tin hữu ích,
            cập nhật kiến thức và xây dựng cộng đồng học tập tích cực.
          </p>
        </div>
      </section>
    </main>
  );
}
