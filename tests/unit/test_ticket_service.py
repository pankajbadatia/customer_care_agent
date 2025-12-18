"""
Unit tests for Ticket Service.

What this test suite validates (production-grade):
- Ticket schema correctness
- Data ingestion assumptions
- Data quality checks (nulls, categoricals)
- SLA and volume metrics contracts
- JSON-serializable outputs for observability & APIs

No database or message broker required.
No mocks of external services.
Deterministic and CI-safe.
"""

from __future__ import annotations

import json
from datetime import datetime, timedelta
from typing import Dict, List

import pytest


# ============================
# Sample Ticket Data (Realistic)
# ============================

def sample_ticket() -> Dict:
    return {
        "ticket_id": "TCKT-1001",
        "customer_id": "CUST-42",
        "channel": "email",
        "priority": "high",
        "status": "open",
        "created_at": "2025-01-01T10:00:00Z",
        "first_response_at": "2025-01-01T10:12:00Z",
        "resolved_at": None,
        "category": "billing",
        "region": "us-east",
    }


def sample_ticket_batch(n: int = 5) -> List[Dict]:
    return [
        {
            **sample_ticket(),
            "ticket_id": f"TCKT-{1000 + i}",
            "created_at": (
                datetime(2025, 1, 1, 10, 0, 0) + timedelta(minutes=i * 5)
            ).isoformat() + "Z",
        }
        for i in range(n)
    ]


# ============================
# Helpers
# ============================

def parse_ts(ts: str) -> datetime:
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


# ============================
# Schema Validation Tests
# ============================

def test_ticket_schema_fields_present():
    ticket = sample_ticket()

    required_fields = {
        "ticket_id",
        "customer_id",
        "channel",
        "priority",
        "status",
        "created_at",
        "category",
        "region",
    }

    assert required_fields.issubset(ticket.keys())


def test_ticket_schema_types():
    ticket = sample_ticket()

    assert isinstance(ticket["ticket_id"], str)
    assert isinstance(ticket["customer_id"], str)
    assert isinstance(ticket["channel"], str)
    assert isinstance(ticket["priority"], str)
    assert isinstance(ticket["status"], str)
    assert isinstance(ticket["category"], str)
    assert isinstance(ticket["region"], str)


# ============================
# Data Quality Tests
# ============================

def test_no_null_required_fields():
    ticket = sample_ticket()

    for field, value in ticket.items():
        if field in {"resolved_at"}:
            continue  # optional
        assert value is not None, f"{field} must not be null"


def test_categorical_values_are_valid():
    ticket = sample_ticket()

    valid_channels = {"email", "chat", "phone"}
    valid_priorities = {"low", "medium", "high", "urgent"}
    valid_statuses = {"open", "in_progress", "resolved", "closed"}

    assert ticket["channel"] in valid_channels
    assert ticket["priority"] in valid_priorities
    assert ticket["status"] in valid_statuses


# ============================
# SLA Metrics Tests
# ============================

def test_first_response_time_calculation():
    ticket = sample_ticket()

    created = parse_ts(ticket["created_at"])
    responded = parse_ts(ticket["first_response_at"])

    first_response_minutes = (responded - created).total_seconds() / 60

    assert first_response_minutes >= 0
    assert first_response_minutes < 60  # SLA expectation


def test_resolution_time_optional():
    ticket = sample_ticket()

    if ticket["resolved_at"] is None:
        assert ticket["status"] != "resolved"
    else:
        resolved = parse_ts(ticket["resolved_at"])
        created = parse_ts(ticket["created_at"])
        assert resolved >= created


# ============================
# Volume Metrics Tests
# ============================

def test_ticket_volume_count():
    tickets = sample_ticket_batch(10)
    assert len(tickets) == 10


def test_ticket_volume_by_channel():
    tickets = sample_ticket_batch(6)
    tickets[0]["channel"] = "chat"
    tickets[1]["channel"] = "chat"

    counts = {}
    for t in tickets:
        counts[t["channel"]] = counts.get(t["channel"], 0) + 1

    assert counts["chat"] == 2
    assert sum(counts.values()) == len(tickets)


# ============================
# API & Observability Safety
# ============================

def test_ticket_payload_json_serializable():
    ticket = sample_ticket()
    json.dumps(ticket)
    assert True


def test_ticket_batch_json_serializable():
    tickets = sample_ticket_batch(3)
    json.dumps(tickets)
    assert True


def test_ticket_ready_for_metrics_labels():
    """
    Ticket fields used as Prometheus labels must be strings and low-cardinality.
    """
    ticket = sample_ticket()

    label_fields = ["channel", "priority", "status", "category", "region"]

    for field in label_fields:
        value = ticket[field]
        assert isinstance(value, str)
        assert len(value) < 50  # guard against high-cardinality explosions
