from typing import Dict, Any

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
)
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models import User
from dependencies import get_db
from auth.jwt_handler import (
    verify_password,
    create_access_token,
    hash_password,
)
from auth.middleware import get_current_user


# -------------------------------------------------------------------
# Cookie Names (must match frontend + middleware)
# -------------------------------------------------------------------

ADMIN_ACCESS_COOKIE = "csacp_admin_access_token"
ADMIN_REFRESH_COOKIE = "csacp_admin_refresh_token"  # reserved (future use)


# -------------------------------------------------------------------
# Router
# -------------------------------------------------------------------

router = APIRouter(prefix="/auth", tags=["auth"])


# -------------------------------------------------------------------
# Schemas
# -------------------------------------------------------------------

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: str = "user"  # "user" | "admin"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    email: EmailStr
    role: str


class MeResponse(BaseModel):
    email: EmailStr
    role: str


# -------------------------------------------------------------------
# Helpers
# -------------------------------------------------------------------

def set_login_cookie(response: Response, token: str):
    """
    Set HttpOnly cookie used by admin dashboard & NextJS middleware.
    """
    response.set_cookie(
        key=ADMIN_ACCESS_COOKIE,
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,   # change to True if using HTTPS
        path="/",
    )


# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),
) -> Dict[str, str]:
    """
    Create a new user (does NOT log in automatically).
    """

    role = (payload.role or "user").strip().lower()
    if role not in {"user", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Must be 'user' or 'admin'.",
        )

    existing = (
        db.execute(select(User).where(User.email == payload.email))
        .scalar_one_or_none()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    user = User(
        email=payload.email,
        role=role,
        password_hash=hash_password(payload.password),
        is_active=True,
    )

    db.add(user)
    db.commit()

    return {"detail": "User registered successfully"}


@router.post("/login", response_model=LoginResponse)
def login(
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> LoginResponse:
    """
    Authenticate user → issue JWT → set cookie → return JSON.
    """

    user = (
        db.execute(select(User).where(User.email == payload.email))
        .scalar_one_or_none()
    )

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    # Create JWT
    token = create_access_token(subject=user.email, role=user.role)

    # ---- IMPORTANT ----
    # Admin dashboard relies on this cookie
    set_login_cookie(response, token)

    # Also return JSON (frontend already expects this)
    return LoginResponse(
        access_token=token,
        email=user.email,
        role=user.role,
    )


@router.get("/logout")
def logout(response: Response):
    """
    Clear admin auth cookie.
    """
    response.delete_cookie(
        key=ADMIN_ACCESS_COOKIE,
        path="/",
    )

    return {"detail": "Logged out"}


@router.get("/me", response_model=MeResponse)
def me(current_user: Dict[str, Any] = Depends(get_current_user)) -> MeResponse:
    """
    Return authenticated user identity.
    """
    return MeResponse(
        email=current_user["sub"],
        role=current_user["role"],
    )
