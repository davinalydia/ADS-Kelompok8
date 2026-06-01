from sqlalchemy.orm import Session

from app.models.notification import Notification


def create_notification(
    db: Session,
    user_id: int,
    message: str
):
    notification = Notification(
        user_id=user_id,
        message=message,
        status="unread"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_all_notifications(
    db: Session
):
    return db.query(Notification).all()


def get_notifications_by_user(
    db: Session,
    user_id: int
):
    return db.query(Notification).filter(
        Notification.user_id == user_id
    ).all()