# MSC website

React + Vite + Tailwind. Static, no backend.

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

4. Run it:

```bash
npm run dev
```

Open http://localhost:5173. Leave it running while you work, it reloads on save.

## Where things are

```
src/data/           all site text
src/pages/          one file per page
src/components/     header, footer, cards
src/App.jsx         routes
src/site.config.js  nav, apply link, contact email
src/index.css       colours and fonts
```

## Making a change

1. find the words you want to change, they're nearly always in `src/data/`
2. edit, save, check the browser
3. push it:

```bash
git add .
git commit -m "what you changed"
git push
```

## Not real yet

- apply link and email in `site.config.js` are fake
- the memos are invented, not real research
- update notes are templates, dates made up
