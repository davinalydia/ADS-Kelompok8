from sqlalchemy import Column, Integer, String, Boolean

from app.database.connection import Base


class Notification(Base):

    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    role = Column(String)

    user_id = Column(Integer, nullable=True)

    title = Column(String)

    message = Column(String)

    is_read = Column(Boolean, default=False)