'use client';

import React from 'react';

/**
 * Loading state for /chatbot
 *
 * Shown while:
 * - session/auth is resolving
 * - conversation context loads
 * - initial backend handshake happens
 */
export default function ChatbotLoading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Skeleton messages */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            alignSelf: i % 2 === 0 ? 'flex-end' : 'flex-start',
            width: '60%',
            height: '2.25rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.5rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      ))}

      {/* Loading indicator */}
      <div
        style={{
          marginTop: 'auto',
          fontSize: '0.8rem',
          color: '#64748b',
        }}
      >
        Initializing assistant…
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
}
