from enum import Enum


class Role(str, Enum):
    """
    System roles used for authorization.

    - admin: platform administrators
    - user: regular end users
    """

    admin = "admin"
    user = "user"
