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

import axios from "axios";
import { useEffect, useState } from "react";

export default function TestAPI() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/facility")
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Data Facility</h1>

      {data.map((item, i) => (
        <div key={i}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

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