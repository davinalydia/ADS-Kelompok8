from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.schemas.facility_schema import (
    FacilityCreate,
    FacilityResponse
)

from app.services.facility_service import (
    create_facility,
    get_all_facilities
)

router = APIRouter(
    prefix="/facilities",
    tags=["Facilities"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=FacilityResponse)
def add_facility(
    facility: FacilityCreate,
    db: Session = Depends(get_db)
):
    return create_facility(db, facility)


@router.get("/", response_model=list[FacilityResponse])
def read_facilities(db: Session = Depends(get_db)):
    return get_all_facilities(db)