from fastapi import APIRouter

router = APIRouter(
    tags=["health"],
)

@router.get("/health")
def health():
    """
    Liveness / readiness probe.

    - Used by Docker, Kubernetes, load balancers
    - Must be fast
    - Must NOT require authentication
    """
    return {
        "status": "healthy"
    }
