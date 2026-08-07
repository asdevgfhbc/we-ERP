import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { permissionRows } from '@/features/administration/data/administration-data'

export function PermissionsPage() {
  return (
    <PurchaseTable
      title="Permissions"
      rows={permissionRows}
      columns={[
        { key: 'module', label: 'Module' },
        { key: 'permission', label: 'Permission' },
        { key: 'level', label: 'Level' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
