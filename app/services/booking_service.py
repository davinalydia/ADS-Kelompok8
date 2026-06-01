from sqlalchemy.orm import Session
from app.models.booking import Booking

def get_all_bookings(db: Session):
    bookings = db.query(Booking).all()

    result = []
    for b in bookings:
        result.append({
            "id": b.id,
            "user_id": b.user_id,
            "facility_id": b.facility_id,
            "facility_name": b.facility.name if b.facility else None,
            "booking_date": str(b.booking_date),
            "start_time": str(b.start_time),
            "end_time": str(b.end_time),
            "purpose": b.purpose,
            "status": b.status
        })

    return result