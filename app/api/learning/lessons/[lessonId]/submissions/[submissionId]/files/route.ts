import { uploadSubmissionFile } from "@/lib/learning/submission-file-api";

type SubmissionFilesRouteContext = {
  params: Promise<{ lessonId: string; submissionId: string }>;
};

export async function POST(
  request: Request,
  context: SubmissionFilesRouteContext,
) {
  return uploadSubmissionFile(request, context);
}
