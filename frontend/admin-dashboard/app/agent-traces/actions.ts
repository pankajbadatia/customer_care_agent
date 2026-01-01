'use server';

import {
  AgentTrace,
  AgentTraceDetails,
  ExecutionStatus,
} from './types';

/**
 * Mock trace store (UI-only for now).
 * Replace with API Gateway calls later.
 */
const TRACE_STORE: Record<string, AgentTraceDetails> = {
  'trace-001': {
    traceId: 'trace-001',
    agentName: 'root-cause-agent',
    status: 'success',
    startTime: Date.now() - 120_000,
    durationMs: 842,
    costUsd: 0.018,
    model: 'gpt-4o-mini',
    spans: [
      {
        spanId: 'span-1',
        name: 'Agent Initialization',
        startTimeMs: 0,
        durationMs: 42,
        status: 'success',
      },
      {
        spanId: 'span-2',
        name: 'TicketQueryTool',
        startTimeMs: 42,
        durationMs: 180,
        status: 'success',
        attributes: {
          tool: 'ticket_query_tool',
          ticketsFetched: 42,
        },
      },
      {
        spanId: 'span-3',
        name: 'VectorSearchTool',
        startTimeMs: 222,
        durationMs: 310,
        status: 'success',
        attributes: {
          tool: 'vector_search_tool',
          topK: 5,
        },
      },
      {
        spanId: 'span-4',
        name: 'LLM Reasoning',
        startTimeMs: 532,
        durationMs: 290,
        status: 'success',
        attributes: {
          model: 'gpt-4o-mini',
          tokens: 312,
        },
      },
    ],
  },

  'trace-002': {
    traceId: 'trace-002',
    agentName: 'anomaly-agent',
    status: 'failed',
    startTime: Date.now() - 300_000,
    durationMs: 1320,
    costUsd: 0.006,
    model: 'gpt-4o-mini',
    spans: [
      {
        spanId: 'span-1',
        name: 'Agent Initialization',
        startTimeMs: 0,
        durationMs: 38,
        status: 'success',
      },
      {
        spanId: 'span-2',
        name: 'MLPredictionTool',
        startTimeMs: 38,
        durationMs: 214,
        status: 'failed',
        attributes: {
          error: 'Model timeout',
        },
      },
    ],
  },

  'trace-003': {
    traceId: 'trace-003',
    agentName: 'monitoring-agent',
    status: 'running',
    startTime: Date.now() - 60_000,
    durationMs: 120,
    model: 'gpt-4o-mini',
    spans: [
      {
        spanId: 'span-1',
        name: 'Heartbeat Check',
        startTimeMs: 0,
        durationMs: 120,
        status: 'running',
      },
    ],
  },
};

/**
 * List view – returns lightweight summaries
 */
export async function getAgentTraces(): Promise<AgentTrace[]> {
  return Object.values(TRACE_STORE).map(
    ({ traceId, agentName, status, startTime, durationMs }) => ({
      traceId,
      agentName,
      status,
      startTime,
      durationMs,
    })
  );
}

/**
 * Detail view – returns full trace with spans
 */
export async function getAgentTraceDetails(
  traceId: string
): Promise<AgentTraceDetails> {
  const trace = TRACE_STORE[traceId];

  if (!trace) {
    throw new Error(`Trace not found: ${traceId}`);
  }

  return trace;
}
