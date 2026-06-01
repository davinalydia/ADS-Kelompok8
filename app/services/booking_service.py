from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.booking import Booking

from app.schemas.booking_schema import BookingCreate

from app.services.notification_service import (
    create_notification
)


def create_booking(
    db: Session,
    booking: BookingCreate
):

    conflicting_booking = db.query(Booking).filter(
        Booking.facility_id == booking.facility_id,
        Booking.booking_date == booking.booking_date,
        Booking.status == "approved",

        Booking.start_time < booking.end_time,
        Booking.end_time > booking.start_time
    ).first()

    if conflicting_booking:
        raise HTTPException(
            status_code=400,
            detail="Jadwal bentrok. Fasilitas sudah digunakan pada jam tersebut."
        )

    new_booking = Booking(
        user_id=booking.user_id,
        facility_id=booking.facility_id,
        booking_date=booking.booking_date,
        start_time=booking.start_time,
        end_time=booking.end_time,
        purpose=booking.purpose,
        status="pending"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    create_notification(
        db,
        booking.user_id,
        "Peminjaman berhasil diajukan dan sedang menunggu persetujuan."
    )

    return new_booking


def get_all_bookings(
    db: Session
):
    return db.query(Booking).all()


def approve_booking(
    db: Session,
    booking_id: int
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking tidak ditemukan."
        )

    booking.status = "approved"

    db.commit()
    db.refresh(booking)

    create_notification(
        db,
        booking.user_id,
        "Peminjaman Anda telah disetujui."
    )

    return booking


def reject_booking(
    db: Session,
    booking_id: int
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking tidak ditemukan."
        )

    booking.status = "rejected"

    db.commit()
    db.refresh(booking)

    create_notification(
        db,
        booking.user_id,
        "Peminjaman Anda telah ditolak."
    )

    return booking