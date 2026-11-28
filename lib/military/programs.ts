import "server-only";

import type { D1Repository } from "@/lib/d1/repository";
import { AuthApiError } from "@/lib/auth/http";

export function parseMilitaryCourseId(value: string): number {
  const courseId = Number(value);
  if (!Number.isSafeInteger(courseId) || courseId < 1) {
    throw new AuthApiError(400, "invalid_course_id", "Mã chương trình không hợp lệ.");
  }
  return courseId;
}

export async function requireMilitaryCourse(
  db: D1Repository,
  fieldId: number,
  courseId: number,
  options: { publishedOnly?: boolean } = {},
): Promise<{ id: number; status: string }> {
  const course = await db.first<{ id: number; status: string }>(
    `SELECT id, status
     FROM courses
     WHERE id = ? AND field_id = ?
       AND EXISTS (
         SELECT 1 FROM military_program_metadata m
         WHERE m.course_id = courses.id
       )`,
    [courseId, fieldId],
  );

  if (!course) {
    throw new AuthApiError(404, "program_not_found", "Không tìm thấy chương trình.");
  }

  if (options.publishedOnly && course.status !== "published") {
    throw new AuthApiError(
      404,
      "program_not_found",
      "Không tìm thấy chương trình.",
    );
  }

  return course;
}
