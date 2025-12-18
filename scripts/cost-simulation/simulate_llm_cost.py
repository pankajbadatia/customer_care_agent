#!/usr/bin/env python3
"""
simulate_llm_cost.py

Purpose:
- Simulate LLM usage over time
- Track token consumption, latency, and cost
- Enforce daily budget limits
- Generate realistic operational signals for LLMOps dashboards

This script is used for:
- Cost stress testing
- Budget governance validation
- Observability pipeline validation (Prometheus / Grafana)
"""

import time
import random
import uuid
import argparse
from datetime import datetime, timedelta
from typing import Dict, List


# ---------------------------
# CONFIGURATION
# ---------------------------

DEFAULT_MODEL_PRICING = {
    "gpt-4": {
        "input_per_1k": 0.03,
        "output_per_1k": 0.06,
    },
    "gpt-3.5": {
        "input_per_1k": 0.0015,
        "output_per_1k": 0.002,
    },
}

DEFAULT_DAILY_BUDGET_USD = 50.0


# ---------------------------
# DATA STRUCTURES
# ---------------------------

class LLMRequest:
    def __init__(self, model: str, input_tokens: int, output_tokens: int):
        self.request_id = str(uuid.uuid4())
        self.model = model
        self.input_tokens = input_tokens
        self.output_tokens = output_tokens
        self.timestamp = datetime.utcnow()
        self.latency_ms = random.randint(200, 2500)

    def cost(self) -> float:
        pricing = DEFAULT_MODEL_PRICING[self.model]
        input_cost = (self.input_tokens / 1000) * pricing["input_per_1k"]
        output_cost = (self.output_tokens / 1000) * pricing["output_per_1k"]
        return round(input_cost + output_cost, 6)


# ---------------------------
# COST GOVERNANCE
# ---------------------------

class CostTracker:
    def __init__(self, daily_budget_usd: float):
        self.daily_budget = daily_budget_usd
        self.total_cost = 0.0
        self.requests: List[LLMRequest] = []

    def can_execute(self, cost: float) -> bool:
        return (self.total_cost + cost) <= self.daily_budget

    def record(self, request: LLMRequest):
        self.requests.append(request)
        self.total_cost += request.cost()

    def summary(self) -> Dict:
        return {
            "total_requests": len(self.requests),
            "total_cost_usd": round(self.total_cost, 4),
            "remaining_budget_usd": round(
                max(self.daily_budget - self.total_cost, 0.0), 4
            ),
        }


# ---------------------------
# SIMULATION ENGINE
# ---------------------------

def simulate_request() -> LLMRequest:
    model = random.choice(list(DEFAULT_MODEL_PRICING.keys()))
    input_tokens = random.randint(100, 4000)
    output_tokens = random.randint(50, 1500)
    return LLMRequest(
        model=model,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
    )


def run_simulation(
    duration_seconds: int,
    rps: float,
    daily_budget: float,
):
    tracker = CostTracker(daily_budget_usd=daily_budget)
    start_time = datetime.utcnow()
    end_time = start_time + timedelta(seconds=duration_seconds)

    print("🚀 Starting LLM cost simulation")
    print(f"⏱ Duration: {duration_seconds}s | RPS: {rps}")
    print(f"💰 Daily Budget: ${daily_budget}\n")

    while datetime.utcnow() < end_time:
        request = simulate_request()
        cost = request.cost()

        if not tracker.can_execute(cost):
            print("🛑 Budget exceeded — rejecting request")
            time.sleep(1)
            continue

        tracker.record(request)

        print(
            f"[{request.timestamp.isoformat()}] "
            f"model={request.model} "
            f"in={request.input_tokens} "
            f"out={request.output_tokens} "
            f"latency={request.latency_ms}ms "
            f"cost=${cost}"
        )

        time.sleep(max(1.0 / rps, 0.01))

    print("\n📊 Simulation Summary")
    summary = tracker.summary()
    for k, v in summary.items():
        print(f"{k}: {v}")


# ---------------------------
# CLI
# ---------------------------

def main():
    parser = argparse.ArgumentParser(description="Simulate LLM cost usage")
    parser.add_argument("--duration", type=int, default=60, help="Duration in seconds")
    parser.add_argument("--rps", type=float, default=0.5, help="Requests per second")
    parser.add_argument(
        "--budget",
        type=float,
        default=DEFAULT_DAILY_BUDGET_USD,
        help="Daily budget in USD",
    )

    args = parser.parse_args()

    run_simulation(
        duration_seconds=args.duration,
        rps=args.rps,
        daily_budget=args.budget,
    )


if __name__ == "__main__":
    main()
