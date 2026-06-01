import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PermintaanPage from "./pages/PermintaanPage";
import DetailPermintaanPage from "./pages/DetailPermintaanPage";
import FormTambahEditPage from "./pages/FormTambahEditPage";
import KelolaTransaksiPage from "./pages/KelolaTransaksiPage";
import Login from "./pages/Login";
import NotifikasiAdmin from "./pages/NotifikasiAdmin";
import DataFasilitas from "./pages/DataFasilitas";

// PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {

  const isLoggedIn = localStorage.getItem("isAdminLogin");

  return isLoggedIn
    ? children
    : <Navigate to="/login" replace />;
};

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* PERMINTAAN */}
        <Route
          path="/permintaan"
          element={
            <ProtectedRoute>
              <PermintaanPage />
            </ProtectedRoute>
          }
        />

        {/* DETAIL PERMINTAAN */}
        <Route
          path="/detail-permintaan/:id"
          element={
            <ProtectedRoute>
              <DetailPermintaanPage />
            </ProtectedRoute>
          }
        />

        {/* DATA FASILITAS */}
        <Route
          path="/data-fasilitas"
          element={
            <ProtectedRoute>
              <DataFasilitas />
            </ProtectedRoute>
          }
        />

        {/* TAMBAH FASILITAS */}
        <Route
          path="/tambah-fasilitas"
          element={
            <ProtectedRoute>
              <FormTambahEditPage />
            </ProtectedRoute>
          }
        />

        {/* EDIT FASILITAS */}
        <Route
          path="/edit-fasilitas/:id"
          element={
            <ProtectedRoute>
              <FormTambahEditPage />
            </ProtectedRoute>
          }
        />

        {/* KELOLA TRANSAKSI */}
        <Route
          path="/kelola-transaksi"
          element={
            <ProtectedRoute>
              <KelolaTransaksiPage />
            </ProtectedRoute>
          }
        />

        {/* NOTIFIKASI */}
        <Route
          path="/notifikasi"
          element={
            <ProtectedRoute>
              <NotifikasiAdmin />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}