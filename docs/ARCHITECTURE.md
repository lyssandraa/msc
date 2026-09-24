# Architecture (for developers)

## Stack

React 18 + Vite 5 + Tailwind v4 (`@tailwindcss/vite`), `react-router-dom` v6.
**No backend, no database, no auth.** The site is a pure static build - it
can be hosted anywhere that serves static files (GitHub Pages, Vercel,
Netlify, etc.) with one caveat, see "Client-side routing" below.

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
from public URLs at runtime (the two Google Sheets, see below).

## Content model

Three different ways content gets into the site, by design - not every
piece of content needs the same level of "editable without touching code":

| Content | Source | Why |
|---|---|---|
| Research reports | Published Google Sheet (via a Google Form) | Changes often, needs a PDF/cover image upload - a database-free CMS |
| Updates (news posts) | Published Google Sheet (via a Google Form) | Same reasoning as Research |
| Committee, sector teams, alumni, sponsors | Static files in `src/data/` | Changes rarely enough that a developer editing code and pushing is fine |
| Thesis principles, Process steps | Static files in `src/data/` | Governance/policy text, changes about once a year |
| Applications | External Google Form (just a link-out button) | No data collection on our side at all |

## Research and Updates: the Google Sheets pattern

Both `src/hooks/useSheetResearchReports.js` and `src/hooks/useSheetUpdates.js`
follow the same shape:

1. A Google Form collects submissions (question titles = the eventual CSV
   column headers - they must match exactly what the hook expects).
2. Responses land in a linked Google Sheet.
3. That Sheet's general access is set to "Anyone with the link" (Share →
   General access), which makes `https://docs.google.com/spreadsheets/d/<ID>/export?format=csv`
   a public, unauthenticated CSV endpoint - no Google API key, no OAuth,
   no backend needed to read it.
4. The hook `fetch()`s that URL client-side, parses it with the small
   hand-rolled parser in `src/lib/csv.js` (handles quoted fields with
   embedded commas - Google's CSV export needs this, e.g. for multi-sentence
   summaries), and maps rows to the shape the page components expect.

**This means every visitor's browser fetches the Sheet directly on page
load.** There's no build step, no caching layer, no server in between - a
new Form submission shows up on the site as soon as the visitor's fetch
happens to land after Google's "publish to web" cache refreshes (typically
within a few minutes, not instant).

### Column mapping

The hooks match Sheet columns by **header name**, not position - so
question order in the Form doesn't matter, only the exact title text does.
`useSheetResearchReports.js`'s `COLUMNS` constant and `useSheetUpdates.js`'s
`COLUMNS` constant are the source of truth for what each Form's questions
must be titled. If a question is renamed in the Form, update the matching
`COLUMNS` entry (or vice versa) - they will silently drift apart otherwise
(a missing column just comes through as an empty string, not an error).

### Updates: slugs are generated, not collected

The Updates Form has no "slug" question - `useSheetUpdates.js` derives one
from the title via `src/lib/slugify.js`, de-duplicating with a numeric
suffix if two posts share a title. This is why `/updates/:slug` works even
though slugs never appear in the Sheet.

### File uploads: Google Drive links

PDF and cover-image questions store a Drive share link in the response cell
(e.g. `https://drive.google.com/open?id=...`). `src/lib/driveLinks.js`
extracts the file ID (a regex for a long alphanumeric/-/_ run - more robust
than trying to match every URL shape Drive/Forms produces) and builds:

- `driveViewUrl()` - a `.../file/d/<id>/view` link, used for "Download PDF"
- `driveImageUrl()` - a `.../thumbnail?id=<id>&sz=w800` link, used for
  `<img src>` cover images

**Two non-obvious Google/Drive gotchas that caused real confusion while
building this, both worth knowing before "fixing" something that isn't
broken:**

1. **Files uploaded through a Form are not public by default.** They land
   in a Drive folder owned by the Form's account, and that folder's sharing
   defaults to "Restricted." The fix is a one-time folder-level share
   setting (right-click the folder in Drive → Share → General access →
   Anyone with the link), which retroactively covers files already in it
   too. Until that's done, PDFs/images will silently fail for anyone not
   signed into the same Google account that owns the form.
2. **Any Google Form containing a file-upload question requires the
   respondent to be signed into a Google account.** This is a hard Google
   Forms rule, not a toggle - it cannot be turned off. It applies to the
   Applications form (CV upload) too. Accepted as a reasonable trade-off
   for a university student audience (see `src/pages/Apply.jsx`'s note to
   applicants), not something to try to work around.

## Applications

`src/pages/Apply.jsx` is a plain link-out button to an external Google Form
(`site.applicationUrl` in `site.config.js`) - no data flows through this
site's code at all. Reviewing applications means opening that Form's own
Responses tab (or its linked Sheet) directly in Google Forms; there is no
review UI here.

## Rendering markdown safely

Update bodies are markdown, rendered via `react-markdown` + `remark-gfm`
through `src/components/MarkdownContent.jsx`. Deliberately **no**
`rehype-raw` plugin - without it, any HTML/script tags typed into a Form
response render as inert text, not executed. Don't add `rehype-raw` without
also adding a sanitizer (e.g. `rehype-sanitize`) alongside it.

## Client-side routing

`react-router-dom`'s `BrowserRouter` needs the host to serve `index.html`
for any path it doesn't recognise as a static file (so `/updates/some-post`
loads the app instead of 404ing). This works out of the box on Vercel/Netlify
(SPA rewrite rules) but **not** on GitHub Pages, which has no rewrite
config - if deploying there, either add the standard GitHub Pages
404.html-redirect trick, or switch to `HashRouter` (uglier URLs like
`/#/updates/some-post`, but zero extra config).

## Non-goals (don't "fix" these)

- No draft/review workflow for Research or Updates - a Form submission is
  live as soon as the Sheet's CSV cache refreshes. If that's ever a
  problem, the cheapest fix is a manual status column in the Sheet that the
  hook filters on, not a rebuild of the whole content model.
- No CAPTCHA/spam protection on the Google Forms beyond whatever Google
  provides by default - not something this codebase controls.
- Committee/Alumni/Sponsors are static files on purpose, not an oversight -
  see "Content model" above for why.
