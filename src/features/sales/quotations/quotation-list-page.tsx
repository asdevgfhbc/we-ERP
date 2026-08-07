import { quotationRows } from '@/features/sales/shared/data'
import { SalesTable } from '@/features/sales/shared/sales-table'

export function QuotationListPage({ onView }: { onView: (id: string) => void }) {
  return (
    <SalesTable
      title="Quotations"
      rows={quotationRows}
      onView={onView}
      columns={[
        { key: 'number', label: 'Quotation No' },
        { key: 'customer', label: 'Customer' },
        { key: 'date', label: 'Date' },
        { key: 'validity', label: 'Validity' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
