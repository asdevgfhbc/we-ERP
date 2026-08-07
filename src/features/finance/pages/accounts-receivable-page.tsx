import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { receivableRows } from '@/features/finance/data/finance-data'

export function AccountsReceivablePage() {
  return (
    <PurchaseTable
      title="Accounts Receivable"
      rows={receivableRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'customer', label: 'Customer' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
