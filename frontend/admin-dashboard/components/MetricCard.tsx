'use client';

import React from 'react';

type TrendDirection = 'up' | 'down' | 'neutral';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  trend?: TrendDirection;
  trendValue?: string;
  severity?: 'normal' | 'warning' | 'critical';
}

/**
 * MetricCard
 * - Used across Admin Dashboard
 * - Highlights system / ML / LLM / agent metrics
 */
export default function MetricCard({
  title,
  value,
  unit,
  description,
  trend = 'neutral',
  trendValue,
  severity = 'normal',
}: MetricCardProps) {
  const severityColor = {
    normal: '#2563eb',
    warning: '#f59e0b',
    critical: '#dc2626',
  }[severity];

  const trendSymbol = {
    up: '▲',
    down: '▼',
    neutral: '■',
  }[trend];

  const trendColor = {
    up: '#16a34a',
    down: '#dc2626',
    neutral: '#64748b',
  }[trend];

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#475569',
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: severityColor,
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.25rem',
        }}
      >
        <span>{value}</span>
        {unit && (
          <span style={{ fontSize: '0.85rem', fontWeight: 400 }}>
            {unit}
          </span>
        )}
      </div>

      {(trendValue || description) && (
        <div
          style={{
            fontSize: '0.8rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {trendValue && (
            <span style={{ color: trendColor }}>
              {trendSymbol} {trendValue}
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  );
}
