import { clientApiFetch } from "./api-client";

export async function apiWithRefresh(path: string, options: RequestInit = {}) {
  let res = await clientApiFetch(path, options);

  if (res.status === 401) {
    // attempt refresh
    await clientApiFetch("/auth/refresh", { method: "POST" });

    // retry once
    res = await clientApiFetch(path, options);
  }

  return res;
}
