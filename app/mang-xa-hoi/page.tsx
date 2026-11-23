
"use client";

import { useState } from "react";

type Post = {
  id: number;
  author: string;
  group: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Thành viên HTS",
    group: "Công dân học tập",
    title: "Chia sẻ kinh nghiệm sử dụng công nghệ số",
    content:
      "Mọi người nên tìm hiểu cách sử dụng các công cụ số để tra cứu thông tin, học tập và giải quyết công việc hằng ngày. Hãy lựa chọn nguồn thông tin đáng tin cậy.",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Thành viên HTS",
    group: "Công nhân học tập",
    title: "Trao đổi về kỹ năng nghề nghiệp",
    content:
      "Theo mọi người, những kỹ năng nào cần thiết nhất để người lao động thích ứng với môi trường làm việc ngày càng ứng dụng nhiều công nghệ?",
    likes: 8,
    comments: 5,
  },
  {
    id: 3,
    author: "Thành viên HTS",
    group: "Sinh viên học tập",
    title: "Phương pháp học tập hiệu quả",
    content:
      "Mình muốn chia sẻ kinh nghiệm lập kế hoạch học tập theo tuần, kết hợp đọc tài liệu, thực hành và tự kiểm tra kiến thức.",
    likes: 15,
    comments: 4,
  },
];

const groups = [
  "Công dân học tập",
  "Công nhân học tập",
  "Sinh viên học tập",
  "Học sinh THPT",
  "Học sinh THCS",
  "Học sinh tiểu học",
  "Lực lượng vũ trang",
];

export default function MangXaHoiPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  function handlePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("Vui lòng nhập tiêu đề và nội dung bài viết.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: "Bản xem thử",
      group: selectedGroup,
      title: title.trim(),
      content: content.trim(),
      likes: 0,
      comments: 0,
    };

    setPosts((current) => [newPost, ...current]);
    setTitle("");
    setContent("");
    setMessage(
      "Bài viết đã được thêm vào bản xem thử trên trình duyệt. Chưa được lưu lên máy chủ."
    );
  }

  function handleLike(id: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  const filteredPosts = posts.filter((post) => {
    const keyword = search.toLowerCase();

    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword) ||
      post.group.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            CỘNG ĐỒNG HỌC TẬP
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Kết nối người học, chia sẻ tri thức, trao đổi kinh nghiệm
            và cùng nhau phát triển trong môi trường học tập số.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Chia sẻ bài viết
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Chia sẻ kiến thức, câu hỏi hoặc kinh nghiệm học tập
              tích cực với cộng đồng.
            </p>

            <form onSubmit={handlePost} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="post-group"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Lĩnh vực chia sẻ
                </label>

                <select
                  id="post-group"
                  value={selectedGroup}
                  onChange={(event) => setSelectedGroup(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3"
                >
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="post-title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Tiêu đề bài viết
                </label>

                <input
                  id="post-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={150}
                  placeholder="Nhập tiêu đề..."
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="post-content"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Nội dung chia sẻ
                </label>

                <textarea
                  id="post-content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  maxLength={5000}
                  rows={5}
                  placeholder="Bạn muốn chia sẻ điều gì?"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-green-600"
                />
              </div>

              {message && (
                <p
                  role="status"
                  className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Đăng bài xem thử
              </button>
            </form>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              Bài viết cộng đồng
            </h2>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="mb-5 w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-green-600"
            />

            <div className="space-y-5">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">
                        {post.author}
                      </span>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {post.group}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-800">
                      {post.title}
                    </h3>

                    <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                      {post.content}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                      <button
                        type="button"
                        onClick={() => handleLike(post.id)}
                        className="font-medium text-green-700 hover:underline"
                      >
                        👍 Thích ({post.likes})
                      </button>

                      <span>💬 {post.comments} bình luận</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-xl bg-white p-8 text-center text-slate-600">
                  Không tìm thấy bài viết phù hợp.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Các lĩnh vực học tập
            </h2>

            <ul className="mt-4 space-y-3">
              {groups.map((group) => (
                <li
                  key={group}
                  className="border-b border-slate-100 pb-3 text-sm text-slate-600 last:border-0"
                >
                  {group}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-900">
              Quy tắc cộng đồng
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
              <li>Tôn trọng mọi thành viên.</li>
              <li>Chia sẻ thông tin có nguồn gốc rõ ràng.</li>
              <li>Không đăng nội dung lừa đảo hoặc vi phạm pháp luật.</li>
              <li>Không công khai thông tin cá nhân của người khác.</li>
              <li>Báo cáo nội dung không phù hợp cho quản trị viên.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
