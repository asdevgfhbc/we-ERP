import { supplierPerformanceRows } from '@/features/purchasing/data/purchasing-data'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function SupplierPerformancePage() {
  return (
    <PurchaseTable
      title="Supplier Performance"
      rows={supplierPerformanceRows}
      columns={[
        { key: 'supplier', label: 'Supplier' },
        { key: 'purchaseValue', label: 'Purchase Value', align: 'right' },
        { key: 'deliveryPerformance', label: 'Delivery Performance' },
        { key: 'qualityRating', label: 'Quality Rating' },
        { key: 'leadTime', label: 'Lead Time' },
        { key: 'outstandingBalance', label: 'Outstanding Balance', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
