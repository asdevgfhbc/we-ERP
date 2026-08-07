import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'

export function SupplierSummaryCard({
  supplier,
  leadTime,
  rating,
  outstanding,
}: {
  supplier: string
  leadTime: string
  rating: string
  outstanding: string
}) {
  return (
    <Card>
      <CardHeader><CardTitle>Supplier Summary</CardTitle></CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Supplier</p><p className="font-medium">{supplier}</p></div>
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Lead Time</p><p className="font-medium">{leadTime}</p></div>
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Quality Rating</p><p className="font-medium">{rating}</p></div>
        <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Outstanding Balance</p><p className="font-medium">{outstanding}</p></div>
      </CardContent>
    </Card>
  )
}
