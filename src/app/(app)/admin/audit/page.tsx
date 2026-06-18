import { requirePermission } from "@/lib/auth/session";
import { getRecentAuditEvents } from "@/lib/audit/audit-log";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/states";

export default async function AuditLogPage() {
  const user = await requirePermission("audit:read");
  const events = await getRecentAuditEvents(user.companyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Audit Log</h1>
        <p className="mt-1 text-sm text-muted">
          Tracked actions for {user.companyName}. Later modules write to this same trail.
        </p>
      </div>

      <Card>
        <CardHeader title="Recent activity" />
        <CardBody className="p-0">
          {events.length === 0 ? (
            <div className="p-5">
              <EmptyState
                title="No audit events yet"
                message="Actions such as sign-in are recorded here as they happen."
              />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {events.map((e) => (
                <li key={e.id} className="flex items-center gap-4 px-5 py-3">
                  <code className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {e.action}
                  </code>
                  <span className="text-sm text-foreground">{e.actorEmail}</span>
                  {e.target ? (
                    <span className="text-sm text-muted">→ {e.target}</span>
                  ) : null}
                  <span className="ml-auto text-xs text-muted">
                    {new Date(e.at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
