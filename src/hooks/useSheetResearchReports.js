import { useSheetCsv } from './useSheetCsv.js'
import { driveImageUrl, driveViewUrl } from '../lib/driveLinks.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1PLbZ-3MP-nQEf4jsEDSRwamfJB1Pbh33vGeCsgAH3oA/export?format=csv'

// Must match the Google Form's question titles exactly - if a question is
// ever renamed there, update the matching value here too (useSheetCsv warns
// in the console if they drift out of sync).
const COLUMNS = {
  title: 'Title',
  category: 'Category',
  summary: 'Summary',
  publishedAt: 'Published date',
  pdf: 'PDF',
  cover: 'Cover image',
}

function mapRow(row, i) {
  return {
    id: String(i),
    title: row[COLUMNS.title] ?? '',
    category: row[COLUMNS.category] ?? '',
    summary: row[COLUMNS.summary] ?? '',
    published_at: row[COLUMNS.publishedAt] ?? '',
    // The PDF/cover-image questions only accept a single file each - a
    // multi-file response would only surface its first file here.
    pdfUrl: driveViewUrl(row[COLUMNS.pdf]),
    coverUrl: driveImageUrl(row[COLUMNS.cover]),
  }
}

export function useSheetResearchReports() {
  const { items, loading, error } = useSheetCsv(SHEET_CSV_URL, mapRow, Object.values(COLUMNS))
  return { reports: items, loading, error }
}
