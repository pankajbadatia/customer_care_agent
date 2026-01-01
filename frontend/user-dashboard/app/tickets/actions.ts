import type { Ticket, TicketListQuery } from './types';
import { DEFAULT_TICKET_QUERY, MOCK_TICKETS } from './constants';

/**
 * fetchUserTickets (Server-safe)
 *
 * Today: mock-backed (deterministic)
 * Tomorrow: API-backed (api-gateway) without UI changes
 *
 * IMPORTANT:
 * - No 'use client'
 * - No window/localStorage access
 * - No withAuthHeaders() here (client-only)
 */
export async function fetchUserTickets(
  query: Partial<TicketListQuery> = {}
): Promise<Ticket[]> {
  // When backend is ready, replace this with:
  // return fetchFromApi(merged);

  const merged: TicketListQuery = { ...DEFAULT_TICKET_QUERY, ...query };

  return filterMockTickets(MOCK_TICKETS, merged);
}

/* ----------------------------- */
/* Mock filtering helpers        */
/* ----------------------------- */

function filterMockTickets(tickets: Ticket[], q: TicketListQuery): Ticket[] {
  let rows = [...tickets];

  // Search (id/title/description)
  const search = q.search?.trim().toLowerCase();
  if (search) {
    rows = rows.filter((t) => {
      const hay = `${t.id} ${t.title} ${t.description ?? ''}`.toLowerCase();
      return hay.includes(search);
    });
  }

  // Status filter
  if (q.status !== 'all') {
    rows = rows.filter((t) => t.status === q.status);
  }

  // Priority filter
  if (q.priority !== 'all') {
    rows = rows.filter((t) => t.priority === q.priority);
  }

  // Sorting
  rows.sort((a, b) => {
    const aVal = a[q.sortBy];
    const bVal = b[q.sortBy];

    // Dates
    if (q.sortBy === 'createdAt' || q.sortBy === 'updatedAt') {
      return q.sortDir === 'asc'
        ? new Date(String(aVal)).getTime() - new Date(String(bVal)).getTime()
        : new Date(String(bVal)).getTime() - new Date(String(aVal)).getTime();
    }

    // Numbers
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return q.sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Strings fallback
    return q.sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  // Pagination
  const start = (q.page - 1) * q.pageSize;
  const end = start + q.pageSize;

  return rows.slice(start, end);
}
