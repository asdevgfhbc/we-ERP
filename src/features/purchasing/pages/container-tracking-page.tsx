import { shipmentRows } from '@/features/purchasing/data/purchasing-data'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function ContainerTrackingPage() {
  return (
    <PurchaseTable
      title="Container Tracking"
      rows={shipmentRows}
      columns={[
        { key: 'containerNumber', label: 'Container Number' },
        { key: 'reference', label: 'Shipment' },
        { key: 'shippingLine', label: 'Shipping Line' },
        { key: 'etd', label: 'ETD' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
