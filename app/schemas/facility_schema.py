from pydantic import BaseModel


class FacilityBase(BaseModel):
    name: str
    location: str
    capacity: int
    status: str = "available"
    image_url: str | None = None


class FacilityCreate(FacilityBase):
    pass


class FacilityResponse(FacilityBase):
    id: int

    class Config:
        from_attributes = True