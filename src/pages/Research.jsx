import { useMemo, useState } from 'react'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import ResearchReportCard from '../components/ResearchReportCard.jsx'
import { useResearchReports } from '../hooks/useResearchReports.js'

export default function Research() {
  const { reports, loading } = useResearchReports()
  const [active, setActive] = useState('all')

  const categories = useMemo(
    () => Array.from(new Set(reports.map((r) => r.category))).sort(),
    [reports],
  )
  const shown = active === 'all' ? reports : reports.filter((r) => r.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research, published in full."
        intro="In-depth research and analysis from our sector teams, published as full reports."
      />

      <Container className="py-10">
        {categories.length > 1 && (
          <Reveal className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive('all')}
              aria-pressed={active === 'all'}
              className={`rounded-full border px-4 py-2 text-[0.82rem] transition-colors ${
                active === 'all'
                  ? 'border-slate bg-slate text-white'
                  : 'border-line text-mute hover:border-mute hover:text-ink'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={`rounded-full border px-4 py-2 text-[0.82rem] transition-colors ${
                  active === category
                    ? 'border-slate bg-slate text-white'
                    : 'border-line text-mute hover:border-mute hover:text-ink'
                }`}
              >
                {category}
              </button>
            ))}
          </Reveal>
        )}

        {loading && <p className="mt-8 py-8 text-center text-sm text-mute">Loading…</p>}

        {!loading && shown.length === 0 && (
          <p className="mt-8 text-sm text-mute">No research published yet.</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((report, i) => (
            <ResearchReportCard key={report.id} report={report} delay={i * 60} />
          ))}
        </div>
      </Container>
    </>
  )
}
