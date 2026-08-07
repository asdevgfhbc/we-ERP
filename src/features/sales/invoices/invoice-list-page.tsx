import { invoiceRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function InvoiceListPage({ onView }: { onView: (id: string) => void }) {
  return (
    <SalesTable
      title="Invoice List"
      rows={invoiceRows}
      onView={onView}
      columns={[
        { key: 'number', label: 'Invoice No' },
        { key: 'customer', label: 'Customer' },
        { key: 'date', label: 'Date' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
