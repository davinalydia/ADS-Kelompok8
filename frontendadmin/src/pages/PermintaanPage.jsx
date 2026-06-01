import Sidebar from "../components/Sidebar";

import { Link } from "react-router-dom";

import {
  MdNotificationsNone,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdCalendarToday,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

import { useEffect, useState } from "react";

import API from "../services/api";

const getStatusStyle = (status) => {

  switch (status) {

    case "approved":
      return "bg-green-100 text-green-700 border border-green-200";

    case "rejected":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }
};

const getStatusText = (status) => {

  switch (status) {

    case "approved":
      return "Disetujui";

    case "rejected":
      return "Ditolak";

    default:
      return "Pending";
  }
};

export default function PermintaanPage() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const adminName =
    localStorage.getItem("adminName") || "Admin";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get("/bookings/");

      setRequests(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

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

              <span>
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <MdCalendarToday size={20} />

            </div>

            {/* NOTIFICATION */}
            <button onClick={() => navigate("/notifikasi")} className="bg-white p-3 rounded-2xl shadow-sm">

              <MdNotificationsNone
                size={30}
                className="text-gray-700"
              />

              {requests.filter(
                (item) => item.status === "pending"
              ).length > 0 && (
                <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500"></span>
              )}

            </button>

            {/* USER */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">

              <FaUserCircle
                size={40}
                className="text-gray-700"
              />

              <div>
                <p className="font-semibold text-lg leading-none">
                  {adminName}
                </p>

                <p className="text-sm text-gray-400">
                  Admin
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* TABLE */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* HEAD */}
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
                    Jam
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Status
                  </th>

                  <th className="px-8 py-6 font-semibold">
                    Aksi
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>

                ) : requests.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400"
                    >
                      Belum ada data peminjaman
                    </td>
                  </tr>

                ) : (

                  requests.map((request) => (

                    <tr
                      key={request.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-all"
                    >

                      {/* NAME */}
                      <td className="px-8 py-7 font-medium text-gray-800">
                        {request.user_name || "-"}
                      </td>

                      {/* FACILITY */}
                      <td className="px-8 py-7 text-gray-700">
                        {request.facility_name || "-"}
                      </td>

                      {/* DATE */}
                      <td className="px-8 py-7 text-gray-700">
                        {request.booking_date || "-"}
                      </td>

                      {/* TIME */}
                      <td className="px-8 py-7 text-gray-700">
                        {request.start_time} - {request.end_time}
                      </td>

                      {/* STATUS */}
                      <td className="px-8 py-7">

                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {getStatusText(request.status)}
                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="px-8 py-7">

                        <Link
                          to={`/detail-permintaan/${request.id}`}
                          className="border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition text-sm font-semibold inline-block"
                        >
                          Detail
                        </Link>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-5 py-10">

            <button className="w-12 h-12 rounded-xl border bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition">

              <MdKeyboardArrowLeft size={28} />

            </button>

            <button className="w-12 h-12 rounded-xl bg-blue-800 text-white font-semibold shadow-md">
              1
            </button>

            <button className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-50 transition">
              2
            </button>

            <button className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-50 transition">
              3
            </button>

            <button className="w-12 h-12 rounded-xl border bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition">

              <MdKeyboardArrowRight size={28} />

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}