/**
 * Agent Traces – Domain Types
 *
 * These types define the contract between:
 * - Agent service
 * - Observability layer
 * - Admin UI
 *
 * Do NOT put UI-only types here.
 */

/**
 * Execution status of an agent or span
 */
export type ExecutionStatus = 'success' | 'failed' | 'running';

/**
 * A lightweight trace summary used in list views
 */
export interface AgentTrace {
  traceId: string;
  agentName: string;
  status: ExecutionStatus;
  startTime: number;     // epoch ms
  durationMs: number;
}

/**
 * A single execution step inside an agent trace
 */
export interface AgentSpan {
  spanId: string;
  name: string;
  startTimeMs: number;   // relative to trace start
  durationMs: number;
  status: ExecutionStatus;
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Full trace details used in the detail view
 */
export interface AgentTraceDetails {
  traceId: string;
  agentName: string;
  status: ExecutionStatus;

  startTime: number;     // epoch ms
  durationMs: number;

  // LLM / cost metadata
  model?: string;
  costUsd?: number;

  // Ordered execution steps
  spans: AgentSpan[];
}
