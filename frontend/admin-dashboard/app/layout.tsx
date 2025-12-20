'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '../../shared-ui/Theme';
import { isAuthenticated, hasRole } from '@auth/auth';

/**
 * AdminLayout
 *
 * Responsibilities:
 * - Wrap admin UI with ThemeProvider
 * - Enforce admin-only access
 * - Provide consistent admin shell
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Client-side guard (backend must also enforce)
    if (!isAuthenticated() || !hasRole('admin')) {
      // Redirect to login or unauthorized page
      window.location.href = '/login';
    }
  }, []);

  return (
    <ThemeProvider>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            borderRight: '1px solid #e2e8f0',
            padding: '1rem',
            backgroundColor: '#ffffff',
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
            Admin
          </h2>

          <nav>
            <ul style={{ listStyle: 'none', padding: 0, color: '#475569' }}>
              <li style={{ marginBottom: '0.5rem' }}>System Health</li>
              <li style={{ marginBottom: '0.5rem' }}>ML Monitoring</li>
              <li style={{ marginBottom: '0.5rem' }}>LLM Cost</li>
              <li style={{ marginBottom: '0.5rem' }}>Agent Traces</li>
              <li style={{ marginBottom: '0.5rem' }}>Alerts</li>
              <li style={{ marginBottom: '0.5rem' }}>Configs</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <section style={{ flex: 1 }}>
          {children}
        </section>
      </div>
    </ThemeProvider>
  );
}
