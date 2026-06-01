from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.notification_schema import (
    NotificationResponse
)

from app.services.notification_service import (
    get_all_notifications,
    get_notifications_by_user
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get(
    "/",
    response_model=list[NotificationResponse]
)
def read_notifications(
    db: Session = Depends(get_db)
):
    return get_all_notifications(db)


@router.get(
    "/user/{user_id}",
    response_model=list[NotificationResponse]
)
def read_user_notifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_notifications_by_user(
        db,
        user_id
    )