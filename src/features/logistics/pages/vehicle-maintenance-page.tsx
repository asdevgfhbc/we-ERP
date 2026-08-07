import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { maintenanceRows } from '@/features/logistics/data/logistics-data'

export function VehicleMaintenancePage() {
  return (
    <PurchaseTable
      title="Vehicle Maintenance"
      rows={maintenanceRows}
      columns={[
        { key: 'reference', label: 'Maintenance No' },
        { key: 'vehicle', label: 'Vehicle' },
        { key: 'serviceType', label: 'Service Type' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
