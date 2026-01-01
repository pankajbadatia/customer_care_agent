import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Admin root redirect
 *
 * Next.js 16:
 *  - cookies() is async
 *  - NO getAll()
 */
export default async function AdminIndexRedirectPage() {
  const cookieStore = await cookies();

  const access = cookieStore.get("csacp_admin_access_token");
  const refresh = cookieStore.get("csacp_admin_refresh_token");

  const isLoggedIn = Boolean(access?.value || refresh?.value);

  if (isLoggedIn) {
    redirect("/agent-traces");
  }

  redirect("/login");
}
