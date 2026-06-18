import type { Role } from "./roles";

// The canonical authenticated user shape used across the whole app. Every module reads
// the current user through this type so auth source (Supabase vs dev) is interchangeable.
export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  // Company/account scoping foundation. Every tenant-scoped record in later phases must
  // be filtered by companyId (and enforced by RLS when running on Supabase).
  companyId: string;
  companyName: string;
}
