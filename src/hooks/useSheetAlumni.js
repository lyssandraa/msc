import { useSheetCsv } from './useSheetCsv.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1aadpV9MZYTaJyflTRF7A14kem8VHdAW6ZA4amZWtCe4/export?format=csv'

const COLUMNS = {
  firm: 'Firm',
  category: 'Category',
  detail: 'Detail',
}

// Maps the Form's human-readable category answer to the ids the filter tabs in data/alumni.js use.
const CATEGORY_IDS = {
  'investment banking': 'banking',
  'asset management': 'asset-management',
  'private markets': 'private-markets',
  technology: 'technology',
}

function mapRow(row) {
  const label = (row[COLUMNS.category] ?? '').trim().toLowerCase()
  return {
    firm: row[COLUMNS.firm] ?? '',
    category: CATEGORY_IDS[label] ?? label,
    detail: row[COLUMNS.detail] ?? '',
  }
}

export function useSheetAlumni() {
  const { items, loading, error } = useSheetCsv(SHEET_CSV_URL, mapRow, Object.values(COLUMNS))
  return { destinations: items, loading, error }
}
