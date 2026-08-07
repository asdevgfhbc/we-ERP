import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { payableRows } from '@/features/finance/data/finance-data'

export function AccountsPayablePage() {
  return (
    <PurchaseTable
      title="Accounts Payable"
      rows={payableRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
