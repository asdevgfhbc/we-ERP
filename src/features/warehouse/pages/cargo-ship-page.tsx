import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, CardContent, Select, Table, TBody, Td, Th, THead, Tr } from '@/components/ui/primitives'
import {
  getCargoShipRows,
  importCargoShipExcel,
  type CargoShipRow,
  validateCargoShipFile,
} from '@/features/warehouse/cargo-ship/cargo-ship-import'
import { cargoShipColumns } from '@/features/warehouse/cargo-ship/cargo-ship-columns'

const RIGHT_ALIGNED_COLUMNS = new Set([
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

function formatCellValue(value: CargoShipRow[keyof CargoShipRow] | null | undefined) {
  if (value === null || value === undefined) {
    return ''
  }

  return String(value)
}

function getCargoShipRowKey(row: CargoShipRow) {
  return [
    row.shipping_mark,
    row.item_number,
    row.product_name_en,
    row.ctn_no,
  ].join('::')
}

type UploadedFileFilter = {
  name: string
  rowKeys: string[]
}

export function CargoShipPage() {
  const [rows, setRows] = useState<CargoShipRow[]>([])
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileFilter[]>([])
  const [selectedFileName, setSelectedFileName] = useState('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const visibleRows = useMemo(() => {
    if (selectedFileName === 'all') {
      return rows
    }

    const selectedFile = uploadedFiles.find((file) => file.name === selectedFileName)

    if (!selectedFile) {
      return rows
    }

    const allowedKeys = new Set(selectedFile.rowKeys)

    return rows.filter((row) => allowedKeys.has(getCargoShipRowKey(row)))
  }, [rows, selectedFileName, uploadedFiles])

  const handleDelete = (rowKey: string) => {
    const confirmed = window.confirm('Delete this Cargo Ship item from the current list?')

    if (!confirmed) {
      return
    }

    setRows((currentRows) => currentRows.filter((row) => getCargoShipRowKey(row) !== rowKey))
    setUploadedFiles((currentFiles) => currentFiles
      .map((file) => ({
        ...file,
        rowKeys: file.rowKeys.filter((key) => key !== rowKey),
      }))
      .filter((file) => file.rowKeys.length > 0))
  }

  const loadRows = async () => {
    try {
      setError('')
      const data = await getCargoShipRows()
      setRows(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Cargo Ship records.')
      return []
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async (file: File) => {
    try {
      setImporting(true)
      setError('')
      setMessage('')

      validateCargoShipFile(file)

      const result = await importCargoShipExcel(file)
      const latestRows = await loadRows()
      const importedRowKeys = result.rows.map(getCargoShipRowKey)

      setUploadedFiles((currentFiles) => {
        const nextFiles = currentFiles.filter((entry) => entry.name !== file.name)

        return [
          ...nextFiles,
          {
            name: file.name,
            rowKeys: importedRowKeys,
          },
        ]
      })
      setSelectedFileName(file.name)
      setRows(latestRows)
      setMessage(`Imported ${result.importedCount ?? result.rows.length} row(s) from ${file.name}. Showing items from this file.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cargo Ship import failed.')
    } finally {
      setImporting(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  useEffect(() => {
    void loadRows()
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Cargo Ship
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage Cargo Ship shipment and item records.
        </p>
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]

            if (file) {
              void handleImport(file)
            }
          }}
        />

        <Button
          type="button"
          className="h-9 rounded-md px-3 text-xs"
          disabled={importing}
          onClick={() => fileInputRef.current?.click()}
        >
          {importing ? 'Uploading...' : 'Upload Excel'}
        </Button>
      </div>

      <div className="max-w-xs">
        <Select
          value={selectedFileName}
          onChange={(event) => setSelectedFileName(event.target.value)}
        >
          <option value="all">All Records</option>
          {uploadedFiles.map((file) => (
            <option key={file.name} value={file.name}>
              {file.name}
            </option>
          ))}
        </Select>
      </div>

      {message ? (
        <Card>
          <CardContent className="pt-5 text-sm text-emerald-600">
            {message}
          </CardContent>
        </Card>
      ) : null}

      {error ? (
        <Card>
          <CardContent className="pt-5 whitespace-pre-line text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <Card>
          <CardContent className="pt-5 text-sm text-muted-foreground">
            Loading Cargo Ship records...
          </CardContent>
        </Card>
      ) : visibleRows.length === 0 ? (
        <Card>
          <CardContent className="pt-5 text-sm text-muted-foreground">
            {selectedFileName !== 'all' ? `No Cargo Ship items found for ${selectedFileName}.` : 'No Cargo Ship records found.'}
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table className="min-w-0 table-fixed text-[11px] leading-tight">
            <THead>
              <Tr>
                {cargoShipColumns.map((column) => (
                  <Th
                    key={column.db}
                    className={RIGHT_ALIGNED_COLUMNS.has(column.db) ? 'px-2 py-2 text-right align-top whitespace-normal break-words' : 'px-2 py-2 align-top whitespace-normal break-words'}
                  >
                    {column.excel}
                  </Th>
                ))}
                <Th className="px-2 py-2 text-center align-top">Delete</Th>
              </Tr>
            </THead>
            <TBody>
              {visibleRows.map((row, index) => {
                const rowKey = getCargoShipRowKey(row)

                return (
                <Tr key={`${row.item_number}-${row.shipping_mark}-${index}`}>
                  {cargoShipColumns.map((column) => (
                    <Td
                      key={`${row.item_number}-${column.db}-${index}`}
                      className={RIGHT_ALIGNED_COLUMNS.has(column.db) ? 'px-2 py-2 text-right align-top whitespace-normal break-words' : 'px-2 py-2 align-top whitespace-normal break-words'}
                    >
                      {formatCellValue(row[column.db as keyof CargoShipRow])}
                    </Td>
                  ))}
                  <Td className="px-2 py-2 text-center align-top">
                    <Button
                      type="button"
                      className="h-7 rounded-md bg-destructive px-2 text-[10px] text-white"
                      onClick={() => handleDelete(rowKey)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              )})}
            </TBody>
          </Table>
        </div>
      )}
    </div>
  )
}
