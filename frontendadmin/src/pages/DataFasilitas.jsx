import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import { MdNotificationsNone, MdAdd, MdEdit } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function DataFasilitas() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {

      setLoading(true);

      const res = await API.get("/facilities/");

      console.log("DATA:", res.data);

      setData(res.data || []);

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert("Gagal mengambil data fasilitas");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-[30px] font-bold text-gray-900 mb-2">
              Data Fasilitas
            </h1>

            <p className="text-gray-500 text-lg">
              Kelola semua fasilitas kampus
            </p>
          </div>

          <div className="flex items-center gap-5">

            {/* TAMBAH */}
            <button
              onClick={() => navigate("/tambah-fasilitas")}
              className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              <MdAdd size={22} />
              Tambah Fasilitas
            </button>

            {/* NOTIF */}
            <button
              onClick={() => navigate("/notifikasi")}
              className="bg-white p-3 rounded-2xl shadow-sm"
            >
              <MdNotificationsNone size={28} />
            </button>

            {/* USER */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">

              <FaUserCircle size={40} />

              <span className="font-semibold">
                {localStorage.getItem("adminName")}
              </span>

            </div>

          </div>
        </header>

        {/* LOADING */}
        {loading ? (

          <p className="text-gray-500">
            Loading...
          </p>

        ) : data.length === 0 ? (

          <p className="text-gray-500">
            Belum ada fasilitas
          </p>

        ) : (

          /* LIST */
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {data.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100"
              >

                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm mb-1">
                  📍 {item.location}
                </p>

                <p className="text-gray-500 text-sm mb-3">
                  👥 {item.capacity} orang
                </p>

                {/* STATUS */}
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full mb-5 ${
                    item.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status === "available"
                    ? "Tersedia"
                    : "Tidak tersedia"}
                </span>

                {/* EDIT */}
                <button
                  onClick={() => navigate(`/edit-fasilitas/${item.id}`)}
                  className="flex items-center gap-2 text-blue-700 font-semibold hover:underline"
                >
                  <MdEdit />
                  Edit
                </button>

              </div>

            ))}

          </section>

        )}

      </main>

    </div>
  );
}