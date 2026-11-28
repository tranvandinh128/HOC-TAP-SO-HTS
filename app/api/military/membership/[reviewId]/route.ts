import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
  requiredString,
} from "@/lib/auth/http";
import {
  getMilitaryActorRole,
  requireMilitaryProgramManagerAccess,
} from "@/lib/military/access";

type ReviewRouteContext = {
  params: Promise<{ reviewId: string }>;
};

export async function PATCH(
  request: Request,
  { params }: ReviewRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const { reviewId } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(reviewId)) {
      throw new AuthApiError(400, "invalid_review_id", "Mã yêu cầu không hợp lệ.");
    }

    const context = await requireMilitaryProgramManagerAccess(
      db,
      currentRequest,
    );
    const body = await readJsonObject(currentRequest);
    const decision = requiredString(body.decision, "decision", 16);
    const note = requiredString(body.reviewNote, "reviewNote", 1000);

    if (decision !== "approved" && decision !== "rejected") {
      throw new AuthApiError(
        400,
        "invalid_decision",
        "Quyết định phải là approved hoặc rejected.",
      );
    }

    const operations = await db.batch([
      {
        sql: `UPDATE learning_field_membership_reviews
              SET status = ?, reviewed_by = ?, review_note = ?,
                  reviewed_at = CURRENT_TIMESTAMP
              WHERE id = ? AND field_id = ? AND status = 'pending'`,
        values: [decision, context.user.id, note, reviewId, context.fieldId],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'field_membership.reviewed',
                     'membership', 'learning_field_membership_review',
                     ?, ?, 'success', 'Membership review completed'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          reviewId,
          context.fieldId,
        ],
      },
    ]);

    if (operations[0].meta.changes !== 1) {
      throw new AuthApiError(
        409,
        "membership_review_not_pending",
        "Yêu cầu không tồn tại, không thuộc phạm vi quản lý hoặc đã được xử lý.",
      );
    }

    return NextResponse.json(
      { id: reviewId, status: decision },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
