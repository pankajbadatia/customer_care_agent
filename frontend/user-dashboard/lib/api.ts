"use server";

import { cookies } from "next/headers";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:8010";

const USER_ACCESS_COOKIE = "csacp_user_access_token";

function getAccessTokenFromCookies() {
  const store = cookies();
  return store.get(USER_ACCESS_COOKIE)?.value || null;
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token = getAccessTokenFromCookies();

  const headers: HeadersInit = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", // send cookies too
    cache: "no-store",
  });

  return res;
}
