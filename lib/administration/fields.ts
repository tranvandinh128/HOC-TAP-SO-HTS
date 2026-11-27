import type { LearningFieldSlug } from "../education-management/types";

export type AdministrativeFieldSlug = LearningFieldSlug;

export interface AdministrativeFieldDefinition {
  readonly title: string;
}

export const ADMINISTRATIVE_FIELDS = {
  "cong-dan": {
    title: "Công dân học tập",
  },
  "cong-nhan": {
    title: "Công nhân học tập",
  },
  "sinh-vien": {
    title: "Sinh viên học tập",
  },
  thpt: {
    title: "Học sinh THPT",
  },
  thcs: {
    title: "Học sinh THCS",
  },
  "tieu-hoc": {
    title: "Học sinh Tiểu học",
  },
  "luc-luong-vu-trang": {
    title: "Lực lượng vũ trang",
  },
} as const satisfies Record<
  AdministrativeFieldSlug,
  AdministrativeFieldDefinition
>;

export function isAdministrativeFieldSlug(
  value: unknown,
): value is AdministrativeFieldSlug {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(ADMINISTRATIVE_FIELDS, value)
  );
}
