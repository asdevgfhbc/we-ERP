import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { cashBookRows } from '@/features/finance/data/finance-data'

export function CashBookPage() {
  return (
    <PurchaseTable
      title="Cash Book"
      rows={cashBookRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
