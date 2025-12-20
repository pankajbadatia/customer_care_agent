'use client';

import React from 'react';
import type { SeriesPoint } from '../types';
import { BarChart } from '../../../components/Charts';
import { TICKET_STATUS_LABELS } from '../constants';

interface TicketStatusChartProps {
  data: SeriesPoint[];
}

/**
 * TicketStatusChart
 *
 * Shows ticket distribution by status:
 * - Open
 * - In Progress
 * - Resolved
 */
export default function TicketStatusChart({ data }: TicketStatusChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: TICKET_STATUS_LABELS[d.label] ?? d.label,
  }));

  return (
    <div>
      <div
        style={{
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        Ticket Status Distribution
      </div>

      <BarChart data={formatted} />
    </div>
  );
}
