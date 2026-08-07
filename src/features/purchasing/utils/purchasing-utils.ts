export type PurchaseRow = Record<string, string | number | boolean | null | undefined>

export function textValue(value: unknown) {
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value ?? '')
}

export function csvValue(value: unknown) {
  const escaped = textValue(value).replace(/"/g, '""')
  return `"${escaped}"`
}

export function exportFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function slugifyName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
