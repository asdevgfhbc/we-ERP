import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { adjustmentRows } from '@/features/warehouse/data/warehouse-data'

export function StockAdjustmentsPage() {
  return (
    <PurchaseTable
      title="Stock Adjustments"
      rows={adjustmentRows}
      columns={[
        { key: 'reference', label: 'Adjustment No' },
        { key: 'reason', label: 'Reason' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'qty', label: 'Qty', align: 'right' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
