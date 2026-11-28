import { submitLessonSubmission } from "@/lib/learning/submission-api";

type SubmitLessonSubmissionRouteContext = {
  params: Promise<{ lessonId: string; submissionId: string }>;
};

export async function PATCH(
  request: Request,
  context: SubmitLessonSubmissionRouteContext,
) {
  return submitLessonSubmission(request, context);
}
