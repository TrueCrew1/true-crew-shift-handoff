import type { AppUser } from "./types";

// Seed users for local development / no-Supabase mode. One per role, all scoped to the
// same demo company so role separation and company scoping can be exercised end-to-end.
// In production these come from Supabase Auth + the `profiles` table instead.

interface DevUser extends AppUser {
  password: string;
}

const DEMO_COMPANY = {
  id: "company-truecrew-hq",
  name: "True Crew HQ",
};

// Shared dev password for every seed account (local only).
export const DEV_PASSWORD = "truecrew123";

const DEV_USERS: DevUser[] = [
  {
    id: "user-owner",
    email: "owner@truecrew.test",
    name: "Olivia Owner",
    role: "owner",
    companyId: DEMO_COMPANY.id,
    companyName: DEMO_COMPANY.name,
    password: DEV_PASSWORD,
  },
  {
    id: "user-admin",
    email: "admin@truecrew.test",
    name: "Adam Admin",
    role: "admin",
    companyId: DEMO_COMPANY.id,
    companyName: DEMO_COMPANY.name,
    password: DEV_PASSWORD,
  },
  {
    id: "user-painter",
    email: "painter@truecrew.test",
    name: "Pat Painter",
    role: "painter",
    companyId: DEMO_COMPANY.id,
    companyName: DEMO_COMPANY.name,
    password: DEV_PASSWORD,
  },
  {
    id: "user-customer",
    email: "customer@truecrew.test",
    name: "Casey Customer",
    role: "customer",
    companyId: DEMO_COMPANY.id,
    companyName: DEMO_COMPANY.name,
    password: DEV_PASSWORD,
  },
  {
    id: "user-support",
    email: "support@truecrew.test",
    name: "Sam Support",
    role: "support",
    companyId: DEMO_COMPANY.id,
    companyName: DEMO_COMPANY.name,
    password: DEV_PASSWORD,
  },
];

function toAppUser(user: DevUser): AppUser {
  // Strip the password before the user object leaves this module.
  const { password: _password, ...appUser } = user;
  void _password;
  return appUser;
}

export function authenticateDevUser(email: string, password: string): AppUser | null {
  const match = DEV_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!match || match.password !== password) return null;
  return toAppUser(match);
}

export function findDevUserById(id: string): AppUser | null {
  const match = DEV_USERS.find((u) => u.id === id);
  return match ? toAppUser(match) : null;
}

export function listDevUsers(): AppUser[] {
  return DEV_USERS.map(toAppUser);
}
