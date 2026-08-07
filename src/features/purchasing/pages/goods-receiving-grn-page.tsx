import { grnRows } from '@/features/purchasing/data/purchasing-data'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function GoodsReceivingGrnPage() {
  return (
    <PurchaseTable
      title="Goods Receiving (GRN)"
      rows={grnRows}
      columns={[
        { key: 'number', label: 'GRN No' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'receivedQuantity', label: 'Received Quantity', align: 'right' },
        { key: 'batchNumbers', label: 'Batch Numbers' },
        { key: 'serialNumbers', label: 'Serial Numbers' },
        { key: 'pendingItems', label: 'Pending Items', align: 'right' },
        { key: 'rejectedItems', label: 'Rejected Items', align: 'right' },
        { key: 'inspectionStatus', label: 'Inspection Status' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
