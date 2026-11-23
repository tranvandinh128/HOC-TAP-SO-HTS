
"use client";

import { useState } from "react";

const examGroups = [
  "Sinh viên học tập",
  "Học sinh THPT",
  "Học sinh THCS",
  "Học sinh tiểu học",
  "Lực lượng vũ trang (Quân đội – Công an)",
];

const sampleQuestions = [
  {
    id: 1,
    question: "Đâu là một nguyên tắc quan trọng khi học tập trực tuyến?",
    options: [
      "Không cần kiểm tra nguồn thông tin",
      "Chủ động học tập và kiểm chứng thông tin",
      "Chia sẻ mật khẩu cho người khác",
      "Chỉ học khi có người nhắc nhở",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Khi nhận được đường dẫn đáng ngờ yêu cầu nhập mật khẩu, bạn nên làm gì?",
    options: [
      "Nhập mật khẩu ngay",
      "Chuyển đường dẫn cho mọi người",
      "Không truy cập và kiểm tra nguồn gửi",
      "Cung cấp mã xác thực cho người gửi",
    ],
    answer: 2,
  },
  {
    id: 3,
    question: "Việc nào giúp nâng cao hiệu quả học tập?",
    options: [
      "Lập kế hoạch và tự đánh giá kết quả",
      "Học không theo mục tiêu",
      "Bỏ qua phần thực hành",
      "Không ôn tập kiến thức",
    ],
    answer: 0,
  },
];

export default function ThiTrucTuyenPage() {
  const [group, setGroup] = useState(examGroups[0]);
  const [subject, setSubject] = useState("Kiến thức tổng hợp");
  const [examCode, setExamCode] = useState("HTS-DEMO-001");
  const [candidateNumber, setCandidateNumber] = useState("");
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [message, setMessage] = useState("");

  function startExam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!candidateNumber.trim()) {
      setMessage("Vui lòng nhập số báo danh hoặc mã người dự thi.");
      return;
    }

    setMessage("");
    setStarted(true);
  }

  function submitExam() {
    if (Object.keys(answers).length !== sampleQuestions.length) {
      setMessage("Bạn cần trả lời tất cả câu hỏi trước khi nộp bài.");
      return;
    }

    setSubmitted(true);
    setMessage("Bài làm mẫu đã được ghi nhận trên giao diện.");
  }

  const score = sampleQuestions.reduce(
    (total, question) =>
      total + (answers[question.id] === question.answer ? 1 : 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            HỆ THỐNG THI TRỰC TUYẾN
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-blue-50">
            Tổ chức kiểm tra, đánh giá kiến thức và theo dõi
            kết quả học tập trên nền tảng số.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        {!started ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Thông tin kỳ thi
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Chọn lĩnh vực, môn thi và nhập thông tin dự thi.
            </p>

            <form onSubmit={startExam} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Lĩnh vực dự thi
                </label>

                <select
                  value={group}
                  onChange={(event) => setGroup(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3"
                >
                  {examGroups.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Môn thi
                </label>

                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3"
                >
                  <option>Kiến thức tổng hợp</option>
                  <option>Công nghệ thông tin</option>
                  <option>Kỹ năng số</option>
                  <option>Kiến thức chuyên ngành</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mã đề thi
                </label>

                <input
                  value={examCode}
                  onChange={(event) => setExamCode(event.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Số báo danh / Mã người dự thi
                </label>

                <input
                  value={candidateNumber}
                  onChange={(event) =>
                    setCandidateNumber(event.target.value)
                  }
                  required
                  placeholder="Nhập số báo danh"
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </div>

              {message && (
                <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-800 px-5 py-3 font-bold text-white hover:bg-blue-900"
              >
                BẮT ĐẦU LÀM BÀI
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">
                {submitted ? "Kết quả bài làm mẫu" : "Đang làm bài thi"}
              </h2>

              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <p><strong>Lĩnh vực:</strong> {group}</p>
                <p><strong>Môn thi:</strong> {subject}</p>
                <p><strong>Mã đề:</strong> {examCode}</p>
                <p><strong>Số báo danh:</strong> {candidateNumber}</p>
              </div>
            </div>

            {sampleQuestions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold leading-7 text-slate-800">
                  Câu {index + 1}: {question.question}
                </h3>

                <div className="mt-5 space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-blue-50"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        disabled={submitted}
                        checked={answers[question.id] === optionIndex}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: optionIndex,
                          }))
                        }
                        className="mt-1"
                      />

                      <span className="text-sm leading-6 text-slate-700">
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </span>
                    </label>
                  ))}
                </div>

                {submitted && (
                  <p className="mt-4 text-sm font-medium text-green-700">
                    Đáp án đúng:{" "}
                    {String.fromCharCode(65 + question.answer)}
                  </p>
                )}
              </div>
            ))}

            {!submitted ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="mb-4 text-sm text-slate-600">
                  Đã trả lời {Object.keys(answers).length}/
                  {sampleQuestions.length} câu hỏi.
                </p>

                {message && (
                  <p role="alert" className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    {message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submitExam}
                  className="w-full rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
                >
                  NỘP BÀI THI
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <h3 className="text-xl font-bold text-green-900">
                  Kết quả: {score}/{sampleQuestions.length} câu đúng
                </h3>

                <p className="mt-2 text-sm leading-6 text-green-800">
                  Đây là kết quả chấm thử trên giao diện, chưa phải
                  điểm thi chính thức. Kết quả chính thức cần được
                  máy chủ chấm và lưu theo quy trình được phê duyệt.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setStarted(false);
                    setSubmitted(false);
                    setAnswers({});
                    setMessage("");
                  }}
                  className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                  KẾT THÚC BÀI THI MẪU
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Quy định và lưu ý khi thi
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
            <li>Không chia sẻ tài khoản hoặc thông tin dự thi.</li>
            <li>Thực hiện bài thi nghiêm túc và trung thực.</li>
            <li>
              Hệ thống có thể ghi nhận sự kiện bất thường để quản trị
              viên xem xét.
            </li>
            <li>
              Khi có 4 lần vi phạm được ghi nhận, hệ thống gửi cảnh báo
              để xem xét; người học vẫn tiếp tục làm bài, không tự động
              bị dừng thi hoặc đánh trượt.
            </li>
            <li>
              Các trường hợp cần xem xét phải được người có thẩm quyền
              kiểm tra trước khi đưa ra kết luận.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
