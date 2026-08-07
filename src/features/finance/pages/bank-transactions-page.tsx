import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { bankTransactionRows } from '@/features/finance/data/finance-data'

export function BankTransactionsPage() {
  return (
    <PurchaseTable
      title="Bank Transactions"
      rows={bankTransactionRows}
      columns={[
        { key: 'reference', label: 'Txn No' },
        { key: 'bank', label: 'Bank' },
        { key: 'txnType', label: 'Type' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
