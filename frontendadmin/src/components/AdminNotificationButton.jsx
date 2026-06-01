import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { MdNotificationsNone } from "react-icons/md"

import API from "../services/api"

export default function AdminNotificationButton() {

  const navigate = useNavigate()

  const location = useLocation()

  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [location.pathname])

  const fetchNotifications = async () => {

    try {

      const res = await API.get(
        "/notifications?role=admin"
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

    <div className="relative">

      <button
        onClick={() => navigate("/notifikasi")}
        className="bg-white p-3 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300"
      >

        <MdNotificationsNone
          size={28}
          className="text-gray-700"
        />

      </button>

      {hasUnread && (
        <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      )}

    </div>

  )
}