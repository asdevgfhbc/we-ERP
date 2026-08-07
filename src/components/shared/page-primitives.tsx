import { Download, Filter, Plus, Printer, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { generatePageRows } from '@/app/pages'
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
  Skeleton,
  Table,
  TableWrap,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from '@/components/ui/primitives'

const STATUS_OPTIONS = ['All', 'Active', 'Pending', 'Approved', 'Rejected', 'In Transit', 'Completed']

export function StatusBadge({ value }: { value: string }) {
  const tone = {
    Active: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    'In Transit': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
    Completed: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  }[value] ?? 'bg-muted text-muted-foreground'

  return <Badge className={cn('font-medium', tone)}>{value}</Badge>
}

export function SearchFilterBar({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="grid gap-3 pt-5 md:grid-cols-[1fr_160px_160px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder={`Search ${title.toLowerCase()}...`} />
        </div>
        <Select defaultValue="all">
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status.toLowerCase()}>
              {status === 'All' ? 'All Status' : status}
            </option>
          ))}
        </Select>
        <Input type="date" />
        <div className="flex flex-wrap gap-2">
          <SecondaryButton className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </SecondaryButton>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
          <SecondaryButton className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </SecondaryButton>
          <SecondaryButton className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </SecondaryButton>
        </div>
      </CardContent>
    </Card>
  )
}

function stringifyValue(value: unknown) {
  if (value == null) return ''
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

function exportCsv(page: PageDefinition, rows: Array<Record<string, unknown>>, columnKeys: string[]) {
  const header = columnKeys.join(',')
  const body = rows
    .map((row) => columnKeys.map((key) => `"${stringifyValue(row[key]).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${page.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

function compareValues(left: unknown, right: unknown) {
  if (typeof left === 'number' && typeof right === 'number') return left - right
  return stringifyValue(left).localeCompare(stringifyValue(right))
}

export function DataTableSection({ page }: { page: PageDefinition }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState(page.columns[0]?.key ?? 'name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    Object.fromEntries(page.columns.map((column) => [column.key, true])),
  )
  const pageSize = 8
  const rows = useMemo<Array<Record<string, unknown>>>(() => generatePageRows(page, 24), [page])

  const columnKeys = page.columns.filter((column) => visibleColumns[column.key] !== false)

  const filteredRows = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    return rows
      .filter((row) => {
        const matchesQuery = !lowerQuery || Object.values(row).some((value) => stringifyValue(value).toLowerCase().includes(lowerQuery))
        const matchesStatus = statusFilter === 'all' || stringifyValue(row.status).toLowerCase() === statusFilter
        return matchesQuery && matchesStatus
      })
      .sort((left, right) => {
        const comparison = compareValues(left[sortKey], right[sortKey])
        return sortDirection === 'asc' ? comparison : -comparison
      })
  }, [query, rows, sortDirection, sortKey, statusFilter])

  const total = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const display = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const openPrintDialog = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-[1fr_160px_160px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder={`Search ${page.title.toLowerCase()}...`} value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status.toLowerCase()}>
                {status === 'All' ? 'All Status' : status}
              </option>
            ))}
          </Select>
          <Input type="date" />
          <div className="flex flex-wrap gap-2">
            <SecondaryButton className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </SecondaryButton>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
            <SecondaryButton className="gap-2" onClick={() => exportCsv(page, filteredRows, columnKeys.map((column) => column.key))}>
              <Download className="h-4 w-4" />
              Export Excel
            </SecondaryButton>
            <SecondaryButton className="gap-2" onClick={openPrintDialog}>
              <Printer className="h-4 w-4" />
              Print / PDF
            </SecondaryButton>
          </div>
        </CardContent>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>{page.title} Records</CardTitle>
        <div className="flex items-center gap-2">
          <details className="relative">
            <summary className="list-none">
              <SecondaryButton className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Columns
              </SecondaryButton>
            </summary>
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-border bg-popover p-3 shadow-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Column Visibility</p>
              <div className="max-h-72 space-y-2 overflow-y-auto">
                {page.columns.map((column) => (
                  <label key={column.key} className="flex items-center gap-2 text-sm">
                    <input
                      checked={visibleColumns[column.key] !== false}
                      onChange={(event) => setVisibleColumns((current) => ({ ...current, [column.key]: event.target.checked }))}
                      type="checkbox"
                    />
                    {column.label}
                  </label>
                ))}
              </div>
            </div>
          </details>
          <SecondaryButton className="gap-2 text-destructive hover:bg-destructive/10" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </SecondaryButton>
        </div>
      </CardHeader>
      <CardContent>
        {filteredRows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="font-display text-lg font-semibold">No records found</p>
            <p className="text-sm text-muted-foreground">Try adjusting filters or add a new record for this module.</p>
          </div>
        ) : (
          <>
            <TableWrap>
              <Table>
                <THead>
                  <tr>
                    {columnKeys.map((column) => (
                      <Th
                        key={column.key}
                        className={cn('cursor-pointer select-none', column.align === 'right' && 'text-right', column.align === 'center' && 'text-center')}
                        onClick={() => toggleSort(column.key)}
                      >
                        {column.label}
                        {sortKey === column.key ? <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span> : null}
                      </Th>
                    ))}
                  </tr>
                </THead>
                <TBody>
                  {display.map((row, index) => (
                    <Tr key={`${page.path}-${index}`}>
                      {columnKeys.map((column) => {
                        const value = row[column.key]
                        const displayValue = typeof value === 'string' || typeof value === 'number' ? value : stringifyValue(value)
                        return (
                          <Td key={column.key} className={cn(column.align === 'right' && 'text-right', column.align === 'center' && 'text-center')}>
                            {column.key === 'status' ? <StatusBadge value={stringifyValue(value)} /> : displayValue}
                          </Td>
                        )
                      })}
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TableWrap>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {display.length} of {filteredRows.length} records
              </p>
              <div className="flex items-center gap-2">
                <SecondaryButton onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}>Previous</SecondaryButton>
                <Badge className="px-3">Page {currentPage} of {total}</Badge>
                <SecondaryButton onClick={() => setCurrentPage((value) => Math.min(total, value + 1))}>Next</SecondaryButton>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl">
            <h4 className="font-display text-lg font-semibold">Confirm Delete</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a mock confirmation dialog. In production, this action would remove the selected records.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <SecondaryButton onClick={() => setConfirmOpen(false)}>Cancel</SecondaryButton>
              <Button className="bg-destructive text-white" onClick={() => setConfirmOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
    </div>
  )
}

export function LoadingState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}
