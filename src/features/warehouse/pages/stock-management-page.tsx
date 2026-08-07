import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { stockRows } from '@/features/warehouse/data/warehouse-data'

export function StockManagementPage() {
  return (
    <PurchaseTable
      title="Stock Management"
      rows={stockRows}
      columns={[
        { key: 'sku', label: 'SKU' },
        { key: 'product', label: 'Product' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'bin', label: 'Bin' },
        { key: 'rack', label: 'Rack' },
        { key: 'onHand', label: 'On Hand', align: 'right' },
        { key: 'reserved', label: 'Reserved', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
