# Committee guide to the website

This is for committee members managing content on the website — no coding
knowledge needed. If you're a developer looking for technical setup, see
[ARCHITECTURE.md](ARCHITECTURE.md) instead.

## How the site is organised

There are two sides to the website:

- **The public site** — Research, Thesis, Process, Committee, Alumni,
  Sponsors, Updates, Apply. Anyone can see these, no login needed.
- **The dashboard** — everything you manage. You need to log in to see it.
  This guide is about the dashboard.

Almost everything you'll want to change lives in the dashboard. The only
exceptions are the five numbered "principles" on the Thesis page and the
four steps on the Process page — those change rarely enough that they're
still edited directly in the code by a developer, not through the
dashboard.

## Logging in

Go to `/login` (e.g. `yourwebsite.com/login`) and sign in with your email
and password.

**If you're new:** an existing committee member invites you (see
"Inviting a new committee member" below). You'll get an email with a link —
click it, choose a password, and you're in.

**If you forget your password:** there's currently no "forgot password"
button on the login page. Ask another committee member with dashboard
access to invite you again (this resets things), or ask whoever manages
the technical side to reset it for you. Worth asking your developer to add
a proper "forgot password" link if this comes up often.

Once logged in, you'll land on the dashboard home page, which shows a tile
for each section. The same seven links (Research, Updates, Committee,
Alumni, Sponsors, Applications, Users) appear as tabs at the top of every
dashboard page, so you can jump between sections without going back to the
home page each time.

## Publishing a research report

Go to **Research** in the dashboard.

1. Click **New report**.
2. **Category** — type a category name (e.g. "Fixed Income", "Private
   Markets", "FX"). There's no fixed list — whatever you type becomes a
   filter option on the public Research page. **Spell and capitalise it
   the same way every time** for the same category, otherwise "Fixed
   Income" and "fixed income" will show up as two separate filters instead
   of one.
3. **Published date**, **Title**, and an optional **Summary** (a short
   line shown on the report's card).
4. **PDF** — attach the actual report file. Required for a new report.
5. **Cover image** (optional) — a picture shown on the report's card
   instead of a plain "PDF" placeholder. A screenshot or export of the
   report's title page works well, similar to what you'd see on a
   professional research site.
6. Click **Save**. The report is live on the public Research page
   immediately — there's no separate "publish" step or review stage.

To change or remove a report later, find it in the list and use **Edit**
or **Delete**. When editing, you can leave the PDF/cover image fields
blank to keep the current files — you only need to attach a new file if
you're replacing one.

## Posting an update

Go to **Updates** in the dashboard. This is for short news posts — "the
tech team invests in its first company," a weekly market note, that kind
of thing.

1. Click **New update**.
2. **Title** — the slug (the web address for this post) fills in
   automatically from the title. You can edit it, but you shouldn't need
   to.
3. **Kind** — Research, Market note, or Fund update.
4. **Date**.
5. **Status** — leave as **Draft** while you're still writing it; nothing
   with Draft status shows on the public site. Switch to **Published**
   when it's ready to go live.
6. **Summary** — the short line shown on the Updates list page.
7. **Byline** (optional) — e.g. "By the Technology sector team."
8. **Body** — the main text. Leave a blank line between paragraphs. Start
   a line with `## ` (two hashes and a space) to make it a section
   heading. Click **Preview** above the text box at any point to see how
   it'll actually look.
9. **Disclaimer** (optional) — a small note shown at the end of the post.
10. Click **Save**.

## Managing the committee page

Go to **Committee** in the dashboard. This page has two separate lists:
**Executive committee** and **Sector teams** — both work the same way.

- Click **Add** to add a new person/team, or **Edit** next to an existing
  one.
- Executive committee members need a **Name**, **Role** (e.g. "Chief
  Investment Officer"), and **Remit** (what they're responsible for).
- Sector teams need a **Sector** name and a **Head Analyst** name.
- **Order** controls the display order on the public page — lower numbers
  show first (0, 1, 2, and so on).
- **Delete** removes an entry entirely.

## Managing alumni destinations

Go to **Alumni**. Same pattern as Committee: **Add**/**Edit**/**Delete**,
with an **Order** field for display order.

Each entry needs a **Firm** name, a **Category** (pick from the dropdown —
Investment banking, Asset management, Private markets, or Technology —
these categories are fixed, unlike research categories), and a **Detail**
line (e.g. the division or role).

## Managing sponsors

Go to **Sponsors**. Each sponsor needs a **Name**, a **Logo** image
(PNG, JPEG, WebP, or SVG), and optionally a **Website** link — if you add
one, the logo becomes clickable on the public Sponsors page. **Order**
works the same as elsewhere (lower shows first).

## Reviewing applications

Go to **Applications** to see everyone who's applied through the public
Apply form: name, email, preferred sector, and when they applied.

- Click **View resume** to open their CV in a new tab.
- Use the status dropdown to move them through: **new** → **reviewed** →
  **shortlisted** → **accepted** or **rejected**. The first three are just
  for your own internal tracking. **Setting someone to accepted or
  rejected automatically sends them an email letting them know** — that's
  the only point an applicant hears from the system directly, so double
  check before selecting one of those two.

Note: this automatic email depends on a piece of setup (an email-sending
service) that may not be finished yet — ask whoever manages the technical
side if you're not sure it's switched on. If it isn't, changing the status
still works, you just won't get the automatic email on top.

## Inviting a new committee member

Go to **Users**. Fill in their **Full name** and **Email**, click
**Send invite** — they'll get an email with a link to set their own
password. Every account has full access to the whole dashboard; there
isn't a separate "junior" or limited-access account type.

The list below the invite form shows everyone with dashboard access. There
isn't a button to remove someone's access from this page yet — if someone
needs to be removed (e.g. they've left the committee), ask whoever manages
the technical side to do it directly in Supabase.

## Signing out

Click **Sign out** at the bottom of the dashboard home page.

## Things worth knowing

- Everything you publish (research reports, updates, sponsors, applicant
  status) goes live immediately — there's no draft-then-review step except
  for Updates, which has its own Draft/Published switch.
- Deleting something (a report, a sponsor, a committee entry) can't be
  undone. You'll get a confirmation pop-up first.
- If a page shows a red error message instead of your content, that's not
  you doing anything wrong — it means the site couldn't reach its
  database. Try refreshing; if it keeps happening, tell whoever manages
  the technical side.
