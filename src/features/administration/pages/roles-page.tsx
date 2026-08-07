import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { roleRows } from '@/features/administration/data/administration-data'

export function RolesPage() {
  return (
    <PurchaseTable
      title="Roles"
      rows={roleRows}
      columns={[
        { key: 'code', label: 'Role Code' },
        { key: 'name', label: 'Role' },
        { key: 'scope', label: 'Scope' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
