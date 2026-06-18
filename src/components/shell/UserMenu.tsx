import { signOutAction } from "@/lib/auth/actions";
import { RoleBadge } from "@/components/ui/Badge";
import { ROLE_LABELS, type Role } from "@/lib/auth/roles";

export function UserMenu({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: Role;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-semibold text-foreground">{name}</span>
          <RoleBadge role={role} label={ROLE_LABELS[role]} />
        </div>
        <p className="text-xs text-muted">{email}</p>
      </div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-slate-50"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
