'use client';

import React, { useEffect } from 'react';
import Button from '../../../shared-ui/Button';

interface ChatbotErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for /chatbot route
 *
 * Catches:
 * - runtime errors
 * - failed async operations
 * - rendering crashes
 *
 * Prevents whole app from crashing.
 */
export default function ChatbotError({ error, reset }: ChatbotErrorProps) {
  useEffect(() => {
    // In real app, send this to observability backend
    console.error('Chatbot error:', error);
  }, [error]);

  return (
    <div
      style={{
        padding: '1.5rem',
        maxWidth: '480px',
        margin: '0 auto',
        textAlign: 'center',
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

      <p
        style={{
          color: '#475569',
          marginBottom: '1rem',
        }}
      >
        The assistant encountered an issue while processing your request.
        You can retry or return later.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
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

      {process.env.NODE_ENV === 'development' && (
        <details
          style={{
            marginTop: '1rem',
            textAlign: 'left',
            fontSize: '0.75rem',
            color: '#475569',
          }}
        >
          <summary style={{ cursor: 'pointer' }}>Error details</summary>
          <pre
            style={{
              backgroundColor: '#f8fafc',
              padding: '0.75rem',
              borderRadius: '0.25rem',
              overflowX: 'auto',
            }}
          >
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
