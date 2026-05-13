import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PermintaanPage from "./pages/PermintaanPage";
import DetailPermintaanPage from "./pages/DetailPermintaanPage";
import FormTambahEditPage from "./pages/FormTambahEditPage";
import KelolaTransaksiPage from "./pages/KelolaTransaksiPage";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={<DashboardPage />}
        />

        {/* PERMINTAAN */}
        <Route
          path="/permintaan"
          element={<PermintaanPage />}
        />

        {/* DETAIL PERMINTAAN */}
        <Route
          path="/detail-permintaan"
          element={<DetailPermintaanPage />}
        />

        {/* DATA FASILITAS */}
        <Route
          path="/edit-fasilitas"
          element={<FormTambahEditPage />}
        />

        {/* KELOLA TRANSAKSI */}
        <Route
          path="/kelola-transaksi"
          element={<KelolaTransaksiPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}