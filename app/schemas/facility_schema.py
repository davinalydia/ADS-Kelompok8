from pydantic import BaseModel

class FacilityCreate(BaseModel):
    name: str
    location: str
    capacity: int
    status: str = "available"


class FacilityResponse(BaseModel):
    id: int
    name: str
    location: str
    capacity: int
    status: str

    class Config:
        from_attributes = True