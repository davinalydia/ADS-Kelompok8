from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.facility import Facility

router = APIRouter(
    prefix="/facilities",
    tags=["Facilities"]
)

# =========================
# GET ALL
# =========================
@router.get("/")
def get_facilities(db: Session = Depends(get_db)):
    return db.query(Facility).all()


# =========================
# DEBUG
# =========================
@router.get("/debug")
def debug(db: Session = Depends(get_db)):
    from app.models.facility import Facility
    from app.models.booking_model import Booking
    from app.models.notification_model import Notification

    return {
        "facilities": db.query(Facility).count(),
        "bookings": db.query(Booking).count(),
        "notifications": db.query(Notification).count(),
    }


# =========================
# GET DETAIL
# =========================
@router.get("/{facility_id}")
def get_facility(
    facility_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Facility)
        .filter(Facility.id == facility_id)
        .first()
    )


# =========================
# CREATE
# =========================
@router.post("/")
def create_facility(
    data: dict,
    db: Session = Depends(get_db)
):
    try:
        new_facility = Facility(
            name=data.get("name"),
            location=data.get("location"),
            capacity=data.get("capacity"),
            status=data.get("status")
        )

        db.add(new_facility)
        db.commit()
        db.refresh(new_facility)

        return new_facility

    except Exception as e:
        return {"error": str(e)}


# =========================
# UPDATE
# =========================
@router.put("/{facility_id}")
def update_facility(
    facility_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    facility = (
        db.query(Facility)
        .filter(Facility.id == facility_id)
        .first()
    )

    if not facility:
        return {"message": "Facility not found"}

    try:
        facility.name = data.get("name", facility.name)
        facility.location = data.get("location", facility.location)
        facility.capacity = data.get("capacity", facility.capacity)
        facility.status = data.get("status", facility.status)

        db.commit()
        db.refresh(facility)

        return facility

    except Exception as e:
        return {"error": str(e)}


# =========================
# DELETE
# =========================
@router.delete("/{facility_id}")
def delete_facility(
    facility_id: int,
    db: Session = Depends(get_db)
):
    facility = (
        db.query(Facility)
        .filter(Facility.id == facility_id)
        .first()
    )

    if not facility:
        return {"message": "Facility not found"}

    try:
        db.delete(facility)
        db.commit()

        return {
            "message": "Facility deleted"
        }

    except Exception as e:
        return {"error": str(e)}