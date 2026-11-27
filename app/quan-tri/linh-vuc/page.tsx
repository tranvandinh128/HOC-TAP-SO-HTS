
"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_FIELDS = [
  {
    id: "cong-dan",
    name: "Công dân học tập",
    description: "Kiến thức phổ thông, kỹ năng sống và công nghệ cho người dân.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "cong-nhan",
    name: "Công nhân học tập",
    description: "Kiến thức nghề nghiệp, kỹ năng lao động và an toàn sản xuất.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "sinh-vien",
    name: "Sinh viên học tập",
    description: "Học liệu đại học, nghiên cứu và phát triển nghề nghiệp.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "thpt",
    name: "Học sinh THPT",
    description: "Chương trình học, ôn tập và luyện thi THPT.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "thcs",
    name: "Học sinh THCS",
    description: "Kiến thức và tài liệu học tập cấp trung học cơ sở.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "tieu-hoc",
    name: "Học sinh tiểu học",
    description: "Học liệu cơ bản và hoạt động giáo dục tiểu học.",
    accessPolicy: "public",
    status: "Đang hoạt động",
  },
  {
    id: "luc-luong-vu-trang",
    name: "Lực lượng vũ trang",
    description: "Học tập, huấn luyện và kiến thức dành cho Quân đội – Công an.",
    accessPolicy: "verified-membership",
    status: "Đang hoạt động",
  },
];

export default function LearningFieldsPage() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [keyword, setKeyword] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const selected = fields.find((field) => field.id === selectedField);

  function toggleStatus(id: string) {
    setFields((current) =>
      current.map((field) =>
        field.id === id
          ? {
              ...field,
              status:
                field.status === "Đang hoạt động"
                  ? "Tạm ngừng"
                  : "Đang hoạt động",
            }
          : field
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/quan-tri"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Quay lại trang quản trị
        </Link>

        <header className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-8 text-white">
          <div className="text-4xl">📚</div>
          <h1 className="mt-4 text-3xl font-bold">
            QUẢN LÝ LĨNH VỰC HỌC TẬP
          </h1>
          <p className="mt-3 max-w-3xl leading-6 text-blue-100">
            Theo dõi các nhóm học tập, nội dung, trạng thái hoạt động
            và phạm vi quản trị của từng lĩnh vực trong hệ thống HỌC TẬP SỐ.
          </p>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Tổng lĩnh vực</p>
            <p className="mt-2 text-3xl font-bold text-blue-800">
              {fields.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Đang hoạt động</p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {fields.filter((field) => field.status === "Đang hoạt động").length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Truy cập công khai</p>
            <p className="mt-2 text-3xl font-bold text-purple-700">
              {fields.filter((field) => field.accessPolicy === "public").length}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Danh sách 7 lĩnh vực
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tìm kiếm và kiểm tra thông tin từng nhóm học tập.
              </p>
            </div>

            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm lĩnh vực..."
              className="w-full rounded-lg border border-slate-300 p-3 sm:max-w-xs"
            />
          </div>

          <div className="mt-5 space-y-4">
            {filteredFields.map((field, index) => (
              <article
                key={field.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase text-blue-700">
                      Lĩnh vực {index + 1}
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {field.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {field.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {field.accessPolicy === "public"
                          ? "Không bắt buộc đăng nhập"
                          : "Cần membership được xác minh"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          field.status === "Đang hoạt động"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {field.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedField(field.id)}
                      className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Chi tiết
                    </button>

                    <button
                      onClick={() => toggleStatus(field.id)}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {field.status === "Đang hoạt động"
                        ? "Tạm ngừng"
                        : "Kích hoạt"}
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filteredFields.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                Không tìm thấy lĩnh vực phù hợp.
              </p>
            )}
          </div>
        </section>

        {selected && (
          <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-blue-950">
                Thông tin lĩnh vực
              </h2>

              <button
                onClick={() => setSelectedField(null)}
                className="rounded-lg border border-blue-300 px-3 py-2 text-sm text-blue-800"
              >
                Đóng
              </button>
            </div>

            <p className="mt-4 font-semibold text-slate-900">
              {selected.name}
            </p>

            <p className="mt-2 text-sm text-slate-700">
              Mã lĩnh vực: {selected.id}
            </p>

            <p className="mt-2 text-sm text-slate-700">
              Mô tả: {selected.description}
            </p>

            <p className="mt-2 text-sm text-slate-700">
              Trạng thái: {selected.status}
            </p>
          </section>
        )}

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            Lưu ý về phân quyền và dữ liệu
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900">
            Dữ liệu trong trang hiện là dữ liệu mẫu để xây dựng giao diện.
            Các thao tác thay đổi trạng thái chưa được lưu vào máy chủ.
            Khi triển khai thực tế, chỉ super_admin mới được thay đổi
            cấu hình lĩnh vực. Quyền truy cập phải được kiểm tra tại
            máy chủ cho mỗi request; D1 không được truy cập trực tiếp từ trình duyệt.
          </p>
        </section>

      </div>
    </main>
  );
}
