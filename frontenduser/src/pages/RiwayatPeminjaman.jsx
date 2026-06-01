import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function RiwayatPeminjaman() {

  const navigate = useNavigate()

  const userName = localStorage.getItem("userName") || "User"

  const [bookings, setBookings] = useState([])

  const [filter, setFilter] = useState('Semua')

  const [tanggal, setTanggal] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {

    try {

      setLoading(true)

      const res = await API.get("/bookings")

      const filtered = res.data.filter(
        (item) => item.user_name === userName
      )

      setBookings(filtered)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)

    }
  }

  // FILTER
  const filteredData = bookings.filter((item) => {

    const statusMap = {
      approved: 'Disetujui',
      pending: 'Pending',
      rejected: 'Ditolak'
    }

    const statusText =
      statusMap[item.status] || item.status

    const statusMatch =
      filter === 'Semua' || statusText === filter

    const tanggalMatch =
      tanggal === '' ||
      item.booking_date === tanggal

    return statusMatch && tanggalMatch
  })

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          showBackButton={true}
          subtitle="Riwayat Peminjaman"
          title={userName}
        />

        <main className="p-8 overflow-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Daftar Riwayat
              </h1>

              <p className="text-gray-400">
                Semua data peminjaman fasilitas.
              </p>

            </div>

            <button
              onClick={() => navigate('/pemesanan-fasilitas')}
              className="px-6 py-4 rounded-2xl bg-blue-800 text-white"
            >
              + Tambah Peminjaman
            </button>

          </div>

          {/* FILTER */}
          <div className="bg-white rounded-[28px] p-6 shadow-sm mb-6 flex justify-between flex-wrap gap-4">

            <div className="flex gap-4 flex-wrap">

              {['Semua', 'Disetujui', 'Pending', 'Ditolak'].map((s) => (

                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-5 py-3 rounded-2xl
                  ${
                    filter === s
                      ? 'bg-blue-800 text-white'
                      : 'bg-[#F4F7FE] text-gray-600'
                  }`}
                >
                  {s}
                </button>

              ))}

            </div>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="px-5 py-3 rounded-2xl border"
            />

          </div>

          {/* LOADING */}
          {loading && (
            <div className="bg-white p-10 text-center rounded-[28px]">
              <h2 className="text-xl font-bold text-gray-500">
                Loading...
              </h2>
            </div>
          )}

          {/* LIST */}
          {!loading && (

            <div className="space-y-5">

              {filteredData.length > 0 ? (

                filteredData.map((item) => {

                  const statusMap = {
                    approved: 'Disetujui',
                    pending: 'Pending',
                    rejected: 'Ditolak'
                  }

                  const statusText =
                    statusMap[item.status] || item.status

                  return (

                    <div
                      key={item.id}
                      className="bg-white rounded-[28px] p-7 shadow-sm"
                    >

                      <div className="flex justify-between">

                        <div>

                          <h2 className="text-2xl font-bold mb-3">
                            {item.facility_name}
                          </h2>

                          <p className="text-gray-400 text-sm">
                            📅 {item.booking_date}
                          </p>

                          <p className="text-gray-400 text-sm">
                            🕒 {item.start_time} - {item.end_time}
                          </p>

                          <p className="text-gray-400 text-sm mt-2">
                            {item.purpose}
                          </p>

                        </div>

                        <div className="flex items-center gap-4">

                          <span
                            className={`px-5 py-2 rounded-full text-sm font-medium
                            ${
                              statusText === 'Disetujui'
                                ? 'bg-green-100 text-green-700'
                                : statusText === 'Pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {statusText}
                          </span>

                          <button
                            onClick={() =>
                              navigate(`/detail-peminjaman/${item.id}`)
                            }
                            className="px-6 py-3 rounded-2xl bg-blue-800 text-white"
                          >
                            Detail
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                })

              ) : (

                <div className="bg-white p-10 text-center rounded-[28px]">

                  <h2 className="text-xl font-bold">
                    Tidak Ada Data
                  </h2>

                </div>

              )}

            </div>

          )}

        </main>

      </div>

    </div>
  )
}