#!/usr/bin/env python3
"""
seed_customers.py

Purpose:
- Seed realistic customer master data
- Provide stable customer dimension for tickets, ML, and analytics
- Enable reproducible experiments and demos

Used by:
- Ticket ingestion
- Feature engineering
- ML training pipelines
- Agent reasoning context
"""

import argparse
import csv
import random
import uuid
from pathlib import Path
from typing import List, Dict


# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------

CUSTOMER_SEGMENTS = ["free", "pro", "enterprise"]
REGIONS = ["NA", "EU", "APAC"]
INDUSTRIES = ["saas", "finance", "healthcare", "ecommerce", "education"]


# -------------------------------------------------
# DATA GENERATION
# -------------------------------------------------

def generate_customer(customer_id: int) -> Dict:
    return {
        "customer_id": f"CUST-{customer_id:05d}",
        "external_id": str(uuid.uuid4()),
        "segment": random.choice(CUSTOMER_SEGMENTS),
        "region": random.choice(REGIONS),
        "industry": random.choice(INDUSTRIES),
        "monthly_revenue_usd": round(
            random.uniform(0, 50 if random.random() < 0.5 else 5000), 2
        ),
        "active": random.choice([True, True, True, False]),
    }


def write_customers(path: Path, customers: List[Dict]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=customers[0].keys())
        writer.writeheader()
        writer.writerows(customers)


# -------------------------------------------------
# MAIN
# -------------------------------------------------

def run_seed(
    count: int,
    output_path: Path,
):
    customers = [generate_customer(i + 1) for i in range(count)]
    write_customers(output_path, customers)

    print(f"✅ Seeded {count} customers")
    print(f"📁 Output: {output_path}")


# -------------------------------------------------
# CLI
# -------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Seed customer master data")
    parser.add_argument("--count", type=int, default=1000)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/raw/customers.csv"),
        help="CSV output path",
    )

    args = parser.parse_args()

    run_seed(
        count=args.count,
        output_path=args.output,
    )


if __name__ == "__main__":
    main()
