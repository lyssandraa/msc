import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { committee, sectorTeams } from '../data/people.js'

export default function Committee() {
  return (
    <>
      <PageHeader
        eyebrow="Committee"
        title="The people who run the fund."
        intro="The Executive Committee and the sector teams that produce the research."
      />

      <Container className="py-12">
        <Reveal>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
            Executive Committee
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((person, i) => (
            <Reveal key={person.name} delay={i * 50} className="bg-white p-6">
              <p className="font-display text-lg leading-snug">{person.name}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-blue">
                {person.role}
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-mute">{person.remit}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
            Sector teams and Head Analysts
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sectorTeams.map((team, i) => (
            <Reveal key={team.sector} delay={i * 50} className="bg-white p-6">
              <p className="font-display text-lg leading-snug">{team.sector}</p>
              <p className="mt-2 text-[0.88rem] text-mute">Head Analyst: {team.lead}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}
