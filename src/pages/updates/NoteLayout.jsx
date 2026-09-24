import { Link } from 'react-router-dom'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'

/** Shared shell for a single update note. */
export default function NoteLayout({ kind, date, title, byline, children, disclaimer }) {
  return (
    <Container narrow className="py-12 sm:py-16">
      <Link to="/updates" className="text-sm text-mute transition-colors hover:text-ink">
        All updates
      </Link>

      <Reveal className="mt-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue">
          {kind} · {date}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,5vw,2.7rem)] leading-[1.12] tracking-[-0.02em]">
          {title}
        </h1>
        {byline && (
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
            {byline}
          </p>
        )}
      </Reveal>

      <div className="mt-9 space-y-5 text-[1.02rem] leading-[1.75] text-ink/90">{children}</div>

      {disclaimer && (
        <p className="mt-14 border-t border-line pt-6 text-[0.8rem] leading-relaxed text-mute">
          {disclaimer}
        </p>
      )}
    </Container>
  )
}
