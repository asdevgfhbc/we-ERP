import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { driverDetail } from '@/features/logistics/data/logistics-data'

export function DriverDetailsPage({ id }: { id: string }) {
  const detail = driverDetail(id)
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Driver Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{detail.name}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">License</p><p className="font-medium">{detail.license}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{detail.phone}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
        </CardContent>
      </Card>
      <PurchaseTimeline steps={detail.timeline} />
    </div>
  )
}
