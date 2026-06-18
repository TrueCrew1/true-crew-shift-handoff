import type { Permission } from "@/lib/auth/permissions";

// Top-level navigation definition. Each item is gated by a permission; later phases add
// their module entries here and the shell automatically shows/hides them per role.
export interface NavItem {
  label: string;
  href: string;
  permission: Permission;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", permission: "app:access", icon: "▦" },
  { label: "Profile", href: "/profile", permission: "app:access", icon: "◎" },
  { label: "Admin", href: "/admin", permission: "admin:access", icon: "⚙" },
  { label: "Audit Log", href: "/admin/audit", permission: "audit:read", icon: "❒" },
];
