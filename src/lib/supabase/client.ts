import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (used only when Supabase env vars are configured).
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
