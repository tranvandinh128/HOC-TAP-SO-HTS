import "server-only";

import { AuthApiError } from "@/lib/auth/http";
import {
  requireAuthenticatedUser,
  type AuthenticatedUser,
} from "@/lib/auth/service";
import type { D1Repository } from "@/lib/d1/repository";

export type LessonSubmissionAccess = {
  user: AuthenticatedUser;
  lessonId: number;
  courseId: number;
  fieldId: number;
  fieldSlug: string;
  canManage: boolean;
};

export function canManageLearningSubmissions(
  user: AuthenticatedUser,
  fieldId: number,
  fieldSlug: string,
): boolean {
  return user.roles.some(
    (role) =>
      role.role === "super_admin" ||
      (role.fieldId === fieldId &&
        (role.role === "field_admin" ||
          role.permissions.includes("learning.submissions.manage") ||
        (fieldSlug === "luc-luong-vu-trang" &&
          role.permissions.includes("military.programs.manage")))),
  );
}

export function getLearningActorRole(
  user: AuthenticatedUser,
  fieldId: number,
): string {
  return (
    user.roles.find((role) => role.role === "super_admin")?.role ??
    user.roles.find((role) => role.fieldId === fieldId)?.role ??
    "learner"
  );
}

export async function requireLessonSubmissionAccess(
  db: D1Repository,
  request: Request,
  lessonId: number,
): Promise<LessonSubmissionAccess> {
  const user = await requireAuthenticatedUser(db, request);
  const lesson = await db.first<{
    id: number;
    course_id: number;
    field_id: number;
    field_slug: string;
  }>(
    `SELECT l.id, c.id AS course_id, c.field_id, f.slug AS field_slug
     FROM lessons l
     JOIN courses c ON c.id = l.course_id
     JOIN learning_fields f ON f.id = c.field_id
     WHERE l.id = ? AND c.status = 'published'
       AND l.status = 'published' AND f.is_active = 1`,
    [lessonId],
  );

  if (!lesson) {
    throw new AuthApiError(404, "lesson_not_found", "Không tìm thấy bài học.");
  }

  const canManage = canManageLearningSubmissions(
    user,
    lesson.field_id,
    lesson.field_slug,
  );
  const hasFieldMembership = user.learningFields.some(
    (field) => field.id === lesson.field_id,
  );

  if (lesson.field_slug === "luc-luong-vu-trang") {
    if (!hasFieldMembership) {
      throw new AuthApiError(
        403,
        "learning_field_membership_required",
        "Bạn chưa có quyền truy cập lĩnh vực này.",
      );
    }

    const latestReview = await db.first<{ status: string }>(
      `SELECT status
       FROM learning_field_membership_reviews
       WHERE user_id = ? AND field_id = ?
       ORDER BY created_at DESC, rowid DESC
       LIMIT 1`,
      [user.id, lesson.field_id],
    );
    if (latestReview?.status !== "approved") {
      throw new AuthApiError(
        403,
        "military_membership_unverified",
        "Tư cách thành viên Lực lượng vũ trang chưa được phê duyệt.",
      );
    }
  } else if (!hasFieldMembership && !canManage) {
    throw new AuthApiError(
      403,
      "learning_field_membership_required",
      "Bạn chưa có quyền truy cập lĩnh vực này.",
    );
  }

  return {
    user,
    lessonId: lesson.id,
    courseId: lesson.course_id,
    fieldId: lesson.field_id,
    fieldSlug: lesson.field_slug,
    canManage,
  };
}

export async function requireLessonEnrollment(
  db: D1Repository,
  access: LessonSubmissionAccess,
): Promise<void> {
  const enrollment = await db.first<{ course_id: number }>(
    `SELECT course_id
     FROM course_enrollments
     WHERE course_id = ? AND user_id = ?
       AND enrollment_status = 'enrolled'`,
    [access.courseId, access.user.id],
  );
  if (!enrollment) {
    throw new AuthApiError(
      403,
      "lesson_submission_not_allowed",
      "Chỉ học viên đã ghi danh vào chương trình mới có thể gửi báo cáo.",
    );
  }
}
