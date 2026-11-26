
"use client";

import { useMemo, useState } from "react";

type ContentStatus = "Bản nháp" | "Chờ duyệt" | "Đã xuất bản" | "Từ chối";

type ContentItem = {
  id: number;
  title: string;
  category: string;
  author: string;
  status: ContentStatus;
  source: string;
  updatedAt: string;
};

const initialContents: ContentItem[] = [
  {
    id: 1,
    title: "Kỹ năng sử dụng công nghệ số an toàn",
    category: "Công dân học tập",
    author: "Ban biên tập",
    status: "Chờ duyệt",
    source: "Nội dung biên soạn",
    updatedAt: "23/11/2026",
  },
  {
    id: 2,
    title: "Ứng dụng công nghệ trong học tập",
    category: "Sinh viên học tập",
    author: "Cộng tác viên",
    status: "Bản nháp",
    source: "Tham khảo AI",
    updatedAt: "23/11/2026",
  },
  {
    id: 3,
    title: "Kỹ năng học tập suốt đời",
    category: "Công nhân học tập",
    author: "Ban biên tập",
    status: "Đã xuất bản",
    source: "Nội dung biên soạn",
    updatedAt: "22/11/2026",
  },
];

const statusStyles: Record<ContentStatus, string> = {
  "Bản nháp": "bg-slate-100 text-slate-700",
  "Chờ duyệt": "bg-amber-100 text-amber-800",
  "Đã xuất bản": "bg-emerald-100 text-emerald-800",
  "Từ chối": "bg-red-100 text-red-800",
};

export default function ContentManagementPage() {
  const [contents, setContents] = useState(initialContents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [notice, setNotice] = useState("");

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Tất cả" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contents, search, statusFilter]);

  function updateStatus(id: number, status: ContentStatus) {
    setContents((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toLocaleDateString("vi-VN") }
          : item
      )
    );

    setSelected(null);
    setNotice(
      `Đã cập nhật trạng thái thử nghiệm thành "${status}". Dữ liệu hiện chưa được lưu vào máy chủ.`
    );
  }

  const countByStatus = (status: ContentStatus) =>
    contents.filter((item) => item.status === status).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl bg-gradient-to-r from-slate-950 to-blue-800 p-7 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            HỌC TẬP SỐ · Hệ thống quản trị
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            QUẢN TRỊ NỘI DUNG
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-blue-100">
            Quản lý bài viết, tin tức, tài liệu và quy trình biên tập,
            kiểm duyệt, xuất bản nội dung trên nền tảng HỌC TẬP SỐ.
          </p>
        </header>

        {notice && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
          >
            {notice}
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["Tổng nội dung", contents.length, "bg-blue-50"],
              ["Bản nháp", countByStatus("Bản nháp"), "bg-slate-100"],
              ["Chờ duyệt", countByStatus("Chờ duyệt"), "bg-amber-50"],
              ["Đã xuất bản", countByStatus("Đã xuất bản"), "bg-emerald-50"],
            ] as const
          ).map(([label, value, color]) => (
            <div key={label} className={`rounded-xl border p-5 ${color}`}>
              <p className="text-sm text-slate-600">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Danh sách nội dung
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tìm kiếm và theo dõi tình trạng xử lý bài viết.
              </p>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tiêu đề hoặc lĩnh vực..."
              className="w-full rounded-lg border p-3 text-sm lg:max-w-sm"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Tất cả", "Bản nháp", "Chờ duyệt", "Đã xuất bản", "Từ chối"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    statusFilter === status
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3">Tiêu đề</th>
                  <th className="p-3">Lĩnh vực</th>
                  <th className="p-3">Người tạo</th>
                  <th className="p-3">Nguồn</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Cập nhật</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredContents.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {item.title}
                    </td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.author}</td>
                    <td className="p-3">{item.source}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">{item.updatedAt}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelected(item)}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        Xử lý
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredContents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-slate-500"
                    >
                      Không tìm thấy nội dung phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <section className="mt-6 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Xử lý nội dung
                </h2>
                <p className="mt-2 font-semibold">{selected.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {selected.category} · {selected.source}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                Đóng
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(selected.id, "Bản nháp")}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold"
              >
                Lưu bản nháp
              </button>
              <button
                onClick={() => updateStatus(selected.id, "Chờ duyệt")}
                className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900"
              >
                Chuyển chờ duyệt
              </button>
              <button
                onClick={() => updateStatus(selected.id, "Đã xuất bản")}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Đánh dấu đã xuất bản
              </button>
              <button
                onClick={() => updateStatus(selected.id, "Từ chối")}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-800"
              >
                Từ chối
              </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-amber-800">
              Lưu ý: Các thao tác trên chỉ minh họa giao diện. Khi kết nối
              chính thức, hệ thống phải xác minh quyền super_admin hoặc
              field_admin, lĩnh vực được giao và ghi nhật ký kiểm duyệt
              trên máy chủ. AI không được tự xuất bản nội dung.
            </p>
          </section>
        )}

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            Nguyên tắc quản trị nội dung
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
            <li>Quản trị viên chỉ xử lý nội dung trong lĩnh vực được giao.</li>
            <li>AI chỉ nghiên cứu, đề xuất và tạo bản nháp.</li>
            <li>Nội dung từ nguồn bên ngoài phải được con người kiểm tra.</li>
            <li>Chỉ người có thẩm quyền mới được duyệt và xuất bản.</li>
            <li>Lưu lịch sử chỉnh sửa, người thực hiện và thời điểm thao tác.</li>
            <li>Không cho phép người dùng tự nâng cấp quyền quản trị.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
