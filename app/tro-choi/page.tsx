
"use client";

import { useState } from "react";

const questions = [
  {
    question: "Khi nhận được email yêu cầu cung cấp mật khẩu, bạn nên làm gì?",
    options: [
      "Gửi mật khẩu ngay",
      "Kiểm tra người gửi và không chia sẻ mật khẩu",
      "Chuyển email cho tất cả mọi người",
      "Dùng mật khẩu giống nhau cho mọi tài khoản",
    ],
    answer: 1,
    explanation:
      "Không chia sẻ mật khẩu hoặc thông tin xác thực. Hãy kiểm tra nguồn gửi và truy cập dịch vụ qua địa chỉ chính thức.",
  },
  {
    question: "Đâu là cách học tập hiệu quả?",
    options: [
      "Học không cần kế hoạch",
      "Chỉ đọc mà không thực hành",
      "Lập kế hoạch, thực hành và ôn tập",
      "Không cần kiểm tra kiến thức",
    ],
    answer: 2,
    explanation:
      "Kế hoạch rõ ràng, thực hành và ôn tập giúp củng cố kiến thức.",
  },
  {
    question: "Khi tìm kiếm thông tin trên Internet, bạn nên làm gì?",
    options: [
      "Tin mọi thông tin nhìn thấy",
      "Chỉ đọc tiêu đề",
      "Kiểm tra nguồn và đối chiếu thông tin",
      "Chia sẻ ngay khi chưa kiểm chứng",
    ],
    answer: 2,
    explanation:
      "Cần kiểm tra nguồn đáng tin cậy và đối chiếu trước khi sử dụng hoặc chia sẻ.",
  },
  {
    question: "Khi sử dụng mạng xã hội, hành động nào là phù hợp?",
    options: [
      "Tôn trọng người khác và bảo vệ thông tin cá nhân",
      "Đăng thông tin riêng tư của người khác",
      "Chia sẻ tin chưa xác minh",
      "Sử dụng lời lẽ xúc phạm",
    ],
    answer: 0,
    explanation:
      "Ứng xử văn minh và bảo vệ dữ liệu cá nhân là nguyên tắc quan trọng.",
  },
  {
    question: "Mục đích của việc tự đánh giá sau khi học là gì?",
    options: [
      "Không cần thiết",
      "Xác định kiến thức đã nắm và phần cần cải thiện",
      "Chỉ để so sánh với người khác",
      "Thay thế hoàn toàn việc học",
    ],
    answer: 1,
    explanation:
      "Tự đánh giá giúp người học nhận biết tiến bộ và điều chỉnh kế hoạch học tập.",
  },
];

const challenges = [
  {
    title: "Thử thách 7 ngày học tập",
    description: "Duy trì thói quen học tập mỗi ngày.",
    reward: "Huy hiệu Chăm chỉ",
  },
  {
    title: "An toàn trên môi trường số",
    description: "Hoàn thành các câu hỏi về an toàn thông tin.",
    reward: "Huy hiệu Công dân số",
  },
  {
    title: "Mỗi ngày một kiến thức mới",
    description: "Khám phá và ghi nhớ một kiến thức hữu ích.",
    reward: "Huy hiệu Ham học hỏi",
  },
];

const leaderboard = [
  { name: "Người học mẫu 01", points: 950 },
  { name: "Người học mẫu 02", points: 870 },
  { name: "Người học mẫu 03", points: 820 },
];

export default function TroChoiPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQuestion];

  const score = answers.reduce(
    (total, answer, index) =>
      total + (answer === questions[index].answer ? 1 : 0),
    0
  );

  function startGame() {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
    setShowExplanation(false);
  }

  function checkAnswer() {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;

    const updatedAnswers = [...answers, selectedAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((current) => current + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-purple-900 to-blue-800 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            TRÒ CHƠI KIẾN THỨC
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-purple-50">
            Học mà chơi – Chơi mà học. Khám phá kiến thức,
            rèn luyện tư duy và kết nối cộng đồng học tập.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        {!started && !finished && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">
              Thử thách trắc nghiệm
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Trả lời 5 câu hỏi kiến thức tổng hợp. Sau mỗi câu,
              bạn có thể xem đáp án và phần giải thích.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-blue-50 px-4 py-2">
                5 câu hỏi
              </span>
              <span className="rounded-full bg-green-50 px-4 py-2">
                Có giải thích đáp án
              </span>
              <span className="rounded-full bg-purple-50 px-4 py-2">
                Không mất phí
              </span>
            </div>

            <button
              type="button"
              onClick={startGame}
              className="mt-6 rounded-lg bg-purple-700 px-6 py-3 font-bold text-white hover:bg-purple-800"
            >
              BẮT ĐẦU TRÒ CHƠI
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-800">
                Câu hỏi {currentQuestion + 1}/{questions.length}
              </h2>

              <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                Kiến thức tổng hợp
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-600"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h3 className="mt-7 text-lg font-bold leading-8 text-slate-800">
              {question.question}
            </h3>

            <div className="mt-5 space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={showExplanation}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full rounded-xl border p-4 text-left text-sm leading-6 transition ${
                    selectedAnswer === index
                      ? "border-purple-600 bg-purple-50 text-purple-900"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <strong className="mr-2">
                    {String.fromCharCode(65 + index)}.
                  </strong>
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="font-bold text-green-900">
                  {selectedAnswer === question.answer
                    ? "Chính xác!"
                    : "Chưa chính xác!"}
                </p>

                <p className="mt-2 text-sm leading-6 text-green-900">
                  Đáp án đúng:{" "}
                  {String.fromCharCode(65 + question.answer)}.
                  {" "}{question.options[question.answer]}
                </p>

                <p className="mt-2 text-sm leading-6 text-green-800">
                  {question.explanation}
                </p>
              </div>
            )}

            {!showExplanation ? (
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={checkAnswer}
                className="mt-6 w-full rounded-lg bg-purple-700 px-5 py-3 font-bold text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                KIỂM TRA ĐÁP ÁN
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                {currentQuestion === questions.length - 1
                  ? "XEM KẾT QUẢ"
                  : "CÂU TIẾP THEO"}
              </button>
            )}
          </div>
        )}

        {finished && (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
            <p className="text-4xl">🏆</p>

            <h2 className="mt-4 text-2xl font-bold text-slate-800">
              Hoàn thành thử thách!
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Bạn trả lời đúng
            </p>

            <p className="mt-2 text-4xl font-bold text-green-700">
              {score}/{questions.length}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Đây là kết quả thử nghiệm trên giao diện.
              Kết quả chưa được lưu vào tài khoản hoặc bảng xếp hạng chính thức.
            </p>

            <button
              type="button"
              onClick={startGame}
              className="mt-6 rounded-lg bg-purple-700 px-6 py-3 font-bold text-white hover:bg-purple-800"
            >
              CHƠI LẠI
            </button>
          </div>
        )}

        <div>
          <h2 className="mb-5 text-2xl font-bold text-slate-800">
            Thử thách học tập
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {challenges.map((challenge) => (
              <article
                key={challenge.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-3xl">🎯</p>

                <h3 className="mt-4 font-bold text-slate-800">
                  {challenge.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {challenge.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-purple-700">
                  Thành tích: {challenge.reward}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Thành tích học tập
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-amber-50 p-4 text-center">
                <p className="text-3xl">🌟</p>
                <p className="mt-2 text-sm font-semibold text-amber-900">
                  Chăm chỉ
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <p className="text-3xl">📚</p>
                <p className="mt-2 text-sm font-semibold text-blue-900">
                  Ham học hỏi
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4 text-center">
                <p className="text-3xl">🏅</p>
                <p className="mt-2 text-sm font-semibold text-green-900">
                  Hoàn thành thử thách
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4 text-center">
                <p className="text-3xl">💡</p>
                <p className="mt-2 text-sm font-semibold text-purple-900">
                  Sáng tạo
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Bảng xếp hạng mẫu
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Dữ liệu minh họa, chưa phải bảng xếp hạng thực tế.
            </p>

            <div className="mt-5 space-y-4">
              {leaderboard.map((user, index) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between border-b border-slate-100 pb-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 font-bold text-purple-700">
                      {index + 1}
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {user.name}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-blue-700">
                    {user.points} điểm
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-bold text-blue-900">
            Nguyên tắc tham gia
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-blue-900">
            <li>Trò chơi hướng đến mục tiêu giáo dục và rèn luyện kiến thức.</li>
            <li>Không tổ chức cá cược hoặc trò chơi đổi thưởng bằng tiền.</li>
            <li>Điểm thưởng dùng để ghi nhận thành tích học tập.</li>
            <li>Bảng xếp hạng phải bảo vệ thông tin cá nhân người học.</li>
            <li>Thành tích chính thức cần được lưu và xác minh trên máy chủ.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
