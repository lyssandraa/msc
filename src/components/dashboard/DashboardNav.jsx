import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard/research', label: 'Research' },
  { to: '/dashboard/updates', label: 'Updates' },
  { to: '/dashboard/committee', label: 'Committee' },
  { to: '/dashboard/alumni', label: 'Alumni' },
  { to: '/dashboard/sponsors', label: 'Sponsors' },
  { to: '/dashboard/applications', label: 'Applications' },
  { to: '/dashboard/users', label: 'Users' },
]

export default function DashboardNav() {
  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-ink' : 'text-mute hover:text-ink'}`

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-6">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={linkClass} end>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
