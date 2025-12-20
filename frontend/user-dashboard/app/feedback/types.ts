/**
 * Feedback domain types
 *
 * These types are shared across:
 * - UI forms
 * - API Gateway contracts
 * - ML training datasets
 * - Agent correction loops
 * - Observability pipelines
 */

/**
 * Feedback rating scale
 * (aligned with CSAT-style metrics)
 */
export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

/**
 * What the feedback is about
 */
export type FeedbackCategory =
  | 'chatbot'
  | 'ticket_resolution'
  | 'response_quality'
  | 'accuracy'
  | 'speed'
  | 'other';

/**
 * Core feedback payload
 */
export interface FeedbackPayload {
  /**
   * Rating score (1–5)
   */
  rating: FeedbackRating;

  /**
   * Category of feedback
   */
  category: FeedbackCategory;

  /**
   * Optional free-text comment
   */
  comment?: string;

  /**
   * Client-side timestamp (epoch ms)
   * Backend should attach server timestamp as well
   */
  timestamp: number;

  /**
   * Optional correlation fields
   * (populated later by client or gateway)
   */
  conversationId?: string;
  ticketId?: string;
  traceId?: string;
}

/**
 * Feedback record as stored/returned by backend
 */
export interface FeedbackRecord extends FeedbackPayload {
  id: string;
  userId: string;
  createdAt: string; // ISO timestamp
}
