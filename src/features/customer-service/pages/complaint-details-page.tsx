import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { complaintDetail } from '@/features/customer-service/data/customer-service-data'

export function ComplaintDetailsPage({ id }: { id: string }) {
  const detail = complaintDetail(id)
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Complaint Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Ticket</p><p className="font-medium">{detail.reference}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{detail.customer}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Category</p><p className="font-medium">{detail.category}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
        </CardContent>
      </Card>
      <PurchaseTimeline steps={detail.timeline} />
    </div>
  )
}
