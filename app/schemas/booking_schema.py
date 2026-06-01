from pydantic import BaseModel
from datetime import date, time

class BookingCreate(BaseModel):
    user_id: int
    user_name: str

    facility_id: int
    facility_name: str

    booking_date: date

    start_time: time
    end_time: time

    purpose: str


class BookingResponse(BookingCreate):
    id: int
    status: str

    class Config:
        from_attributes = True