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
import {
  parseMilitaryCourseId,
  requireMilitaryCourse,
} from "@/lib/military/programs";

type LessonsRouteContext = {
  params: Promise<{ courseId: string }>;
};

const lessonTypes = ["text", "video", "document", "quiz"] as const;

function isLessonType(value: string): value is (typeof lessonTypes)[number] {
  return lessonTypes.some((lessonType) => lessonType === value);
}

export async function GET(
  request: Request,
  { params }: LessonsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const courseId = parseMilitaryCourseId((await params).courseId);
    const canManage = canManageMilitaryPrograms(context);
    await requireMilitaryCourse(db, context.fieldId, courseId, {
      publishedOnly: !canManage,
    });

    const lessons = await db.all<{
      id: number;
      slug: string;
      title: string;
      content: string | null;
      lesson_type: string;
      status: string;
      sort_order: number;
      content_version_id: string | null;
      version_status: string | null;
      created_by_current_user: number;
    }>(
      `SELECT l.id, l.slug, l.title,
              CASE WHEN ? = 1 THEN COALESCE(v.content, l.content)
                   ELSE l.content END AS content,
              l.lesson_type, l.status, l.sort_order,
              CASE WHEN ? = 1 THEN v.id ELSE NULL END AS content_version_id,
              CASE WHEN ? = 1 THEN v.status ELSE NULL END AS version_status,
              CASE WHEN ? = 1 AND v.created_by = ? THEN 1 ELSE 0 END
                AS created_by_current_user
       FROM lessons l
       LEFT JOIN lesson_content_versions v
         ON v.lesson_id = l.id
        AND v.version = (
          SELECT MAX(latest.version)
          FROM lesson_content_versions latest
          WHERE latest.lesson_id = l.id
        )
       WHERE l.course_id = ? AND (? = 1 OR l.status = 'published')
       ORDER BY l.sort_order, l.id
       LIMIT 500`,
      [
        canManage ? 1 : 0,
        canManage ? 1 : 0,
        canManage ? 1 : 0,
        canManage ? 1 : 0,
        context.user.id,
        courseId,
        canManage ? 1 : 0,
      ],
    );

    return NextResponse.json(
      { lessons },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: LessonsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    requireMilitaryProgramManager(context);
    const courseId = parseMilitaryCourseId((await params).courseId);
    await requireMilitaryCourse(db, context.fieldId, courseId);

    const body = await readJsonObject(currentRequest, 60_000);
    const slug = requiredString(body.slug, "slug", 100);
    const title = requiredString(body.title, "title", 200);
    const lessonType = requiredString(body.lessonType, "lessonType", 20);
    const content = requiredString(body.content, "content", 50_000);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new AuthApiError(
        400,
        "invalid_slug",
        "Slug chỉ được gồm chữ thường, số và dấu gạch nối.",
      );
    }
    if (!isLessonType(lessonType)) {
      throw new AuthApiError(
        400,
        "invalid_lesson_type",
        "Loại bài học không hợp lệ.",
      );
    }

    const versionId = crypto.randomUUID();
    await db.batch([
      {
        sql: `INSERT INTO lessons
                (course_id, slug, title, lesson_type, status)
              VALUES (?, ?, ?, ?, 'draft')`,
        values: [courseId, slug, title, lessonType],
      },
      {
        sql: `INSERT INTO lesson_content_versions
                (id, lesson_id, version, content, status, created_by)
              SELECT ?, id, 1, ?, 'draft', ?
              FROM lessons
              WHERE course_id = ? AND slug = ?`,
        values: [versionId, content, context.user.id, courseId, slug],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'military_lesson.created', 'education', 'lesson',
                     CAST(id AS TEXT), ?, 'success', 'Lesson draft created'
              FROM lessons
              WHERE course_id = ? AND slug = ?`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          context.fieldId,
          courseId,
          slug,
        ],
      },
    ]);

    const lesson = await db.first<{ id: number; slug: string; status: string }>(
      `SELECT id, slug, status
       FROM lessons
       WHERE course_id = ? AND slug = ?`,
      [courseId, slug],
    );
    if (!lesson) {
      throw new Error("Created lesson could not be read back from D1.");
    }

    return NextResponse.json(
      { lesson, contentVersionId: versionId },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
