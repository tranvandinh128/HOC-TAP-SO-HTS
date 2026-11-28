"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type ProgramType =
  | "general"
  | "political"
  | "legal"
  | "professional"
  | "information_technology"
  | "foreign_language";

type Program = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  program_type: ProgramType;
  objective: string;
  plan_summary: string;
};

const categories: Array<{ value: ProgramType; label: string }> = [
  { value: "general", label: "Đào tạo chung" },
  { value: "political", label: "Giáo dục chính trị" },
  { value: "legal", label: "Giáo dục pháp luật" },
  { value: "professional", label: "Chuyên môn nghiệp vụ" },
  { value: "information_technology", label: "Công nghệ thông tin" },
  { value: "foreign_language", label: "Ngoại ngữ" },
];

async function readResponse<T>(response: Response): Promise<T> {
  const payload: unknown = await response.json();
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "Không thể hoàn tất yêu cầu.";
    throw new Error(message);
  }
  return payload as T;
}

export default function MilitaryTrainingPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams();
    if (search.trim()) query.set("search", search.trim());
    if (category) query.set("category", category);

    setLoading(true);
    setError("");
    fetch(`/api/military/programs?${query.toString()}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(readResponse<{ programs: Program[]; canManage: boolean }>)
      .then((result) => {
        setPrograms(result.programs);
        setCanManage(result.canManage);
      })
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(
          cause instanceof Error
            ? cause.message
            : "Không thể tải danh mục chương trình.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search, category]);

  async function createProgram(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setError("");
    const formData = new FormData(form);
    try {
      await readResponse<{ program: Program }>(
        await fetch("/api/military/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: formData.get("slug"),
            title: formData.get("title"),
            programType: formData.get("programType"),
            objective: formData.get("objective"),
            planSummary: formData.get("planSummary"),
            description: formData.get("description"),
          }),
        }),
      );
      form.reset();
      setShowCreateForm(false);
      const query = new URLSearchParams();
      if (search.trim()) query.set("search", search.trim());
      if (category) query.set("category", category);
      const response = await fetch(`/api/military/programs?${query.toString()}`, {
        cache: "no-store",
      });
      const result = await readResponse<{
        programs: Program[];
        canManage: boolean;
      }>(response);
      setPrograms(result.programs);
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Không thể tạo chương trình.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <Link
        href="/hoc-tap/luc-luong-vu-trang"
        className="text-sm font-semibold text-green-700 hover:underline"
      >
        ← Quay lại nhóm Lực lượng vũ trang
      </Link>

      <header className="mt-5 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-800 p-7 text-white shadow-lg md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
          Đào tạo và giáo dục
        </p>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
          Chương trình đào tạo
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-100">
          Tra cứu chương trình đã phát hành, theo dõi mục tiêu và kế hoạch.
          Chỉ người có quyền quản lý mới có thể tạo chương trình nháp.
        </p>
      </header>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem_auto]">
          <label className="text-sm font-medium text-slate-700">
            Tìm chương trình
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Nhập tên chương trình"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Nhóm nghiệp vụ
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={category}
              onChange={(event) => setCategory(event.currentTarget.value)}
            >
              <option value="">Tất cả nhóm</option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          {canManage ? (
            <button
              type="button"
              className="self-end rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
              onClick={() => setShowCreateForm((value) => !value)}
            >
              {showCreateForm ? "Đóng biểu mẫu" : "Tạo chương trình"}
            </button>
          ) : null}
        </div>
      </section>

      {showCreateForm && canManage ? (
        <form
          className="mt-5 grid gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 md:grid-cols-2"
          onSubmit={createProgram}
        >
          <label className="text-sm font-medium text-slate-700">
            Tên chương trình
            <input
              name="title"
              required
              maxLength={200}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Đường dẫn định danh (slug)
            <input
              name="slug"
              required
              maxLength={100}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Nhóm chương trình
            <select
              name="programType"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Mô tả
            <input
              name="description"
              maxLength={2000}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Mục tiêu đào tạo
            <textarea
              name="objective"
              required
              maxLength={4000}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Kế hoạch đào tạo
            <textarea
              name="planSummary"
              required
              maxLength={8000}
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-60 md:col-span-2"
          >
            {saving ? "Đang lưu..." : "Lưu bản nháp"}
          </button>
        </form>
      ) : null}

      {error ? (
        <p
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <section className="mt-7">
        <h2 className="text-xl font-bold text-slate-900">
          Danh mục chương trình
        </h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-600">Đang tải chương trình...</p>
        ) : programs.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Chưa có chương trình phù hợp. Hệ thống không hiển thị số liệu mẫu.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <article
                key={program.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {categories.find(
                        (item) => item.value === program.program_type,
                      )?.label ?? "Chương trình đào tạo"}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      {program.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {program.status === "published" ? "Đã phát hành" : "Bản nháp"}
                  </span>
                </div>
                {program.description ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {program.description}
                  </p>
                ) : null}
                <p className="mt-3 line-clamp-3 text-sm text-slate-700">
                  <strong>Mục tiêu:</strong> {program.objective}
                </p>
                <Link
                  href={`/hoc-tap/luc-luong-vu-trang/dao-tao/${program.id}`}
                  className="mt-4 inline-flex rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Xem chương trình
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
