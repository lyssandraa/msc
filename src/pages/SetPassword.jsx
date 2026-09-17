import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { supabase } from '../lib/supabaseClient.js'

const inputClass =
  'w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue'

/**
 * Landing page for Supabase invite/recovery email links. supabase-js reads
 * the tokens out of the URL and establishes a session automatically before
 * this ever mounts; we just need to collect a password and set it.
 */
export default function SetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('Could not set your password. The link may have expired — ask an admin to re-invite you.')
      setSubmitting(false)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <>
      <PageHeader eyebrow="Committee" title="Set your password." intro="Choose a password for your account." />

      <Container narrow className="py-12">
        <Reveal className="max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="text-sm text-mute">
                New password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>

            <div>
              <label htmlFor="confirm" className="text-sm text-mute">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-slate px-7 py-3.5 text-sm text-white transition-colors hover:bg-blue disabled:opacity-60"
            >
              {submitting ? 'Saving…' : 'Set password'}
            </button>
          </form>
        </Reveal>
      </Container>
    </>
  )
}
