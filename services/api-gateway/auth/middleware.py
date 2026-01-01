from typing import Optional, Dict, Any

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

from auth.jwt_handler import decode_access_token

# Cookie names used for access tokens
USER_ACCESS_COOKIE_NAME = "csacp_user_access_token"
ADMIN_ACCESS_COOKIE_NAME = "csacp_admin_access_token"


# -------------------------------------------------------------------
# Helper
# -------------------------------------------------------------------

def _extract_bearer_token(authorization_header: Optional[str]) -> Optional[str]:
    """
    Extracts the Bearer token from an Authorization header:

        Authorization: Bearer <token>
    """
    if not authorization_header:
        return None

    parts = authorization_header.split()
    if len(parts) != 2:
        return None

    scheme, token = parts
    if scheme.lower() != "bearer":
        return None

    return token


def _extract_token_from_cookies(request: Request) -> Optional[str]:
    """
    Extract a token from HttpOnly cookies if present.
    Tries user cookie first, then admin cookie.
    """
    user_token = request.cookies.get(USER_ACCESS_COOKIE_NAME)
    admin_token = request.cookies.get(ADMIN_ACCESS_COOKIE_NAME)

    return user_token or admin_token


# -------------------------------------------------------------------
# Middleware
# -------------------------------------------------------------------

class AuthContextMiddleware(BaseHTTPMiddleware):
    """
    Middleware that decodes a JWT (if present) and attaches the
    user payload to request.state.user.

    It does NOT raise on invalid/missing tokens; that is handled
    by dependencies such as get_current_user().
    """

    async def dispatch(self, request: Request, call_next):
        token: Optional[str] = None

        # 1) Try Authorization header
        token = _extract_bearer_token(request.headers.get("Authorization"))

        # 2) Fallback to cookies (HttpOnly access token)
        if token is None:
            token = _extract_token_from_cookies(request)

        if token:
            try:
                payload = decode_access_token(token)
                # attach decoded user info to request
                request.state.user = payload
            except ValueError:
                # Invalid token - treat as unauthenticated
                request.state.user = None

        response = await call_next(request)
        return response


# -------------------------------------------------------------------
# Dependency helpers (used by routes)
# -------------------------------------------------------------------

def get_current_user(request: Request) -> Dict[str, Any]:
    """
    Dependency that returns the authenticated user
    or raises 401 if not authenticated.
    """
    user = getattr(request.state, "user", None)

    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return user
