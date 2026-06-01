from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.models.booking_model import Booking
from app.models.notification_model import Notification
from app.models.facility import Facility

from app.schemas.booking_schema import BookingCreate

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


# =========================
# DB
# =========================
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================
# CREATE BOOKING
# =========================
@router.post("/")
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Booking).filter(
    Booking.facility_id == data.facility_id,
    Booking.booking_date == data.booking_date,
    Booking.status == "approved",

    Booking.start_time < data.end_time,
    Booking.end_time > data.start_time

).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Ruangan tidak tersedia"
        )

    booking = Booking(
        user_id=data.user_id,
        user_name=data.user_name,
        facility_id=data.facility_id,
        facility_name=data.facility_name,
        booking_date=data.booking_date,
        start_time=data.start_time,
        end_time=data.end_time,
        purpose=data.purpose,
        status="pending"
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    # =========================
    # NOTIF ADMIN
    # =========================
    notif = Notification(
        role="admin",
        title="Permintaan Baru",
        message=f"{booking.user_name} mengajukan peminjaman {booking.facility_name}",
        is_read=False
    )

    db.add(notif)
    db.commit()

    return booking


# =========================
# GET ALL BOOKINGS
# =========================
@router.get("/")
def get_bookings(
    db: Session = Depends(get_db)
):

    bookings = db.query(Booking).all()

    result = []

    for booking in bookings:

        result.append({
            "id": booking.id,
            "user_id": booking.user_id,
            "user_name": booking.user_name,
            "facility_id": booking.facility_id,
            "facility_name": booking.facility_name,
            "booking_date": booking.booking_date,
            "start_time": booking.start_time,
            "end_time": booking.end_time,
            "purpose": booking.purpose,
            "status": booking.status
        })

    return result


# =========================
# GET DETAIL BOOKING
# =========================
@router.get("/{booking_id}")
def get_booking_detail(
    booking_id: int,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking tidak ditemukan"
        )

    return booking


# =========================
# UPDATE STATUS
# =========================
@router.put("/{booking_id}/status")
def update_booking_status(
    booking_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking tidak ditemukan"
        )

    booking.status = data["status"]

    db.commit()
    db.refresh(booking)

    # =========================
    # DEBUG
    # =========================
    print("BOOKING USER ID =", booking.user_id)
    print("BOOKING STATUS =", booking.status)

    # =========================
    # NOTIF USER
    # =========================
    notif = Notification(
        role="user",
        user_id=booking.user_id,
        title="Status Peminjaman",
        message=(
            f"Peminjaman {booking.facility_name} "
            f"{'disetujui' if booking.status == 'approved' else 'ditolak'}"
        ),
        is_read=False
    )

    db.add(notif)
    db.commit()

    return {
        "message": "Status berhasil diupdate",
        "booking": booking
    }