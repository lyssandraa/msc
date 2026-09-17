import { useState } from 'react'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { inputClass, labelClass, primaryButtonClass } from '../components/formStyles.js'
import { useSectorTeams } from '../hooks/useSectorTeams.js'
import { sanitizeFilename } from '../lib/files.js'
import { supabase } from '../lib/supabaseClient.js'
import { site } from '../site.config.js'

const points = [
  'No prior finance experience is required.',
  'Analysts join one of five sector teams and meet weekly through the term.',
  'You will be writing and presenting research from the start, with the committee reviewing every pitch.',
]

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const APPLIED_KEY = 'msc_applied'

const emptyForm = {
  fullName: '',
  email: '',
  yearOfStudy: '',
  course: '',
  preferredSector: '',
  coverNote: '',
  // Honeypot field - deliberately not named anything a real autofill tool
  // (browser extensions, business-profile fillers) would target, e.g.
  // "website" or "company", to reduce false positives against genuine
  // applicants. Simple bots that blindly fill every input still trip it.
  referralCode: '',
}

export default function Apply() {
  const { sectorTeams } = useSectorTeams()
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(() => {
    try {
      return localStorage.getItem(APPLIED_KEY) === '1'
    } catch {
      return false
    }
  })

  function field(key, value) {
    setForm({ ...form, [key]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    // Honeypot: real applicants never see or fill this field.
    if (form.referralCode) {
      setSubmitted(true)
      return
    }
    if (!form.fullName.trim() || !form.email.trim() || !form.preferredSector) {
      setError('Please fill in your name, email and preferred sector.')
      return
    }
    if (!file) {
      setError('Please attach your CV.')
      return
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('CV must be a PDF or Word document.')
      return
    }
    if (file.size > MAX_RESUME_BYTES) {
      setError('CV must be under 5MB.')
      return
    }

    setSubmitting(true)

    const path = `${crypto.randomUUID()}-${sanitizeFilename(file.name)}`

    const { error: uploadError } = await supabase.storage.from('resumes').upload(path, file)
    if (uploadError) {
      setSubmitting(false)
      setError('Could not upload your CV. Please try again.')
      return
    }

    const { error: insertError } = await supabase.from('applications').insert({
      full_name: form.fullName,
      email: form.email,
      year_of_study: form.yearOfStudy || null,
      course: form.course || null,
      preferred_sector: form.preferredSector || null,
      cover_note: form.coverNote || null,
      resume_path: path,
    })

    setSubmitting(false)

    if (insertError) {
      setError('Could not submit your application. Please try again.')
      return
    }

    try {
      localStorage.setItem(APPLIED_KEY, '1')
    } catch {
      // localStorage unavailable (private browsing etc.) - not fatal, just skip the resubmit guard.
    }
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Apply to join."
        intro="We take new analysts at the start of each term."
      />

      <Container narrow className="py-12">
        <Reveal>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[1rem] leading-relaxed">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {submitted ? (
          <Reveal delay={100} className="mt-10 border border-line bg-paper px-6 py-8">
            <p className="font-display text-lg">Application received.</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
              Thank you for applying. The committee reviews applications on a rolling basis and
              will be in touch by email.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={100} className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => field('fullName', e.target.value)}
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => field('email', e.target.value)}
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Year of study (optional)</label>
                  <input
                    type="text"
                    value={form.yearOfStudy}
                    onChange={(e) => field('yearOfStudy', e.target.value)}
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Course (optional)</label>
                  <input
                    type="text"
                    value={form.course}
                    onChange={(e) => field('course', e.target.value)}
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred sector</label>
                <select
                  required
                  value={form.preferredSector}
                  onChange={(e) => field('preferredSector', e.target.value)}
                  className={`mt-1.5 ${inputClass}`}
                >
                  <option value="" disabled>
                    Select a sector…
                  </option>
                  {sectorTeams.map((team) => (
                    <option key={team.id} value={team.sector}>
                      {team.sector}
                    </option>
                  ))}
                  <option value="No preference">No preference</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Why do you want to join? (optional)</label>
                <textarea
                  rows={4}
                  value={form.coverNote}
                  onChange={(e) => field('coverNote', e.target.value)}
                  className={`mt-1.5 ${inputClass}`}
                />
              </div>

              <div>
                <label className={labelClass}>CV (PDF or Word, up to 5MB)</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="mt-1.5 block w-full text-sm text-mute file:mr-4 file:border file:border-line file:bg-white file:px-4 file:py-2 file:text-sm file:text-ink"
                />
              </div>

              {/* Honeypot: hidden from real users, bots that auto-fill every field will trip it. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="referral_code">Referral code</label>
                <input
                  id="referral_code"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.referralCode}
                  onChange={(e) => field('referralCode', e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={submitting} className={primaryButtonClass}>
                {submitting ? 'Submitting…' : 'Submit application'}
              </button>
            </form>

            <p className="mt-8 text-sm text-mute">
              Questions first?{' '}
              <a
                href={`mailto:${site.email}`}
                className="border-b border-line pb-0.5 text-mute transition-colors hover:border-ink hover:text-ink"
              >
                Email the committee
              </a>
              .
            </p>
          </Reveal>
        )}
      </Container>
    </>
  )
}
