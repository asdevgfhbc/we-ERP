import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { transferRows } from '@/features/warehouse/data/warehouse-data'

export function StockTransfersPage() {
  return (
    <PurchaseTable
      title="Stock Transfers"
      rows={transferRows}
      columns={[
        { key: 'reference', label: 'Transfer No' },
        { key: 'from', label: 'From' },
        { key: 'to', label: 'To' },
        { key: 'qty', label: 'Qty', align: 'right' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
