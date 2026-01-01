import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * / → Redirect based on admin auth cookies
 */
export default async function AdminIndexRedirectPage() {
  // ⬅️ cookies() is async in Next.js 16
  const cookieStore = await cookies();

  const access = cookieStore.get("csacp_admin_access_token");
  const refresh = cookieStore.get("csacp_admin_refresh_token");

  const isLoggedIn = Boolean(access?.value || refresh?.value);

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  redirect("/login");
}
