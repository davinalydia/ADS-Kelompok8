import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import RequestTable from "./RequestTable";

import {
  MdNotificationsNone,
  MdOutlineListAlt,
  MdClose,
  MdCheck,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function DashboardAdmin() {
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
              Selamat datang, Admin!
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Berikut ringkasan aktivitas peminjaman fasilitas kampus.
            </p>
          </div>

          <div className="flex items-center gap-6">

            <button className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition">
              <MdNotificationsNone
                size={30}
                className="text-gray-700"
              />
            </button>

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

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

          <StatsCard
  title="Total Permintaan"
  value="8"
  description="Semua permintaan"
  icon={<MdOutlineListAlt size={30} />}
  color="blue"
/>

<StatsCard
  title="Disetujui"
  value="6"
  description="Permintaan Disetujui"
  icon={<MdCheck size={30} />}
  color="green"
/>

<StatsCard
  title="Ditolak"
  value="2"
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