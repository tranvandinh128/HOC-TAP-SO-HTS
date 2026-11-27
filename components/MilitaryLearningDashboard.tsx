"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type LearningFeature = {
  title: string;
  description: string;
  icon: string;
  href?: string;
};

type LearningFeatureGroup = {
  id: string;
  title: string;
  icon: string;
  features: LearningFeature[];
};

const fieldBase = "/hoc-tap/luc-luong-vu-trang";

const featureGroups: LearningFeatureGroup[] = [
  {
    id: "education",
    title: "Đào tạo và giáo dục",
    icon: "🎓",
    features: [
      {
        title: "Quản lý chương trình đào tạo",
        description: "Danh mục và thông tin chương trình đào tạo.",
        icon: "📚",
        href: `${fieldBase}/dao-tao`,
      },
      {
        title: "Giáo dục chính trị",
        description: "Nội dung giáo dục chính trị được phép sử dụng.",
        icon: "🏛️",
      },
      {
        title: "Giáo dục pháp luật",
        description: "Tài liệu và chuyên đề pháp luật được phép phổ biến.",
        icon: "⚖️",
      },
      {
        title: "Đào tạo chuyên môn nghiệp vụ",
        description: "Chương trình bồi dưỡng chuyên môn được phê duyệt.",
        icon: "🧭",
      },
      {
        title: "Đào tạo công nghệ thông tin",
        description: "Nội dung học tập kỹ năng công nghệ thông tin.",
        icon: "💻",
      },
      {
        title: "Đào tạo ngoại ngữ",
        description: "Chương trình học và rèn luyện ngoại ngữ.",
        icon: "🌐",
      },
    ],
  },
  {
    id: "training",
    title: "Huấn luyện và rèn luyện",
    icon: "🎖️",
    features: [
      {
        title: "Kế hoạch huấn luyện",
        description: "Theo dõi kế hoạch huấn luyện được phê duyệt.",
        icon: "🗓️",
        href: `${fieldBase}/huan-luyen`,
      },
      {
        title: "Thể chất và rèn luyện sức khỏe",
        description: "Nội dung rèn luyện trong phạm vi giáo dục được phép.",
        icon: "🏃",
      },
      {
        title: "Điều lệnh và tác phong",
        description: "Nội dung đào tạo điều lệnh, tác phong được phép.",
        icon: "📐",
      },
      {
        title: "Kỹ năng chuyên môn",
        description: "Kỹ năng chuyên môn được phép phổ biến.",
        icon: "🛠️",
      },
    ],
  },
  {
    id: "management",
    title: "Quản lý và điều hành",
    icon: "🗂️",
    features: [
      {
        title: "Quản lý học viên",
        description: "Thông tin học viên và quá trình học tập.",
        icon: "👥",
        href: `${fieldBase}/quan-ly-hoc-vien`,
      },
      {
        title: "Điểm danh học tập",
        description: "Thông tin điểm danh sẽ hiển thị khi backend sẵn sàng.",
        icon: "📋",
        href: `${fieldBase}/diem-danh`,
      },
      {
        title: "Giám sát tiến độ học tập",
        description: "Theo dõi tiến độ và hoạt động học tập.",
        icon: "📡",
        href: `${fieldBase}/giam-sat`,
      },
      {
        title: "Nhập dữ liệu",
        description: "Tiếp nhận dữ liệu giáo dục theo quy trình được duyệt.",
        icon: "📥",
        href: `${fieldBase}/nhap-du-lieu`,
      },
    ],
  },
  {
    id: "assessment",
    title: "Khảo thí và đánh giá",
    icon: "📝",
    features: [
      {
        title: "Thi trực tuyến",
        description: "Chức năng thi chưa được kết nối backend.",
        icon: "🖥️",
      },
      {
        title: "Kết quả thi",
        description: "Thông tin quy trình kết quả, chưa có dữ liệu thực tế.",
        icon: "📊",
        href: `${fieldBase}/thi-truc-tuyen/ket-qua`,
      },
      {
        title: "Ngân hàng câu hỏi và đề thi",
        description: "Quản lý câu hỏi và đề thi đang phát triển.",
        icon: "📑",
      },
      {
        title: "Phúc khảo",
        description: "Quy trình phúc khảo đang phát triển.",
        icon: "🔎",
      },
    ],
  },
  {
    id: "resources",
    title: "Học liệu và nghiên cứu",
    icon: "📖",
    features: [
      {
        title: "Thư viện tài liệu học tập",
        description: "Danh mục học liệu; tải lên và tìm kiếm chưa kết nối.",
        icon: "📚",
        href: `${fieldBase}/tai-lieu`,
      },
      {
        title: "Bài giảng và giáo trình số",
        description: "Kho bài giảng và giáo trình số đang phát triển.",
        icon: "🗒️",
      },
      {
        title: "Nghiên cứu và sáng kiến",
        description: "Quản lý nghiên cứu, sáng kiến và kinh nghiệm.",
        icon: "🔬",
      },
      {
        title: "Trợ lý học tập AI",
        description: "Công cụ AI chưa được kết nối.",
        icon: "✨",
      },
    ],
  },
  {
    id: "reports",
    title: "Báo cáo và chuyển đổi số",
    icon: "📈",
    features: [
      {
        title: "Báo cáo và thống kê",
        description: "Danh mục báo cáo; chưa tổng hợp dữ liệu thực tế.",
        icon: "📊",
        href: `${fieldBase}/bao-cao`,
      },
      {
        title: "Trình duyệt và phê duyệt báo cáo",
        description: "Quy trình báo cáo nhiều cấp đang phát triển.",
        icon: "✅",
      },
      {
        title: "Chuyển đổi số",
        description: "Các công cụ chuyển đổi số đang phát triển.",
        icon: "🔄",
      },
    ],
  },
];

const overviewItems = [
  "Chương trình đào tạo",
  "Tiến độ đào tạo",
  "Kết quả kiểm tra",
  "Báo cáo chờ duyệt",
];

const quickAccessItems = [
  {
    title: "Đào tạo",
    icon: "🎓",
    href: `${fieldBase}/dao-tao`,
  },
  {
    title: "Huấn luyện",
    icon: "🎖️",
    href: `${fieldBase}/huan-luyen`,
  },
  {
    title: "Quản lý học viên",
    icon: "👥",
    href: `${fieldBase}/quan-ly-hoc-vien`,
  },
  {
    title: "Điểm danh",
    icon: "📋",
    href: `${fieldBase}/diem-danh`,
  },
  {
    title: "Học liệu",
    icon: "📖",
    href: `${fieldBase}/tai-lieu`,
  },
  {
    title: "Báo cáo",
    icon: "📈",
    href: `${fieldBase}/bao-cao`,
  },
];

export default function MilitaryLearningDashboard() {
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    () => featureGroups.map((group) => group.id),
  );
  const normalizedSearch = search.trim().toLocaleLowerCase("vi");

  const visibleGroups = useMemo(
    () =>
      featureGroups
        .map((group) => ({
          ...group,
          features: group.features.filter((feature) =>
            `${group.title} ${feature.title} ${feature.description}`
              .toLocaleLowerCase("vi")
              .includes(normalizedSearch),
          ),
        }))
        .filter((group) => group.features.length > 0),
    [normalizedSearch],
  );

  function toggleGroup(groupId: string) {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-800 p-6 text-white shadow-lg md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
            HỌC TẬP SỐ – HTS
          </p>
          <h1 className="mt-3 text-2xl font-bold md:text-4xl">
            Trung tâm học tập
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-100">
            Tổng quan các chức năng đào tạo, huấn luyện và học liệu được phép
            sử dụng. Dữ liệu chỉ hiển thị sau khi được kết nối và xác minh quyền.
          </p>
          <span className="mt-5 inline-flex rounded-full border border-emerald-200/40 bg-white/10 px-3 py-1 text-sm font-medium text-emerald-100">
            Lực lượng vũ trang
          </span>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Thống kê tổng hợp">
          {overviewItems.map((item) => (
            <article
              key={item}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-slate-800">{item}</h2>
              <p className="mt-3 text-sm font-medium text-amber-700">
                Chưa có dữ liệu thực tế
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Chỉ hiển thị sau khi kết nối nguồn dữ liệu được cấp quyền.
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Truy cập nhanh
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {quickAccessItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-lg border border-slate-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-slate-800">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs text-amber-700">
                    Đang phát triển
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">Thông báo</h2>
              <p className="mt-3 text-sm text-slate-600">
                Chưa có thông báo. Dữ liệu thông báo chưa được kết nối.
              </p>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">Lịch học tập</h2>
              <p className="mt-3 text-sm text-slate-600">
                Lịch học sẽ hiển thị khi chức năng lịch được triển khai.
              </p>
              <span className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                Đang phát triển
              </span>
            </section>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Nhóm chức năng
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Chức năng chưa có backend được đánh dấu đang phát triển.
              </p>
            </div>
            <label className="block w-full sm:max-w-sm">
              <span className="sr-only">Tìm kiếm chức năng</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm kiếm chức năng..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <div className="mt-4 space-y-3">
            {visibleGroups.map((group) => {
              const isExpanded =
                normalizedSearch.length > 0 ||
                expandedGroups.includes(group.id);
              const panelId = `military-feature-group-${group.id}`;

              return (
                <section
                  key={group.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => toggleGroup(group.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">
                          {group.icon}
                        </span>
                        <span className="font-bold text-slate-900">
                          {group.title}
                        </span>
                      </span>
                      <span className="text-lg text-slate-500" aria-hidden="true">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  {isExpanded ? (
                    <div
                      id={panelId}
                      className="grid gap-3 border-t border-slate-100 p-4 sm:grid-cols-2 xl:grid-cols-3"
                    >
                      {group.features.map((feature) => {
                        const content = (
                          <>
                            <span
                              className="text-2xl"
                              aria-hidden="true"
                            >
                              {feature.icon}
                            </span>
                            <span className="mt-2 block font-semibold text-slate-800">
                              {feature.title}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-slate-600">
                              {feature.description}
                            </span>
                            <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                              Đang phát triển
                            </span>
                          </>
                        );

                        return feature.href ? (
                          <Link
                            key={feature.title}
                            href={feature.href}
                            className="rounded-lg border border-slate-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
                          >
                            {content}
                          </Link>
                        ) : (
                          <article
                            key={feature.title}
                            className="rounded-lg border border-slate-200 bg-slate-50/60 p-4"
                          >
                            {content}
                          </article>
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            })}
            {visibleGroups.length === 0 ? (
              <p className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">
                Không tìm thấy chức năng phù hợp.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
