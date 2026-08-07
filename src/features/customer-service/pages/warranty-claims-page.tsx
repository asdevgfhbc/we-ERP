import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { warrantyRows } from '@/features/customer-service/data/customer-service-data'

export function WarrantyClaimsPage() {
  return (
    <PurchaseTable
      title="Warranty Claims"
      rows={warrantyRows}
      columns={[
        { key: 'reference', label: 'Claim No' },
        { key: 'customer', label: 'Customer' },
        { key: 'product', label: 'Product' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
