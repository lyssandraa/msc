import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSponsors } from '../hooks/useSponsors.js'
import { publicUrl } from '../lib/publicUrl.js'

export default function Sponsors() {
  const { sponsors, loading } = useSponsors()

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Our sponsors."
        intro="Mersey Student Capital is supported by the following firms."
      />

      <Container className="py-12">
        {loading && <p className="py-8 text-center text-sm text-mute">Loading…</p>}
        {!loading && sponsors.length === 0 && <p className="text-sm text-mute">No sponsors listed yet.</p>}

        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((sponsor, i) => {
            const logo = publicUrl('sponsors', sponsor.logo_path)
            const content = (
              <div className="flex h-32 items-center justify-center bg-white p-6">
                <img src={logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
              </div>
            )
            return (
              <Reveal key={sponsor.id} delay={i * 40}>
                {sponsor.website_url ? (
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            )
          })}
        </div>
      </Container>
    </>
  )
}
