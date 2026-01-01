'use client';

import type { Ticket } from '../types';
import {
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY_LABELS,
} from '../constants';

/**
 * TicketTable
 *
 * Responsibilities:
 * - Render ticket rows
 * - Handle empty state
 * - Display deterministic, hydration-safe values
 *
 * IMPORTANT:
 * - No locale-dependent rendering during SSR
 * - Dates are formatted using a fixed ISO format
 */
type Props = {
  tickets: Ticket[];
};

/**
 * Format date in a deterministic, SSR-safe way
 * (no locale, no timezone ambiguity)
 */
function formatDate(value: string | Date): string {
  const d = typeof value === 'string' ? new Date(value) : value;

  // YYYY-MM-DD HH:mm:ss (UTC)
  return `${d.getUTCFullYear()}-${String(
    d.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(d.getUTCDate()).padStart(
    2,
    '0'
  )} ${String(d.getUTCHours()).padStart(2, '0')}:${String(
    d.getUTCMinutes()
  ).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(
    2,
    '0'
  )}`;
}

export default function TicketTable({ tickets }: Props) {
  if (tickets.length === 0) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          color: '#64748b',
        }}
      >
        No tickets match the current filters.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f1f5f9',
              textAlign: 'left',
            }}
          >
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>SLA</th>
            <th style={thStyle}>Last Updated (UTC)</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} style={{ borderTop: '1px solid #e5e7eb' }}>
              <td style={tdStyle}>{t.id}</td>
              <td style={tdStyle}>{t.title}</td>
              <td style={tdStyle}>
                {TICKET_STATUS_LABELS[t.status]}
              </td>
              <td style={tdStyle}>
                {TICKET_PRIORITY_LABELS[t.priority]}
              </td>
              <td style={tdStyle}>
                {t.slaHours
                  ? `${t.slaHours}h${
                      t.slaBreached ? ' ⚠️' : ''
                    }`
                  : '—'}
              </td>
              <td style={tdStyle}>
                {formatDate(t.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------- */
/* Inline styles                 */
/* ----------------------------- */

const thStyle: React.CSSProperties = {
  padding: '0.75rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#475569',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem',
  fontSize: '0.85rem',
  color: '#0f172a',
};
