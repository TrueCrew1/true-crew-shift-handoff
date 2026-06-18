import "server-only";
import { isSupabaseConfigured } from "@/lib/auth/config";

// Audit-log base pattern. Later phases record tracked actions (record created, status
// changed, clock-in, invoice sent, ...) through recordAuditEvent so there is a single,
// consistent, company-scoped audit trail. In Supabase mode events are written to the
// `audit_log` table; in dev mode they are kept in an in-process store for inspection.

export interface AuditEventInput {
  actorId: string;
  actorEmail: string;
  companyId: string;
  action: string;
  target?: string;
  metadata?: Record<string, unknown>;
}

export interface AuditEvent extends AuditEventInput {
  id: string;
  at: string;
}

// Dev-only in-memory store. Survives for the lifetime of the running dev server process.
const devAuditStore: AuditEvent[] = [];

export async function recordAuditEvent(input: AuditEventInput): Promise<AuditEvent> {
  const event: AuditEvent = {
    ...input,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { createSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServerClient();
    await supabase.from("audit_log").insert({
      actor_id: event.actorId,
      company_id: event.companyId,
      action: event.action,
      target: event.target ?? null,
      metadata: event.metadata ?? {},
    });
  } else {
    devAuditStore.unshift(event);
    console.log(
      `[audit] ${event.at} ${event.actorEmail} ${event.action}` +
        (event.target ? ` -> ${event.target}` : ""),
    );
  }

  return event;
}

export async function getRecentAuditEvents(
  companyId: string,
  limit = 25,
): Promise<AuditEvent[]> {
  if (isSupabaseConfigured()) {
    const { createSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("audit_log")
      .select("id, actor_id, company_id, action, target, metadata, created_at")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []).map((row) => ({
      id: row.id as string,
      at: row.created_at as string,
      actorId: row.actor_id as string,
      actorEmail: "",
      companyId: row.company_id as string,
      action: row.action as string,
      target: (row.target as string | null) ?? undefined,
      metadata: (row.metadata as Record<string, unknown>) ?? {},
    }));
  }

  return devAuditStore.filter((e) => e.companyId === companyId).slice(0, limit);
}
