export default function OverviewLoading() {
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
            width: '180px',
            height: '24px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            marginBottom: '0.5rem',
          }}
        />
        <div
          style={{
            width: '320px',
            height: '14px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Summary cards skeleton */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '90px',
              backgroundColor: '#e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
        ))}
      </section>

      {/* Charts skeleton */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '180px',
              backgroundColor: '#e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
        ))}
      </section>

      {/* Table skeleton */}
      <section>
        <div
          style={{
            width: '200px',
            height: '18px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            marginBottom: '0.75rem',
          }}
        />
        <div
          style={{
            height: '200px',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.5rem',
          }}
        />
      </section>
    </main>
  );
}
