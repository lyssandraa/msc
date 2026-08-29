import NoteLayout, { NoteHeading } from './NoteLayout.jsx'

const sectors = [
  {
    name: 'Technology',
    body: 'A large-cap software name sold off on cautious forward guidance. We are less interested in the reaction than in whether the underlying subscription metrics held, which is the question our coverage note will address.',
  },
  {
    name: 'Healthcare',
    body: "A defensive week. The sector's interest for us remains in the gap between headline pipeline news and the cash such pipelines actually generate.",
  },
  {
    name: 'Energy & Industrials',
    body: 'Commodity moves drove the sector. We continue to treat single-quarter price swings as noise rather than thesis, and are watching contracted, recurring revenue instead.',
  },
  {
    name: 'Consumer & Retail',
    body: 'A trading update from a UK staple beat modest expectations. The question we care about is margin durability, not the one-day share reaction.',
  },
  {
    name: 'Financials & ESG',
    body: 'Rate expectations shifted again. For our purposes the signal is in net interest margin guidance, not the macro headline.',
  },
]

export default function MarketNote() {
  return (
    <NoteLayout
      kind="Market note"
      date="14 November 2026"
      title="The week in five sectors"
      byline="By the MSC sector teams"
      disclaimer="Market notes are short educational commentary from the sector teams. They are not investment advice or recommendations."
    >
      <p>
        A short weekly read: one line from each sector team on the move that mattered on their
        patch, and why it caught our attention.
      </p>

      {sectors.map((sector) => (
        <div key={sector.name}>
          <NoteHeading>{sector.name}</NoteHeading>
          <p className="mt-2">{sector.body}</p>
        </div>
      ))}
    </NoteLayout>
  )
}
