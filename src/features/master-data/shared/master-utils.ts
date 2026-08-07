import { formatCurrency } from '@/lib/utils'

export function textValue(value: unknown) {
  if (value == null) return ''
  return String(value)
}

export function csvValue(value: unknown) {
  return `"${textValue(value).replace(/"/g, '""')}"`
}

export function exportFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export function isCurrencyKey(key: string) {
  const lower = key.toLowerCase()
  return lower.includes('amount') || lower.includes('value') || lower.includes('limit') || lower.includes('outstanding')
}

export function displayValueByKey(key: string, value: unknown) {
  if (isCurrencyKey(key)) {
    return formatCurrency(Number(value || 0))
  }
  return textValue(value)
}

export function prettyLabel(value: string) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())
}
