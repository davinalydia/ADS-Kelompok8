from sqlalchemy import Column, Integer, String
from app.database.connection import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    message = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="unread"
    )