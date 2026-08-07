import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { serialRows } from '@/features/warehouse/data/warehouse-data'

export function SerialNumberTrackingPage() {
  return (
    <PurchaseTable
      title="Serial Number Tracking"
      rows={serialRows}
      columns={[
        { key: 'serialNo', label: 'Serial No' },
        { key: 'product', label: 'Product' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
