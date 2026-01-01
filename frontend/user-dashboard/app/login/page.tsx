'use client';

import { useState } from 'react';
import { useTheme } from '../../../shared-ui/Theme';
import { ThemeToggle } from '../../../shared-ui/ThemeToggle';
import Button from '../../../shared-ui/Button';
import { login } from '../../auth/auth'; // adjust if your login fn name differs

export default function LoginPage() {
  const { tokens } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) return;

    setSubmitting(true);
    try {
      await login(email, password);
      window.location.href = '/overview';
    } catch {
      alert('Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: tokens.background,
      }}
    >
      <div
        style={{
          width: 380,
          backgroundColor: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: '14px',
          padding: '18px 20px',
          boxShadow:
            '0 20px 40px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: tokens.textPrimary,
              }}
            >
              Sign in
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '.85rem',
                color: tokens.textSecondary,
              }}
            >
              Access your support dashboard
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '.85rem',
              color: tokens.textSecondary,
            }}
          >
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '8px',
              border: `1px solid ${tokens.border}`,
              backgroundColor: tokens.surfaceMuted,
              color: tokens.textPrimary,
              outline: 'none',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '.85rem',
              color: tokens.textSecondary,
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '8px',
              border: `1px solid ${tokens.border}`,
              backgroundColor: tokens.surfaceMuted,
              color: tokens.textPrimary,
              outline: 'none',
            }}
          />
        </div>

        {/* Submit */}
        <Button
          style={{ width: '100%', marginBottom: 8 }}
          loading={submitting}
          onClick={handleSubmit}
        >
          Sign in
        </Button>

        {/* Footer links */}
        <div
          style={{
            marginTop: 6,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '.8rem',
            color: tokens.textSecondary,
          }}
        >
          <a href="/register" style={{ color: tokens.accent }}>
            Create account
          </a>

          <a href="/forgot-password" style={{ color: tokens.accent }}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
