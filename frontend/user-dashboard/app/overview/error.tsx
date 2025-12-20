'use client';

import React, { useEffect } from 'react';
import Button from '../../../shared-ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Overview Error Boundary
 *
 * - Catches runtime errors for /overview only
 * - Prevents full app crash
 * - Allows retry via reset()
 */
export default function OverviewError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to monitoring later (Sentry / OTEL)
    console.error('Overview page error:', error);
  }, [error]);

  return (
    <main
      style={{
        padding: '1.5rem',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Something went wrong
        </h2>

        <p style={{ color: '#475569', marginBottom: '1rem' }}>
          We couldn’t load your overview right now.
          Please try again.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button onClick={reset}>
            Retry
          </Button>

          <Button
            variant="secondary"
            onClick={() => (window.location.href = '/')}
          >
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}
