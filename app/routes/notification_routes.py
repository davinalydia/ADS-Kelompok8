from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.notification_model import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

# =========================
# DB
# =========================
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================
# GET NOTIFICATIONS
# =========================
@router.get("/")
def get_notifications(
    role: str,
    user_id: int = None,
    db: Session = Depends(get_db)
):

    query = db.query(Notification).filter(
        Notification.role == role
    )

    # notif khusus user login
    if role == "user" and user_id:

        query = query.filter(
            Notification.user_id == user_id
        )

    notifications = query.order_by(
        Notification.id.desc()
    ).all()

    return notifications


# =========================
# READ NOTIFICATION
# =========================
@router.put("/{notif_id}/read")
def read_notification(
    notif_id: int,
    db: Session = Depends(get_db)
):

    notif = db.query(Notification).filter(
        Notification.id == notif_id
    ).first()

    if notif:

        notif.is_read = True

        db.commit()

    return {
        "message": "Notification read"
    }