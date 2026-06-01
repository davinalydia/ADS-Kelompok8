export default function StatsCard({
  title,
  value,
  description,
  icon,
  color,
}) {

  const colorStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-start justify-between">

      <div>

        <p className="text-gray-500 text-sm font-medium mb-3">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-gray-900">
          {value}
        </h2>

        <p className="text-sm text-gray-400 mt-3">
          {description}
        </p>

      </div>

      <div
        className={`p-4 rounded-2xl ${colorStyles[color]}`}
      >
        {icon}
      </div>

    </div>
  );
}