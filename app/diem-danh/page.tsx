
"use client";

import { useState } from "react";

const attendanceGroups = [
  "Học sinh tiểu học",
  "Học sinh THCS",
  "Học sinh THPT",
  "Lực lượng vũ trang (Quân đội – Công an)",
];

const sampleRecords = [
  {
    id: 1,
    name: "Người học mẫu 01",
    group: "Học sinh THPT",
    time: "08:00",
    status: "Đã ghi nhận",
  },
  {
    id: 2,
    name: "Người học mẫu 02",
    group: "Học sinh THCS",
    time: "08:10",
    status: "Chờ xác minh",
  },
  {
    id: 3,
    name: "Người học mẫu 03",
    group: "Học sinh tiểu học",
    time: "08:20",
    status: "Đã ghi nhận",
  },
];

export default function DiemDanhPage() {
  const [selectedGroup, setSelectedGroup] = useState(
    attendanceGroups[0]
  );

  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(sampleRecords);

  const filteredRecords = records.filter((record) => {
    return (
      record.group === selectedGroup &&
      record.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  function confirmAttendance(id: number) {
    setRecords((current) =>
      current.map((record) =>
        record.id === id
          ? { ...record, status: "Đã xác minh thủ công" }
          : record
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            ĐIỂM DANH VÀ THEO DÕI CHUYÊN CẦN
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-blue-50">
            Quản lý lịch sử điểm danh, theo dõi trạng thái chuyên cần
            và hỗ trợ xác minh các trường hợp cần kiểm tra.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-bold text-blue-900">
            Quy định điểm danh HTS
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-blue-900">
            <li>
              Điểm danh định kỳ 10 phút đối với học sinh tiểu học,
              THCS, THPT và lực lượng vũ trang.
            </li>
            <li>
              Không áp dụng điểm danh định kỳ này đối với Công dân
              học tập và Công nhân học tập.
            </li>
            <li>
              Trường hợp nhận diện không thành công phải chuyển
              sang xác minh thủ công.
            </li>
            <li>
              Không tự động kết luận vắng mặt hoặc áp dụng hình thức
              xử lý chỉ dựa trên lỗi nhận diện.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Chọn lĩnh vực quản lý
          </h2>

          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-300 bg-white p-3"
          >
            {attendanceGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <p className="mt-3 text-sm text-slate-500">
            Chu kỳ điểm danh theo đề tài: 10 phút/lần.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Tổng lượt ghi nhận mẫu
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-800">
              {filteredRecords.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Đã ghi nhận
            </p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {
                filteredRecords.filter(
                  (record) => record.status === "Đã ghi nhận"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Chờ xác minh
            </p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {
                filteredRecords.filter(
                  (record) => record.status === "Chờ xác minh"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">
              Lịch sử điểm danh
            </h2>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm tên người học..."
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3">Người học</th>
                  <th className="p-3">Lĩnh vực</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100"
                  >
                    <td className="p-3 font-medium text-slate-800">
                      {record.name}
                    </td>

                    <td className="p-3 text-slate-600">
                      {record.group}
                    </td>

                    <td className="p-3 text-slate-600">
                      {record.time}
                    </td>

                    <td className="p-3">
                      <span className="text-xs font-semibold text-blue-700">
                        {record.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {record.status === "Chờ xác minh" ? (
                        <button
                          type="button"
                          onClick={() => confirmAttendance(record.id)}
                          className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
                        >
                          Xác minh mẫu
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">
                          Đã xử lý
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-slate-500"
                    >
                      Không có dữ liệu phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Bảo vệ dữ liệu và quyền riêng tư
          </h2>

          <p className="mt-3 text-sm leading-7 text-amber-900">
            Việc sử dụng nhận diện khuôn mặt phải có cơ sở pháp lý,
            thông báo minh bạch, cơ chế bảo vệ dữ liệu sinh trắc học
            và quy trình xử lý sự cố. Chỉ triển khai sau khi được
            phê duyệt và đáp ứng yêu cầu bảo mật. Không sử dụng dữ
            liệu nhận diện để tự động xử phạt người học.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Lưu ý: Đây là giao diện và dữ liệu minh họa. Chưa kết nối
          camera, nhận diện khuôn mặt, đồng hồ điểm danh tự động
          hoặc API lưu trữ phía máy chủ trên Cloudflare D1.
        </p>
      </section>
    </main>
  );
}
