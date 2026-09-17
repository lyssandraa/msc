import { Link } from 'react-router-dom'
import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Reveal from '../../components/Reveal.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const cards = [
  { to: '/dashboard/research', title: 'Research', body: 'Publish research reports as PDFs, organised by category.' },
  { to: '/dashboard/updates', title: 'Updates', body: 'Publish research notes and fund updates.' },
  { to: '/dashboard/committee', title: 'Committee', body: 'Edit the Executive Committee and sector teams.' },
  { to: '/dashboard/alumni', title: 'Alumni', body: 'Edit alumni destinations.' },
  { to: '/dashboard/sponsors', title: 'Sponsors', body: 'Edit corporate sponsors.' },
  { to: '/dashboard/applications', title: 'Applications', body: 'Review membership applications.' },
  { to: '/dashboard/users', title: 'Users', body: 'Invite committee members.' },
]

export default function DashboardHome() {
  const { profile, signOut } = useAuth()

  return (
    <>
      <PageHeader eyebrow="Committee" title="Dashboard." intro={`Signed in as ${profile?.full_name ?? '…'}`} />

      <Container narrow className="py-12">
        <DashboardNav />

        <Reveal className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.to} to={card.to} className="bg-white p-6 transition-colors hover:bg-paper">
              <p className="font-display text-lg leading-snug">{card.title}</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-mute">{card.body}</p>
            </Link>
          ))}
        </Reveal>

        <button
          type="button"
          onClick={signOut}
          className="mt-10 border-b border-line pb-0.5 text-sm text-mute transition-colors hover:border-ink hover:text-ink"
        >
          Sign out
        </button>
      </Container>
    </>
  )
}
