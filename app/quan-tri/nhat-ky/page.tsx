
"use client";

import { useState } from "react";

type LogItem = {
  id: number;
  time: string;
  actor: string;
  action: string;
  target: string;
  result: "success" | "rejected" | "warning";
};

const initialLogs: LogItem[] = [
  {
    id: 1,
    time: "23/11/2026 08:30",
    actor: "Quản trị cấp cao",
    action: "Phê duyệt quyền quản trị",
    target: "Lĩnh vực Sinh viên",
    result: "success",
  },
  {
    id: 2,
    time: "23/11/2026 09:15",
    actor: "Quản trị cấp cao",
    action: "Từ chối yêu cầu quản trị",
    target: "Lĩnh vực Học sinh THPT",
    result: "rejected",
  },
  {
    id: 3,
    time: "23/11/2026 10:00",
    actor: "Quản trị cấp cao",
    action: "Thay đổi quyền tài khoản",
    target: "Tài khoản minh họa",
    result: "warning",
  },
];

export default function AdminActivityLogPage() {
  const [filter, setFilter] = useState("all");

  const filteredLogs =
    filter === "all"
      ? initialLogs
      : initialLogs.filter((log) => log.result === filter);

  function resultLabel(result: LogItem["result"]) {
    if (result === "success") return "Thành công (minh họa)";
    if (result === "rejected") return "Đã từ chối (minh họa)";
    return "Cần kiểm tra (minh họa)";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          NHẬT KÝ HOẠT ĐỘNG QUẢN TRỊ
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Theo dõi lịch sử thao tác của người quản trị trên
          nền tảng HỌC TẬP SỐ. Nhật ký phục vụ công tác kiểm tra,
          giám sát và bảo đảm an toàn phân quyền.
        </p>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          <strong>Quy định:</strong>
          Chỉ Quản trị cấp cao được xem toàn bộ nhật ký quản trị.
          Quản trị viên cấp thấp không được sửa hoặc xóa nhật ký.
        </div>

        <div className="mt-8">
          <label
            htmlFor="log-filter"
            className="mb-2 block font-medium text-slate-700"
          >
            Lọc kết quả hoạt động
          </label>

          <select
            id="log-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-slate-300 p-3"
          >
            <option value="all">Tất cả hoạt động</option>
            <option value="success">Thành công</option>
            <option value="rejected">Đã từ chối</option>
            <option value="warning">Cần kiểm tra</option>
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {filteredLogs.length === 0 ? (
            <p className="rounded-lg bg-slate-100 p-5 text-slate-600">
              Không có hoạt động phù hợp.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <article
                key={log.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-semibold text-slate-800">
                    {log.action}
                  </h2>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {resultLabel(log.result)}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>Thời gian: {log.time}</p>
                  <p>Người thực hiện: {log.actor}</p>
                  <p>Đối tượng: {log.target}</p>
                  <p>Mã nhật ký: HTS-LOG-{log.id}</p>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Lưu ý kỹ thuật:</strong>
          <ul className="ml-5 mt-2 list-disc">
            <li>Dữ liệu hiện tại chỉ là dữ liệu minh họa.</li>
            <li>Chưa kết nối API nhật ký hoặc lưu sự kiện vào D1.</li>
            <li>Nhật ký thật cần ghi nhận người thao tác, thời gian,
              hành động, đối tượng và kết quả.</li>
            <li>Không cho phép người dùng tự sửa hoặc xóa lịch sử.</li>
            <li>Quyền xem nhật ký phải được xác thực ở phía máy chủ
              và cơ sở dữ liệu.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
