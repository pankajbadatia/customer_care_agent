'use client';

import React from 'react';

export interface SeriesPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  title?: string;
  data: SeriesPoint[];
  maxValue?: number;
}

/**
 * Simple BarChart
 * - Used for ticket volume, SLA breaches, trends
 * - No external charting library (easy to replace later)
 */
export function BarChart({ title, data, maxValue }: BarChartProps) {
  const computedMax =
    maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h3>
      )}

      <div>
        {data.map((d) => {
          const widthPct = (d.value / computedMax) * 100;

          return (
            <div key={d.label} style={{ marginBottom: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span>{d.label}</span>
                <span>{d.value}</span>
              </div>

              <div
                style={{
                  height: '0.5rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '0.25rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${widthPct}%`,
                    height: '100%',
                    backgroundColor: '#2563eb',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LineChartProps {
  title?: string;
  data: SeriesPoint[];
}

/**
 * Minimal LineChart (SVG-based)
 * - Good for SLA trends, response times
 */
export function LineChart({ title, data }: LineChartProps) {
  if (data.length === 0) return null;

  const width = 300;
  const height = 120;
  const padding = 20;

  const maxY = Math.max(...data.map((d) => d.value), 1);
  const minY = Math.min(...data.map((d) => d.value), 0);

  const points = data.map((d, i) => {
    const x =
      padding +
      (i / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((d.value - minY) / (maxY - minY || 1)) *
        (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h3>
      )}

      <svg width={width} height={height}>
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
