import type { ReactNode } from "react";
import type { Role } from "@/lib/auth/roles";

const ROLE_STYLES: Record<Role, string> = {
  owner: "bg-amber-100 text-amber-900 ring-amber-300",
  admin: "bg-indigo-100 text-indigo-900 ring-indigo-300",
  painter: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  customer: "bg-sky-100 text-sky-900 ring-sky-300",
  support: "bg-rose-100 text-rose-900 ring-rose-300",
};

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-300 ring-inset">
      {children}
    </span>
  );
}

export function RoleBadge({ role, label }: { role: Role; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${ROLE_STYLES[role]}`}
    >
      {label}
    </span>
  );
}
