import { requireUser } from "@/lib/auth/session";
import { permissionsForRole } from "@/lib/auth/permissions";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge, RoleBadge } from "@/components/ui/Badge";

export default async function DashboardPage() {
  const user = await requireUser();
  const permissions = permissionsForRole(user.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          Welcome, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted">
          You are signed in to the True Crew foundation app shell.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader title="Your access" description="Role and company scope" />
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Role</span>
              <RoleBadge role={user.role} label={ROLE_LABELS[user.role]} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Company</span>
              <span className="text-sm font-medium text-foreground">
                {user.companyName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Company ID</span>
              <code className="text-xs text-muted">{user.companyId}</code>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Permissions"
            description="Granted by your role"
          />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {permissions.map((p) => (
                <Badge key={p}>{p}</Badge>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Foundation status"
          description="Phase 1 — the base every later module builds on"
        />
        <CardBody>
          <ul className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
            <li>✓ Authenticated app shell</li>
            <li>✓ Protected routes</li>
            <li>✓ Role model (owner / admin / painter / customer / support)</li>
            <li>✓ Centralized permission checks</li>
            <li>✓ Company / account scoping</li>
            <li>✓ Shared loading / empty / error / unauthorized / forbidden states</li>
            <li>✓ Audit-log base pattern</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
