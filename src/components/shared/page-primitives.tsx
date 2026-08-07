import { Download, Filter, Plus, Printer, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { RecordRow } from '@/app/mock-data'
import { generateRows } from '@/app/mock-data'
import { cn, formatCurrency } from '@/lib/utils'
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

export function StatusBadge({ value }: { value: RecordRow['status'] }) {
  const tone = {
    Active: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    'In Transit': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
    Completed: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  }[value]

  return <Badge className={cn('font-medium', tone)}>{value}</Badge>
}

export function SearchFilterBar({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="grid gap-3 pt-5 md:grid-cols-[1fr_180px_180px_auto]">
        <Input placeholder={`Search ${title.toLowerCase()}...`} />
        <Select defaultValue="all">
          <option value="all">All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
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

export function DataTableSection({ pageTitle }: { pageTitle: string }) {
  const [page, setPage] = useState(1)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const pageSize = 6
  const rows = useMemo(() => generateRows(pageTitle), [pageTitle])
  const total = Math.ceil(rows.length / pageSize)
  const display = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pageTitle} Records</CardTitle>
        <SecondaryButton className="gap-2 text-destructive hover:bg-destructive/10" onClick={() => setConfirmOpen(true)}>
          <Trash2 className="h-4 w-4" />
          Delete
        </SecondaryButton>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="font-display text-lg font-semibold">No records yet</p>
            <p className="text-sm text-muted-foreground">Data will appear here once transactions are created.</p>
          </div>
        ) : (
          <>
            <TableWrap>
              <Table>
                <THead>
                  <tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Reference</Th>
                    <Th>Status</Th>
                    <Th>Date</Th>
                    <Th className="text-right">Amount</Th>
                  </tr>
                </THead>
                <TBody>
                  {display.map((row) => (
                    <Tr key={row.id}>
                      <Td>{row.id}</Td>
                      <Td className="font-medium">{row.name}</Td>
                      <Td>{row.reference}</Td>
                      <Td>
                        <StatusBadge value={row.status} />
                      </Td>
                      <Td>{row.date}</Td>
                      <Td className="text-right">{formatCurrency(row.amount)}</Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TableWrap>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {display.length} of {rows.length} rows</p>
              <div className="flex gap-2">
                <SecondaryButton onClick={() => setPage((v) => Math.max(1, v - 1))}>Previous</SecondaryButton>
                <Badge className="px-3">Page {page} of {total}</Badge>
                <SecondaryButton onClick={() => setPage((v) => Math.min(total, v + 1))}>Next</SecondaryButton>
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
