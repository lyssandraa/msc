import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { useAuth } from '../hooks/useAuth.js'

const inputClass =
  'w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue'

export default function Login() {
  const { user, loading: authLoading, signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (!authLoading && user) {
    return <Navigate to={location.state?.from?.pathname ?? '/dashboard'} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError('Incorrect email or password.')
      setSubmitting(false)
      return
    }

    navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
  }

  return (
    <>
      <PageHeader
        eyebrow="Committee"
        title="Sign in."
        intro="For committee accounts. If you don't have one yet, ask an existing member to invite you."
      />

      <Container narrow className="py-12">
        <Reveal className="max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm text-mute">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm text-mute">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-slate px-7 py-3.5 text-sm text-white transition-colors hover:bg-blue disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </Reveal>
      </Container>
    </>
  )
}
