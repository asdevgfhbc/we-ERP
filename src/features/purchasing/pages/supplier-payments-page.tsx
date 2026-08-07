import { supplierPaymentRows } from '@/features/purchasing/data/purchasing-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function SupplierPaymentsPage() {
  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Supplier Payments"
        rows={supplierPaymentRows}
        columns={[
          { key: 'reference', label: 'Reference' },
          { key: 'supplier', label: 'Supplier' },
          { key: 'method', label: 'Payment Method' },
          { key: 'invoice', label: 'Invoice' },
          { key: 'date', label: 'Date' },
          { key: 'amount', label: 'Outstanding Balance', align: 'right' },
          { key: 'status', label: 'Status' },
        ]}
      />
      <Card>
        <CardHeader><CardTitle>Payment History & Receipts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {supplierPaymentRows.slice(0, 4).map((row) => (
            <div key={row.id} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm">
              <span>{row.reference} • {row.method}</span>
              <span className="text-muted-foreground">Receipt: RCP-{row.id}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
