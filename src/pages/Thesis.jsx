import { useState } from 'react'
import Container from '../components/Container.jsx'
import DarkBand from '../components/DarkBand.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { mandate, principles } from '../data/principles.js'

function Principle({ principle, isOpen, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-blue"
      >
        <span className="font-mono text-[0.75rem] text-blue">{principle.number}</span>
        <span className="flex-1 font-display text-[1.1rem] leading-snug sm:text-[1.25rem]">
          {principle.title}
        </span>
        <span
          className={`mt-1 shrink-0 text-mute transition-transform ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {isOpen && (
        <p className="max-w-2xl pb-6 pl-10 text-[0.95rem] leading-relaxed text-mute">
          {principle.body}
        </p>
      )}
    </div>
  )
}

export default function Thesis() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <PageHeader
        eyebrow="Investment thesis"
        title="How we think about investing."
        intro="Five principles govern every position. Select one to read it in full."
      />

      <Container className="py-10">
        <Reveal>
          {principles.map((principle, i) => (
            <Principle
              key={principle.number}
              principle={principle}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>

      </Container>

      <DarkBand className="mt-6">
        <Reveal className="grid gap-px bg-line-dark md:grid-cols-2">
          {mandate.map((item) => (
            <div key={item.title} className="bg-slate-panel p-7">
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue-lift">
                {item.title}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute-dark">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </DarkBand>
    </>
  )
}
