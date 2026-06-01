from sqlalchemy import Column, Integer, String
from app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    role = Column(
        String,
        nullable=False,
        default="mahasiswa"
    )

    def is_admin(self):
        return self.role == "admin"

    def is_dosen(self):
        return self.role == "dosen"

    def is_mahasiswa(self):
        return self.role == "mahasiswa"