'use client';

import { withAuthHeaders } from '@auth/auth';
import {
  InsightMetric,
  SlaTrendPoint,
  ResolutionInsight,
  UserInsightsResponse,
} from './types';

/**
 * Fetch user insights from API Gateway
 *
 * This function intentionally:
 * - lives outside page.tsx
 * - centralizes API logic
 * - is easy to replace with real backend
 */
export async function fetchUserInsights(): Promise<UserInsightsResponse> {
  // NOTE:
  // This endpoint will later be served by:
  // api-gateway → ticket-service / ml-service / llm-service
  const response = await fetch('/api/user/insights', {
    method: 'GET',
    ...withAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch insights (${response.status})`
    );
  }

  const data = await response.json();

  /**
   * Defensive parsing:
   * Never trust backend blindly
   */
  return {
    metrics: parseMetrics(data.metrics),
    slaTrend: parseSlaTrend(data.slaTrend),
    resolutionInsights: parseResolutionInsights(
      data.resolutionInsights
    ),
  };
}

/* ----------------------------- */
/* Parsers / Guards              */
/* ----------------------------- */

function parseMetrics(input: unknown): InsightMetric[] {
  if (!Array.isArray(input)) return [];

  return input.map((m: any) => ({
    key: String(m.key),
    label: String(m.label),
    value: m.value,
    unit: m.unit ? String(m.unit) : undefined,
    description: m.description
      ? String(m.description)
      : undefined,
  }));
}

function parseSlaTrend(input: unknown): SlaTrendPoint[] {
  if (!Array.isArray(input)) return [];

  return input.map((p: any) => ({
    date: String(p.date),
    value: Number(p.value),
  }));
}

function parseResolutionInsights(
  input: unknown
): ResolutionInsight[] {
  if (!Array.isArray(input)) return [];

  return input.map((r: any) => ({
    bucket: String(r.bucket),
    count: Number(r.count),
    percentage: Number(r.percentage),
  }));
}
