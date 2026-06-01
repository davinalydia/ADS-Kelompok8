from fastapi import FastAPI

from app.database.connection import engine, Base

# Models
from app.models.facility import Facility
from app.models.booking import Booking
from app.models.user import User
from app.models.notification import Notification

# Routes
from app.routes.facility_routes import router as facility_router
from app.routes.booking_routes import router as booking_router
from app.routes.user_routes import router as user_router
from app.routes.auth_routes import router as auth_router
from app.routes.notification_routes import router as notification_router

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Campus Facility Booking API",
    version="1.0.0"
)

# Register Routes
app.include_router(facility_router)
app.include_router(booking_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(notification_router)


@app.get("/")
def home():
    return {
        "message": "Backend running successfully"
    }