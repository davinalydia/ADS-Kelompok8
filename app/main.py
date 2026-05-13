from fastapi import FastAPI

from app.database.connection import engine, Base

from app.models.facility import Facility
from app.models.booking import Booking
from app.models.user import User

from app.routes.facility_routes import router as facility_router
from app.routes.booking_routes import router as booking_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Campus Facility Booking API",
    version="1.0.0"
)

app.include_router(facility_router)
app.include_router(booking_router)


@app.get("/")
def home():
    return {
        "message": "Backend running successfully"
    }