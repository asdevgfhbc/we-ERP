import { salesOrderRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function SalesOrdersPage({ onView }: { onView: (id: string) => void }) {
  return (
    <SalesTable
      title="Sales Orders"
      rows={salesOrderRows}
      onView={onView}
      columns={[
        { key: 'number', label: 'Order No' },
        { key: 'customer', label: 'Customer' },
        { key: 'date', label: 'Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'deliveryStatus', label: 'Delivery' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
