import TicketsClient from './components/TicketsClient';
import { fetchUserTickets } from './actions';
import type { Ticket } from './types';
import { UserShell } from "../user-shell";

/**
 * Tickets Page (Server Component)
 *
 * Responsibilities:
 * - Fetch tickets server-side
 * - Handle layout & structure
 * - Delegate interactivity to client components
 */
export default async function TicketsPage() {
  const tickets: Ticket[] = await fetchUserTickets();

  return (
    <UserShell>
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
          Tickets
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          View and manage your support tickets
        </p>
      </header>

      {/* Client-side ticket UI */}
      <TicketsClient initialTickets={tickets} />
    </main>
    </UserShell>
  );
}
