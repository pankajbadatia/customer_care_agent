"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "../../shared-ui/Theme";
import { isAuthenticated } from "../auth";
import ShellLayout from "./user-shell-layout";

const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];

export function UserShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const isPublic = PUBLIC_ROUTES.some((r) => path.startsWith(r));

    // Public pages don't need auth
    if (isPublic) {
      setReady(true);
      return;
    }

    // If for some reason middleware missed it (rare)
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    setReady(true);
  }, []);

  // 🚫 Block UI until auth is settled
  if (!ready) {
    return null; // or loading screen later
  }

  return (
    <ThemeProvider>
      <ShellLayout>{children}</ShellLayout>
    </ThemeProvider>
  );
}
