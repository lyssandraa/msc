-- Pivots the site per client feedback:
--   1. Retire the "memo" model (individual stock theses, analyst submission
--      workflow) entirely - investment research stays internal, never
--      published. Replaced by category-organised, PDF-linked research
--      reports that only admins publish.
--   2. Collapse to a single tier: every account is an admin. There is no
--      more analyst role, so is_admin() is redefined to mean "logged in"
--      (see comment below) rather than dropped, to avoid rewriting every
--      existing policy that already calls it.
--   3. Adds a public "sponsors" section.
-- Run after 0001_init.sql and 0002_applications_preferred_sector.sql.

-- ── retire memos ────────────────────────────────────────────────────────
drop table if exists public.memos cascade;
drop type if exists memo_status;

-- ── single-tier auth ────────────────────────────────────────────────────
alter table public.profiles drop column if exists role;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

-- Kept under its original name (referenced by every existing RLS policy)
-- but the meaning has changed: there is no more admin/analyst distinction,
-- so this now just means "is logged in". Every account IS an admin - see
-- docs/ARCHITECTURE.md.
create or replace function public.is_admin()
returns boolean as $$
  select auth.uid() is not null;
$$ language sql security definer stable;

-- ── research reports ────────────────────────────────────────────────────
-- No draft/review workflow: an admin only inserts a row once the PDF is
-- ready to publish, so every row is public immediately.
create table public.research_reports (
  id uuid primary key default gen_random_uuid(),
  category text not null,          -- free text (e.g. 'Fixed Income'); filter
                                    -- options are derived from distinct
                                    -- values in use, not a fixed taxonomy
  title text not null,
  summary text,
  pdf_path text not null,          -- object path in the 'research' bucket
  cover_image_path text,           -- optional object path, same bucket
  published_at date not null default current_date,
  created_at timestamptz not null default now()
);
create index research_reports_category_idx on public.research_reports(category);

alter table public.research_reports enable row level security;
create policy "research_reports_public_read" on public.research_reports
  for select using (true);
create policy "research_reports_admin_write" on public.research_reports
  for all using (public.is_admin()) with check (public.is_admin());

-- ── sponsors ────────────────────────────────────────────────────────────
create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_path text not null,         -- object path in the 'sponsors' bucket
  website_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.sponsors enable row level security;
create policy "sponsors_public_read" on public.sponsors
  for select using (true);
create policy "sponsors_admin_write" on public.sponsors
  for all using (public.is_admin()) with check (public.is_admin());

-- ── storage: research (PDFs + cover images) and sponsors (logos) ───────
-- Both public buckets: files are served from a stable public URL with no
-- auth needed, which is what we want for content the client confirmed is
-- meant to be fully public. Writes are still admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'research', 'research', true, 20971520,
  array['application/pdf', 'image/png', 'image/jpeg', 'image/webp']
);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'sponsors', 'sponsors', true, 5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
);

create policy "research_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'research' and public.is_admin());
create policy "research_admin_update" on storage.objects
  for update using (bucket_id = 'research' and public.is_admin());
create policy "research_admin_delete" on storage.objects
  for delete using (bucket_id = 'research' and public.is_admin());

create policy "sponsors_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'sponsors' and public.is_admin());
create policy "sponsors_admin_update" on storage.objects
  for update using (bucket_id = 'sponsors' and public.is_admin());
create policy "sponsors_admin_delete" on storage.objects
  for delete using (bucket_id = 'sponsors' and public.is_admin());
