import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { trialBalanceRows } from '@/features/finance/data/finance-data'

export function TrialBalancePage() {
  return (
    <PurchaseTable
      title="Trial Balance"
      rows={trialBalanceRows}
      columns={[
        { key: 'account', label: 'Account' },
        { key: 'debit', label: 'Debit', align: 'right' },
        { key: 'credit', label: 'Credit', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
