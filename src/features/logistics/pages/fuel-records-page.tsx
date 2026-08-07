import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { fuelRows } from '@/features/logistics/data/logistics-data'

export function FuelRecordsPage() {
  return (
    <PurchaseTable
      title="Fuel Records"
      rows={fuelRows}
      columns={[
        { key: 'reference', label: 'Fuel Log' },
        { key: 'vehicle', label: 'Vehicle' },
        { key: 'liters', label: 'Liters', align: 'right' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
