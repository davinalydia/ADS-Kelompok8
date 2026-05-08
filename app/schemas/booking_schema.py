from pydantic import BaseModel
from datetime import date, time


class BookingCreate(BaseModel):
    user_id: int
    facility_id: int

    booking_date: date

    start_time: time
    end_time: time

    purpose: str


class BookingResponse(BaseModel):
    id: int

    user_id: int
    facility_id: int

    booking_date: date

    start_time: time
    end_time: time

    purpose: str

    status: str

    class Config:
        from_attributes = True