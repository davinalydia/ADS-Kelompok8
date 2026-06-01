import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {

    case "approved":
      return "bg-green-100 text-green-700 border border-green-200";

    case "rejected":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }
};

export default function RequestTable() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {

      const res = await API.get("/bookings/");

      setRequests(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">

        <h2 className="text-2xl font-bold text-gray-900">
          Permintaan Terbaru
        </h2>

        <Link
          to="/permintaan"
          className="text-blue-600 font-semibold hover:underline"
        >
          Lihat semua
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-gray-600 text-sm">

              <th className="px-8 py-5 font-semibold">
                Nama Peminjam
              </th>

              <th className="px-8 py-5 font-semibold">
                Fasilitas
              </th>

              <th className="px-8 py-5 font-semibold">
                Tanggal
              </th>

              <th className="px-8 py-5 font-semibold">
                Status
              </th>

              <th className="px-8 py-5 font-semibold">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map((request) => (

              <tr
                key={request.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-all"
              >

                <td className="px-8 py-6 font-medium text-gray-800">
                  {request.user_name}
                </td>

                <td className="px-8 py-6 text-gray-600">
                  {request.facility_name}
                </td>

                <td className="px-8 py-6 text-gray-600">
                  {request.booking_date}
                </td>

                <td className="px-8 py-6">

                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusStyle(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                </td>

                <td className="px-8 py-6">

                  <Link
                    to={`/detail-permintaan/${request.id}`}
                    className="border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition text-sm font-semibold inline-block"
                  >
                    Detail
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}