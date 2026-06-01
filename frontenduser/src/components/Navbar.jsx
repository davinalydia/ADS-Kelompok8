import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

import bell from '../assets/bell.png'
import user from '../assets/user.png'

import API from "../services/api"

export default function Navbar({
  title,
  subtitle,
  showBackButton = false,
}) {

  const navigate = useNavigate()

  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {

    try {

      const userId = localStorage.getItem("userId")

      const res = await API.get(
        `/notifications?role=user&user_id=${userId}`
      )

      const unread = res.data.some(
        (item) => item.is_read === false
      )

      setHasUnread(unread)

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="flex items-center justify-between px-8 pt-8">

      {/* LEFT */}
      <div className="flex items-center gap-5">

        {showBackButton ? (

          <button
            onClick={() => navigate(-1)}
            className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >

            <span className="text-lg">
              ←
            </span>

            <span className="font-medium text-gray-700">
              Back
            </span>

          </button>

        ) : (

          <div>

            {subtitle && (
              <p className="text-sm text-gray-400 mb-2">
                {subtitle}
              </p>
            )}

            {title && (
              <h1 className="text-4xl font-bold text-gray-800">
                {title}
              </h1>
            )}

          </div>

        )}

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() => navigate("/notifikasi-user")}
            className="bg-white p-3 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300"
          >

            <img
              src={bell}
              alt="notification"
              className="w-5 h-5"
            />

          </button>

          {hasUnread && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          )}

        </div>

        {/* USER */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer">

          <img
            src={user}
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          <div>

            <h2 className="font-semibold text-gray-800 text-sm">
              {localStorage.getItem("userName")}
            </h2>

            <p className="text-xs text-gray-400">
              User
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}