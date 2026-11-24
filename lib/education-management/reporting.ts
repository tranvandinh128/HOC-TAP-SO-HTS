import type { LearningFieldSlug } from "./types";

/** Hai lĩnh vực này vẫn tồn tại để học tập; chỉ bị loại khỏi báo cáo quản lý giáo dục nhà trường/ngành. */
export const EXCLUDED_FROM_SCHOOL_EDUCATION_REPORTS: readonly LearningFieldSlug[] = [
  "cong-dan",
  "cong-nhan",
] as const;

export function includeInSchoolEducationReport(field: LearningFieldSlug): boolean {
  return !EXCLUDED_FROM_SCHOOL_EDUCATION_REPORTS.includes(field);
}

export interface ReportVersion<T> {
  reportId: string;
  version: number;
  createdAt: string;
  createdBy: string;
  approvedAt: string | null;
  approvedBy: string | null;
  submittedAt: string | null;
  snapshot: T;
}

/** Tạo bản snapshot bất biến theo quy ước ứng dụng; tầng lưu trữ phải bảo đảm không ghi đè phiên bản cũ. */
export function createReportSnapshot<T>(input: {
  reportId: string;
  previousVersion: number;
  createdAt: string;
  createdBy: string;
  snapshot: T;
}): ReportVersion<T> {
  return {
    reportId: input.reportId,
    version: input.previousVersion + 1,
    createdAt: input.createdAt,
    createdBy: input.createdBy,
    approvedAt: null,
    approvedBy: null,
    submittedAt: null,
    snapshot: structuredCloneSafe(input.snapshot),
  };
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}
