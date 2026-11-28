import { NextResponse } from "next/server";

import {
  AuthApiError,
  handleAuthApi,
  readJsonObject,
} from "@/lib/auth/http";
import {
  getLearningActorRole,
  requireLessonEnrollment,
  requireLessonSubmissionAccess,
} from "@/lib/learning/submission-access";
import type { D1Repository } from "@/lib/d1/repository";

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

async function getSubmissions(
  db: D1Repository,
  access: Awaited<ReturnType<typeof requireLessonSubmissionAccess>>,
) {
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
     LEFT JOIN lesson_submission_files f ON f.submission_id = s.id
     WHERE s.lesson_id = ? AND c.field_id = ?
       AND (
         (? = 1 AND s.status != 'draft')
         OR (? = 0 AND s.submitted_by = ?)
       )
     ORDER BY s.created_at DESC, f.created_at
     LIMIT 500`,
    [
      access.lessonId,
      access.fieldId,
      access.canManage ? 1 : 0,
      access.canManage ? 1 : 0,
      access.user.id,
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

  return [...submissions.values()];
}

export async function GET(
  request: Request,
  { params }: SubmissionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const lessonId = parseLessonId((await params).lessonId);
    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    if (!access.canManage) {
      await requireLessonEnrollment(db, access);
    }

    return NextResponse.json(
      {
        submissions: await getSubmissions(db, access),
        canManage: access.canManage,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}

export async function POST(
  request: Request,
  { params }: SubmissionsRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const lessonId = parseLessonId((await params).lessonId);
    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    await requireLessonEnrollment(db, access);

    const body = await readJsonObject(currentRequest);
    const note = body.note;
    if (note !== undefined && (typeof note !== "string" || note.length > 2000)) {
      throw new AuthApiError(
        400,
        "invalid_submission_note",
        "Ghi chú nộp bài không hợp lệ.",
      );
    }

    const submissionId = crypto.randomUUID();
    const results = await db.batch([
      {
        sql: `INSERT INTO lesson_submissions
                (id, lesson_id, submitted_by, note, status)
              VALUES (?, ?, ?, ?, 'draft')`,
        values: [
          submissionId,
          access.lessonId,
          access.user.id,
          typeof note === "string" ? note.trim() : "",
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'lesson_submission.draft_created', 'education',
                     'lesson_submission', ?, ?, 'success',
                     'Learner created a lesson submission draft'
              WHERE changes() = 1`,
        values: [
          access.user.id,
          getLearningActorRole(access.user, access.fieldId),
          submissionId,
          access.fieldId,
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

export async function submitLessonSubmission(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ lessonId: string; submissionId: string }>;
  },
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const { lessonId: lessonIdText, submissionId } = await params;
    const lessonId = parseLessonId(lessonIdText);
    if (!/^[0-9a-f-]{36}$/i.test(submissionId)) {
      throw new AuthApiError(
        400,
        "invalid_submission_id",
        "Mã bài nộp không hợp lệ.",
      );
    }

    const access = await requireLessonSubmissionAccess(
      db,
      currentRequest,
      lessonId,
    );
    await requireLessonEnrollment(db, access);
    const results = await db.batch([
      {
        sql: `UPDATE lesson_submissions
              SET status = 'submitted'
              WHERE id = ? AND lesson_id = ? AND submitted_by = ?
                AND status = 'draft'
                AND EXISTS (
                  SELECT 1 FROM lesson_submission_files
                  WHERE submission_id = ?
                )`,
        values: [
          submissionId,
          lessonId,
          access.user.id,
          submissionId,
        ],
      },
      {
        sql: `INSERT INTO activity_logs
                (actor_user_id, actor_role, action, category, entity_type,
                 entity_id, field_id, outcome, summary)
              SELECT ?, ?, 'lesson.submitted', 'education',
                     'lesson_submission', ?, ?, 'success',
                     'Learner submitted lesson work'
              WHERE changes() = 1`,
        values: [
          access.user.id,
          getLearningActorRole(access.user, access.fieldId),
          submissionId,
          access.fieldId,
        ],
      },
    ]);

    if (results[0].meta.changes !== 1) {
      throw new AuthApiError(
        409,
        "submission_not_ready",
        "Bản nháp cần có ít nhất một tệp và chưa được gửi trước đó.",
      );
    }

    return NextResponse.json(
      { id: submissionId, status: "submitted" },
      { headers: { "Cache-Control": "no-store" } },
    );
  });
}
