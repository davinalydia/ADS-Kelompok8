import {
  MdDashboard,
  MdMeetingRoom,
  MdAccessTime,
  MdLogout,
} from "react-icons/md";

import { HiOutlineClipboardList } from "react-icons/hi";

import { Link, useLocation } from "react-router-dom";

import logoIpb from "../assets/logo-IPB.png";

const menus = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard size={22} />,
  },
  {
    title: "Data Fasilitas",
    path: "/edit-fasilitas",
    icon: <MdMeetingRoom size={22} />,
  },
  {
    title: "Permintaan Peminjaman",
    path: "/permintaan",
    icon: <HiOutlineClipboardList size={22} />,
  },
  {
    title: "Kelola Transaksi",
    path: "/kelola-transaksi",
    icon: <MdAccessTime size={22} />,
  },
];

export default function Sidebar() {

  const location = useLocation();

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 px-5 py-6 flex flex-col justify-between shadow-sm">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="flex justify-center mb-12">

          <img
            src={logoIpb}
            alt="Logo IPB"
            className="w-44 object-contain"
          />

        </div>

        {/* MENU */}
        <nav className="space-y-4">

          {menus.map((menu, index) => (

            <Link
              to={menu.path}
              key={index}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left

              ${
                location.pathname === menu.path
                  ? "bg-blue-800 text-white shadow-lg"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-100 shadow-sm"
              }`}
            >

              {/* ICON */}
              <div>
                {menu.icon}
              </div>

              {/* TEXT */}
              <span className="font-medium text-sm leading-snug">
                {menu.title}
              </span>

            </Link>

          ))}

        </nav>

      </div>

      {/* LOGOUT */}
      <button className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-gray-100 bg-white hover:bg-red-50 transition shadow-sm">

        <MdLogout size={22} />

        <span className="font-medium">
          Keluar
        </span>

      </button>

    </aside>
  );
}