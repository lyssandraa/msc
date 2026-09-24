/** Falls back to the raw string on an unparseable date, rather than "Invalid Date". */
export function formatDate(isoDate) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
