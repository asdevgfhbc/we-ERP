import { useMemo, useState } from 'react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select, Table, TableWrap, TBody, Td, Th, THead, Tr } from '@/components/ui/primitives'
import { StatusBadge } from '@/components/shared/page-primitives'
import { Download, Eye, FileText, Filter, Printer, Trash2 } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { usePurchaseTable } from '@/features/purchasing/hooks/use-purchase-table'
import type { PurchaseColumn } from '@/features/purchasing/hooks/use-purchase-table'
import { csvValue, exportFile, slugifyName, textValue, type PurchaseRow } from '@/features/purchasing/utils/purchasing-utils'

const STATUS_OPTIONS = ['all', 'approved', 'pending', 'in transit', 'completed', 'overdue', 'inspection', 'rejected']

export function PurchaseTable({
  title,
  rows,
  columns,
  onView,
}: {
  title: string
  rows: PurchaseRow[]
  columns: PurchaseColumn[]
  onView?: (id: string) => void
}) {
  const [sourceRows, setSourceRows] = useState(rows)
  const table = usePurchaseTable(sourceRows, columns)

  const {
    query,
    setQuery,
    status,
    setStatus,
    advancedFilter,
    setAdvancedFilter,
    savedFilter,
    setSavedFilter,
    sortKey,
    sortDirection,
    page,
    setPage,
    selectedIds,
    setSelectedIds,
    visibleColumns,
    setVisibleColumns,
    filteredRows,
    pagedRows,
    activeColumns,
    totalPages,
    allVisibleSelected,
    toggleSort,
    toggleAll,
  } = table

  const bulkDelete = () => {
    if (selectedIds.length === 0) return
    const ok = window.confirm(`Delete ${selectedIds.length} selected records?`)
    if (!ok) return
    setSourceRows((prev) => prev.filter((row) => !selectedIds.includes(String(row.id ?? row.reference ?? row.number))))
    setSelectedIds([])
  }

  const makeExportRows = useMemo(
    () => filteredRows.map((row) => activeColumns.map((column) => textValue(row[column.key]))),
    [activeColumns, filteredRows],
  )

  const exportCsv = () => {
    const header = activeColumns.map((column) => column.label).join(',')
    const body = filteredRows.map((row) => activeColumns.map((column) => csvValue(row[column.key])).join(',')).join('\n')
    exportFile(`${slugifyName(title)}.csv`, `${header}\n${body}`, 'text/csv;charset=utf-8;')
  }

  const exportExcel = () => {
    const header = activeColumns.map((column) => column.label).join('\t')
    const body = makeExportRows.map((line) => line.join('\t')).join('\n')
    exportFile(`${slugifyName(title)}.xls`, `${header}\n${body}`, 'application/vnd.ms-excel')
  }

  const exportPdf = () => {
    const content = [
      `${title} Export`,
      '',
      activeColumns.map((column) => column.label).join(' | '),
      ...makeExportRows.map((line) => line.join(' | ')),
    ].join('\n')
    exportFile(`${slugifyName(title)}.txt`, content, 'text/plain;charset=utf-8;')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 pt-5 md:grid-cols-[1.2fr_180px_180px_180px]">
          <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder={`Search ${title.toLowerCase()}...`} />
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option === 'all' ? 'All Status' : option}</option>)}
          </Select>
          <Select value={advancedFilter} onChange={(event) => setAdvancedFilter(event.target.value)}>
            <option value="last-30-days">Advanced: Last 30 Days</option>
            <option value="high-value">Advanced: High Value</option>
            <option value="pending-approval">Advanced: Pending Approval</option>
          </Select>
          <Select value={savedFilter} onChange={(event) => setSavedFilter(event.target.value)}>
            <option value="default">Saved: Default View</option>
            <option value="outstanding">Saved: Outstanding</option>
            <option value="approval-focus">Saved: Approval Focus</option>
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
            <Button className="gap-2 bg-destructive text-white" onClick={bulkDelete}><Trash2 className="h-4 w-4" />Bulk Delete</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:hidden">
            {pagedRows.map((row) => (
              <Card key={`mobile-${String(row.id ?? row.reference ?? row.number)}`}>
                <CardContent className="space-y-2 pt-5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedIds.includes(String(row.id ?? row.reference ?? row.number))} onChange={() => setSelectedIds((prev) => prev.includes(String(row.id ?? row.reference ?? row.number)) ? prev.filter((id) => id !== String(row.id ?? row.reference ?? row.number)) : [...prev, String(row.id ?? row.reference ?? row.number)])} />
                      <span className="font-medium">{textValue(row.number ?? row.reference ?? row.id)}</span>
                    </label>
                    <StatusBadge value={textValue(row.status)} />
                  </div>
                  {activeColumns.slice(0, 4).map((column) => (
                    <div key={`mobile-${String(row.id)}-${column.key}`} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{column.label}</span>
                      <span>{column.key.includes('amount') || column.key.includes('value') || column.key.includes('balance') || column.key.includes('total') ? formatCurrency(Number(row[column.key] || 0)) : textValue(row[column.key])}</span>
                    </div>
                  ))}
                  {onView ? <SecondaryButton className="h-8 px-3" onClick={() => onView(String(row.id ?? row.reference ?? row.number))}><Eye className="h-4 w-4" /></SecondaryButton> : null}
                </CardContent>
              </Card>
            ))}
          </div>

          <TableWrap className="hidden md:block">
            <Table>
              <THead>
                <tr>
                  <Th><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} /></Th>
                  {activeColumns.map((column) => (
                    <Th key={column.key} className={cn('cursor-pointer select-none', column.align === 'right' && 'text-right')} onClick={() => toggleSort(column.key)}>
                      {column.label}
                      {sortKey === column.key ? <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span> : null}
                    </Th>
                  ))}
                  <Th className="text-right">Actions</Th>
                </tr>
              </THead>
              <TBody>
                {pagedRows.map((row) => (
                  <Tr key={String(row.id ?? row.reference ?? row.number)}>
                    <Td><input type="checkbox" checked={selectedIds.includes(String(row.id ?? row.reference ?? row.number))} onChange={() => setSelectedIds((prev) => prev.includes(String(row.id ?? row.reference ?? row.number)) ? prev.filter((id) => id !== String(row.id ?? row.reference ?? row.number)) : [...prev, String(row.id ?? row.reference ?? row.number)])} /></Td>
                    {activeColumns.map((column) => (
                      <Td key={column.key} className={cn(column.align === 'right' && 'text-right')}>
                        {column.key === 'status' || column.key === 'approvalStatus' || column.key === 'inspectionStatus'
                          ? <StatusBadge value={textValue(row[column.key])} />
                          : column.key.includes('amount') || column.key.includes('value') || column.key.includes('balance') || column.key.includes('total')
                            ? formatCurrency(Number(row[column.key] || 0))
                            : textValue(row[column.key])}
                      </Td>
                    ))}
                    <Td className="text-right">
                      {onView ? <SecondaryButton className="h-8 px-3" onClick={() => onView(String(row.id ?? row.reference ?? row.number))}><Eye className="h-4 w-4" /></SecondaryButton> : null}
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableWrap>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {pagedRows.length} of {filteredRows.length} records</p>
            <div className="flex items-center gap-2">
              <SecondaryButton onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</SecondaryButton>
              <Badge>Page {page} of {totalPages}</Badge>
              <SecondaryButton onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>Next</SecondaryButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
