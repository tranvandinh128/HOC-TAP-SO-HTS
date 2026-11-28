export interface DtcModule {
  id: string;
  icon: string;
  title: string;
  description: string;
  statusLabel: string;
}

export const DTC_MODULES: DtcModule[] = [
  {
    id: "identity",
    icon: "◈",
    title: "Danh tính và thiết bị",
    description:
      "Liên kết danh tính HTS, quản lý thiết bị tin cậy và phương thức mở khóa khóa cá nhân.",
    statusLabel: "Đang thiết kế",
  },
  {
    id: "keys",
    icon: "⌘",
    title: "Quản lý khóa bảo mật",
    description:
      "Tách cặp khóa ký và cặp khóa mã hóa; hỗ trợ passkey và phương án dự phòng có kiểm soát.",
    statusLabel: "Chưa kích hoạt",
  },
  {
    id: "signing",
    icon: "✎",
    title: "Ký xác nhận tài liệu",
    description:
      "Ký nội dung và siêu dữ liệu; thay đổi nội dung sau khi ký phải làm mất hiệu lực xác minh.",
    statusLabel: "Chưa kích hoạt",
  },
  {
    id: "exchange",
    icon: "⇄",
    title: "Gửi và nhận tài liệu",
    description:
      "Trao đổi gói dữ liệu mã hóa đầu cuối cho cá nhân hoặc nhóm người nhận được cấp quyền.",
    statusLabel: "Chưa kích hoạt",
  },
  {
    id: "backup",
    icon: "▣",
    title: "Sao lưu và khôi phục khóa",
    description:
      "Bản sao lưu phải được mã hóa, do người dùng kiểm soát; máy chủ chỉ lưu dữ liệu mật mã đã mã hóa.",
    statusLabel: "Đang thiết kế",
  },
  {
    id: "organization",
    icon: "▦",
    title: "Không gian tổ chức",
    description:
      "Quản lý thành viên, nhóm nhận, phạm vi truy cập và nhật ký hoạt động theo quyền HTS.",
    statusLabel: "Đang thiết kế",
  },
];

export const DTC_WORKFLOW = [
  {
    number: "01",
    title: "Xác minh",
    description: "Xác minh phiên HTS và quyền sử dụng DTC tại máy chủ.",
  },
  {
    number: "02",
    title: "Chuẩn bị khóa",
    description: "Tạo hoặc mở khóa cặp khóa trên thiết bị người dùng.",
  },
  {
    number: "03",
    title: "Ký và mã hóa",
    description: "Ký nội dung, mã hóa cho đúng người nhận và kiểm tra tính toàn vẹn.",
  },
  {
    number: "04",
    title: "Gửi và xác minh",
    description: "Chuyển gói mã hóa; người nhận xác minh chữ ký rồi giải mã cục bộ.",
  },
];
