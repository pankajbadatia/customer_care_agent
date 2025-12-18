"""
Integration tests for API Gateway.

This test suite validates:
- Gateway availability & readiness
- Health and root endpoints
- Prometheus metrics exposure
- Basic routing stability
- Error handling guarantees

These tests run against a live API Gateway instance
and do NOT mock internal logic.
"""

from __future__ import annotations

import os
import time
import json
from typing import Dict

import pytest
import requests


# ============================
# Configuration
# ============================

API_GATEWAY_URL = os.getenv("API_GATEWAY_URL", "http://localhost:8000")

HEALTH_ENDPOINT = f"{API_GATEWAY_URL}/health"
ROOT_ENDPOINT = f"{API_GATEWAY_URL}/"
METRICS_ENDPOINT = f"{API_GATEWAY_URL}/metrics"

REQUEST_TIMEOUT = 10


# ============================
# Helpers
# ============================

def wait_for_gateway(timeout: int = 30) -> None:
    """
    Wait until API Gateway is healthy.
    """
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(HEALTH_ENDPOINT, timeout=2)
            if r.status_code == 200:
                return
        except requests.RequestException:
            pass
        time.sleep(1)
    raise RuntimeError("API Gateway did not become ready in time")


# ============================
# Tests
# ============================

@pytest.mark.integration
def test_gateway_health_endpoint():
    """
    Gateway must expose a reliable health endpoint.
    """
    wait_for_gateway()

    response = requests.get(HEALTH_ENDPOINT, timeout=REQUEST_TIMEOUT)
    assert response.status_code == 200

    body = response.json()
    assert body.get("status") in {"healthy", "ok"}

    json.dumps(body)  # must be serializable


@pytest.mark.integration
def test_gateway_root_endpoint():
    """
    Root endpoint should be lightweight and stable.
    Used by dashboards and uptime checks.
    """
    wait_for_gateway()

    response = requests.get(ROOT_ENDPOINT, timeout=REQUEST_TIMEOUT)
    assert response.status_code == 200

    body = response.json()
    assert isinstance(body, dict)
    assert body.get("status") == "ok"

    json.dumps(body)


@pytest.mark.integration
def test_gateway_metrics_endpoint_exposed():
    """
    Prometheus must be able to scrape /metrics reliably.
    """
    wait_for_gateway()

    response = requests.get(METRICS_ENDPOINT, timeout=REQUEST_TIMEOUT)
    assert response.status_code == 200

    content = response.text
    assert "api_gateway_requests_total" in content

    # Metrics endpoint must not return JSON
    assert "{" not in content


@pytest.mark.integration
def test_gateway_handles_unknown_route_gracefully():
    """
    Gateway must return a controlled 404 for unknown routes,
    not crash or expose stack traces.
    """
    wait_for_gateway()

    response = requests.get(
        f"{API_GATEWAY_URL}/this-route-does-not-exist",
        timeout=REQUEST_TIMEOUT,
    )

    assert response.status_code == 404

    # Content may be JSON or plain text, but must be safe
    assert response.text is not None
    assert len(response.text) < 1000  # guard against stack dumps


@pytest.mark.integration
def test_gateway_json_error_contract():
    """
    Error responses should be JSON-serializable
    and safe for clients and logs.
    """
    wait_for_gateway()

    response = requests.post(
        f"{API_GATEWAY_URL}/internal/invalid",
        json={"bad": "payload"},
        timeout=REQUEST_TIMEOUT,
    )

    # Accept 400 / 404 depending on routing config
    assert response.status_code in {400, 404}

    try:
        body = response.json()
        json.dumps(body)
    except ValueError:
        # Plain-text errors are acceptable but discouraged
        assert isinstance(response.text, str)


# ============================
# Standalone Execution
# ============================

if __name__ == "__main__":
    """
    Allows running this test directly without pytest.
    """
    test_gateway_health_endpoint()
    test_gateway_root_endpoint()
    test_gateway_metrics_endpoint_exposed()
    test_gateway_handles_unknown_route_gracefully()
    test_gateway_json_error_contract()
