from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import settings

# -------------------------------------------------------------------
# Engine
# -------------------------------------------------------------------

# SQLite needs check_same_thread=False when used with FastAPI/Uvicorn
_connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    _connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=_connect_args,
    future=True,
    pool_pre_ping=True,
)

# -------------------------------------------------------------------
# Session factory
# -------------------------------------------------------------------

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    future=True,
)
