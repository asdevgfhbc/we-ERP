import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { stockLedgerRows } from '@/features/warehouse/data/warehouse-data'

export function StockLedgerPage() {
  return (
    <PurchaseTable
      title="Stock Ledger"
      rows={stockLedgerRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'product', label: 'Product' },
        { key: 'txnType', label: 'Transaction' },
        { key: 'qty', label: 'Qty', align: 'right' },
        { key: 'balance', label: 'Balance', align: 'right' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
