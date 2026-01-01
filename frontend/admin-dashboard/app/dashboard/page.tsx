import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminShellLayout from "../admin-shell-layout";
import AdminSidebar from "@/components/AdminSidebar";

const ACCESS = "csacp_admin_access_token";
const REFRESH = "csacp_admin_refresh_token";

/**
 * Admin Dashboard (Protected)
 *
 * Layout + auth handling intentionally mirrors `agent-traces`
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();

  const access = cookieStore.get(ACCESS);
  const refresh = cookieStore.get(REFRESH);

  const isLoggedIn = Boolean(access?.value || refresh?.value);

  // 🚫 Not logged in → middleware *should* catch this,
  // but we also guard server-side just like agent-traces
  if (!isLoggedIn) redirect("/login");

  return (
    <AdminShellLayout sidebar={<AdminSidebar />}>
      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold">
          Admin Dashboard
        </h1>

        <p className="text-gray-600">
          High-level overview of system health and platform activity.
        </p>

        {/* ===== Top Status Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="p-4 border rounded-lg">
            <h2 className="font-medium">API Gateway</h2>
            <p className="text-sm mt-1 text-gray-500">
              Status: Online
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="font-medium">Database</h2>
            <p className="text-sm mt-1 text-gray-500">
              Connected & healthy
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="font-medium">Auth Service</h2>
            <p className="text-sm mt-1 text-gray-500">
              Operational
            </p>
          </div>
        </div>

        {/* ===== KPI Row ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Requests (24h)</h3>
            <p className="mt-2 text-2xl font-semibold">—</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Success Rate</h3>
            <p className="mt-2 text-2xl font-semibold">—%</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Errors</h3>
            <p className="mt-2 text-2xl font-semibold">—</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Avg Latency</h3>
            <p className="mt-2 text-2xl font-semibold">— ms</p>
          </div>
        </div>

        {/* ===== Recent Activity / Traces Preview ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Recent Alerts</h3>
            <p className="mt-2 text-sm text-gray-500">
              (Future) show spikes, failures, auth issues…
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Recent Traces</h3>
            <p className="mt-2 text-sm text-gray-500">
              (Future) small preview — drill-down to agent-traces
            </p>
          </div>
        </div>

      </div>
    </AdminShellLayout>
  );
}
