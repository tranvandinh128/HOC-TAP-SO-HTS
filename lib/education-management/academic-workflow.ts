
/**
 * HTS - QUY TRÌNH ĐÁNH GIÁ VÀ PHÊ DUYỆT KẾT QUẢ HỌC TẬP
 *
 * Quy trình:
 * AI đề xuất -> Giáo viên rà soát -> Giáo viên xác nhận
 * -> Người được ủy quyền phê duyệt -> Công bố kết quả.
 *
 * Đây là lớp nghiệp vụ TypeScript.
 * Máy chủ phải xác minh danh tính, quyền và trạng thái dữ liệu
 * trước khi lưu bất kỳ thay đổi nào vào cơ sở dữ liệu.
 */

import type {
  AcademicResult,
  ApprovalRecord,
  GradeChange,
  SchoolApprovalPolicy,
} from "./types";

// =====================================================
// 1. KIỂU DỮ LIỆU
// =====================================================

export interface WorkflowActor {
  userId: string;
  canPropose: boolean;
  canReview: boolean;
  canConfirm: boolean;
  canApprove: boolean;
  canPublish: boolean;
}

export interface WorkflowResult {
  ok: boolean;
  result: AcademicResult;
  error?: string;
}

export interface AiProposal {
  proposedScore: number;
  confidence: number;
  modelVersion: string;
  proposedAt: string;
  sourceReference: string;
}

export interface ApprovalResult {
  workflow: WorkflowResult;
  approval: ApprovalRecord | null;
}

// =====================================================
// 2. CÁC HÀM KIỂM TRA DỮ LIỆU
// =====================================================

function validScore(score: number | null): boolean {
  return (
    score === null ||
    (Number.isFinite(score) && score >= 0 && score <= 10)
  );
}

function validConfidence(confidence: number): boolean {
  return (
    Number.isFinite(confidence) &&
    confidence >= 0 &&
    confidence <= 1
  );
}

function validDate(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

function failure(
  current: AcademicResult,
  error: string,
): WorkflowResult {
  return {
    ok: false,
    result: current,
    error,
  };
}

function createGradeChange(
  current: AcademicResult,
  actor: WorkflowActor,
  newScore: number,
  reason: string,
  now: string,
): GradeChange {
  return {
    id: crypto.randomUUID(),
    oldScore: current.score,
    newScore,
    changedBy: actor.userId,
    changedAt: now,
    reason: reason.trim(),
  };
}

// =====================================================
// 3. AI ĐỀ XUẤT ĐIỂM
// =====================================================

export function applyAiProposal(
  current: AcademicResult,
  actor: WorkflowActor,
  proposal: AiProposal,
  manualReviewThreshold = 0.8,
): WorkflowResult {
  if (!actor.canPropose || !actor.userId) {
    return failure(
      current,
      "Không có quyền đề xuất điểm bằng AI.",
    );
  }

  if (!validScore(proposal.proposedScore)) {
    return failure(
      current,
      "Điểm AI đề xuất không hợp lệ.",
    );
  }

  if (!validConfidence(proposal.confidence)) {
    return failure(
      current,
      "Độ tin cậy AI không hợp lệ.",
    );
  }

  if (
    !Number.isFinite(manualReviewThreshold) ||
    manualReviewThreshold < 0 ||
    manualReviewThreshold > 1
  ) {
    return failure(
      current,
      "Ngưỡng tin cậy AI không hợp lệ.",
    );
  }

  if (
    !proposal.modelVersion.trim() ||
    !proposal.sourceReference.trim() ||
    !validDate(proposal.proposedAt)
  ) {
    return failure(
      current,
      "Thiếu thông tin nguồn hoặc phiên bản AI.",
    );
  }

  if (
    current.status === "approved" ||
    current.status === "published"
  ) {
    return failure(
      current,
      "Không thể thay đổi kết quả đã phê duyệt hoặc công bố.",
    );
  }

  const needsManualReview =
    proposal.confidence < manualReviewThreshold;

  return {
    ok: true,
    result: {
      ...current,
      score: proposal.proposedScore,
      aiConfidence: proposal.confidence,
      requiresManualReview: needsManualReview,
      status: needsManualReview
        ? "needs_manual_review"
        : "ai_proposed",
    },
  };
}

// =====================================================
// 4. GIÁO VIÊN RÀ SOÁT VÀ ĐIỀU CHỈNH ĐIỂM
// =====================================================

export function teacherReviewScore(
  current: AcademicResult,
  actor: WorkflowActor,
  newScore: number,
  reason: string,
  now = new Date().toISOString(),
): WorkflowResult {
  if (!actor.canReview || !actor.userId) {
    return failure(
      current,
      "Không có quyền rà soát điểm.",
    );
  }

  if (
    current.status !== "ai_proposed" &&
    current.status !== "needs_manual_review" &&
    current.status !== "draft" &&
    current.status !== "teacher_reviewed"
  ) {
    return failure(
      current,
      "Trạng thái hiện tại không cho phép rà soát điểm.",
    );
  }

  if (!validScore(newScore) || newScore === null) {
    return failure(
      current,
      "Điểm phải nằm trong khoảng 0 đến 10.",
    );
  }

  if (!reason.trim()) {
    return failure(
      current,
      "Phải ghi lý do rà soát hoặc điều chỉnh điểm.",
    );
  }

  if (!validDate(now)) {
    return failure(
      current,
      "Thời gian rà soát không hợp lệ.",
    );
  }

  const change = createGradeChange(
    current,
    actor,
    newScore,
    reason,
    now,
  );

  return {
    ok: true,
    result: {
      ...current,
      score: newScore,
      requiresManualReview: false,
      status: "teacher_reviewed",
      teacherConfirmedBy: null,
      teacherConfirmedAt: null,
      approvedBy: null,
      approvedAt: null,
      publishedAt: null,
      changes: [...current.changes, change],
    },
  };
}

// =====================================================
// 5. GIÁO VIÊN XÁC NHẬN KẾT QUẢ
// =====================================================

export function teacherConfirmResult(
  current: AcademicResult,
  actor: WorkflowActor,
  now = new Date().toISOString(),
): WorkflowResult {
  if (!actor.canConfirm || !actor.userId) {
    return failure(
      current,
      "Không có quyền xác nhận kết quả.",
    );
  }

  if (
    current.status !== "teacher_reviewed" &&
    current.status !== "ai_proposed"
  ) {
    return failure(
      current,
      "Kết quả chưa ở trạng thái cho phép xác nhận.",
    );
  }

  if (
    current.score === null ||
    !validScore(current.score) ||
    current.requiresManualReview
  ) {
    return failure(
      current,
      "Kết quả cần được rà soát thủ công trước khi xác nhận.",
    );
  }

  if (!validDate(now)) {
    return failure(
      current,
      "Thời gian xác nhận không hợp lệ.",
    );
  }

  return {
    ok: true,
    result: {
      ...current,
      status: "pending_approval",
      teacherConfirmedBy: actor.userId,
      teacherConfirmedAt: now,
    },
  };
}

// =====================================================
// 6. NGƯỜI ĐƯỢC ỦY QUYỀN PHÊ DUYỆT
// =====================================================

export function approveAcademicResult(
  current: AcademicResult,
  actor: WorkflowActor,
  policy: SchoolApprovalPolicy,
  now = new Date().toISOString(),
): ApprovalResult {
  const reject = (error: string): ApprovalResult => ({
    workflow: failure(current, error),
    approval: null,
  });

  if (!actor.canApprove || !actor.userId) {
    return reject(
      "Không có quyền phê duyệt kết quả.",
    );
  }

  if (
    !policy.active ||
    policy.recordType !== "academic_result"
  ) {
    return reject(
      "Chính sách phê duyệt không hợp lệ hoặc đã ngừng hoạt động.",
    );
  }

  if (!policy.approverUserIds.includes(actor.userId)) {
    return reject(
      "Người duyệt không thuộc danh sách được nhà trường ủy quyền.",
    );
  }

  if (
    !validDate(now) ||
    !validDate(policy.effectiveFrom)
  ) {
    return reject(
      "Thời hạn chính sách phê duyệt không hợp lệ.",
    );
  }

  const currentTime = Date.parse(now);
  const effectiveFrom = Date.parse(policy.effectiveFrom);

  if (currentTime < effectiveFrom) {
    return reject(
      "Chính sách phê duyệt chưa có hiệu lực.",
    );
  }

  if (policy.effectiveTo !== null) {
    if (!validDate(policy.effectiveTo)) {
      return reject(
        "Ngày kết thúc chính sách không hợp lệ.",
      );
    }

    if (currentTime > Date.parse(policy.effectiveTo)) {
      return reject(
        "Chính sách phê duyệt đã hết hiệu lực.",
      );
    }
  }

  if (
    current.status !== "pending_approval" ||
    current.score === null
  ) {
    return reject(
      "Kết quả chưa được giáo viên xác nhận hoặc chưa có điểm.",
    );
  }

  if (
    policy.requiresTeacherConfirmation &&
    !current.teacherConfirmedBy
  ) {
    return reject(
      "Nhà trường yêu cầu giáo viên xác nhận trước khi duyệt.",
    );
  }

  // Không cho phép tự phê duyệt kết quả do chính mình xác nhận.
  if (
    current.teacherConfirmedBy === actor.userId
  ) {
    return reject(
      "Người xác nhận không được tự phê duyệt kết quả này.",
    );
  }

  const approval: ApprovalRecord = {
    id: crypto.randomUUID(),
    recordType: "academic_result",
    recordId: current.id,
    decision: "approve",
    actorUserId: actor.userId,
    decidedAt: now,
    reason: "Phê duyệt theo chính sách của nhà trường.",
    policyId: policy.id,
  };

  return {
    workflow: {
      ok: true,
      result: {
        ...current,
        status: "approved",
        approvedBy: actor.userId,
        approvedAt: now,
      },
    },
    approval,
  };
}

// =====================================================
// 7. TỪ CHỐI PHÊ DUYỆT
// =====================================================

export function rejectAcademicResult(
  current: AcademicResult,
  actor: WorkflowActor,
  policy: SchoolApprovalPolicy,
  reason: string,
  now = new Date().toISOString(),
): ApprovalResult {
  const reject = (error: string): ApprovalResult => ({
    workflow: failure(current, error),
    approval: null,
  });

  if (
    !actor.canApprove ||
    !actor.userId ||
    !policy.active ||
    policy.recordType !== "academic_result" ||
    !policy.approverUserIds.includes(actor.userId)
  ) {
    return reject(
      "Không có quyền từ chối kết quả này.",
    );
  }

  if (
    current.status !== "pending_approval" ||
    !reason.trim() ||
    !validDate(now)
  ) {
    return reject(
      "Kết quả hoặc lý do từ chối không hợp lệ.",
    );
  }

  const approval: ApprovalRecord = {
    id: crypto.randomUUID(),
    recordType: "academic_result",
    recordId: current.id,
    decision: "reject",
    actorUserId: actor.userId,
    decidedAt: now,
    reason: reason.trim(),
    policyId: policy.id,
  };

  return {
    workflow: {
      ok: true,
      result: {
        ...current,
        status: "rejected",
        approvedBy: null,
        approvedAt: null,
        publishedAt: null,
      },
    },
    approval,
  };
}

// =====================================================
// 8. CÔNG BỐ KẾT QUẢ ĐÃ PHÊ DUYỆT
// =====================================================

export function publishAcademicResult(
  current: AcademicResult,
  actor: WorkflowActor,
  now = new Date().toISOString(),
): WorkflowResult {
  if (!actor.canPublish || !actor.userId) {
    return failure(
      current,
      "Không có quyền công bố kết quả.",
    );
  }

  if (current.status !== "approved") {
    return failure(
      current,
      "Chỉ được công bố kết quả đã phê duyệt.",
    );
  }

  if (!current.approvedBy || !current.approvedAt) {
    return failure(
      current,
      "Thiếu thông tin phê duyệt.",
    );
  }

  if (!validDate(now)) {
    return failure(
      current,
      "Thời gian công bố không hợp lệ.",
    );
  }

  return {
    ok: true,
    result: {
      ...current,
      status: "published",
      publishedAt: now,
    },
  };
}
