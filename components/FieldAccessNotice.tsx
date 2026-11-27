import Link from "next/link";

import type { MilitaryFieldAccessStatus } from "@/lib/auth/field-access";

type DeniedMilitaryFieldAccessStatus = Exclude<
  MilitaryFieldAccessStatus,
  "granted"
>;

const accessMessages: Record<
  DeniedMilitaryFieldAccessStatus,
  { title: string; description: string }
> = {
  "sign-in-required": {
    title: "Cần xác minh quyền truy cập",
    description:
      "Nội dung học tập trong khu vực này chỉ được hiển thị sau khi máy chủ xác minh phiên đăng nhập và membership hợp lệ.",
  },
  "membership-unverified": {
    title: "Membership chưa được xác minh",
    description:
      "Phiên đăng nhập hợp lệ, nhưng HTS hiện chưa có nguồn dữ liệu membership đã duyệt để xác nhận quyền truy cập. Nội dung bị từ chối cho đến khi có thể xác minh.",
  },
  "verification-unavailable": {
    title: "Không thể xác minh quyền truy cập",
    description:
      "Máy chủ chưa xác minh được phiên đăng nhập hoặc membership. Theo nguyên tắc bảo mật, nội dung hạn chế không được hiển thị.",
  },
};

export default function FieldAccessNotice({
  status,
}: {
  status: DeniedMilitaryFieldAccessStatus;
}) {
  const message = accessMessages[status];

  return (
    <section
      className="notice"
      role="status"
      aria-live="polite"
      data-access-status={status}
    >
      <strong>{message.title}</strong>
      <p>{message.description}</p>
      {status === "sign-in-required" ? (
        <Link className="button primary" href="/dang-nhap">
          Đăng nhập
        </Link>
      ) : null}
    </section>
  );
}
