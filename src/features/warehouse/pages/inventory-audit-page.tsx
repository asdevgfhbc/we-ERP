import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { auditRows } from '@/features/warehouse/data/warehouse-data'

export function InventoryAuditPage() {
  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Inventory Audit"
        rows={auditRows}
        columns={[
          { key: 'reference', label: 'Audit No' },
          { key: 'warehouse', label: 'Warehouse' },
          { key: 'auditor', label: 'Auditor' },
          { key: 'variance', label: 'Variance %', align: 'right' },
          { key: 'status', label: 'Status' },
        ]}
      />
      <Card>
        <CardHeader><CardTitle>Audit Timeline</CardTitle></CardHeader>
        <CardContent>
          <PurchaseTimeline steps={['Audit planned', 'Stock counted', 'Variance reviewed', 'Adjustment approved']} />
        </CardContent>
      </Card>
    </div>
  )
}
