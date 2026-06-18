import { createSupabaseServerClient } from "./server";
import type { AppUser } from "@/lib/auth/types";
import { isRole, type Role } from "@/lib/auth/roles";

// Maps an authenticated Supabase user to the app's AppUser shape. Role + company come
// from the `profiles` table (see supabase/migrations); app_metadata is used as a fallback.
export async function getSupabaseUser(): Promise<AppUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, company_id, companies(name)")
    .eq("id", user.id)
    .single();

  const metaRole = user.app_metadata?.role;
  const role: Role = isRole(profile?.role)
    ? profile!.role
    : isRole(metaRole)
      ? metaRole
      : "customer";

  const company = profile?.companies as { name?: string } | null | undefined;

  return {
    id: user.id,
    email: user.email ?? "",
    name: profile?.full_name ?? user.email ?? "Unknown",
    role,
    companyId: profile?.company_id ?? user.app_metadata?.company_id ?? "",
    companyName: company?.name ?? "—",
  };
}
