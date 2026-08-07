import { purchaseReturnRows } from '@/features/purchasing/data/purchasing-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function PurchaseReturnsPage() {
  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Purchase Returns"
        rows={purchaseReturnRows}
        columns={[
          { key: 'reference', label: 'Reference' },
          { key: 'supplier', label: 'Supplier' },
          { key: 'reason', label: 'Reason' },
          { key: 'date', label: 'Date' },
          { key: 'amount', label: 'Amount', align: 'right' },
          { key: 'status', label: 'Status' },
        ]}
      />
      <Card>
        <CardHeader><CardTitle>Returns History</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {purchaseReturnRows.slice(0, 4).map((row) => (
            <div key={row.id} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
              {row.reference} • {row.reason} • {row.status}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
