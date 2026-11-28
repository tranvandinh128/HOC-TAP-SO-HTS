"use client";

import { FormEvent, useState } from "react";

type SubmissionFile = {
  id: string;
  originalFilename: string;
  mediaType: string;
  byteSize: number;
};

type Submission = {
  id: string;
  displayName: string | null;
  note: string;
  status: string;
  files: SubmissionFile[];
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

function selectedFiles(form: HTMLFormElement): File[] {
  return new FormData(form)
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

export default function LessonSubmissionPanel({
  lessonId,
  canManage,
}: {
  lessonId: number;
  canManage: boolean;
}) {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function loadSubmissions() {
    const result = await readResponse<{ submissions: Submission[] }>(
      await fetch(`/api/learning/lessons/${lessonId}/submissions`, {
        cache: "no-store",
      }),
    );
    setSubmissions(result.submissions);
  }

  async function uploadFiles(submissionId: string, files: File[]) {
    for (const file of files) {
      const formData = new FormData();
      formData.set("file", file);
      await readResponse(
        await fetch(
          `/api/learning/lessons/${lessonId}/submissions/${submissionId}/files`,
          { method: "POST", body: formData },
        ),
      );
    }
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await action();
      await loadSubmissions();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Không thể hoàn tất yêu cầu.",
      );
      try {
        await loadSubmissions();
      } catch (loadCause: unknown) {
        setError(
          cause instanceof Error && loadCause instanceof Error
            ? `${cause.message} Không thể làm mới danh sách: ${loadCause.message}`
            : "Yêu cầu thất bại và không thể tải lại bản nháp.",
        );
      }
    } finally {
      setBusy(false);
    }
  }

  async function createSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const files = selectedFiles(form);
    if (files.length === 0 || files.length > 5) {
      setError("Chọn từ 1 đến 5 tệp để gửi báo cáo.");
      return;
    }

    await run(async () => {
      const draft = await readResponse<{ id: string }>(
        await fetch(`/api/learning/lessons/${lessonId}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: data.get("note") }),
        }),
      );
      await uploadFiles(draft.id, files);
      await readResponse(
        await fetch(
          `/api/learning/lessons/${lessonId}/submissions/${draft.id}`,
          { method: "PATCH" },
        ),
      );
      form.reset();
    });
  }

  async function addFiles(
    submissionId: string,
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const files = selectedFiles(form);
    if (files.length === 0) {
      setError("Chọn ít nhất một tệp để thêm vào bản nháp.");
      return;
    }
    await run(async () => {
      await uploadFiles(submissionId, files);
      form.reset();
    });
  }

  async function submitDraft(submissionId: string) {
    await run(async () => {
      await readResponse(
        await fetch(
          `/api/learning/lessons/${lessonId}/submissions/${submissionId}`,
          { method: "PATCH" },
        ),
      );
    });
  }

  return (
    <section className="mt-4 border-t border-slate-100 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-semibold text-slate-800">Báo cáo bài học</h4>
        <button
          type="button"
          onClick={() =>
            loadSubmissions().catch((cause: unknown) =>
              setError(
                cause instanceof Error
                  ? cause.message
                  : "Không thể tải báo cáo.",
              ),
            )
          }
          className="text-sm font-semibold text-emerald-800 underline"
        >
          {canManage ? "Xem báo cáo học viên" : "Xem bài đã gửi"}
        </button>
      </div>

      {!canManage ? (
        <form
          className="mt-3 space-y-3 rounded-lg bg-slate-50 p-4"
          onSubmit={createSubmission}
        >
          <label className="block text-sm font-medium text-slate-700">
            Ghi chú (không bắt buộc)
            <textarea
              name="note"
              maxLength={2000}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Video, PDF hoặc ảnh (tối đa 5 tệp, mỗi tệp 50 MB)
            <input
              name="files"
              type="file"
              multiple
              required
              accept="video/mp4,video/webm,application/pdf,image/jpeg,image/png,image/webp"
              className="mt-1 block w-full text-sm"
            />
          </label>
          <p className="text-xs leading-5 text-slate-600">
            Định dạng nhận: MP4, WebM, PDF, JPEG, PNG và WebP. Tệp được lưu
            riêng tư và chỉ tài khoản có quyền mới tải xuống. Dịch vụ tải tệp
            cần cấu hình R2.
          </p>
          <button
            disabled={busy}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Tạo và gửi báo cáo
          </button>
        </form>
      ) : null}

      {error ? (
        <p
          className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {submissions ? (
        submissions.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            Chưa có báo cáo được gửi.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <span className="font-semibold text-slate-800">
                    {submission.displayName ?? "Học viên"}
                  </span>
                  <span className="text-slate-600">
                    {submission.status === "draft" ? "Bản nháp" : "Đã gửi"}
                  </span>
                </div>
                {submission.note ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                    {submission.note}
                  </p>
                ) : null}
                {submission.files.length ? (
                  <ul className="mt-2 space-y-1">
                    {submission.files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={`/api/learning/lessons/${lessonId}/submissions/${submission.id}/files/${file.id}`}
                          className="text-sm font-medium text-emerald-800 underline"
                        >
                          {file.originalFilename} (
                          {Math.ceil(file.byteSize / 1024)} KB)
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {submission.status === "draft" ? (
                  <div className="mt-3 space-y-3">
                    <form
                      className="flex flex-wrap items-center gap-3"
                      onSubmit={(event) => addFiles(submission.id, event)}
                    >
                      <input
                        name="files"
                        type="file"
                        multiple
                        accept="video/mp4,video/webm,application/pdf,image/jpeg,image/png,image/webp"
                        className="min-w-0 flex-1 text-sm"
                      />
                      <button
                        disabled={busy}
                        className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50"
                      >
                        Thêm tệp vào bản nháp
                      </button>
                    </form>
                    {submission.files.length > 0 ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => submitDraft(submission.id)}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                      >
                        Gửi báo cáo
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )
      ) : null}
    </section>
  );
}
