from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth_schema import LoginRequest


def login_user(
    db: Session,
    login_data: LoginRequest
):

    user = db.query(User).filter(
        User.email == login_data.email.lower()
    ).first()

    if not user:
        raise Exception(
            "Email tidak ditemukan"
        )

    if user.password != login_data.password:
        raise Exception(
            "Password salah"
        )

    return {
        "message": "Login berhasil",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }