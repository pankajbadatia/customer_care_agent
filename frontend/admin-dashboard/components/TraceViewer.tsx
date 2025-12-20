'use client';

import React from 'react';

export interface TraceSpan {
  id: string;
  name: string;
  startTimeMs: number;
  durationMs: number;
  status: 'ok' | 'error';
  attributes?: Record<string, string | number>;
}

interface TraceViewerProps {
  traceId: string;
  spans: TraceSpan[];
}

/**
 * TraceViewer
 * Admin-only component to inspect:
 * - agent reasoning steps
 * - tool calls
 * - latency breakdowns
 */
export default function TraceViewer({ traceId, spans }: TraceViewerProps) {
  if (!spans || spans.length === 0) {
    return (
      <div style={{ padding: '1rem', color: '#64748b' }}>
        No trace data available
      </div>
    );
  }

  const sorted = [...spans].sort(
    (a, b) => a.startTimeMs - b.startTimeMs
  );

  const totalDuration =
    Math.max(...sorted.map(s => s.startTimeMs + s.durationMs)) -
    Math.min(...sorted.map(s => s.startTimeMs));

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <strong>Trace ID:</strong> {traceId}
      </div>

      <div>
        {sorted.map(span => {
          const offsetPct =
            ((span.startTimeMs - sorted[0].startTimeMs) / totalDuration) * 100;
          const widthPct =
            (span.durationMs / totalDuration) * 100;

          return (
            <div key={span.id} style={{ marginBottom: '0.75rem' }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  {span.name}
                  {span.status === 'error' && (
                    <span style={{ color: '#dc2626', marginLeft: '0.5rem' }}>
                      (error)
                    </span>
                  )}
                </span>
                <span>{span.durationMs} ms</span>
              </div>

              <div
                style={{
                  position: 'relative',
                  height: '0.75rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '0.25rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${offsetPct}%`,
                    width: `${widthPct}%`,
                    height: '100%',
                    backgroundColor:
                      span.status === 'ok' ? '#3b82f6' : '#dc2626',
                  }}
                />
              </div>

              {span.attributes && (
                <details style={{ marginTop: '0.25rem' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                    Attributes
                  </summary>
                  <pre
                    style={{
                      fontSize: '0.75rem',
                      backgroundColor: '#f8fafc',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      overflowX: 'auto',
                    }}
                  >
                    {JSON.stringify(span.attributes, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
