import { supabase } from '../lib/supabaseClient.js'
import { useSupabaseQuery } from './useSupabaseQuery.js'

// No status filter here (unlike useUpdates) - RLS already hides unpublished
// rows from the public, and this lets an admin preview a draft by its slug.
export function useUpdateBySlug(slug) {
  const { data, loading, error } = useSupabaseQuery(
    () => supabase.from('updates').select('*').eq('slug', slug).maybeSingle(),
    [slug],
  )
  return { update: data, loading, error }
}
