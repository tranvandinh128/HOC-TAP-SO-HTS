
/**
 * HTS - CENTRAL TYPE COMPATIBILITY
 *
 * Tệp trung gian tương thích kiểu dữ liệu.
 * Nguồn kiểu dữ liệu chính thức:
 * lib/education-management/types.ts
 *
 * Không định nghĩa lại kiểu dữ liệu tại đây.
 * Không tạo hoặc thay đổi bảng cơ sở dữ liệu.
 */

// =====================================================
// 1. XUẤT TOÀN BỘ KIỂU DỮ LIỆU CHUẨN
// =====================================================

export * from "./education-management/types";

// =====================================================
// 2. TƯƠNG THÍCH TÊN KIỂU CŨ
// =====================================================

export type {
  LearningFieldSlug as HtsFieldSlug,
} from "./education-management/types";
