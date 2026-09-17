import { createClient } from '@supabase/supabase-js'

// Same env-var story as invite-user.js: Vercel injects every configured var
// into this function's process.env regardless of the VITE_ prefix, so
// reusing the client URL/anon key here is safe. RESEND_API_KEY is a second
// server-only secret alongside SUPABASE_SERVICE_ROLE_KEY - never VITE_-
// prefixed, never imported anywhere under src/.
const supabaseUrl = process.env.VITE_SUPABASE_URL
const anonKey = process.env.VITE_SUPABASE_ANON_KEY
const resendApiKey = process.env.RESEND_API_KEY
// Resend's shared sandbox sender - only deliverable to your own Resend
// account email until you verify a sending domain. Set RESEND_FROM_EMAIL
// once a domain is verified (see docs/ARCHITECTURE.md).
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

// Deliberately only two states have copy: emailing on every internal status
// change (new -> reviewed -> shortlisted) would be noisy and premature -
// applicants only hear from us once there's an actual outcome. Edit this
// wording to match the committee's voice; it's a first draft, not final copy.
const templates = {
  accepted: {
    subject: 'Your application to Mersey Student Capital',
    text: (name) =>
      `Hi ${name},\n\n` +
      `Thank you for applying to Mersey Student Capital. We're pleased to let you know your application has been accepted - welcome to the society.\n\n` +
      `A member of the committee will be in touch shortly with next steps.\n\n` +
      `Best,\nThe Mersey Student Capital Committee`,
  },
  rejected: {
    subject: 'Your application to Mersey Student Capital',
    text: (name) =>
      `Hi ${name},\n\n` +
      `Thank you for taking the time to apply to Mersey Student Capital. After careful review, we won't be moving forward with your application on this occasion.\n\n` +
      `We'd encourage you to apply again in a future term.\n\n` +
      `Best,\nThe Mersey Student Capital Committee`,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = (req.headers.authorization ?? '').replace(/^Bearer /, '')
  if (!token) {
    res.status(401).json({ error: 'Missing authorization token' })
    return
  }

  const { email, full_name, status } = req.body ?? {}
  const template = templates[status]
  if (!email || !full_name || !template) {
    res.status(400).json({ error: 'email, full_name and a valid status (accepted/rejected) are required' })
    return
  }

  // Every account is an admin, so the only check is "is this a real,
  // logged-in user" - no role lookup needed (see docs/ARCHITECTURE.md).
  const callerClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
  const { data: callerData, error: callerError } = await callerClient.auth.getUser()
  if (callerError || !callerData?.user) {
    res.status(401).json({ error: 'Invalid session' })
    return
  }

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: email,
      subject: template.subject,
      text: template.text(full_name),
    }),
  })

  if (!emailRes.ok) {
    const body = await emailRes.text()
    res.status(502).json({ error: 'Resend error: ' + body })
    return
  }

  res.status(200).json({ ok: true })
}
