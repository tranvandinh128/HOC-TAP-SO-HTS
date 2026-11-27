
import Link from "next/link";
import { notFound } from "next/navigation";

import FieldAccessNotice from "@/components/FieldAccessNotice";
import { categories } from "@/lib/categories";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

// Các trang danh mục được xử lý động để kiểm tra quyền truy cập.
export const dynamic = "force-dynamic";

type LearningPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LearningPage({
  params,
}: LearningPageProps) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  // Kiểm tra quyền truy cập riêng đối với Lực lượng vũ trang.
  if (category.accessPolicy === "verified-membership") {
    const accessStatus = await getMilitaryFieldAccessStatus();

    if (accessStatus !== "granted") {
      return (
        <main className="subpage">
          <Link className="back" href="/">
            ← Trang chủ
          </Link>

          <div className="sub-hero">
            <span className="category-icon large">
              {category.icon}
            </span>

            <span className="tag open">
              Học tập miễn phí
            </span>

            <span className="tag">
              Cần membership được xác minh
            </span>

            <h1>{category.title}</h1>
            <p>{category.subtitle}</p>
          </div>

          <FieldAccessNotice status={accessStatus} />
        </main>
      );
    }

    return (
      <main className="subpage">
        <Link className="back" href="/">
          ← Trang chủ
        </Link>

        <div className="sub-hero">
          <span className="category-icon large">
            {category.icon}
          </span>

          <h1>{category.title}</h1>
          <p>{category.subtitle}</p>
        </div>

        <section className="notice">
          Nội dung học tập đang được kết nối và sẽ được hiển thị khi sẵn sàng.
        </section>
      </main>
    );
  }

  // Hiển thị các danh mục học tập công khai.
  return (
    <main className="subpage">
      <Link className="back" href="/">
        ← Trang chủ
      </Link>

      <div className="sub-hero">
        <span className="category-icon large">
          {category.icon}
        </span>

        <span className={category.isFree ? "tag open" : "tag"}>
          {category.isFree
            ? "Miễn phí · Không cần tài khoản"
            : "Yêu cầu đăng nhập"}
        </span>

        <h1>{category.title}</h1>
        <p>{category.subtitle}</p>
      </div>

      <section className="topic-panel">
        <h2>Nội dung học tập dự kiến</h2>

        {category.topics.length > 0 ? (
          <div className="topic-list">
            {category.topics.map((topic, index) => (
              <div className="topic" key={topic}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{topic}</strong>

                <small>
                  Nội dung đang được xây dựng
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            Nội dung đang được chuẩn bị.
          </p>
        )}

        <p className="muted">
          Các chủ đề được trích theo định hướng trong tài liệu đề tài.
          Bài giảng chi tiết sẽ được bổ sung trong các giai đoạn tiếp theo.
        </p>
      </section>
    </main>
  );
}
