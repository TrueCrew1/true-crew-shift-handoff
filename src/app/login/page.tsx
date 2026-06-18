import { LoginForm } from "./login-form";
import { isSupabaseConfigured } from "@/lib/auth/config";
import { DEV_PASSWORD, listDevUsers } from "@/lib/auth/dev-users";
import { ROLE_LABELS } from "@/lib/auth/roles";

export default function LoginPage() {
  const devMode = !isSupabaseConfigured();
  const devUsers = devMode ? listDevUsers() : [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-black text-slate-900">
            TC
          </span>
          <span className="text-lg font-semibold tracking-wide text-white">
            True Crew
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
          <h1 className="text-lg font-semibold text-foreground">Sign in</h1>
          <p className="mb-5 mt-1 text-sm text-muted">
            Access the shift handover &amp; field operations platform.
          </p>
          <LoginForm devEmail={devUsers[0]?.email} />
        </div>

        {devMode ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-sidebar-foreground/80">
            <p className="font-semibold text-white">Local dev accounts</p>
            <p className="mb-2 text-sidebar-foreground/60">
              Supabase is not configured — using local auth. Password for all:{" "}
              <code className="text-amber-300">{DEV_PASSWORD}</code>
            </p>
            <ul className="space-y-1">
              {devUsers.map((u) => (
                <li key={u.id} className="flex justify-between gap-2">
                  <span>{u.email}</span>
                  <span className="text-sidebar-foreground/60">
                    {ROLE_LABELS[u.role]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
