import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'

export function ShipmentTimeline({
  timeline,
}: {
  timeline: Array<{ title: string; date: string; status: string }>
}) {
  return (
    <Card>
      <CardHeader><CardTitle>Shipment Timeline</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {timeline.map((item, index) => (
          <div key={`${item.title}-${index}`} className="rounded-xl border border-border p-3 text-sm">
            <p className="font-medium">{item.title}</p>
            <p className="text-muted-foreground">{item.date} • {item.status}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
