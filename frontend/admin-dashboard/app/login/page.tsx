"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:8010";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * If admin session already exists → redirect to /
   */
  useEffect(() => {
    const hasToken =
      document.cookie.includes("csacp_admin_access_token") ||
      document.cookie.includes("csacp_admin_refresh_token");

    if (hasToken) {
      router.replace("/");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <-- IMPORTANT (store HttpOnly cookie)
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        let message = `Login failed (${res.status})`;
        try {
          const data = await res.json();
          if (data?.detail) message = String(data.detail);
        } catch {}
        throw new Error(message);
      }

      const data = await res.json();

      // Require admin role
      if (data?.role !== "admin") {
        throw new Error("This account is not an admin account");
      }

      // Successful login → go to admin home
      router.replace("/");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "1.5rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 380,
          padding: "2rem",
          background: "#ffffff",
          borderRadius: 10,
          border: "1px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: "1.25rem",
            textAlign: "center",
          }}
        >
          Admin Login
        </h1>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: 13, display: "block" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: 6,
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: 13, display: "block" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: 6,
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              marginBottom: "1rem",
              color: "#b91c1c",
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.7rem",
            borderRadius: 6,
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div style={{ marginTop: "0.75rem", fontSize: 12, color: "#64748b" }}>
          API: {API_BASE}
        </div>
      </form>
    </div>
  );
}
