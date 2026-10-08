# Committee guide to the website

No coding knowledge needed for this. If you're a developer looking for
technical setup, see `docs/ARCHITECTURE.md` instead.

## How content works

There's no login and no dashboard on this site. Everything - Research,
Updates, Committee, Alumni, and Sponsors - works the same way: you fill in
a Google Form, and it shows up on the site automatically, usually within a
few minutes. The only exceptions are the Thesis and Process pages, which
change about once a year and are edited directly in the code by whoever
manages the technical side.

**One thing true of every form below:** because each one asks you to
upload a file (a report, an image, a CV), Google requires you to be signed
into a Google account to submit it - that's a Google rule, not something
about these forms specifically.

## Publishing a research report

Open the **MSC Questions** Google Form. Fill in:

- **Title**
- **Category** - pick from the dropdown
- **Published date**
- **Summary** - the short line shown on the report's card
- **PDF** - the actual report file
- **Cover image** (optional) - a picture shown on the card. A screenshot or
  export of the report's title page works well.

Submit. It shows up on the public Research page automatically.

## Posting an update

Open the **MSC Updates** Google Form. Fill in:

- **Title**
- **Kind** - Research, Market note, or Fund update
- **Date**
- **Summary** - shown on the Updates list page
- **Byline** (optional) - e.g. "By the Technology sector team"
- **Body** - the main text. Leave a blank line between paragraphs. Start a
  line with `## ` (two hashes and a space) to make it a section heading.
- **Disclaimer** (optional)

Submit - same as Research, it appears on the site automatically. There's no
separate "draft" mode, so only submit when it's actually ready to go live.

## Adding to Committee or Sector teams

Open the **MSC Committee** Google Form. The first question asks what you're
adding:

- **Committee member** - then fill in Name, Role, and Remit.
- **Sector team** - then fill in the Sector and its Head Analyst.

You'll only see the fields for whichever one you picked. Submit once per
person/team.

## Adding an alumni destination

Open the **MSC Alumni** Google Form. Fill in:

- **Firm**
- **Category** - pick from the dropdown (this list is fixed to match the
  filter tabs on the Alumni page; if you need a brand new category added,
  ask whoever manages the technical side, since that's a small code change)
- **Detail** - e.g. "Investment Banking Division · Summer Analyst"

## Adding a sponsor

Open the **MSC Sponsors** Google Form. Fill in:

- **Name**
- **Logo** - upload an image file
- **Website URL** (optional)

## Editing or removing an existing entry

Submitting the form again doesn't edit or replace anything - every
submission is a brand new entry. To fix a typo, change a role, or remove
someone who's left:

1. Open the relevant Google Form.
2. Click the **Responses** tab, then the green spreadsheet icon to open the
   linked Google Sheet.
3. Find the row for that entry and either edit the cell directly, or select
   the whole row and delete it.

This takes effect on the site the same way a new submission does - usually
within a few minutes.

**Reordering:** entries show up on the site in the same order their rows
appear in the Sheet. To change the order something appears in (for example,
to move the CEO above other committee members), drag-select the row in the
Sheet and move it.

## Reviewing applications

Applications don't come through this site at all - the Apply page is just
a button linking to a separate **MSC Application** Google Form. To see
who's applied, open that Form directly in Google Forms and click its
**Responses** tab (it has a built-in one-by-one viewer, or you can open the
linked spreadsheet for a table view). CVs are attached files within each
response.

To get notified by email each time someone applies, open the Form's
**Responses** tab → the three-dot menu (⋮) → **Get email notifications for
new responses**.

There's no automatic "you've been accepted/rejected" email - if you want to
let someone know, you email them yourself.

## Things worth knowing

- Every form above feeds the site within a few minutes of submitting, not
  instantly.
- There's no "undo" on a Google Form submission from the site's side - to
  fix a typo, edit the row directly in the linked Google Sheet (see
  "Editing or removing an existing entry" above) rather than resubmitting
  the form.
- If a cover image, PDF, or sponsor logo doesn't show up on the site after
  submitting, the most common cause is a Google Drive sharing setting on
  the uploaded file - flag it to whoever manages the technical side rather
  than resubmitting.
- All six forms (Research, Updates, Committee, Alumni, Sponsors,
  Applications) and their linked Sheets are owned by
  `admin@merseystudentcapital.co.uk`. Sign in as that account to edit a
  form's questions, not a personal account.
