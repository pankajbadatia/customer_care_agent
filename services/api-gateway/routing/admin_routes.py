from fastapi import APIRouter, Depends, HTTPException, status

from auth.middleware import get_current_user
from auth.permissions import can_access_admin

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

# -------------------------------------------------------------------
# Dependencies
# -------------------------------------------------------------------

def require_admin(user=Depends(get_current_user)):
    """
    Ensures the current user has admin-level access.
    """
    if not can_access_admin(user["role"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user


# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------

@router.get("/hello")
def hello_admin(user=Depends(require_admin)):
    """
    Example admin-only endpoint.
    """
    return {
        "message": "Hello from admin area",
        "admin": user["sub"],
        "role": user["role"],
    }
