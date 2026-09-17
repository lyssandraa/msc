import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

export function useCommittee() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase.from('committee_members').select('*').order('sort_order', { ascending: true }),
  )
  return { committee: data ?? [], loading, error }
}
