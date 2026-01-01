from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables.

    This uses pydantic-settings so:
    - values are type-safe
    - defaults are explicit
    - env vars override defaults cleanly
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ------------------------------------------------------------------
    # Environment
    # ------------------------------------------------------------------
    ENV: str = "local"
    LOG_LEVEL: str = "INFO"

    # ------------------------------------------------------------------
    # API
    # ------------------------------------------------------------------
    API_PORT: int = 8000

    # ------------------------------------------------------------------
    # Authentication / JWT
    # ------------------------------------------------------------------
    JWT_SECRET_KEY: str = "change-me"   # MUST be overridden in production
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRES_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRES_DAYS: int = 7

    # ------------------------------------------------------------------
    # Database
    # ------------------------------------------------------------------
    DATABASE_URL: str = "sqlite:///./api_gateway.db"


# Singleton settings object (import this everywhere)
settings = Settings()
