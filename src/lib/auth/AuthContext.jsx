import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../supabaseClient.js'

export const AuthContext = createContext(undefined)

async function fetchProfile(userId) {
  if (!userId) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .single()
  return error ? null : data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    // Guards against the initial getSession() call resolving *after* the
    // auth-state listener has already handled a real event (e.g. the user
    // logs in before the slow initial check finishes) - without this, the
    // stale "no session" result can silently overwrite a fresh sign-in.
    let initialized = false

    async function syncSession(session, { showLoading }) {
      if (showLoading) setLoading(true)
      const nextUser = session?.user ?? null
      const nextProfile = await fetchProfile(nextUser?.id)
      if (!active) return
      setUser(nextUser)
      setProfile(nextProfile)
      setLoading(false)
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!active || initialized) return
      initialized = true
      syncSession(data.session, { showLoading: false })
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      initialized = true
      // Only a real identity change (signing in/out) should show a loading
      // state - RequireAuth unmounts the protected page while loading is
      // true, so treating routine events like TOKEN_REFRESHED the same way
      // would kick an admin off whatever page they're on (and lose any
      // unsaved form state) every time their session silently refreshes.
      const identityChanged = event === 'SIGNED_IN' || event === 'SIGNED_OUT'
      syncSession(session, { showLoading: identityChanged })
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback((email, password) => supabase.auth.signInWithPassword({ email, password }), [])
  const signOut = useCallback(() => supabase.auth.signOut(), [])

  const value = useMemo(
    () => ({ user, profile, loading, signIn, signOut }),
    [user, profile, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
