import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import dashboard from '../assets/dashboard.png'
import calendar from '../assets/calendar.png'
import clock from '../assets/clock.png'

import API from '../services/api'

export default function DashboardUser() {

  const navigate = useNavigate()

  const userName = localStorage.getItem("userName") || "User"

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    today: 0
  })

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBookings()
  }, [])

  const getBookings = async () => {

    try {

      const res = await API.get("/bookings")

      const allBookings = res.data || []

      // ambil booking milik user yg login
      const userBookings = allBookings.filter(
        (item) => item.user_name === userName
      )

      setBookings(userBookings)

      // total
      const total = userBookings.length

      // pending
      const pending = userBookings.filter(
        (item) => item.status === "pending"
      ).length

      // jadwal hari ini
      const todayDate = new Date().toISOString().split("T")[0]

      const today = userBookings.filter(
        (item) => item.booking_date === todayDate
      ).length

      setStats({
        total,
        pending,
        today
      })

    } catch (err) {

      console.log(err)

    }
  }

  const getStatusStyle = (status) => {

    if (status === "approved") {
      return "bg-green-100 text-green-700"
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700"
    }

    return "bg-yellow-100 text-yellow-700"
  }

  const getStatusText = (status) => {

    if (status === "approved") {
      return "Disetujui"
    }

    if (status === "rejected") {
      return "Ditolak"
    }

    return "Pending"
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          subtitle="Selamat Datang di Peminjaman Fasilitas IPB University 👋"
          title={userName}
        />

        <main className="p-8 overflow-auto">

          {/* CARD STATS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            {/* TOTAL */}
            <div
              onClick={() => navigate('/riwayat')}
              className="bg-white rounded-[28px] p-6 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Total Peminjaman
                  </p>

                  <h2 className="text-4xl font-bold text-gray-800">
                    {stats.total}
                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <img
                    src={dashboard}
                    alt="dashboard"
                    className="w-6 h-6"
                  />

                </div>

              </div>

            </div>

            {/* PENDING */}
            <div
              onClick={() => navigate('/riwayat')}
              className="bg-white rounded-[28px] p-6 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Menunggu Approval
                  </p>

                  <h2 className="text-4xl font-bold text-yellow-500">
                    {stats.pending}
                  </h2>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <img
                    src={clock}
                    alt="clock"
                    className="w-6 h-6"
                  />

                </div>

              </div>

            </div>

            {/* JADWAL */}
            <div
              onClick={() => navigate('/pemesanan-fasilitas')}
              className="bg-white rounded-[28px] p-6 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Jadwal Hari Ini
                  </p>

                  <h2 className="text-4xl font-bold text-green-600">
                    {stats.today}
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <img
                    src={calendar}
                    alt="calendar"
                    className="w-6 h-6"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-3 gap-6">

            {/* RIWAYAT */}
            <div className="col-span-2 bg-white rounded-[28px] p-8 shadow-sm">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Peminjaman Terbaru
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Daftar peminjaman fasilitas terbaru.
                  </p>

                </div>

                <button
                  onClick={() => navigate('/riwayat')}
                  className="px-5 py-3 rounded-2xl bg-blue-800 text-white hover:opacity-90 transition-all duration-300"
                >
                  Lihat Semua
                </button>

              </div>

              <div className="space-y-4">

                {bookings.length > 0 ? (

                  bookings.slice(0, 5).map((item) => (

                    <div
                      key={item.id}
                      onClick={() => navigate(`/detail-peminjaman/${item.id}`)}
                      className="bg-[#F9FAFB] rounded-3xl p-5 flex items-center justify-between hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >

                      <div>

                        <h3 className="font-semibold text-gray-800 text-lg">
                          {item.facility_name}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                          {item.booking_date} • {item.start_time} - {item.end_time}
                        </p>

                      </div>

                      <span
                        className={`px-5 py-2 rounded-full text-sm font-medium ${getStatusStyle(item.status)}`}
                      >
                        {getStatusText(item.status)}
                      </span>

                    </div>

                  ))

                ) : (

                  <div className="text-gray-400 text-center py-10">
                    Belum ada peminjaman
                  </div>

                )}

              </div>

            </div>

            {/* SIDE CARD */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-500 rounded-[28px] p-8 text-white shadow-sm flex flex-col justify-between">

              <div>

                <p className="text-blue-100 mb-2">
                  Jadwal Hari Ini
                </p>

                <h2 className="text-3xl font-bold leading-snug mb-4">
                  {stats.today} Jadwal Peminjaman Hari Ini
                </h2>

                <p className="text-sm text-blue-100 leading-relaxed">
                  Pastikan jadwal peminjaman sesuai dengan waktu yang telah dipilih.
                </p>

              </div>

              <button
                onClick={() => navigate('/pemesanan-fasilitas')}
                className="mt-8 bg-white text-blue-800 py-4 rounded-2xl font-semibold hover:opacity-90 transition-all duration-300"
              >
                Lihat Jadwal
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}