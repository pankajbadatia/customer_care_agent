from sqlalchemy import String, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# -------------------------------------------------------------------
# Base class
# -------------------------------------------------------------------

class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy models.
    """
    pass


# -------------------------------------------------------------------
# User model
# -------------------------------------------------------------------

class User(Base):
    """
    User account for authentication and authorization.

    This table is the source of truth for:
    - login
    - roles (admin / user)
    - account status
    """

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        default="",
    )

    role: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="user",   # must match Role enum values
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    def __repr__(self) -> str:
        return (
            f"<User id={self.id} "
            f"email={self.email} "
            f"role={self.role} "
            f"is_active={self.is_active}>"
        )
