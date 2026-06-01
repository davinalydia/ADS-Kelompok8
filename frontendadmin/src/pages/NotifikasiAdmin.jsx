import Sidebar from "../components/Sidebar"
import AdminNotificationButton from "../components/AdminNotificationButton"

import {
  MdOutlineMeetingRoom,
} from "react-icons/md"

import { FaUserCircle } from "react-icons/fa"

import { useEffect, useState } from "react"

import API from "../services/api"

export default function NotifikasiAdmin() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = async () => {

    try {

      const res = await API.get(
        "/notifications?role=admin"
      )

      setNotifications(res.data)

      // 🔥 notif dianggap sudah dibuka
      await Promise.all(

        res.data.map((item) =>

          API.put(`/notifications/${item.id}/read`)
        )
      )

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-[30px] font-bold text-gray-900 mb-3">
              Notifikasi Admin
            </h1>

            <p className="text-gray-500 text-lg">
              Semua pemberitahuan permintaan peminjaman.
            </p>

          </div>

          <div className="flex items-center gap-6">

            {/* 🔥 NOTIF BUTTON */}
            <AdminNotificationButton />

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">

              <FaUserCircle
                size={40}
                className="text-gray-700"
              />

              <div>

                <p className="font-semibold text-lg leading-none">
                  {localStorage.getItem("adminName")}
                </p>

                <p className="text-sm text-gray-400">
                  Admin
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* NOTIF */}
        <div className="space-y-5">

          {notifications.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-sm p-10 text-center text-gray-500">
              Belum ada notifikasi
            </div>

          ) : (

            notifications.map((item) => (

              <div
                key={item.id}
                className={`bg-white rounded-3xl shadow-sm p-6 flex items-start gap-5 border transition-all duration-300 ${
                  item.is_read
                    ? "border-gray-100"
                    : "border-blue-300"
                }`}
              >

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <MdOutlineMeetingRoom
                    size={30}
                    className="text-blue-700"
                  />

                </div>

                <div className="flex-1">

                  <div className="flex justify-between mb-2">

                    <h2 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h2>

                    <span className="text-gray-400 text-sm">
                      #{item.id}
                    </span>

                  </div>

                  <p className="text-gray-500 leading-relaxed">
                    {item.message}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  )
}