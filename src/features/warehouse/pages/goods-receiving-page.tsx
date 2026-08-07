import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { grnRows } from '@/features/warehouse/data/warehouse-data'

export function GoodsReceivingPage() {
  return (
    <PurchaseTable
      title="Goods Receiving (GRN)"
      rows={grnRows}
      columns={[
        { key: 'number', label: 'GRN No' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'receivedQuantity', label: 'Received Quantity', align: 'right' },
        { key: 'pendingItems', label: 'Pending Items', align: 'right' },
        { key: 'rejectedItems', label: 'Rejected Items', align: 'right' },
        { key: 'batchNumbers', label: 'Batch Numbers' },
        { key: 'serialNumbers', label: 'Serial Numbers' },
        { key: 'inspectionStatus', label: 'Inspection Status' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
