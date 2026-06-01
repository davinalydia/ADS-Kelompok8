import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import API from "../services/api";

export default function FormPeminjaman() {
  const navigate = useNavigate()
  const { id } = useParams()

    // nanti ambil dari database/backend
  const userName = localStorage.getItem("userName")

  const [fasilitas, setFasilitas] = useState([])
  const [selectedFasilitas, setSelectedFasilitas] = useState(null)

  const [isChecked, setIsChecked] = useState(false)
  const [isAvailable, setIsAvailable] = useState(null)

  const [form, setForm] = useState({
    facility_id: Number(id),
    user_id: 1,
    booking_date: "",
    start_time: "",
    end_time: "",
    purpose: ""
  })

  // 🔥 ambil fasilitas dari backend
  useEffect(() => {
    API.get("/facilities/")
      .then(res => {
        setFasilitas(res.data)

        const found = res.data.find(
          (item) => item.id === Number(id)
        )

        setSelectedFasilitas(found)
      })
      .catch(err => console.log(err))
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setIsChecked(false)
    setIsAvailable(null)
  }

  // ✅ validasi waktu
  const handleCheckAvailability = async () => {

  // VALIDASI JAM
  if (form.start_time >= form.end_time) {

    alert(
      "Waktu tidak valid (jam selesai harus lebih besar)"
    )

    return
  }

  try {

    // AMBIL SEMUA BOOKING
    const res = await API.get("/bookings/")

    const bookings = res.data || []

    // CEK APA ADA YANG BENTROK
    const bentrok = bookings.some((booking) => {

      return (

        // fasilitas sama
        booking.facility_id === Number(id) &&

        // tanggal sama
        booking.booking_date === form.booking_date &&

        // yg ditolak ga dihitung
        booking.status !== "rejected" &&

        // LOGIC BENTROK JAM
        form.start_time < booking.end_time &&
        form.end_time > booking.start_time

      )

    })

    setIsChecked(true)

    // kalau bentrok -> false
    setIsAvailable(!bentrok)

  } catch (err) {

    console.log(err)

    alert("Gagal mengecek ketersediaan")
  }
}

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await API.post("/bookings/", {

      user_id: 1,

      user_name: localStorage.getItem("userName"),

      facility_id: selectedFasilitas.id,

      facility_name: selectedFasilitas.name,

      booking_date: form.booking_date,

      start_time: form.start_time,

      end_time: form.end_time,

      purpose: form.purpose,

    });

    alert("Berhasil mengajukan");

    navigate("/riwayat");

  } catch (err) {

    console.log(err.response?.data || err);

    alert("Gagal mengajukan peminjaman");

  }
};

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <Sidebar />

      <div className="flex-1">
        <Navbar showBackButton={true} />

        <main className="p-8 overflow-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Form Peminjaman
            </h1>

            <p className="text-gray-400">
              Isi data peminjaman fasilitas.
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-sm">

            {/* INFO FASILITAS */}
            <div className="bg-[#F4F7FE] rounded-[24px] p-6 mb-8">
              <p className="text-gray-400 text-sm mb-2">
                Fasilitas Dipilih
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedFasilitas?.name || "Loading..."}
              </h2>

              <p className="text-gray-500">
                {selectedFasilitas?.location}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* TANGGAL */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Tanggal
                </label>

                <input
                  type="date"
                  name="booking_date"
                  value={form.booking_date}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none"
                  required
                />
              </div>

              {/* JAM */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Waktu Mulai
                  </label>

                  <input
                    type="time"
                    name="start_time"
                    value={form.start_time}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Waktu Selesai
                  </label>

                  <input
                    type="time"
                    name="end_time"
                    value={form.end_time}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none"
                    required
                  />
                </div>
              </div>

              {/* PURPOSE */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Keperluan
                </label>

                <textarea
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none"
                  required
                />
              </div>

              {/* CHECK */}
              <button
                type="button"
                onClick={handleCheckAvailability}
                className="w-full py-4 rounded-2xl bg-blue-800 text-white font-semibold"
              >
                Cek Ketersediaan
              </button>

              {/* RESULT */}
              {isChecked && (
                <div className={`rounded-[24px] p-6 ${isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                  <h2 className={`text-2xl font-bold mb-2 ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                    {isAvailable ? 'Fasilitas Tersedia' : 'Fasilitas Tidak Tersedia'}
                  </h2>
                </div>
              )}

              {/* SUBMIT */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-4 rounded-2xl bg-gray-200"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={!isAvailable}
                  className={`px-6 py-4 rounded-2xl ${
                    isAvailable
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  Ajukan Peminjaman
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}