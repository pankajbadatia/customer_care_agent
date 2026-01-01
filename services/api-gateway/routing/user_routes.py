from fastapi import APIRouter, Depends

from auth.middleware import get_current_user
from auth.permissions import can_access_user

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

# -------------------------------------------------------------------
# Dependencies
# -------------------------------------------------------------------

def require_user(user=Depends(get_current_user)):
    """
    Ensures the current user has user-level access.
    Admins are also allowed.
    """
    if not can_access_user(user["role"]):
        # get_current_user already ensures authentication
        # so reaching here means forbidden
        raise PermissionError("User access required")
    return user


# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------

@router.get("/hello")
def hello_user(user=Depends(require_user)):
    """
    Example user-only endpoint.
    """
    return {
        "message": "Hello from user area",
        "user": user["sub"],
        "role": user["role"],
    }
