import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import RequestTable from "./RequestTable";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ TAMBAH INI

import API from "../services/api";

import {
  MdNotificationsNone,
  MdOutlineListAlt,
  MdClose,
  MdCheck,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function DashboardAdmin() {

  const navigate = useNavigate(); // ✅ TAMBAH INI

  const [total, setTotal] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/bookings");
      const data = res.data;

      setTotal(data.length);

      setApproved(
        data.filter((item) => item.status === "approved").length
      );

      setRejected(
        data.filter((item) => item.status === "rejected").length
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-12">

          <div>
            <h1 className="text-[30px] font-bold text-gray-900 leading-tight">
              Selamat datang, {localStorage.getItem("adminName")}!
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Berikut ringkasan aktivitas peminjaman fasilitas kampus.
            </p>
          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={() => navigate("/notifikasi")}
              className="bg-white p-3 rounded-2xl shadow-sm relative"
            >
              <MdNotificationsNone size={30} className="text-gray-700" />

              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">

              <FaUserCircle size={40} className="text-gray-700" />

              <span className="font-semibold text-lg">
                {localStorage.getItem("adminName")}
              </span>

            </div>

          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

          <StatsCard
            title="Total Permintaan"
            value={total}
            description="Semua permintaan"
            icon={<MdOutlineListAlt size={30} />}
            color="blue"
          />

          <StatsCard
            title="Disetujui"
            value={approved}
            description="Permintaan Disetujui"
            icon={<MdCheck size={30} />}
            color="green"
          />

          <StatsCard
            title="Ditolak"
            value={rejected}
            description="Permintaan Ditolak"
            icon={<MdClose size={30} />}
            color="red"
          />

        </section>

        {/* TABLE */}
        <RequestTable />

      </main>
    </div>
  );
}