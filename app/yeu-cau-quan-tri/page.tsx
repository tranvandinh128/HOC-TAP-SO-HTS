
"use client";

import { useState } from "react";

const fields = [
  "Sinh viên",
  "Học sinh THPT",
  "Học sinh THCS",
  "Học sinh tiểu học",
  "Lực lượng vũ trang (Quân đội - Công an)",
];

export default function YeuCauQuanTriPage() {
  const [field, setField] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!field || !reason.trim()) {
      setMessage("Vui lòng chọn lĩnh vực và nhập lý do.");
      return;
    }

    setMessage(
      "Thông tin chỉ được kiểm tra trên giao diện. Yêu cầu chưa được gửi hoặc lưu; API quản trị phía máy chủ Cloudflare chưa được triển khai."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          YÊU CẦU QUYỀN QUẢN TRỊ
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Người học có thể gửi yêu cầu trở thành quản trị viên
          trong lĩnh vực mình đã đăng ký. Yêu cầu phải được
          Quản trị cấp cao xem xét và phê duyệt.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Lĩnh vực đề nghị quản trị
            </label>

            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
              required
            >
              <option value="">-- Chọn lĩnh vực --</option>
              {fields.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Lý do đề nghị cấp quyền
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              required
              placeholder="Trình bày kinh nghiệm, năng lực và lý do đề nghị..."
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            <strong>Lưu ý về phân quyền:</strong>
            <ul className="ml-5 list-disc">
              <li>Chỉ được đề nghị quản trị lĩnh vực đã đăng ký.</li>
              <li>Quản trị cấp cao là người duy nhất phê duyệt quyền.</li>
              <li>Người gửi chưa có quyền quản trị khi yêu cầu đang chờ duyệt.</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Kiểm tra thông tin yêu cầu
          </button>

          {message && (
            <p
              role="status"
              className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
