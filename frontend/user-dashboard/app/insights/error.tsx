'use client';

import React, { useEffect } from 'react';
import Button from '../../../shared-ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for Insights page
 *
 * Purpose:
 * - Graceful failure handling
 * - User-safe messaging
 * - Recovery without page refresh
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to console for now; later send to observability pipeline
    console.error('Insights page error:', error);
  }, [error]);

  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h1
          style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Unable to load insights
        </h1>

        <p style={{ color: '#475569', marginBottom: '1rem' }}>
          Something went wrong while loading your analytics.
          This is usually temporary.
        </p>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '1rem',
          }}
        >
          Error reference: {error.digest ?? 'N/A'}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button onClick={reset}>
            Retry
          </Button>

          <Button
            variant="secondary"
            onClick={() => (window.location.href = '/')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
