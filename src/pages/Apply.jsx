import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../site.config.js'

const points = [
  'No prior finance experience is required.',
  'Analysts join one of five sector teams and meet weekly through the term.',
  'You will be writing and presenting research from the start, with the committee reviewing every pitch.',
]

export default function Apply() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Apply to join."
        intro="We take new analysts at the start of each term."
      />

      <Container narrow className="py-12">
        <Reveal>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[1rem] leading-relaxed">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href={site.applicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-slate px-7 py-3.5 text-sm text-white transition-colors hover:bg-blue"
          >
            Open the application form
          </a>
          <a
            href={`mailto:${site.email}`}
            className="border-b border-line pb-0.5 text-sm text-mute transition-colors hover:border-ink hover:text-ink"
          >
            Or email the committee
          </a>
        </Reveal>

        <Reveal delay={150} className="mt-6">
          <p className="text-[0.85rem] text-mute">
            You'll need to be signed into a Google account to attach your CV.
          </p>
        </Reveal>
      </Container>
    </>
  )
}
