import { Link } from 'react-router-dom'
import Container from './Container.jsx'
import { navLinks, site } from '../site.config.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper py-14">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Link to="/">
            <img src="/wordmark.png" alt={site.name} className="h-auto w-40" />
          </Link>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:flex sm:flex-wrap sm:justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-mute transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 max-w-3xl border-t border-line pt-8 text-[0.8rem] leading-relaxed text-mute">
          {site.name} is an independent student investment society in {site.location}. It does
          not manage money on behalf of external investors or the public, and nothing on this
          site is investment advice or an offer or invitation to invest. Research shown during
          launch is illustrative.
        </p>
      </Container>
    </footer>
  )
}
