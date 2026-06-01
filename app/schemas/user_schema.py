from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    role: str = "mahasiswa"


class UserResponse(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True