import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { journalRows } from '@/features/finance/data/finance-data'

export function JournalEntriesPage() {
  return (
    <PurchaseTable
      title="Journal Entries"
      rows={journalRows}
      columns={[
        { key: 'reference', label: 'Journal No' },
        { key: 'date', label: 'Date' },
        { key: 'account', label: 'Account' },
        { key: 'debit', label: 'Debit', align: 'right' },
        { key: 'credit', label: 'Credit', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
