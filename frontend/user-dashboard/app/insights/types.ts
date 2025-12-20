/**
 * Domain types for User Insights
 *
 * These types represent business concepts,
 * not backend or UI implementation details.
 */

/**
 * High-level KPI shown on Insights page
 */
export interface InsightMetric {
  /**
   * Stable identifier (used as React key)
   * e.g. "sla_compliance", "avg_resolution_time"
   */
  key: string;

  /** Human-readable label */
  label: string;

  /** Numeric or formatted value */
  value: number | string;

  /** Optional unit (%, hrs, tickets, etc.) */
  unit?: string;

  /** Short explanation for user */
  description?: string;
}

/**
 * SLA compliance trend over time
 */
export interface SlaTrendPoint {
  /** ISO date string or short label */
  date: string;

  /** SLA compliance percentage */
  value: number;
}

/**
 * Resolution time distribution insight
 */
export interface ResolutionInsight {
  /** Time bucket label (e.g. "< 1h", "1–4h") */
  bucket: string;

  /** Number of tickets in bucket */
  count: number;

  /** Percentage of total tickets */
  percentage: number;
}

/**
 * Full response returned by Insights API
 */
export interface UserInsightsResponse {
  metrics: InsightMetric[];
  slaTrend: SlaTrendPoint[];
  resolutionInsights: ResolutionInsight[];
}
