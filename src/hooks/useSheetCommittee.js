import { useSheetCsv } from './useSheetCsv.js'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1SoEa2eoVDv56aqcykRnOqPGooluf9nJp0tAUhJOe6I4/export?format=csv'

const COLUMNS = {
  type: 'Type',
  name: 'Name',
  role: 'Role',
  remit: 'Remit',
  sector: 'Sector',
  lead: 'Head Analyst',
}

function mapRow(row) {
  return {
    type: (row[COLUMNS.type] ?? '').trim().toLowerCase(),
    name: row[COLUMNS.name] ?? '',
    role: row[COLUMNS.role] ?? '',
    remit: row[COLUMNS.remit] ?? '',
    sector: row[COLUMNS.sector] ?? '',
    lead: row[COLUMNS.lead] ?? '',
  }
}

/** One form/sheet holds both branches (Type = "Committee member" | "Sector team"); split here. */
export function useSheetCommittee() {
  const { items, loading, error } = useSheetCsv(SHEET_CSV_URL, mapRow, Object.values(COLUMNS))

  const committee = items
    .filter((row) => row.type === 'committee member')
    .map((row) => ({ name: row.name, role: row.role, remit: row.remit }))

  const sectorTeams = items
    .filter((row) => row.type === 'sector team')
    .map((row) => ({ sector: row.sector, lead: row.lead }))

  return { committee, sectorTeams, loading, error }
}
