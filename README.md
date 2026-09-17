# MSC website

React + Vite + Tailwind, backed by Supabase (Postgres + Auth + Storage).
Committee members log in at `/login` and manage content at `/dashboard` —
most day-to-day content changes don't need a code change at all. See
[docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) for how to use the dashboard
(no coding needed), or [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the
full technical picture (schema, auth model, deployment).

## Setup

1. Install Node (LTS) from nodejs.org. This gives you `npm` too.
2. Clone the repo and go into it:

```bash
git clone https://github.com/LemarTokham/msc.git
cd msc
```

3. Install the packages. Only needed once:

```bash
npm install
```

4. Copy `.env.example` to `.env.local` and fill in the Supabase project
   URL/key (see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for where to
   get these, and how to stand up a fresh Supabase project if you don't
   have one yet).

5. Run it:

```bash
npm run dev
```

Open http://localhost:5173. Leave it running while you work, it reloads on save.

## Where things are

```
src/data/                 the few things that stay hand-edited files:
                           site.config.js (nav, contact email),
                           principles.js / process.js (governance text)
src/pages/                 one file per public page
src/pages/dashboard/       admin screens (content management, behind login)
src/components/            shared UI
src/hooks/                  data-fetching from Supabase
src/App.jsx                 routes
supabase/migrations/       database schema, in order
api/                        two serverless functions: inviting new users,
                            emailing applicants on accept/reject
docs/ADMIN-GUIDE.md        how to use the dashboard (no coding needed)
docs/ARCHITECTURE.md       technical setup, schema, deployment
```

## Making a content change

Most content — research reports, updates, committee, alumni, sponsors,
applications — is edited at `/dashboard` after logging in, not in code.
`site.config.js` (nav links, contact email) and `principles.js`/`process.js`
(governance text) are the exceptions and still need a code change:

1. edit, save, check the browser
2. push it:

```bash
git add .
git commit -m "what you changed"
git push
```

## Not real yet

- the contact email in `site.config.js` is a placeholder
- update notes seeded from before this rebuild are templates, dates made up
