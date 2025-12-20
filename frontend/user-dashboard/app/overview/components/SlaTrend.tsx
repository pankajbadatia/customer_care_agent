'use client';

import React from 'react';
import type { SeriesPoint } from '../types';
import { LineChart } from '../../../components/Charts';
import { SLA_THRESHOLDS } from '../constants';

interface SlaTrendProps {
  data: SeriesPoint[];
}

/**
 * SlaTrend
 *
 * Visualizes SLA compliance trend over time.
 * - Page-scoped component (Overview only)
 * - Uses shared LineChart primitive
 * - Business-aware (thresholds ready for annotations later)
 */
export default function SlaTrend({ data }: SlaTrendProps) {
  const latest = data[data.length - 1]?.value;

  let statusText = '—';
  let statusColor = '#64748b';

  if (typeof latest === 'number') {
    if (latest >= SLA_THRESHOLDS.GOOD) {
      statusText = 'Healthy';
      statusColor = '#16a34a';
    } else if (latest >= SLA_THRESHOLDS.WARNING) {
      statusText = 'At Risk';
      statusColor = '#f59e0b';
    } else {
      statusText = 'Critical';
      statusColor = '#dc2626';
    }
  }

  return (
    <div>
      <div
        style={{
          marginBottom: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          SLA Compliance Trend
        </span>

        <span
          style={{
            fontSize: '0.8rem',
            color: statusColor,
            fontWeight: 500,
          }}
        >
          {statusText}
        </span>
      </div>

      <LineChart data={data} />
    </div>
  );
}
