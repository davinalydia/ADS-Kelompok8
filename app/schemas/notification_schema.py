from pydantic import BaseModel


class NotificationCreate(BaseModel):
    user_id: int
    message: str


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    message: str
    status: str

    class Config:
        from_attributes = True