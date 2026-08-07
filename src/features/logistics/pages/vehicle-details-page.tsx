import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { vehicleDetail } from '@/features/logistics/data/logistics-data'

export function VehicleDetailsPage({ id }: { id: string }) {
  const detail = vehicleDetail(id)
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Vehicle Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Plate No</p><p className="font-medium">{detail.plateNo}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{detail.type}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Driver</p><p className="font-medium">{detail.driver}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
        </CardContent>
      </Card>
      <PurchaseTimeline steps={detail.timeline} />
    </div>
  )
}
