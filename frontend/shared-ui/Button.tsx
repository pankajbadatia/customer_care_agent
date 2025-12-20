'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

/**
 * Shared Button Component
 * - Forward ref for accessibility
 * - Loading state
 * - Variant + size support
 * - Safe defaults
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyle: React.CSSProperties = {
      borderRadius: '0.375rem',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s ease-in-out',
      border: '1px solid transparent',
      opacity: isDisabled ? 0.6 : 1,
    };

    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1rem', fontSize: '0.95rem' },
      lg: { padding: '0.625rem 1.25rem', fontSize: '1rem' },
    };

    const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: '#ffffff',
        color: '#2563eb',
        border: '1px solid #2563eb',
      },
      danger: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#475569',
      },
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          ...baseStyle,
          ...sizeStyles[size],
          ...variantStyles[variant],
        }}
        {...rest}
      >
        {loading ? 'Loading…' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
