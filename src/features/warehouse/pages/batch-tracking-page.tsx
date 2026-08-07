import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { batchRows } from '@/features/warehouse/data/warehouse-data'

export function BatchTrackingPage() {
  return (
    <PurchaseTable
      title="Batch Tracking"
      rows={batchRows}
      columns={[
        { key: 'batchNo', label: 'Batch No' },
        { key: 'product', label: 'Product' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'expiry', label: 'Expiry' },
        { key: 'qty', label: 'Qty', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
