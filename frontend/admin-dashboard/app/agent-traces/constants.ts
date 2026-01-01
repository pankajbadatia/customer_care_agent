/**
 * Agent Traces – Constants
 *
 * Central place for:
 * - statuses
 * - labels
 * - default filters
 * - UI mappings
 */

import { ExecutionStatus, TraceSort } from './types';

/**
 * Supported execution statuses
 */
export const TRACE_STATUSES: ExecutionStatus[] = [
  'success',
  'failed',
  'running',
];

/**
 * Human-readable labels for statuses
 */
export const TRACE_STATUS_LABELS: Record<ExecutionStatus, string> = {
  success: 'Success',
  failed: 'Failed',
  running: 'Running',
};

/**
 * UI colors per status
 */
export const TRACE_STATUS_COLORS: Record<ExecutionStatus, string> = {
  success: '#16a34a',
  failed: '#dc2626',
  running: '#f59e0b',
};

/**
 * Default trace filter (last 24h)
 */
export const DEFAULT_TRACE_FILTER = {
  fromTime: Date.now() - 24 * 60 * 60 * 1000,
  toTime: Date.now(),
};

/**
 * Default sorting (newest first)
 */
export const DEFAULT_TRACE_SORT: TraceSort = {
  field: 'startTime',
  direction: 'desc',
};

/**
 * Known agent names (IDs, NOT labels)
 */
export const AGENT_NAMES = [
  'monitoring-agent',
  'anomaly-agent',
  'root-cause-agent',
  'reasoning-agent',
  'action-agent',
  'escalation-agent',
] as const;

/**
 * Optional UI labels (safe to add)
 */
export const AGENT_LABELS: Record<(typeof AGENT_NAMES)[number], string> = {
  'monitoring-agent': 'Monitoring Agent',
  'anomaly-agent': 'Anomaly Agent',
  'root-cause-agent': 'Root Cause Agent',
  'reasoning-agent': 'Reasoning Agent',
  'action-agent': 'Action Agent',
  'escalation-agent': 'Escalation Agent',
};

/**
 * Span type hints
 */
export const SPAN_TYPE_HINTS: Record<string, string> = {
  reasoning: 'Agent reasoning step',
  tool: 'Tool invocation',
  llm: 'LLM request',
  ml: 'ML inference',
};
