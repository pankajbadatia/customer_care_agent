from fastapi import FastAPI, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from prometheus_client import Counter, generate_latest

from auth.middleware import AuthContextMiddleware
from db.init_db import create_tables, seed_default_users

# Routers
from routing.health import router as health_router
from routing.auth_routes import router as auth_router
from routing.user_routes import router as user_router
from routing.admin_routes import router as admin_router
from routing.chatbot_routes import router as chatbot_router


# -------------------------------------------------------------------
# App
# -------------------------------------------------------------------

app = FastAPI(
    title="Customer Support AI Control Plane – API Gateway",
    version="1.0.0",
)


# -------------------------------------------------------------------
# Auth Middleware (INNER)
# -------------------------------------------------------------------

app.add_middleware(AuthContextMiddleware)


# -------------------------------------------------------------------
# Observability
# -------------------------------------------------------------------

REQUEST_COUNT = Counter(
    "api_gateway_requests_total",
    "Total number of requests to API Gateway",
)


@app.middleware("http")
async def request_metrics(request: Request, call_next):
    REQUEST_COUNT.inc()
    return await call_next(request)


@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type="text/plain")


# -------------------------------------------------------------------
# Startup
# -------------------------------------------------------------------

@app.on_event("startup")
def on_startup():
    create_tables()
    seed_default_users()


# -------------------------------------------------------------------
# Error handling
# -------------------------------------------------------------------

@app.exception_handler(PermissionError)
async def permission_error_handler(request: Request, exc: PermissionError):
    return Response(
        content='{"detail": "Forbidden"}',
        status_code=403,
        media_type="application/json",
    )


# -------------------------------------------------------------------
# Routers
# -------------------------------------------------------------------

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(chatbot_router)


# -------------------------------------------------------------------
# Root
# -------------------------------------------------------------------

@app.get("/")
def root():
    return {"service": "api-gateway", "status": "running"}


# -------------------------------------------------------------------
# CORS (OUTERMOST — MUST BE ADDED LAST)
# -------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # user-dashboard
        "http://localhost:3003",
        # admin-dashboard
        "http://localhost:3002",
        # optional local ports
        "http://localhost:3000",
        # LAN IPs (optional)
        "http://192.168.0.134:3002",
        "http://192.168.0.134:3003",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
