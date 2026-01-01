"use client";

import { ReactNode } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminShellLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          background: "#020617",
        }}
      >
        {children}
      </main>
    </div>
  );
}
