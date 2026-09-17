import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.error(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copy .env.example to .env.local and fill them in.',
  )
}

// createClient() throws synchronously if either argument is falsy, which
// would crash the whole app before React ever renders (this module is
// imported from main.jsx via AuthContext). Falling back to a placeholder
// URL/key keeps that from happening - every request will simply fail at
// runtime instead, which the rest of the app already handles gracefully
// (see useSupabaseQuery.js), so a missing .env.local degrades to empty/error
// states on each page rather than a blank white screen.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key')
