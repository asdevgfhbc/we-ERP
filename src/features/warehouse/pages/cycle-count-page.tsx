import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { cycleCountRows } from '@/features/warehouse/data/warehouse-data'

export function CycleCountPage() {
  return (
    <PurchaseTable
      title="Cycle Count"
      rows={cycleCountRows}
      columns={[
        { key: 'reference', label: 'Cycle Count No' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'zone', label: 'Zone' },
        { key: 'countedBy', label: 'Counted By' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
