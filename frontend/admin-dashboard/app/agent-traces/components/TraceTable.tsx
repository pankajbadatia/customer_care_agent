'use client';

import Link from 'next/link';
import { AgentTrace } from '../types';

interface TraceTableProps {
  traces: AgentTrace[];
}

/**
 * TraceTable
 *
 * Responsibilities:
 * - Render agent trace list
 * - Provide navigation to trace details
 * - Display execution status clearly
 */
export default function TraceTable({ traces }: TraceTableProps) {
  if (traces.length === 0) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          color: '#64748b',
        }}
      >
        No agent traces match the selected filters.
      </div>
    );
  }

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
          <th style={thStyle}>Agent</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Duration</th>
          <th style={thStyle}>Started</th>
        </tr>
      </thead>

      <tbody>
        {traces.map((trace) => (
          <tr
            key={trace.traceId}
            style={{ borderBottom: '1px solid #e2e8f0' }}
          >
            <td style={tdStyle}>
              <Link
                href={`/agent-traces/${trace.traceId}`}
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {trace.agentName}
              </Link>
            </td>

            <td style={tdStyle}>
              <StatusBadge status={trace.status} />
            </td>

            <td style={tdStyle}>{trace.durationMs} ms</td>



            <td style={tdStyle}>{new Date(trace.startTime).toISOString().slice(0, 19).replace('T', ' ')}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- helpers ---------- */

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'success'
      ? '#16a34a'
      : status === 'failed'
      ? '#dc2626'
      : '#64748b';

  return (
    <span
      style={{
        padding: '0.25rem 0.5rem',
        borderRadius: 6,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#fff',
        backgroundColor: color,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  padding: '0.75rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#475569',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem',
  fontSize: '0.875rem',
};
