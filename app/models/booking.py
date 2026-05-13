from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from app.database.connection import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)
    facility_id = Column(Integer, ForeignKey("facilities.id"))

    booking_date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)

    purpose = Column(String)

    status = Column(String, default="pending")