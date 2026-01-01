"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8010";

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const user = await res.json();

        // must be admin
        if (user?.role !== "admin") {
          router.replace("/login");
          return;
        }

        setAuthorized(true);
      } catch {
        router.replace("/login");
      }
    }

    verifySession();
  }, [router]);

  // 🚫 Avoid flash while verifying
  if (authorized === null) return null;

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
