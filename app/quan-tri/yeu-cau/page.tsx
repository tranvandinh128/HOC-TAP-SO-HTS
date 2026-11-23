
"use client";

import { useState } from "react";

type RequestStatus = "pending" | "approved" | "rejected";

type AdminRequest = {
  id: number;
  name: string;
  email: string;
  field: string;
  reason: string;
  status: RequestStatus;
};

const initialRequests: AdminRequest[] = [
  {
    id: 1,
    name: "Người dùng minh họa",
    email: "example@email.com",
    field: "Sinh viên",
    reason: "Đề nghị được tham gia quản lý nội dung học tập.",
    status: "pending",
  },
];

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [notice, setNotice] = useState("");

  function updateStatus(id: number, status: RequestStatus) {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setNotice(
      "Đã thay đổi trạng thái minh họa trên giao diện. Chưa lưu vào cơ sở dữ liệu."
    );
  }

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">
            QUẢN LÝ YÊU CẦU CẤP QUYỀN QUẢN TRỊ
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            Khu vực dành riêng cho Quản trị cấp cao (Super Admin)
            xem xét, phê duyệt hoặc từ chối yêu cầu trở thành
            quản trị viên cấp thấp theo từng lĩnh vực học tập.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700">Tổng yêu cầu</p>
              <p className="mt-1 text-2xl font-bold text-blue-900">
                {requests.length}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Chờ duyệt</p>
              <p className="mt-1 text-2xl font-bold text-amber-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-green-700">Đã phê duyệt</p>
              <p className="mt-1 text-2xl font-bold text-green-900">
                {requests.filter((r) => r.status === "approved").length}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Danh sách yêu cầu
            </h2>

            {requests.length === 0 ? (
              <p className="rounded-lg bg-slate-100 p-5 text-slate-600">
                Hiện chưa có yêu cầu cấp quyền quản trị.
              </p>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <article
                    key={request.id}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-800">
                        {request.name}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                        {request.status === "pending"
                          ? "Chờ duyệt"
                          : request.status === "approved"
                            ? "Đã phê duyệt (minh họa)"
                            : "Đã từ chối (minh họa)"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <p>Email: {request.email}</p>
                      <p>Lĩnh vực: {request.field}</p>
                      <p>Lý do: {request.reason}</p>
                    </div>

                    {request.status === "pending" && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(request.id, "approved")
                          }
                          className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800"
                        >
                          Phê duyệt (thử nghiệm)
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(request.id, "rejected")
                          }
                          className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800"
                        >
                          Từ chối (thử nghiệm)
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {notice && (
            <p className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              {notice}
            </p>
          )}

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Lưu ý quan trọng:</strong>
            <ul className="ml-5 mt-2 list-disc">
              <li>Chỉ Quản trị cấp cao được phép xét duyệt yêu cầu.</li>
              <li>Quản trị viên cấp thấp không được tự cấp quyền cho mình hoặc người khác.</li>
              <li>Quyền quản trị chỉ có hiệu lực sau khi được xác thực và lưu thành công vào Supabase.</li>
              <li>Phải ghi nhật ký người duyệt, thời gian và kết quả xét duyệt.</li>
            </ul>
            <p className="mt-3 font-semibold">
              Đây là giao diện thử nghiệm với dữ liệu minh họa,
              chưa kết nối cơ sở dữ liệu và chưa thực hiện cấp quyền thật.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
