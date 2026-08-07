import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { employeeRows } from '@/features/hr/data/hr-data'

export function EmployeesPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Employees"
      rows={employeeRows}
      onView={onView}
      columns={[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' },
        { key: 'designation', label: 'Designation' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
