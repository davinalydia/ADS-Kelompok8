from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserCreate


def create_user(
    db: Session,
    user: UserCreate
):

    # Validasi domain email
    if not user.email.endswith("@apps.ipb.ac.id"):
        raise Exception(
            "Email harus menggunakan domain @apps.ipb.ac.id"
        )

    # Cek email sudah terdaftar
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise Exception(
            "Email sudah terdaftar"
        )

    # Role default
    role = user.role.lower()

    # Hanya boleh mahasiswa atau dosen
    if role not in ["mahasiswa", "dosen"]:
        raise Exception(
            "Role hanya boleh mahasiswa atau dosen"
        )

    # Admin khusus
    if user.email.lower() == "admin@apps.ipb.ac.id":
        role = "admin"

    new_user = User(
        name=user.name,
        email=user.email.lower(),
        password=user.password,
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_all_users(db: Session):
    return db.query(User).all()


def get_user_by_id(
    db: Session,
    user_id: int
):
    return db.query(User).filter(
        User.id == user_id
    ).first()


def get_user_by_email(
    db: Session,
    email: str
):
    return db.query(User).filter(
        User.email == email.lower()
    ).first()


def get_admin_users(db: Session):
    return db.query(User).filter(
        User.role == "admin"
    ).all()


def get_dosen_users(db: Session):
    return db.query(User).filter(
        User.role == "dosen"
    ).all()


def get_mahasiswa_users(db: Session):
    return db.query(User).filter(
        User.role == "mahasiswa"
    ).all()