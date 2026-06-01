import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoipb from "../assets/logo ipb.png";
import ahn from "../assets/ahn.png";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
  e.preventDefault();

  if (
    !formData.email.endsWith("@apps.ipb.ac.id")
  ) {
    alert(
      "Gunakan email IPB (@apps.ipb.ac.id)"
    );
    return;
  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert("Password tidak sama");
    return;
  }

  alert("Registrasi berhasil");

  navigate("/login");
};

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center px-10 py-8 overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-2 gap-10 items-center">

        <div className="relative h-full flex flex-col justify-between">

          <div>
            <img
              src={logoipb}
              alt="logo"
              className="w-44 mb-14"
            />

            <h1 className="text-6xl font-bold leading-tight text-gray-900 mb-5">
              Buat Akun
              <br />
              <span className="text-blue-800">
                Sistem Peminjaman
              </span>
            </h1>

            <div className="w-16 h-1 bg-blue-800 rounded-full mb-8" />

            <p className="text-gray-500 text-xl leading-relaxed max-w-xl">
              Daftarkan akun untuk menggunakan sistem peminjaman fasilitas kampus.
            </p>
          </div>

          <div className="mt-10">
            <img
              src={ahn}
              alt="illustration"
              className="w-full max-w-[660px] opacity-90"
            />
          </div>

        </div>

        <div className="flex justify-center">

          <div className="w-full max-w-xl bg-white rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-12">

            <div className="text-center mb-10">

              <h1 className="text-5xl font-bold text-blue-800 mb-3">
                Register
              </h1>

              <p className="text-gray-400 text-lg">
                Buat akun baru
              </p>

            </div>

            <form
              onSubmit={handleRegister}
              className="space-y-6"
            >

              <div>
                <label className="block font-semibold mb-3">
                  Nama
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-5"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">
                  Email
                </label>

                <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="contoh@apps.ipb.ac.id"
  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-5"
  required
/>
              </div>

              <div>
                <label className="block font-semibold mb-3">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-5"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">
                  Konfirmasi Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-4 rounded-2xl text-xl font-semibold"
              >
                Register
              </button>

              <div className="text-center text-gray-500">

                Sudah punya akun?

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="ml-2 text-blue-800 font-semibold"
                >
                  Login
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}