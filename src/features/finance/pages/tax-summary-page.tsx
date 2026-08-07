import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { taxSummaryRows } from '@/features/finance/data/finance-data'

export function TaxSummaryPage() {
  return (
    <PurchaseTable
      title="Tax Summary"
      rows={taxSummaryRows}
      columns={[
        { key: 'reference', label: 'Reference' },
        { key: 'taxType', label: 'Tax Type' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
