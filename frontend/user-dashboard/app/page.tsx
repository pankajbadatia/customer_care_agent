'use client';

import React from 'react';
import { BarChart, LineChart } from '../components/Charts';
import Table from '../components/Tables';
import Button from '../../shared-ui/Button';

/**
 * User Dashboard – Home
 *
 * Focus:
 * - Ticket visibility
 * - SLA & response trends
 * - Entry point to chatbot
 */
export default function UserDashboardPage() {
  const ticketSummary = [
    { label: 'Open', value: 5 },
    { label: 'In Progress', value: 3 },
    { label: 'Resolved', value: 18 },
  ];

  const slaTrend = [
    { label: 'Mon', value: 92 },
    { label: 'Tue', value: 94 },
    { label: 'Wed', value: 90 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 96 },
  ];

  const tickets = [
    { id: 'TCK-101', status: 'Open', priority: 'High', slaHrs: 4 },
    { id: 'TCK-099', status: 'In Progress', priority: 'Medium', slaHrs: 8 },
    { id: 'TCK-094', status: 'Resolved', priority: 'Low', slaHrs: 0 },
  ];

  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600 }}>
          Your Support Dashboard
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Track your tickets, SLAs, and get instant help
        </p>
      </header>

      {/* Top Row */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <BarChart
          title="Tickets by Status"
          data={ticketSummary}
        />

        <LineChart
          title="SLA Compliance (%)"
          data={slaTrend}
        />
      </section>

      {/* Tickets Table */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Recent Tickets
        </h2>

        <Table
          columns={[
            { key: 'id', header: 'Ticket ID' },
            { key: 'status', header: 'Status' },
            { key: 'priority', header: 'Priority' },
            { key: 'slaHrs', header: 'SLA (hrs)' },
          ]}
          data={tickets}
          emptyMessage="No tickets found"
        />
      </section>

      {/* Actions */}
      <section
        style={{
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <Button onClick={() => (window.location.href = '/tickets')}>
          View All Tickets
        </Button>

        <Button
          variant="secondary"
          onClick={() => (window.location.href = '/chatbot')}
        >
          Open Support Chatbot
        </Button>
      </section>
    </main>
  );
}
