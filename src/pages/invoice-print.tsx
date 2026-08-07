import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, SecondaryButton } from '@/components/ui/primitives'

export function InvoicePrintPage() {
  const lines = [
    { item: 'Industrial Pump Set', qty: 12, unit: 820, vat: 0.15 },
    { item: 'Hydraulic Hose Pack', qty: 30, unit: 110, vat: 0.15 },
    { item: 'Control Valve Pro', qty: 7, unit: 1290, vat: 0.15 },
  ]

  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.unit, 0)
  const discount = subtotal * 0.04
  const taxable = subtotal - discount
  const vat = taxable * 0.15
  const total = taxable + vat

  const downloadPdf = () => {
    const content = [
      'VAT Invoice',
      'Company: we-ERP Trading Co.',
      'VAT ID: VAT-9901021',
      'Invoice No: INV-2026-0441',
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Discount: ${formatCurrency(discount)}`,
      `VAT: ${formatCurrency(vat)}`,
      `Grand Total: ${formatCurrency(total)}`,
    ].join('\n')
    const blob = new Blob([content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'vat-invoice.pdf'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Print VAT Invoice</h1>
        <p className="text-sm text-muted-foreground">Excel-style printable invoice layout with mock company identity and VAT lines.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>VAT Invoice Preview</CardTitle>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => window.print()}>Print</SecondaryButton>
            <SecondaryButton onClick={downloadPdf}>Download PDF</SecondaryButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <div className="min-w-[840px] bg-white p-6 text-slate-900">
              <div className="mb-5 flex items-start justify-between border-b border-slate-300 pb-4">
                <div>
                  <p className="text-2xl font-extrabold tracking-tight text-teal-700">we-ERP Trading Co.</p>
                  <p className="text-sm">123 Industrial Avenue, Commerce City</p>
                  <p className="text-sm">VAT ID: VAT-9901021</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">Invoice No: INV-2026-0441</p>
                  <p>Date: 2026-08-06</p>
                  <p>Customer: Orbit Supplies LLC</p>
                </div>
              </div>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-3 py-2 text-left">Item Description</th>
                    <th className="border border-slate-300 px-3 py-2 text-right">Qty</th>
                    <th className="border border-slate-300 px-3 py-2 text-right">Unit Price</th>
                    <th className="border border-slate-300 px-3 py-2 text-right">Line Total</th>
                    <th className="border border-slate-300 px-3 py-2 text-right">VAT</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.item}>
                      <td className="border border-slate-300 px-3 py-2">{line.item}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right">{line.qty}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(line.unit)}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(line.qty * line.unit)}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(line.qty * line.unit * line.vat)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="border border-slate-300 px-3 py-2 text-right font-semibold">Subtotal</td>
                    <td colSpan={2} className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="border border-slate-300 px-3 py-2 text-right font-semibold">Discount</td>
                    <td colSpan={2} className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(discount)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="border border-slate-300 px-3 py-2 text-right font-semibold">VAT (15%)</td>
                    <td colSpan={2} className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(vat)}</td>
                  </tr>
                  <tr className="bg-slate-100 font-semibold">
                    <td colSpan={3} className="border border-slate-300 px-3 py-2 text-right">Grand Total</td>
                    <td colSpan={2} className="border border-slate-300 px-3 py-2 text-right">{formatCurrency(total)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-600">
                  QR Placeholder: [QR]
                </div>
                <div className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-600">
                  Signature Area
                  <div className="mt-6 h-px bg-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
