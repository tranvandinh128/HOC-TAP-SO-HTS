"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

import LessonSubmissionPanel from "@/components/LessonSubmissionPanel";
import LessonProgressPanel from "@/components/LessonProgressPanel";
import MilitaryProgramReport from "@/components/MilitaryProgramReport";
import MilitaryProgramResources from "@/components/MilitaryProgramResources";
import MilitaryProgramRoster from "@/components/MilitaryProgramRoster";

type Program = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  program_type: string;
  objective: string;
  plan_summary: string;
};

type Lesson = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  lesson_type: string;
  status: string;
  sort_order: number;
  content_version_id: string | null;
  version_status: string | null;
  created_by_current_user: number;
};

type Session = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  status: string;
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

export default function MilitaryTrainingProgramDetail({
  courseId,
}: {
  courseId: string;
}) {
  const [program, setProgram] = useState<Program | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const [programResponse, lessonsResponse, sessionsResponse] =
      await Promise.all([
        fetch(`/api/military/programs/${courseId}`, { cache: "no-store" }),
        fetch(`/api/military/programs/${courseId}/lessons`, {
          cache: "no-store",
        }),
        fetch(`/api/military/programs/${courseId}/sessions`, {
          cache: "no-store",
        }),
      ]);
    const programResult = await readResponse<{
      program: Program;
      canManage: boolean;
    }>(programResponse);
    const lessonResult = await readResponse<{ lessons: Lesson[] }>(
      lessonsResponse,
    );
    const sessionResult = await readResponse<{ sessions: Session[] }>(
      sessionsResponse,
    );
    setProgram(programResult.program);
    setCanManage(programResult.canManage);
    setLessons(lessonResult.lessons);
    setSessions(sessionResult.sessions);
  }, [courseId]);

  useEffect(() => {
    load()
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error
            ? cause.message
            : "Không thể tải thông tin chương trình.",
        );
      })
      .finally(() => setLoading(false));
  }, [load]);

  async function performAction(action: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Không thể hoàn tất yêu cầu.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function createLesson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await performAction(async () => {
      await readResponse(
        await fetch(`/api/military/programs/${courseId}/lessons`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.get("title"),
            slug: data.get("slug"),
            lessonType: data.get("lessonType"),
            content: data.get("content"),
          }),
        }),
      );
      form.reset();
    });
  }

  async function createSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await performAction(async () => {
      await readResponse(
        await fetch(`/api/military/programs/${courseId}/sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.get("title"),
            startsAt: new Date(String(data.get("startsAt"))).toISOString(),
            endsAt: new Date(String(data.get("endsAt"))).toISOString(),
          }),
        }),
      );
      form.reset();
    });
  }

  async function assignInstructor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await performAction(async () => {
      await readResponse(
        await fetch(`/api/military/programs/${courseId}/instructors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instructorUserId: data.get("instructorUserId"),
          }),
        }),
      );
      form.reset();
    });
  }

  if (loading) {
    return <p className="p-8 text-slate-600">Đang tải chương trình...</p>;
  }

  if (!program) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error || "Không tìm thấy chương trình."}
        </p>
        <Link
          href="/hoc-tap/luc-luong-vu-trang/dao-tao"
          className="mt-4 inline-block text-emerald-800 underline"
        >
          Quay lại danh mục
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <Link
        href="/hoc-tap/luc-luong-vu-trang/dao-tao"
        className="text-sm font-semibold text-emerald-800 hover:underline"
      >
        ← Danh mục chương trình
      </Link>
      <header className="mt-5 rounded-2xl bg-slate-900 p-6 text-white md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-300">
              {program.program_type.replaceAll("_", " ")}
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
              {program.title}
            </h1>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
            {program.status === "published" ? "Đã phát hành" : "Bản nháp"}
          </span>
        </div>
        {program.description ? (
          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            {program.description}
          </p>
        ) : null}
      </header>

      {error ? (
        <p
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-900">Mục tiêu đào tạo</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {program.objective}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-900">Kế hoạch đào tạo</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {program.plan_summary}
          </p>
        </article>
      </section>

      {!canManage && program.status === "published" ? (
        <button
          type="button"
          disabled={busy || enrolled}
          onClick={() =>
            performAction(async () => {
              await readResponse(
                await fetch(
                  `/api/military/programs/${courseId}/enrollments`,
                  { method: "POST" },
                ),
              );
              setEnrolled(true);
            })
          }
          className="mt-5 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {enrolled ? "Đã gửi đăng ký" : "Đăng ký tham gia"}
        </button>
      ) : null}

      {canManage && program.status === "draft" ? (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-900">
            Chỉ phát hành khi đã có ít nhất một bài học được duyệt và tất cả bài
            học trong chương trình đã ở trạng thái phát hành.
          </p>
          <button
            type="button"
            disabled={
              busy ||
              lessons.length === 0 ||
              lessons.some((lesson) => lesson.status !== "published")
            }
            onClick={() =>
              performAction(async () => {
                await readResponse(
                  await fetch(`/api/military/programs/${courseId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "published" }),
                  }),
                );
              })
            }
            className="mt-3 rounded-lg bg-amber-800 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            Phát hành chương trình
          </button>
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Bài học và chuyên đề</h2>
        {lessons.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-600">
            Chưa có bài học được ghi nhận.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      {lesson.lesson_type} ·{" "}
                      {lesson.status === "published"
                        ? "Đã phát hành"
                        : "Bản nháp"}
                      {lesson.version_status
                        ? ` · phiên bản ${lesson.version_status}`
                        : ""}
                    </p>
                  </div>
                  {canManage &&
                  lesson.content_version_id &&
                  lesson.created_by_current_user === 1 &&
                  ["draft", "rejected"].includes(
                    lesson.version_status ?? "",
                  ) ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        performAction(async () => {
                          await readResponse(
                            await fetch(
                              `/api/military/lessons/${lesson.id}/versions/${lesson.content_version_id}`,
                              { method: "PATCH" },
                            ),
                          );
                        })
                      }
                      className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50"
                    >
                      Trình duyệt nội dung
                    </button>
                  ) : null}
                </div>
                {lesson.content ? (
                  <div className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {lesson.content}
                  </div>
                ) : null}
                {canManage &&
                lesson.content_version_id &&
                ["approved", "rejected"].includes(lesson.version_status ?? "") ? (
                  <form
                    className="mt-4 border-t border-slate-100 pt-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const form = event.currentTarget;
                      const data = new FormData(form);
                      performAction(async () => {
                        await readResponse(
                          await fetch(
                            `/api/military/lessons/${lesson.id}/versions`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                content: data.get("content"),
                              }),
                            },
                          ),
                        );
                        form.reset();
                      });
                    }}
                  >
                    <label className="block text-sm font-medium text-slate-700">
                      Tạo phiên bản nội dung mới
                      <textarea
                        name="content"
                        required
                        maxLength={50000}
                        rows={4}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                    <button
                      disabled={busy}
                      className="mt-2 rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50"
                    >
                      Lưu bản nháp mới
                    </button>
                  </form>
                ) : null}
                {canManage &&
                lesson.content_version_id &&
                lesson.version_status === "pending_review" &&
                lesson.created_by_current_user !== 1 ? (
                  <form
                    className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_auto_auto]"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const form = event.currentTarget;
                      const data = new FormData(form);
                      const decision = String(data.get("decision"));
                      performAction(async () => {
                        await readResponse(
                          await fetch(
                            `/api/military/lessons/${lesson.id}/versions/${lesson.content_version_id}/review`,
                            {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                decision,
                                reviewNote: data.get("reviewNote"),
                              }),
                            },
                          ),
                        );
                      });
                    }}
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
                      className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Lưu quyết định
                    </button>
                  </form>
                ) : null}
                {lesson.status === "published" ? (
                  <>
                    <LessonProgressPanel
                      lessonId={lesson.id}
                      canManage={canManage}
                    />
                    <LessonSubmissionPanel
                      lessonId={lesson.id}
                      canManage={canManage}
                    />
                  </>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>

      {canManage ? (
        <MilitaryProgramReport courseId={courseId} />
      ) : null}
      {canManage ? <MilitaryProgramRoster courseId={courseId} /> : null}

      <MilitaryProgramResources
        courseId={courseId}
        lessons={lessons.map(({ id, title }) => ({ id, title }))}
        canManage={canManage}
      />

      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Lịch học tập</h2>
        {sessions.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-600">
            Chưa có buổi học nào được lên lịch.
          </p>
        ) : (
          <ul className="mt-4 divide-y rounded-xl border border-slate-200 bg-white">
            {sessions.map((session) => (
              <li key={session.id} className="p-4">
                <p className="font-semibold text-slate-900">{session.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {new Date(session.starts_at).toLocaleString()} –{" "}
                  {new Date(session.ends_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {canManage ? (
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <form
            className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
            onSubmit={createLesson}
          >
            <h2 className="font-bold text-slate-900">Thêm bài học nháp</h2>
            <input
              name="title"
              required
              maxLength={200}
              placeholder="Tên bài học"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              name="slug"
              required
              maxLength={100}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              placeholder="slug-bai-hoc"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <select
              name="lessonType"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="text">Văn bản</option>
              <option value="document">Tài liệu</option>
              <option value="video">Video</option>
              <option value="quiz">Bài kiểm tra</option>
            </select>
            <textarea
              name="content"
              required
              maxLength={50000}
              rows={5}
              placeholder="Nội dung được phép phổ biến"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              disabled={busy}
              className="w-full rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white disabled:opacity-50"
            >
              Tạo bài học nháp
            </button>
          </form>

          <form
            className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
            onSubmit={createSession}
          >
            <h2 className="font-bold text-slate-900">Lên lịch buổi học</h2>
            <input
              name="title"
              required
              maxLength={200}
              placeholder="Tên buổi học"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <label className="block text-sm text-slate-700">
              Bắt đầu
              <input
                name="startsAt"
                required
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm text-slate-700">
              Kết thúc
              <input
                name="endsAt"
                required
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <button
              disabled={busy}
              className="w-full rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white disabled:opacity-50"
            >
              Lưu lịch học
            </button>
          </form>

          <form
            className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
            onSubmit={assignInstructor}
          >
            <h2 className="font-bold text-slate-900">Phân công giáo viên</h2>
            <p className="text-sm leading-6 text-slate-600">
              Nhập mã tài khoản của giáo viên đã được cấp quyền trong lĩnh vực
              này và có membership được duyệt.
            </p>
            <input
              name="instructorUserId"
              required
              maxLength={200}
              placeholder="Mã tài khoản giáo viên"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              disabled={busy}
              className="w-full rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white disabled:opacity-50"
            >
              Phân công
            </button>
          </form>
        </section>
      ) : null}
    </main>
  );
}
