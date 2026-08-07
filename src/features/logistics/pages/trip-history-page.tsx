import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { tripRows } from '@/features/logistics/data/logistics-data'

export function TripHistoryPage() {
  return (
    <PurchaseTable
      title="Trip History"
      rows={tripRows}
      columns={[
        { key: 'reference', label: 'Trip No' },
        { key: 'route', label: 'Route' },
        { key: 'driver', label: 'Driver' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
