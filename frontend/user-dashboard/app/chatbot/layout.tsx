'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '../../../shared-ui/Theme';
import { isAuthenticated } from '@auth/auth';

/**
 * ChatbotLayout
 *
 * Purpose:
 * - Full-height, distraction-free chat experience
 * - Isolated layout for /chatbot route
 * - Enforces authenticated user access
 *
 * Why separate layout?
 * - Chat needs max vertical space
 * - Future: conversation sidebar, history, tools panel
 */
export default function ChatbotLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <ThemeProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#f8fafc',
        }}
      >
        {/* Chat Header */}
        <header
          style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <strong>Support Chatbot</strong>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
            }}
          >
            AI-assisted support
          </span>
        </header>

        {/* Chat Content */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            padding: '0.75rem',
          }}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
