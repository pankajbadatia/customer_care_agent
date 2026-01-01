/**
 * Ticket domain types
 *
 * Used by:
 * - actions.ts (server-side fetching)
 * - TicketsClient.tsx (client state & UI)
 * - TicketTable.tsx (rendering)
 */

/* ============================
   Enums / Unions
   ============================ */

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_on_customer'
  | 'resolved'
  | 'closed';

export type TicketPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

/* ============================
   Core Ticket Model
   ============================ */

export type Ticket = {
  id: string;
  title: string;
  description?: string;

  status: TicketStatus;
  priority: TicketPriority;

  category?: string;

  customerId: string;
  assignedAgent?: string;

  slaHours?: number;
  slaBreached?: boolean;

  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

/* ============================
   Query / Filtering Types
   ============================ */

export type TicketSortField =
  | 'createdAt'
  | 'updatedAt'
  | 'priority'
  | 'status';

export type SortDirection = 'asc' | 'desc';

export type TicketListQuery = {
  search: string;

  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';

  sortBy: TicketSortField;
  sortDir: SortDirection;

  page: number;
  pageSize: number;
};

/* ============================
   API / UI Contracts
   ============================ */

export type TicketListResponse = {
  tickets: Ticket[];
  total: number;
  page: number;
  pageSize: number;
};

/* ============================
   Table Helper Types
   ============================ */

export type TicketTableRow = {
  id: string;
  title: string;
  status: string;
  priority: string;
  sla: string;
  updatedAt: string;
};
