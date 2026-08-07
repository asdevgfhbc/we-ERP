import { Download, Eye, FileText, Filter, Printer, Save, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  SecondaryButton,
  Select,
  Table,
  TableWrap,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from '@/components/ui/primitives'
import { StatusBadge } from '@/components/shared/page-primitives'
import type { MasterConfig, MasterRow } from './types'
import { csvValue, displayValueByKey, exportFile, textValue } from './master-utils'

const STATUS_OPTIONS = ['all', 'active', 'pending', 'completed', 'approved', 'inactive']

export function MasterDataTable({
  config,
  rows,
  onView,
  onEdit,
  onDelete,
}: {
  config: MasterConfig
  rows: MasterRow[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (ids: string[]) => void
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sortKey, setSortKey] = useState(config.columns[0]?.key ?? 'code')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    Object.fromEntries(config.columns.map((column) => [column.key, true])),
  )
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [savedFilter, setSavedFilter] = useState('Default View')

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase()
    return rows
      .filter((row) => {
        const queryMatch = !lower || Object.values(row).some((value) => textValue(value).toLowerCase().includes(lower))
        const statusMatch =
          status === 'all' || textValue(row.status).toLowerCase() === status
        return queryMatch && statusMatch
      })
      .sort((a, b) => {
        const left = a[sortKey]
        const right = b[sortKey]
        if (typeof left === 'number' && typeof right === 'number') {
          return sortDirection === 'asc' ? left - right : right - left
        }
        return sortDirection === 'asc'
          ? textValue(left).localeCompare(textValue(right))
          : textValue(right).localeCompare(textValue(left))
      })
  }, [query, rows, sortDirection, sortKey, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleRows = filtered.slice((page - 1) * pageSize, page * pageSize)
  const columns = config.columns.filter((column) => visibleColumns[column.key] !== false)

  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selectedIds.includes(String(row.id)))

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleRows.some((row) => String(row.id) === id)))
      return
    }
    setSelectedIds((prev) => {
      const set = new Set(prev)
      visibleRows.forEach((row) => set.add(String(row.id)))
      return Array.from(set)
    })
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const exportCsv = () => {
    const header = columns.map((column) => column.label).join(',')
    const body = filtered
      .map((row) => columns.map((column) => csvValue(row[column.key])).join(','))
      .join('\n')
    exportFile(`${config.entity}-export.csv`, `${header}\n${body}`, 'text/csv;charset=utf-8;')
  }

  const exportExcel = () => {
    const header = columns.map((column) => column.label).join('\t')
    const body = filtered
      .map((row) => columns.map((column) => textValue(row[column.key])).join('\t'))
      .join('\n')
    exportFile(`${config.entity}-export.xls`, `${header}\n${body}`, 'application/vnd.ms-excel')
  }

  const exportPdf = () => {
    const printable = [
      `${config.pluralLabel} Export`,
      '',
      columns.map((column) => column.label).join(' | '),
      ...filtered.map((row) => columns.map((column) => textValue(row[column.key])).join(' | ')),
    ].join('\n')
    exportFile(`${config.entity}-export.txt`, printable, 'text/plain;charset=utf-8;')
  }

  const confirmBulkDelete = () => {
    if (selectedIds.length === 0) return
    setConfirmDelete(true)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-[1.4fr_180px_180px_auto]">
          <Input
            placeholder={`Search ${config.pluralLabel.toLowerCase()}...`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Status' : option[0].toUpperCase() + option.slice(1)}
              </option>
            ))}
          </Select>
          <Select value={savedFilter} onChange={(event) => setSavedFilter(event.target.value)}>
            <option value="Default View">Saved: Default View</option>
            <option value="Low Stock Focus">Saved: Low Stock Focus</option>
            <option value="Recent Changes">Saved: Recent Changes</option>
          </Select>
          <div className="flex flex-wrap gap-2">
            <SecondaryButton className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </SecondaryButton>
            <SecondaryButton className="gap-2">
              <Save className="h-4 w-4" />
              Save Filter
            </SecondaryButton>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:hidden">
        {visibleRows.map((row) => {
          const id = String(row.id)
          return (
            <Card key={`mobile-${id}`}>
              <CardContent className="space-y-2 pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(id)}
                      onChange={() => toggleSelectOne(id)}
                    />
                    <p className="font-medium">{textValue(row.name ?? row.code ?? row.id)}</p>
                  </div>
                  <StatusBadge value={textValue(row.status)} />
                </div>
                {columns.slice(0, 4).map((column) => (
                  <div key={`mobile-${id}-${column.key}`} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{column.label}</span>
                    <span>{displayValueByKey(column.key, row[column.key])}</span>
                  </div>
                ))}
                <div className="flex justify-end gap-2">
                  <SecondaryButton className="h-8 px-3" onClick={() => onView(id)}>
                    <Eye className="h-4 w-4" />
                  </SecondaryButton>
                  <SecondaryButton className="h-8 px-3" onClick={() => onEdit(id)}>
                    Edit
                  </SecondaryButton>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>{config.listTitle}</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Selected {selectedIds.length}</Badge>
            <details className="relative">
              <summary className="list-none">
                <SecondaryButton>Columns</SecondaryButton>
              </summary>
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-popover p-3 shadow-xl">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Column Visibility</p>
                <div className="space-y-2">
                  {config.columns.map((column) => (
                    <label key={column.key} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.key] !== false}
                        onChange={(event) =>
                          setVisibleColumns((prev) => ({ ...prev, [column.key]: event.target.checked }))
                        }
                      />
                      {column.label}
                    </label>
                  ))}
                </div>
              </div>
            </details>
            <SecondaryButton className="gap-2" onClick={exportCsv}>
              <Download className="h-4 w-4" />
              CSV
            </SecondaryButton>
            <SecondaryButton className="gap-2" onClick={exportExcel}>
              <FileText className="h-4 w-4" />
              Excel
            </SecondaryButton>
            <SecondaryButton className="gap-2" onClick={exportPdf}>
              <FileText className="h-4 w-4" />
              PDF
            </SecondaryButton>
            <SecondaryButton className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print
            </SecondaryButton>
            <Button className="gap-2 bg-destructive text-white" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4" />
              Bulk Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TableWrap>
            <Table>
              <THead>
                <tr>
                  <Th>
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} />
                  </Th>
                  {columns.map((column) => (
                    <Th
                      key={column.key}
                      className={cn('cursor-pointer select-none', column.align === 'right' && 'text-right')}
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.label}
                      {sortKey === column.key ? <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span> : null}
                    </Th>
                  ))}
                  <Th className="text-right">Actions</Th>
                </tr>
              </THead>
              <TBody>
                {visibleRows.map((row) => {
                  const id = String(row.id)
                  return (
                    <Tr key={id}>
                      <Td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(id)}
                          onChange={() => toggleSelectOne(id)}
                        />
                      </Td>
                      {columns.map((column) => {
                        const value = row[column.key]
                        return (
                          <Td key={column.key} className={cn(column.align === 'right' && 'text-right')}>
                            {column.key === 'status' ? (
                              <StatusBadge value={textValue(value)} />
                            ) : (
                              displayValueByKey(column.key, value)
                            )}
                          </Td>
                        )
                      })}
                      <Td className="text-right">
                        <div className="flex justify-end gap-2">
                          <SecondaryButton className="h-8 px-3" onClick={() => onView(id)}>
                            <Eye className="h-4 w-4" />
                          </SecondaryButton>
                          <SecondaryButton className="h-8 px-3" onClick={() => onEdit(id)}>
                            Edit
                          </SecondaryButton>
                        </div>
                      </Td>
                    </Tr>
                  )
                })}
              </TBody>
            </Table>
          </TableWrap>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">Showing {visibleRows.length} of {filtered.length} records</p>
            <div className="flex items-center gap-2">
              <Select value={String(pageSize)} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}>
                <option value="8">8 / page</option>
                <option value="12">12 / page</option>
                <option value="20">20 / page</option>
              </Select>
              <SecondaryButton onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</SecondaryButton>
              <Badge>Page {page} of {totalPages}</Badge>
              <SecondaryButton onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>Next</SecondaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {confirmDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl">
            <h4 className="font-display text-lg font-semibold">Confirm Bulk Delete</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Delete {selectedIds.length} selected {config.pluralLabel.toLowerCase()} records?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <SecondaryButton onClick={() => setConfirmDelete(false)}>Cancel</SecondaryButton>
              <Button
                className="bg-destructive text-white"
                onClick={() => {
                  onDelete(selectedIds)
                  setSelectedIds([])
                  setConfirmDelete(false)
                }}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
