import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
  requiredString,
} from "@/lib/auth/http";
import {
  getMilitaryActorRole,
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";

type ProgramRouteContext = {
  params: Promise<{ courseId: string }>;
};

function optionalText(
  value: unknown,
  fieldName: string,
  maxLength: number,
): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  if (typeof value !== "string" || value.trim().length > maxLength) {
    throw new AuthApiError(400, "invalid_input", `Trường ${fieldName} không hợp lệ.`);
  }
  return value.trim();
}

export async function GET(
  request: Request,
  { params }: ProgramRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const courseId = parseMilitaryCourseId((await params).courseId);
    const program = await db.first<Record<string, unknown>>(
      `SELECT c.id, c.slug, c.title, c.description, c.status,
              m.program_type, m.objective, m.plan_summary,
              c.created_at, c.updated_at
       FROM courses c
       JOIN military_program_metadata m ON m.course_id = c.id
       WHERE c.id = ? AND c.field_id = ?
         AND (? = 1 OR c.status = 'published')`,
      [
        courseId,
        context.fieldId,
        context.user.roles.some(
          (role) =>
            role.role === "super_admin" ||
            (role.fieldId === context.fieldId &&
              (role.role === "field_admin" ||
                role.permissions.includes("military.programs.manage"))),
        )
          ? 1
          : 0,
      ],
    );

    if (!program) {
      throw new AuthApiError(404, "program_not_found", "Không tìm thấy chương trình.");
    }

    return NextResponse.json(
      { program, canManage: context.user.roles.some(
        (role) =>
          role.role === "super_admin" ||
          (role.fieldId === context.fieldId &&
            (role.role === "field_admin" ||
              role.permissions.includes("military.programs.manage"))),
      ) },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function PATCH(
  request: Request,
  { params }: ProgramRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const body = await readJsonObject(currentRequest);
    const courseAssignments: string[] = [];
    const courseValues: Array<string | number | null> = [];
    const metadataAssignments: string[] = [];
    const metadataValues: Array<string | number | null> = [];
    let publishRequested = false;

    if ("title" in body) {
      courseAssignments.push("title = ?");
      courseValues.push(requiredString(body.title, "title", 200));
    }
    if ("description" in body) {
      courseAssignments.push("description = ?");
      courseValues.push(optionalText(body.description, "description", 2000));
    }
    if ("objective" in body) {
      metadataAssignments.push("objective = ?");
      metadataValues.push(requiredString(body.objective, "objective", 4000));
    }
    if ("planSummary" in body) {
      metadataAssignments.push("plan_summary = ?");
      metadataValues.push(requiredString(body.planSummary, "planSummary", 8000));
    }
    if ("status" in body) {
      const status = requiredString(body.status, "status", 20);
      if (status !== "published") {
        throw new AuthApiError(
          400,
          "invalid_program_status",
          "Chỉ có thể chuyển chương trình nháp sang trạng thái đã phát hành.",
        );
      }
      if (courseAssignments.length > 0 || metadataAssignments.length > 0) {
        throw new AuthApiError(
          400,
          "publish_must_be_separate",
          "Hãy lưu nội dung chương trình trước khi phát hành.",
        );
      }
      courseAssignments.push("status = 'published'");
      publishRequested = true;
    }
    if (courseAssignments.length === 0 && metadataAssignments.length === 0) {
      throw new AuthApiError(
        400,
        "empty_update",
        "Không có trường hợp lệ để cập nhật.",
      );
    }

    if (courseAssignments.length > 0) {
      courseAssignments.push("updated_at = CURRENT_TIMESTAMP");
    }
    if (metadataAssignments.length > 0) {
      metadataAssignments.push("updated_at = CURRENT_TIMESTAMP");
    }

    const operations = [];
    if (courseAssignments.length > 0) {
      operations.push({
        sql: `UPDATE courses SET ${courseAssignments.join(", ")}
              WHERE id = ? AND field_id = ? AND status = 'draft'
                ${publishRequested
                  ? `AND EXISTS (
                       SELECT 1 FROM lessons
                       WHERE course_id = ? AND status = 'published'
                     )
                     AND NOT EXISTS (
                       SELECT 1 FROM lessons
                       WHERE course_id = ? AND status != 'published'
                     )`
                  : ""}`,
        values: publishRequested
          ? [...courseValues, courseId, context.fieldId, courseId, courseId]
          : [...courseValues, courseId, context.fieldId],
      });
    }
    if (metadataAssignments.length > 0) {
      operations.push({
        sql: `UPDATE military_program_metadata
              SET ${metadataAssignments.join(", ")}
              WHERE course_id = ?
                AND EXISTS (
                  SELECT 1 FROM courses
                  WHERE id = ? AND field_id = ? AND status = 'draft'
                )`,
        values: [...metadataValues, courseId, courseId, context.fieldId],
      });
    }
    operations.push({
      sql: `INSERT INTO activity_logs
              (actor_user_id, actor_role, action, category, entity_type,
               entity_id, field_id, outcome, summary)
            SELECT ?, ?, 'military_program.updated', 'education', 'course',
                   CAST(id AS TEXT), ?, 'success', 'Military program updated'
            FROM courses
            WHERE id = ? AND field_id = ? AND changes() = 1`,
      values: [
        context.user.id,
        getMilitaryActorRole(context),
        context.fieldId,
        courseId,
        context.fieldId,
      ],
    });

    const results = await db.batch(operations);
    if (results.some((result) => result.meta.changes === 0)) {
      throw new AuthApiError(
        409,
        "program_not_editable",
        "Chỉ có thể cập nhật chương trình đang ở trạng thái nháp.",
      );
    }

    return NextResponse.json(
      { id: courseId, updated: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
