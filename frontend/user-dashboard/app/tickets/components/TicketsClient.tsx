'use client';

import { useMemo, useState } from 'react';

import TicketFilters from './TicketFilters';
import TicketTable from './TicketTable';

import type { Ticket, TicketListQuery } from '../types';
import { DEFAULT_TICKET_QUERY } from '../constants';

/**
 * TicketsClient
 *
 * Client-side controller for:
 * - filters
 * - sorting
 * - pagination
 * - table rendering
 *
 * IMPORTANT:
 * - Receives initial data from Server Component
 * - Owns only UI state
 */
type Props = {
  initialTickets: Ticket[];
};

export default function TicketsClient({ initialTickets }: Props) {
  const [query, setQuery] = useState<TicketListQuery>(
    DEFAULT_TICKET_QUERY
  );

  /**
   * For now, filtering is done client-side
   * Later, query will be sent to backend
   */
  const visibleTickets = useMemo(() => {
    let rows = [...initialTickets];

    // Search
    if (query.search.trim()) {
      const s = query.search.toLowerCase();
      rows = rows.filter(
        (t) =>
          t.id.toLowerCase().includes(s) ||
          t.title.toLowerCase().includes(s) ||
          (t.description ?? '').toLowerCase().includes(s)
      );
    }

    // Status
    if (query.status !== 'all') {
      rows = rows.filter((t) => t.status === query.status);
    }

    // Priority
    if (query.priority !== 'all') {
      rows = rows.filter((t) => t.priority === query.priority);
    }

    // Sorting
    rows.sort((a, b) => {
      const aVal = a[query.sortBy];
      const bVal = b[query.sortBy];

      if (query.sortBy === 'createdAt' || query.sortBy === 'updatedAt') {
        return query.sortDir === 'asc'
          ? new Date(aVal).getTime() -
              new Date(bVal).getTime()
          : new Date(bVal).getTime() -
              new Date(aVal).getTime();
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return query.sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return rows;
  }, [initialTickets, query]);

  return (
    <section>
      {/* Filters */}
      <TicketFilters
        query={query}
        onChange={(next) =>
          setQuery((prev) => ({ ...prev, ...next, page: 1 }))
        }
      />

      {/* Tickets table */}
      <TicketTable tickets={visibleTickets} />
    </section>
  );
}
