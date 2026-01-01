'use client';

import { useMemo, useState } from 'react';
import { AgentTrace, ExecutionStatus } from './types';
import TraceFilters from './components/TraceFilters';
import TraceTable from './components/TraceTable';

interface TracesClientProps {
  initialTraces: AgentTrace[];
}

/**
 * TracesClient
 *
 * Responsibilities:
 * - Own filter state
 * - Apply filtering logic
 * - Render filters + table
 *
 * This file intentionally contains ALL interactive logic.
 */
export default function TracesClient({ initialTraces }: TracesClientProps) {
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] =
    useState<ExecutionStatus | 'all'>('all');

  /**
   * Apply filters deterministically
   */
  const filteredTraces = useMemo(() => {
    return initialTraces.filter((trace) => {
      if (agentFilter !== 'all' && trace.agentName !== agentFilter) {
        return false;
      }

      if (statusFilter !== 'all' && trace.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [initialTraces, agentFilter, statusFilter]);

  return (
    <section>
      {/* Filters */}
      <TraceFilters
        agent={agentFilter}
        status={statusFilter}
        onAgentChange={setAgentFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Table */}
      <TraceTable traces={filteredTraces} />
    </section>
  );
}
