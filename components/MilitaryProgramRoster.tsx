"use client";

import { useCallback, useEffect, useState } from "react";

type Enrollment = {
  user_id: string;
  display_name: string | null;
  enrollment_status: string;
  enrolled_at: string;
  completed_at: string | null;
};

type Instructor = {
  user_id: string;
  display_name: string | null;
  assigned_at: string;
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

export default function MilitaryProgramRoster({
  courseId,
}: {
  courseId: string;
}) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const [enrollmentResponse, instructorResponse] = await Promise.all([
      fetch(`/api/military/programs/${courseId}/enrollments`, {
        cache: "no-store",
      }),
      fetch(`/api/military/programs/${courseId}/instructors`, {
        cache: "no-store",
      }),
    ]);
    const enrollmentResult = await readResponse<{
      enrollments: Enrollment[];
    }>(enrollmentResponse);
    const instructorResult = await readResponse<{
      instructors: Instructor[];
    }>(instructorResponse);
    setEnrollments(enrollmentResult.enrollments);
    setInstructors(instructorResult.instructors);
  }, [courseId]);

  useEffect(() => {
    load()
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error
            ? cause.message
            : "Không thể tải danh sách phân công.",
        );
      })
      .finally(() => setLoading(false));
  }, [load]);

  async function revokeInstructor(userId: string) {
    setBusy(true);
    setError("");
    try {
      const query = new URLSearchParams({ instructorUserId: userId });
      await readResponse(
        await fetch(
          `/api/military/programs/${courseId}/instructors?${query}`,
          { method: "DELETE" },
        ),
      );
      await load();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Không thể thu hồi phân công giáo viên.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Danh sách học viên
        </h2>
        {loading ? (
          <p className="mt-3 text-sm text-slate-600">Đang tải danh sách...</p>
        ) : enrollments.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Chưa có học viên ghi danh.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {enrollments.map((enrollment) => (
              <li
                key={enrollment.user_id}
                className="flex flex-wrap justify-between gap-2 py-3 text-sm"
              >
                <span className="font-medium text-slate-800">
                  {enrollment.display_name || "Học viên"}
                </span>
                <span className="text-slate-600">
                  {enrollment.enrollment_status === "completed"
                    ? "Đã hoàn thành"
                    : enrollment.enrollment_status === "enrolled"
                      ? "Đang tham gia"
                      : enrollment.enrollment_status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Giáo viên phụ trách
        </h2>
        {loading ? (
          <p className="mt-3 text-sm text-slate-600">Đang tải phân công...</p>
        ) : instructors.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Chưa có giáo viên được phân công.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {instructors.map((instructor) => (
              <li
                key={instructor.user_id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <span className="text-sm font-medium text-slate-800">
                  {instructor.display_name || "Giáo viên"}
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => revokeInstructor(instructor.user_id)}
                  className="text-sm font-semibold text-red-700 underline disabled:opacity-50"
                >
                  Thu hồi phân công
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 lg:col-span-2"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}
