
"use client";

import { useState } from "react";

const learningFields = [
  { value: "cong-dan", label: "Công dân học tập" },
  { value: "cong-nhan", label: "Công nhân học tập" },
  { value: "sinh-vien", label: "Sinh viên học tập" },
  { value: "thpt", label: "Học sinh THPT" },
  { value: "thcs", label: "Học sinh THCS" },
  { value: "tieu-hoc", label: "Học sinh tiểu học" },
  { value: "luc-luong-vu-trang", label: "Lực lượng vũ trang" },
];

export default function AIBienTapPage() {
  const [field, setField] = useState("cong-dan");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <p className="text-sm text-blue-600 font-medium">
            QUẢN TRỊ HỆ THỐNG / BIÊN TẬP NỘI DUNG
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            AI hỗ trợ biên tập
          </h1>
          <p className="mt-2 text-gray-600">
            Công cụ hỗ trợ xây dựng, chỉnh sửa và chuẩn bị nội dung
            học tập cho các lĩnh vực của HỌC TẬP SỐ.
          </p>
        </div>

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <h2 className="font-semibold text-amber-900">
            Lưu ý về quy trình biên tập
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            Nội dung do AI hỗ trợ chỉ là bản dự thảo. Người biên tập
            phải kiểm tra thông tin, nguồn trích dẫn và chịu trách nhiệm
            trước khi gửi duyệt. AI không có quyền phê duyệt hoặc
            tự động xuất bản bài viết.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <section className="space-y-5 rounded-xl border bg-white p-5 lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900">
              1. Thông tin bài viết
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Lĩnh vực học tập
              </label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              >
                {learningFields.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tiêu đề bài viết
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Chủ đề hoặc yêu cầu biên tập
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={5}
                placeholder="Mô tả chủ đề, đối tượng đọc và nội dung cần triển khai..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nguồn tham khảo
              </label>
              <textarea
                value={source}
                onChange={(e) => setSource(e.target.value)}
                rows={3}
                placeholder="Dán đường link hoặc thông tin nguồn tham khảo..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Ghi chú cho người biên tập
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Yêu cầu kiểm chứng, lưu ý nội dung..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              <strong>Trạng thái:</strong> Chức năng AI đang trong
              giai đoạn chuẩn bị giao diện, chưa kết nối dịch vụ AI.
            </div>

            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-4 py-3 font-semibold text-gray-600"
            >
              ✨ Tạo bản nháp bằng AI (chưa kích hoạt)
            </button>
          </section>

          <section className="space-y-5 rounded-xl border bg-white p-5 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                2. Nội dung biên tập
              </h2>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    !showPreview
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Chỉnh sửa
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    showPreview
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Xem trước
                </button>
              </div>
            </div>

            {showPreview ? (
              <article className="min-h-[420px] rounded-lg border bg-gray-50 p-5">
                <p className="mb-3 text-sm text-blue-600">
                  {learningFields.find((item) => item.value === field)?.label}
                </p>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {title || "Tiêu đề bài viết"}
                </h3>
                <div className="whitespace-pre-wrap leading-7 text-gray-700">
                  {content || "Nội dung bài viết sẽ hiển thị tại đây."}
                </div>
              </article>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nội dung bài viết
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  placeholder="Nhập hoặc chỉnh sửa nội dung bài viết tại đây..."
                  className="w-full rounded-lg border border-gray-300 p-4 text-sm leading-7"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Bạn có thể nhập nội dung thủ công hoặc chỉnh sửa bản
                  nháp sau khi chức năng AI được tích hợp.
                </p>
              </div>
            )}

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">
                3. Kiểm tra trước khi gửi duyệt
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>□ Đã kiểm tra tính chính xác của thông tin.</li>
                <li>□ Đã kiểm tra nguồn tham khảo và đường dẫn.</li>
                <li>□ Đã rà soát lỗi chính tả và cách trình bày.</li>
                <li>□ Đã kiểm tra nội dung phù hợp với lĩnh vực.</li>
                <li>□ Đã bảo đảm quyền sử dụng tài liệu, hình ảnh.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setTopic("");
                  setSource("");
                  setContent("");
                  setNotes("");
                  setShowPreview(false);
                }}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Xóa nội dung nhập
              </button>

              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg bg-gray-300 px-5 py-3 text-sm font-semibold text-gray-600"
              >
                Gửi duyệt (chưa kích hoạt)
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Giao diện hiện chưa lưu dữ liệu lên máy chủ. Chức năng
              lưu bản nháp, gửi duyệt, lịch sử chỉnh sửa và phân quyền
              sẽ được triển khai sau khi hoàn thiện thiết kế và kiểm tra
              bảo mật.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
