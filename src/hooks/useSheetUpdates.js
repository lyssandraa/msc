import { useSheetCsv } from './useSheetCsv.js'
import { slugify } from '../lib/slugify.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/19U868Aqjwz-75iEsi-w2Ew0wl5-tm1WnNTXnWU4N0pc/export?format=csv'

// Must match the Google Form's question titles exactly - if a question is
// ever renamed there, update the matching value here too (useSheetCsv warns
// in the console if they drift out of sync).
const COLUMNS = {
  title: 'Title',
  kind: 'Kind',
  date: 'Date',
  summary: 'Summary',
  byline: 'Byline',
  body: 'Body',
  disclaimer: 'Disclaimer',
}

function mapRow(row, i) {
  return {
    id: String(i),
    title: row[COLUMNS.title] ?? '',
    kind: row[COLUMNS.kind] ?? '',
    date: row[COLUMNS.date] ?? '',
    summary: row[COLUMNS.summary] ?? '',
    byline: row[COLUMNS.byline] ?? '',
    body: row[COLUMNS.body] ?? '',
    disclaimer: row[COLUMNS.disclaimer] ?? '',
  }
}

// The sheet has no slug column - one's derived from the title instead, so
// there's one fewer field to fill in on the form. Tracks already-assigned
// *final* slugs (not just base titles), so a generated "foo-2" from one
// duplicate title can't collide with a different title that also slugifies
// to "foo-2" - both get pushed further (e.g. "foo-2" and "foo-2-2").
function withUniqueSlugs(rows) {
  const used = new Set()
  return rows.map((row) => {
    const base = slugify(row.title) || 'update'
    let slug = base
    let suffix = 2
    while (used.has(slug)) {
      slug = `${base}-${suffix}`
      suffix++
    }
    used.add(slug)
    return { ...row, slug }
  })
}

export function useSheetUpdates() {
  const { items, loading, error } = useSheetCsv(SHEET_CSV_URL, mapRow, Object.values(COLUMNS))
  return { updates: withUniqueSlugs(items), loading, error }
}
