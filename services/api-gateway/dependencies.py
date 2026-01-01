from typing import Generator

from db.session import SessionLocal


def get_db() -> Generator:
    """
    FastAPI dependency that provides a database session.

    - Opens a DB session per request
    - Commits/rolls back handled by caller
    - Always closes the session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
