import Link from "next/link";

import { requirePermission } from "@/lib/auth/session";
import { listDevUsers } from "@/lib/auth/dev-users";
import { isSupabaseConfigured } from "@/lib/auth/config";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/states";

export default async function AdminPage() {
  // Gated by permission: painter/customer are redirected to /forbidden.
  const user = await requirePermission("admin:access");
  const devMode = !isSupabaseConfigured();
  const people = devMode
    ? listDevUsers().filter((u) => u.companyId === user.companyId)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Admin</h1>
          <p className="mt-1 text-sm text-muted">
            Company-scoped administration for {user.companyName}.
          </p>
        </div>
        <Link
          href="/admin/audit"
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-slate-50"
        >
          View audit log
        </Link>
      </div>

      <Card>
        <CardHeader
          title="People"
          description="Accounts in your company (read-only foundation view)"
        />
        <CardBody className="p-0">
          {people.length === 0 ? (
            <div className="p-5">
              <EmptyState
                title="No directory data"
                message="People management arrives with the crew/customer phases. This is the foundation view only."
              />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {people.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted">{p.email}</p>
                  </div>
                  <RoleBadge role={p.role} label={ROLE_LABELS[p.role]} />
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
