import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'

export function ApprovalTimeline({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Approval Timeline</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
