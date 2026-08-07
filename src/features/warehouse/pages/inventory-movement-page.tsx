import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { movementRows } from '@/features/warehouse/data/warehouse-data'

export function InventoryMovementPage() {
  return (
    <PurchaseTable
      title="Inventory Movement"
      rows={movementRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'product', label: 'Product' },
        { key: 'from', label: 'From' },
        { key: 'to', label: 'To' },
        { key: 'qty', label: 'Qty', align: 'right' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
