import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SheetStatusBanner from '../components/SheetStatusBanner.jsx'
import { useSheetUpdates } from '../hooks/useSheetUpdates.js'
import { formatDate } from '../lib/mappers.js'

export default function Updates() {
  const { updates, loading, error } = useSheetUpdates()

  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="Research notes and fund updates."
        intro="Published research, market notes and progress from the sector teams."
      />

      <Container className="py-10">
        <SheetStatusBanner error={error} resourceLabel="updates" />

        {loading && <p className="py-8 text-center text-sm text-mute">Loading…</p>}

        {!loading &&
          !error &&
          updates.map((note, i) => (
            <Reveal
              key={note.id}
              as="article"
              delay={i * 60}
              className="grid gap-3 border-b border-line py-7 md:grid-cols-[180px_1fr] md:gap-10"
            >
              <div className="flex flex-wrap items-center gap-3 md:block">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
                  {formatDate(note.date)}
                </p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-blue md:mt-2">
                  {note.kind}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.25rem] leading-snug sm:text-[1.4rem]">
                  {note.title}
                </h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{note.summary}</p>
                <Link
                  to={`/updates/${note.slug}`}
                  className="mt-4 inline-block border-b border-blue pb-0.5 text-sm text-blue transition-colors hover:border-ink hover:text-ink"
                >
                  Read note
                </Link>
              </div>
            </Reveal>
          ))}

        <p className="mt-8 text-[0.85rem] text-mute">
          Notes are published by the sector teams through the term.
        </p>
      </Container>
    </>
  )
}
