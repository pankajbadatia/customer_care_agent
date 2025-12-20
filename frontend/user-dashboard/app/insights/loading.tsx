'use client';

import React from 'react';

/**
 * Loading state for Insights page
 *
 * Purpose:
 * - Prevent layout shift
 * - Give immediate feedback
 * - Match real SaaS dashboard UX
 */
export default function Loading() {
  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      {/* Header skeleton */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '160px',
            height: '1.6rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            marginBottom: '0.5rem',
          }}
        />
        <div
          style={{
            width: '280px',
            height: '0.9rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
          }}
        />
      </div>

      {/* KPI cards skeleton */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '0.8rem',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.25rem',
                marginBottom: '0.75rem',
              }}
            />
            <div
              style={{
                width: '40%',
                height: '1.4rem',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.25rem',
                marginBottom: '0.5rem',
              }}
            />
            <div
              style={{
                width: '80%',
                height: '0.7rem',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.25rem',
              }}
            />
          </div>
        ))}
      </section>

      {/* Charts skeleton */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '180px',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '1rem',
            }}
          >
            <div
              style={{
                width: '50%',
                height: '0.9rem',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '100px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.25rem',
              }}
            />
          </div>
        ))}
      </section>

      {/* Table skeleton */}
      <section>
        <div
          style={{
            width: '200px',
            height: '1rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            marginBottom: '0.75rem',
          }}
        />
        <div
          style={{
            height: '140px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
          }}
        />
      </section>
    </main>
  );
}
