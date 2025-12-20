'use client';

import { useEffect } from 'react';
import Button from '../../shared-ui/Button';

/**
 * Feedback Error Boundary
 *
 * Catches runtime errors from:
 * - submitFeedback
 * - network failures
 * - unexpected exceptions
 */
export default function FeedbackError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error (later wire to observability / Sentry)
    console.error('Feedback page error:', error);
  }, [error]);

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#991b1b',
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          marginTop: '0.5rem',
          color: '#475569',
        }}
      >
        We couldn’t load or submit your feedback.  
        Please try again.
      </p>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#fee2e2',
          color: '#7f1d1d',
        }}
      >
        <strong>Error:</strong> {error.message}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Button onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
