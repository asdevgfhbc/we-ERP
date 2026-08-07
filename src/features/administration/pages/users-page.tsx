import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { userRows } from '@/features/administration/data/administration-data'

export function UsersPage({ onView }: { onView: (id: string) => void }) {
  return (
    <PurchaseTable
      title="Users"
      rows={userRows}
      onView={onView}
      columns={[
        { key: 'code', label: 'User Code' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'User Status' },
      ]}
    />
  )
}
