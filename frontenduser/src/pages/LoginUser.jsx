import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoipb from "../assets/logo ipb.png";
import ahn from "../assets/ahn.png";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = (e) => {
  e.preventDefault();

  localStorage.setItem(
    "userName",
    formData.username
  );

  localStorage.setItem(
    "userId",
    "1"
  );

  if (
    formData.username
      .toLowerCase() === "admin"
  ) {

    localStorage.setItem(
      "role",
      "admin"
    );

    navigate("/dashboard-admin");

  } else {

    localStorage.setItem(
      "role",
      "user"
    );

    navigate("/dashboard-user");

  }
};

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center px-10 py-8 overflow-hidden">

      <div className="w-full max-w-7xl grid grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="relative h-full flex flex-col justify-between">

          {/* LOGO */}
          <div>

            <img
              src={logoipb}
              alt="logo"
              className="w-44 mb-14"
            />

            <h1 className="text-6xl font-bold leading-tight text-gray-900 mb-5">

              Sistem Peminjaman
              <br />

              <span className="text-blue-800">
                Fasilitas Kampus
              </span>

            </h1>

            <div className="w-16 h-1 bg-blue-800 rounded-full mb-8" />

            <p className="text-gray-500 text-xl leading-relaxed max-w-xl">

              Kelola dan ajukan peminjaman fasilitas
              dengan mudah, cepat dan terorganisir.

            </p>

          </div>

          {/* IMAGE */}
          <div className="mt-10">

            <img
              src={ahn}
              alt="illustration"
              className="w-full max-w-[660px] opacity-90"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">

          <div className="w-full max-w-xl bg-white rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-12">

            {/* ICON */}
            <div className="flex justify-center mb-6">

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">

                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                  <path d="M21 14v7H3V3h7" />
                </svg>

              </div>

            </div>

            {/* TITLE */}
            <div className="text-center mb-10">

              <h1 className="text-5xl font-bold text-blue-800 mb-3">
                Login Sistem
              </h1>

              <p className="text-gray-400 text-lg">
                Masuk sebagai Mahasiswa atau Admin
              </p>

            </div>

            {/* FORM */}
            <div className="text-center text-gray-500">
  Belum punya akun?

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="ml-2 text-blue-800 font-semibold"
  >
    Register
  </button>
</div>

            <form
              onSubmit={handleLogin}
              className="space-y-7"
            >

              {/* USERNAME */}
              <div>

                <label className="block text-gray-800 font-semibold mb-3">
                  Username
                </label>

                <div className="relative">

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Masukkan username"
                    className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-14 outline-none focus:border-blue-500 transition-all duration-300"
                    required
                  />

                  {/* USER ICON */}
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  >
                    <path d="M20 21a8 8 0 1 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-gray-800 font-semibold mb-3">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl py-4 px-14 pr-14 outline-none focus:border-blue-500 transition-all duration-300"
                    required
                  />

                  {/* LOCK ICON */}
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  >
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="10"
                      rx="2"
                    />

                    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                  </svg>

                  {/* EYE BUTTON */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  >

                    {showPassword ? (

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-5.94" />

                        <path d="M9.9 4.24A10.93 10.93 0 0 1 12 5c7 0 11 7 11 7a21.79 21.79 0 0 1-3.17 4.36" />

                        <path d="M1 1l22 22" />
                      </svg>

                    ) : (

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>

                    )}

                  </button>

                </div>

              </div>

              {/* FORGOT */}
              <div className="flex justify-end">

                <button
                  type="button"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Lupa password?
                </button>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-sm hover:-translate-y-1"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}