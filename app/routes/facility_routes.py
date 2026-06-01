from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.facility_schema import (
    FacilityCreate,
    FacilityResponse
)

from app.services.facility_service import (
    create_facility,
    get_all_facilities,
    get_facility_by_id,
    update_facility,
    delete_facility
)

router = APIRouter(
    prefix="/facilities",
    tags=["Facilities"]
)


@router.post("/", response_model=FacilityResponse)
def add_facility(
    facility: FacilityCreate,
    db: Session = Depends(get_db)
):
    return create_facility(db, facility)


@router.get("/", response_model=list[FacilityResponse])
def read_facilities(
    db: Session = Depends(get_db)
):
    return get_all_facilities(db)


@router.get("/{facility_id}")
def read_facility(
    facility_id: int,
    db: Session = Depends(get_db)
):
    return get_facility_by_id(
        db,
        facility_id
    )


@router.put("/{facility_id}")
def edit_facility(
    facility_id: int,
    facility: FacilityCreate,
    db: Session = Depends(get_db)
):
    return update_facility(
        db,
        facility_id,
        facility
    )


@router.delete("/{facility_id}")
def remove_facility(
    facility_id: int,
    db: Session = Depends(get_db)
):
    return delete_facility(
        db,
        facility_id
    )