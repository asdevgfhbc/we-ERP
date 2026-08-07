import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { payrollRows } from '@/features/hr/data/hr-data'

export function PayrollPage() {
  return (
    <PurchaseTable
      title="Payroll"
      rows={payrollRows}
      columns={[
        { key: 'employee', label: 'Employee' },
        { key: 'month', label: 'Month' },
        { key: 'gross', label: 'Gross', align: 'right' },
        { key: 'net', label: 'Net', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
