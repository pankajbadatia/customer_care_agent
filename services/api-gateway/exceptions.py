from fastapi import HTTPException, status


class AuthenticationError(HTTPException):
    """
    Raised when authentication fails (401).
    """

    def __init__(self, detail: str = "Authentication required"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
        )


class AuthorizationError(HTTPException):
    """
    Raised when user is authenticated but not authorized (403).
    """

    def __init__(self, detail: str = "Not authorized to access this resource"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )


class BadRequestError(HTTPException):
    """
    Raised for invalid client input (400).
    """

    def __init__(self, detail: str = "Bad request"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class ResourceNotFoundError(HTTPException):
    """
    Raised when a requested resource does not exist (404).
    """

    def __init__(self, detail: str = "Resource not found"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )
