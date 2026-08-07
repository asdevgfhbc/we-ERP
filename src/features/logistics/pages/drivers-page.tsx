import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { driversRows } from '@/features/logistics/data/logistics-data'

export function DriversPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Drivers"
      rows={driversRows}
      onView={onView}
      columns={[
        { key: 'name', label: 'Driver' },
        { key: 'license', label: 'License' },
        { key: 'phone', label: 'Phone' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
