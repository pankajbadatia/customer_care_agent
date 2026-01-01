'use client';

import Button from '../../../../shared-ui/Button';
// ✅ Use alias (matches next.config.js)
// import Button from '@shared-ui/Button';

export default function OverviewActions() {
  return (
    <section style={{ display: 'flex', gap: '0.75rem' }}>
      <Button onClick={() => (window.location.href = '/tickets')}>
        View All Tickets
      </Button>

      <Button
        variant="secondary"
        onClick={() => (window.location.href = '/chatbot')}
      >
        Ask Support Bot
      </Button>
    </section>
  );
}
