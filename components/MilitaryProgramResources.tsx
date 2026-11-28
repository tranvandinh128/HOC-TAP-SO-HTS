"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type ProgramLesson = {
  id: number;
  title: string;
};

type ResourceVersion = {
  resource_id: number;
  lesson_id: number;
  lesson_title: string;
  title: string;
  version_id: string;
  version: number;
  author: string | null;
  source: string;
  usage_license: string;
  media_type: string;
  byte_size: number;
  status: string;
  created_at: string;
  created_by_current_user: number;
};

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

function statusLabel(status: string): string {
  switch (status) {
    case "pending_review":
      return "Chờ rà soát";
    case "approved":
      return "Đã duyệt";
    case "rejected":
      return "Cần chỉnh sửa";
    case "draft":
      return "Bản nháp";
    default:
      return "Trạng thái khác";
  }
}

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MilitaryProgramResources({
  courseId,
  lessons,
  canManage,
}: {
  courseId: string;
  lessons: ProgramLesson[];
  canManage: boolean;
}) {
  const [resources, setResources] = useState<ResourceVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setError("");
    const result = await readResponse<{ resources: ResourceVersion[] }>(
      await fetch(`/api/military/programs/${courseId}/resources`, {
        cache: "no-store",
      }),
    );
    setResources(result.resources);
  }, [courseId]);

  useEffect(() => {
    load()
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error
            ? cause.message
            : "Không thể tải danh sách học liệu.",
        );
      })
      .finally(() => setLoading(false));
  }, [load]);

  async function upload(
    event: FormEvent<HTMLFormElement>,
    endpoint: string,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await readResponse(
        await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
        }),
      );
      form.reset();
      await load();
      setNotice("Đã gửi phiên bản học liệu để người khác rà soát.");
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Không thể tải học liệu lên.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function review(
    event: FormEvent<HTMLFormElement>,
    resourceId: number,
    versionId: string,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await readResponse(
        await fetch(
          `/api/military/resources/${resourceId}/versions/${versionId}/review`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              decision: data.get("decision"),
              reviewNote: data.get("reviewNote"),
            }),
          },
        ),
      );
      await load();
      setNotice("Đã lưu quyết định rà soát.");
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Không thể rà soát học liệu.",
      );
    } finally {
      setBusy(false);
    }
  }

  const groupedResources = resources.reduce<
    Array<{ id: number; versions: ResourceVersion[] }>
  >((groups, resource) => {
    const group = groups.find((item) => item.id === resource.resource_id);
    if (group) {
      group.versions.push(resource);
    } else {
      groups.push({ id: resource.resource_id, versions: [resource] });
    }
    return groups;
  }, []);

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Học liệu PDF và Word
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tài liệu chỉ được người học truy cập sau khi được duyệt. Tệp được lưu
          trong kho riêng tư; không tải tài liệu mật hoặc hạn chế phổ biến.
        </p>
      </div>

      {canManage && lessons.length > 0 ? (
        <form
          className="mt-5 grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-2"
          onSubmit={(event) =>
            upload(
              event,
              `/api/military/programs/${courseId}/resources`,
            )
          }
        >
          <h3 className="font-semibold text-slate-900 md:col-span-2">
            Thêm học liệu để rà soát
          </h3>
          <label className="text-sm font-medium text-slate-700">
            Bài học
            <select
              name="lessonId"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Tên học liệu
            <input
              name="title"
              required
              maxLength={200}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Tác giả (nếu có)
            <input
              name="author"
              maxLength={200}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Nguồn tài liệu
            <input
              name="source"
              required
              maxLength={500}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Quyền sử dụng
            <input
              name="usageLicense"
              required
              maxLength={500}
              placeholder="Ví dụ: được phép sử dụng nội bộ cho học tập"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Tệp PDF hoặc Word (tối đa 50 MB)
            <input
              name="file"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-50 md:col-span-2"
          >
            {busy ? "Đang gửi..." : "Gửi rà soát"}
          </button>
        </form>
      ) : null}

      {canManage && lessons.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
          Tạo bài học trước để gắn học liệu vào đúng nội dung đào tạo.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="mt-4 text-sm text-emerald-800" role="status">
          {notice}
        </p>
      ) : null}

      {loading ? (
        <p className="mt-4 text-sm text-slate-600">Đang tải học liệu...</p>
      ) : groupedResources.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-600">
          Chưa có học liệu được ghi nhận. Hệ thống không tạo tài liệu mẫu.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {groupedResources.map(({ id, versions }) => (
            <article
              key={id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-900">
                {versions[0].title}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Bài học: {versions[0].lesson_title}
              </p>
              <div className="mt-3 space-y-3">
                {versions.map((version) => (
                  <div
                    key={version.version_id}
                    className="rounded-lg bg-slate-50 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800">
                        Phiên bản {version.version} ·{" "}
                        {statusLabel(version.status)} ·{" "}
                        {formatBytes(version.byte_size)}
                      </p>
                      {(version.status === "approved" || canManage) ? (
                        <a
                          href={`/api/military/resources/versions/${version.version_id}/file`}
                          className="text-sm font-semibold text-emerald-800 underline"
                        >
                          Tải tài liệu
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      Nguồn: {version.source} · Quyền sử dụng:{" "}
                      {version.usage_license}
                      {version.author ? ` · Tác giả: ${version.author}` : ""}
                    </p>
                    {canManage &&
                    version.status === "pending_review" &&
                    version.created_by_current_user !== 1 ? (
                      <form
                        className="mt-3 grid gap-2 sm:grid-cols-[12rem_1fr_auto]"
                        onSubmit={(event) =>
                          review(event, id, version.version_id)
                        }
                      >
                        <select
                          name="decision"
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="approved">Phê duyệt</option>
                          <option value="rejected">Yêu cầu chỉnh sửa</option>
                        </select>
                        <input
                          name="reviewNote"
                          required
                          maxLength={1000}
                          placeholder="Ghi chú rà soát"
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                        <button
                          disabled={busy}
                          className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50"
                        >
                          Lưu quyết định
                        </button>
                      </form>
                    ) : null}
                    {canManage &&
                    version.created_by_current_user === 1 &&
                    version.status === "pending_review" ? (
                      <p className="mt-2 text-xs text-amber-800">
                        Người tải lên không thể tự phê duyệt phiên bản này.
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
              {canManage ? (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-semibold text-emerald-800">
                    Tạo phiên bản mới
                  </summary>
                  <form
                    className="mt-3 grid gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-2"
                    onSubmit={(event) =>
                      upload(
                        event,
                        `/api/military/resources/${id}/versions`,
                      )
                    }
                  >
                    <label className="text-sm font-medium text-slate-700">
                      Tên phiên bản
                      <input
                        name="title"
                        required
                        maxLength={200}
                        defaultValue={versions[0].title}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700">
                      Tác giả (nếu có)
                      <input
                        name="author"
                        maxLength={200}
                        defaultValue={versions[0].author ?? ""}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700">
                      Nguồn
                      <input
                        name="source"
                        required
                        maxLength={500}
                        defaultValue={versions[0].source}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700">
                      Quyền sử dụng
                      <input
                        name="usageLicense"
                        required
                        maxLength={500}
                        defaultValue={versions[0].usage_license}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 md:col-span-2">
                      Tệp PDF hoặc Word (tối đa 50 MB)
                      <input
                        name="file"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        required
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2"
                      />
                    </label>
                    <button
                      disabled={busy}
                      className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-50 md:col-span-2"
                    >
                      {busy ? "Đang gửi..." : "Gửi phiên bản để rà soát"}
                    </button>
                  </form>
                </details>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
