
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type ExamResult = {
  examId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  submittedAt: string;
  status: string;
};

function ResultContent() {
  const params = useSearchParams();

  const examId = params.get("examId") || "";
  const score = Number(params.get("score") || 0);
  const correct = Number(params.get("correct") || 0);
  const total = Number(params.get("total") || 0);

  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    try {
      const saved: ExamResult[] = JSON.parse(
        localStorage.getItem("hts_exam_results") || "[]"
      );

      const found = [...saved].reverse().find(
        (item) => item.examId === examId
      );

      if (found) {
        setResult(found);
      } else if (examId && total > 0) {
        setResult({
          examId,
          score,
          correctCount: correct,
          totalQuestions: total,
          submittedAt: new Date().toISOString(),
          status: "provisional",
        });
      }
    } catch {
      setResult(null);
    }
  }, [examId, score, correct, total]);

  if (!examId || !result) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold">
            Chưa có kết quả bài thi
          </h1>
          <p className="mt-3 text-slate-600">
            Anh/chị vui lòng hoàn thành và nộp bài thi trước.
          </p>
          <Link
            href="/thi-truc-tuyen"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 text-white"
          >
            Quay lại trang thi
          </Link>
        </div>
      </main>
    );
  }

  const submittedDate = new Date(result.submittedAt);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/thi-truc-tuyen"
          className="font-medium text-blue-700 hover:underline"
        >
          ← Quay lại danh sách bài thi
        </Link>

        <section className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-8 text-center text-white">
          <div className="text-5xl">🎓</div>
          <h1 className="mt-4 text-3xl font-bold">
            KẾT QUẢ BÀI THI
          </h1>
          <p className="mt-2 text-blue-100">
            Nền tảng HỌC TẬP SỐ
          </p>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <div className="text-center">
            <p className="text-slate-500">
              Điểm số của anh/chị
            </p>
            <p className="mt-2 text-6xl font-bold text-blue-700">
              {result.score.toFixed(2)}
            </p>
            <p className="text-sm text-slate-500">
              Thang điểm 10
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 p-5 text-center">
              <p className="text-sm text-slate-600">
                Số câu đúng
              </p>
              <p className="mt-2 text-3xl font-bold text-green-700">
                {result.correctCount}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-5 text-center">
              <p className="text-sm text-slate-600">
                Tổng số câu hỏi
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-700">
                {result.totalQuestions}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Mã đề thi</span>
              <strong className="break-all text-right">
                {result.examId}
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Thời gian nộp</span>
              <strong className="text-right">
                {Number.isNaN(submittedDate.getTime())
                  ? "Chưa xác định"
                  : submittedDate.toLocaleString("vi-VN")}
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Trạng thái</span>
              <strong className="text-amber-700">
                Kết quả tạm tính
              </strong>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Lưu ý:</strong> Đây là kết quả tạm tính.
            Khi kết nối Supabase, hệ thống sẽ lưu kết quả trên
            máy chủ, xác thực điểm thi và ghi nhận lịch sử chỉnh sửa.
            Không sử dụng kết quả trên trình duyệt làm điểm chính thức.
          </div>
        </section>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/thi-truc-tuyen"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white"
          >
            Danh sách bài thi
          </Link>

          <Link
            href="/theo-doi-hoc-tap"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
          >
            Theo dõi học tập
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function ExamResultPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Đang tải kết quả bài thi...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
