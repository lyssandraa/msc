import NoteLayout, { NoteHeading } from './NoteLayout.jsx'

export default function FirstMemo() {
  return (
    <NoteLayout
      kind="Research"
      date="18 November 2026"
      title="Technology team publishes its first memo"
      byline="By [Author] · Technology sector team"
      disclaimer="This note accompanies a published research memo. It is educational and is not investment advice. Figures and companies shown during launch are illustrative."
    >
      <p>
        After six weeks of coverage work and a full committee review, the technology team's
        first recommendation has been approved and is now live on the research page.
      </p>
      <p>
        The memo makes a focused argument: the market is pricing the company off a single weak
        year, and is missing a shift in the way it converts revenue to cash. The full case,
        valuation and the conditions under which we would exit are all set out in the published
        memo.
      </p>

      <NoteHeading>Why we are sharing this</NoteHeading>
      <p>
        Every position MSC takes is published in full, including the reasoning and the
        conditions that would prove it wrong. We do this for two reasons. First, publishing
        disciplines the writing: a memo written to be read by professionals is a better memo.
        Second, it lets the fund be judged on evidence rather than assertion.
      </p>

      <NoteHeading>What we are watching</NoteHeading>
      <p>
        The thesis rests on one number in particular. If it moves against us across the next two
        reporting periods, the memo commits us to exiting the position, and we will publish that
        outcome here as well.
      </p>
      <p>
        Read the full memo on the research page for the complete valuation and risk analysis.
        The next review is scheduled for the company's next set of results.
      </p>
    </NoteLayout>
  )
}
