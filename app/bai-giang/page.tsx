
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const learningGroups = [
  {
    id: "cong-dan",
    name: "Công dân học tập",
    description: "Kiến thức thiết thực phục vụ đời sống và cộng đồng.",
    icon: "🌱",
    access: "Miễn phí – Không cần đăng nhập",
  },
  {
    id: "cong-nhan",
    name: "Công nhân học tập",
    description: "Kiến thức nghề nghiệp, kỹ năng và an toàn lao động.",
    icon: "🏭",
    access: "Miễn phí – Không cần đăng nhập",
  },
  {
    id: "sinh-vien",
    name: "Sinh viên học tập",
    description: "Kiến thức chuyên ngành, kỹ năng và nghiên cứu.",
    icon: "🎓",
    access: "Cần đăng nhập",
  },
  {
    id: "thpt",
    name: "Học sinh THPT",
    description: "Bài giảng và kiến thức dành cho học sinh THPT.",
    icon: "📚",
    access: "Cần đăng nhập",
  },
  {
    id: "thcs",
    name: "Học sinh THCS",
    description: "Hệ thống bài học phù hợp chương trình THCS.",
    icon: "📖",
    access: "Cần đăng nhập",
  },
  {
    id: "tieu-hoc",
    name: "Học sinh tiểu học",
    description: "Bài học cơ bản, trực quan và dễ tiếp cận.",
    icon: "✏️",
    access: "Cần đăng nhập",
  },
  {
    id: "luc-luong-vu-trang",
    name: "Lực lượng vũ trang",
    description: "Kiến thức học tập và bồi dưỡng trong lực lượng vũ trang.",
    icon: "🛡️",
    access: "Cần đăng nhập",
  },
];

export default function BaiGiangPage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("tat-ca");

  const filteredGroups = useMemo(() => {
    return learningGroups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.description.toLowerCase().includes(search.toLowerCase());

      const matchesGroup =
        selectedGroup === "tat-ca" || group.id === selectedGroup;

      return matchesSearch && matchesGroup;
    });
  }, [search, selectedGroup]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            HỆ THỐNG BÀI GIẢNG
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Kết nối tri thức, phát triển kỹ năng và hỗ trợ học tập
            suốt đời cho mọi đối tượng trong cộng đồng.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Khám phá lĩnh vực học tập
          </h2>

          <p className="mt-2 text-slate-600">
            Lựa chọn lĩnh vực phù hợp với nhu cầu học tập của bạn.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm kiếm lĩnh vực học tập..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
          />

          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
          >
            <option value="tat-ca">Tất cả lĩnh vực</option>
            {learningGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {filteredGroups.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <article
                key={group.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 text-4xl" aria-hidden="true">
                  {group.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-800">
                  {group.name}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                  {group.description}
                </p>

                <p className="mt-4 text-xs font-semibold text-green-700">
                  {group.access}
                </p>

                <Link
                  href={`/hoc-tap/${group.id}`}
                  className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Xem lĩnh vực →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center text-slate-600">
            Không tìm thấy lĩnh vực phù hợp.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-900">
            Học tập mọi lúc, mọi nơi
          </h2>

          <p className="mt-3 leading-7 text-green-800">
            Hệ thống hướng tới xây dựng môi trường học tập số,
            chia sẻ tri thức và phát triển năng lực cho cộng đồng.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block font-semibold text-green-800 hover:underline"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
