import { createClient } from '@supabase/supabase-js'

// Vercel injects every env var configured in the dashboard into this
// function's process.env, regardless of the VITE_ prefix (that prefix only
// controls what Vite inlines into the *client* bundle at build time) - so
// reusing the same URL/anon key the browser uses is safe and intentional.
// SUPABASE_SERVICE_ROLE_KEY is the one secret in this whole project: it
// must only ever be read here, never in anything under src/.
const supabaseUrl = process.env.VITE_SUPABASE_URL
const anonKey = process.env.VITE_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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

  const { email, full_name } = req.body ?? {}
  if (!email || !full_name) {
    res.status(400).json({ error: 'email and full_name are required' })
    return
  }

  // Every account is an admin, so the only check is "is this a real,
  // logged-in user" - no role lookup needed.
  const callerClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
  const { data: callerData, error: callerError } = await callerClient.auth.getUser()
  if (callerError || !callerData?.user) {
    res.status(401).json({ error: 'Invalid session' })
    return
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey)
  const { error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { full_name },
  })

  if (inviteError) {
    res.status(400).json({ error: inviteError.message })
    return
  }

  res.status(200).json({ ok: true })
}
