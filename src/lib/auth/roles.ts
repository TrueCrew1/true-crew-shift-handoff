// Role model for True Crew. These five roles are the foundation every later module
// will scope behavior against. Do not remove a role without a migration plan.

export const ROLES = ["owner", "admin", "painter", "customer", "support"] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  painter: "Painter",
  customer: "Customer",
  support: "Support",
};

// Staff roles operate inside the company; non-staff roles (customer) are external.
export const STAFF_ROLES: readonly Role[] = ["owner", "admin", "painter", "support"];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export function isStaff(role: Role): boolean {
  return STAFF_ROLES.includes(role);
}
