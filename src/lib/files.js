/** Strips characters that are awkward in a Supabase Storage object key. */
export function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
}
