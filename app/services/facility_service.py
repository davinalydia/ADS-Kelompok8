from sqlalchemy.orm import Session

from app.models.facility import Facility
from app.schemas.facility_schema import FacilityCreate


def create_facility(
    db: Session,
    facility: FacilityCreate
):
    new_facility = Facility(
        name=facility.name,
        location=facility.location,
        capacity=facility.capacity,
        status=facility.status,
        image_url=facility.image_url
    )

    db.add(new_facility)
    db.commit()
    db.refresh(new_facility)

    return new_facility


def get_all_facilities(db: Session):
    return db.query(Facility).all()


def get_facility_by_id(
    db: Session,
    facility_id: int
):
    return db.query(Facility).filter(
        Facility.id == facility_id
    ).first()


def update_facility(
    db: Session,
    facility_id: int,
    facility_data: FacilityCreate
):
    facility = db.query(Facility).filter(
        Facility.id == facility_id
    ).first()

    if not facility:
        return None

    facility.name = facility_data.name
    facility.location = facility_data.location
    facility.capacity = facility_data.capacity
    facility.status = facility_data.status
    facility.image_url = facility_data.image_url

    db.commit()
    db.refresh(facility)

    return facility


def delete_facility(
    db: Session,
    facility_id: int
):
    facility = db.query(Facility).filter(
        Facility.id == facility_id
    ).first()

    if not facility:
        return None

    db.delete(facility)
    db.commit()

    return {
        "message": "Facility deleted successfully"
    }