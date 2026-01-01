'use client';

import { useEffect } from 'react';

export default function ChatbotError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // You can later hook this into observability/logging
    console.error('Chatbot error:', error);
  }, [error]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.75rem',
        color: '#334155',
      }}
    >
      <h2 style={{ fontSize: 16, fontWeight: 600 }}>
        Something went wrong in the chatbot
      </h2>

      <p style={{ fontSize: 14, color: '#64748b' }}>
        Please try again.
      </p>

      <button
        onClick={reset}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: 4,
          border: '1px solid #cbd5e1',
          background: '#ffffff',
          cursor: 'pointer',
        }}
      >
        Retry
      </button>
    </div>
  );
}
