import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
} from "react-icons/md";

import { useEffect, useState } from "react";

import API from "../services/api";

export default function NotifikasiUser() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {

    try {

      const userId = localStorage.getItem("userId");

      const res = await API.get(
        `/notifications?role=user&user_id=${userId}`
      );

      setNotifications(res.data);

      // =========================
      // MARK AS READ
      // =========================
      res.data.forEach(async (item) => {

        if (!item.is_read) {

          await API.put(
            `/notifications/${item.id}/read`
          );
        }
      });

    } catch (err) {

      console.log(err);

    }
  };

  const getIcon = (message = "") => {

    const text = message.toLowerCase();

    if (text.includes("disetujui")) {

      return (
        <MdCheckCircle
          size={28}
          className="text-green-600"
        />
      );
    }

    if (text.includes("ditolak")) {

      return (
        <MdCancel
          size={28}
          className="text-red-600"
        />
      );
    }

    return (
      <MdAccessTime
        size={28}
        className="text-yellow-500"
      />
    );
  };

  const getTitle = (message = "") => {

    const text = message.toLowerCase();

    if (text.includes("disetujui")) {
      return "Peminjaman Disetujui";
    }

    if (text.includes("ditolak")) {
      return "Peminjaman Ditolak";
    }

    return "Menunggu Approval";
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          title={localStorage.getItem("userName")}
          subtitle="Notifikasi Peminjaman"
          showBackButton={true}
        />

        <main className="p-8">

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Notifikasi
            </h1>

            <p className="text-gray-400">
              Semua informasi peminjaman fasilitas.
            </p>

          </div>

          <div className="space-y-5">

            {notifications.length === 0 ? (

              <div className="bg-white rounded-[28px] p-10 shadow-sm text-center text-gray-500">
                Belum ada notifikasi
              </div>

            ) : (

              notifications.map((item) => (

                <div
                  key={item.id}
                  className={`bg-white rounded-[28px] p-6 shadow-sm flex items-start gap-5 border ${
                    item.is_read
                      ? "border-gray-100"
                      : "border-blue-300"
                  }`}
                >

                  <div className="bg-[#F4F7FE] p-4 rounded-2xl">
                    {getIcon(item.message)}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between items-start mb-2">

                      <h2 className="text-xl font-bold text-gray-800">
                        {getTitle(item.message)}
                      </h2>

                      <span className="text-sm text-gray-400">
                        #{item.id}
                      </span>

                    </div>

                    <p className="text-gray-500 leading-relaxed">
                      {item.message}
                    </p>

                  </div>

                </div>

              ))

            )}

          </div>

        </main>

      </div>

    </div>
  );
}