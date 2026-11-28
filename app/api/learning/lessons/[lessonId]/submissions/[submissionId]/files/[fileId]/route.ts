import { AuthApiError, handleAuthApi } from "@/lib/auth/http";
import { getSubmissionFileResponse } from "@/lib/learning/submission-file-api";

type SubmissionFileRouteContext = {
  params: Promise<{
    lessonId: string;
    submissionId: string;
    fileId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: SubmissionFileRouteContext,
) {
  return handleAuthApi(request, async (db, currentRequest) => {
    const {
      lessonId: lessonIdText,
      submissionId,
      fileId,
    } = await params;
    const lessonId = Number(lessonIdText);
    if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
      throw new AuthApiError(400, "invalid_lesson_id", "Mã bài học không hợp lệ.");
    }
    if (
      !/^[0-9a-f-]{36}$/i.test(submissionId) ||
      !/^[0-9a-f-]{36}$/i.test(fileId)
    ) {
      throw new AuthApiError(400, "invalid_file_id", "Mã tệp không hợp lệ.");
    }
    return getSubmissionFileResponse(
      db,
      currentRequest,
      lessonId,
      submissionId,
      fileId,
    );
  });
}
