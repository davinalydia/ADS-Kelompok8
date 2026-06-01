import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function FormPeminjaman() {
  const navigate = useNavigate()
  const { id } = useParams()

    // nanti ambil dari database/backend
  const userName = localStorage.getItem("userName")

  const [formData, setFormData] = useState({
    nama: '',
    tanggal: '',
    waktuMulai: '',
    waktuSelesai: '',
    jumlahPeserta: '',
    keperluan: '',
  })

  // sementara dummy dulu
  const fasilitas = [
    {
      id: 1,
      nama: 'Auditorium',
      lokasi: 'Gedung Utama',
    },

    {
      id: 2,
      nama: 'Lab Komputer',
      lokasi: 'Gedung Ilkom',
    },

    {
      id: 3,
      nama: 'Ruang Seminar',
      lokasi: 'Gedung F',
    },
  ]

  const selectedFasilitas = fasilitas.find(
    (item) => item.id === Number(id)
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // nanti connect backend/database
    console.log(formData)

    alert('Peminjaman berhasil diajukan!')

    navigate('/riwayat')
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <Sidebar />

      <div className="flex-1">
        <Navbar showBackButton={true} />

        <main className="p-8 overflow-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Form Peminjaman
            </h1>

            <p className="text-gray-400">
              Isi data peminjaman fasilitas.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            {/* INFO */}
            <div className="bg-[#F4F7FE] rounded-[24px] p-6 mb-8">
              <p className="text-gray-400 text-sm mb-2">
                Fasilitas Dipilih
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedFasilitas?.nama}
              </h2>

              <p className="text-gray-500">
                {selectedFasilitas?.lokasi}
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* NAMA */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Nama Penanggung Jawab
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* TANGGAL */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Tanggal
                </label>

                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500"
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
                    name="waktuMulai"
                    value={formData.waktuMulai}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Waktu Selesai
                  </label>

                  <input
                    type="time"
                    name="waktuSelesai"
                    value={formData.waktuSelesai}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* PESERTA */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Jumlah Peserta
                </label>

                <input
                  type="number"
                  name="jumlahPeserta"
                  value={formData.jumlahPeserta}
                  onChange={handleChange}
                  placeholder="Masukkan jumlah peserta"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* KEPERLUAN */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Keperluan
                </label>

                <textarea
                  name="keperluan"
                  value={formData.keperluan}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Masukkan keperluan peminjaman"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-4 rounded-2xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-4 rounded-2xl bg-blue-800 text-white font-medium hover:opacity-90 transition-all duration-300"
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