#!/usr/bin/env python3
"""
seed_tickets.py

Purpose:
- Seed realistic customer support ticket data
- Maintain referential integrity with customers
- Provide strong signals for ML, LLM, and agent workflows
- Enable reproducible demos and experiments

Used by:
- Ticket ingestion service
- Feature engineering
- SLA analytics
- Anomaly detection
- Agent reasoning & escalation
"""

import argparse
import csv
import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List

import pandas as pd


# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------

CHANNELS = ["email", "chat", "phone"]
PRIORITIES = ["low", "medium", "high", "urgent"]
ISSUE_TYPES = ["billing", "login", "performance", "outage", "feature-request"]
REGIONS = ["NA", "EU", "APAC"]

SLA_HOURS = {
    "low": 72,
    "medium": 48,
    "high": 24,
    "urgent": 8,
}


# -------------------------------------------------
# DATA LOADING
# -------------------------------------------------

def load_customers(customers_path: Path) -> List[str]:
    if not customers_path.exists():
        raise FileNotFoundError(
            f"Customers file not found: {customers_path}. "
            "Run seed_customers.py first."
        )
    df = pd.read_csv(customers_path)
    return df["customer_id"].tolist()


# -------------------------------------------------
# TICKET GENERATION
# -------------------------------------------------

def random_created_time(days_back: int) -> datetime:
    now = datetime.utcnow()
    return now - timedelta(
        days=random.randint(0, days_back),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )


def generate_ticket(ticket_id: int, customer_id: str) -> Dict:
    priority = random.choices(
        PRIORITIES,
        weights=[0.4, 0.3, 0.2, 0.1],
    )[0]

    created_at = random_created_time(days_back=90)
    sla_hours = SLA_HOURS[priority]

    resolved = random.random() > 0.15
    resolution_time = (
        timedelta(hours=random.uniform(1, sla_hours * 1.5))
        if resolved
        else None
    )

    resolved_at = (
        created_at + resolution_time if resolution_time else None
    )

    return {
        "ticket_id": f"TICK-{ticket_id:07d}",
        "external_id": str(uuid.uuid4()),
        "customer_id": customer_id,
        "created_at": created_at.isoformat(),
        "resolved_at": resolved_at.isoformat() if resolved_at else "",
        "channel": random.choice(CHANNELS),
        "priority": priority,
        "issue_type": random.choice(ISSUE_TYPES),
        "region": random.choice(REGIONS),
        "sla_hours": sla_hours,
        "breached_sla": bool(
            resolved_at
            and (resolved_at - created_at).total_seconds()
            > sla_hours * 3600
        ),
        "status": "resolved" if resolved else "open",
    }


def write_tickets(path: Path, tickets: List[Dict]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=tickets[0].keys())
        writer.writeheader()
        writer.writerows(tickets)


# -------------------------------------------------
# MAIN
# -------------------------------------------------

def run_seed(
    ticket_count: int,
    customers_path: Path,
    output_path: Path,
):
    customers = load_customers(customers_path)
    tickets = [
        generate_ticket(i + 1,s, random.choice(customers))
        for i in range(ticket_count)
    ]

    write_tickets(output_path, tickets)

    print(f"✅ Seeded {ticket_count} tickets")
    print(f"👥 Customers used: {len(customers)}")
    print(f"📁 Output: {output_path}")


# -------------------------------------------------
# CLI
# -------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Seed support tickets")
    parser.add_argument("--count", type=int, default=5000)
    parser.add_argument(
        "--customers",
        type=Path,
        default=Path("data/raw/customers.csv"),
        help="Path to customers CSV",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/raw/tickets.csv"),
        help="CSV output path",
    )

    args = parser.parse_args()

    run_seed(
        ticket_count=args.count,
        customers_path=args.customers,
        output_path=args.output,
    )


if __name__ == "__main__":
    main()
