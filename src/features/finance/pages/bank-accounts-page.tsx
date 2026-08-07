import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { bankAccountRows } from '@/features/finance/data/finance-data'

export function BankAccountsPage() {
  return (
    <PurchaseTable
      title="Bank Accounts"
      rows={bankAccountRows}
      columns={[
        { key: 'reference', label: 'Account No' },
        { key: 'bank', label: 'Bank' },
        { key: 'type', label: 'Type' },
        { key: 'balance', label: 'Balance', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
