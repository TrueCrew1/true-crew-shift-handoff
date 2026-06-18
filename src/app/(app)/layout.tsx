import type { ReactNode } from "react";

import { AppShell } from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth/session";

// Every route in this group is protected: requireUser redirects unauthenticated visitors
// to /login (defense-in-depth alongside the edge middleware).
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return <AppShell user={user}>{children}</AppShell>;
}
