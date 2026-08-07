import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { deliveriesRows } from '@/features/logistics/data/logistics-data'

export function DeliverySchedulingPage() {
  return (
    <PurchaseTable
      title="Delivery Scheduling"
      rows={deliveriesRows}
      columns={[
        { key: 'reference', label: 'Delivery No' },
        { key: 'route', label: 'Route' },
        { key: 'driver', label: 'Driver' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
