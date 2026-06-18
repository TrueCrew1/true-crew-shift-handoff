// Auth source selection. When Supabase env vars are present the app uses Supabase Auth +
// Postgres (the production stack). Otherwise it falls back to a local cookie-based dev
// auth provider so the foundation is runnable and testable without external credentials.
// The rest of the app never branches on this directly — it goes through lib/auth/session.

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export const SESSION_COOKIE = "tc_session";

export function devAuthSecret(): string {
  return process.env.AUTH_DEV_SECRET ?? "truecrew-dev-secret-change-me";
}
