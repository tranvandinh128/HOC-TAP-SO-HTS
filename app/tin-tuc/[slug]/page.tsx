
import Link from "next/link";
import { notFound } from "next/navigation";

const articles = [
  {
    slug: "ung-dung-cong-nghe-so-trong-hoc-tap",
    category: "Công nghệ",
    title: "Ứng dụng công nghệ số trong học tập và đời sống",
    description:
      "Tìm hiểu cách ứng dụng công nghệ số để nâng cao hiệu quả học tập, làm việc và tiếp cận tri thức.",
    sections: [
      {
        heading: "Công nghệ số trong cuộc sống",
        content:
          "Công nghệ số đang tạo ra nhiều phương thức mới để con người tiếp cận thông tin, trao đổi kiến thức và giải quyết công việc. Việc sử dụng các công cụ số phù hợp giúp tiết kiệm thời gian và nâng cao hiệu quả.",
      },
      {
        heading: "Ứng dụng trong học tập",
        content:
          "Người học có thể sử dụng nền tảng học trực tuyến, thư viện số, video hướng dẫn và các công cụ hỗ trợ để chủ động tìm hiểu kiến thức. Cần lựa chọn tài liệu có nguồn gốc rõ ràng và kiểm tra độ tin cậy của thông tin.",
      },
      {
        heading: "Sử dụng công nghệ an toàn",
        content:
          "Mỗi người cần bảo vệ tài khoản, mật khẩu và dữ liệu cá nhân. Không chia sẻ mã xác thực hoặc thông tin bảo mật cho người khác; cần cảnh giác với các đường dẫn và lời mời đáng ngờ.",
      },
    ],
  },
  {
    slug: "ky-nang-hoc-tap-suot-doi",
    category: "Giáo dục",
    title: "Phát triển kỹ năng học tập suốt đời",
    description:
      "Những phương pháp giúp mỗi người chủ động học tập, cập nhật kiến thức và phát triển bản thân.",
    sections: [
      {
        heading: "Chủ động xây dựng mục tiêu",
        content:
          "Người học nên xác định rõ kiến thức và kỹ năng cần đạt được. Mục tiêu cụ thể giúp việc học có định hướng và dễ theo dõi tiến độ.",
      },
      {
        heading: "Duy trì thói quen học tập",
        content:
          "Học tập thường xuyên với thời lượng phù hợp, kết hợp đọc, thực hành và trao đổi sẽ giúp kiến thức được ghi nhớ và vận dụng tốt hơn.",
      },
      {
        heading: "Đánh giá và cải thiện",
        content:
          "Sau mỗi giai đoạn, người học nên tự đánh giá kết quả, nhận diện nội dung còn hạn chế và điều chỉnh phương pháp học tập.",
      },
    ],
  },
  {
    slug: "kien-thuc-khoa-hoc-va-doi-song",
    category: "Khoa học",
    title: "Kiến thức khoa học thiết thực trong đời sống",
    description:
      "Chia sẻ kiến thức khoa học, kinh nghiệm và giải pháp hữu ích phục vụ cộng đồng.",
    sections: [
      {
        heading: "Khoa học gắn với đời sống",
        content:
          "Kiến thức khoa học giúp chúng ta hiểu rõ hơn về môi trường, sức khỏe, sản xuất và những hiện tượng diễn ra xung quanh.",
      },
      {
        heading: "Tìm hiểu thông tin có căn cứ",
        content:
          "Khi tiếp nhận một thông tin khoa học, cần xem xét nguồn công bố, bằng chứng và thời điểm cập nhật. Không nên chia sẻ những kết luận chưa được kiểm chứng.",
      },
      {
        heading: "Vận dụng kiến thức",
        content:
          "Mỗi người có thể bắt đầu từ những việc thiết thực như tiết kiệm năng lượng, bảo vệ môi trường và lựa chọn giải pháp phù hợp trong sinh hoạt.",
      },
    ],
  },
  {
    slug: "ky-nang-nghe-nghiep-va-viec-lam",
    category: "Đời sống",
    title: "Nâng cao kỹ năng nghề nghiệp và việc làm",
    description:
      "Cập nhật kỹ năng thực hành, tác phong làm việc và kiến thức nghề nghiệp.",
    sections: [
      {
        heading: "Kỹ năng chuyên môn",
        content:
          "Việc thường xuyên cập nhật kiến thức chuyên môn và rèn luyện kỹ năng thực hành giúp người lao động thích ứng tốt hơn với yêu cầu công việc.",
      },
      {
        heading: "Kỹ năng phối hợp",
        content:
          "Giao tiếp rõ ràng, làm việc nhóm, quản lý thời gian và tinh thần trách nhiệm là những yếu tố quan trọng trong môi trường làm việc.",
      },
      {
        heading: "Học tập để thích ứng",
        content:
          "Người lao động nên chủ động học hỏi công nghệ mới, quy trình mới và các quy định liên quan đến ngành nghề của mình.",
      },
    ],
  },
  {
    slug: "kien-thuc-an-toan-tren-khong-gian-mang",
    category: "Công nghệ",
    title: "Kỹ năng an toàn trên không gian mạng",
    description:
      "Nhận biết nguy cơ lừa đảo, bảo vệ tài khoản và dữ liệu cá nhân khi sử dụng Internet.",
    sections: [
      {
        heading: "Nhận biết nguy cơ",
        content:
          "Các hình thức giả mạo website, tin nhắn và tài khoản có thể được sử dụng để đánh cắp thông tin. Cần kiểm tra kỹ địa chỉ truy cập và danh tính người gửi.",
      },
      {
        heading: "Bảo vệ tài khoản",
        content:
          "Sử dụng mật khẩu mạnh và riêng biệt cho từng dịch vụ, bật xác thực nhiều lớp khi có thể. Không cung cấp mật khẩu, mã OTP hoặc cụm từ khôi phục ví cho bất kỳ ai.",
      },
      {
        heading: "Xử lý khi gặp dấu hiệu lừa đảo",
        content:
          "Không tiếp tục truy cập đường dẫn đáng ngờ. Lưu lại bằng chứng cần thiết và báo cáo cho đơn vị cung cấp dịch vụ hoặc cơ quan có thẩm quyền.",
      },
    ],
  },
  {
    slug: "hoat-dong-hoc-tap-cong-dong",
    category: "Sự kiện",
    title: "Hoạt động học tập và chia sẻ tri thức cộng đồng",
    description:
      "Giới thiệu các hoạt động học tập, trao đổi kinh nghiệm và lan tỏa giá trị tích cực.",
    sections: [
      {
        heading: "Học tập trong cộng đồng",
        content:
          "Môi trường học tập cộng đồng tạo điều kiện để mọi người chia sẻ kinh nghiệm, kiến thức và hỗ trợ nhau cùng tiến bộ.",
      },
      {
        heading: "Chia sẻ kinh nghiệm",
        content:
          "Các buổi trao đổi, sinh hoạt chuyên đề và hoạt động thực hành giúp người tham gia vận dụng kiến thức vào công việc và cuộc sống.",
      },
      {
        heading: "Lan tỏa giá trị tích cực",
        content:
          "Mỗi cá nhân có thể đóng góp bằng cách chia sẻ tài liệu phù hợp, hỗ trợ người học và tham gia các hoạt động có ích cho cộng đồng.",
      },
    ],
  },
];

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TinTucChiTietPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/tin-tuc"
            className="text-sm text-green-100 hover:text-white hover:underline"
          >
            ← Quay lại danh sách tin tức
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest">
            HỌC TẬP SỐ – HTS
          </p>

          <span className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-sm">
            {article.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            {article.title}
          </h1>

          <p className="mt-5 leading-7 text-green-50">
            {article.description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Nội dung tham khảo:</strong> Đây là bài viết mẫu
            phục vụ xây dựng giao diện. Nội dung chưa được biên tập,
            xác minh nguồn và phê duyệt để xuất bản chính thức.
          </div>

          <div className="space-y-8">
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-slate-800">
                  {index + 1}. {section.heading}
                </h2>

                <p className="mt-3 leading-8 text-slate-700">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">
              Nền tảng HỌC TẬP SỐ – Kết nối tri thức, phát triển cộng đồng.
            </p>

            <Link
              href="/tin-tuc"
              className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              ← Xem các bài viết khác
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
