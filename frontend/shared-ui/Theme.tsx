'use client';

import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

/**
 * Theme definitions
 */
export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

/**
 * Token sets (extendable)
 */
const lightTheme: ThemeTokens = {
  background: '#f8fafc',
  surface: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  border: '#e2e8f0',
  accent: '#2563eb',
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
};

const darkTheme: ThemeTokens = {
  background: '#020617',
  surface: '#020617',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#1e293b',
  accent: '#3b82f6',
  success: '#22c55e',
  warning: '#fbbf24',
  error: '#ef4444',
};

/**
 * Context contract
 */
interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

/**
 * Context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Provider
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const tokens = useMemo<ThemeTokens>(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const value: ThemeContextValue = {
    mode,
    tokens,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          backgroundColor: tokens.background,
          color: tokens.textPrimary,
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook for consumers
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
