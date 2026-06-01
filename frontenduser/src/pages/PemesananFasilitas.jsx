import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import API from "../services/api";

export default function PemesananFasilitas() {

  const navigate = useNavigate()

  const userName = localStorage.getItem("userName")

  const [facilities, setFacilities] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {

    try {

      setLoading(true)

      const res = await API.get("/facilities/")

      console.log("DATA FACILITIES =", res.data)

      if (Array.isArray(res.data)) {

        setFacilities(res.data)

      } else if (Array.isArray(res.data.data)) {

        setFacilities(res.data.data)

      } else {

        setFacilities([])

      }

    } catch (err) {

      console.log("ERROR FACILITIES =", err)

      setFacilities([])

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          showBackButton={true}
          title={userName}
          subtitle="Pilih fasilitas yang tersedia untuk dipinjam"
        />

        <main className="p-8 overflow-auto">

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Pemesanan Fasilitas
            </h1>

            <p className="text-gray-400">
              Pilih fasilitas yang ingin dipinjam.
            </p>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-gray-400">
              Loading...
            </div>
          )}

          {/* DATA KOSONG */}
          {!loading && facilities.length === 0 && (
            <div className="text-gray-400">
              Data fasilitas belum ada
            </div>
          )}

          {/* GRID */}
          {!loading && facilities.length > 0 && (

            <div className="grid grid-cols-2 gap-6">

              {facilities.map((item) => {

                const isAvailable =
                  item.status === "available"

                return (

                  <div
                    key={item.id}
                    className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">

                      <h2 className="text-3xl font-bold text-blue-800 opacity-70">
                        {item.name || item.facility_name}
                      </h2>

                    </div>

                    {/* CONTENT */}
                    <div className="p-7">

                      <div className="mb-5">

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {item.name || item.facility_name}
                        </h2>

                        <p className="text-gray-400 text-sm">
                          {item.location || "-"}
                        </p>

                      </div>

                      <div className="flex items-center justify-between mb-7">

                        <div>

                          <p className="text-gray-400 text-sm mb-1">
                            Kapasitas
                          </p>

                          <h3 className="font-semibold text-gray-800">
                            {item.capacity || "-"}
                          </h3>

                        </div>

                        <div>

                          <p className="text-gray-400 text-sm mb-1">
                            Status
                          </p>

                          <h3
                            className={`font-semibold ${
                              isAvailable
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {isAvailable
                              ? "Tersedia"
                              : "Tidak Tersedia"}
                          </h3>

                        </div>

                      </div>

                      <button
                        disabled={!isAvailable}
                        onClick={() =>
                          navigate(`/form-peminjaman/${item.id}`)
                        }
                        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                          !isAvailable
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-800 text-white hover:opacity-90"
                        }`}
                      >
                        {!isAvailable
                          ? "Tidak Tersedia"
                          : "Pilih Fasilitas"}
                      </button>

                    </div>

                  </div>

                )
              })}

            </div>

          )}

        </main>

      </div>

    </div>
  )
}