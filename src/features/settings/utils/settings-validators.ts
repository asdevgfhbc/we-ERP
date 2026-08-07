export function requiredValue(value: FormDataEntryValue | null | undefined) {
  return String(value ?? '').trim().length > 0
}

export function validEmail(value: FormDataEntryValue | null | undefined) {
  const text = String(value ?? '').trim()
  return text.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
}

export function validPhone(value: FormDataEntryValue | null | undefined) {
  const text = String(value ?? '').replace(/[^0-9+]/g, '')
  return text.length >= 8
}

export function atLeastOneFile(fileInput: FormDataEntryValue | null | undefined) {
  const file = fileInput as File | null
  return !!file && Number(file.size ?? 0) > 0
}
