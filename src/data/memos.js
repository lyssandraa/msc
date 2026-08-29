// Cards shown on the research page. `slug` links to a full memo page
// (see src/pages/memos) when one exists.

export const memos = [
  {
    slug: 'greggs',
    ticker: 'GRG.L',
    company: 'Greggs plc',
    sector: 'Consumer',
    status: { label: 'Sample memo', tone: 'sample' },
    byline: '[Author] · Illustrative',
    summary:
      'Priced off flat earnings guidance; the market is missing a sharp free-cash-flow inflection as capital spending peaks.',
    body: 'A fully worked example memo, written to demonstrate the standard every submission is held to.',
  },
  {
    ticker: 'HLN.L',
    company: 'Haleon plc',
    sector: 'Consumer',
    status: { label: 'Held', tone: 'open' },
    byline: '[Author] · [Date] · Approved',
    summary: 'A consumer staple still priced as a messy pharma spin-out.',
    body: 'Three years after the demerger the overhang has cleared and organic growth has been mid-single-digit for six straight quarters, yet it trades at a discount to peers on comparable margins.',
    note: {
      title: 'Conditions that would invalidate the thesis',
      text: 'Continued oral-care share loss in China over two further quarters, or net debt/EBITDA remaining above 3.0x entering FY27. Either condition would trigger an exit ahead of the next scheduled review.',
    },
  },
  {
    ticker: 'SGE.L',
    company: 'The Sage Group plc',
    sector: 'Technology',
    status: { label: 'Exited -4.1%', tone: 'closed' },
    byline: '[Author] · [Date] · Reviewed',
    summary: 'Position exited after the thesis was invalidated.',
    body: 'The original case held that the cloud migration was substantially complete and the market was pricing the transition rather than the outcome. Net revenue retention subsequently declined for two consecutive quarters, the condition the memo had identified as disqualifying.',
    note: {
      title: 'Post-mortem',
      text: 'Seat growth was interpreted as pricing power when it reflected migration mix: customers moving onto cloud tiers rather than paying more for them. The disclosures did not allow the two to be separated, a limitation the memo should have stated explicitly.',
    },
  },
  {
    ticker: 'CNA.L',
    company: 'Centrica plc',
    sector: 'Energy & Industrials',
    status: { label: 'Not approved', tone: 'rejected' },
    byline: '[Author] · [Date] · Declined',
    summary: 'Recommendation declined at committee review on valuation grounds.',
    body: 'The author argued that the balance-sheet cash position was underappreciated. The committee assessed that earnings volatility and the earmarked nature of that cash meant it did not represent unrecognised value. Declined recommendations are published alongside approvals.',
    note: {
      title: 'Reasoning',
      text: 'The valuation relied on a mid-cycle earnings figure the committee did not accept as representative. Absent a defensible normalised earnings number, the case rested on an assumption the author was unable to support under questioning.',
    },
  },
]
