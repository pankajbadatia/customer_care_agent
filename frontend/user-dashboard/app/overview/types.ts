/**
 * SummaryStats
 *
 * High-level metrics shown at the top of the Overview page
 */
export interface SummaryStats {
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  slaCompliancePct: number;
  avgResponseTimeMins: number;
}

/**
 * SeriesPoint
 *
 * Used for charts (bar / line)
 */
export interface SeriesPoint {
  label: string;
  value: number;
}

/**
 * TicketRow
 *
 * Row displayed in the recent tickets table
 */
export interface TicketRow {
  id: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  slaHrs: number;
}

/**
 * OverviewData
 *
 * Aggregated payload returned by actions.ts
 */
export interface OverviewData {
  summary: SummaryStats;
  ticketStatus: SeriesPoint[];
  slaTrend: SeriesPoint[];
  recentTickets: TicketRow[];
}
