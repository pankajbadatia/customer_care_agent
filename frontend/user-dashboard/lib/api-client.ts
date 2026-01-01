"use client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:8010";

export async function clientApiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include", // allows gateway to read cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}
