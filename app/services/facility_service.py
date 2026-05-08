from sqlalchemy.orm import Session
from app.models.facility import Facility
from app.schemas.facility_schema import FacilityCreate


def create_facility(db: Session, facility: FacilityCreate):
    new_facility = Facility(
        name=facility.name,
        location=facility.location,
        capacity=facility.capacity,
        status=facility.status
    )

    db.add(new_facility)
    db.commit()
    db.refresh(new_facility)

    return new_facility


def get_all_facilities(db: Session):
    return db.query(Facility).all()