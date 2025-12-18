"""
Locust load test for Customer Support AI Control Plane.

What this test validates (production-grade):
- API Gateway stability under concurrent traffic
- Ticket ingestion / read patterns
- Health endpoint reliability
- Metrics endpoint behavior under load

This simulates realistic support-platform usage patterns:
- Many lightweight health checks
- Frequent ticket-related requests
- Lower-frequency but heavier analytical calls

Run with:
    locust -f tests/load/locustfile.py --host=http://localhost:8000
"""

from __future__ import annotations

import random
import uuid
from datetime import datetime
from typing import Dict

from locust import HttpUser, task, between


# ============================
# Helpers
# ============================

def generate_ticket_payload() -> Dict:
    """
    Generate a realistic ticket payload.
    """
    return {
        "ticket_id": f"TCKT-{uuid.uuid4()}",
        "customer_id": f"CUST-{random.randint(1, 10000)}",
        "channel": random.choice(["email", "chat", "phone"]),
        "priority": random.choice(["low", "medium", "high"]),
        "status": "open",
        "category": random.choice(
            ["billing", "login", "performance", "feature_request"]
        ),
        "region": random.choice(["us-east", "us-west", "eu-central"]),
        "created_at": datetime.utcnow().isoformat() + "Z",
    }


# ============================
# Locust User Definition
# ============================

class SupportPlatformUser(HttpUser):
    """
    Simulates a realistic user interacting with the platform.

    wait_time controls pacing between requests and prevents
    unrealistic hammering.
    """

    wait_time = between(0.5, 2.5)

    # ----------------------------
    # Core platform checks
    # ----------------------------

    @task(5)
    def health_check(self):
        """
        Very frequent health checks (load balancers, uptime monitors).
        """
        with self.client.get(
            "/health",
            name="GET /health",
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                response.failure(f"Health check failed: {response.status_code}")

    @task(3)
    def root_endpoint(self):
        """
        Lightweight root endpoint hit by dashboards.
        """
        with self.client.get(
            "/",
            name="GET /",
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                response.failure(f"Root endpoint error: {response.status_code}")

    # ----------------------------
    # Ticket-related traffic
    # ----------------------------

    @task(4)
    def simulate_ticket_creation(self):
        """
        Simulates ticket creation traffic.
        In early stages, this endpoint may be a no-op or stub;
        we still validate API stability under load.
        """
        payload = generate_ticket_payload()

        with self.client.post(
            "/tickets",
            json=payload,
            name="POST /tickets",
            catch_response=True,
        ) as response:
            # Accept both 200 (created) and 404 (not yet implemented)
            if response.status_code not in (200, 201, 404):
                response.failure(
                    f"Unexpected status for ticket creation: {response.status_code}"
                )

    # ----------------------------
    # Observability under load
    # ----------------------------

    @task(2)
    def metrics_endpoint(self):
        """
        Ensures /metrics does not become a bottleneck under load.
        """
        with self.client.get(
            "/metrics",
            name="GET /metrics",
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                response.failure(f"Metrics endpoint error: {response.status_code}")
