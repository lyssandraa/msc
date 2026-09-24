# Committee guide to the website

No coding knowledge needed for this. If you're a developer looking for
technical setup, see `docs/ARCHITECTURE.md` instead.

## How content works now

There's no login and no dashboard on this site. Content works two ways:

- **Research reports and Updates** — you fill in a Google Form, and it
  shows up on the site automatically, usually within a few minutes.
- **Everything else** (Committee, Alumni, Sponsors, the Thesis/Process
  pages) — these change rarely enough that a developer edits them directly
  in the code. If you need one of these changed, ask whoever manages the
  technical side.

## Publishing a research report

Open the **Research submissions** Google Form (ask whoever manages the site
for the link if you don't have it bookmarked). Fill in:

- **Title**
- **Category** — pick from the dropdown. Spelling/capitalisation is fixed
  by the dropdown, so you don't need to worry about creating accidental
  duplicate categories.
- **Published date**
- **Summary** — the short line shown on the report's card
- **PDF** — the actual report file
- **Cover image** (optional) — a picture shown on the card. A screenshot or
  export of the report's title page works well.

Submit. It shows up on the public Research page automatically, usually
within a few minutes — no separate "publish" step.

**One thing to know:** because this form asks you to upload a file, Google
requires you to be signed into a Google account to submit it — that's a
Google rule, not something about this form specifically.

## Posting an update

Open the **Updates submissions** Google Form. Fill in:

- **Title**
- **Kind** — Research, Market note, or Fund update
- **Date**
- **Summary** — shown on the Updates list page
- **Byline** (optional) — e.g. "By the Technology sector team"
- **Body** — the main text. Leave a blank line between paragraphs. Start a
  line with `## ` (two hashes and a space) to make it a section heading.
- **Disclaimer** (optional)

Submit — same as Research, it appears on the site automatically after a
short delay. There's no separate "draft" mode, so only submit when it's
actually ready to go live.

## Reviewing applications

Applications don't come through this site at all — the Apply page is just
a button linking to a separate **Applications** Google Form. To see who's
applied, open that Form directly in Google Forms and click its
**Responses** tab (it has a built-in one-by-one viewer, or you can open the
linked spreadsheet for a table view). CVs are attached files within each
response.

There's no automatic "you've been accepted/rejected" email — if you want to
let someone know, you email them yourself.

## Changing Committee, Alumni, or Sponsors

These live directly in the website's code, not in a form. If you're
comfortable editing a file and pushing to GitHub yourself, see the
"Making a content change" section in the main README. Otherwise, ask
whoever manages the technical side to make the change for you — since
these don't change often, that's expected to be the normal way of doing it.

## Things worth knowing

- Research reports and Updates go live as soon as Google's copy of the
  Form's spreadsheet refreshes — usually a few minutes after submitting,
  not instantly.
- There's no "undo" on a Google Form submission from the site's side — to
  fix a typo, edit the row directly in the linked Google Sheet rather than
  resubmitting the form.
- If a cover image or PDF doesn't show up on the site after submitting,
  the most common cause is a Google Drive sharing setting — flag it to
  whoever manages the technical side rather than resubmitting.
