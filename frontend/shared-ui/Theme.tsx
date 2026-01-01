"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { themeTokens } from "./theme/tokens";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  mode: ThemeMode;
  tokens: typeof themeTokens.light;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Load saved preference
  useEffect(() => {
    const saved = window.localStorage.getItem("csacp-theme");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  const tokens = useMemo(
    () => (mode === "light" ? themeTokens.light : themeTokens.dark),
    [mode]
  );

  const applyCssVars = () => {
    const r = document.documentElement;

    Object.entries(tokens).forEach(([k, v]) => {
      r.style.setProperty(`--ui-${k}`, v as string);
    });

    // add body class
    document.body.dataset.theme = mode;
  };

  useEffect(() => {
    applyCssVars();
    window.localStorage.setItem("csacp-theme", mode);
  }, [mode]);

  const value: ThemeContextValue = {
    mode,
    tokens,
    toggleTheme: () => setMode((m) => (m === "light" ? "dark" : "light")),
    setTheme: setMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          minHeight: "100vh",
          background: tokens.background,
          color: tokens.textPrimary,
          fontFamily: "-apple-system,BlinkMacSystemFont,Inter,system-ui,sans-serif",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
