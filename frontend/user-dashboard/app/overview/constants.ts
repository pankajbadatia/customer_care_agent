/**
 * SLA thresholds (percentage)
 * Used to color indicators and warnings
 */
export const SLA_THRESHOLDS = {
  GOOD: 95,
  WARNING: 90,
};

/**
 * Ticket status labels
 */
export const TICKET_STATUS_LABELS: Record<string, string> = {
  Open: 'Open',
  'In Progress': 'In Progress',
  Resolved: 'Resolved',
};

/**
 * Priority ordering (for sorting / styling)
 */
export const PRIORITY_ORDER: Record<string, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

/**
 * Default copy text
 */
export const OVERVIEW_COPY = {
  title: 'Overview',
  subtitle: 'Quick snapshot of your support activity and SLAs',
  emptyTickets: 'No recent tickets',
};
