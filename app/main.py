from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine

# ROUTES
from app.routes.booking_routes import router as booking_router
from app.routes.facility_routes import router as facility_router
from app.routes.notification_routes import router as notification_router

# MODELS
from app.models.booking_model import Booking
from app.models.facility import Facility
from app.models.notification_model import Notification

# CREATE TABLE
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(booking_router)
app.include_router(facility_router)
app.include_router(notification_router)