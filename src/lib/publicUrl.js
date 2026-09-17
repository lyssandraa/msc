import { supabase } from './supabaseClient.js'

/** URL for a file in a public bucket (research, sponsors). No signing needed. */
export function publicUrl(bucket, path) {
  if (!path) return null
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}
