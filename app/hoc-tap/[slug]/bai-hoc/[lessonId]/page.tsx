import SharedLearningLessonPage from "@/components/SharedLearningLessonPage";

export const dynamic = "force-dynamic";

type SharedLessonPageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
};

export default async function LearningLessonPage({
  params,
}: SharedLessonPageProps) {
  const { slug, lessonId } = await params;
  return <SharedLearningLessonPage slug={slug} lessonId={lessonId} />;
}
