import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { routesRows } from '@/features/logistics/data/logistics-data'

export function RoutePlanningPage() {
  return (
    <PurchaseTable
      title="Route Planning"
      rows={routesRows}
      columns={[
        { key: 'reference', label: 'Route Code' },
        { key: 'origin', label: 'Origin' },
        { key: 'destination', label: 'Destination' },
        { key: 'distance', label: 'Distance', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
