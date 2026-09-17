// Single place for the things you will want to change first.

export const site = {
  name: 'Mersey Student Capital',
  short: 'MSC',
  location: 'Liverpool',

  // TODO: replace with the committee inbox.
  email: 'REPLACE@example.com',
}

export const navLinks = [
  { to: '/research', label: 'Research' },
  { to: '/thesis', label: 'Thesis' },
  { to: '/process', label: 'Process' },
  { to: '/committee', label: 'Committee' },
  { to: '/alumni', label: 'Alumni' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/updates', label: 'Updates' },
  { to: '/apply', label: 'Apply' },
]

// Kept separate from navLinks: this is an account action, not a content
// section, so Header renders it visually distinct from the rest of the nav.
export const membersLink = { to: '/login', label: 'Members' }
