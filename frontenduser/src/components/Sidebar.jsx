import { Link, useLocation } from "react-router-dom";

import logoipb from "../assets/logo ipb.png";

import dashboard from "../assets/dashboard.png";
import dashboard2 from "../assets/dashboard2.png";

import calendar from "../assets/calendar.png";
import calendar2 from "../assets/calendar2.png";

import clock from "../assets/clock.png";
import clock2 from "../assets/clock2.png";

import exit from "../assets/exit.png";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard-user",
    activeIcon: dashboard,
    inactiveIcon: dashboard2,
  },
  {
    title: "Pemesanan Fasilitas",
    path: "/pemesanan-fasilitas",
    activeIcon: calendar2,
    inactiveIcon: calendar,
  },
  {
    title: "Riwayat Peminjaman",
    path: "/riwayat",
    activeIcon: clock2,
    inactiveIcon: clock,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 px-5 py-6 flex flex-col justify-between shadow-sm min-h-screen">
      <div>
        <div className="flex justify-center mb-12">
          <img
            src={logoipb}
            alt="Logo"
            className="w-40"
          />
        </div>

        <nav className="space-y-4">
          {menus.map((menu, index) => {
            const isActive = location.pathname.includes(menu.path);

            return (
              <Link
                key={index}
                to={menu.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-800 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-100 shadow-sm"
                }`}
              >
                <img
                  src={
                    isActive
                      ? menu.activeIcon
                      : menu.inactiveIcon
                  }
                  alt="icon"
                  className="w-5 h-5"
                />

                <span className="font-medium text-sm">
                  {menu.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border border-gray-100 bg-white hover:bg-red-50 transition-all duration-300 shadow-sm"
      >
        <img
          src={exit}
          alt="logout"
          className="w-5 h-5"
        />

        <span className="font-medium">
          Keluar
        </span>
      </button>
    </aside>
  );
}