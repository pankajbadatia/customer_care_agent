from sqlalchemy import select
from passlib.context import CryptContext

from db.session import engine, SessionLocal
from db.models import Base, User

# -------------------------------------------------------------------
# Password hashing (same scheme as jwt_handler)
# -------------------------------------------------------------------

_pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


# -------------------------------------------------------------------
# DB initialization
# -------------------------------------------------------------------

def create_tables() -> None:
    """
    Create all database tables.

    Safe to call multiple times.
    """
    Base.metadata.create_all(bind=engine)


def seed_default_users() -> None:
    """
    Seed default admin and user accounts if they do not exist.

    This is ONLY for local/dev/demo environments.
    """
    with SessionLocal() as db:
        # ---- Admin user
        admin_email = "admin@example.com"
        admin_exists = db.execute(
            select(User).where(User.email == admin_email)
        ).scalar_one_or_none()

        if not admin_exists:
            admin_user = User(
                email=admin_email,
                full_name="Local Admin",
                role="admin",
                password_hash=_pwd_context.hash("admin123"),
                is_active=True,
            )
            db.add(admin_user)

        # ---- Regular user
        user_email = "user@example.com"
        user_exists = db.execute(
            select(User).where(User.email == user_email)
        ).scalar_one_or_none()

        if not user_exists:
            normal_user = User(
                email=user_email,
                full_name="Local User",
                role="user",
                password_hash=_pwd_context.hash("user123"),
                is_active=True,
            )
            db.add(normal_user)

        db.commit()
