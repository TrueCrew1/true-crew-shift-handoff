-- True Crew foundation schema (Phase 1).
-- Establishes companies (tenants), profiles (role + company per auth user), and the
-- audit_log base table. RLS enforces company scoping at the database layer. Later phases
-- add their own tables but must reuse company_id scoping and this audit_log.

create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create type public.user_role as enum ('owner', 'admin', 'painter', 'customer', 'support');

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  company_id uuid not null references public.companies (id) on delete restrict,
  full_name text not null default '',
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  target text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_company_created_idx
  on public.audit_log (company_id, created_at desc);

-- Helper: the company id of the currently authenticated user.
create or replace function public.current_company_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select company_id from public.profiles where id = auth.uid();
$$;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.audit_log enable row level security;

-- Users can read their own company.
create policy "company_select_own" on public.companies
  for select using (id = public.current_company_id());

-- Users can read profiles within their own company.
create policy "profiles_select_same_company" on public.profiles
  for select using (company_id = public.current_company_id());

-- Users can read their own profile.
create policy "profiles_select_self" on public.profiles
  for select using (id = auth.uid());

-- Audit log is readable only within the user's company.
create policy "audit_select_same_company" on public.audit_log
  for select using (company_id = public.current_company_id());

-- Inserts into the audit log must be scoped to the user's company.
create policy "audit_insert_same_company" on public.audit_log
  for insert with check (company_id = public.current_company_id());
