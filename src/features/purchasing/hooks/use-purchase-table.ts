import { useMemo, useState } from 'react'
import { textValue, type PurchaseRow } from '@/features/purchasing/utils/purchasing-utils'

export type PurchaseColumn = { key: string; label: string; align?: 'left' | 'center' | 'right' }

export function usePurchaseTable(rows: PurchaseRow[], columns: PurchaseColumn[]) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [advancedFilter, setAdvancedFilter] = useState('last-30-days')
  const [savedFilter, setSavedFilter] = useState('default')
  const [sortKey, setSortKey] = useState(columns[0]?.key ?? 'reference')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(Object.fromEntries(columns.map((column) => [column.key, true])))

  const filteredRows = useMemo(() => {
    const lower = query.toLowerCase()
    return rows
      .filter((row) => {
        const queryMatch = !lower || Object.values(row).some((value) => textValue(value).toLowerCase().includes(lower))
        const statusValue = textValue(row.status).toLowerCase()
        const statusMatch = status === 'all' || statusValue === status

        const advancedMatch = advancedFilter === 'last-30-days'
          ? true
          : advancedFilter === 'high-value'
            ? Number(row.amount ?? row.total ?? 0) >= 45000
            : statusValue === 'pending'

        return queryMatch && statusMatch && advancedMatch
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
  }, [advancedFilter, query, rows, sortDirection, sortKey, status])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const activeColumns = columns.filter((column) => visibleColumns[column.key] !== false)
  const allVisibleSelected = pagedRows.length > 0 && pagedRows.every((row) => selectedIds.includes(String(row.id ?? row.reference ?? row.number)))

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pagedRows.some((row) => String(row.id ?? row.reference ?? row.number) === id)))
      return
    }
    setSelectedIds((prev) => {
      const merged = new Set(prev)
      pagedRows.forEach((row) => merged.add(String(row.id ?? row.reference ?? row.number)))
      return Array.from(merged)
    })
  }

  return {
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
  }
}
