import { getAgentTraceDetails } from '../actions';
import TraceDetails from '../components/TraceDetails';
import { AgentTraceDetails } from '../types';

interface TraceDetailsPageProps {
  params: Promise<{ traceId: string }>;  // ✅ Next.js 16: params is Promise
}

/**
 * Agent Trace Details – Server Page
 *
 * Route: /agent-traces/[traceId]
 *
 * Responsibilities:
 * - Fetch a single agent trace by ID
 * - Fail fast if trace does not exist
 * - Render TraceDetails (pure UI)
 */
export default async function TraceDetailsPage({
  params,
}: TraceDetailsPageProps) {
  const { traceId } = await params;  // ✅ Await params first
  let trace: AgentTraceDetails;

  try {
    trace = await getAgentTraceDetails(traceId);  // ✅ Use awaited traceId
  } catch (error) {
    // Delegate to route-level error.tsx
    throw error;
  }

  return (
    <main style={{ padding: '1.5rem' }}>
      <TraceDetails trace={trace} />
    </main>
  );
}
