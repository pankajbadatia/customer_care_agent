#!/usr/bin/env python3
"""
simulate_data_drift.py

Purpose:
- Simulate data drift in customer support ticket data
- Generate controlled shifts in feature distributions
- Produce artifacts usable by drift detectors and MLOps pipelines
- Validate monitoring, alerts, and retraining triggers

This script supports:
- Data drift testing
- Model monitoring validation
- MLOps governance workflows
"""

import argparse
import json
import random
from datetime import datetime
from pathlib import Path
from typing import Dict, List

import pandas as pd
import numpy as np


# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------

DEFAULT_FEATURE_DISTRIBUTIONS = {
    "ticket_priority": ["low", "medium", "high", "urgent"],
    "channel": ["email", "chat", "phone"],
    "region": ["NA", "EU", "APAC"],
}

BASE_RESOLUTION_TIME = {
    "low": (2, 6),
    "medium": (4, 12),
    "high": (8, 24),
    "urgent": (16, 48),
}


# -------------------------------------------------
# DRIFT GENERATORS
# -------------------------------------------------

def generate_baseline_data(rows: int) -> pd.DataFrame:
    data = []
    for _ in range(rows):
        priority = random.choice(DEFAULT_FEATURE_DISTRIBUTIONS["ticket_priority"])
        resolution_time = random.uniform(*BASE_RESOLUTION_TIME[priority])

        data.append(
            {
                "ticket_priority": priority,
                "channel": random.choice(DEFAULT_FEATURE_DISTRIBUTIONS["channel"]),
                "region": random.choice(DEFAULT_FEATURE_DISTRIBUTIONS["region"]),
                "resolution_time_hours": round(resolution_time, 2),
            }
        )

    return pd.DataFrame(data)


def apply_drift(df: pd.DataFrame, drift_strength: float) -> pd.DataFrame:
    drifted = df.copy()

    # Increase proportion of urgent tickets
    urgent_mask = np.random.rand(len(drifted)) < drift_strength
    drifted.loc[urgent_mask, "ticket_priority"] = "urgent"

    # Inflate resolution times
    drifted["resolution_time_hours"] *= (1 + drift_strength * 1.5)

    # Channel shift towards chat
    chat_mask = np.random.rand(len(drifted)) < drift_strength
    drifted.loc[chat_mask, "channel"] = "chat"

    return drifted


# -------------------------------------------------
# DRIFT METRICS
# -------------------------------------------------

def calculate_distribution(df: pd.DataFrame) -> Dict:
    return {
        "priority_distribution": df["ticket_priority"].value_counts(normalize=True).to_dict(),
        "channel_distribution": df["channel"].value_counts(normalize=True).to_dict(),
        "avg_resolution_time": round(df["resolution_time_hours"].mean(), 2),
    }


# -------------------------------------------------
# MAIN SIMULATION
# -------------------------------------------------

def run_simulation(
    rows: int,
    drift_strength: float,
    output_dir: Path,
):
    output_dir.mkdir(parents=True, exist_ok=True)

    baseline_df = generate_baseline_data(rows)
    drifted_df = apply_drift(baseline_df, drift_strength)

    baseline_metrics = calculate_distribution(baseline_df)
    drifted_metrics = calculate_distribution(drifted_df)

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")

    baseline_path = output_dir / f"baseline_{timestamp}.csv"
    drifted_path = output_dir / f"drifted_{timestamp}.csv"
    metrics_path = output_dir / f"drift_report_{timestamp}.json"

    baseline_df.to_csv(baseline_path, index=False)
    drifted_df.to_csv(drifted_path, index=False)

    with open(metrics_path, "w") as f:
        json.dump(
            {
                "timestamp": timestamp,
                "rows": rows,
                "drift_strength": drift_strength,
                "baseline_metrics": baseline_metrics,
                "drifted_metrics": drifted_metrics,
            },
            f,
            indent=2,
        )

    print("📊 Data Drift Simulation Complete")
    print(f"Baseline data: {baseline_path}")
    print(f"Drifted data: {drifted_path}")
    print(f"Drift report: {metrics_path}")


# -------------------------------------------------
# CLI
# -------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Simulate data drift")
    parser.add_argument("--rows", type=int, default=1000, help="Number of records")
    parser.add_argument(
        "--drift-strength",
        type=float,
        default=0.3,
        help="Drift intensity (0.0 - 1.0)",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("data/processed/drift"),
        help="Output directory",
    )

    args = parser.parse_args()

    run_simulation(
        rows=args.rows,
        drift_strength=args.drift_strength,
        output_dir=args.output_dir,
    )


if __name__ == "__main__":
    main()
