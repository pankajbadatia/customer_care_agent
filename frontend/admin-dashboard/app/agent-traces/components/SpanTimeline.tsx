'use client';

import { AgentSpan } from '../types';

interface SpanTimelineProps {
  spans: AgentSpan[];
}

/**
 * SpanTimeline
 *
 * Responsibilities:
 * - Visualize agent execution as a timeline
 * - Render spans proportionally by duration
 * - Be resilient to empty / partial traces
 */
export default function SpanTimeline({ spans }: SpanTimelineProps) {
  if (!spans || spans.length === 0) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '0.375rem',
          backgroundColor: '#f8fafc',
          color: '#64748b',
          fontSize: '0.875rem',
        }}
      >
        No execution spans recorded for this trace.
      </div>
    );
  }

  // Normalize spans by start time
  const ordered = [...spans].sort(
    (a, b) => a.startTimeMs - b.startTimeMs
  );

  const traceStart = ordered[0].startTimeMs;
  const traceEnd = Math.max(
    ...ordered.map((s) => s.startTimeMs + Math.max(s.durationMs, 0))
  );

  const totalDuration = Math.max(traceEnd - traceStart, 1); // avoid divide-by-zero

  return (
    <div style={{ marginTop: '1.25rem' }}>
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        Execution Timeline
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {ordered.map((span) => {
          const offsetPct =
            ((span.startTimeMs - traceStart) / totalDuration) * 100;

          const widthPct =
            (Math.max(span.durationMs, 0) / totalDuration) * 100;

          const color =
            span.status === 'success'
              ? '#16a34a'
              : span.status === 'failed'
              ? '#dc2626'
              : '#64748b';

          return (
            <div key={span.spanId}>
              {/* Label */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span>{span.name}</span>
                <span>{span.durationMs} ms</span>
              </div>

              {/* Timeline bar */}
              <div
                style={{
                  position: 'relative',
                  height: '0.75rem',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${offsetPct}%`,
                    width: `${Math.max(widthPct, 0.5)}%`,
                    height: '100%',
                    backgroundColor: color,
                  }}
                />
              </div>

              {/* Attributes */}
              {span.attributes && (
                <details style={{ marginTop: '0.25rem' }}>
                  <summary
                    style={{
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      color: '#475569',
                    }}
                  >
                    Attributes
                  </summary>
                  <pre
                    style={{
                      marginTop: '0.25rem',
                      padding: '0.5rem',
                      fontSize: '0.7rem',
                      backgroundColor: '#f8fafc',
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
