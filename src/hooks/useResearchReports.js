import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

export function useResearchReports() {
  const { data, loading, error } = useSupabaseQuery(() =>
    supabase.from('research_reports').select('*').order('published_at', { ascending: false }),
  )
  return { reports: data ?? [], loading, error }
}
