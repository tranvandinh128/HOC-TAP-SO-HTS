
"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
  own: boolean;
};

type Conversation = {
  id: number;
  name: string;
  group: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Cộng đồng HỌC TẬP SỐ",
    group: "Nhóm trao đổi chung",
    messages: [
      {
        id: 1,
        sender: "Quản trị viên",
        content:
          "Chào mừng bạn đến với hệ thống trao đổi trực tuyến HỌC TẬP SỐ!",
        time: "09:00",
        own: false,
      },
      {
        id: 2,
        sender: "Bạn",
        content: "Xin chào mọi người!",
        time: "09:05",
        own: true,
      },
    ],
  },
  {
    id: 2,
    name: "Nhóm học tập",
    group: "Trao đổi kiến thức",
    messages: [
      {
        id: 3,
        sender: "Thành viên",
        content: "Chúng ta cùng chia sẻ tài liệu học tập nhé!",
        time: "08:30",
        own: false,
      },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(
    initialConversations
  );
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase())
  );

  function sendMessage() {
    if (!message.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "Bạn",
      content: message.trim(),
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      own: true,
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          : conversation
      )
    );

    setMessage("");
    setNotice("Tin nhắn đã được thêm vào cuộc trò chuyện thử nghiệm.");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/mang-xa-hoi"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Quay lại mạng xã hội
        </Link>

        <header className="mt-5 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-7 text-white">
          <div className="text-4xl">✉️</div>
          <h1 className="mt-3 text-3xl font-bold">
            TIN NHẮN TRỰC TUYẾN
          </h1>
          <p className="mt-3 leading-7 text-blue-100">
            Kết nối thành viên, trao đổi kiến thức, hỗ trợ học tập
            và giao lưu trong cộng đồng HỌC TẬP SỐ.
          </p>
        </header>

        <section className="mt-6 grid min-h-[580px] overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-[300px_1fr]">
          <aside className="border-b bg-slate-50 md:border-b-0 md:border-r">
            <div className="border-b p-4">
              <h2 className="text-lg font-bold text-slate-900">
                Cuộc trò chuyện
              </h2>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm cuộc trò chuyện..."
                className="mt-3 w-full rounded-lg border bg-white p-3 text-sm"
              />
            </div>

            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setSelectedId(conversation.id);
                    setNotice("");
                  }}
                  className={`w-full p-4 text-left transition hover:bg-blue-50 ${
                    selectedId === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl">
                      👥
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {conversation.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {conversation.group}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              {filteredConversations.length === 0 && (
                <p className="p-4 text-sm text-slate-500">
                  Không tìm thấy cuộc trò chuyện.
                </p>
              )}
            </div>
          </aside>

          <div className="flex min-h-[500px] flex-col">
            {selectedConversation ? (
              <>
                <div className="border-b p-4">
                  <h2 className="font-bold text-slate-900">
                    {selectedConversation.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedConversation.group}
                  </p>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
                  {selectedConversation.messages.map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.own ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 sm:max-w-[75%] ${
                          item.own
                            ? "bg-blue-700 text-white"
                            : "border bg-white text-slate-800"
                        }`}
                      >
                        <p className="mb-1 text-xs font-semibold opacity-80">
                          {item.sender}
                        </p>

                        <p className="whitespace-pre-wrap break-words text-sm leading-6">
                          {item.content}
                        </p>

                        <p className="mt-2 text-right text-xs opacity-70">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t bg-white p-4">
                  {notice && (
                    <p className="mb-2 text-xs text-blue-700">
                      {notice}
                    </p>
                  )}

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Nhập nội dung tin nhắn..."
                      maxLength={2000}
                      className="min-w-0 flex-1 rounded-lg border p-3 text-sm outline-none focus:border-blue-500"
                    />

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="rounded-lg bg-blue-700 px-5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Gửi
                    </button>
                  </form>

                  <p className="mt-2 text-xs text-slate-400">
                    Tối đa 2.000 ký tự mỗi tin nhắn.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-6 text-center text-slate-500">
                Chọn một cuộc trò chuyện để bắt đầu.
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            Yêu cầu khi triển khai chính thức
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
            <li>Đăng nhập tài khoản trước khi sử dụng nhắn tin.</li>
            <li>Chỉ người tham gia cuộc trò chuyện mới được xem nội dung.</li>
            <li>Lưu tin nhắn trong D1 qua API phía máy chủ và đồng bộ thời gian thực.</li>
            <li>Có chức năng gửi, nhận, thông báo và đánh dấu đã đọc.</li>
            <li>Cho phép chặn, báo cáo tin nhắn vi phạm.</li>
            <li>Áp dụng phân quyền phía máy chủ và nhật ký hoạt động.</li>
            <li>Bảo vệ dữ liệu cá nhân và nội dung trao đổi.</li>
          </ul>

          <p className="mt-3 text-sm text-amber-900">
            Lưu ý: Đây hiện là giao diện thử nghiệm, tin nhắn chưa được
            lưu vào máy chủ và chưa truyền đến tài khoản khác.
          </p>
        </section>
      </div>
    </main>
  );
}
