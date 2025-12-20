'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '../../shared-ui/Theme';
import { isAuthenticated } from '@auth/auth';

/**
 * UserLayout
 *
 * Responsibilities:
 * - Wrap user UI with ThemeProvider
 * - Enforce authenticated user access
 * - Provide consistent user shell
 */
export default function UserLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect unauthenticated users
      window.location.href = '/login';
    }
  }, []);

  return (
    <ThemeProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
          }}
        >
          <strong>Customer Support</strong>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
