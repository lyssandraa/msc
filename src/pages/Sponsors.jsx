import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SheetStatusBanner from '../components/SheetStatusBanner.jsx'
import { useSheetSponsors } from '../hooks/useSheetSponsors.js'

export default function Sponsors() {
  const { sponsors, loading, error } = useSheetSponsors()

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Our sponsors."
        intro="Mersey Student Capital is supported by the following firms."
      />

      <Container className="py-12">
        <SheetStatusBanner error={error} resourceLabel="sponsors" />

        {loading && <p className="py-8 text-center text-sm text-mute">Loading…</p>}

        {!loading && !error && sponsors.length === 0 && (
          <p className="text-sm text-mute">No sponsors listed yet.</p>
        )}

        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
          {!loading &&
            !error &&
            sponsors.map((sponsor, i) => {
              const content = (
                <div className="flex h-32 items-center justify-center bg-white p-6">
                  <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                </div>
              )
              return (
                <Reveal key={sponsor.name} delay={i * 40}>
                  {sponsor.websiteUrl ? (
                    <a
                      href={sponsor.websiteUrl}
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
