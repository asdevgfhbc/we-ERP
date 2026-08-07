import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { warehouseDetailRows, warehouseTimeline } from '@/features/warehouse/data/warehouse-data'

export function WarehouseDetailsPage({ id }: { id: string }) {
  const detail = warehouseTimeline(id)

  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Warehouse Details"
        rows={warehouseDetailRows}
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'name', label: 'Warehouse' },
          { key: 'manager', label: 'Manager' },
          { key: 'capacity', label: 'Capacity', align: 'right' },
          { key: 'utilization', label: 'Utilization', align: 'right' },
          { key: 'status', label: 'Status' },
        ]}
      />
      <Card>
        <CardHeader><CardTitle>{detail.name} Activity Timeline</CardTitle></CardHeader>
        <CardContent>
          <PurchaseTimeline steps={detail.timeline} />
        </CardContent>
      </Card>
    </div>
  )
}
