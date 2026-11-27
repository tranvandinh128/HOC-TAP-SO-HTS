export type FeatureStatus = "ACTIVE" | "COMING_SOON" | "HIDDEN";

export type HtsFeatureKey =
  | "pi_login"
  | "pi_payment"
  | "pi_wallet"
  | "pi_browser"
  | "ai_teaching_assistant"
  | "ai_grading"
  | "ai_lesson_planning"
  | "online_classroom"
  | "video_classroom"
  | "media_library"
  | "assignments"
  | "discussions"
  | "group_analytics"
  | "certificates"
  | "advanced_reports";

export interface FeatureDefinition {
  key: HtsFeatureKey;
  label: string;
  status: FeatureStatus;
  description: string;
}

export const featureDefinitions: Record<HtsFeatureKey, FeatureDefinition> = {
  pi_login: {
    key: "pi_login",
    label: "Pi Login",
    status: "COMING_SOON",
    description: "Liên kết và đăng nhập Pi sau giai đoạn tích hợp Web3.",
  },
  pi_payment: {
    key: "pi_payment",
    label: "Pi Payment",
    status: "COMING_SOON",
    description: "Thanh toán dịch vụ quản trị sau khi xác minh giao dịch từ máy chủ.",
  },
  pi_wallet: {
    key: "pi_wallet",
    label: "Pi Wallet",
    status: "COMING_SOON",
    description: "Liên kết ví an toàn cho các dịch vụ quản trị.",
  },
  pi_browser: {
    key: "pi_browser",
    label: "Pi Browser/PiNet",
    status: "COMING_SOON",
    description: "Trải nghiệm tương thích Pi Browser trong giai đoạn Web3.",
  },
  ai_teaching_assistant: {
    key: "ai_teaching_assistant",
    label: "AI hỗ trợ giảng dạy",
    status: "COMING_SOON",
    description: "Trợ lý hỗ trợ soạn giảng, đề kiểm tra và tổng hợp kết quả.",
  },
  ai_grading: {
    key: "ai_grading",
    label: "AI hỗ trợ chấm bài",
    status: "COMING_SOON",
    description: "Gợi ý điểm và nhận xét; giáo viên quyết định kết quả cuối cùng.",
  },
  ai_lesson_planning: {
    key: "ai_lesson_planning",
    label: "AI hỗ trợ soạn giáo án",
    status: "COMING_SOON",
    description: "Xây dựng kế hoạch bài dạy và tài liệu giảng dạy.",
  },
  online_classroom: {
    key: "online_classroom",
    label: "Lớp học trực tuyến",
    status: "COMING_SOON",
    description: "Tổ chức nhóm học tập và hoạt động giảng dạy trực tuyến.",
  },
  video_classroom: {
    key: "video_classroom",
    label: "Phòng học video",
    status: "COMING_SOON",
    description: "Phát triển sau khi hoàn thiện giải pháp video và bảo mật.",
  },
  media_library: {
    key: "media_library",
    label: "Kho học liệu số",
    status: "COMING_SOON",
    description: "Lưu trữ, phân loại và chia sẻ tài liệu học tập.",
  },
  assignments: {
    key: "assignments",
    label: "Giao và nhận bài tập",
    status: "COMING_SOON",
    description: "Giao bài, nộp bài và theo dõi tiến độ theo từng học sinh.",
  },
  discussions: {
    key: "discussions",
    label: "Thảo luận",
    status: "COMING_SOON",
    description: "Thông báo, trao đổi và hỏi đáp trong nhóm học tập.",
  },
  group_analytics: {
    key: "group_analytics",
    label: "Thống kê nhóm",
    status: "COMING_SOON",
    description: "Tổng hợp thành viên, hoạt động và kết quả học tập.",
  },
  certificates: {
    key: "certificates",
    label: "Chứng nhận",
    status: "COMING_SOON",
    description: "Thiết kế chứng nhận và quy trình cấp sau giai đoạn nghiệm thu.",
  },
  advanced_reports: {
    key: "advanced_reports",
    label: "Báo cáo nâng cao",
    status: "COMING_SOON",
    description: "Phân tích chất lượng giáo dục và báo cáo định kỳ.",
  },
};

export function getFeatureStatus(key: HtsFeatureKey): FeatureStatus {
  return featureDefinitions[key].status;
}

export function isFeatureAvailable(key: HtsFeatureKey): boolean {
  return getFeatureStatus(key) === "ACTIVE";
}
