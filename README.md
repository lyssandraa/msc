# MSC website

React + Vite + Tailwind. Fully static, no backend, no database.

Most content is either edited directly in the code (Committee, Alumni,
Sponsors, the Thesis/Process pages) or comes from a published Google Sheet
that the site reads at runtime (Research, Updates) — filled in via a Google
Form, no code change needed for those two. See
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
src/data/            static content: committee, alumni, sponsors,
                      principles.js/process.js (governance text)
src/pages/            one file per page
src/components/       shared UI
src/hooks/             useSheetResearchReports.js / useSheetUpdates.js -
                       fetch + parse the published Google Sheets
src/lib/csv.js         tiny CSV parser
src/lib/driveLinks.js  converts Google Drive file links into usable URLs
src/App.jsx            routes
```

## Making a content change

**Research reports and Updates** — don't touch the code. Fill in the
relevant Google Form (ask whoever manages the site for the links, or see
docs/ADMIN-GUIDE.md). It appears on the live site within a few minutes.

**Everything else** (Committee, Alumni, Sponsors, the Thesis/Process
pages) — edit the file directly:

```
src/data/people.js      committee members, sector teams
src/data/alumni.js      alumni destinations
src/data/sponsors.js    sponsors (put logo images in public/sponsors/)
src/data/principles.js  Thesis page
src/data/process.js     Process page
```

Then save, check the browser, and push it:

```bash
git add .
git commit -m "what you changed"
git push
```

## Not real yet

- the contact email in `site.config.js` is a placeholder
- alumni destinations and sector team leads are placeholders (`[Firm]`, `TBC`)
- no sponsors listed yet
