import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300"
    >
      <span className="text-xl">
        ←
      </span>

      <span className="font-medium text-gray-700">
        Back
      </span>
    </button>
  )
}