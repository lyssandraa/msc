import { useMemo, useState } from 'react'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SheetResearchReportCard from '../components/SheetResearchReportCard.jsx'
import SheetStatusBanner from '../components/SheetStatusBanner.jsx'
import { useSheetResearchReports } from '../hooks/useSheetResearchReports.js'

export default function Research() {
  const { reports, loading, error } = useSheetResearchReports()
  const [active, setActive] = useState('all')

  const categories = useMemo(
    () => Array.from(new Set(reports.map((r) => r.category))).sort(),
    [reports],
  )
  const filterOptions = useMemo(() => ['all', ...categories], [categories])
  const shown = active === 'all' ? reports : reports.filter((r) => r.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research, published in full."
        intro="In-depth research and analysis from our sector teams, published as full reports."
      />

      <Container className="py-10">
        <SheetStatusBanner error={error} resourceLabel="research" />

        {categories.length > 1 && (
          <Reveal className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActive(option)}
                aria-pressed={active === option}
                className={`rounded-full border px-4 py-2 text-[0.82rem] transition-colors ${
                  active === option
                    ? 'border-slate bg-slate text-white'
                    : 'border-line text-mute hover:border-mute hover:text-ink'
                }`}
              >
                {option === 'all' ? 'All' : option}
              </button>
            ))}
          </Reveal>
        )}

        {loading && <p className="mt-8 py-8 text-center text-sm text-mute">Loading…</p>}

        {!loading && !error && shown.length === 0 && (
          <p className="mt-8 text-sm text-mute">No research published yet.</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((report, i) => (
            <SheetResearchReportCard key={report.id} report={report} delay={i * 60} />
          ))}
        </div>
      </Container>
    </>
  )
}
