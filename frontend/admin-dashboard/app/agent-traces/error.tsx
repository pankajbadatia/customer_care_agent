'use client';

import { useEffect } from 'react';

/**
 * Agent Traces – Error Boundary
 *
 * Catches:
 * - backend failures
 * - permission issues
 * - unexpected runtime errors
 */
export default function AgentTracesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for now (can later send to observability)
    console.error('Agent Traces error:', error);
  }, [error]);

  return (
    <main style={{ padding: '1.5rem' }}>
      <div
        style={{
          maxWidth: '600px',
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
          Unable to load agent traces
        </h2>

        <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
          Something went wrong while fetching agent execution data.
          This could be a temporary issue or a backend outage.
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
            href="/"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#ffffff',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              textDecoration: 'none',
            }}
          >
            Go back
          </a>
        </div>
      </div>
    </main>
  );
}
