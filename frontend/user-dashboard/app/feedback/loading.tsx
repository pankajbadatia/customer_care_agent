/**
 * Feedback Loading State
 *
 * This file MUST:
 * - default export a React component
 * - return JSX
 * - contain no hooks
 */

export default function FeedbackLoading() {
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
          }}
        >
          Feedback
        </h1>
        <p style={{ color: '#64748b' }}>
          Loading feedback…
        </p>
      </header>

      <section
        style={{
          height: '6rem',
          backgroundColor: '#e5e7eb',
          borderRadius: '0.5rem',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />

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
