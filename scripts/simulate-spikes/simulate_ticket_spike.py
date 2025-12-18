#!/usr/bin/env python3
"""
simulate_ticket_spike.py

Purpose:
- Simulate sudden spikes in customer support ticket volume
- Emulate incidents, outages, or traffic surges
- Generate realistic ticket events over time
- Stress-test ingestion pipelines, agents, SLAs, and observability

This script is used for:
- Load & stress testing
- Incident simulation
- SLA breach validation
- Agent escalation workflows
"""

import argparse
import csv
import random
import time
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict


# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------

CHANNELS = ["email", "chat", "phone"]
PRIORITIES = ["low", "medium", "high", "urgent"]
REGIONS = ["NA", "EU", "APAC"]
ISSUE_TYPES = ["billing", "login", "performance", "outage", "feature-request"]


# -------------------------------------------------
# TICKET GENERATION
# -------------------------------------------------

def generate_ticket(spike: bool = False) -> Dict:
    priority = random.choice(PRIORITIES)
    if spike:
        priority = random.choices(
            PRIORITIES,
            weights=[0.1, 0.2, 0.3, 0.4],  # more urgent tickets during spikes
        )[0]

    return {
        "ticket_id": str(uuid.uuid4()),
        "created_at": datetime.utcnow().isoformat(),
        "channel": random.choice(CHANNELS),
        "priority": priority,
        "region": random.choice(REGIONS),
        "issue_type": random.choice(ISSUE_TYPES),
        "customer_id": f"CUST-{random.randint(1000,9999)}",
    }


def write_tickets(path: Path, tickets: List[Dict]):
    write_header = not path.exists()
    with open(path, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=tickets[0].keys())
        if write_header:
            writer.writeheader()
        writer.writerows(tickets)


# -------------------------------------------------
# SIMULATION ENGINE
# -------------------------------------------------

def run_simulation(
    baseline_rps: float,
    spike_rps: float,
    spike_duration: int,
    total_duration: int,
    output_path: Path,
):
    start = time.time()
    spike_start = start + (total_duration - spike_duration) / 2
    spike_end = spike_start + spike_duration

    output_path.parent.mkdir(parents=True, exist_ok=True)

    print("🚦 Starting ticket spike simulation")
    print(f"Baseline RPS: {baseline_rps}")
    print(f"Spike RPS: {spike_rps}")
    print(f"Spike duration: {spike_duration}s")
    print(f"Total duration: {total_duration}s\n")

    while time.time() - start < total_duration:
        now = time.time()
        in_spike = spike_start <= now <= spike_end
        rps = spike_rps if in_spike else baseline_rps

        batch_size = max(1, int(rps))
        tickets = [generate_ticket(spike=in_spike) for _ in range(batch_size)]
        write_tickets(output_path, tickets)

        if in_spike:
            print(f"🔥 Spike: wrote {len(tickets)} tickets")
        else:
            print(f"📨 Baseline: wrote {len(tickets)} tickets")

        time.sleep(max(1.0 / rps, 0.1))

    print("\n✅ Ticket spike simulation complete")
    print(f"Tickets written to: {output_path}")


# -------------------------------------------------
# CLI
# -------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Simulate ticket volume spikes")
    parser.add_argument("--baseline-rps", type=float, default=0.5)
    parser.add_argument("--spike-rps", type=float, default=5.0)
    parser.add_argument("--spike-duration", type=int, default=30)
    parser.add_argument("--total-duration", type=int, default=120)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/raw/tickets.csv"),
        help="CSV output path",
    )

    args = parser.parse_args()

    run_simulation(
        baseline_rps=args.baseline_rps,
        spike_rps=args.spike_rps,
        spike_duration=args.spike_duration,
        total_duration=args.total_duration,
        output_path=args.output,
    )


if __name__ == "__main__":
    main()
