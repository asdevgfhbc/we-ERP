import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { binLocationRows } from '@/features/warehouse/data/warehouse-data'

export function BinLocationsPage() {
  return (
    <PurchaseTable
      title="Bin Locations"
      rows={binLocationRows}
      columns={[
        { key: 'code', label: 'Bin Code' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'rack', label: 'Rack' },
        { key: 'capacity', label: 'Capacity', align: 'right' },
        { key: 'utilization', label: 'Utilization', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
