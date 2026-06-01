const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./campus_booking.db");


// =======================
// GET FACILITIES
// =======================

app.get("/facilities", (req, res) => {

  db.all(
    "SELECT * FROM facilities",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});


// =======================
// GET BOOKINGS
// =======================

app.get("/bookings", (req, res) => {

  db.all(
    `
    SELECT 
      bookings.*,
      facilities.name as facility_name
    FROM bookings
    LEFT JOIN facilities
    ON bookings.facility_id = facilities.id
    `,
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});


// =======================
// DETAIL BOOKING
// =======================

app.get("/bookings/:id", (req, res) => {

  db.get(
    `
    SELECT 
      bookings.*,
      facilities.name as facility_name
    FROM bookings
    LEFT JOIN facilities
    ON bookings.facility_id = facilities.id
    WHERE bookings.id = ?
    `,
    [req.params.id],
    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(row);
    }
  );
});


// =======================
// CREATE BOOKING
// =======================

app.post("/bookings", (req, res) => {

  const {
    user_name,
    facility_id,
    booking_date,
    start_time,
    end_time,
    purpose,
  } = req.body;

  db.run(
    `
    INSERT INTO bookings
    (
      user_name,
      facility_id,
      booking_date,
      start_time,
      end_time,
      purpose,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_name,
      facility_id,
      booking_date,
      start_time,
      end_time,
      purpose,
      "pending",
    ],
    function (err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Booking berhasil",
        id: this.lastID,
      });
    }
  );
});


// =======================
// UPDATE STATUS
// =======================

app.put("/bookings/:id/status", (req, res) => {

  const { status } = req.body;

  db.run(
    `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
    `,
    [status, req.params.id],
    function (err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Status berhasil diupdate",
      });
    }
  );
});


// =======================
// SERVER
// =======================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});