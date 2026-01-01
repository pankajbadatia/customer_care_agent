/**
 * Agent Trace Details – Loading State
 *
 * Displayed while:
 * - a single trace is being fetched
 * - spans and metadata are loading
 */
export default function LoadingTraceDetails() {
  return (
    <main style={{ padding: '1.5rem' }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div
          style={{
            height: '1.5rem',
            width: '260px',
            backgroundColor: '#f1f5f9',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '0.9rem',
            width: '420px',
            backgroundColor: '#f1f5f9',
            borderRadius: '0.375rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Timeline skeleton */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          padding: '1.25rem',
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <div
              style={{
                height: '0.8rem',
                width: '180px',
                backgroundColor: '#f1f5f9',
                borderRadius: '0.25rem',
                marginBottom: '0.4rem',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
            <div
              style={{
                height: '0.75rem',
                width: '100%',
                backgroundColor: '#f1f5f9',
                borderRadius: '0.375rem',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </div>
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
