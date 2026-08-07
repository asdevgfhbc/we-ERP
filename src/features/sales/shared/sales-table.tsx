import { useMemo, useState } from 'react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select, Table, TableWrap, TBody, Td, Th, THead, Tr } from '@/components/ui/primitives'
import { StatusBadge } from '@/components/shared/page-primitives'
import { csvValue, exportFile, textValue } from '@/features/master-data/shared/master-utils'
import { Download, Eye, FileText, Filter, Printer, Trash2 } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import type { SalesRow } from './types'

const STATUS_OPTIONS = ['all', 'approved', 'pending', 'completed', 'in transit', 'overdue', 'draft']

export function SalesTable({
  title,
  rows,
  columns,
  onView,
}: {
  title: string
  rows: SalesRow[]
  columns: Array<{ key: string; label: string; align?: 'left' | 'center' | 'right' }>
  onView?: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [savedFilter, setSavedFilter] = useState('default')
  const [sortKey, setSortKey] = useState(columns[0]?.key ?? 'number')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(Object.fromEntries(columns.map((column) => [column.key, true])))

  const filtered = useMemo(() => {
    const lower = query.toLowerCase()
    return rows
      .filter((row) => {
        const queryMatch = !lower || Object.values(row).some((value) => textValue(value).toLowerCase().includes(lower))
        const statusMatch = status === 'all' || textValue(row.status).toLowerCase() === status
        return queryMatch && statusMatch
      })
      .sort((a, b) => {
        const left = a[sortKey]
        const right = b[sortKey]
        if (typeof left === 'number' && typeof right === 'number') {
          return sortDirection === 'asc' ? left - right : right - left
        }
        return sortDirection === 'asc' ? textValue(left).localeCompare(textValue(right)) : textValue(right).localeCompare(textValue(left))
      })
  }, [query, rows, sortDirection, sortKey, status])

  const pageSize = 8
  const total = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleRows = filtered.slice((page - 1) * pageSize, page * pageSize)
  const visible = columns.filter((column) => visibleColumns[column.key] !== false)

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selectedIds.includes(String(row.id)))

  const toggleAll = () => {
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

  const exportCsv = () => {
    const header = visible.map((column) => column.label).join(',')
    const body = filtered.map((row) => visible.map((column) => csvValue(row[column.key])).join(',')).join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`, `${header}\n${body}`, 'text/csv;charset=utf-8;')
  }

  const exportExcel = () => {
    const header = visible.map((column) => column.label).join('\t')
    const body = filtered.map((row) => visible.map((column) => textValue(row[column.key])).join('\t')).join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.xls`, `${header}\n${body}`, 'application/vnd.ms-excel')
  }

  const exportPdf = () => {
    const printable = [
      `${title} Export`,
      '',
      visible.map((column) => column.label).join(' | '),
      ...filtered.map((row) => visible.map((column) => textValue(row[column.key])).join(' | ')),
    ].join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`, printable, 'text/plain;charset=utf-8;')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-[1.3fr_180px_180px_auto]">
          <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder={`Search ${title.toLowerCase()}...`} />
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>{option === 'all' ? 'All Status' : option[0].toUpperCase() + option.slice(1)}</option>
            ))}
          </Select>
          <Select defaultValue="last-30-days">
            <option value="last-30-days">Advanced: Last 30 Days</option>
            <option value="high-value">Advanced: High Value</option>
            <option value="pending-approval">Advanced: Pending Approval</option>
          </Select>
          <Select value={savedFilter} onChange={(event) => setSavedFilter(event.target.value)}>
            <option value="default">Saved: Default View</option>
            <option value="high-priority">Saved: High Priority</option>
            <option value="payment-focus">Saved: Payment Focus</option>
          </Select>
          <div className="flex flex-wrap gap-2">
            <SecondaryButton className="gap-2"><Filter className="h-4 w-4" />Filters</SecondaryButton>
            <SecondaryButton className="gap-2" onClick={exportCsv}><Download className="h-4 w-4" />CSV</SecondaryButton>
            <SecondaryButton className="gap-2" onClick={exportExcel}><FileText className="h-4 w-4" />Excel</SecondaryButton>
            <SecondaryButton className="gap-2" onClick={exportPdf}><FileText className="h-4 w-4" />PDF</SecondaryButton>
            <SecondaryButton className="gap-2" onClick={() => window.print()}><Printer className="h-4 w-4" />Print</SecondaryButton>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Selected {selectedIds.length}</Badge>
            <details className="relative">
              <summary className="list-none"><SecondaryButton>Columns</SecondaryButton></summary>
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-popover p-3 shadow-xl">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Column Visibility</p>
                <div className="space-y-2">
                  {columns.map((column) => (
                    <label key={column.key} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={visibleColumns[column.key] !== false} onChange={(event) => setVisibleColumns((prev) => ({ ...prev, [column.key]: event.target.checked }))} />
                      {column.label}
                    </label>
                  ))}
                </div>
              </div>
            </details>
            <Button className="gap-2 bg-destructive text-white"><Trash2 className="h-4 w-4" />Bulk Delete</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:hidden">
            {visibleRows.map((row) => (
              <Card key={`mobile-${row.id}`}>
                <CardContent className="space-y-2 pt-5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedIds.includes(String(row.id))} onChange={() => setSelectedIds((prev) => prev.includes(String(row.id)) ? prev.filter((id) => id !== String(row.id)) : [...prev, String(row.id)])} />
                      <span className="font-medium">{textValue(row.number ?? row.reference ?? row.id)}</span>
                    </label>
                    <StatusBadge value={textValue(row.status)} />
                  </div>
                  {visible.slice(0, 4).map((column) => (
                    <div key={`mobile-${row.id}-${column.key}`} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{column.label}</span>
                      <span>{column.key.includes('amount') ? formatCurrency(Number(row[column.key] || 0)) : textValue(row[column.key])}</span>
                    </div>
                  ))}
                  {onView ? <SecondaryButton className="h-8 px-3" onClick={() => onView(String(row.id))}><Eye className="h-4 w-4" /></SecondaryButton> : null}
                </CardContent>
              </Card>
            ))}
          </div>

          <TableWrap className="hidden md:block">
            <Table>
              <THead>
                <tr>
                  <Th><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} /></Th>
                  {visible.map((column) => (
                    <Th key={column.key} className={cn('cursor-pointer select-none', column.align === 'right' && 'text-right')} onClick={() => toggleSort(column.key)}>
                      {column.label}
                      {sortKey === column.key ? <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span> : null}
                    </Th>
                  ))}
                  <Th className="text-right">Actions</Th>
                </tr>
              </THead>
              <TBody>
                {visibleRows.map((row) => (
                  <Tr key={String(row.id)}>
                    <Td><input type="checkbox" checked={selectedIds.includes(String(row.id))} onChange={() => setSelectedIds((prev) => prev.includes(String(row.id)) ? prev.filter((id) => id !== String(row.id)) : [...prev, String(row.id)])} /></Td>
                    {visible.map((column) => (
                      <Td key={column.key} className={cn(column.align === 'right' && 'text-right')}>
                        {column.key === 'status' ? <StatusBadge value={textValue(row[column.key])} /> : column.key.includes('amount') ? formatCurrency(Number(row[column.key] || 0)) : textValue(row[column.key])}
                      </Td>
                    ))}
                    <Td className="text-right">
                      {onView ? <SecondaryButton className="h-8 px-3" onClick={() => onView(String(row.id))}><Eye className="h-4 w-4" /></SecondaryButton> : null}
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableWrap>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {visibleRows.length} of {filtered.length} records</p>
            <div className="flex items-center gap-2">
              <SecondaryButton onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</SecondaryButton>
              <Badge>Page {page} of {total}</Badge>
              <SecondaryButton onClick={() => setPage((prev) => Math.min(total, prev + 1))}>Next</SecondaryButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
