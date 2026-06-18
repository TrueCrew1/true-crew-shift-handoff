<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- App: **Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript**. Standard scripts in `package.json`: `npm run dev`, `npm run build`, `npm run lint`.
- **Auth has two modes, selected automatically** (see `src/lib/auth/config.ts`):
  - If `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set → Supabase Auth + Postgres (production stack; run `supabase/migrations/0001_foundation.sql` and seed `profiles`).
  - If unset → a **local cookie-based dev auth provider** with seeded users (one per role). Credentials are shown on the `/login` screen; password is `truecrew123`. This is what lets the app run/test in this environment with no external services.
- Route protection is enforced in `src/middleware.ts` (edge) **and** in `src/app/(app)/layout.tsx` (server guard). Authenticated pages live in the `(app)` route group.
- RBAC is centralized: roles in `src/lib/auth/roles.ts`, permissions + role map in `src/lib/auth/permissions.ts`. Gate behavior with `requirePermission()` / `roleCan()` — do not scatter inline role comparisons. `/admin` needs `admin:access`, `/admin/audit` needs `audit:read`; disallowed roles are redirected to `/forbidden`.
- Company/account scoping lives in `src/lib/company/scope.ts`; all tenant data in later phases must filter by `companyId` (and RLS enforces it on Supabase).
- Audit trail base pattern is `src/lib/audit/audit-log.ts` (`recordAuditEvent`). In dev mode events are kept in an in-process store, so they reset when the dev server restarts; in Supabase mode they go to the `audit_log` table.
