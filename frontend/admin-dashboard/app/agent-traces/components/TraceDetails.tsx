'use client';

import { AgentTraceDetails } from '../types';
import SpanTimeline from './SpanTimeline';

interface TraceDetailsProps {
  trace: AgentTraceDetails;
}

/**
 * TraceDetails
 *
 * Responsibilities:
 * - Display trace metadata (agent, status, duration, cost)
 * - Delegate span visualization to SpanTimeline
 * - Stay presentation-only
 */
export default function TraceDetails({ trace }: TraceDetailsProps) {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        padding: '1.25rem',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          {trace.agentName}
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            marginTop: '0.5rem',
            color: '#475569',
            fontSize: '0.875rem',
            flexWrap: 'wrap',
          }}
        >
          <span>
            <strong>Status:</strong>{' '}
            <StatusBadge status={trace.status} />
          </span>

          <span>
            <strong>Duration:</strong> {trace.durationMs} ms
          </span>

          <span>
            <strong>Started:</strong>{' '}
            {new Date(trace.startTime).toLocaleString()}
          </span>

          {trace.model && (
            <span>
              <strong>Model:</strong> {trace.model}
            </span>
          )}

          {typeof trace.costUsd === 'number' && (
            <span>
              <strong>Cost:</strong> ${trace.costUsd.toFixed(4)}
            </span>
          )}
        </div>
      </header>

      {/* Timeline */}
      <SpanTimeline spans={trace.spans} />
    </section>
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
        padding: '0.15rem 0.45rem',
        borderRadius: 6,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#ffffff',
        backgroundColor: color,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}
