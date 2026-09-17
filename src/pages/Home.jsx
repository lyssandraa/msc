import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import DarkBand from '../components/DarkBand.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import ResearchReportCard from '../components/ResearchReportCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { useResearchReports } from '../hooks/useResearchReports.js'
import { site } from '../site.config.js'

const facts = [
  { value: 'Five sectors', label: 'Technology to Financials' },
  { value: 'Research reports', label: 'Published across asset classes' },
  { value: 'Updates', label: 'Brief notes on our investments' },
  { value: 'Long-only', label: 'ESG-screened, no leverage' },
]

export default function Home() {
  const { reports } = useResearchReports()
  const featured = reports[0]

  return (
    <>
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <Reveal>
          <Eyebrow className="mb-8 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
            {site.name} · {site.location}
          </Eyebrow>
          <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,8vw,5.4rem)] leading-[1.03] font-light tracking-[-0.03em]">
            Original research, <span className="text-blue">on the record.</span>
          </h1>
        </Reveal>
      </Container>

      <Container>
        {/* gap-px over a line-coloured background draws the hairline grid. */}
        <Reveal className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.value} className="bg-white px-4 py-6 sm:px-6">
              <p className="font-display text-lg leading-tight">{fact.value}</p>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-mute">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>

      <DarkBand className="mt-16 sm:mt-20">
        <Reveal>
          <p className="max-w-[24ch] font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.2] font-light tracking-[-0.02em]">
            A student investment society at the University of Liverpool.
          </p>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-mute-dark">
            Five sector teams research listed companies. Published research spans asset classes
            from fixed income to private markets, with brief updates on our investment activity
            throughout the year.
          </p>
          <Link
            to="/apply"
            className="mt-9 inline-block bg-white px-6 py-3 text-sm text-slate transition-colors hover:bg-blue-lift hover:text-white"
          >
            Apply to join
          </Link>
        </Reveal>
      </DarkBand>

      {featured && (
        <Container className="mt-20">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
            <h2 className="font-display text-2xl tracking-[-0.01em]">Latest research</h2>
            <Link to="/research" className="text-sm text-mute transition-colors hover:text-ink">
              All research
            </Link>
          </Reveal>
          <div className="mt-8 max-w-sm">
            <ResearchReportCard report={featured} />
          </div>
        </Container>
      )}
    </>
  )
}
