import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { complaintRows } from '@/features/customer-service/data/customer-service-data'

export function ComplaintsPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Complaints"
      rows={complaintRows}
      onView={onView}
      columns={[
        { key: 'reference', label: 'Ticket No' },
        { key: 'customer', label: 'Customer' },
        { key: 'category', label: 'Category' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
