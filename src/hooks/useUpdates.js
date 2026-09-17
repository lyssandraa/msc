import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

/** Published updates for the public Updates page. */
export function useUpdates() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase
      .from('updates')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false }),
  )
  return { updates: data ?? [], loading, error }
}
