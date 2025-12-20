'use client';

import React from 'react';
import { InsightSeverity } from '../constants';

interface InsightCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  severity?: InsightSeverity;
}

/**
 * InsightCard
 *
 * User-facing KPI card.
 * - Softer visual language than admin metrics
 * - Emphasizes understanding, not alarms
 */
export default function InsightCard({
  label,
  value,
  unit,
  description,
  severity = 'good',
}: InsightCardProps) {
  const severityColor: Record<InsightSeverity, string> = {
    good: '#16a34a',
    warning: '#f59e0b',
    critical: '#dc2626',
  };

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
      }}
    >
      <div
        style={{
          fontSize: '0.8rem',
          color: '#475569',
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: severityColor[severity],
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.25rem',
        }}
      >
        <span>{value}</span>
        {unit && (
          <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>
            {unit}
          </span>
        )}
      </div>

      {description && (
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
