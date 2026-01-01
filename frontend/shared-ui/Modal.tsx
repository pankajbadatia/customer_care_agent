"use client";

import { ReactNode } from "react";
import { useTheme } from "./Theme";

export default function Modal({
  children,
}: {
  children: ReactNode;
}) {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: tokens.surface,
          border: `1px solid ${tokens.borderStrong}`,
          borderRadius: 14,
          padding: "1.25rem",
          color: tokens.textPrimary,
          minWidth: 420,
          maxWidth: 620,
        }}
      >
        {children}
      </div>
    </div>
  );
}
