"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "../../shared-ui/ThemeToggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Agent Traces", href: "/agent-traces" },
  { label: "System Health", href: "/system-health" },
  { label: "LLM Cost", href: "/llm-cost" },
  { label: "Configs", href: "/configs" },
  { label: "Alerts", href: "/alerts" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8010"}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    ).finally(() => {
      router.replace("/login");
    });
  }

  return (
    <aside
      style={{
        width: 250,
        padding: "1.25rem 1rem",
        borderRight: "1px solid rgba(148,163,184,.25)",
        background: "#020617",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      {/* Branding */}
      <div>
        <div
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: ".2px",
          }}
        >
          Admin Control Plane
        </div>
        <div
          style={{
            fontSize: ".8rem",
            opacity: 0.75,
            marginTop: ".15rem",
          }}
        >
          System Governance & Observability
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".25rem",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: ".55rem .75rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: ".9rem",
                fontWeight: active ? 600 : 400,
                backgroundColor: active
                  ? "rgba(56,189,248,.18)"
                  : "transparent",
                color: active ? "#e0f2fe" : "#cbd5f5",
                border: active
                  ? "1px solid rgba(148,163,184,.5)"
                  : "1px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ".4rem",
              }}
            >
              <span>{item.label}</span>

              {active && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#38bdf8",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            marginBottom: ".75rem",
          }}
        >
          <ThemeToggle />

          <button
            onClick={handleLogout}
            style={{
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: ".85rem",
              border: "1px solid rgba(148,163,184,.35)",
              background: "transparent",
              color: "#e2e8f0",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ fontSize: ".75rem", opacity: 0.7 }}>
          <div>Role: admin</div>
          <div>v0.1 · Internal</div>
        </div>
      </div>
    </aside>
  );
}
