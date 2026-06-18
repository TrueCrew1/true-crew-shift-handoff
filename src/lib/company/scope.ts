import type { AppUser } from "@/lib/auth/types";

// Company/account scoping foundation. Every tenant-scoped feature added in later phases
// must derive its scope from here and filter all reads/writes by companyId. When running
// on Supabase this is additionally enforced at the database layer via RLS policies.

export interface CompanyScope {
  companyId: string;
  companyName: string;
}

export function getCompanyScope(user: AppUser): CompanyScope {
  return { companyId: user.companyId, companyName: user.companyName };
}

// Helper for future data layers: attach the active company id to a record before insert.
export function withCompanyScope<T extends Record<string, unknown>>(
  scope: CompanyScope,
  record: T,
): T & { company_id: string } {
  return { ...record, company_id: scope.companyId };
}
