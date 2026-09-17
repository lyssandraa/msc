-- MSC website schema: profiles/roles, content tables, applications, storage.
-- Run this once against a fresh Supabase project (SQL Editor, or `supabase db push`).

-- ── profiles ──────────────────────────────────────────────────────────────
-- One row per auth user. Role drives every RLS policy below.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'analyst' check (role in ('admin', 'analyst')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile whenever a new auth user is created (signup, invite,
-- or manual "Add user" in the dashboard). Role/full_name can be supplied via
-- user_metadata (the invite flow does this); otherwise defaults to analyst.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'analyst')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- security definer + stable so it can be used freely inside RLS policies
-- without recursing back through profiles' own RLS.
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- shared updated_at trigger, used by a couple of tables below
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── memos ────────────────────────────────────────────────────────────────
create type memo_status as enum ('draft', 'pending', 'held', 'exited', 'declined');

create table public.memos (
  id uuid primary key default gen_random_uuid(),
  slug text unique,                      -- set only when this memo has a full page
  ticker text not null,
  company text not null,
  sector text not null,
  status memo_status not null default 'draft',
  status_label text,                     -- e.g. 'Exited -4.1%'; null falls back to a default per status
  is_sample boolean not null default false,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null,             -- snapshot at submission time, so profiles never needs public reads
  summary text not null,                 -- one sentence, shown on the card
  body text not null,                    -- short teaser paragraph, shown on the card
  content_md text,                       -- full markdown page body; null = card-only, no full page
  note_title text,
  note_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint memo_slug_requires_content check ((slug is null) = (content_md is null))
);
create index memos_status_idx on public.memos(status);

create trigger memos_set_updated_at before update on public.memos
  for each row execute procedure public.set_updated_at();

-- ── committee / sector teams ────────────────────────────────────────────
create table public.committee_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  remit text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.sector_teams (
  id uuid primary key default gen_random_uuid(),
  sector text not null unique,
  lead text not null default 'TBC',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── alumni ───────────────────────────────────────────────────────────────
-- The filter-tab `categories` list stays a static array in src/data/alumni.js
-- (fixed UI chrome, not admin-editable content).
create table public.alumni_destinations (
  id uuid primary key default gen_random_uuid(),
  firm text not null,
  category text not null,
  detail text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── updates / news posts (admin-only, no analyst submission) ──────────────
create table public.updates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  date date not null,
  kind text not null,              -- free text, e.g. 'Research' | 'Market note' | 'Fund update'
  title text not null,
  summary text not null,
  body text not null,              -- markdown, rendered via the same component as memos.content_md
  byline text,
  disclaimer text,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger updates_set_updated_at before update on public.updates
  for each row execute procedure public.set_updated_at();

-- ── applications (the /apply form) ─────────────────────────────────────
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  year_of_study text,
  course text,
  cover_note text,
  resume_path text not null,       -- object path inside the 'resumes' storage bucket
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'shortlisted', 'rejected', 'accepted')),
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz
);

-- ── Row Level Security ───────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.memos enable row level security;
alter table public.committee_members enable row level security;
alter table public.sector_teams enable row level security;
alter table public.alumni_destinations enable row level security;
alter table public.updates enable row level security;
alter table public.applications enable row level security;

-- profiles: internal only, never public. Rows are created solely by the
-- auth trigger above; no insert policy is needed (or wanted) here.
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_admin_only" on public.profiles
  for update using (public.is_admin());

-- memos
create policy "memos_public_read_published" on public.memos
  for select using (status in ('held', 'exited', 'declined'));
create policy "memos_author_read_own" on public.memos
  for select using (auth.uid() = author_id);
create policy "memos_admin_read_all" on public.memos
  for select using (public.is_admin());

create policy "memos_analyst_insert_own" on public.memos
  for insert with check (auth.uid() = author_id and status in ('draft', 'pending'));
create policy "memos_admin_insert_any" on public.memos
  for insert with check (public.is_admin());

create policy "memos_author_update_own_unreviewed" on public.memos
  for update using (auth.uid() = author_id and status in ('draft', 'pending'))
  with check (auth.uid() = author_id and status in ('draft', 'pending'));
create policy "memos_admin_update_all" on public.memos
  for update using (public.is_admin());

create policy "memos_admin_delete" on public.memos
  for delete using (public.is_admin());

-- committee / sector teams / alumni: public read, admin-only write
create policy "committee_public_read" on public.committee_members for select using (true);
create policy "committee_admin_write" on public.committee_members for all
  using (public.is_admin()) with check (public.is_admin());

create policy "sector_teams_public_read" on public.sector_teams for select using (true);
create policy "sector_teams_admin_write" on public.sector_teams for all
  using (public.is_admin()) with check (public.is_admin());

create policy "alumni_public_read" on public.alumni_destinations for select using (true);
create policy "alumni_admin_write" on public.alumni_destinations for all
  using (public.is_admin()) with check (public.is_admin());

-- updates: public read of published rows, admin-only write (no analyst policies)
create policy "updates_public_read_published" on public.updates
  for select using (status = 'published');
create policy "updates_admin_read_all" on public.updates
  for select using (public.is_admin());
create policy "updates_admin_insert" on public.updates
  for insert with check (public.is_admin());
create policy "updates_admin_update" on public.updates
  for update using (public.is_admin());
create policy "updates_admin_delete" on public.updates
  for delete using (public.is_admin());

-- applications: public can submit, only admin can read/manage
create policy "applications_public_insert" on public.applications
  for insert to anon, authenticated with check (true);
create policy "applications_admin_select" on public.applications
  for select using (public.is_admin());
create policy "applications_admin_update" on public.applications
  for update using (public.is_admin());
create policy "applications_admin_delete" on public.applications
  for delete using (public.is_admin());

-- ── Storage: resumes bucket ─────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes', 'resumes', false, 5242880,
  array['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

create policy "resumes_public_insert" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'resumes');
create policy "resumes_admin_select" on storage.objects
  for select using (bucket_id = 'resumes' and public.is_admin());
create policy "resumes_admin_delete" on storage.objects
  for delete using (bucket_id = 'resumes' and public.is_admin());
