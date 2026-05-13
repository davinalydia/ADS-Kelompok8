import Sidebar from "../components/Sidebar";

import { Link } from "react-router-dom";

import {
  MdNotificationsNone,
  MdCalendarToday,
  MdArrowBack,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function FormTambahEditPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex justify-between items-start mb-10">

          {/* LEFT */}
          <div>

            <h1 className="text-[30px] font-bold text-gray-900 mb-3">
              Edit Fasilitas
            </h1>

            {/* BACK */}
            <Link
              to="/fasilitas"
              className="flex items-center gap-2 text-blue-700 font-semibold hover:underline"
            >

              <MdArrowBack size={20} />

              Kembali

            </Link>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">

            {/* DATE */}
            <div className="flex items-center gap-2 text-gray-500">

              <span>10 April 2025</span>

              <MdCalendarToday size={20} />

            </div>

            {/* NOTIFICATION */}
            <button className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition">

              <MdNotificationsNone
                size={30}
                className="text-gray-700"
              />

            </button>

            {/* USER */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">

              <FaUserCircle
                size={40}
                className="text-gray-700"
              />

              <span className="font-semibold text-lg">
                Admin
              </span>

            </div>

          </div>

        </header>

        {/* FORM CARD */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-5xl">

          {/* FORM */}
          <form className="space-y-8">

            {/* NAMA FASILITAS */}
            <div>

              <label className="block text-xl font-bold text-gray-900 mb-4">
                Nama Fasilitas
              </label>

              <input
                type="text"
                placeholder="Masukkan nama fasilitas"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
              />

            </div>

            {/* LOKASI */}
            <div>

              <label className="block text-xl font-bold text-gray-900 mb-4">
                Lokasi
              </label>

              <input
                type="text"
                placeholder="Masukkan lokasi fasilitas"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
              />

            </div>

            {/* DESKRIPSI */}
            <div>

              <label className="block text-xl font-bold text-gray-900 mb-4">
                Deskripsi
              </label>

              <textarea
                rows="5"
                placeholder="Masukkan deskripsi fasilitas"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-700"
              />

            </div>

            {/* BUTTON */}
            <div className="flex gap-5 pt-4">

              {/* BATAL */}
              <button
                type="button"
                className="px-10 py-4 rounded-2xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition shadow-sm"
              >
                Batal
              </button>

              {/* SIMPAN */}
              <button
                type="submit"
                className="px-10 py-4 rounded-2xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition shadow-lg"
              >
                Simpan
              </button>

            </div>

          </form>

        </section>

      </main>
    </div>
  );
}