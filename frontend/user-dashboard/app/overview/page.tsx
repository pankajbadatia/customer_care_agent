import SummaryCards from './components/SummaryCards';
import SlaTrend from './components/SlaTrend';
import TicketStatusChart from './components/TicketStatusChart';
import OverviewActions from './components/OverviewActions';

import Table from '../../components/Tables';
import { fetchOverviewData } from './actions';
import type { TicketRow } from './types';

/**
 * Overview Page (Server Component)
 *
 * Responsibilities:
 * - Fetch overview data (server-side)
 * - Compose page layout
 * - Delegate interactivity to client components
 */
export default async function OverviewPage() {
  const data = await fetchOverviewData();

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
          Overview
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Quick snapshot of your support activity and SLAs
        </p>
      </header>

      {/* Summary cards */}
      <section style={{ marginBottom: '1.5rem' }}>
        <SummaryCards stats={data.summary} />
      </section>

      {/* Charts */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <TicketStatusChart data={data.ticketStatus} />
        <SlaTrend data={data.slaTrend} />
      </section>

      {/* Recent tickets */}
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

        <Table<TicketRow>
          columns={[
            { key: 'id', header: 'Ticket ID' },
            { key: 'status', header: 'Status' },
            { key: 'priority', header: 'Priority' },
            { key: 'slaHrs', header: 'SLA (hrs)' },
          ]}
          data={data.recentTickets}
          emptyMessage="No recent tickets"
        />
      </section>

      {/* Client-side actions (buttons) */}
      <OverviewActions />
    </main>
  );
}
