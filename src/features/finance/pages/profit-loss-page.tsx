import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { profitLossRows } from '@/features/finance/data/finance-data'

export function ProfitLossPage() {
  return (
    <PurchaseTable
      title="Profit & Loss"
      rows={profitLossRows}
      columns={[
        { key: 'account', label: 'Account' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
