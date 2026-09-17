import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

export function useAlumniDestinations() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase.from('alumni_destinations').select('*').order('sort_order', { ascending: true }),
  )
  return { destinations: data ?? [], loading, error }
}
