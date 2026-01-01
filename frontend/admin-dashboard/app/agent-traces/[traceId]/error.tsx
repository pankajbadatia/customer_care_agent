'use client';

import { useEffect } from 'react';

interface TraceDetailsErrorProps {
  error: Error;
  reset: () => void;
}

/**
 * Agent Trace Details – Error Boundary
 *
 * Scope:
 * - Only applies to /agent-traces/[traceId]
 * - Does NOT affect the list page
 */
export default function TraceDetailsError({
  error,
  reset,
}: TraceDetailsErrorProps) {
  useEffect(() => {
    // Safe place to hook observability later
    console.error('Trace details error:', error);
  }, [error]);

  return (
    <main style={{ padding: '1.5rem' }}>
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #fecaca',
          backgroundColor: '#fff1f2',
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#b91c1c',
            marginBottom: '0.5rem',
          }}
        >
          Unable to load trace
        </h2>

        <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
          This agent trace could not be loaded. It may no longer exist,
          or there may be a temporary backend issue.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#b91c1c',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>

          <a
            href="/agent-traces"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#ffffff',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              textDecoration: 'none',
            }}
          >
            Back to traces
          </a>
        </div>
      </div>
    </main>
  );
}
