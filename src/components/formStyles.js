// Shared classes for site forms (dashboard admin screens and the public
// Apply form), so every form looks consistent without repeating the same
// literal Tailwind strings across many files.
export const inputClass =
  'w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue'
export const labelClass = 'text-sm text-mute'
export const primaryButtonClass =
  'bg-slate px-6 py-2.5 text-sm text-white transition-colors hover:bg-blue disabled:opacity-60'
export const secondaryButtonClass =
  'border border-line px-6 py-2.5 text-sm text-mute transition-colors hover:border-ink hover:text-ink disabled:opacity-60'

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
