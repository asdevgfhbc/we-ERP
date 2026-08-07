import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { salesOrderDetail } from '@/features/sales/shared/data'
import { formatCurrency } from '@/lib/utils'

export function SalesOrderDetailsPage({ id }: { id: string }) {
  const detail = salesOrderDetail(id)
  const total = detail.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Sales Order Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Order</p><p className="font-medium">{detail.number}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{detail.customer}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{detail.date}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Delivery Status</p><p className="font-medium">{detail.deliveryStatus}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium">{formatCurrency(detail.amount)}</p></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {detail.items.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.qty} x {formatCurrency(item.unitPrice)}</p>
            </div>
          ))}
          <div className="rounded-xl border border-border p-3 text-right font-semibold">Total: {formatCurrency(total)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
