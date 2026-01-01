'use client';

import type { TicketListQuery } from '../types';
import {
  STATUS_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
} from '../constants';

/**
 * TicketFilters
 *
 * Responsibilities:
 * - Search input
 * - Status filter
 * - Priority filter
 *
 * Emits partial query updates upward
 */
type Props = {
  query: TicketListQuery;
  onChange: (next: Partial<TicketListQuery>) => void;
};

export default function TicketFilters({ query, onChange }: Props) {
  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search tickets…"
        value={query.search}
        onChange={(e) =>
          onChange({ search: e.target.value })
        }
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #cbd5f5',
          minWidth: '220px',
        }}
      />

      {/* Status filter */}
      <select
        value={query.status}
        onChange={(e) =>
          onChange({
            status: e.target.value as TicketListQuery['status'],
          })
        }
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #cbd5f5',
        }}
      >
        {STATUS_FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Priority filter */}
      <select
        value={query.priority}
        onChange={(e) =>
          onChange({
            priority: e.target.value as TicketListQuery['priority'],
          })
        }
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #cbd5f5',
        }}
      >
        {PRIORITY_FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </section>
  );
}
