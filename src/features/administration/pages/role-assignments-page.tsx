import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { roleAssignmentRows } from '@/features/administration/data/administration-data'

export function RoleAssignmentsPage() {
  return (
    <PurchaseTable
      title="Role Assignments"
      rows={roleAssignmentRows}
      columns={[
        { key: 'user', label: 'User' },
        { key: 'role', label: 'Role' },
        { key: 'assignedBy', label: 'Assigned By' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
