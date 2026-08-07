import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { customerTimeline } from '@/features/customer-service/data/customer-service-data'

export function CustomerTimelinePage({ id }: { id: string }) {
  const detail = customerTimeline(id)

  return (
    <Card>
      <CardHeader><CardTitle>Customer Timeline - {detail.customer}</CardTitle></CardHeader>
      <CardContent>
        <PurchaseTimeline steps={detail.timeline} />
      </CardContent>
    </Card>
  )
}
