# Architecture (for developers)

## Stack

- React 18 + Vite 5 + Tailwind v4 (`@tailwindcss/vite`), `react-router-dom` v6.
- **Supabase** (Postgres + Auth + Storage) is the backend. There is no other server,
  except two small serverless functions (inviting users, emailing applicants) —
  see "Server-side secrets" below.
- Deployed on Vercel. `vercel.json` rewrites all paths to `index.html` for
  client-side routing.

## Local setup

1. Install Node (LTS), `npm install`.
2. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` /
   `VITE_SUPABASE_ANON_KEY` from your Supabase project's **Settings → API** page.
3. `npm run dev`, open the printed localhost URL.

`.env.local` is gitignored. The `VITE_`-prefixed vars are inlined into the
client bundle at build time and are **meant to be public** — security comes
from Supabase row level security (RLS) policies, not from keeping the anon
key secret. Don't be alarmed seeing it in the built JS; that's expected.

## Standing up a fresh Supabase project

Needed once per environment. All of this is manual, done in the Supabase
dashboard — nothing here can be scripted by an AI agent without dashboard/API
credentials.

1. Create a free Supabase project (pick a region near your users, e.g.
   `eu-west-2` for a UK-based site).
2. Open the SQL Editor and run, **in order**: `supabase/migrations/0001_init.sql`,
   `0002_applications_preferred_sector.sql`, `0003_research_sponsors_single_tier.sql`,
   then `supabase/seed.sql` (ports today's placeholder committee/sector/alumni/updates
   content so the site isn't blank). Research reports and sponsors aren't seeded —
   add the first few through `/dashboard/research` and `/dashboard/sponsors` once
   the site is live, since both need a real uploaded file.
3. **Authentication → Providers**: confirm Email/Password is enabled (default).
4. **Authentication → URL Configuration**: set the Site URL to your
   production domain, and add `http://localhost:5173` as an additional
   redirect URL for local dev.
5. Create the first account by hand (**Authentication → Users → Add user**).
   No promotion step needed — every account is an admin (see Auth below).
   Everyone after that is created through the in-app invite flow.
6. Copy the Project URL and `anon` `public` key into `.env.local` (local) and
   into Vercel's Project Settings → Environment Variables as
   `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (Production + Preview), plus
   `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` (both server-only, see
   "Server-side secrets").

## Schema

Tables live across `supabase/migrations/0001_init.sql`,
`0002_applications_preferred_sector.sql` and `0003_research_sponsors_single_tier.sql`
(migrations are additive/corrective, applied in order — read all three for
the full current shape, don't assume 0001 alone is up to date). Summary:

| Table | Purpose | Public read? | Who can write |
|---|---|---|---|
| `profiles` | one row per auth user (just `full_name` — no role column) | no — self or any authenticated user | any authenticated user (rows are created by a trigger on signup) |
| `research_reports` | PDF research reports on `/research`, filterable by free-text `category` | yes, always | authenticated only |
| `sponsors` | logos on `/sponsors` | yes, always | authenticated only |
| `committee_members` | `/committee` | yes | authenticated only |
| `sector_teams` | `/committee` | yes | authenticated only |
| `alumni_destinations` | `/alumni` | yes | authenticated only |
| `updates` | `/updates` news posts | rows with `status = 'published'` | authenticated only |
| `applications` | `/apply` form submissions | no (insert-only for the public) | public: insert only; authenticated: read/update/delete |

`principles.js` and `process.js` deliberately **stay static files**, not
tables — they're governance/policy text that changes about once a year and
is edited by a developer via PR, not day-to-day content. Don't "fix" this by
migrating them to the DB; it was a scope decision, not an oversight.

Storage buckets: `resumes` (private — anyone can upload via `/apply`, only an
authenticated user can list/read/delete, via a short-lived signed URL from
the dashboard); `research` and `sponsors` (both **public** — PDFs/cover
images/logos are served from a stable public URL with no auth needed, since
this content is meant to be fully public; uploads are still authenticated-only).

### The retired "memo" model

Earlier phases of this project published individual stock-thesis "memos"
(one page per company, analyst-submitted, admin-reviewed). That entire model
was retired in migration `0003` per client direction: investment research
stays internal and is never published; the public site instead publishes
category-organised PDF research reports (`research_reports`) that an admin
uploads directly, with no draft/review workflow. If you find references to
"memos" anywhere outside old git history, that's dead code — delete it, it
was missed during the `0003` cleanup, not a hidden feature.

## Auth & roles

**Single tier: every account is an admin.** There is no analyst role or
public signup — the only way to get an account is an existing admin
inviting you from `/dashboard/users`. `profiles` has no `role` column.

`public.is_admin()` (used throughout the RLS policies) is kept under its
original name for historical reasons but its body was redefined in `0003`
to just `select auth.uid() is not null` — i.e. "is logged in". Every
policy that calls it therefore means "any authenticated user", not
"admin specifically". This was a deliberate low-risk shortcut (it meant not
having to rewrite every existing policy across every table when the role
tier was collapsed) — don't be misled by the name into thinking there's a
privilege distinction that no longer exists.

`RequireAuth` (`src/components/auth/RequireAuth.jsx`) is a pure
"must be logged in" gate — it no longer accepts a `roles` prop.

## Server-side secrets

Two secrets exist, each used by exactly one file, both server-only (never
`VITE_`-prefixed, never in `.env.example` with a real value, never imported
anywhere under `src/`). If you ever see either referenced anywhere else,
that's a bug.

- `SUPABASE_SERVICE_ROLE_KEY` — used only by `api/invite-user.js`, to call
  Supabase's admin API when inviting a new user.
- `RESEND_API_KEY` — used only by `api/notify-applicant.js`, to email an
  applicant when their status in `/dashboard/applications` is set to
  `accepted` or `rejected`. `RESEND_FROM_EMAIL` (optional, same file) sets
  the sending address; without a domain verified in Resend, mail only
  delivers to the Resend account's own email, not real applicants — verify
  a domain there before relying on this in production.

Testing either endpoint locally requires the Vercel CLI (`vercel dev`) or a
Preview deployment — plain `npm run dev` (Vite) does not run `/api`
functions.

## Rendering markdown safely

Update bodies (`updates.body`) are markdown, rendered via `react-markdown` +
`remark-gfm` through the shared `MarkdownContent` component. We deliberately
do **not** add the `rehype-raw` plugin — without it, any HTML/script tags
typed into a markdown field are rendered as inert text, not executed. Don't
add `rehype-raw` without re-threading a sanitizer (e.g. `rehype-sanitize`)
alongside it.

## Data-fetching layer

Plain hooks in `src/hooks/` (`useSupabaseQuery` is the shared
loading/data/error primitive; each resource — `useResearchReports`,
`useSponsors`, `useUpdates`, `useCommittee`, etc. — wraps one query). No
cache/query library, deliberately, to stay minimal for this traffic level —
this means every fresh page mount refetches, so expect a brief loading flash
on first visit to a data-driven page rather than instant paint.

## Dashboard

Everything under `/dashboard/*`, gated by `RequireAuth`. All six
content-management screens (`ManageResearch`, `ManageUpdates`,
`ManageCommittee`, `ManageAlumni`, `ManageSponsors`) route through one
generic engine, `src/components/dashboard/RecordsAdmin.jsx` — it owns the
fetch/create/edit/delete lifecycle and loading/error states; each page just
configures it (table name, ordering, a `renderFields` component for the
actual inputs, and an optional `buildPayload` hook for tables that need to
upload a file before saving). `TextFieldsForm.jsx` is the default
`renderFields` for the three plain-text tables (`committee_members`,
`sector_teams`, `alumni_destinations`); `ResearchFieldsForm.jsx`,
`SponsorFieldsForm.jsx` and `UpdateFieldsForm.jsx` are the custom ones.
Don't hand-roll another page's worth of load/save/delete state — extend
`RecordsAdmin` instead, that's the whole reason it exists.

## Apply form + resume upload

`src/pages/Apply.jsx`. Client-side validation (required fields via native
HTML `required` — don't add `noValidate` to this form without also adding
equivalent JS checks, a previous version of this page had a bug where
`noValidate` silently disabled all required-field enforcement) plus a
honeypot field. Submits a resume to the private `resumes` bucket, then
inserts a row into `applications`.

## Deployment

Vercel, connected to this repo. Required environment variables (Production
+ Preview): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` (and optionally
`RESEND_FROM_EMAIL`).

## Non-goals (don't "fix" these)

- Updates/news posts have no analyst submission workflow — there is no
  analyst role at all (see Auth & roles above).
- Research reports have no draft/review workflow — an admin only inserts a
  row once the PDF is ready, so every row is immediately public.
- The `/apply` form's spam protection is a honeypot field only. No CAPTCHA.
  If spam becomes a real problem, the first thing to add is something like
  Cloudflare Turnstile, not a bigger rewrite.
- `principles.js` / `process.js` stay static files (see Schema above).
- Research report categories are free text, not a fixed taxonomy — the
  filter row on `/research` is derived from whatever categories are
  actually in use. Don't hardcode a category list.
- Applicant emails only fire on `accepted`/`rejected`, not on every status
  change (`new`/`reviewed`/`shortlisted` are internal-only). If a status
  update succeeds but the email fails, the status change is kept and the
  admin just sees an alert — there's no retry queue.
