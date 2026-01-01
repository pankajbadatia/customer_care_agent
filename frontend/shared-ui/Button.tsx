"use client";

import { useTheme } from "./Theme";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  loading?: boolean;   // 👈 added
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,     // 👈 default
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const { tokens } = useTheme();

  const sizes = {
    sm: "6px 10px",
    md: "8px 14px",
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: tokens.accent,
      color: tokens.accentContrast,
      border: `1px solid ${tokens.accent}`,
    },
    secondary: {
      background: tokens.surfaceAlt,
      color: tokens.textPrimary,
      border: `1px solid ${tokens.borderStrong}`,
    },
    ghost: {
      background: "transparent",
      color: tokens.textSecondary,
      border: `1px solid transparent`,
    },
  };

  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={{
        padding: sizes[size],
        borderRadius: 10,
        fontWeight: 600,
        fontSize: ".9rem",
        opacity: isDisabled ? 0.7 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...styles[variant],
        ...style,
      }}
    >
      {loading ? "Processing…" : children}
    </button>
  );
}
