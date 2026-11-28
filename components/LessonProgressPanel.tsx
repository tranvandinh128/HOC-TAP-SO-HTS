"use client";

import { useEffect, useState } from "react";

type LearnerProgress = {
  user_id?: string;
  display_name?: string | null;
  progress_percent: number;
  is_completed: number;
  started_at: string | null;
  completed_at: string | null;
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

export default function LessonProgressPanel({
  lessonId,
  canManage,
}: {
  lessonId: number;
  canManage: boolean;
}) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [hasProgress, setHasProgress] = useState(false);
  const [learners, setLearners] = useState<LearnerProgress[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (canManage) return;
    fetch(`/api/learning/lessons/${lessonId}/progress`, {
      cache: "no-store",
    })
      .then(
        readResponse<{
          progress: LearnerProgress | null;
        }>,
      )
      .then((result) => {
        if (result.progress) {
          setProgressPercent(result.progress.progress_percent);
          setHasProgress(true);
        }
      })
      .catch((cause: unknown) => {
        setMessage(
          cause instanceof Error
            ? cause.message
            : "Không thể tải tiến độ học tập.",
        );
      });
  }, [canManage, lessonId]);

  async function saveProgress() {
    setBusy(true);
    setMessage("");
    try {
      const result = await readResponse<{
        progress: LearnerProgress;
      }>(
        await fetch(`/api/learning/lessons/${lessonId}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progressPercent }),
        }),
      );
      setProgressPercent(result.progress.progress_percent);
      setHasProgress(true);
      setMessage("Đã lưu tiến độ tự báo cáo.");
    } catch (cause: unknown) {
      setMessage(
        cause instanceof Error
          ? cause.message
          : "Không thể lưu tiến độ học tập.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function loadLearners() {
    setBusy(true);
    setMessage("");
    try {
      const result = await readResponse<{
        progress: LearnerProgress[];
      }>(
        await fetch(`/api/learning/lessons/${lessonId}/progress`, {
          cache: "no-store",
        }),
      );
      setLearners(result.progress);
    } catch (cause: unknown) {
      setMessage(
        cause instanceof Error
          ? cause.message
          : "Không thể tải tiến độ học viên.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-4 border-t border-slate-100 pt-4">
      {canManage ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-semibold text-slate-800">
              Tiến độ học viên
            </h4>
            <button
              type="button"
              disabled={busy}
              onClick={loadLearners}
              className="text-sm font-semibold text-emerald-800 underline disabled:opacity-50"
            >
              Xem tiến độ
            </button>
          </div>
          {learners ? (
            learners.length === 0 ? (
              <p className="mt-2 text-sm text-slate-600">
                Chưa có dữ liệu ghi danh.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {learners.map((learner) => (
                  <li
                    key={learner.user_id}
                    className="flex flex-wrap justify-between gap-2 rounded-lg bg-slate-50 p-3 text-sm"
                  >
                    <span className="font-medium text-slate-800">
                      {learner.display_name || "Học viên"}
                    </span>
                    <span className="text-slate-700">
                      {learner.progress_percent}% ·{" "}
                      {learner.is_completed === 1
                        ? "Đã tự báo cáo hoàn thành"
                        : "Chưa báo cáo hoàn thành"}
                    </span>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </>
      ) : (
        <div className="rounded-lg bg-slate-50 p-4">
          <label className="block text-sm font-medium text-slate-700">
            Tiến độ bài học: {progressPercent}%
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={progressPercent}
              onChange={(event) =>
                setProgressPercent(Number(event.currentTarget.value))
              }
              className="mt-2 w-full accent-emerald-700"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            {hasProgress
              ? "Tiến độ hiện tại được lưu từ báo cáo của bạn."
              : "Chưa có tiến độ được ghi nhận."}{" "}
            Đây là tiến độ tự báo cáo, không thay thế kết quả học tập đã được
            xác nhận.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={saveProgress}
            className="mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Lưu tiến độ
          </button>
        </div>
      )}
      {message ? (
        <p
          className="mt-2 text-sm text-slate-700"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
