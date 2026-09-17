// Fixed filter-tab taxonomy for the Alumni page. The actual destinations
// list now lives in the `alumni_destinations` table (see supabase/) -
// this stays a static file because the tabs are UI chrome, not content.
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'banking', label: 'Investment banking' },
  { id: 'asset-management', label: 'Asset management' },
  { id: 'private-markets', label: 'Private markets' },
  { id: 'technology', label: 'Technology' },
]
