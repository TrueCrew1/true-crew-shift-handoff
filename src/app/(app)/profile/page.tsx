import { requireUser } from "@/lib/auth/session";
import { getCompanyScope } from "@/lib/company/scope";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/Badge";

export default async function ProfilePage() {
  const user = await requireUser();
  const scope = getCompanyScope(user);

  const rows: [string, string][] = [
    ["Name", user.name],
    ["Email", user.email],
    ["User ID", user.id],
    ["Company", scope.companyName],
    ["Company ID", scope.companyId],
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Profile</h1>
      <Card>
        <CardHeader
          title="Account details"
          action={<RoleBadge role={user.role} label={ROLE_LABELS[user.role]} />}
        />
        <CardBody>
          <dl className="divide-y divide-border">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between py-2.5"
              >
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-sm font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </CardBody>
      </Card>
    </div>
  );
}
