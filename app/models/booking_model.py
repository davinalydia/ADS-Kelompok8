from sqlalchemy import Column, Integer, String, Date, Time
from app.database.connection import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)
    user_name = Column(String)

    facility_id = Column(Integer)
    facility_name = Column(String)

    booking_date = Column(Date)

    start_time = Column(Time)
    end_time = Column(Time)

    purpose = Column(String)

    status = Column(String, default="pending")