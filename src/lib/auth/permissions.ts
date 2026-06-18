import type { Role } from "./roles";

// Centralized permission catalogue. Later phases add their own permissions here and
// extend ROLE_PERMISSIONS — they must NOT scatter ad-hoc role checks across the app.
// Always gate behavior with `can(user, permission)` instead of comparing roles inline.

export const PERMISSIONS = [
  "app:access", // can enter the authenticated app shell
  "admin:access", // can open the admin area
  "audit:read", // can view the audit log
  "company:manage", // can manage company/account level settings
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: ["app:access", "admin:access", "audit:read", "company:manage"],
  admin: ["app:access", "admin:access", "audit:read"],
  support: ["app:access", "audit:read"],
  painter: ["app:access"],
  customer: ["app:access"],
};

export function permissionsForRole(role: Role): readonly Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function roleCan(role: Role, permission: Permission): boolean {
  return permissionsForRole(role).includes(permission);
}
