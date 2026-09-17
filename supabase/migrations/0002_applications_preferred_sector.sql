-- Adds a preferred-sector field to applications, so the committee can route
-- applicants toward a sector team. Run this after 0001_init.sql.
alter table public.applications add column preferred_sector text;
