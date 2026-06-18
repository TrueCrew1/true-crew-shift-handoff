"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isSupabaseConfigured, SESSION_COOKIE } from "./config";
import { signSession } from "./dev-session";
import { authenticateDevUser } from "./dev-users";
import { getCurrentUser } from "./session";
import { recordAuditEvent } from "@/lib/audit/audit-log";

export interface SignInState {
  error?: string;
}

export async function signInAction(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (isSupabaseConfigured()) {
    const { createSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Invalid email or password." };
  } else {
    const user = authenticateDevUser(email, password);
    if (!user) return { error: "Invalid email or password." };
    const token = await signSession(user.id);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  }

  const user = await getCurrentUser();
  if (user) {
    await recordAuditEvent({
      actorId: user.id,
      actorEmail: user.email,
      companyId: user.companyId,
      action: "auth.signed_in",
    });
  }

  redirect("/dashboard");
}

export async function signOutAction(): Promise<void> {
  const user = await getCurrentUser();
  if (user) {
    await recordAuditEvent({
      actorId: user.id,
      actorEmail: user.email,
      companyId: user.companyId,
      action: "auth.signed_out",
    });
  }

  if (isSupabaseConfigured()) {
    const { createSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } else {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
  }

  redirect("/login");
}
