import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

export function useSectorTeams() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase.from('sector_teams').select('*').order('sort_order', { ascending: true }),
  )
  return { sectorTeams: data ?? [], loading, error }
}
