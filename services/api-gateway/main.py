from fastapi import FastAPI
from prometheus_client import Counter, generate_latest
from fastapi.responses import Response

app = FastAPI(title="API Gateway")

REQUEST_COUNT = Counter(
    "api_gateway_requests_total",
    "Total number of requests to API Gateway"
)

@app.get("/")
def root():
    REQUEST_COUNT.inc()
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type="text/plain")
