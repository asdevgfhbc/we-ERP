import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { departmentRows } from '@/features/hr/data/hr-data'

export function DepartmentsPage() {
  return (
    <PurchaseTable
      title="Departments"
      rows={departmentRows}
      columns={[
        { key: 'reference', label: 'Department Code' },
        { key: 'name', label: 'Department' },
        { key: 'headcount', label: 'Headcount', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
