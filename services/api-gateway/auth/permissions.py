from auth.roles import Role


def can_access_user(role: str) -> bool:
    """
    User-level access.

    - user: allowed
    - admin: allowed (admins can do everything users can)
    """
    return role in {Role.user.value, Role.admin.value}


def can_access_admin(role: str) -> bool:
    """
    Admin-level access.

    - admin: allowed
    - user: NOT allowed
    """
    return role == Role.admin.value
