from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.user_schema import (
    UserCreate,
    UserResponse
)

from app.services.user_service import (
    create_user,
    get_all_users,
    get_user_by_id
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
def create_new_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)


@router.get("/")
def get_users(
    db: Session = Depends(get_db)
):
    return get_all_users(db)


@router.get("/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_user_by_id(
        db,
        user_id
    )