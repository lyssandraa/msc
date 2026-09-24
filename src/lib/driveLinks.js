// Converts a Google Drive file link (as stored in a Form's file-upload
// response cell, e.g. "https://drive.google.com/open?id=...") into usable
// URLs. Drive file IDs are long (usually 28-44 char) runs of letters,
// digits, - and _, so matching that pattern is more robust than trying to
// match every URL shape Drive/Forms might produce.
function extractDriveId(value) {
  if (!value) return null
  const match = value.match(/[-\w]{25,}/)
  return match ? match[0] : null
}

/** A link that opens the file in Drive's viewer - used for the PDF "Download" link. */
export function driveViewUrl(value) {
  const id = extractDriveId(value)
  return id ? `https://drive.google.com/file/d/${id}/view` : value || null
}

/** A direct, embeddable image URL - used for the cover image <img src>. */
export function driveImageUrl(value) {
  if (!value) return null
  const id = extractDriveId(value)
  // Falls back to the raw value so a plain (non-Drive) image URL still
  // works as-is - useful for testing, and harmless in production.
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : value
}
