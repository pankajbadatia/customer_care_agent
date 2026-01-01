"use client";

import { useState } from "react";
import { useTheme } from "../../../shared-ui/Theme";
import { ThemeToggle } from "../../../shared-ui/ThemeToggle";
import Button from "../../../shared-ui/Button";
import { register } from "../../auth/auth";

export default function RegisterPage() {
  const { tokens } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !password || !confirm) return;
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await register(email, password);
      // registration does NOT log in → go to login
      window.location.href = "/login";
    } catch (e: any) {
      setError(e?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: tokens.background,
      }}
    >
      <div
        style={{
          width: 420,
          backgroundColor: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: 14,
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Create account</h2>
            <p style={{ fontSize: ".85rem", color: tokens.textSecondary }}>
              Join the support workspace
            </p>
          </div>
          <ThemeToggle />
        </div>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
        />

        {error && (
          <div style={{ color: "red", fontSize: ".8rem", marginBottom: 8 }}>
            {error}
          </div>
        )}

        <Button
          style={{ width: "100%" }}
          loading={submitting}
          onClick={handleSubmit}
        >
          Create account
        </Button>

        <div style={{ marginTop: 8, fontSize: ".8rem" }}>
          <a href="/login">Already have an account? Sign in</a>
        </div>
      </div>
    </div>
  );
}
