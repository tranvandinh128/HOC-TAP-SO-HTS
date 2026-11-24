
/**
 * HTS - LỚP TƯƠNG THÍCH KIỂU DỮ LIỆU
 *
 * Tập trung sử dụng hệ thống kiểu dữ liệu thống nhất
 * tại lib/education-management/types.ts.
 *
 * Giữ tên HtsFieldSlug để hỗ trợ mã nguồn cũ.
 * Tệp này chỉ định nghĩa kiểu TypeScript,
 * không tạo hoặc thay đổi bảng cơ sở dữ liệu.
 */

export * from "./education-management/types";

/**
 * Tên kiểu cũ được giữ lại để tương thích
 * với những module HTS đang sử dụng.
 */
export type {
  LearningFieldSlug as HtsFieldSlug,
} from "./education-management/types";
