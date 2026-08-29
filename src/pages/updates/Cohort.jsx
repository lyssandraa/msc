import NoteLayout, { NoteHeading } from './NoteLayout.jsx'

export default function Cohort() {
  return (
    <NoteLayout
      kind="Fund update"
      date="3 October 2026"
      title="Founding analyst cohort confirmed"
      byline="By the Executive Committee"
      disclaimer="Fund updates are educational communications about the society's activities."
    >
      <p>
        Following a competitive application round, MSC's founding analyst cohort has been
        confirmed across all five sector teams.
      </p>
      <p>
        No prior finance experience was required. What we looked for was the ability to build an
        investment case and to state clearly what would prove it wrong.
      </p>

      <NoteHeading>How the year is structured</NoteHeading>
      <p>
        Each sector team owns a coverage list and pitches to the committee through the term.
        Every pitch is researched by a named author, reviewed internally, and challenged before
        any position is taken.
      </p>
      <p>
        Technology, Healthcare, Energy &amp; Industrials, Consumer &amp; Retail, and Financials
        &amp; ESG, each with a Head Analyst and a small team. Weekly team meetings build
        coverage and prepare pitches through the term.
      </p>
      <p>Our thanks to everyone who applied.</p>
    </NoteLayout>
  )
}
