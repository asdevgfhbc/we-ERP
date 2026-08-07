import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { deliveryRows } from '@/features/sales/shared/data'

export function DeliveryTrackingPage({ id }: { id: string }) {
  const row = deliveryRows.find((item) => item.id === id) ?? deliveryRows[0]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Delivery Tracking</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Delivery</p><p className="font-medium">{row.number}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{row.customer}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Route</p><p className="font-medium">{row.route}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">ETA</p><p className="font-medium">{row.eta}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{row.status}</p></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Milestones</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {['Order Picked', 'Truck Assigned', 'En Route', 'Delivered'].map((step, index) => (
            <div key={step} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
              {index + 1}. {step}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
