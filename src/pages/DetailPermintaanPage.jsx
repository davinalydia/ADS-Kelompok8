import Sidebar from "../components/Sidebar";

import {
  MdNotificationsNone,
  MdCalendarToday,
  MdArrowBack,
  MdCheckCircleOutline,
  MdHighlightOff,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function DetailPermintaanPage() {

  const detailData = [
    {
      label: "Nama Peminjam",
      value: "Grasela Anggi",
    },
    {
      label: "NIM / NIP",
      value: "G6401231025",
    },
    {
      label: "Fakultas / Unit",
      value: "-",
    },
    {
      label: "Fasilitas",
      value: "Ruang Kelas CCR",
    },
    {
      label: "Tanggal Pinjam",
      value: "10 April 2025",
    },
    {
      label: "Waktu",
      value: "08.00 - 12.00",
    },
    {
      label: "Keperluan",
      value: "Kuliah Umum Data Mining",
    },
    {
      label: "Catatan",
      value: "-",
    },
    {
      label: "Tanggal Pengajuan",
      value: "5 April 2025, 10.30",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex justify-between items-start mb-10">

          <div>

            {/* BACK */}
            <button className="flex items-center gap-2 text-blue-700 font-semibold mb-6 hover:underline">

              <MdArrowBack size={22} />

              Kembali

            </button>

            <h1 className="text-[30px] font-bold text-gray-900 mb-3">
              Informasi Peminjaman
            </h1>

            <p className="text-gray-500 text-lg">
              Detail lengkap permintaan peminjaman fasilitas.
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">

            {/* DATE */}
            <div className="flex items-center gap-2 text-gray-500">

              <span>10 April 2025</span>

              <MdCalendarToday size={20} />

            </div>

            {/* BELL */}
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

        {/* CARD DETAIL */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-5xl">

          {/* GRID DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20">

            {detailData.map((item, index) => (

              <div key={index}>

                <p className="text-gray-500 text-sm mb-2">
                  {item.label}
                </p>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.value}
                </h3>

              </div>

            ))}

          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-5 mt-14">

            {/* REJECT */}
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-all shadow-sm">

              <MdHighlightOff size={24} />

              Tolak

            </button>

            {/* APPROVE */}
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-all shadow-lg">

              <MdCheckCircleOutline size={24} />

              Setujui

            </button>

          </div>

        </section>

      </main>
    </div>
  );
}