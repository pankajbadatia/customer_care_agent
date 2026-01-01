'use client';

import { BarChart, LineChart } from '../../../components/Charts';
import Table from '../../../components/Tables';
import Button from '../../../../shared-ui/Button';
import {
  InsightMetric,
  SlaTrendPoint,
  ResolutionInsight,
} from '../types';

type Props = {
  data: {
    metrics: InsightMetric[];
    slaTrend: SlaTrendPoint[];
    resolutionInsights: ResolutionInsight[];
  };
};

export default function InsightsClient({ data }: Props) {
  const { metrics, slaTrend, resolutionInsights } = data;

  return (
    <>
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
            <div style={{ fontSize: '0.85rem', color: '#475569' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>
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
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
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
    </>
  );
}
