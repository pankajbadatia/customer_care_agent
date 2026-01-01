'use client';

import { useEffect } from 'react';

/**
 * Tickets Error Boundary
 *
 * This component is rendered when:
 * - server-side data fetching fails
 * - rendering throws an error
 *
 * IMPORTANT:
 * - Must be a Client Component
 * - Must accept `error` and `reset`
 */
export default function TicketsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or observability later
    console.error('Tickets page error:', error);
  }, [error]);

  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <header style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#dc2626',
          }}
        >
          Something went wrong
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          We couldn’t load your tickets right now.
        </p>
      </header>

      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ color: '#991b1b', fontSize: '0.9rem' }}>
          {error.message || 'Unexpected error occurred.'}
        </p>

        {error.digest && (
          <p
            style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: '#7f1d1d',
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
      </section>

      <section style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #cbd5f5',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>

        <button
          onClick={() => (window.location.href = '/overview')}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Back to Overview
        </button>
      </section>
    </main>
  );
}
