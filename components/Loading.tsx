
type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loading({
  message = "Đang tải dữ liệu...",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-[200px] w-full"
      }`}
    >
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700"
      />

      <p className="text-sm font-medium text-slate-600">
        {message}
      </p>

      <span className="sr-only">Vui lòng chờ</span>
    </div>
  );
}
