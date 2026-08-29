import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">404</p>
      <h1 className="mt-4 font-display text-4xl">Page not found.</h1>
      <Link
        to="/"
        className="mt-6 inline-block border-b border-blue pb-0.5 text-sm text-blue hover:border-ink hover:text-ink"
      >
        Back to home
      </Link>
    </Container>
  )
}
