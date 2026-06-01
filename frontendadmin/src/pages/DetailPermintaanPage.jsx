import Sidebar from "../components/Sidebar";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import API from "../services/api";

import {
  MdNotificationsNone,
  MdCalendarToday,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function DetailPermintaanPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const adminName =
    localStorage.getItem("adminName") || "Admin";

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {

    try {

      const res = await API.get(`/bookings/${id}`);

      setBooking(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (status) => {

    try {

      await API.put(`/bookings/${id}/status`, {
        status: status,
      });

      alert(
        status === "approved"
          ? "Peminjaman disetujui"
          : "Peminjaman ditolak"
      );

      navigate("/permintaan");

    } catch (err) {
  console.log(err);
  console.log(err.response?.data);
  alert("Gagal update status");
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

  const getStatusStyle = (status) => {

    switch (status) {

      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-[30px] font-bold text-gray-900 mb-3">
              Detail Permintaan
            </h1>

            <p className="text-gray-500 text-lg">
              Detail data peminjaman fasilitas.
            </p>

          </div>

          <div className="flex items-center gap-6">

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

            <button onClick={() => navigate("/notifikasi")} className="bg-white p-3 rounded-2xl shadow-sm">

              <MdNotificationsNone
                size={30}
                className="text-gray-700"
              />

              {booking.status === "pending" && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
              )}

            </button>

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

        {/* CARD */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

          {/* STATUS */}
          <div className="mb-8">

            <span
              className={`px-5 py-2 rounded-xl text-sm font-semibold ${getStatusStyle(
                booking.status
              )}`}
            >
              {getStatusText(booking.status)}
            </span>

          </div>

          <div className="grid grid-cols-2 gap-8">

            <div>

              <p className="text-gray-500 mb-2">
                Nama Peminjam
              </p>

              <h2 className="text-xl font-semibold">
                {booking.user_name || "-"}
              </h2>

            </div>

            <div>

              <p className="text-gray-500 mb-2">
                Fasilitas
              </p>

              <h2 className="text-xl font-semibold">
                {booking.facility_name || "-"}
              </h2>

            </div>

            <div>

              <p className="text-gray-500 mb-2">
                Tanggal
              </p>

              <h2 className="text-xl font-semibold">
                {booking.booking_date || "-"}
              </h2>

            </div>

            <div>

              <p className="text-gray-500 mb-2">
                Waktu
              </p>

              <h2 className="text-xl font-semibold">
                {booking.start_time} - {booking.end_time}
              </h2>

            </div>

            <div className="col-span-2">

              <p className="text-gray-500 mb-2">
                Keperluan
              </p>

              <h2 className="text-xl font-semibold">
                {booking.purpose || "-"}
              </h2>

            </div>

          </div>

          {/* BUTTON */}
          {booking.status === "pending" && (

            <div className="flex gap-5 mt-12">

              <button
                onClick={() => updateStatus("approved")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold"
              >
                Setujui
              </button>

              <button
                onClick={() => updateStatus("rejected")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-semibold"
              >
                Tolak
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}