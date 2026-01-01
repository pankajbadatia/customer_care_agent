import InsightsClient from './components/InsightsClient';
import { fetchUserInsights } from './actions';
import { UserShell } from "../user-shell";

/**
 * Insights Page (Server Component)
 */
export default async function InsightsPage() {
  const data = await fetchUserInsights();

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
          Insights
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Understand performance, SLAs, and resolution patterns
        </p>
      </header>

      <InsightsClient data={data} />
    </main>
    </UserShell>
  );
}
