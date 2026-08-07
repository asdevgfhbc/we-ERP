import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { quotationDetail } from '@/features/sales/shared/data'
import { formatCurrency } from '@/lib/utils'

export function QuotationDetailsPage({ id }: { id: string }) {
  const detail = quotationDetail(id)
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Quotation Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Quotation</p><p className="font-medium">{detail.number}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{detail.customer}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{detail.date}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Validity</p><p className="font-medium">{detail.validity}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">{formatCurrency(detail.amount)}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Revision History</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {detail.revisionHistory.map((item) => (
            <div key={item} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">{item}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
