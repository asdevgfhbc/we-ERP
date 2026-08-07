import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { returnRows } from '@/features/customer-service/data/customer-service-data'

export function ReturnsPage() {
  return (
    <PurchaseTable
      title="Returns"
      rows={returnRows}
      columns={[
        { key: 'reference', label: 'Return No' },
        { key: 'customer', label: 'Customer' },
        { key: 'reason', label: 'Reason' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
