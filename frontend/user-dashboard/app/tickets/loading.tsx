/**
 * Tickets Loading State
 *
 * Displayed automatically by Next.js while:
 * - server-side data is loading
 * - streaming is in progress
 *
 * IMPORTANT:
 * - No hooks
 * - No client logic
 * - Pure UI only
 */

export default function TicketsLoading() {
  return (
    <main
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <header style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#0f172a',
          }}
        >
          Tickets
        </h1>
        <p style={{ color: '#64748b' }}>
          Loading your tickets…
        </p>
      </header>

      {/* Skeleton rows */}
      <section
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '3rem',
              backgroundColor: '#e5e7eb',
              borderRadius: '0.375rem',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </section>

      {/* Inline animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}
