
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questionBank: Record<string, Question[]> = {
  "cong-nghe-so": [
    {
      question: "Mật khẩu nào dưới đây an toàn hơn?",
      options: [
        "123456",
        "password",
        "Dinh@HTS2026#Safe",
        "111111",
      ],
      answer: 2,
    },
    {
      question: "Phishing là hình thức gì?",
      options: [
        "Tấn công giả mạo để đánh cắp thông tin",
        "Sao lưu dữ liệu",
        "Cài đặt phần mềm",
        "Tăng tốc Internet",
      ],
      answer: 0,
    },
    {
      question: "Khi nhận được đường link đáng ngờ, bạn nên làm gì?",
      options: [
        "Mở ngay lập tức",
        "Chuyển cho mọi người",
        "Nhập mật khẩu để kiểm tra",
        "Không truy cập và xác minh nguồn gửi",
      ],
      answer: 3,
    },
    {
      question: "AI là viết tắt của cụm từ nào?",
      options: [
        "Automatic Internet",
        "Artificial Intelligence",
        "Advanced Information",
        "Application Interface",
      ],
      answer: 1,
    },
    {
      question: "Việc nào giúp bảo vệ tài khoản trực tuyến?",
      options: [
        "Dùng chung mật khẩu",
        "Công khai mã xác thực",
        "Bật xác thực nhiều lớp",
        "Gửi mật khẩu qua tin nhắn",
      ],
      answer: 2,
    },
  ],
  "ky-nang-song": [
    {
      question: "Khi xảy ra mâu thuẫn, cách xử lý phù hợp là gì?",
      options: [
        "Bình tĩnh lắng nghe và trao đổi",
        "Tranh cãi gay gắt",
        "Đăng thông tin lên mạng",
        "Không cần tìm hiểu sự việc",
      ],
      answer: 0,
    },
    {
      question: "Khi gặp người bị tai nạn, việc đầu tiên nên làm là gì?",
      options: [
        "Tự ý di chuyển người bị nạn",
        "Đảm bảo an toàn hiện trường và gọi hỗ trợ",
        "Bỏ đi",
        "Tụ tập xem",
      ],
      answer: 1,
    },
  ],
};

const defaultQuestions: Question[] = [
  {
    question: "Mục đích quan trọng của việc học tập thường xuyên là gì?",
    options: [
      "Nâng cao kiến thức và năng lực",
      "Chỉ để nhận chứng nhận",
      "Không cần thực hành",
      "Thay thế mọi kinh nghiệm",
    ],
    answer: 0,
  },
  {
    question: "Khi sử dụng thông tin trên Internet, cần làm gì?",
    options: [
      "Tin mọi nội dung",
      "Chia sẻ ngay",
      "Kiểm tra nguồn và độ tin cậy",
      "Không cần đối chiếu",
    ],
    answer: 2,
  },
  {
    question: "Học tập số giúp người học điều gì?",
    options: [
      "Hạn chế tiếp cận kiến thức",
      "Tiếp cận tài liệu và học tập linh hoạt",
      "Không cần tự học",
      "Không cần kiểm tra kiến thức",
    ],
    answer: 1,
  },
];

export default function ExamDetailPage() {
  const params = useParams<{ examId: string }>();
  const router = useRouter();
  const examId = params.examId;

  const questions = questionBank[examId] || defaultQuestions;

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const current = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  const chooseAnswer = (optionIndex: number) => {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  };

  const submitExam = () => {
    if (submitted) return;

    const confirmed = window.confirm(
      "Anh/chị có chắc chắn muốn nộp bài thi không?"
    );

    if (!confirmed) return;

    const correctCount = questions.reduce(
      (total, question, index) =>
        total + (answers[index] === question.answer ? 1 : 0),
      0
    );

    const score = Number(
      ((correctCount / questions.length) * 10).toFixed(2)
    );

    const result = {
      examId,
      score,
      correctCount,
      totalQuestions: questions.length,
      submittedAt: new Date().toISOString(),
      answers,
      status: "provisional",
    };

    try {
      const previousResults = JSON.parse(
        localStorage.getItem("hts_exam_results") || "[]"
      );

      previousResults.push(result);

      localStorage.setItem(
        "hts_exam_results",
        JSON.stringify(previousResults)
      );
    } catch {
      alert("Không thể lưu kết quả trên trình duyệt.");
    }

    setSubmitted(true);

    router.push(
      `/thi-truc-tuyen/ket-qua?examId=${encodeURIComponent(
        examId
      )}&score=${score}&correct=${correctCount}&total=${questions.length}`
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/thi-truc-tuyen"
            className="font-medium text-blue-700 hover:underline"
          >
            ← Quay lại danh sách bài thi
          </Link>
        </div>

        <section className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            HỌC TẬP SỐ
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Bài thi trực tuyến
          </h1>

          <p className="mt-3 text-sm text-blue-100">
            Mã đề: {examId}
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">
                Câu hỏi {currentQuestion + 1} / {questions.length}
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Nội dung bài thi
              </h2>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Đã trả lời: {answeredCount}/{questions.length}
            </span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h3 className="mb-5 text-lg font-semibold leading-7 text-slate-900">
            {current.question}
          </h3>

          <div className="space-y-3">
            {current.options.map((option, index) => {
              const selected = answers[currentQuestion] === index;

              return (
                <button
                  key={index}
                  type="button"
                  disabled={submitted}
                  onClick={() => chooseAnswer(index)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {selected && (
                    <span className="float-right font-bold text-blue-700">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion((value) => Math.max(0, value - 1))
              }
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Câu trước
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentQuestion((value) =>
                    Math.min(questions.length - 1, value + 1)
                  )
                }
                className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Câu tiếp theo →
              </button>
            ) : (
              <button
                type="button"
                onClick={submitExam}
                disabled={submitted}
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
              >
                Nộp bài thi
              </button>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <strong>Lưu ý:</strong> Đây là phiên bản giao diện kiểm tra mẫu.
          Dữ liệu câu hỏi hiện được khai báo trong mã nguồn và kết quả chỉ
          lưu tạm trên trình duyệt. Chưa phải kết quả thi chính thức.
          Hệ thống chính thức cần xác thực người thi, quản lý thời gian,
          mã đề, lưu bài trên máy chủ và chấm điểm phía máy chủ.
        </section>
      </div>
    </main>
  );
}
