import { useEffect, useState } from 'react'
import { parseCsvToObjects } from '../lib/csv.js'
import { driveImageUrl, driveViewUrl } from '../lib/driveLinks.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1PLbZ-3MP-nQEf4jsEDSRwamfJB1Pbh33vGeCsgAH3oA/export?format=csv'

// Must match the Google Form's question titles exactly - those become the
// Sheet's column headers.
const COLUMNS = {
  title: 'Title',
  category: 'Category',
  summary: 'Summary',
  publishedAt: 'Published date',
  pdf: 'PDF',
  cover: 'Cover image',
}

export function useSheetResearchReports() {
  const [state, setState] = useState({ reports: [], loading: true, error: null })

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      setState({ reports: [], loading: false, error: 'not-configured' })
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
        const reports = rows.map((row, i) => ({
          id: String(i),
          title: row[COLUMNS.title] ?? '',
          category: row[COLUMNS.category] ?? '',
          summary: row[COLUMNS.summary] ?? '',
          published_at: row[COLUMNS.publishedAt] ?? '',
          pdfUrl: driveViewUrl(row[COLUMNS.pdf]),
          coverUrl: driveImageUrl(row[COLUMNS.cover]),
        }))
        setState({ reports, loading: false, error: null })
      })
      .catch((error) => {
        if (!active) return
        setState({ reports: [], loading: false, error: error.message })
      })

    return () => {
      active = false
    }
  }, [])

  return state
}
