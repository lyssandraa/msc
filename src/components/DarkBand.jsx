import Container from './Container.jsx'

/** Full-bleed navy section. The site's main colour accent. */
export default function DarkBand({ className = '', children }) {
  return (
    <section className={`bg-slate text-white ${className}`}>
      <Container className="py-14 sm:py-20">{children}</Container>
    </section>
  )
}
