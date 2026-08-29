import Container from '../components/Container.jsx'
import MemoCard from '../components/MemoCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { memos } from '../data/memos.js'

export default function Research() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="The work, published in full."
        intro="One memo per company. Approvals, declined recommendations and exits are all published. Entries below are illustrative during launch."
      />
      <Container className="pb-8">
        {memos.map((memo, i) => (
          <MemoCard key={memo.ticker} memo={memo} delay={i * 60} />
        ))}
      </Container>
    </>
  )
}
