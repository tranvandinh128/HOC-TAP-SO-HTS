
"use client";

import { useState } from "react";
import Link from "next/link";

export default function VideoCallPage() {
  const [meetingName, setMeetingName] = useState("");
  const [meetingCode, setMeetingCode] = useState("");
  const [notice, setNotice] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  function createMeeting() {
    if (!meetingName.trim()) {
      setNotice("Vui lòng nhập tên buổi học hoặc cuộc họp.");
      return;
    }

    const code = Math.random().toString(36).slice(2, 9).toUpperCase();
    setMeetingCode(code);
    setNotice(
      "Đã tạo mã phòng thử nghiệm. Cần tích hợp máy chủ video để mời thành viên tham gia."
    );
  }

  function joinMeeting() {
    if (!meetingCode.trim()) {
      setNotice("Vui lòng nhập mã phòng họp.");
      return;
    }

    setNotice(
      "Đã tiếp nhận mã phòng. Chức năng kết nối video sẽ hoạt động sau khi tích hợp hệ thống WebRTC."
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/mang-xa-hoi"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Quay lại mạng xã hội
        </Link>

        <header className="mt-5 rounded-2xl bg-gradient-to-r from-indigo-950 to-blue-700 p-7 text-white">
          <div className="text-4xl">📹</div>
          <h1 className="mt-3 text-3xl font-bold">
            GỌI VIDEO TRỰC TUYẾN
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-blue-100">
            Kết nối trực tiếp giữa các thành viên HỌC TẬP SỐ,
            tổ chức học nhóm, hội thảo, trao đổi kiến thức và
            hỗ trợ học tập từ xa.
          </p>
        </header>

        {notice && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900"
          >
            {notice}
          </div>
        )}

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-3xl">➕</div>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              Tạo phòng họp mới
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tạo phòng học trực tuyến để mời bạn bè, giáo viên
              hoặc các thành viên tham gia.
            </p>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Tên buổi học hoặc cuộc họp
            </label>
            <input
              value={meetingName}
              onChange={(event) => setMeetingName(event.target.value)}
              placeholder="Ví dụ: Học nhóm Toán học"
              maxLength={100}
              className="mt-2 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={createMeeting}
              className="mt-4 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Tạo phòng họp
            </button>

            {meetingCode && (
              <div className="mt-4 rounded-xl bg-slate-100 p-4">
                <p className="text-sm text-slate-600">
                  Mã phòng thử nghiệm
                </p>
                <p className="mt-1 text-2xl font-bold tracking-widest text-blue-800">
                  {meetingCode}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-3xl">🔗</div>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              Tham gia phòng họp
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Nhập mã phòng được người tổ chức cung cấp để tham gia
              buổi học hoặc cuộc họp.
            </p>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Mã phòng họp
            </label>
            <input
              value={meetingCode}
              onChange={(event) => setMeetingCode(event.target.value)}
              placeholder="Nhập mã phòng"
              maxLength={30}
              className="mt-2 w-full rounded-lg border p-3 uppercase outline-none focus:border-blue-500"
            />

            <button
              onClick={joinMeeting}
              className="mt-4 w-full rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Tham gia ngay
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Thiết lập thiết bị
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Các lựa chọn thiết lập trước khi tham gia cuộc gọi.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
            >
              <span className="font-medium text-slate-800">
                📷 Camera
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  cameraEnabled
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {cameraEnabled ? "Bật" : "Tắt"}
              </span>
            </button>

            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
            >
              <span className="font-medium text-slate-800">
                🎙️ Micro
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  micEnabled
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {micEnabled ? "Bật" : "Tắt"}
              </span>
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Các chức năng cần triển khai
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Gọi video và gọi thoại trực tuyến",
              "Học nhóm nhiều thành viên cùng lúc",
              "Chia sẻ màn hình và tài liệu học tập",
              "Trò chuyện bằng tin nhắn trong cuộc gọi",
              "Quản lý người tham gia và quyền phát biểu",
              "Mời thành viên bằng đường dẫn hoặc mã phòng",
              "Thông báo lịch học và lịch hội thảo",
              "Báo cáo, chặn người dùng vi phạm",
              "Phân quyền người tổ chức và người tham gia",
              "Bảo vệ quyền riêng tư và dữ liệu cuộc gọi",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700"
              >
                <span className="mr-2 text-emerald-600">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            Lưu ý kỹ thuật
          </h2>
          <p className="mt-2 text-sm leading-7 text-amber-900">
            Đây là giao diện và thao tác thử nghiệm. Chức năng gọi
            video thực tế cần tích hợp WebRTC hoặc dịch vụ hội nghị
            trực tuyến, máy chủ báo hiệu, STUN/TURN, xác thực người
            tham gia và kiểm soát quyền truy cập. Không được coi mã
            phòng tạo tại trình duyệt là phòng họp thực tế.
          </p>
        </section>
      </div>
    </main>
  );
}
