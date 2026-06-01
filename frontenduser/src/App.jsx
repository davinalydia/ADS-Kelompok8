import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/LoginUser";
import Register from "./pages/Register";

import DashboardUser from "./pages/DashboardUser";
import RiwayatPeminjaman from "./pages/RiwayatPeminjaman";
import DetailPeminjaman from "./pages/DetailPeminjaman";
import PemesananFasilitas from "./pages/PemesananFasilitas";
import FormPeminjaman from "./pages/FormPeminjaman";
import NotifikasiUser from "./pages/NotifikasiUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER */}
        <Route
          path="/dashboard-user"
          element={<DashboardUser />}
        />

        <Route
          path="/notifikasi-user"
          element={<NotifikasiUser />}
        />

        <Route
          path="/pemesanan-fasilitas"
          element={<PemesananFasilitas />}
        />

        <Route
          path="/form-peminjaman/:id"
          element={<FormPeminjaman />}
        />

        <Route
          path="/riwayat"
          element={<RiwayatPeminjaman />}
        />

        <Route
          path="/detail-peminjaman/:id"
          element={<DetailPeminjaman />}
        />

      </Routes>
    </BrowserRouter>
  );
}