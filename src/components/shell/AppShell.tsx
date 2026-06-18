import type { ReactNode } from "react";

import { SideNav } from "./SideNav";
import { UserMenu } from "./UserMenu";
import { NAV_ITEMS } from "./nav";
import { roleCan } from "@/lib/auth/permissions";
import type { AppUser } from "@/lib/auth/types";

// The authenticated app shell: persistent sidebar + top bar + page content. Navigation is
// filtered by the current user's permissions so each role only sees what it can access.
export function AppShell({
  user,
  children,
}: {
  user: AppUser;
  children: ReactNode;
}) {
  const navItems = NAV_ITEMS.filter((item) =>
    roleCan(user.role, item.permission),
  );

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col bg-sidebar">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-black text-slate-900">
            TC
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            True Crew
          </span>
        </div>
        <SideNav items={navItems} />
        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs text-sidebar-foreground/60">Company</p>
          <p className="truncate text-sm font-medium text-white">
            {user.companyName}
          </p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
          <div className="text-sm font-medium text-muted">
            Shift Handover &amp; Field Operations
          </div>
          <UserMenu name={user.name} email={user.email} role={user.role} />
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
