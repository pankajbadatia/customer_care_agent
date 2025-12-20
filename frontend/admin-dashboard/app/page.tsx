'use client';

import React from 'react';
import MetricCard from '../components/MetricCard';

/**
 * Admin Dashboard – Overview Page
 *
 * Purpose:
 * - Single-glance system health
 * - Entry point for deeper observability pages
 * - Clearly separates ADMIN concerns from USER UI
 */
export default function AdminDashboardPage() {
  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>
          Admin Control Plane
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          System health, AI observability, and operational governance
        </p>
      </header>

      {/* Metrics Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {/* System */}
        <MetricCard
          title="API Availability"
          value="99.98"
          unit="%"
          trend="up"
          trendValue="+0.02%"
          description="Last 24h"
          severity="normal"
        />

        <MetricCard
          title="P95 Latency"
          value="180"
          unit="ms"
          trend="down"
          trendValue="-12ms"
          description="Gateway"
          severity="normal"
        />

        {/* ML */}
        <MetricCard
          title="Model Drift Score"
          value="0.31"
          trend="up"
          trendValue="+0.05"
          description="Resolution-time model"
          severity="warning"
        />

        <MetricCard
          title="Prediction Accuracy"
          value="91.4"
          unit="%"
          trend="down"
          trendValue="-1.2%"
          description="7-day window"
          severity="warning"
        />

        {/* LLM */}
        <MetricCard
          title="LLM Cost Today"
          value="$12.40"
          trend="up"
          trendValue="+$1.10"
          description="Budget: $50/day"
          severity="normal"
        />

        <MetricCard
          title="Avg LLM Latency"
          value="820"
          unit="ms"
          trend="down"
          trendValue="-60ms"
          description="All chains"
          severity="normal"
        />

        {/* Agents */}
        <MetricCard
          title="Agent Decisions / min"
          value="42"
          trend="neutral"
          description="All agents"
          severity="normal"
        />

        <MetricCard
          title="Agent Failures"
          value="3"
          description="Last hour"
          severity="critical"
        />
      </section>

      {/* Guidance */}
      <section
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          What to check next
        </h2>
        <ul style={{ color: '#475569', paddingLeft: '1.25rem' }}>
          <li>Review ML drift details if drift score continues rising</li>
          <li>Inspect agent traces for recent failures</li>
          <li>Validate LLM cost projections vs daily budget</li>
          <li>Confirm alerting thresholds before peak hours</li>
        </ul>
      </section>
    </main>
  );
}
