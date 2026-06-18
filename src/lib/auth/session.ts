import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isSupabaseConfigured, SESSION_COOKIE } from "./config";
import { verifySession } from "./dev-session";
import { findDevUserById } from "./dev-users";
import { roleCan, type Permission } from "./permissions";
import type { Role } from "./roles";
import type { AppUser } from "./types";

// Single entry point for reading the authenticated user on the server. Branches on the
// configured auth source so callers stay source-agnostic.
export async function getCurrentUser(): Promise<AppUser | null> {
  if (isSupabaseConfigured()) {
    const { getSupabaseUser } = await import("@/lib/supabase/user");
    return getSupabaseUser();
  }

  const store = await cookies();
  const userId = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!userId) return null;
  return findDevUserById(userId);
}

// Guard: require an authenticated user or redirect to the login screen.
export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

// Guard: require a specific permission or redirect to the forbidden screen.
export async function requirePermission(permission: Permission): Promise<AppUser> {
  const user = await requireUser();
  if (!roleCan(user.role, permission)) redirect("/forbidden");
  return user;
}

// Guard: require one of the given roles or redirect to the forbidden screen.
export async function requireRole(...roles: Role[]): Promise<AppUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect("/forbidden");
  return user;
}
