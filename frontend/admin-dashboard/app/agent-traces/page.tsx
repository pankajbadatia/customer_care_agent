import { getAgentTraces } from "./actions";
import TracesClient from "./traces-client";
import { AgentTrace } from "./types";

import { AdminShell } from "../admin-shell";

export default async function AgentTracesPage() {
  let traces: AgentTrace[] = [];

  try {
    traces = await getAgentTraces();
  } catch (error) {
    throw error;
  }

  return (
    <AdminShell>
      <main style={{ padding: "1.5rem" }}>
        <header style={{ marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Agent Traces
          </h1>

          <p style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
            Inspect agent executions, decisions, and reasoning timelines
          </p>
        </header>

        <TracesClient initialTraces={traces} />
      </main>
    </AdminShell>
  );
}
