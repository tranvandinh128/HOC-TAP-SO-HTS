import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
} from "@/lib/auth/http";
import {
  canManageMilitaryPrograms,
  getMilitaryActorRole,
  requireMilitaryMembership,
} from "@/lib/military/access";

type SubmissionsRouteContext = {
  params: Promise<{ lessonId: string }>;
};

function parseLessonId(value: string): number {
  const lessonId = Number(value);
  if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
    throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
  }
  return lessonId;
}

export async function GET(
  request: Request,
  { params }: SubmissionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const lessonId = parseLessonId((await params).lessonId);
    const canManage = canManageMilitaryPrograms(context);
    const lesson = await db.first<{ id: number }>(
      `SELECT l.id
       FROM lessons l
       JOIN courses c ON c.id = l.course_id
       JOIN military_program_metadata m ON m.course_id = c.id
       WHERE l.id = ? AND c.field_id = ? AND c.status = 'published'
         AND l.status = 'published'`,
      [lessonId, context.fieldId],
    );
    if (!lesson) {
      throw new AuthApiError(404, "lesson_not_found", "Không tìm thấy bài học.");
    }

    const rows = await db.all<{
      id: string;
      submitted_by: string;
      display_name: string | null;
      note: string;
      status: string;
      created_at: string;
      file_id: string | null;
      original_filename: string | null;
      media_type: string | null;
      byte_size: number | null;
    }>(
      `SELECT s.id, s.submitted_by, p.display_name, s.note, s.status,
              s.created_at, f.id AS file_id, f.original_filename,
              f.media_type, f.byte_size
       FROM lesson_submissions s
       JOIN profiles p ON p.id = s.submitted_by
       JOIN lessons l ON l.id = s.lesson_id
       JOIN courses c ON c.id = l.course_id
       LEFT JOIN lesson_submission_files f
         ON f.submission_id = s.id
       WHERE s.lesson_id = ? AND c.field_id = ?
         AND (
           (? = 1 AND s.status != 'draft')
           OR (? = 0 AND s.submitted_by = ?)
         )
       ORDER BY s.created_at DESC, f.created_at
       LIMIT 500`,
      [
        lessonId,
        context.fieldId,
        canManage ? 1 : 0,
        canManage ? 1 : 0,
        context.user.id,
      ],
    );

    const submissions = new Map<
      string,
      {
        id: string;
        submittedBy: string;
        displayName: string | null;
        note: string;
        status: string;
        createdAt: string;
        files: Array<{
          id: string;
          originalFilename: string;
          mediaType: string;
          byteSize: number;
        }>;
      }
    >();
    for (const row of rows) {
      let submission = submissions.get(row.id);
      if (!submission) {
        submission = {
          id: row.id,
          submittedBy: row.submitted_by,
          displayName: row.display_name,
          note: row.note,
          status: row.status,
          createdAt: row.created_at,
          files: [],
        };
        submissions.set(row.id, submission);
      }
      if (
        row.file_id &&
        row.original_filename &&
        row.media_type &&
        row.byte_size !== null
      ) {
        submission.files.push({
          id: row.file_id,
          originalFilename: row.original_filename,
          mediaType: row.media_type,
          byteSize: row.byte_size,
        });
      }
    }

    return NextResponse.json(
      { submissions: [...submissions.values()], canManage },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: SubmissionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const context = await requireMilitaryMembership(db, currentRequest);
    const lessonId = parseLessonId((await params).lessonId);
    const body = await readJsonObject(currentRequest);
    const noteValue = body.note;
    if (
      noteValue !== undefined &&
      (typeof noteValue !== "string" || noteValue.trim().length > 2000)
    ) {
      throw new AuthApiError(400, "invalid_note", "Ghi chú nộp bài không hợp lệ.");
    }

    const enrollment = await db.first<{ id: number }>(
      `SELECT l.id
       FROM lessons l
       JOIN courses c ON c.id = l.course_id
       JOIN military_program_metadata m ON m.course_id = c.id
       JOIN course_enrollments e ON e.course_id = c.id
       WHERE l.id = ? AND c.field_id = ? AND c.status = 'published'
         AND l.status = 'published' AND e.user_id = ?
         AND e.enrollment_status = 'enrolled'`,
      [lessonId, context.fieldId, context.user.id],
    );
    if (!enrollment) {
      throw new AuthApiError(
        403,
        "lesson_submission_not_allowed",
        "Chỉ học viên đã ghi danh vào chương trình mới có thể nộp bài.",
      );
    }

    const submissionId = crypto.randomUUID();
    const results = await db.batch([
      {
        sql: `INSERT INTO lesson_submissions
                (id, lesson_id, submitted_by, note)
              VALUES (?, ?, ?, ?)`,
        values: [
          submissionId,
          lessonId,
          context.user.id,
          typeof noteValue === "string" ? noteValue.trim() : "",
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'lesson_submission.draft_created',
                     'education', 'lesson_submission', ?,
                     ?, 'success', 'Learner created a lesson submission draft'
              WHERE changes() = 1`,
        values: [
          context.user.id,
          getMilitaryActorRole(context),
          submissionId,
          context.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1) {
      throw new Error("Lesson submission was not saved.");
    }

    return NextResponse.json(
      { id: submissionId, status: "draft" },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  });
}
