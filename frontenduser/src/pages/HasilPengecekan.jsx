import { useNavigate, useLocation } from "react-router-dom";

import logoipb from "../assets/logo ipb.png";
import bell from "../assets/bell.png";
import dashboard from "../assets/dashboard2.png";
import calendar from "../assets/calendar2.png";
import clock from "../assets/clock.png";
import exit from "../assets/exit.png";
import user from "../assets/user.png";
import warning from "../assets/warning2.png";
import checklist from "../assets/checklistgreen.png";
import cross from "../assets/crossred.png";

export default function HasilCekPeminjaman() {
  const navigate = useNavigate();
  const location = useLocation();

    // nanti ambil dari database/backend
  const userName = localStorage.getItem("userName")

  const fasilitas = location.state?.fasilitas;

  const tanggal = location.state?.tanggal || "10 April 2025";
  const jamMulai = location.state?.jamMulai || "08:00";
  const jamSelesai = location.state?.jamSelesai || "12:00";
  const deskripsi =
    location.state?.deskripsi || "Kuliah Umum Data Mining";

  // RANDOM STATUS
  const tersedia = location.state?.tersedia ?? true;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F5F7FA",
        display: "flex",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          background: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* LOGO */}
          <div
            style={{
              height: "120px",
              padding: "24px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logoipb}
              alt=""
              style={{
                width: "120px",
              }}
            />
          </div>

          {/* MENU */}
          <div
            style={{
              padding: "24px 16px",
            }}
          >
            {/* DASHBOARD */}
            <div
              onClick={() => navigate("/dashboard-user")}
              style={{
                height: "50px",
                background: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 16px",
                marginBottom: "14px",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={dashboard}
                alt=""
                style={{
                  width: "20px",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#000",
                  fontWeight: 500,
                }}
              >
                Dashboard
              </span>
            </div>

            {/* PEMESANAN */}
            <div
              style={{
                height: "50px",
                background: "#2141B6",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 16px",
                marginBottom: "14px",
                boxShadow: "0 4px 14px rgba(33,65,182,0.25)",
              }}
            >
              <img
                src={calendar}
                alt=""
                style={{
                  width: "20px",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#FFFFFF",
                  fontWeight: 500,
                }}
              >
                Pemesanan Fasilitas
              </span>
            </div>

            {/* RIWAYAT */}
            <div
              onClick={() => navigate("/riwayat-peminjaman")}
              style={{
                height: "50px",
                background: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 16px",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={clock}
                alt=""
                style={{
                  width: "20px",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#000",
                  fontWeight: 500,
                }}
              >
                Riwayat Peminjaman
              </span>
            </div>
          </div>
        </div>

        {/* KELUAR */}
        <div
          style={{
            padding: "16px",
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              height: "50px",
              background: "#FFFFFF",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0 16px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={exit}
              alt=""
              style={{
                width: "20px",
              }}
            />

            <span
              style={{
                fontSize: "14px",
                color: "#000",
                fontWeight: 500,
              }}
            >
              Keluar
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            height: "120px",
            background: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 48px",
            gap: "28px",
          }}
        >
          <img
            src={bell}
            alt=""
            style={{
              width: "24px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={user}
              alt=""
              style={{
                width: "42px",
                height: "42px",
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#000",
                }}
              >
                Grasela
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#000",
                }}
              >
                Mahasiswa
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div
          style={{
            padding: "28px 32px",
          }}
        >
          {/* TITLE */}
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              textAlign: "left",
            }}
          >
            Pemesanan fasilitas
          </h1>

          {/* BREADCRUMB */}
          <div
            style={{
              marginTop: "8px",
              marginBottom: "24px",
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            <span style={{ color: "#4B5563" }}>
              Pilih Fasilitas
            </span>

            <span
              style={{
                color: "#4B5563",
                margin: "0 8px",
              }}
            >
              {">"}
            </span>

            <span style={{ color: "#4B5563" }}>
              Form Pemesanan
            </span>

            <span
              style={{
                color: "#4B5563",
                margin: "0 8px",
              }}
            >
              {">"}
            </span>

            <span
              style={{
                color: "#2563EB",
                fontWeight: 600,
              }}
            >
              Hasil Cek
            </span>
          </div>

          {/* CONTENT */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "flex-start",
            }}
          >
            {/* DETAIL */}
            <div
              style={{
                width: "260px",
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  color: "#000",
                }}
              >
                Detail Fasilitas
              </div>

              {/* FOTO */}
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  background: "#D1D5DB",
                  borderRadius: "8px",
                  marginBottom: "14px",
                }}
              />

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "6px",
                  color: "#000",
                }}
              >
                {fasilitas?.nama}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "18px",
                  color: "#000",
                }}
              >
                Kapasitas : {fasilitas?.kapasitas}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#000",
                }}
              >
                Fasilitas :
              </div>

              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#000",
                }}
              >
                {fasilitas?.fasilitas}
              </div>
            </div>

            {/* HASIL */}
            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  color: "#000",
                }}
              >
                Hasil Cek Ketersediaan
              </div>

              {/* STATUS */}
<div
  style={{
    width: "100%",
    borderRadius: "10px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "28px",
    backgroundColor: tersedia ? "#DCFCE7" : "#FEE2E2",
    border: tersedia
      ? "1px solid #22C55E"
      : "1px solid #EF4444",
  }}
>
  <img
    src={tersedia ? checklist : cross}
    alt="status"
    style={{
      width: "48px",
      height: "48px",
      objectFit: "contain",
      display: "block",
    }}
  />

  <div>
    <div
      style={{
        fontSize: "22px",
        fontWeight: 700,
        marginBottom: "4px",
        color: tersedia ? "#166534" : "#991B1B",
      }}
    >
      {tersedia ? "Tersedia" : "Tidak Tersedia"}
    </div>

    <div
      style={{
        fontSize: "14px",
        color: tersedia ? "#166534" : "#991B1B",
      }}
    >
      {tersedia
        ? "Fasilitas tersedia pada waktu yang Anda pilih."
        : "Fasilitas sedang digunakan pada waktu tersebut."}
    </div>
  </div>
</div>

              {/* DETAIL PEMESANAN */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "140px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    Tanggal
                  </div>

                  <div style={{ color: "#000" }}>{tanggal}</div>
                </div>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "140px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    Jam
                  </div>

                  <div style={{ color: "#000" }}>
                    {jamMulai} - {jamSelesai}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "140px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    Kegiatan
                  </div>

                  <div style={{ color: "#000" }}>{deskripsi}</div>
                </div>
              </div>

              {/* BUTTON */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => navigate(-1)}
                  style={{
                    flex: 1,
                    height: "52px",
                    background: "#FFFFFF",
                    border: "1px solid #1E40AF",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Ubah Jadwal
                </button>

                <button
                  disabled={!tersedia}
                  style={{
                    flex: 1,
                    height: "52px",
                    background: tersedia ? "#2141B6" : "#9CA3AF",
                    border: "none",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: tersedia ? "pointer" : "not-allowed",
                  }}
                >
                  Ajukan Peminjaman
                </button>
              </div>
            </div>
          </div>

          {/* ALERT */}
          <div
            style={{
              marginTop: "24px",
              background: "#DBEAFE",
              borderRadius: "10px",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <img
              src={warning}
              alt=""
              style={{
                width: "26px",
                height: "26px",
              }}
            />

            <div
              style={{
                fontSize: "14px",
                color: "#1E3A8A",
                fontWeight: 500,
              }}
            >
              Setelah mengajukan, status peminjaman akan menunggu
              konfirmasi dari admin.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}