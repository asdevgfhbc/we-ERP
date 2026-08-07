import { Card, CardContent, CardHeader, CardTitle, SecondaryButton } from '@/components/ui/primitives'
import { invoiceDetail } from '@/features/sales/shared/data'
import { formatCurrency } from '@/lib/utils'

export function InvoicePreviewPage({ id }: { id: string }) {
  const detail = invoiceDetail(id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Preview</CardTitle>
        <div className="flex gap-2">
          <SecondaryButton onClick={() => window.print()}>Print</SecondaryButton>
          <SecondaryButton>Download PDF</SecondaryButton>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border p-4">
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Company</p>
              <p className="font-medium">we-ERP Trading Co.</p>
              <p className="text-sm text-muted-foreground">VAT: VAT-9901021</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Invoice</p>
              <p className="font-medium">{detail.number}</p>
              <p className="text-sm text-muted-foreground">Date: {detail.date}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Customer</p>
              <p className="font-medium">{detail.customer}</p>
            </div>
          </div>

          <div className="space-y-2">
            {detail.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.qty} x {formatCurrency(item.unitPrice)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Discount</p><p className="font-medium">{formatCurrency(detail.discount)}</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">VAT (15%)</p><p className="font-medium">{formatCurrency(detail.vatValue)}</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Grand Total</p><p className="font-medium">{formatCurrency(detail.grandTotal)}</p></div>
            <div className="rounded-xl border border-dashed border-border p-3"><p className="text-xs text-muted-foreground">QR Placeholder</p><p className="font-medium">[ QR ]</p></div>
            <div className="rounded-xl border border-dashed border-border p-3 sm:col-span-2"><p className="text-xs text-muted-foreground">Signature Area</p><p className="h-12" /></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
