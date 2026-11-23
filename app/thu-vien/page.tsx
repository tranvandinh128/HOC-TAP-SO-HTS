
"use client";

import { useMemo, useState } from "react";

const resources = [
  {
    id: 1,
    title: "Tài liệu kiến thức công nghệ số",
    group: "cong-dan",
    type: "Tài liệu PDF",
    description: "Kiến thức công nghệ thiết thực phục vụ người dân.",
    icon: "💻",
  },
  {
    id: 2,
    title: "Kỹ năng và an toàn lao động",
    group: "cong-nhan",
    type: "Tài liệu học tập",
    description: "Kiến thức nghề nghiệp và kỹ năng an toàn lao động.",
    icon: "🏭",
  },
  {
    id: 3,
    title: "Tài liệu nghiên cứu và học thuật",
    group: "sinh-vien",
    type: "Tài liệu PDF",
    description: "Tài liệu tham khảo dành cho sinh viên.",
    icon: "🎓",
  },
  {
    id: 4,
    title: "Tài liệu ôn tập THPT",
    group: "thpt",
    type: "Giáo trình",
    description: "Tài liệu hỗ trợ học tập và ôn thi THPT.",
    icon: "📚",
  },
  {
    id: 5,
    title: "Tài liệu học tập THCS",
    group: "thcs",
    type: "Bài đọc",
    description: "Kiến thức và tài liệu dành cho học sinh THCS.",
    icon: "📖",
  },
  {
    id: 6,
    title: "Tài liệu học tập tiểu học",
    group: "tieu-hoc",
    type: "Tài liệu học tập",
    description: "Tài liệu trực quan dành cho học sinh tiểu học.",
    icon: "✏️",
  },
  {
    id: 7,
    title: "Tài liệu bồi dưỡng lực lượng vũ trang",
    group: "luc-luong-vu-trang",
    type: "Tài liệu chuyên đề",
    description: "Tài liệu học tập và bồi dưỡng theo phạm vi được phép.",
    icon: "🛡️",
  },
];

const groupNames: Record<string, string> = {
  "cong-dan": "Công dân",
  "cong-nhan": "Công nhân",
  "sinh-vien": "Sinh viên",
  thpt: "THPT",
  thcs: "THCS",
  "tieu-hoc": "Tiểu học",
  "luc-luong-vu-trang": "Lực lượng vũ trang",
};

export default function ThuVienPage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("tat-ca");
  const [selectedType, setSelectedType] = useState("tat-ca");

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesGroup =
        selectedGroup === "tat-ca" || item.group === selectedGroup;

      const matchesType =
        selectedType === "tat-ca" || item.type === selectedType;

      return matchesSearch && matchesGroup && matchesType;
    });
  }, [search, selectedGroup, selectedType]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            THƯ VIỆN SỐ
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Kho tài liệu, giáo trình, video và tài nguyên tham khảo
            phục vụ học tập, nghiên cứu và phát triển tri thức.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Khám phá tài nguyên học tập
        </h2>

        <p className="mb-7 text-slate-600">
          Tìm kiếm và lựa chọn tài liệu theo lĩnh vực phù hợp.
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nhập tên tài liệu cần tìm..."
            className="rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
          />

          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
          >
            <option value="tat-ca">Tất cả lĩnh vực</option>
            {Object.entries(groupNames).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
          >
            <option value="tat-ca">Tất cả loại tài liệu</option>
            <option value="Tài liệu PDF">Tài liệu PDF</option>
            <option value="Tài liệu học tập">Tài liệu học tập</option>
            <option value="Giáo trình">Giáo trình</option>
            <option value="Bài đọc">Bài đọc</option>
            <option value="Tài liệu chuyên đề">Tài liệu chuyên đề</option>
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            Danh sách tài nguyên
          </h3>

          <span className="text-sm text-slate-500">
            {filteredResources.length} tài nguyên
          </span>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 text-4xl" aria-hidden="true">
                  {item.icon}
                </div>

                <span className="text-xs font-semibold text-green-700">
                  {groupNames[item.group]}
                </span>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <span className="text-sm text-slate-500">
                    Loại: {item.type}
                  </span>

                  <p className="mt-3 text-xs text-amber-700">
                    Tài nguyên mẫu – Chưa có tệp tải xuống.
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-10 text-center text-slate-600">
            Không tìm thấy tài liệu phù hợp.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-xl border border-green-100 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-900">
            Chia sẻ tri thức – Lan tỏa giá trị học tập
          </h2>

          <p className="mt-3 leading-7 text-green-800">
            Thư viện HTS hướng tới xây dựng kho tài nguyên số
            phục vụ cộng đồng học tập và học tập suốt đời.
          </p>
        </div>
      </section>
    </main>
  );
}
