import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { stages } from '../data/process.js'

export default function Process() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="From sector research to an executed position."
        intro="Every pitch is researched by a named author, reviewed internally, and challenged before any position is taken."
      />

      <Container className="py-12">
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {stages.map((stage, i) => (
            <Reveal key={stage.number} delay={i * 70} className="bg-white p-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                {stage.number} · {stage.stage}
              </p>
              <h2 className="mt-3 font-display text-xl leading-snug">{stage.title}</h2>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-mute">{stage.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-l-2 border-blue bg-paper px-6 py-5">
          <p className="max-w-3xl text-[0.95rem] leading-relaxed">
            Students propose and research. Only the Executive Committee can place a trade, and
            only after a written recommendation. Positions are capped at 20% of assets, each
            with a stop-loss set at execution.
          </p>
        </Reveal>
      </Container>
    </>
  )
}
