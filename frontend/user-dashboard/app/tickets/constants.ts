import type {
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketListQuery,
} from './types';

/* ============================
   UI Labels / Mappings
   ============================ */

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  waiting_on_customer: 'Waiting on Customer',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/* ============================
   Filter Options
   ============================ */

export const STATUS_FILTER_OPTIONS: Array<{
  value: TicketStatus | 'all';
  label: string;
}> = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'waiting_on_customer', label: 'Waiting on Customer' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export const PRIORITY_FILTER_OPTIONS: Array<{
  value: TicketPriority | 'all';
  label: string;
}> = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

/* ============================
   Default Query State
   ============================ */

export const DEFAULT_TICKET_QUERY: TicketListQuery = {
  search: '',
  status: 'all',
  priority: 'all',
  sortBy: 'updatedAt',
  sortDir: 'desc',
  page: 1,
  pageSize: 10,
};

/* ============================
   Mock Ticket Data
   ============================ */

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TCK-101',
    title: 'Unable to login to dashboard',
    description: 'User reports invalid credentials error',
    status: 'open',
    priority: 'high',
    category: 'Authentication',
    customerId: 'CUST-001',
    assignedAgent: 'agent-1',
    slaHours: 4,
    slaBreached: false,
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T09:10:00Z',
  },
  {
    id: 'TCK-099',
    title: 'Billing invoice mismatch',
    description: 'Invoice amount does not match usage',
    status: 'in_progress',
    priority: 'medium',
    category: 'Billing',
    customerId: 'CUST-014',
    assignedAgent: 'agent-2',
    slaHours: 8,
    slaBreached: false,
    createdAt: '2024-01-14T11:00:00Z',
    updatedAt: '2024-01-15T07:45:00Z',
  },
  {
    id: 'TCK-094',
    title: 'App crashes on upload',
    description: 'Crash observed when uploading large files',
    status: 'waiting_on_customer',
    priority: 'urgent',
    category: 'Stability',
    customerId: 'CUST-009',
    assignedAgent: 'agent-3',
    slaHours: 2,
    slaBreached: true,
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-14T18:30:00Z',
  },
  {
    id: 'TCK-087',
    title: 'Feature request: dark mode',
    status: 'resolved',
    priority: 'low',
    category: 'Feature Request',
    customerId: 'CUST-021',
    assignedAgent: 'agent-4',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
  },
  {
    id: 'TCK-082',
    title: 'Email notifications delayed',
    description: 'Emails arrive several hours late',
    status: 'closed',
    priority: 'medium',
    category: 'Notifications',
    customerId: 'CUST-004',
    assignedAgent: 'agent-1',
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-09T12:00:00Z',
  },
];
