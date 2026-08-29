import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from './Container.jsx'
import { navLinks, site } from '../site.config.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-ink' : 'text-mute hover:text-ink'}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/mark.png" alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-base tracking-[-0.01em] whitespace-nowrap">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded border border-line px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b border-line py-3.5 text-[0.95rem] last:border-0 ${
                    isActive ? 'text-ink' : 'text-mute'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}
