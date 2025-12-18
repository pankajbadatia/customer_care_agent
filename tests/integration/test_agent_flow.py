"""
Integration tests for Agent Flow.

This test validates:
- API Gateway → Agent Service integration
- Agent orchestration (monitoring → reasoning → action)
- Tool invocation contracts
- Structured, explainable responses suitable for downstream systems

This is NOT a unit test and NOT a full E2E test.
It validates service-to-service integration using real HTTP calls.
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

AGENT_FLOW_ENDPOINT = f"{API_GATEWAY_URL}/internal/agents/investigate"
HEALTH_ENDPOINT = f"{API_GATEWAY_URL}/health"

REQUEST_TIMEOUT = 10


# ============================
# Helpers
# ============================

def wait_for_service(url: str, timeout: int = 30) -> None:
    """
    Wait until a service responds with HTTP 200.
    """
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


def build_investigation_payload() -> Dict:
    """
    Build a realistic investigation payload that would
    trigger multi-agent reasoning.
    """
    return {
        "event_type": "anomaly_detected",
        "timestamp": "2025-01-01T11:00:00Z",
        "severity": "high",
        "signal": {
            "type": "ticket_volume_spike",
            "current_value": 980,
            "baseline": 410,
            "ratio": 2.39,
        },
        "context": {
            "recent_deployments": [
                {
                    "service": "auth-service",
                    "version": "v3.1.0",
                    "deployed_at": "2025-01-01T10:20:00Z",
                }
            ],
            "affected_regions": ["us-east", "eu-central"],
            "affected_channels": ["chat", "email"],
        },
    }


# ============================
# Tests
# ============================

@pytest.mark.integration
def test_agent_investigation_flow():
    """
    Validates that an investigation request:
    - Is accepted by API Gateway
    - Triggers agent orchestration
    - Returns structured, explainable output
    """

    # 1️⃣ Ensure platform is up
    wait_for_service(HEALTH_ENDPOINT)

    payload = build_investigation_payload()

    # 2️⃣ Call agent investigation endpoint
    response = requests.post(
        AGENT_FLOW_ENDPOINT,
        json=payload,
        timeout=REQUEST_TIMEOUT,
    )

    # 3️⃣ HTTP-level validation
    assert response.status_code == 200, response.text

    body = response.json()

    # 4️⃣ Structural contract validation
    required_fields = {
        "investigation_id",
        "status",
        "summary",
        "confidence",
        "actions",
        "trace",
    }

    assert required_fields.issubset(body.keys())

    # 5️⃣ Semantic validation
    assert isinstance(body["investigation_id"], str)
    assert body["status"] in {"completed", "in_progress"}
    assert isinstance(body["summary"], str)
    assert isinstance(body["confidence"], float)
    assert 0.0 <= body["confidence"] <= 1.0

    assert isinstance(body["actions"], list)
    assert len(body["actions"]) > 0

    # 6️⃣ Tool / Agent trace validation
    trace = body["trace"]
    assert isinstance(trace, list)
    assert all("agent" in step for step in trace)
    assert all("decision" in step for step in trace)

    # 7️⃣ Explainability guardrails
    summary_lower = body["summary"].lower()
    assert "ticket" in summary_lower or "anomaly" in summary_lower
    assert "deploy" in summary_lower or "change" in summary_lower

    # 8️⃣ JSON safety (logs, audits, dashboards)
    json.dumps(body)

    # 9️⃣ Deterministic output for CI logs
    print("\nAgent Investigation Response:")
    print(json.dumps(body, indent=2))


# ============================
# Standalone Execution
# ============================

if __name__ == "__main__":
    """
    Allows running this test directly without pytest.
    """
    test_agent_investigation_flow()
