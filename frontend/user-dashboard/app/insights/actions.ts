import {
  InsightMetric,
  SlaTrendPoint,
  ResolutionInsight,
  UserInsightsResponse,
} from './types';

/**
 * Server-side insights fetch
 *
 * Today: mock-backed
 * Tomorrow: real service calls
 */
export async function fetchUserInsights(): Promise<UserInsightsResponse> {
  return {
    metrics: mockMetrics(),
    slaTrend: mockSlaTrend(),
    resolutionInsights: mockResolutionInsights(),
  };
}

/* ----------------------------- */
/* MOCK DATA                     */
/* ----------------------------- */

function mockMetrics(): InsightMetric[] {
  return [
    {
      key: 'sla',
      label: 'SLA Compliance',
      value: 94,
      unit: '%',
      description: 'Tickets resolved within SLA',
    },
    {
      key: 'avg_resolution',
      label: 'Avg Resolution Time',
      value: 6.2,
      unit: 'hrs',
    },
    {
      key: 'volume',
      label: 'Weekly Ticket Volume',
      value: 312,
    },
  ];
}

function mockSlaTrend(): SlaTrendPoint[] {
  return [
    { date: 'Mon', value: 92 },
    { date: 'Tue', value: 94 },
    { date: 'Wed', value: 90 },
    { date: 'Thu', value: 95 },
    { date: 'Fri', value: 96 },
  ];
}

function mockResolutionInsights(): ResolutionInsight[] {
  return [
    { bucket: '<2h', count: 120, percentage: 38 },
    { bucket: '2–6h', count: 142, percentage: 46 },
    { bucket: '>6h', count: 50, percentage: 16 },
  ];
}
