import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { ledgerRows } from '@/features/finance/data/finance-data'

export function GeneralLedgerPage() {
  return (
    <PurchaseTable
      title="General Ledger"
      rows={ledgerRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'account', label: 'Account' },
        { key: 'debit', label: 'Debit', align: 'right' },
        { key: 'credit', label: 'Credit', align: 'right' },
        { key: 'balance', label: 'Balance', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
