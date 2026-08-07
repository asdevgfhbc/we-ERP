import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'

export function PurchaseTimeline({ steps }: { steps: string[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Purchase Timeline</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {steps.map((step, index) => (
          <div key={`${step}-${index}`} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
            {index + 1}. {step}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
