
"use client";

import { useState } from "react";

const learningStats = [
  {
    title: "Bài học đã hoàn thành",
    value: "0",
    icon: "📚",
  },
  {
    title: "Thời gian học tập",
    value: "0 giờ",
    icon: "⏱️",
  },
  {
    title: "Bài kiểm tra đã làm",
    value: "0",
    icon: "📝",
  },
  {
    title: "Thành tích học tập",
    value: "0",
    icon: "🏆",
  },
];

const activities = [
  {
    title: "Bài giảng đã học",
    description: "Theo dõi các bài giảng đã xem và hoàn thành.",
    icon: "📖",
  },
  {
    title: "Kết quả kiểm tra",
    description: "Theo dõi điểm số và kết quả các bài kiểm tra.",
    icon: "📊",
  },
  {
    title: "Lịch sử học tập",
    description: "Xem lại quá trình và thời gian học tập.",
    icon: "📅",
  },
  {
    title: "Mục tiêu học tập",
    description: "Theo dõi mục tiêu và tiến độ hoàn thành.",
    icon: "🎯",
  },
];

export default function TheoDoiHocTapPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("tat-ca");

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            THEO DÕI HỌC TẬP
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Theo dõi quá trình học tập, kết quả kiểm tra,
            tiến độ hoàn thành và thành tích của người học.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Tổng quan học tập
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Số liệu sẽ được cập nhật khi kết nối hệ thống dữ liệu.
            </p>
          </div>

          <select
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white p-3 text-sm"
          >
            <option value="tat-ca">Toàn bộ thời gian</option>
            <option value="thang-nay">Tháng này</option>
            <option value="tuan-nay">Tuần này</option>
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {learningStats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl" aria-hidden="true">
                {stat.icon}
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {stat.title}
              </p>

              <p className="mt-2 text-3xl font-bold text-green-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-5 mt-12 text-2xl font-bold text-slate-800">
          Các hoạt động học tập
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl" aria-hidden="true">
                {activity.icon}
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                {activity.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold text-amber-900">
            Thông báo về dữ liệu
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Đây là giao diện mẫu. Các chỉ số hiện đang bằng 0,
            chưa phải kết quả học tập thực tế. Dữ liệu cá nhân,
            lịch sử học tập và điểm số sẽ được hiển thị sau khi
            kết nối xác thực phía máy chủ và cơ sở dữ liệu D1.
          </p>
        </div>
      </section>
    </main>
  );
}
