
"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminRenewalPage() {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("5");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reason.trim()) {
      setMessage("Vui lòng nhập lý do xin gia hạn.");
      return;
    }

    const request = {
      id: crypto.randomUUID(),
      type: "admin_permission_renewal",
      requestedDays: Number(duration),
      reason: reason.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const requests = JSON.parse(
        localStorage.getItem("hts_admin_renewal_requests") || "[]"
      );

      localStorage.setItem(
        "hts_admin_renewal_requests",
        JSON.stringify([...requests, request])
      );

      setMessage(
        "Yêu cầu đã được lưu tạm trên trình duyệt. Chưa gửi đến quản trị viên cấp cao."
      );

      setReason("");
    } catch {
      setMessage("Không thể lưu yêu cầu. Vui lòng thử lại.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/quan-tri"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Quay lại trang quản trị
        </Link>

        <header className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-8 text-white">
          <div className="text-4xl">⏳</div>
          <h1 className="mt-4 text-3xl font-bold">
            GIA HẠN QUYỀN QUẢN TRỊ
          </h1>
          <p className="mt-3 leading-6 text-blue-100">
            Gửi yêu cầu để tiếp tục sử dụng các chức năng quản trị
            thuộc lĩnh vực được giao.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quy định gia hạn
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
            <li>
              Quyền quản trị được cấp theo từng chu kỳ 5 ngày.
            </li>
            <li>
              Khi hết hạn, tài khoản cá nhân vẫn được giữ nguyên,
              nhưng các chức năng quản trị sẽ tạm khóa.
            </li>
            <li>
              Người quản trị được gửi yêu cầu gia hạn quyền.
            </li>
            <li>
              Chỉ super_admin được phê duyệt hoặc từ chối yêu cầu.
            </li>
            <li>
              Khi được phê duyệt, quyền quản trị được gia hạn thêm
              5 ngày.
            </li>
            <li>
              Nếu bị từ chối, người gửi cần liên hệ quản trị viên
              cấp cao để được hướng dẫn.
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Gửi yêu cầu gia hạn
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Thời gian đề nghị
              </label>

              <select
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
              >
                <option value="5">Gia hạn thêm 5 ngày</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Lý do xin gia hạn
              </label>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={5}
                required
                placeholder="Nhập lý do và nội dung công việc cần tiếp tục thực hiện..."
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Gửi yêu cầu gia hạn
            </button>
          </form>

          {message && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
            >
              {message}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-bold text-blue-950">
            Liên hệ quản trị viên cấp cao
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-700">
            Email tiếp nhận yêu cầu:
          </p>

          <a
            href="mailto:tranvandinh1281984@gmail.com"
            className="mt-1 inline-block break-all font-semibold text-blue-700"
          >
            tranvandinh1281984@gmail.com
          </a>

          <p className="mt-3 text-sm leading-6 text-slate-700">
            Trường hợp yêu cầu bị từ chối, vui lòng liên hệ:
            <strong> 0961256384</strong>.
          </p>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Hệ thống HỌC TẬP SỐ – Quản lý quyền truy cập và quản trị
          theo từng lĩnh vực.
        </p>

      </div>
    </main>
  );
}
