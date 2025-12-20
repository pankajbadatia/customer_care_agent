'use client';

import React from 'react';
import { LineChart } from '../../../components/Charts';

interface TrendPoint {
  label: string;
  value: number;
}

interface TrendChartProps {
  title: string;
  data: TrendPoint[];
  unit?: string;
  emptyMessage?: string;
}

/**
 * TrendChart
 *
 * Insight-specific wrapper around LineChart.
 * Adds:
 * - title
 * - units
 * - empty state
 */
export default function TrendChart({
  title,
  data,
  unit,
  emptyMessage = 'No trend data available',
}: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          color: '#64748b',
          fontSize: '0.85rem',
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff',
        padding: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        {title}
        {unit && (
          <span
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginLeft: '0.25rem',
            }}
          >
            ({unit})
          </span>
        )}
      </div>

      <LineChart
        data={data}
      />
    </div>
  );
}
