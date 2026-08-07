import { deliveryRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function DeliverySchedulingPage({ onView }: { onView: (id: string) => void }) {
  return (
    <SalesTable
      title="Delivery Scheduling"
      rows={deliveryRows}
      onView={onView}
      columns={[
        { key: 'number', label: 'Delivery No' },
        { key: 'customer', label: 'Customer' },
        { key: 'route', label: 'Route' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
