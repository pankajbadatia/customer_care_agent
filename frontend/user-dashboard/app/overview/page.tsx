import { UserShell } from "../user-shell";

import SummaryCards from "./components/SummaryCards";
import SlaTrend from "./components/SlaTrend";
import TicketStatusChart from "./components/TicketStatusChart";
import OverviewActions from "./components/OverviewActions";

import Table from "../../components/Tables";
import { fetchOverviewData } from "./actions";
import type { TicketRow } from "./types";

/**
 * Overview Page (Protected)
 *
 * Only renders inside UserShell.
 * If user is not authenticated → redirected to /login
 */
export default async function OverviewPage() {
  const data = await fetchOverviewData();

  return (
    <UserShell>
      {/* Header */}
      <header
        style={{
          marginBottom: "1.25rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Overview
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "0.25rem",
            fontSize: "0.9rem",
          }}
        >
          Snapshot of your support activity, SLAs, and ticket flow.
        </p>
      </header>

      {/* Summary cards */}
      <section style={{ marginBottom: "1.5rem" }}>
        <SummaryCards stats={data.summary} />
      </section>

      {/* Charts */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <TicketStatusChart data={data.ticketStatus} />
        <SlaTrend data={data.slaTrend} />
      </section>

      {/* Recent tickets */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          backgroundColor: "#ffffff",
          borderRadius: "0.9rem",
          padding: "1rem 1.1rem",
          boxShadow: "0 16px 35px rgba(15, 23, 42, 0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "0.75rem",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Recent tickets
          </h2>

          <span
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
            }}
          >
            Last 24 hours
          </span>
        </div>

        <Table<TicketRow>
          columns={[
            { key: "id", header: "Ticket ID" },
            { key: "status", header: "Status" },
            { key: "priority", header: "Priority" },
            { key: "slaHrs", header: "SLA (hrs)" },
          ]}
          data={data.recentTickets}
          emptyMessage="No recent tickets"
        />
      </section>

      {/* Actions (CTA strip) */}
      <div style={{ marginTop: "1.25rem" }}>
        <OverviewActions />
      </div>
    </UserShell>
  );
}
