from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.schemas.booking_schema import (
    BookingCreate,
    BookingResponse
)

from app.services.booking_service import (
    create_booking,
    get_all_bookings,
    approve_booking,
    reject_booking
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=BookingResponse)
def add_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db)
):
    return create_booking(db, booking)


@router.get("/", response_model=list[BookingResponse])
def read_bookings(
    db: Session = Depends(get_db)
):
    return get_all_bookings(db)


@router.put("/{booking_id}/approve")
def approve(
    booking_id: int,
    db: Session = Depends(get_db)
):
    return approve_booking(db, booking_id)


@router.put("/{booking_id}/reject")
def reject(
    booking_id: int,
    db: Session = Depends(get_db)
):
    return reject_booking(db, booking_id)