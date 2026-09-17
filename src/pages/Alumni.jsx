import { useState } from 'react'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { categories } from '../data/alumni.js'
import { useAlumniDestinations } from '../hooks/useAlumniDestinations.js'

export default function Alumni() {
  const [active, setActive] = useState('all')
  const { destinations, loading } = useAlumniDestinations()

  const shown =
    active === 'all' ? destinations : destinations.filter((item) => item.category === active)

  const labelFor = (id) => categories.find((c) => c.id === id)?.label

  return (
    <>
      <PageHeader
        eyebrow="Alumni destinations"
        title="Where members go next."
        intro="Destinations secured by members and alumni. Filter by industry."
      />

      <Container className="py-10">
        <Reveal className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-pressed={active === category.id}
              className={`rounded-full border px-4 py-2 text-[0.82rem] transition-colors ${
                active === category.id
                  ? 'border-slate bg-slate text-white'
                  : 'border-line text-mute hover:border-mute hover:text-ink'
              }`}
            >
              {category.label}
            </button>
          ))}
        </Reveal>

        {loading && <p className="mt-8 text-sm text-mute">Loading…</p>}
        <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={item.id} delay={i * 40} className="bg-white p-6">
              <p className="font-display text-lg">{item.firm}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-blue">
                {labelFor(item.category)}
              </p>
              <p className="mt-3 text-[0.88rem] text-mute">{item.detail}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-[0.85rem] text-mute">
          Listed with members' permission once offers are confirmed. This page grows with the
          first cohort.
        </p>
      </Container>
    </>
  )
}
