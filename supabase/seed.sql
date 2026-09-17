-- Seed data ported from the current src/data/*.js files, so the site isn't
-- empty right after cutover. Run after 0001_init.sql, 0002 and 0003. Safe to
-- re-run against an empty database only -- it does not upsert, so running it
-- twice will duplicate rows.
--
-- No research_reports or sponsors are seeded here: both need a real file
-- (a PDF, a logo image) uploaded to storage, which a SQL seed can't do -
-- add the first few through /dashboard/research and /dashboard/sponsors
-- once the site is live.

-- ── committee ────────────────────────────────────────────────────────────
insert into public.committee_members (name, role, remit, sort_order) values
('Sam Sousa', 'Co-Founder · Chief Executive Officer', 'Governance, stakeholder relations, strategic direction', 0),
('Cormac Higgins', 'Co-Founder · Chief Investment Officer', 'Investment strategy, pitch coordination, research standards', 1),
('Ethan Steele', 'Chief Operating Officer', 'Operations, trade execution, record-keeping', 2),
('Layla Jones', 'Head of External Outreach', 'Outreach and partnerships', 3),
('Ceci Haynes', 'Head of Marketing', 'Marketing, weekly research reports and market updates', 4);

insert into public.sector_teams (sector, lead, sort_order) values
('Technology', 'TBC', 0),
('Healthcare', 'TBC', 1),
('Energy & Industrials', 'TBC', 2),
('Consumer & Retail', 'TBC', 3),
('Financials & ESG', 'TBC', 4);

-- ── alumni ───────────────────────────────────────────────────────────────
insert into public.alumni_destinations (firm, category, detail, sort_order) values
('[Firm]', 'banking', '[Division · role TBC]', 0),
('[Firm]', 'banking', '[Division · role TBC]', 1),
('[Firm]', 'asset-management', '[Division · role TBC]', 2),
('[Firm]', 'asset-management', '[Division · role TBC]', 3),
('[Firm]', 'private-markets', '[Division · role TBC]', 4),
('[Firm]', 'technology', '[Division · role TBC]', 5);

-- ── updates ──────────────────────────────────────────────────────────────
insert into public.updates (slug, date, kind, title, summary, body, byline, disclaimer, status) values
(
  'first-memo', date '2026-11-18', 'Research', 'Technology team publishes its first memo',
  $$Our first approved position is now on the research page. Here is the thesis in brief, and what we will be watching.$$,
$$After six weeks of coverage work and a full committee review, the technology team's first recommendation has been approved and is now live on the research page.

The memo makes a focused argument: the market is pricing the company off a single weak year, and is missing a shift in the way it converts revenue to cash. The full case, valuation and the conditions under which we would exit are all set out in the published memo.

## Why we are sharing this

Every position MSC takes is published in full, including the reasoning and the conditions that would prove it wrong. We do this for two reasons. First, publishing disciplines the writing: a memo written to be read by professionals is a better memo. Second, it lets the fund be judged on evidence rather than assertion.

## What we are watching

The thesis rests on one number in particular. If it moves against us across the next two reporting periods, the memo commits us to exiting the position, and we will publish that outcome here as well.

Read the full memo on the research page for the complete valuation and risk analysis. The next review is scheduled for the company's next set of results.$$,
  $$By [Author] · Technology sector team$$,
  $$This note accompanies a published research memo. It is educational and is not investment advice. Figures and companies shown during launch are illustrative.$$,
  'published'
),
(
  'market-note-1', date '2026-11-14', 'Market note', 'The week in five sectors',
  $$A short read across the moves that mattered this week, one line from each sector team.$$,
$$A short weekly read: one line from each sector team on the move that mattered on their patch, and why it caught our attention.

## Technology

A large-cap software name sold off on cautious forward guidance. We are less interested in the reaction than in whether the underlying subscription metrics held, which is the question our coverage note will address.

## Healthcare

A defensive week. The sector's interest for us remains in the gap between headline pipeline news and the cash such pipelines actually generate.

## Energy & Industrials

Commodity moves drove the sector. We continue to treat single-quarter price swings as noise rather than thesis, and are watching contracted, recurring revenue instead.

## Consumer & Retail

A trading update from a UK staple beat modest expectations. The question we care about is margin durability, not the one-day share reaction.

## Financials & ESG

Rate expectations shifted again. For our purposes the signal is in net interest margin guidance, not the macro headline.$$,
  $$By the MSC sector teams$$,
  $$Market notes are short educational commentary from the sector teams. They are not investment advice or recommendations.$$,
  'published'
),
(
  'cohort', date '2026-10-03', 'Fund update', 'Founding analyst cohort confirmed',
  $$Introducing the first cohort across our five sector teams, and how the year ahead is structured.$$,
$$Following a competitive application round, MSC's founding analyst cohort has been confirmed across all five sector teams.

No prior finance experience was required. What we looked for was the ability to build an investment case and to state clearly what would prove it wrong.

## How the year is structured

Each sector team owns a coverage list and pitches to the committee through the term. Every pitch is researched by a named author, reviewed internally, and challenged before any position is taken.

Technology, Healthcare, Energy & Industrials, Consumer & Retail, and Financials & ESG, each with a Head Analyst and a small team. Weekly team meetings build coverage and prepare pitches through the term.

Our thanks to everyone who applied.$$,
  $$By the Executive Committee$$,
  $$Fund updates are educational communications about the society's activities.$$,
  'published'
);
