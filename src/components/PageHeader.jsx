import Container from './Container.jsx'
import Eyebrow from './Eyebrow.jsx'
import Reveal from './Reveal.jsx'

/** Full-bleed navy header that opens every inner page. */
export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <div className="bg-slate text-white">
      <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Reveal>
          {eyebrow && (
            <Eyebrow tone="light" className="mb-4">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="max-w-3xl font-display text-[clamp(2rem,6vw,3.4rem)] leading-[1.08] font-light tracking-[-0.025em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-[0.98rem] text-mute-dark sm:text-base">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </div>
  )
}
