# Mersey Student Capital website

The society's website. Frontend only, no backend, no database.

**This is a template.** The layout and design are finished, but most of the text is
placeholder written to show what a real page would look like. None of it is live or
real yet. See "What needs filling in" at the bottom.

## Running it

Needs Node 18 or newer.

```bash
npm install
npm run dev      # opens on http://localhost:5173
npm run build    # production build, if you want to check it compiles
```

## What it's built with

React and Vite, with Tailwind CSS for styling and React Router for pages.

If you haven't used Tailwind: the class names on each element _are_ the styling.
`text-mute` sets the colour, `mt-6` sets the top margin, `md:grid-cols-4` makes it four
columns on wider screens. You don't write CSS, you add class names. The colours and
fonts are defined once at the top of `src/index.css`.

## Where things are

```
src/
  App.jsx           every page/route is listed here
  site.config.js    nav links, application form link, contact email
  index.css         colours and fonts
  components/       shared pieces (header, footer, memo card, layout)
  data/             the actual text content of the site
  pages/            one file per page
public/             logos
```

**The text content lives in `src/data/`.** That's the folder you want for most edits.
The files in `pages/` handle layout, not wording.

## Making changes

**Change the apply link or contact email**
`src/site.config.js`. Both are fake placeholders right now.

**Change committee members or sector teams**
`src/data/people.js`.

**Change colours or fonts**
`src/index.css`, the block at the top. Change a colour there and it updates everywhere.

**Add a research memo**
Add an entry to `src/data/memos.js` and it appears on the research page. If it needs a
full write-up page too, copy `src/pages/memos/Greggs.jsx`, give your entry a `slug`,
and add a line for it in `src/App.jsx`.

**Add an update note**
Same idea: `src/data/updates.js` for the listing, then copy one of the files in
`src/pages/updates/` for the full note, then add it to `src/App.jsx`.

## What needs filling in

- `src/site.config.js` has two fake values, the application form link and the contact
  email. The Apply button currently goes nowhere.
- The research memos are made up. Greggs is a worked example to show the standard;
  Haleon, Sage and Centrica are invented examples of a held, exited and declined
  position. Don't present any of them as real research.
- The update notes are templates with placeholder 2026 dates.
- The alumni page is all `[Firm]` placeholders.
- Four of the five sector teams have `TBC` as Head Analyst.
- Committee names are real, so check they're still current.

Some things were left out on purpose because they weren't decided: there's no advisory
board anywhere on the site, no broker or custodian details, and no sponsors page. If
any of those get sorted, they'll need adding back.

## Deploying

Not deployed anywhere at the moment. It's a static site, so any host that runs
`npm run build` and serves the `dist` folder will work.

One thing to know: the site does its own routing in the browser, so the host needs to
send every path back to `index.html`, or links like `/research` will 404 when opened
directly. `vercel.json` already does this if you use Vercel. Other hosts need the
equivalent setting.
