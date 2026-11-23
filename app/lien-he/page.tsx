
"use client";

import { useState } from "react";
import Link from "next/link";

export default function LienHePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Chưa kết nối hệ thống gửi và lưu yêu cầu hỗ trợ.
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            LIÊN HỆ VÀ HỖ TRỢ
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-blue-50">
            Chúng tôi luôn hướng đến việc hỗ trợ người dùng
            trong quá trình đăng ký, học tập, kiểm tra và sử dụng
            các chức năng của nền tảng HỌC TẬP SỐ.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Bạn cần hỗ trợ vấn đề gì?
            </h2>

            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Đăng ký và đăng nhập",
                  text: "Hỗ trợ tạo tài khoản, đăng nhập và khôi phục mật khẩu.",
                },
                {
                  title: "Học tập và học liệu",
                  text: "Hỗ trợ truy cập bài giảng, tài liệu và thư viện học tập.",
                },
                {
                  title: "Thi và kiểm tra",
                  text: "Hỗ trợ các vấn đề liên quan đến bài thi và kết quả.",
                },
                {
                  title: "Tài khoản và quản trị",
                  text: "Hỗ trợ thông tin tài khoản và yêu cầu quyền quản trị.",
                },
                {
                  title: "Góp ý và phản ánh",
                  text: "Tiếp nhận đề xuất cải tiến và phản ánh lỗi hệ thống.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-b border-slate-100 pb-4 last:border-0"
                >
                  <h3 className="font-semibold text-blue-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-bold text-blue-950">
              Hướng dẫn trước khi liên hệ
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-900">
              Người dùng nên mô tả rõ vấn đề, thời điểm xảy ra,
              chức năng đang sử dụng và thông báo lỗi (nếu có)
              để việc hỗ trợ được thuận lợi.
            </p>

            <Link
              href="/huong-dan"
              className="mt-4 inline-block font-semibold text-blue-800 hover:underline"
            >
              Xem hướng dẫn sử dụng →
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Gửi yêu cầu hỗ trợ
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Điền thông tin và mô tả nội dung cần hỗ trợ.
            Vui lòng không nhập mật khẩu hoặc thông tin bảo mật.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-bold text-amber-900">
                Biểu mẫu đang ở chế độ thử nghiệm
              </h3>
              <p className="mt-2 text-sm leading-7 text-amber-900">
                Yêu cầu chưa được gửi hoặc lưu vào hệ thống.
                Chức năng này cần được kết nối với máy chủ và
                cơ sở dữ liệu trước khi sử dụng chính thức.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Quay lại biểu mẫu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email liên hệ
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="example@email.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nội dung cần hỗ trợ
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Chọn nội dung liên hệ
                  </option>
                  <option>Đăng ký và đăng nhập</option>
                  <option>Học tập và học liệu</option>
                  <option>Thi và kiểm tra</option>
                  <option>Tài khoản và quản trị</option>
                  <option>Góp ý và phản ánh lỗi</option>
                  <option>Vấn đề khác</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Tiêu đề
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={150}
                  placeholder="Nhập tiêu đề yêu cầu"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nội dung chi tiết
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={6}
                  placeholder="Mô tả cụ thể vấn đề hoặc đề xuất của bạn..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Không nhập mật khẩu đăng nhập, mã OTP,
                mật khẩu ví Pi (passphrase) hoặc thông tin
                bảo mật cá nhân vào biểu mẫu.
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
              >
                Gửi yêu cầu hỗ trợ
              </button>
            </form>
          )}
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-2xl bg-blue-950 p-7 text-center text-white">
          <h2 className="text-xl font-bold">
            HỌC TẬP SỐ – Kết nối tri thức, phát triển cộng đồng
          </h2>
          <p className="mt-3 text-sm leading-7 text-blue-100">
            Cùng xây dựng môi trường học tập mở, an toàn,
            hiện đại và phục vụ nhu cầu học tập suốt đời.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
          >
            Trở về trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
