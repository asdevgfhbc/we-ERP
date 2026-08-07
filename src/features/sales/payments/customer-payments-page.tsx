import { customerPaymentRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function CustomerPaymentsPage() {
  return (
    <SalesTable
      title="Customer Payments"
      rows={customerPaymentRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'customer', label: 'Customer' },
        { key: 'method', label: 'Method' },
        { key: 'date', label: 'Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
