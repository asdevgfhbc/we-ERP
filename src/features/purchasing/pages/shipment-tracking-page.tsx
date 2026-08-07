import { shipmentRows, shipmentTimeline } from '@/features/purchasing/data/purchasing-data'
import { ShipmentTimeline } from '@/features/purchasing/components/shipment-timeline'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function ShipmentTrackingPage({ id }: { id: string }) {
  const detail = shipmentTimeline(id)

  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Shipment Tracking"
        rows={shipmentRows}
        columns={[
          { key: 'reference', label: 'Shipment No' },
          { key: 'containerNumber', label: 'Container Number' },
          { key: 'shippingLine', label: 'Shipping Line' },
          { key: 'etd', label: 'ETD' },
          { key: 'eta', label: 'ETA' },
          { key: 'status', label: 'Current Status' },
        ]}
      />
      <ShipmentTimeline timeline={detail.timeline} />
    </div>
  )
}
