"use client";

import { useTheme } from "./Theme";

export function ThemeToggle() {
  const { mode, toggleTheme, tokens } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        border: `1px solid ${tokens.border}`,
        borderRadius: "10px",
        padding: "6px 10px",
        background: tokens.surfaceAlt,
        color: tokens.textPrimary,
        fontSize: ".85rem",
        cursor: "pointer",
      }}
    >
      {mode === "light" ? "🌙 Dark mode" : "☀ Light mode"}
    </button>
  );
}
