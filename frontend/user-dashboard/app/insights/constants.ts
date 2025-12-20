/**
 * Business constants for User Insights
 *
 * Keeping these separate allows:
 * - easy tuning without UI changes
 * - consistent interpretation across pages
 * - future server-side reuse
 */

/* ----------------------------- */
/* SLA thresholds (%)            */
/* ----------------------------- */

export const SLA_THRESHOLDS = {
  GOOD: 95,
  WARNING: 90,
};

/* ----------------------------- */
/* Resolution time buckets (hrs) */
/* ----------------------------- */

export const RESOLUTION_BUCKETS = [
  { label: '< 1h', maxHours: 1 },
  { label: '1–4h', maxHours: 4 },
  { label: '4–12h', maxHours: 12 },
  { label: '12–24h', maxHours: 24 },
  { label: '> 24h', maxHours: Infinity },
];

/* ----------------------------- */
/* Insight severity mapping      */
/* ----------------------------- */

export type InsightSeverity = 'good' | 'warning' | 'critical';

export function getSlaSeverity(value: number): InsightSeverity {
  if (value >= SLA_THRESHOLDS.GOOD) return 'good';
  if (value >= SLA_THRESHOLDS.WARNING) return 'warning';
  return 'critical';
}

/* ----------------------------- */
/* Labels                        */
/* ----------------------------- */

export const INSIGHT_LABELS = {
  SLA_COMPLIANCE: 'SLA Compliance',
  AVG_RESOLUTION_TIME: 'Avg. Resolution Time',
  TICKETS_RESOLVED: 'Tickets Resolved',
};
