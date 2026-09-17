import { useEffect, useState } from 'react'
import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import DataTable from '../../components/dashboard/DataTable.jsx'
import { inputClass } from '../../components/formStyles.js'
import { supabase } from '../../lib/supabaseClient.js'
import { formatDate } from '../../lib/mappers.js'

const statuses = ['new', 'reviewed', 'shortlisted', 'rejected', 'accepted']
// Only these two are outcomes worth emailing an applicant about - the
// others are internal-only tracking (see api/notify-applicant.js).
const NOTIFY_STATUSES = ['accepted', 'rejected']

export default function Applications() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('submitted_at', { ascending: false })
    if (error) {
      setLoadError(error.message)
    } else {
      setLoadError(null)
      setRows(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function notifyApplicant(row, status) {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token

    const res = await fetch('/api/notify-applicant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email: row.email, full_name: row.full_name, status }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      window.alert(
        'Status was updated, but the notification email failed to send: ' + (body.error ?? 'unknown error'),
      )
    }
  }

  async function handleStatusChange(row, status) {
    const { error } = await supabase.from('applications').update({ status }).eq('id', row.id)
    if (error) {
      window.alert('Could not update status: ' + error.message)
      return
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)))

    if (NOTIFY_STATUSES.includes(status)) {
      notifyApplicant(row, status)
    }
  }

  async function viewResume(path) {
    const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 300)
    if (error || !data) {
      window.alert('Could not open resume: ' + (error?.message ?? 'unknown error'))
      return
    }
    window.open(data.signedUrl, '_blank', 'noopener')
  }

  return (
    <>
      <PageHeader eyebrow="Applications" title="Review applications." />
      <Container className="py-12">
        <DashboardNav />

        <div className="mt-10">
          {loading ? (
            <p className="text-sm text-mute">Loading…</p>
          ) : loadError ? (
            <p className="text-sm text-red-600">Could not load applications: {loadError}</p>
          ) : (
            <DataTable
              columns={[
                { key: 'full_name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'preferred_sector', label: 'Preferred sector', render: (r) => r.preferred_sector ?? '—' },
                { key: 'submitted_at', label: 'Submitted', render: (r) => formatDate(r.submitted_at) },
                {
                  key: 'status',
                  label: 'Status',
                  render: (r) => (
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r, e.target.value)}
                      className={`${inputClass} py-1.5`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ),
                },
              ]}
              rows={rows}
              emptyMessage="No applications yet."
              actions={(row) => (
                <button type="button" onClick={() => viewResume(row.resume_path)} className="text-blue hover:text-ink">
                  View resume
                </button>
              )}
            />
          )}
        </div>
      </Container>
    </>
  )
}
