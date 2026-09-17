import { useEffect, useState } from 'react'
import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import DataTable from '../../components/dashboard/DataTable.jsx'
import { inputClass, labelClass, primaryButtonClass } from '../../components/formStyles.js'
import { supabase } from '../../lib/supabaseClient.js'

export default function ManageUsers() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [inviting, setInviting] = useState(false)
  const [inviteError, setInviteError] = useState(null)
  const [inviteSuccess, setInviteSuccess] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: true })
    setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleInvite(event) {
    event.preventDefault()
    setInviting(true)
    setInviteError(null)
    setInviteSuccess(null)

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token

    const res = await fetch('/api/invite-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email: inviteEmail, full_name: inviteName }),
    })
    const body = await res.json().catch(() => ({}))

    setInviting(false)
    if (!res.ok) {
      setInviteError(body.error ?? 'Could not send the invite.')
      return
    }

    setInviteSuccess(`Invite sent to ${inviteEmail}.`)
    setInviteEmail('')
    setInviteName('')
    load()
  }

  return (
    <>
      <PageHeader eyebrow="Users" title="Manage users." />
      <Container narrow className="py-12">
        <DashboardNav />

        <div className="mt-10">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">Invite a committee member</h2>
          <form onSubmit={handleInvite} className="mt-4 grid gap-4 border border-line bg-paper p-5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Full name</label>
              <input
                type="text"
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={inviting} className={primaryButtonClass}>
                {inviting ? 'Sending…' : 'Send invite'}
              </button>
            </div>

            <div className="sm:col-span-3">
              {inviteError && <p className="text-sm text-red-600">{inviteError}</p>}
              {inviteSuccess && <p className="text-sm text-blue">{inviteSuccess}</p>}
            </div>
          </form>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">All users</h2>
          <div className="mt-4">
            {loading ? (
              <p className="text-sm text-mute">Loading…</p>
            ) : (
              <DataTable columns={[{ key: 'full_name', label: 'Name' }]} rows={rows} />
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
