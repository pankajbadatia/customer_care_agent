import type {
  OverviewData,
  TicketRow,
  SummaryStats,
  SeriesPoint
} from './types';

/**
 * fetchOverviewData
 */
export async function fetchOverviewData(): Promise<OverviewData> {
  return mockOverviewData();
}

/* ============================
   MOCK DATA
   ============================ */

function mockOverviewData(): OverviewData {
  const summary: SummaryStats = {
    openTickets: 5,
    inProgressTickets: 3,
    resolvedTickets: 18,
    slaCompliancePct: 94,
    avgResponseTimeMins: 42,
  };

  const ticketStatus: SeriesPoint[] = [
    { label: 'Open', value: summary.openTickets },
    { label: 'In Progress', value: summary.inProgressTickets },
    { label: 'Resolved', value: summary.resolvedTickets },
  ];

  const slaTrend: SeriesPoint[] = [
    { label: 'Mon', value: 92 },
    { label: 'Tue', value: 94 },
    { label: 'Wed', value: 90 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 96 },
  ];

  const recentTickets: TicketRow[] = [
    { id: 'TCK-101', status: 'Open', priority: 'High', slaHrs: 4 },
    { id: 'TCK-099', status: 'In Progress', priority: 'Medium', slaHrs: 8 },
    { id: 'TCK-094', status: 'Resolved', priority: 'Low', slaHrs: 0 },
  ];

  return {
    summary,
    ticketStatus,
    slaTrend,
    recentTickets,
  };
}
