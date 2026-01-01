from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from config import settings

# -------------------------------------------------------------------
# Password hashing
# -------------------------------------------------------------------

_pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    """
    Hash a plaintext password using bcrypt.
    """
    return _pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a stored bcrypt hash.
    """
    return _pwd_context.verify(plain_password, hashed_password)


# -------------------------------------------------------------------
# JWT helpers
# -------------------------------------------------------------------

def _now() -> datetime:
    return datetime.now(timezone.utc)


def _create_token(
    *,
    subject: str,
    role: str,
    expires_delta: timedelta,
    token_type: str,
) -> str:
    """
    Create a signed JWT with standard claims.

    token_type is either "access" or "refresh".
    """
    now = _now()
    payload: Dict[str, Any] = {
        "sub": subject,
        "role": role,
        "iat": int(now.timestamp()),
        "type": token_type,
    }

    expires = now + expires_delta
    payload["exp"] = int(expires.timestamp())

    encoded = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return encoded


def create_access_token(
    *,
    subject: str,
    role: str,
    expires_minutes: Optional[int] = None,
) -> str:
    """
    Create a short-lived access token.

    Default lifetime is settings.JWT_ACCESS_TOKEN_EXPIRES_MINUTES.
    """
    minutes = (
        expires_minutes
        if expires_minutes is not None
        else settings.JWT_ACCESS_TOKEN_EXPIRES_MINUTES
    )

    return _create_token(
        subject=subject,
        role=role,
        expires_delta=timedelta(minutes=minutes),
        token_type="access",
    )


def create_refresh_token(
    *,
    subject: str,
    role: str,
    expires_days: Optional[int] = None,
) -> str:
    """
    Create a longer-lived refresh token.

    Default lifetime is settings.JWT_REFRESH_TOKEN_EXPIRES_DAYS.
    """
    days = (
        expires_days
        if expires_days is not None
        else settings.JWT_REFRESH_TOKEN_EXPIRES_DAYS
    )

    return _create_token(
        subject=subject,
        role=role,
        expires_delta=timedelta(days=days),
        token_type="refresh",
    )


def _decode_token(token: str, expected_type: str) -> Dict[str, Any]:
    """
    Decode and validate a JWT. Ensure token_type matches expected_type.
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )

        if "sub" not in payload or "role" not in payload:
            raise ValueError("Invalid token payload: missing sub/role")

        token_type = payload.get("type")
        if token_type != expected_type:
            raise ValueError(f"Invalid token type: expected {expected_type}")

        return payload

    except JWTError as exc:
        raise ValueError("Invalid or expired token") from exc


def decode_access_token(token: str) -> Dict[str, Any]:
    """
    Decode an access token and return its payload.
    """
    return _decode_token(token, expected_type="access")


def decode_refresh_token(token: str) -> Dict[str, Any]:
    """
    Decode a refresh token and return its payload.
    """
    return _decode_token(token, expected_type="refresh")
