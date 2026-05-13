import Sidebar from "../components/Sidebar";

import { Link } from "react-router-dom";

import {
  MdNotificationsNone,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdCalendarToday,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

import { requests } from "../data/requests";

const getStatusStyle = (status) => {
  switch (status) {
    case "Disetujui":
      return "bg-green-100 text-green-700 border border-green-200";

    case "Ditolak":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }
};

export default function PermintaanPage() {
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
              Permintaan Peminjaman
            </h1>

            <p className="text-gray-500 text-lg">
              Daftar semua permintaan peminjaman fasilitas.
            </p>

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

        {/* TABLE SECTION */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              {/* TABLE HEAD */}
              <thead className="bg-gray-50">

                <tr className="text-left text-gray-700 text-sm">

                  <th className="px-8 py-6 font-semibold">
                    Nama Peminjam
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Fasilitas
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Tanggal
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Status
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Aksi
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {requests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-all"
                  >

                    {/* NAME */}
                    <td className="px-8 py-7 font-medium text-gray-800">
                      {request.name}
                    </td>

                    {/* FACILITY */}
                    <td className="px-8 py-7 text-gray-700">
                      {request.facility}
                    </td>

                    {/* DATE */}
                    <td className="px-8 py-7 text-gray-700">
                      {request.date}
                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-7">

                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusStyle(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-8 py-7">

                      <Link
                        to="/detail-permintaan"
                        className="border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition text-sm font-semibold inline-block"
                      >
                        Detail
                      </Link>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-5 py-10">

            {/* LEFT */}
            <button className="w-12 h-12 rounded-xl border bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition">

              <MdKeyboardArrowLeft size={28} />

            </button>

            {/* PAGE */}
            <button className="w-12 h-12 rounded-xl bg-blue-800 text-white font-semibold shadow-md">
              1
            </button>

            <button className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-50 transition">
              2
            </button>

            <button className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-50 transition">
              3
            </button>

            {/* RIGHT */}
            <button className="w-12 h-12 rounded-xl border bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition">

              <MdKeyboardArrowRight size={28} />

            </button>

          </div>

        </section>

      </main>
    </div>
  );
}