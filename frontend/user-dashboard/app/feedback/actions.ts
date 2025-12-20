'use server';

import { FeedbackPayload } from './types';

/**
 * API base URL
 * (proxied via Next.js rewrites in next.config.js)
 */
const API_BASE = '/api';

/**
 * Submit user feedback
 *
 * This feeds:
 * - ML retraining datasets
 * - Agent correction loops
 * - LLM quality monitoring
 * - Admin analytics dashboards
 */
export async function submitFeedback(
  payload: FeedbackPayload
): Promise<void> {
  const response = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /**
       * Auth header is injected by API Gateway middleware
       * when cookie-based auth is used.
       *
       * If you later switch to explicit tokens,
       * add Authorization header here.
       */
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Feedback submission failed (${response.status}): ${text}`
    );
  }
}

/**
 * Fetch historical feedback for the current user
 * (optional, useful for UX and audits)
 */
export async function fetchUserFeedback(): Promise<FeedbackPayload[]> {
  const response = await fetch(`${API_BASE}/feedback/me`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load feedback (${response.status})`
    );
  }

  return response.json();
}
