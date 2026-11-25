
/**
 * HTS - QUẢN LÝ BÁO CÁO GIÁO DỤC
 *
 * Chức năng:
 * - Loại trừ đúng hai lĩnh vực khỏi báo cáo quản lý giáo dục.
 * - Tạo snapshot báo cáo.
 * - Quản lý phiên bản báo cáo.
 * - Kiểm tra điều kiện phê duyệt và gửi báo cáo.
 *
 * Lưu ý:
 * Đây là lớp nghiệp vụ TypeScript.
 * Cơ sở dữ liệu phải lưu mỗi phiên bản thành bản ghi riêng
 * và không cho phép ghi đè phiên bản đã phê duyệt hoặc đã gửi.
 */

import type {
  LearningFieldSlug,
  ReportVersion,
  SchoolReport,
} from "./types";

// =====================================================
// 1. QUY TẮC LĨNH VỰC ĐƯỢC TỔNG HỢP BÁO CÁO
// =====================================================

/**
 * Hai lĩnh vực vẫn hoạt động học tập bình thường.
 * Chỉ loại khỏi báo cáo quản lý giáo dục nhà trường/ngành.
 */

export const EXCLUDED_FROM_SCHOOL_EDUCATION_REPORTS:
  readonly LearningFieldSlug[] = [
    "cong-dan",
    "cong-nhan",
  ];

export function includeInSchoolEducationReport(
  field: LearningFieldSlug,
): boolean {
  return !EXCLUDED_FROM_SCHOOL_EDUCATION_REPORTS.includes(field);
}

/**
 * Lọc dữ liệu theo lĩnh vực.
 * Không xóa hoặc thay đổi dữ liệu nguồn.
 */

export function filterSchoolEducationReportData<
  T extends { fieldSlug: LearningFieldSlug },
>(records: readonly T[]): T[] {
  return records.filter((record) =>
    includeInSchoolEducationReport(record.fieldSlug),
  );
}

// =====================================================
// 2. KIỂU DỮ LIỆU ĐẦU VÀO SNAPSHOT
// =====================================================

export interface CreateReportSnapshotInput<T> {
  reportId: string;
  previousVersion: number;
  createdAt: string;
  createdBy: string;
  snapshot: T;
}

export interface ReportActionActor {
  userId: string;
  canApprove: boolean;
  canSubmit: boolean;
}

export interface ReportActionResult {
  ok: boolean;
  report: SchoolReport;
  error?: string;
}

function validDate(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

function validIdentity(
  id: string,
  userId: string,
): boolean {
  return Boolean(id.trim() && userId.trim());
}

function cloneSnapshot<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

// =====================================================
// 3. TẠO SNAPSHOT VÀ PHIÊN BẢN MỚI
// =====================================================

export function createReportSnapshot<T>(
  input: CreateReportSnapshotInput<T>,
): ReportVersion<T> {
  if (
    !validIdentity(input.reportId, input.createdBy)
  ) {
    throw new Error(
      "Thiếu mã báo cáo hoặc người tạo báo cáo.",
    );
  }

  if (
    !Number.isInteger(input.previousVersion) ||
    input.previousVersion < 0
  ) {
    throw new Error(
      "Số phiên bản trước không hợp lệ.",
    );
  }

  if (!validDate(input.createdAt)) {
    throw new Error(
      "Thời gian tạo báo cáo không hợp lệ.",
    );
  }

  if (input.snapshot === undefined) {
    throw new Error(
      "Không có dữ liệu để tạo snapshot.",
    );
  }

  return {
    reportId: input.reportId,
    version: input.previousVersion + 1,
    createdAt: input.createdAt,
    createdBy: input.createdBy,
    approvedAt: null,
    approvedBy: null,
    submittedAt: null,
    snapshot: cloneSnapshot(input.snapshot),
  };
}

// =====================================================
// 4. KIỂM TRA TÍNH HỢP LỆ CỦA PHIÊN BẢN
// =====================================================

export function isValidReportVersion<T>(
  version: ReportVersion<T>,
): boolean {
  return (
    Boolean(version.reportId.trim()) &&
    Number.isInteger(version.version) &&
    version.version > 0 &&
    Boolean(version.createdBy.trim()) &&
    validDate(version.createdAt) &&
    (
      version.approvedAt === null ||
      validDate(version.approvedAt)
    ) &&
    (
      version.submittedAt === null ||
      validDate(version.submittedAt)
    ) &&
    (
      version.approvedBy === null ||
      Boolean(version.approvedBy.trim())
    )
  );
}

// =====================================================
// 5. PHÊ DUYỆT BÁO CÁO
// =====================================================

export function approveSchoolReport(
  report: SchoolReport,
  actor: ReportActionActor,
  now = new Date().toISOString(),
): ReportActionResult {
  const fail = (error: string): ReportActionResult => ({
    ok: false,
    report,
    error,
  });

  if (!actor.canApprove || !actor.userId.trim()) {
    return fail(
      "Không có quyền phê duyệt báo cáo.",
    );
  }

  if (report.status !== "in_review") {
    return fail(
      "Báo cáo phải ở trạng thái chờ rà soát mới được phê duyệt.",
    );
  }

  if (!validDate(now)) {
    return fail(
      "Thời gian phê duyệt không hợp lệ.",
    );
  }

  if (report.createdBy === actor.userId) {
    return fail(
      "Người tạo báo cáo không được tự phê duyệt báo cáo.",
    );
  }

  return {
    ok: true,
    report: {
      ...report,
      status: "approved",
      approvedBy: actor.userId,
      approvedAt: now,
    },
  };
}

// =====================================================
// 6. GỬI BÁO CÁO ĐÃ ĐƯỢC PHÊ DUYỆT
// =====================================================

export function submitSchoolReport(
  report: SchoolReport,
  actor: ReportActionActor,
  now = new Date().toISOString(),
): ReportActionResult {
  const fail = (error: string): ReportActionResult => ({
    ok: false,
    report,
    error,
  });

  if (!actor.canSubmit || !actor.userId.trim()) {
    return fail(
      "Không có quyền gửi báo cáo.",
    );
  }

  if (report.status !== "approved") {
    return fail(
      "Chỉ được gửi báo cáo đã phê duyệt.",
    );
  }

  if (!report.approvedBy || !report.approvedAt) {
    return fail(
      "Báo cáo chưa có thông tin phê duyệt.",
    );
  }

  if (!validDate(now)) {
    return fail(
      "Thời gian gửi báo cáo không hợp lệ.",
    );
  }

  return {
    ok: true,
    report: {
      ...report,
      status: "submitted",
    },
  };
}

// =====================================================
// 7. TẠO PHIÊN BẢN THAY THẾ
// =====================================================

export function canCreateNewReportVersion(
  report: SchoolReport,
): boolean {
  return (
    report.status === "submitted" ||
    report.status === "approved" ||
    report.status === "superseded"
  );
}

/**
 * Chuyển báo cáo cũ sang trạng thái superseded.
 * Không xóa dữ liệu và không thay đổi snapshot cũ.
 */

export function supersedeSchoolReport(
  report: SchoolReport,
): SchoolReport {
  if (!canCreateNewReportVersion(report)) {
    throw new Error(
      "Trạng thái báo cáo hiện tại không cho phép thay thế phiên bản.",
    );
  }

  return {
    ...report,
    status: "superseded",
  };
}

// =====================================================
// 8. KIỂM TRA TÍNH NHẤT QUÁN CỦA CÁC PHIÊN BẢN
// =====================================================

export function validateReportVersionSequence<T>(
  versions: readonly ReportVersion<T>[],
): boolean {
  if (versions.length === 0) {
    return true;
  }

  const sorted = [...versions].sort(
    (a, b) => a.version - b.version,
  );

  const reportId = sorted[0].reportId;

  for (let index = 0; index < sorted.length; index++) {
    const current = sorted[index];

    if (
      current.reportId !== reportId ||
      !isValidReportVersion(current)
    ) {
      return false;
    }

    if (current.version !== index + 1) {
      return false;
    }
  }

  return true;
}
