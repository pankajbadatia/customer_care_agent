"""
End-to-end test for Root Cause Analysis agent flow.

This test validates that:
1. A simulated ticket anomaly can be submitted
2. The agent-service performs root cause analysis
3. A structured, explainable response is returned
4. The response is suitable for downstream action/escalation

This is a black-box test against running services.
"""

import os
import time
import json
import requests
import pytest

# ============================
# Configuration
# ============================

API_GATEWAY_URL = os.getenv("API_GATEWAY_URL", "http://localhost:8000")
AGENT_ENDPOINT = f"{API_GATEWAY_URL}/internal/agents/root-cause"

TIMEOUT_SECONDS = 10


# ============================
# Helpers
# ============================

def wait_for_service(url: str, timeout: int = 30) -> None:
    """Wait until a service responds with HTTP 200."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(url, timeout=2)
            if r.status_code == 200:
                return
        except requests.RequestException:
            pass
        time.sleep(1)
    raise RuntimeError(f"Service at {url} did not become ready")


# ============================
# Test Payload
# ============================

ANOMALY_PAYLOAD = {
    "event_type": "ticket_volume_anomaly",
    "timestamp": "2025-01-01T10:00:00Z",
    "metadata": {
        "channel": "email",
        "region": "us-east",
        "severity": "high"
    },
    "metrics": {
        "ticket_volume": 1240,
        "baseline_volume": 430,
        "deviation_ratio": 2.88
    },
    "context": {
        "recent_deployments": [
            {
                "service": "billing-service",
                "version": "v2.3.1",
                "deployed_at": "2025-01-01T09:30:00Z"
            }
        ],
        "customer_segments_affected": ["enterprise", "mid-market"]
    }
}


# ============================
# Tests
# ============================

@pytest.mark.e2e
def test_root_cause_agent_flow():
    """
    End-to-end validation of root cause agent reasoning.
    """

    # 1️⃣ Ensure API Gateway is up
    wait_for_service(f"{API_GATEWAY_URL}/health")

    # 2️⃣ Invoke root cause agent
    response = requests.post(
        AGENT_ENDPOINT,
        json=ANOMALY_PAYLOAD,
        timeout=TIMEOUT_SECONDS,
    )

    # 3️⃣ Basic HTTP validation
    assert response.status_code == 200, response.text

    body = response.json()

    # 4️⃣ Schema-level validation
    assert "root_cause" in body
    assert "confidence" in body
    assert "recommended_actions" in body
    assert "explanation" in body

    # 5️⃣ Business-level validation
    assert isinstance(body["root_cause"], str)
    assert isinstance(body["confidence"], float)
    assert 0.0 <= body["confidence"] <= 1.0

    assert isinstance(body["recommended_actions"], list)
    assert len(body["recommended_actions"]) > 0

    # 6️⃣ Explainability check (commercially critical)
    explanation = body["explanation"]
    assert "ticket" in explanation.lower()
    assert "deployment" in explanation.lower() or "change" in explanation.lower()

    # 7️⃣ Deterministic logging for CI
    print("\nRoot Cause Agent Response:")
    print(json.dumps(body, indent=2))


# ============================
# Local Debug Run Support
# ============================

if __name__ == "__main__":
    """
    Allows running this test standalone without pytest.
    """
    test_root_cause_agent_flow()
