import { useNavigate } from "react-router-dom";

import logoipb from "../assets/logo ipb.png";
import dashboard from "../assets/dashboard.png";
import calendar from "../assets/calendar.png";
import clock from "../assets/clock.png";
import exitIcon from "../assets/exit.png";
import bell from "../assets/bell.png";
import user from "../assets/user.png";
import list from "../assets/list.png";
import cross from "../assets/cross.png";

export default function DetailPeminjaman() {
  const navigate = useNavigate();

  // nanti ambil dari database/backend
  const userName = localStorage.getItem("userName")

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F5F5F5",
        fontFamily: "Inter, sans-serif",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "#fff",
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
              padding: "24px 20px",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <img
              src={logoipb}
              alt="logo"
              style={{
                width: "120px",
              }}
            />
          </div>

          {/* MENU */}
          <div style={{ padding: "20px 14px" }}>
            {/* DASHBOARD */}
            <div
              onClick={() => navigate("/dashboard-user")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "12px",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img src={dashboard} alt="" style={{ width: "22px" }} />
              <span style={{ fontSize: "13px" }}>Dashboard</span>
            </div>

            {/* PEMESANAN */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "12px",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img src={calendar} alt="" style={{ width: "22px" }} />
              <span style={{ fontSize: "13px" }}>
                Pemesanan Fasilitas
              </span>
            </div>

            {/* RIWAYAT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#1E40AF",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={clock}
                alt=""
                style={{
                  width: "22px",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <span style={{ fontSize: "13px" }}>
                Riwayat Peminjaman
              </span>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div style={{ padding: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#fff",
              borderRadius: "10px",
              padding: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <img src={exitIcon} alt="" style={{ width: "22px" }} />
            <span style={{ fontSize: "14px" }}>Keluar</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1 }}>
        {/* TOPBAR */}
        <div
          style={{
            height: "90px",
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 40px",
            gap: "20px",
          }}
        >
          <img
            src={bell}
            alt=""
            style={{
              width: "26px",
              cursor: "pointer",
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
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Grasela
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#4B5563",
                  marginTop: "4px",
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
            padding: "26px",
          }}
        >
          {/* STATUS */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "20px",
                fontSize: "20px",
                color: "#111827",
              }}
            >
              Status Peminjaman
            </h2>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#FEF3C7",
                border: "1px solid #D97706",
                borderRadius: "10px",
                padding: "12px 18px",
              }}
            >
              <img
                src={list}
                alt=""
                style={{
                  width: "22px",
                }}
              />

              <span
                style={{
                  color: "#D97706",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                Menunggu Konfirmasi
              </span>
            </div>

            <p
              style={{
                marginTop: "18px",
                color: "#4B5563",
                fontSize: "15px",
              }}
            >
              Permintaan peminjaman Anda sedang menunggu konfirmasi
              dari admin.
            </p>
          </div>

          {/* INFORMASI */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "28px",
                fontSize: "20px",
                color: "#111827",
              }}
            >
              Informasi Peminjaman
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                rowGap: "24px",
                fontSize: "16px",
              }}
            >
              <span>Fasilitas</span>
              <span>Ruang Kelas CCR</span>

              <span>Tanggal</span>
              <span>10 April 2025</span>

              <span>Waktu</span>
              <span>08.00 - 12.00</span>

              <span>Deskripsi</span>
              <span>Kuliah Umum Data Mining</span>
            </div>
          </div>

          {/* RIWAYAT STATUS */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "28px",
                fontSize: "20px",
                color: "#111827",
              }}
            >
              Riwayat Status
            </h2>

            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={cross}
                  alt=""
                  style={{
                    width: "26px",
                  }}
                />

                <div
                  style={{
                    width: "1px",
                    height: "50px",
                    background: "#D1D5DB",
                    marginTop: "4px",
                  }}
                />
              </div>

              {/* TEXT */}
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    marginBottom: "12px",
                  }}
                >
                  5 April 2025, 10.30
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    color: "#374151",
                  }}
                >
                  Permintaan dikirim oleh Anda
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}