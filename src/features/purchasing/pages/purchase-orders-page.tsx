import { purchaseOrderRows } from '@/features/purchasing/data/purchasing-data'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function PurchaseOrdersPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Purchase Orders"
      rows={purchaseOrderRows}
      onView={onView}
      columns={[
        { key: 'number', label: 'PO No' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'date', label: 'Date' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'approvalStatus', label: 'Approval Status' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
