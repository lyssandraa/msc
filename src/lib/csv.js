/** Minimal RFC4180-ish CSV parser - handles quoted fields with embedded commas/newlines. */
export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && next === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((cell) => cell !== ''))
}

/** Parses CSV text into objects keyed by the header row. */
export function parseCsvToObjects(text) {
  const rows = parseCsv(text)
  if (rows.length === 0) return []
  const [header, ...dataRows] = rows
  return dataRows.map((row) => Object.fromEntries(header.map((key, i) => [key.trim(), (row[i] ?? '').trim()])))
}
