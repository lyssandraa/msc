# MSC website

React + Vite + Tailwind. Static, no backend.

## Run

```bash
npm install
npm run dev
```

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

1. `npm run dev` and leave it running, the page updates as you save
2. find the words you want to change, they're nearly always in `src/data/`
3. edit, save, check the browser
4. push it:

```bash
git add .
git commit -m "what you changed"
git push
```

## Not real yet

- apply link and email in `site.config.js` are fake
- the memos are invented, not real research
- update notes are templates, dates made up
