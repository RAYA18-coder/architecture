create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text not null,
  tier text not null,
  style text,
  budget_range text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
create policy "anyone can submit inquiry" on public.inquiries for insert to anon, authenticated with check (true);