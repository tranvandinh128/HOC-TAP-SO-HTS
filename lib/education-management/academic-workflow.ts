import type {
  AcademicResult,
  ApprovalRecord,
  GradeChange,
  SchoolApprovalPolicy,
} from "./types";

export interface WorkflowActor {
  userId: string;
  canReview: boolean;
  canConfirm: boolean;
  canApprove: boolean;
}

export interface WorkflowResult {
  ok: boolean;
  result: AcademicResult;
  error?: string;
}

function validScore(score: number | null): boolean {
  return score === null || (Number.isFinite(score) && score >= 0 && score <= 10);
}

export function applyAiProposal(
  current: AcademicResult,
  proposedScore: number,
  confidence: number,
  manualReviewThreshold = 0.8,
): WorkflowResult {
  if (!validScore(proposedScore) || !Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
    return { ok: false, result: current, error: "Điểm hoặc độ tin cậy AI không hợp lệ." };
  }
  const needsManualReview = confidence < manualReviewThreshold;
  return {
    ok: true,
    result: {
      ...current,
      score: proposedScore,
      aiConfidence: confidence,
      requiresManualReview: needsManualReview,
      status: needsManualReview ? "needs_manual_review" : "ai_proposed",
    },
  };
}

export function teacherReviewScore(
  current: AcademicResult,
  actor: WorkflowActor,
  newScore: number,
  reason: string,
  now = new Date().toISOString(),
): WorkflowResult {
  if (!actor.canReview) return { ok: false, result: current, error: "Không có quyền rà soát điểm." };
  if (!validScore(newScore)) return { ok: false, result: current, error: "Điểm phải nằm trong khoảng 0 đến 10." };
  if (!reason.trim()) return { ok: false, result: current, error: "Phải ghi lý do rà soát hoặc điều chỉnh điểm." };
  const change: GradeChange = {
    id: `grade-change-${current.changes.length + 1}`,
    oldScore: current.score,
    newScore,
    changedBy: actor.userId,
    changedAt: now,
    reason: reason.trim(),
  };
  return {
    ok: true,
    result: {
      ...current,
      score: newScore,
      requiresManualReview: false,
      status: "teacher_reviewed",
      changes: [...current.changes, change],
    },
  };
}

export function teacherConfirmResult(
  current: AcademicResult,
  actor: WorkflowActor,
  now = new Date().toISOString(),
): WorkflowResult {
  if (!actor.canConfirm) return { ok: false, result: current, error: "Không có quyền xác nhận kết quả." };
  if (current.score === null || current.requiresManualReview) {
    return { ok: false, result: current, error: "Kết quả chưa đủ điều kiện xác nhận." };
  }
  if (!["teacher_reviewed", "ai_proposed"].includes(current.status)) {
    return { ok: false, result: current, error: "Trạng thái hiện tại không cho phép xác nhận." };
  }
  return { ok: true, result: { ...current, status: "pending_approval", teacherConfirmedBy: actor.userId, teacherConfirmedAt: now } };
}

export function approveAcademicResult(
  current: AcademicResult,
  actor: WorkflowActor,
  policy: SchoolApprovalPolicy,
  now = new Date().toISOString(),
): { workflow: WorkflowResult; approval: ApprovalRecord | null } {
  if (!actor.canApprove || !policy.active || policy.recordType !== "academic_result" || !policy.approverUserIds.includes(actor.userId)) {
    return { workflow: { ok: false, result: current, error: "Người duyệt không thuộc danh sách được nhà trường ủy quyền." }, approval: null };
  }
  if (current.status !== "pending_approval" || current.score === null) {
    return { workflow: { ok: false, result: current, error: "Kết quả chưa được giáo viên xác nhận hoặc chưa có điểm." }, approval: null };
  }
  if (policy.requiresTeacherConfirmation && !current.teacherConfirmedBy) {
    return { workflow: { ok: false, result: current, error: "Nhà trường yêu cầu giáo viên xác nhận trước khi duyệt." }, approval: null };
  }
  const approval: ApprovalRecord = {
    id: `approval-${current.id}-${Date.parse(now)}`,
    recordType: "academic_result",
    recordId: current.id,
    decision: "approve",
    actorUserId: actor.userId,
    decidedAt: now,
    reason: "Phê duyệt theo chính sách của nhà trường.",
    policyId: policy.id,
  };
  return {
    workflow: { ok: true, result: { ...current, status: "approved", approvedBy: actor.userId, approvedAt: now } },
    approval,
  };
}
