/** Shown when a page's Google Sheet fetch fails - shared by Research and Updates. */
export default function SheetStatusBanner({ error, resourceLabel }) {
  if (!error) return null
  return (
    <p className="mb-8 border border-line bg-paper px-5 py-4 text-sm text-red-600">
      Could not load {resourceLabel}: {error}
    </p>
  )
}
