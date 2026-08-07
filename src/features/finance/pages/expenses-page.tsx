import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { expenseRows } from '@/features/finance/data/finance-data'

export function ExpensesPage() {
  return (
    <PurchaseTable
      title="Expenses"
      rows={expenseRows}
      columns={[
        { key: 'reference', label: 'Expense No' },
        { key: 'category', label: 'Category' },
        { key: 'approvedBy', label: 'Approved By' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
