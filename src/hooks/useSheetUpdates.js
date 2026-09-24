import { useEffect, useState } from 'react'
import { parseCsvToObjects } from '../lib/csv.js'
import { slugify } from '../lib/slugify.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/19U868Aqjwz-75iEsi-w2Ew0wl5-tm1WnNTXnWU4N0pc/export?format=csv'

// Must match the Google Form's question titles exactly.
const COLUMNS = {
  title: 'Title',
  kind: 'Kind',
  date: 'Date',
  summary: 'Summary',
  byline: 'Byline',
  body: 'Body',
  disclaimer: 'Disclaimer',
}

// The sheet has no slug column - one's derived from the title instead, so
// there's one fewer field to fill in on the form. Suffixed on collision so
// two posts with the same title still get distinct URLs.
function withUniqueSlugs(rows) {
  const seen = new Map()
  return rows.map((row) => {
    const base = slugify(row.title) || 'update'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return { ...row, slug: count === 0 ? base : `${base}-${count + 1}` }
  })
}

export function useSheetUpdates() {
  const [state, setState] = useState({ updates: [], loading: true, error: null })

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      setState({ updates: [], loading: false, error: 'not-configured' })
      return
    }

    let active = true

    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        if (!active) return
        const rows = parseCsvToObjects(text)
        const updates = rows.map((row, i) => ({
          id: String(i),
          title: row[COLUMNS.title] ?? '',
          kind: row[COLUMNS.kind] ?? '',
          date: row[COLUMNS.date] ?? '',
          summary: row[COLUMNS.summary] ?? '',
          byline: row[COLUMNS.byline] ?? '',
          body: row[COLUMNS.body] ?? '',
          disclaimer: row[COLUMNS.disclaimer] ?? '',
        }))
        setState({ updates: withUniqueSlugs(updates), loading: false, error: null })
      })
      .catch((error) => {
        if (!active) return
        setState({ updates: [], loading: false, error: error.message })
      })

    return () => {
      active = false
    }
  }, [])

  return state
}
