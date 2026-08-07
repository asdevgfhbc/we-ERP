import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { rackRows } from '@/features/warehouse/data/warehouse-data'

export function RackManagementPage() {
  return (
    <PurchaseTable
      title="Rack Management"
      rows={rackRows}
      columns={[
        { key: 'code', label: 'Rack Code' },
        { key: 'warehouse', label: 'Warehouse' },
        { key: 'levels', label: 'Levels', align: 'right' },
        { key: 'capacity', label: 'Capacity', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
