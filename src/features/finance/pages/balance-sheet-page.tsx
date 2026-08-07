import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { balanceSheetRows } from '@/features/finance/data/finance-data'

export function BalanceSheetPage() {
  return (
    <PurchaseTable
      title="Balance Sheet"
      rows={balanceSheetRows}
      columns={[
        { key: 'section', label: 'Section' },
        { key: 'account', label: 'Account' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
