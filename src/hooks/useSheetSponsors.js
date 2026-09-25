import { useSheetCsv } from './useSheetCsv.js'
import { driveImageUrl } from '../lib/driveLinks.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1IYddQ8TLsX1rg07_FAItnvceOKNHEjDxFd3GZKWBP9E/export?format=csv'

const COLUMNS = {
  name: 'Name',
  logo: 'Logo',
  websiteUrl: 'Website URL',
}

function mapRow(row) {
  return {
    name: row[COLUMNS.name] ?? '',
    logo: driveImageUrl(row[COLUMNS.logo]),
    websiteUrl: row[COLUMNS.websiteUrl] || null,
  }
}

export function useSheetSponsors() {
  const { items, loading, error } = useSheetCsv(SHEET_CSV_URL, mapRow, Object.values(COLUMNS))
  return { sponsors: items, loading, error }
}
