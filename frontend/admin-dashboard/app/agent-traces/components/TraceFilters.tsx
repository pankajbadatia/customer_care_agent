'use client';

import { ExecutionStatus } from '../types';

interface TraceFiltersProps {
  agent: string;
  status: ExecutionStatus | 'all';
  onAgentChange: (value: string) => void;
  onStatusChange: (value: ExecutionStatus | 'all') => void;
}

/**
 * TraceFilters
 *
 * Responsibilities:
 * - Render filter controls
 * - Emit filter intent to parent
 * - Own NO state
 */
export default function TraceFilters({
  agent,
  status,
  onAgentChange,
  onStatusChange,
}: TraceFiltersProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        alignItems: 'center',
      }}
    >
      {/* Agent Filter */}
      <label>
        <span style={{ marginRight: '0.25rem', fontSize: '0.85rem' }}>
          Agent
        </span>
        <select
          value={agent}
          onChange={(e) => onAgentChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="monitoring-agent">Monitoring Agent</option>
          <option value="anomaly-agent">Anomaly Agent</option>
          <option value="root-cause-agent">Root Cause Agent</option>
          <option value="action-agent">Action Agent</option>
          <option value="escalation-agent">Escalation Agent</option>
        </select>
      </label>

      {/* Status Filter */}
      <label>
        <span style={{ marginRight: '0.25rem', fontSize: '0.85rem' }}>
          Status
        </span>
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as ExecutionStatus | 'all')
          }
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="running">Running</option>
        </select>
      </label>
    </div>
  );
}
