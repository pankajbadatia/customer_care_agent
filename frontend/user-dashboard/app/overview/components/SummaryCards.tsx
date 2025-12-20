'use client';

import React from 'react';
import type { SummaryStats } from '../types';
import { SLA_THRESHOLDS } from '../constants';

interface SummaryCardsProps {
  stats: SummaryStats;
}

/**
 * SummaryCards
 *
 * Displays top-level support KPIs:
 * - Open / In-progress / Resolved tickets
 * - SLA compliance
 * - Avg response time
 */
export default function SummaryCards({ stats }: SummaryCardsProps) {
  const slaSeverity =
    stats.slaCompliancePct >= SLA_THRESHOLDS.GOOD
      ? 'good'
      : stats.slaCompliancePct >= SLA_THRESHOLDS.WARNING
      ? 'warning'
      : 'critical';

  const slaColor = {
    good: '#16a34a',
    warning: '#f59e0b',
    critical: '#dc2626',
  }[slaSeverity];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}
    >
      <Card label="Open Tickets" value={stats.openTickets} />
      <Card label="In Progress" value={stats.inProgressTickets} />
      <Card label="Resolved" value={stats.resolvedTickets} />

      <Card
        label="SLA Compliance"
        value={`${stats.slaCompliancePct}%`}
        valueColor={slaColor}
      />

      <Card
        label="Avg Response Time"
        value={`${stats.avgResponseTimeMins} min`}
      />
    </div>
  );
}

/* ============================
   Internal Card Component
   ============================ */

interface CardProps {
  label: string;
  value: string | number;
  valueColor?: string;
}

function Card({ label, value, valueColor }: CardProps) {
  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          fontSize: '0.8rem',
          color: '#475569',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: '1.4rem',
          fontWeight: 600,
          color: valueColor ?? '#0f172a',
        }}
      >
        {value}
      </div>
    </div>
  );
}
