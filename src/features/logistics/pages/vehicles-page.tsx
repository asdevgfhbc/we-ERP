import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { vehiclesRows } from '@/features/logistics/data/logistics-data'

export function VehiclesPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Vehicles"
      rows={vehiclesRows}
      onView={onView}
      columns={[
        { key: 'plateNo', label: 'Plate No' },
        { key: 'type', label: 'Type' },
        { key: 'driver', label: 'Driver' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
