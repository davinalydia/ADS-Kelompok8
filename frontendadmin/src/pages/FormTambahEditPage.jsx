import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  MdNotificationsNone,
  MdCalendarToday,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

export default function FormFasilitas() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    status: "available",
  });

  useEffect(() => {

    if (id) {
      setIsEdit(true);
      getDetail();
    }

  }, [id]);

  const getDetail = async () => {

    try {

      const res = await API.get(`/facilities/${id}`);

      setFormData({
        name: res.data.name || "",
        location: res.data.location || "",
        capacity: res.data.capacity || "",
        description: res.data.description || "",
        status: res.data.status || "available",
      });

    } catch (err) {

      console.log(err);

      alert("Gagal mengambil detail fasilitas");

    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {

    setFormData({
      ...formData,
      status: e.target.checked
        ? "available"
        : "unavailable",
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isEdit) {

        await API.put(
          `/facilities/${id}`,
          formData
        );

        alert("Fasilitas berhasil diupdate");

      } else {

        await API.post(
          "/facilities/",
          formData
        );

        alert("Fasilitas berhasil ditambahkan");
      }

      navigate("/data-fasilitas");

    } catch (err) {

      console.log(err);

      alert("Gagal simpan fasilitas");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <header className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-[30px] font-bold text-gray-900 mb-3">
              {isEdit ? "Edit Fasilitas" : "Tambah Fasilitas"}
            </h1>

            <p className="text-gray-500 text-lg">
              Kelola data fasilitas kampus.
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

            <button
              onClick={() => navigate("/notifikasi")}
              className="bg-white p-3 rounded-2xl shadow-sm"
            >
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

              <div>

                <p className="font-semibold text-lg leading-none">
                  {localStorage.getItem("adminName")}
                </p>

                <p className="text-sm text-gray-400">
                  Admin
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* FORM */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* NAMA */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Nama Fasilitas
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama fasilitas"
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                required
              />

            </div>

            {/* LOKASI */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Lokasi
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Masukkan lokasi fasilitas"
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                required
              />

            </div>

            {/* KAPASITAS */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Kapasitas
              </label>

              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Masukkan kapasitas"
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                required
              />

            </div>

            {/* DESKRIPSI */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Deskripsi
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi fasilitas"
                rows="5"
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 resize-none"
              />

            </div>

            {/* STATUS */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={formData.status === "available"}
                onChange={handleCheckbox}
                className="w-5 h-5"
              />

              <label className="text-gray-700 font-semibold">
                Tersedia
              </label>

            </div>

            {/* BUTTON */}
            <div className="flex gap-5 pt-5">

              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition"
              >
                {isEdit
                  ? "Simpan Perubahan"
                  : "Tambah Fasilitas"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/data-fasilitas")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold transition"
              >
                Batal
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}