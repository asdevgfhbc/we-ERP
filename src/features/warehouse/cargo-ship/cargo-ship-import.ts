import * as XLSX from 'xlsx'
import { cargoShipColumns } from './cargo-ship-columns'

export type CargoShipRow = {
  shipping_mark: string
  pictures: string
  hs_code: string
  item_number: string
  product_name_en: string
  product_name_zh: string
  specification: string
  material: string
  total_qty: number | null
  unit_price_rmb: number | null
  total_price_rmb: number | null
  unit: string
  qty_per_ctn: number | null
  ctns: number | null
  ctn_no: string
  cbm_per_ctn: number | null
  cbm_per_item: number | null
  total_cbm: number | null
  net_weight: number | null
  ctn_kg_gw: number | null
  total_kg: number | null
  g_t: string
}

type CargoShipImportValidationError = {
  row: number
  field: string
  reason: string
}

type CargoShipImportResponse = {
  success?: boolean
  message?: string
  imported?: number
  errors?: CargoShipImportValidationError[]
  detail?: string
}

const API_URL = 'http://localhost:3001/api/cargo-ship'
const SUPPORTED_FILE_EXTENSIONS = ['.xlsx', '.xls']

const REQUIRED_HEADERS = cargoShipColumns.map((column) => column.excel)
const NUMERIC_COLUMNS = new Set<keyof CargoShipRow>([
  'total_qty',
  'unit_price_rmb',
  'total_price_rmb',
  'qty_per_ctn',
  'ctns',
  'cbm_per_ctn',
  'cbm_per_item',
  'total_cbm',
  'net_weight',
  'ctn_kg_gw',
  'total_kg',
])

const normalizeHeader = (value: unknown) =>
  String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()

const getFileExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.')
  return lastDotIndex >= 0 ? fileName.slice(lastDotIndex).toLowerCase() : ''
}

const normalizeCellText = (value: unknown) =>
  String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/^'+/, '')
    .trim()

const extractPrimitiveValue = (value: unknown): unknown => {
  if (typeof value !== 'object' || value === null) {
    return value
  }

  if ('v' in value) {
    return (value as { v?: unknown }).v
  }

  if ('w' in value) {
    return (value as { w?: unknown }).w
  }

  return value
}

const normalizeNumericString = (value: string) => {
  let normalized = value
    .replace(/\s+/g, '')
    .replace(/[Rr][Mm][Bb]/g, '')
    .replace(/[^0-9,().+-]/g, '')

  if (!normalized) {
    return ''
  }

  const isNegativeByParentheses = normalized.startsWith('(') && normalized.endsWith(')')

  normalized = normalized.replace(/[()]/g, '')

  const lastComma = normalized.lastIndexOf(',')
  const lastDot = normalized.lastIndexOf('.')

  if (lastComma >= 0 && lastDot >= 0) {
    const decimalSeparator = lastComma > lastDot ? ',' : '.'
    const thousandsSeparator = decimalSeparator === ',' ? '.' : ','

    normalized = normalized.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')

    if (decimalSeparator === ',') {
      normalized = `${normalized.slice(0, lastComma).replace(/,/g, '')}.${normalized.slice(lastComma + 1).replace(/,/g, '')}`
    }
  } else if (lastComma >= 0 && lastDot === -1) {
    const commaCount = (normalized.match(/,/g) ?? []).length

    if (commaCount === 1) {
      const decimals = normalized.length - lastComma - 1
      normalized = decimals > 0 && decimals <= 6
        ? `${normalized.slice(0, lastComma)}.${normalized.slice(lastComma + 1)}`
        : normalized.replace(/,/g, '')
    } else {
      normalized = normalized.replace(/,/g, '')
    }
  } else if (lastDot >= 0) {
    const dotCount = (normalized.match(/\./g) ?? []).length

    if (dotCount > 1) {
      const decimalIndex = normalized.lastIndexOf('.')
      normalized = `${normalized.slice(0, decimalIndex).replace(/\./g, '')}.${normalized.slice(decimalIndex + 1)}`
    }
  }

  if (isNegativeByParentheses && !normalized.startsWith('-')) {
    normalized = `-${normalized}`
  }

  return normalized
}

const toNumber = (value: unknown): number | null => {
  const primitiveValue = extractPrimitiveValue(value)

  if (primitiveValue === null || primitiveValue === undefined || primitiveValue === '') {
    return null
  }

  if (typeof primitiveValue === 'number') {
    return Number.isFinite(primitiveValue) ? primitiveValue : null
  }

  const normalizedText = normalizeCellText(primitiveValue)

  if (normalizedText === '') {
    return null
  }

  const normalizedNumberText = normalizeNumericString(normalizedText)

  if (normalizedNumberText === '') {
    return null
  }

  const parsed = Number(normalizedNumberText)

  return Number.isFinite(parsed) ? parsed : null
}

const getAcceptedHeaders = (index: number) => {
  const column = cargoShipColumns[index] as (typeof cargoShipColumns)[number] & {
    aliases?: string[]
  }

  return [column.excel, ...(column.aliases ?? [])].map(normalizeHeader)
}

const parseNumericCell = (
  value: unknown,
  column: keyof CargoShipRow,
  excelRow: number,
  label: string,
  errors: string[],
) => {
  const trimmedValue = normalizeCellText(extractPrimitiveValue(value))

  if (trimmedValue === '') {
    return null
  }

  const parsed = toNumber(value)

  if (parsed === null && NUMERIC_COLUMNS.has(column)) {
    errors.push(`Excel row ${excelRow}: ${label} must be a valid number.`)
  }

  return parsed
}

const buildRowKey = (row: CargoShipRow) => [
  row.shipping_mark,
  row.item_number,
  row.product_name_en,
  row.ctn_no,
].join('::')

const formatValidationErrors = (errors: CargoShipImportValidationError[]) =>
  errors
    .slice(0, 10)
    .map((error) => `Row ${error.row} | ${error.field}: ${error.reason}`)
    .join('\n')

export function validateCargoShipFile(file: File) {
  const extension = getFileExtension(file.name)

  if (!SUPPORTED_FILE_EXTENSIONS.includes(extension)) {
    throw new Error('Cargo Ship import supports Excel files only (.xlsx, .xls).')
  }
}

export async function getCargoShipRows(): Promise<CargoShipRow[]> {
  const response = await fetch(API_URL)
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to load Cargo Ship records.')
  }

  return Array.isArray(result.data) ? result.data : []
}

export function validateCargoShipHeaders(headers: unknown[]) {
  if (headers.length < REQUIRED_HEADERS.length) {
    return {
      valid: false,
      message: `Cargo Ship Excel file must contain at least ${REQUIRED_HEADERS.length} columns.`,
    }
  }

  for (let index = 0; index < REQUIRED_HEADERS.length; index += 1) {
    const actual = normalizeHeader(headers[index])
    const acceptedHeaders = getAcceptedHeaders(index)

    if (!acceptedHeaders.includes(actual)) {
      return {
        valid: false,
        message: `Column ${index + 1} is incorrect. Expected "${REQUIRED_HEADERS[index]}" but found "${String(headers[index] ?? '')}".`,
      }
    }
  }

  return {
    valid: true,
    message: 'Cargo Ship headers are valid.',
  }
}

export async function importCargoShipExcel(file: File) {
  validateCargoShipFile(file)

  const buffer = await file.arrayBuffer()

  const workbook = XLSX.read(buffer, {
    type: 'array',
  })

  const firstSheetName = workbook.SheetNames[0]

  if (!firstSheetName) {
    throw new Error('The Excel file does not contain a worksheet.')
  }

  const sheet = workbook.Sheets[firstSheetName]

  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: '',
    raw: true,
  })

  const headers = matrix[0] ?? []
  const headerValidation = validateCargoShipHeaders(headers)

  if (!headerValidation.valid) {
    throw new Error(headerValidation.message)
  }

  const dataRows = matrix.slice(1)

  if (dataRows.length === 0) {
    throw new Error('The Excel file does not contain any data rows.')
  }

  const rows: CargoShipRow[] = []
  const errors: string[] = []
  const seenRowKeys = new Map<string, number>()

  dataRows.forEach((row, rowIndex) => {
    const excelRow = rowIndex + 2

    const isEmpty = row.every((value) => normalizeCellText(extractPrimitiveValue(value)) === '')

    if (isEmpty) return

    const rowErrors: string[] = []

    const record: CargoShipRow = {
      shipping_mark: normalizeCellText(extractPrimitiveValue(row[0])),
      pictures: normalizeCellText(extractPrimitiveValue(row[1])),
      hs_code: normalizeCellText(extractPrimitiveValue(row[2])),
      item_number: normalizeCellText(extractPrimitiveValue(row[3])),
      product_name_en: normalizeCellText(extractPrimitiveValue(row[4])),
      product_name_zh: normalizeCellText(extractPrimitiveValue(row[5])),
      specification: normalizeCellText(extractPrimitiveValue(row[6])),
      material: normalizeCellText(extractPrimitiveValue(row[7])),
      total_qty: parseNumericCell(row[8], 'total_qty', excelRow, 'TOTAL QTY', rowErrors),
      unit_price_rmb: parseNumericCell(row[9], 'unit_price_rmb', excelRow, 'UNIT PRICE(RMB)', rowErrors),
      total_price_rmb: parseNumericCell(row[10], 'total_price_rmb', excelRow, 'TOTAL PRICE(RMB)', rowErrors),
      unit: normalizeCellText(extractPrimitiveValue(row[11])),
      qty_per_ctn: parseNumericCell(row[12], 'qty_per_ctn', excelRow, 'QTY/CTN', rowErrors),
      ctns: parseNumericCell(row[13], 'ctns', excelRow, 'CTNS', rowErrors),
      ctn_no: normalizeCellText(extractPrimitiveValue(row[14])),
      cbm_per_ctn: parseNumericCell(row[15], 'cbm_per_ctn', excelRow, 'CBM/CTN', rowErrors),
      cbm_per_item: parseNumericCell(row[16], 'cbm_per_item', excelRow, 'CBM/ITEM', rowErrors),
      total_cbm: parseNumericCell(row[17], 'total_cbm', excelRow, 'TOTAL/CBM', rowErrors),
      net_weight: parseNumericCell(row[18], 'net_weight', excelRow, 'NET WEIGHT', rowErrors),
      ctn_kg_gw: parseNumericCell(row[19], 'ctn_kg_gw', excelRow, 'CTN/KG GW', rowErrors),
      total_kg: parseNumericCell(row[20], 'total_kg', excelRow, 'TOTAL/KG', rowErrors),
      g_t: normalizeCellText(extractPrimitiveValue(row[21])),
    }

    if (!record.item_number) {
      rowErrors.push(`Excel row ${excelRow}: Item Number is required.`)
    }

    if (!record.product_name_en) {
      rowErrors.push(`Excel row ${excelRow}: Product name(English) is required.`)
    }

    const duplicateKey = buildRowKey(record)

    if (duplicateKey !== '::::') {
      const firstSeenRow = seenRowKeys.get(duplicateKey)

      if (firstSeenRow) {
        rowErrors.push(`Excel row ${excelRow}: Duplicate row matches Excel row ${firstSeenRow}.`)
      } else {
        seenRowKeys.set(duplicateKey, excelRow)
      }
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors)
      return
    }

    rows.push(record)
  })

  if (errors.length > 0) {
    throw new Error(errors.slice(0, 10).join('\n'))
  }

  if (rows.length === 0) {
    throw new Error('No valid Cargo Ship rows found in the Excel file.')
  }

  const response = await fetch(`${API_URL}/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rows }),
  })

  const result = await response.json() as CargoShipImportResponse

  if (!response.ok || !result.success) {
    const validationMessage = Array.isArray(result.errors) && result.errors.length > 0
      ? formatValidationErrors(result.errors)
      : ''

    throw new Error(
      validationMessage || result.message || result.detail || 'Cargo Ship import failed.',
    )
  }

  return {
    rows,
    importedCount: result.imported,
  }
}
