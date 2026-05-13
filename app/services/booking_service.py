from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.schemas.booking_schema import BookingCreate


def create_booking(db: Session, booking: BookingCreate):

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

    return new_booking


def get_all_bookings(db: Session):
    return db.query(Booking).all()


def approve_booking(db: Session, booking_id: int):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if booking:
        booking.status = "approved"
        db.commit()
        db.refresh(booking)

    return booking


def reject_booking(db: Session, booking_id: int):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if booking:
        booking.status = "rejected"
        db.commit()
        db.refresh(booking)

    return booking