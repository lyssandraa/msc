import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const toneStyles = {
  sample: 'border-blue-lift bg-blue-lift/10 text-blue-lift',
  open: 'border-blue text-blue',
  closed: 'border-slate bg-slate text-white',
  rejected: 'border-line text-mute',
  neutral: 'border-line text-mute',
}

function Tag({ tone = 'neutral', children }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] ${toneStyles[tone]}`}
    >
      {children}
    </span>
  )
}

export default function MemoCard({ memo, delay = 0 }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="grid gap-5 border-b border-line py-8 md:grid-cols-[220px_1fr] md:gap-10"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-mono text-sm tracking-[0.04em] text-blue">{memo.ticker}</p>
          <p className="font-display text-lg leading-snug">{memo.company}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag tone={memo.status.tone}>{memo.status.label}</Tag>
          <Tag>{memo.sector}</Tag>
        </div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-mute">
          {memo.byline}
        </p>
      </div>

      <div>
        <p className="font-display text-[1.15rem] leading-snug sm:text-[1.3rem]">
          {memo.summary}
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{memo.body}</p>

        {memo.note && (
          <details className="group mt-5 border-t border-line pt-4">
            <summary className="cursor-pointer list-none font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute transition-colors hover:text-ink">
              <span className="mr-2 inline-block transition-transform group-open:rotate-45">
                +
              </span>
              {memo.note.title}
            </summary>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-mute">{memo.note.text}</p>
          </details>
        )}

        {memo.slug && (
          <Link
            to={`/research/${memo.slug}`}
            className="mt-5 inline-block border-b border-blue pb-0.5 text-sm text-blue transition-colors hover:border-ink hover:text-ink"
          >
            Read full memo
          </Link>
        )}
      </div>
    </Reveal>
  )
}
