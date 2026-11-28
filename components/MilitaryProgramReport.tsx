"use client";

import { useState } from "react";

type ProgramReportData = {
  enrollment_count: number;
  completed_enrollment_count: number;
  published_lesson_count: number;
  progress_record_count: number;
  completed_progress_count: number;
  average_progress: number | null;
  result_count: number;
  planned_session_count: number;
};

type ProgramResult = {
  display_name: string | null;
  lesson_title: string | null;
  score: number | null;
  max_score: number | null;
  result_status: string;
  submitted_at: string;
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

export default function MilitaryProgramReport({
  courseId,
}: {
  courseId: string;
}) {
  const [report, setReport] = useState<ProgramReportData | null>(null);
  const [results, setResults] = useState<ProgramResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function loadReport() {
    setBusy(true);
    setError("");
    try {
      const result = await readResponse<{
        report: ProgramReportData;
        results: ProgramResult[];
      }>(
        await fetch(`/api/military/programs/${courseId}/report`, {
          cache: "no-store",
        }),
      );
      setReport(result.report);
      setResults(result.results);
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Không thể tải báo cáo chương trình.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Báo cáo tiến độ chương trình
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Tổng hợp số liệu đang lưu trong HTS; tiến độ là tự báo cáo, không
            thay thế kết quả học tập đã xác nhận.
          </p>
        </div>
        <button
          type="button"
          onClick={loadReport}
          disabled={busy}
          className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50"
        >
          {busy ? "Đang tổng hợp..." : "Tải báo cáo"}
        </button>
      </div>
      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      {report ? (
        <>
          {report.enrollment_count === 0 &&
          report.published_lesson_count === 0 &&
          report.result_count === 0 &&
          report.planned_session_count === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
              Chưa có dữ liệu thực tế để tổng hợp. Các chỉ số sẽ tự cập nhật khi
              có chương trình, học viên và hoạt động học tập.
            </p>
          ) : null}
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Học viên ghi danh" value={report.enrollment_count} />
            <Metric
              label="Hoàn thành chương trình"
              value={report.completed_enrollment_count}
            />
            <Metric
              label="Bài học đã phát hành"
              value={report.published_lesson_count}
            />
            <Metric
              label="Tiến độ tự báo cáo"
              value={
                report.average_progress === null
                  ? "Chưa có"
                  : `${Math.round(report.average_progress)}%`
              }
            />
            <Metric
              label="Bài học tự báo cáo hoàn thành"
              value={report.completed_progress_count}
            />
            <Metric
              label="Hồ sơ tiến độ"
              value={report.progress_record_count}
            />
            <Metric
              label="Kết quả học tập đã ghi nhận"
              value={report.result_count}
            />
            <Metric
              label="Buổi học sắp tới"
              value={report.planned_session_count}
            />
          </dl>
          <div className="mt-6">
            <h3 className="font-semibold text-slate-900">
              Kết quả học tập đã ghi nhận
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Đây là dữ liệu kết quả hiện có; bảng này chỉ xem, không sửa hoặc
              phê duyệt điểm.
            </p>
            {results.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                Chưa có kết quả học tập được ghi nhận.
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Học viên</th>
                      <th className="px-4 py-3 font-semibold">Bài học</th>
                      <th className="px-4 py-3 font-semibold">Điểm ghi nhận</th>
                      <th className="px-4 py-3 font-semibold">Trạng thái</th>
                      <th className="px-4 py-3 font-semibold">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((result, index) => (
                      <tr key={`${result.submitted_at}-${index}`}>
                        <td className="px-4 py-3">
                          {result.display_name || "Học viên"}
                        </td>
                        <td className="px-4 py-3">
                          {result.lesson_title || "Kết quả chương trình"}
                        </td>
                        <td className="px-4 py-3">
                          {result.score === null
                            ? "Chưa có điểm"
                            : `${result.score}${result.max_score === null ? "" : ` / ${result.max_score}`}`}
                        </td>
                        <td className="px-4 py-3">
                          {result.result_status.replaceAll("_", " ")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {new Date(result.submitted_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <dt className="text-sm text-slate-600">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-slate-900">{value}</dd>
    </div>
  );
}
