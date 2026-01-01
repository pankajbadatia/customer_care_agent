'use client';

import { useState } from 'react';
import { useTheme } from '../../../shared-ui/Theme';
import { ThemeToggle } from '../../../shared-ui/ThemeToggle';
import Button from '../../../shared-ui/Button';
import { sendPasswordReset } from '../../auth/auth'; // adjust if name differs

export default function ForgotPasswordPage() {
  const { tokens } = useTheme();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSubmitted(true);
    } catch {
      alert('Something went wrong');
    } finally {
      setLoading(false);
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
          width: 400,
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
              Reset password
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: '.85rem',
                color: tokens.textSecondary,
              }}
            >
              Enter your email to receive reset instructions
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* Success Message */}
        {submitted ? (
          <div
            style={{
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: tokens.accentSoft,
              border: `1px solid ${tokens.border}`,
              color: tokens.textPrimary,
              fontSize: '.85rem',
              marginBottom: '10px',
            }}
          >
            If an account exists for this email, a reset link was sent.
          </div>
        ) : null}

        {/* Email */}
        {!submitted && (
          <div style={{ marginBottom: '12px' }}>
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
        )}

        {/* Submit */}
        {!submitted ? (
          <Button
            style={{ width: '100%', marginBottom: 8 }}
            loading={loading}
            onClick={handleSubmit}
          >
            Send reset link
          </Button>
        ) : (
          <Button
            style={{ width: '100%', marginBottom: 8 }}
            onClick={() => (window.location.href = '/login')}
          >
            Back to login
          </Button>
        )}

        {/* Footer Link */}
        {!submitted && (
          <div
            style={{
              marginTop: 6,
              fontSize: '.8rem',
              color: tokens.textSecondary,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href="/login" style={{ color: tokens.accent }}>
              Back to login
            </a>

            <a href="/register" style={{ color: tokens.accent }}>
              Create account
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
