"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "../../shared-ui/Theme";
import { ThemeToggle } from "../../shared-ui/ThemeToggle";
import Button from "../../shared-ui/Button";
import { logout } from "../auth";

const USER_NAV = [
  { label: "Overview", href: "/overview" },
  { label: "Tickets", href: "/tickets" },
  { label: "Insights", href: "/insights" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "Feedback", href: "/feedback" },
];

export default function ShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { tokens } = useTheme();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 250,
          padding: "1.25rem 1rem",
          backgroundColor: tokens.surface,
          borderRight: `1px solid ${tokens.border}`,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>Customer Support</div>
          <div style={{ fontSize: ".8rem", color: tokens.textSecondary }}>
            Agent Console
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          {USER_NAV.map((item) => {
            const active =
              pathname?.startsWith(item.href) ||
              (item.href === "/overview" && pathname === "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: ".55rem .75rem",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  color: active ? tokens.accentText : tokens.textSecondary,
                  backgroundColor: active ? tokens.accentSoft : "transparent",
                  border: active
                    ? `1px solid ${tokens.border}`
                    : "1px solid transparent",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                {active && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: tokens.accent,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: "auto",
            fontSize: ".75rem",
            color: tokens.textSecondary,
          }}
        >
          <div>Logged in</div>
        </div>
      </aside>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: tokens.background,
        }}
      >
        <header
          style={{
            padding: ".75rem 1.5rem",
            borderBottom: `1px solid ${tokens.border}`,
            backgroundColor: tokens.surfaceMuted,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ThemeToggle />
          <Button size="sm" variant="secondary" onClick={() => logout()}>
            Logout
          </Button>
        </header>

        <main style={{ flex: 1, padding: "1.5rem" }}>{children}</main>
      </div>
    </div>
  );
}
