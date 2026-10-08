# Architecture (for developers)

## Stack

React 18 + Vite 5 + Tailwind v4 (`@tailwindcss/vite`), `react-router-dom` v6.
**No backend, no database, no auth.** The site is a pure static build - it
can be hosted anywhere that serves static files, with one caveat, see
"Client-side routing" below.

This is a deliberate pivot from an earlier version of this project that used
Supabase (Postgres + Auth + Storage) for everything, including a full
committee dashboard. That was rolled back per client direction, in favour of
something with zero ongoing infrastructure to run or pay for. If you're
looking at git history and see a `website-improvements` branch with a
dashboard/login system, that's the abandoned approach - this is what
replaced it.

## Local setup

```bash
npm install
npm run dev
```

That's it - no environment variables, no accounts to set up. Everything the
site needs is either bundled at build time (static data files) or fetched
from public URLs at runtime (the Google Sheets, see below).

## Deployment

Live on Vercel, deployed from the `main` branch of the
`lyssandraa/msc` fork (Vercel auto-deploys on every push). `vercel.json`
holds the one piece of config needed - a rewrite so client-side routes don't
404 on refresh (see "Client-side routing" below).

The custom domain (`merseystudentcapital.co.uk`, via Namecheap) points at
Vercel with an A record (`@` → the IP Vercel's domain settings show) and a
CNAME (`www` → the `*.vercel-dns-*.com` target Vercel shows) - both visible
under the project's Settings → Domains page if they ever need redoing. DNS
only needs touching again if the domain or its registrar changes; it does
not need to be revisited for routine content or code changes.

## Content model

Content falls into two groups:

| Content | Source | Why |
|---|---|---|
| Research reports, Updates, Committee, sector teams, alumni, sponsors | Published Google Sheets (via Google Forms) | Changes often, needs file uploads for some - a database-free CMS |
| Thesis principles, Process steps | Static files in `src/data/` | Governance/policy text, changes about once a year |
| Applications | External Google Form (just a link-out button) | No data collection on our side at all |

Five hooks follow the Google Sheets pattern, one per `src/data/`-free
section:

| Hook | Sheet feeds | Page(s) |
|---|---|---|
| `useSheetResearchReports.js` | Research reports | `Research.jsx`, `Home.jsx` |
| `useSheetUpdates.js` | Updates / news posts | `Updates.jsx`, `updates/UpdateDetail.jsx` |
| `useSheetCommittee.js` | Committee members + sector teams (one sheet, two kinds of row) | `Committee.jsx` |
| `useSheetAlumni.js` | Alumni destinations | `Alumni.jsx` |
| `useSheetSponsors.js` | Sponsors | `Sponsors.jsx` |

`src/data/alumni.js` still exists, but only for the `categories` array - the
fixed set of filter-tab labels/ids shown on `/alumni`. That's intentionally
not sheet-driven; see "Alumni categories are a closed set" below.

## The Google Sheets pattern

All five hooks share the same shape, via the common `useSheetCsv.js`:

1. A Google Form collects submissions (question titles = the eventual CSV
   column headers - they must match exactly what the hook expects).
2. Responses land in a linked Google Sheet.
3. That Sheet's general access is set to "Anyone with the link" (Share →
   General access), which makes `https://docs.google.com/spreadsheets/d/<ID>/export?format=csv`
   a public, unauthenticated CSV endpoint - no Google API key, no OAuth,
   no backend needed to read it.
4. `useSheetCsv.js` `fetch()`s that URL client-side, parses it with the
   small hand-rolled parser in `src/lib/csv.js` (handles quoted fields with
   embedded commas - Google's CSV export needs this, e.g. for multi-sentence
   summaries), and runs it through the hook's own `mapRow` to the shape the
   page components expect. It also does a dev-time `console.warn` if the
   fetched sheet is missing a column the hook expects, to catch a renamed
   Form question before it silently breaks.

**This means every visitor's browser fetches the Sheet directly on page
load.** There's no build step, no caching layer, no server in between - a
new Form submission shows up on the site as soon as the visitor's fetch
happens to land after Google's cache refreshes (typically within a few
minutes, not instant).

### Column mapping

The hooks match Sheet columns by **header name**, not position - so
question order in the Form doesn't matter, only the exact title text does.
Each hook's `COLUMNS` constant is the source of truth for what its Form's
questions must be titled. If a question is renamed in the Form, update the
matching `COLUMNS` entry (or vice versa) - they will silently drift apart
otherwise (a missing column just comes through as an empty string, not an
error - though the dev-time column-check warning above will flag it in the
console).

### Committee: one Form, two kinds of row

The Committee Form uses Google Forms' answer-based branching: a `Type`
question (`Committee member` / `Sector team`) routes to one of two sections,
so a respondent only sees the fields relevant to what they're adding. Both
branches write into the same linked Sheet, so its columns are the union of
both: `Type, Name, Role, Remit, Sector, Head Analyst` - any row only has the
columns for its own branch filled in, the rest blank.

`useSheetCommittee.js` reads that one sheet and splits it client-side into
`{ committee, sectorTeams }` by filtering on the `Type` column
(case-insensitive). If a row's `Type` doesn't match either exactly, it's
silently dropped from both lists - worth knowing if a committee member
"doesn't show up" after submitting.

### Alumni categories are a closed set

The Alumni Form's `Category` question is a **dropdown**, not free text, with
options fixed to match `categories` in `src/data/alumni.js` exactly
(`Investment banking`, `Asset management`, `Private markets`, `Technology`).
`useSheetAlumni.js`'s `CATEGORY_IDS` map converts the Form's human-readable
answer into the id the filter tabs use (`'Investment banking'` → `'banking'`,
etc.). Adding a new category means updating **three** places in step: the
Form's dropdown options, `CATEGORY_IDS` in the hook, and the `categories`
array in `src/data/alumni.js` - this can't be done by editing the Sheet
alone.

### Updates: slugs are generated, not collected

The Updates Form has no "slug" question - `useSheetUpdates.js` derives one
from the title via `src/lib/slugify.js`, de-duplicating with a numeric
suffix if two posts share a title. This is why `/updates/:slug` works even
though slugs never appear in the Sheet.

### File uploads: Google Drive links

PDF, cover-image, and sponsor-logo questions store a Drive share link in the
response cell (e.g. `https://drive.google.com/open?id=...`).
`src/lib/driveLinks.js` extracts the file ID (a regex for a long
alphanumeric/-/_ run - more robust than trying to match every URL shape
Drive/Forms produces) and builds:

- `driveViewUrl()` - a `.../file/d/<id>/view` link, used for "Download PDF"
- `driveImageUrl()` - a `.../thumbnail?id=<id>&sz=w800` link, used for
  `<img src>` cover images and sponsor logos

**Non-obvious Google/Drive gotchas that caused real confusion while building
this, worth knowing before "fixing" something that isn't broken:**

1. **Files uploaded through a Form are not public by default.** They land
   in a Drive folder owned by the Form's account, and that folder's sharing
   defaults to "Restricted." The fix is a one-time folder-level share
   setting (right-click the folder in Drive → Share → General access →
   Anyone with the link), which retroactively covers files already in it
   too. Until that's done, PDFs/images/logos will silently fail (broken
   `<img>`, 0 `naturalWidth`) for anyone not signed into the Drive account
   that owns the form - this is the single most common support request to
   expect ("my image isn't showing up").
2. **Any Google Form containing a file-upload question requires the
   respondent to be signed into a Google account.** This is a hard Google
   Forms rule, not a toggle - it cannot be turned off. It applies to
   Research, Sponsors, and the Applications form, all of which have an
   upload question. Accepted as a reasonable trade-off for a university
   audience (see `src/pages/Apply.jsx`'s note to applicants), not something
   to try to work around.
3. **Google Form/Sheet ownership can't be transferred across a personal
   Gmail ↔ Workspace domain boundary.** Google's "Make owner" option is
   blocked (greyed out, or an explicit error) when the two accounts aren't
   in the same organization - a Workspace admin setting does **not**
   override this, it's a hard rule. The actual forms/sheets in production
   are owned by `admin@merseystudentcapital.co.uk`, reached by having that
   account use **Make a copy** on each form (and creating a fresh linked
   spreadsheet for each copy) rather than transferring the originals. If
   the live sheet URLs ever need to move again (new owner, recreated form),
   that's the way to do it - update the `SHEET_CSV_URL` constant in the
   relevant hook (and `site.applicationUrl` in `site.config.js` for
   Applications) to match.

## Applications

`src/pages/Apply.jsx` is a plain link-out button to an external Google Form
(`site.applicationUrl` in `site.config.js`) - no data flows through this
site's code at all. Reviewing applications means opening that Form's own
Responses tab (or its linked Sheet) directly in Google Forms; there is no
review UI here. CVs are uploaded Drive files attached to each response, same
file-upload mechanics (and sign-in requirement) as above.

## Rendering markdown safely

Update bodies are markdown, rendered via `react-markdown` + `remark-gfm`
through `src/components/MarkdownContent.jsx`. Deliberately **no**
`rehype-raw` plugin - without it, any HTML/script tags typed into a Form
response render as inert text, not executed. Don't add `rehype-raw` without
also adding a sanitizer (e.g. `rehype-sanitize`) alongside it.

## Client-side routing

`react-router-dom`'s `BrowserRouter` needs the host to serve `index.html`
for any path it doesn't recognise as a static file (so `/updates/some-post`
loads the app instead of 404ing). `vercel.json`'s rewrite rule handles this
in production. If this ever moves off Vercel to a host without rewrite
support (e.g. GitHub Pages), either add that host's equivalent redirect
trick or switch to `HashRouter` (uglier URLs like `/#/updates/some-post`,
but zero extra config).

## Non-goals (don't "fix" these)

- No draft/review workflow for any sheet-backed section - a Form submission
  is live as soon as the Sheet's CSV cache refreshes. If that's ever a
  problem, the cheapest fix is a manual status column in the Sheet that the
  relevant hook filters on, not a rebuild of the whole content model.
- No CAPTCHA/spam protection on the Google Forms beyond whatever Google
  provides by default - not something this codebase controls.
- No cross-page caching or request de-duplication between hooks (e.g.
  `Home.jsx` and `Research.jsx` each independently fetch the Research
  sheet). Traffic is low enough that this isn't worth the complexity.
