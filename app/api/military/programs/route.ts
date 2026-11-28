import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
  requiredString,
} from "@/lib/auth/http";
import {
  canManageMilitaryPrograms,
  getMilitaryActorRole,
  requireMilitaryMembership,
  requireMilitaryProgramManager,
} from "@/lib/military/access";

const programTypes = [
  "general",
  "political",
  "legal",
  "professional",
  "information_technology",
  "foreign_language",
] as const;

function isProgramType(
  value: string,
): value is (typeof programTypes)[number] {
  return programTypes.some((programType) => programType === value);
}

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

export async function GET(request: Request) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const searchParams = new URL(currentRequest.url).searchParams;
    const searchValue = searchParams.get("search")?.trim() ?? "";
    const search = searchValue || null;
    const category = searchParams.get("category") || null;

    if (search && search.length > 100) {
      throw new AuthApiError(400, "invalid_search", "Từ khóa tìm kiếm quá dài.");
    }

    if (category && !isProgramType(category)) {
      throw new AuthApiError(400, "invalid_category", "Nhóm chương trình không hợp lệ.");
    }

    const programs = await db.all<{
      id: number;
      slug: string;
      title: string;
      description: string | null;
      status: string;
      program_type: string;
      objective: string;
      plan_summary: string;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT c.id, c.slug, c.title, c.description, c.status,
              m.program_type, m.objective, m.plan_summary,
              c.created_at, c.updated_at
       FROM courses c
       JOIN military_program_metadata m ON m.course_id = c.id
       WHERE c.field_id = ?
         AND (? = 1 OR c.status = 'published')
         AND (? IS NULL OR m.program_type = ?)
         AND (? IS NULL OR c.title LIKE ? OR c.description LIKE ?)
       ORDER BY c.sort_order, c.title
       LIMIT 100`,
      [
        context.fieldId,
        canManageMilitaryPrograms(context) ? 1 : 0,
        category,
        category,
        search,
        search ? `%${search}%` : null,
        search ? `%${search}%` : null,
      ],
    );

    return NextResponse.json(
      { programs, canManage: canManageMilitaryPrograms(context) },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(request: Request) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);

    const body = await readJsonObject(currentRequest);
    const slug = requiredString(body.slug, "slug", 100);
    const title = requiredString(body.title, "title", 200);
    const programType = requiredString(body.programType, "programType", 40);
    const objective = requiredString(body.objective, "objective", 4000);
    const planSummary = requiredString(body.planSummary, "planSummary", 8000);
    const description = optionalText(body.description, "description", 2000);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new AuthApiError(
        400,
        "invalid_slug",
        "Slug chỉ được gồm chữ thường, số và dấu gạch nối.",
      );
    }

    if (!isProgramType(programType)) {
      throw new AuthApiError(
        400,
        "invalid_program_type",
        "Nhóm chương trình đào tạo không hợp lệ.",
      );
    }

    await db.batch([
      {
        sql: `INSERT INTO courses
                (field_id, slug, title, description, access_level, status)
              VALUES (?, ?, ?, ?, 'restricted', 'draft')`,
        values: [context.fieldId, slug, title, description],
      },
      {
        sql: `INSERT INTO military_program_metadata
                (course_id, program_type, objective, plan_summary, created_by)
              SELECT id, ?, ?, ?, ?
              FROM courses
              WHERE field_id = ? AND slug = ?`,
        values: [
          programType,
          objective,
          planSummary,
          context.user.id,
          context.fieldId,
          slug,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_program.created',
                     'education', 'course', CAST(id AS TEXT), ?,
                     'success', 'Military education program created'
              FROM courses
              WHERE field_id = ? AND slug = ?`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          context.fieldId,
          context.fieldId,
          slug,
        ],
      },
    ]);

    const program = await db.first<{ id: number; slug: string }>(
      `SELECT id, slug FROM courses WHERE field_id = ? AND slug = ?`,
      [context.fieldId, slug],
    );

    if (!program) {
      throw new Error("Created program could not be read back from D1.");
    }

    return NextResponse.json(
      { program },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
