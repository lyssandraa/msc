import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

export function useSponsors() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase.from('sponsors').select('*').order('sort_order', { ascending: true }),
  )
  return { sponsors: data ?? [], loading, error }
}
