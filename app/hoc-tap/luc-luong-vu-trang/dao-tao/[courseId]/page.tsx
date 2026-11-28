import FieldAccessNotice from "@/components/FieldAccessNotice";
import MilitaryTrainingProgramDetail from "@/components/MilitaryTrainingProgramDetail";
import { getMilitaryFieldAccessStatus } from "@/lib/auth/field-access";

export const dynamic = "force-dynamic";

type TrainingProgramPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function TrainingProgramPage({
  params,
}: TrainingProgramPageProps) {
  const accessStatus = await getMilitaryFieldAccessStatus();
  if (accessStatus !== "granted") {
    return <FieldAccessNotice status={accessStatus} />;
  }

  const { courseId } = await params;
  return <MilitaryTrainingProgramDetail courseId={courseId} />;
}
