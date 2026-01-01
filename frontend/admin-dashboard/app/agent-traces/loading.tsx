/**
 * Agent Traces – Loading State
 *
 * Shown while the server is fetching trace data.
 * Keep this lightweight and layout-stable.
 */
export default function LoadingAgentTraces() {
  return (
    <main style={{ padding: '1.5rem' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
          Agent Traces
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Loading agent execution data…
        </p>
      </header>

      {/* Skeleton table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              height: '1.25rem',
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
              marginBottom: '0.75rem',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
