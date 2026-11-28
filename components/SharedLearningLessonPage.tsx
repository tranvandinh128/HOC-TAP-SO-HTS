"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LessonProgressPanel from "@/components/LessonProgressPanel";
import LessonSubmissionPanel from "@/components/LessonSubmissionPanel";

type LearningLesson = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  lesson_type: string;
  course_title: string;
  field_slug: string;
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
        : "Không thể tải bài học.";
    throw new Error(message);
  }
  return payload as T;
}

export default function SharedLearningLessonPage({
  slug,
  lessonId,
}: {
  slug: string;
  lessonId: string;
}) {
  const [lesson, setLesson] = useState<LearningLesson | null>(null);
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/learning/lessons/${encodeURIComponent(lessonId)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(readResponse<{ lesson: LearningLesson; canManage: boolean }>)
      .then((result) => {
        if (result.lesson.field_slug !== slug) {
          setError("Không tìm thấy bài học trong lĩnh vực này.");
          return;
        }
        setLesson(result.lesson);
        setCanManage(result.canManage);
      })
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(
          cause instanceof Error ? cause.message : "Không thể tải bài học.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [lessonId, slug]);

  if (loading) {
    return <p className="p-8 text-slate-600">Đang tải bài học...</p>;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <Link
        href={`/hoc-tap/${encodeURIComponent(slug)}`}
        className="text-sm font-semibold text-emerald-800 underline"
      >
        ← Quay lại lĩnh vực học tập
      </Link>
      {error || !lesson ? (
        <p
          className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900"
          role="alert"
        >
          {error || "Không tìm thấy bài học."}
        </p>
      ) : (
        <>
          <header className="mt-5 rounded-2xl bg-slate-900 p-6 text-white">
            <p className="text-sm text-emerald-200">{lesson.course_title}</p>
            <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
            <p className="mt-2 text-sm text-slate-300">
              Loại bài học: {lesson.lesson_type}
            </p>
          </header>
          <article className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <div className="whitespace-pre-wrap text-sm leading-7 text-slate-800">
              {lesson.content || "Nội dung bài học chưa được cung cấp."}
            </div>
            <LessonProgressPanel
              lessonId={lesson.id}
              canManage={canManage}
            />
            <LessonSubmissionPanel
              lessonId={lesson.id}
              canManage={canManage}
            />
          </article>
        </>
      )}
    </main>
  );
}
