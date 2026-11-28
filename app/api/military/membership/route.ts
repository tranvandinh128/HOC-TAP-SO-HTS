import { NextResponse } from "next/server";

import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import { requireAuthenticatedUser } from "@/lib/auth/service";
import { getMilitaryAccessContext } from "@/lib/military/access";

export async function GET(request: Request) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await getMilitaryAccessContext(db, currentRequest);
    if (!context) {
      throw new AuthApiError(
        401,
        "authentication_required",
        "Vui lòng đăng nhập để tiếp tục.",
      );
    }

    const review = await db.first<{ id: string; status: string }>(
      `SELECT id, status
       FROM learning_field_membership_reviews
       WHERE user_id = ? AND field_id = ?
       ORDER BY rowid DESC
       LIMIT 1`,
      [context.user.id, context.fieldId],
    );

    return NextResponse.json(
      {
        status: review?.status ?? "not_requested",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(request: Request) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const user = await requireAuthenticatedUser(db, currentRequest);
    const field = await db.first<{ id: number }>(
      `SELECT id
       FROM learning_fields
       WHERE slug = 'luc-luong-vu-trang' AND is_active = 1`,
    );

    if (!field) {
      throw new Error("The armed-forces learning field is not configured.");
    }

    const latestReview = await db.first<{ id: string; status: string }>(
      `SELECT id, status
       FROM learning_field_membership_reviews
       WHERE user_id = ? AND field_id = ?
       ORDER BY rowid DESC
       LIMIT 1`,
      [user.id, field.id],
    );

    if (latestReview?.status === "pending") {
      return NextResponse.json(
        { id: latestReview.id, status: latestReview.status },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    if (latestReview?.status === "approved") {
      throw new AuthApiError(
        409,
        "membership_already_approved",
        "Membership đã được phê duyệt.",
      );
    }

    const reviewId = crypto.randomUUID();
    await db.batch([
      {
        sql: `INSERT OR IGNORE INTO user_learning_fields (user_id, field_id)
              VALUES (?, ?)`,
        values: [user.id, field.id],
      },
      {
        sql: `INSERT INTO learning_field_membership_reviews
                (id, user_id, field_id, status)
              VALUES (?, ?, ?, 'pending')`,
        values: [reviewId, user.id, field.id],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              VALUES (?, 'learner', 'field_membership.requested',
                      'membership', 'learning_field_membership_review',
                      ?, ?, 'success', 'Membership review requested')`,
        values: [user.id, reviewId, field.id],
      },
    ]);

    return NextResponse.json(
      { id: reviewId, status: "pending" },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
