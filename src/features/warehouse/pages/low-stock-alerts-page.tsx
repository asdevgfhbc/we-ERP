import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { lowStockRows } from '@/features/warehouse/data/warehouse-data'

export function LowStockAlertsPage() {
  return (
    <PurchaseTable
      title="Low Stock Alerts"
      rows={lowStockRows}
      columns={[
        { key: 'sku', label: 'SKU' },
        { key: 'product', label: 'Product' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'onHand', label: 'On Hand', align: 'right' },
        { key: 'reorder', label: 'Reorder Level', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
