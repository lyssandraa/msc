# MSC website

React + Vite + Tailwind. Fully static, no backend, no database.

Almost all content (Research, Updates, Committee, Alumni, Sponsors) comes
from published Google Sheets that the site reads at runtime, filled in via
Google Forms — no code change needed for any of it. Only the Thesis/Process
pages are still edited directly in the code. See
[docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) for how to use the Forms, or
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the technical picture.

## Setup

1. Install Node (LTS) from nodejs.org. This gives you `npm` too.
2. Clone the repo and go into it:

```bash
git clone https://github.com/lyssandraa/msc.git
cd msc
```

3. Install the packages. Only needed once:

```bash
npm install
```

4. Run it:

```bash
npm run dev
```

Open http://localhost:5173. Leave it running while you work, it reloads on save.

## Where things are

```
src/data/              principles.js/process.js (governance text) and
                       alumni.js (the fixed Alumni filter-tab categories)
src/pages/              one file per page
src/components/         shared UI
src/hooks/               useSheetResearchReports.js, useSheetUpdates.js,
                         useSheetCommittee.js, useSheetAlumni.js,
                         useSheetSponsors.js - fetch + parse the published
                         Google Sheets
src/lib/csv.js           tiny CSV parser
src/lib/driveLinks.js    converts Google Drive file links into usable URLs
src/App.jsx              routes
```

## Making a content change

**Research, Updates, Committee, Alumni, Sponsors** — don't touch the code.
Fill in the relevant Google Form (ask whoever manages the site for the
links, or see docs/ADMIN-GUIDE.md). It appears on the live site within a
few minutes. To edit or delete something already submitted, edit the row
directly in that Form's linked Google Sheet — see docs/ADMIN-GUIDE.md.

**Thesis and Process pages** — edit the file directly:

```
src/data/principles.js  Thesis page
src/data/process.js     Process page
```

Then save, check the browser, and push it:

```bash
git add .
git commit -m "what you changed"
git push
```

See docs/ARCHITECTURE.md for how the Google Sheets content model works,
including the one-time Drive sharing setup each form's uploads need.
