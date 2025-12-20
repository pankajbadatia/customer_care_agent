'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, LineChart } from '../../components/Charts';
import Table from '../../components/Tables';
import Button from '../../../shared-ui/Button';
import { fetchUserInsights } from './actions';
import {
  InsightMetric,
  SlaTrendPoint,
  ResolutionInsight,
} from './types';

/**
 * User Insights Page
 *
 * Purpose:
 * - Show value delivered by AI + analytics
 * - Translate raw data into business insights
 * - Keep UI simple and actionable
 */
export default function InsightsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<InsightMetric[]>([]);
  const [slaTrend, setSlaTrend] = useState<SlaTrendPoint[]>([]);
  const [resolutionInsights, setResolutionInsights] =
    useState<ResolutionInsight[]>([]);

  useEffect(() => {
    async function loadInsights() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUserInsights();

        setMetrics(data.metrics);
        setSlaTrend(data.slaTrend);
        setResolutionInsights(data.resolutionInsights);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: '1.5rem' }}>
        <p style={{ color: '#64748b' }}>Loading insights…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: '1.5rem' }}>
        <p style={{ color: '#dc2626' }}>
          Failed to load insights: {error}
        </p>
      </main>
    );
  }

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
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600 }}>
          Insights
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Understand performance, SLAs, and resolution patterns
        </p>
      </header>

      {/* KPI Metrics */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.key}
            style={{
              padding: '1rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                color: '#475569',
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
              }}
            >
              {m.value}
              {m.unit && (
                <span style={{ fontSize: '0.8rem', marginLeft: '0.25rem' }}>
                  {m.unit}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {m.description}
            </div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <LineChart
          title="SLA Compliance (%)"
          data={slaTrend.map((p) => ({
            label: p.date,
            value: p.value,
          }))}
        />

        <BarChart
          title="Resolution Time Buckets (hrs)"
          data={resolutionInsights.map((r) => ({
            label: r.bucket,
            value: r.count,
          }))}
        />
      </section>

      {/* Resolution Table */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Resolution Insights
        </h2>

        <Table
          columns={[
            { key: 'bucket', header: 'Resolution Time' },
            { key: 'count', header: 'Tickets' },
            { key: 'percentage', header: 'Percentage' },
          ]}
          data={resolutionInsights.map((r) => ({
            ...r,
            percentage: `${r.percentage}%`,
          }))}
        />
      </section>

      {/* Actions */}
      <section>
        <Button onClick={() => (window.location.href = '/tickets')}>
          View Tickets Behind These Insights
        </Button>
      </section>
    </main>
  );
}
