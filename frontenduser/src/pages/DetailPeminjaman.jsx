import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

export default function DetailPeminjaman() {

  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading...
        </h1>
      </div>
    );

  }

  if (!booking) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <h1 className="text-3xl font-bold text-gray-700">
          Data Tidak Ditemukan
        </h1>
      </div>
    );

  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      <Sidebar />

      <div className="flex-1">

        <Navbar showBackButton={true} />

        <main className="p-8 overflow-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Detail Peminjaman
              </h1>

              <p className="text-gray-400">
                Informasi lengkap peminjaman fasilitas.
              </p>

            </div>

            <span
              className={`px-5 py-3 rounded-2xl text-sm font-medium ${getStatusStyle(
                booking.status
              )}`}
            >
              {getStatusText(booking.status)}
            </span>

          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                Nama Fasilitas
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {booking.facility_name || "-"}
              </h2>

            </div>

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                Tanggal
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {booking.booking_date || "-"}
              </h2>

            </div>

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                Waktu
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {booking.start_time} - {booking.end_time}
              </h2>

            </div>

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                Nama Peminjam
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {booking.user_name || "-"}
              </h2>

            </div>

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                ID Peminjam
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {booking.user_id || "-"}
              </h2>

            </div>

            <div className="bg-white rounded-[28px] p-7 shadow-sm">

              <p className="text-gray-400 text-sm mb-2">
                Status
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {getStatusText(booking.status)}
              </h2>

            </div>

          </div>

          {/* KEPERLUAN */}
          <div className="bg-white rounded-[28px] p-7 shadow-sm mt-6">

            <p className="text-gray-400 text-sm mb-3">
              Keperluan
            </p>

            <p className="text-gray-700 leading-relaxed">
              {booking.purpose || "-"}
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}