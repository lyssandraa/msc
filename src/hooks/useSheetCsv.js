import { useEffect, useState } from 'react'
import { parseCsvToObjects } from '../lib/csv.js'

/**
 * Fetches a published Google Sheet CSV and maps each row through `mapRow`.
 * Shared by every page whose content lives in a Sheet (Research, Updates).
 *
 * `expectedColumns` (optional) is the list of header names the caller relies
 * on - if a row comes back missing one (e.g. someone renamed a question in
 * the Google Form), this logs a warning naming the mismatch instead of
 * letting that field silently render blank everywhere with no indication
 * why.
 */
export function useSheetCsv(url, mapRow, expectedColumns) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    let active = true

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        if (!active) return
        const rows = parseCsvToObjects(text)

        if (expectedColumns && rows.length > 0) {
          const headers = Object.keys(rows[0])
          const missing = expectedColumns.filter((column) => !headers.includes(column))
          if (missing.length > 0) {
            console.warn(
              `Sheet at ${url} is missing expected column(s): ${missing.join(', ')}. ` +
                `Check the Google Form's question titles still match.`,
            )
          }
        }

        setState({ items: rows.map(mapRow), loading: false, error: null })
      })
      .catch((error) => {
        if (!active) return
        setState({ items: [], loading: false, error: error.message })
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return state
}
