
type SectionTitleProps = {
  title: string;
  description?: string;
};

export default function SectionTitle({
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-green-800">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      )}

      <div className="mt-3 h-1 w-16 rounded bg-green-600" />
    </div>
  );
}
