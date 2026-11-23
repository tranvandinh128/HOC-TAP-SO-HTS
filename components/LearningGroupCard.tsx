
type LearningGroupCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: string;
  requiresLogin: boolean;
};

export default function LearningGroupCard({
  title,
  description,
  href,
  icon,
  requiresLogin,
}: LearningGroupCardProps) {
  return (
    <a
      href={href}
      className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
    >
      {icon && (
        <div className="mb-4 text-3xl" aria-hidden="true">
          {icon}
        </div>
      )}

      <h3 className="mb-3 text-lg font-bold text-gray-800 group-hover:text-green-700">
        {title}
      </h3>

      <p className="mb-4 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mb-4">
        {requiresLogin ? (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Cần đăng nhập
          </span>
        ) : (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            Học miễn phí – Không cần tài khoản
          </span>
        )}
      </div>

      <span className="font-semibold text-green-700">
        Vào học →
      </span>
    </a>
  );
}
