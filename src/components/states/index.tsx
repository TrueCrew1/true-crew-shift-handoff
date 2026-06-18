import type { ReactNode } from "react";
import Link from "next/link";

// Shared, reusable UI states for every future module. Use these instead of inventing
// per-feature loading/empty/error markup so the app stays visually consistent.

function StateShell({
  icon,
  title,
  message,
  action,
  tone = "neutral",
}: {
  icon: string;
  title: string;
  message?: ReactNode;
  action?: ReactNode;
  tone?: "neutral" | "danger" | "warning";
}) {
  const toneRing =
    tone === "danger"
      ? "ring-rose-200 bg-rose-50"
      : tone === "warning"
        ? "ring-amber-200 bg-amber-50"
        : "ring-slate-200 bg-slate-50";
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-12 text-center">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ring-1 ring-inset ${toneRing}`}
        aria-hidden
      >
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      {message ? (
        <p className="mt-1 max-w-md text-sm text-muted">{message}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-12 text-center"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
      <p className="mt-4 text-sm text-muted">{label}</p>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message,
  action,
}: {
  title?: string;
  message?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <StateShell icon="∅" title={title} message={message} action={action} />
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  action,
}: {
  title?: string;
  message?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <StateShell
      icon="!"
      tone="danger"
      title={title}
      message={message}
      action={action}
    />
  );
}

export function UnauthorizedState() {
  return (
    <StateShell
      icon="🔒"
      tone="warning"
      title="Sign in required"
      message="You need to be signed in to view this page."
      action={
        <Link
          href="/login"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-accent-strong hover:text-white"
        >
          Go to sign in
        </Link>
      }
    />
  );
}

export function ForbiddenState() {
  return (
    <StateShell
      icon="⛔"
      tone="danger"
      title="Access denied"
      message="Your role does not have permission to view this page."
      action={
        <Link
          href="/dashboard"
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-slate-50"
        >
          Back to dashboard
        </Link>
      }
    />
  );
}
