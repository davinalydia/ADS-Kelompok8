from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.auth_schema import LoginRequest
from app.services.auth_service import login_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    return login_user(
        db,
        login_data
    )