import { salesReturnRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function SalesReturnsPage() {
  return (
    <SalesTable
      title="Sales Returns"
      rows={salesReturnRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'customer', label: 'Customer' },
        { key: 'reason', label: 'Reason' },
        { key: 'date', label: 'Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
