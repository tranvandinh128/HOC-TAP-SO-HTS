
"use client";

import { useMemo, useState } from "react";

type Resource = {
  id: number;
  title: string;
  description: string;
  group: string;
  type: string;
  level: string;
  format: string;
};

const groups = [
  "Tất cả lĩnh vực",
  "Công dân học tập",
  "Công nhân học tập",
  "Sinh viên học tập",
  "Học sinh THPT",
  "Học sinh THCS",
  "Học sinh tiểu học",
  "Lực lượng vũ trang (Quân đội – Công an)",
];

const resources: Resource[] = [
  {
    id: 1,
    title: "Kỹ năng sử dụng Internet an toàn",
    description:
      "Hướng dẫn nhận biết thông tin không đáng tin cậy, bảo vệ tài khoản và sử dụng Internet an toàn.",
    group: "Công dân học tập",
    type: "Tài liệu",
    level: "Cơ bản",
    format: "PDF",
  },
  {
    id: 2,
    title: "Kỹ năng ứng dụng công nghệ trong công việc",
    description:
      "Giới thiệu các kỹ năng số thiết thực hỗ trợ người lao động trong môi trường làm việc hiện đại.",
    group: "Công nhân học tập",
    type: "Bài giảng",
    level: "Cơ bản",
    format: "Nội dung số",
  },
  {
    id: 3,
    title: "Phương pháp nghiên cứu khoa học",
    description:
      "Tài liệu tham khảo về cách tìm kiếm, phân tích và trình bày thông tin trong học tập.",
    group: "Sinh viên học tập",
    type: "Tài liệu",
    level: "Nâng cao",
    format: "PDF",
  },
  {
    id: 4,
    title: "Ôn tập kiến thức Toán học THPT",
    description:
      "Hệ thống kiến thức và bài tập ôn tập dành cho học sinh trung học phổ thông.",
    group: "Học sinh THPT",
    type: "Bài tập",
    level: "Trung bình",
    format: "Tài liệu số",
  },
  {
    id: 5,
    title: "Kỹ năng tự học và đọc hiểu",
    description:
      "Phương pháp đọc hiểu, ghi nhớ và tự ôn tập kiến thức dành cho học sinh THCS.",
    group: "Học sinh THCS",
    type: "Bài giảng",
    level: "Cơ bản",
    format: "Nội dung số",
  },
  {
    id: 6,
    title: "Làm quen với máy tính",
    description:
      "Giới thiệu các thao tác cơ bản khi sử dụng máy tính và thiết bị học tập số.",
    group: "Học sinh tiểu học",
    type: "Video",
    level: "Cơ bản",
    format: "Video",
  },
  {
    id: 7,
    title: "Kiến thức chuyển đổi số trong lực lượng vũ trang",
    description:
      "Tài liệu tham khảo về kỹ năng số và ứng dụng công nghệ trong công tác, học tập.",
    group: "Lực lượng vũ trang (Quân đội – Công an)",
    type: "Tài liệu",
    level: "Nâng cao",
    format: "PDF",
  },
];

const resourceTypes = [
  "Tất cả loại học liệu",
  "Tài liệu",
  "Bài giảng",
  "Video",
  "Bài tập",
];

export default function ThuVienPage() {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [selectedType, setSelectedType] = useState(resourceTypes[0]);
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesGroup =
        selectedGroup === groups[0] ||
        resource.group === selectedGroup;

      const matchesType =
        selectedType === resourceTypes[0] ||
        resource.type === selectedType;

      const matchesSearch =
        !keyword ||
        resource.title.toLowerCase().includes(keyword) ||
        resource.description.toLowerCase().includes(keyword);

      return matchesGroup && matchesType && matchesSearch;
    });
  }, [selectedGroup, selectedType, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-900 to-emerald-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            THƯ VIỆN HỌC LIỆU SỐ
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-green-50">
            Kho tài liệu, bài giảng, video và học liệu tham khảo.
            Kết nối tri thức, hỗ trợ học tập và phát triển kỹ năng
            cho mọi đối tượng trong cộng đồng.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lĩnh vực học tập</p>
            <p className="mt-2 text-3xl font-bold text-green-700">07</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Học liệu mẫu</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">
              {resources.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Kết quả phù hợp</p>
            <p className="mt-2 text-3xl font-bold text-purple-700">
              {filteredResources.length}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Tìm kiếm học liệu
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="library-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Từ khóa
              </label>

              <input
                id="library-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nhập tên tài liệu..."
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="library-group"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Lĩnh vực
              </label>

              <select
                id="library-group"
                value={selectedGroup}
                onChange={(event) => setSelectedGroup(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white p-3"
              >
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="library-type"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Loại học liệu
              </label>

              <select
                id="library-type"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white p-3"
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-800">
              Danh mục học liệu
            </h2>

            <span className="text-sm text-slate-500">
              {filteredResources.length} học liệu
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <article
                  key={resource.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {resource.type}
                    </span>

                    <span className="text-xs text-slate-500">
                      {resource.format}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    {resource.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {resource.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <p>Lĩnh vực: {resource.group}</p>
                    <p>Trình độ: {resource.level}</p>
                  </div>

                  <button
                    type="button"
                    disabled
                    title="Chức năng mở học liệu sẽ được kết nối sau"
                    className="mt-5 w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
                  >
                    Chưa có tệp học liệu
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-semibold text-slate-700">
                Không tìm thấy học liệu phù hợp.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Hãy thay đổi từ khóa hoặc lựa chọn danh mục khác.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900">
            Nguyên tắc quản lý thư viện
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-blue-900">
            <li>
              Học liệu được phân loại theo 7 lĩnh vực học tập của HTS.
            </li>
            <li>
              Tài liệu phải có nguồn gốc rõ ràng và được kiểm tra trước khi công bố.
            </li>
            <li>
              Chỉ quản trị viên có thẩm quyền mới được đăng tải,
              chỉnh sửa hoặc gỡ bỏ học liệu.
            </li>
            <li>
              Phân quyền truy cập theo lĩnh vực đã đăng ký của tài khoản.
            </li>
            <li>
              Bảo đảm quyền tác giả, quyền riêng tư và an toàn thông tin.
            </li>
          </ul>
        </div>

        <p className="text-sm leading-6 text-slate-500">
          Lưu ý: Đây là giao diện thử nghiệm với dữ liệu minh họa.
          Chưa kết nối kho tệp, Supabase Storage hoặc chức năng tải
          và xem tài liệu thực tế.
        </p>
      </section>
    </main>
  );
}
