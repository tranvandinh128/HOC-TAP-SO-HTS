
"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  author: string;
  group: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: string[];
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Cộng đồng HỌC TẬP SỐ",
    group: "Công dân học tập",
    content:
      "Chào mừng mọi người đến với cộng đồng HỌC TẬP SỐ! Đây là nơi chia sẻ kiến thức, kinh nghiệm, tài liệu và những câu chuyện học tập hữu ích.",
    createdAt: "Bài viết mẫu",
    likes: 12,
    comments: ["Chúc cộng đồng ngày càng phát triển!"],
  },
  {
    id: 2,
    author: "Ban biên tập",
    group: "Công nghệ và đời sống",
    content:
      "Hãy chủ động học tập kỹ năng số, sử dụng Internet an toàn và kiểm chứng thông tin trước khi chia sẻ.",
    createdAt: "Bài viết mẫu",
    likes: 8,
    comments: [],
  },
];

export default function CommunityPostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [content, setContent] = useState("");
  const [group, setGroup] = useState("Công dân học tập");
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
    {}
  );
  const [notice, setNotice] = useState("");

  function createPost() {
    if (!content.trim()) {
      setNotice("Anh/chị vui lòng nhập nội dung bài viết.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: "Người dùng",
      group,
      content: content.trim(),
      createdAt: new Date().toLocaleString("vi-VN"),
      likes: 0,
      comments: [],
    };

    setPosts((current) => [newPost, ...current]);
    setContent("");
    setNotice("Bài viết đã được thêm vào danh sách hiển thị thử nghiệm.");
  }

  function likePost(id: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function addComment(id: number) {
    const comment = commentInputs[id]?.trim();

    if (!comment) return;

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setCommentInputs((current) => ({ ...current, [id]: "" }));
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/mang-xa-hoi"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Quay lại cộng đồng
        </Link>

        <header className="mt-5 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-7 text-white">
          <div className="text-4xl">💬</div>
          <h1 className="mt-3 text-3xl font-bold">
            BÀI VIẾT CỘNG ĐỒNG
          </h1>
          <p className="mt-3 leading-7 text-blue-100">
            Chia sẻ kiến thức, kinh nghiệm học tập, kỹ năng nghề nghiệp
            và những thông tin hữu ích trong cuộc sống.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            ✍️ Tạo bài viết mới
          </h2>

          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Lĩnh vực chia sẻ
          </label>

          <select
            value={group}
            onChange={(event) => setGroup(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 p-3"
          >
            <option>Công dân học tập</option>
            <option>Công nhân học tập</option>
            <option>Sinh viên học tập</option>
            <option>Học sinh THPT</option>
            <option>Học sinh THCS</option>
            <option>Học sinh tiểu học</option>
            <option>Lực lượng vũ trang</option>
            <option>Công nghệ và đời sống</option>
          </select>

          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Nội dung bài viết
          </label>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Bạn muốn chia sẻ điều gì với cộng đồng?"
            rows={5}
            maxLength={5000}
            className="mt-2 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-right text-xs text-slate-500">
            {content.length}/5000 ký tự
          </p>

          {notice && (
            <p className="mt-3 text-sm text-blue-700">{notice}</p>
          )}

          <button
            onClick={createPost}
            className="mt-4 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Đăng bài
          </button>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Bài viết mới nhất
            </h2>
            <span className="text-sm text-slate-500">
              {posts.length} bài viết
            </span>
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl">
                    👤
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      {post.author}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {post.group} · {post.createdAt}
                    </p>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
                  {post.content}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-y py-3 text-sm">
                  <button
                    onClick={() => likePost(post.id)}
                    className="font-semibold text-blue-700 hover:text-blue-900"
                  >
                    👍 Thích ({post.likes})
                  </button>

                  <span className="text-slate-500">
                    💬 {post.comments.length} bình luận
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {post.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700"
                    >
                      {comment}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={commentInputs[post.id] || ""}
                    onChange={(event) =>
                      setCommentInputs((current) => ({
                        ...current,
                        [post.id]: event.target.value,
                      }))
                    }
                    placeholder="Viết bình luận..."
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 p-3 text-sm"
                  />

                  <button
                    onClick={() => addComment(post.id)}
                    className="rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900"
                  >
                    Gửi bình luận
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">
            Lưu ý về dữ liệu và kiểm duyệt
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Đây là giao diện thử nghiệm. Bài viết, lượt thích và bình luận
            hiện chỉ lưu trong trạng thái tạm thời của trang, chưa được
            lưu trên máy chủ. Khi triển khai chính thức cần đăng nhập,
            kiểm tra quyền, lưu dữ liệu, kiểm duyệt nội dung và ghi nhật ký
            hoạt động. Người dùng chỉ được sửa hoặc xóa bài viết của mình
            theo chính sách hệ thống.
          </p>
        </section>

      </div>
    </main>
  );
}
