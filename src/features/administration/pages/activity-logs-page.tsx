import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { activityLogRows } from '@/features/administration/data/administration-data'

export function ActivityLogsPage() {
  return (
    <PurchaseTable
      title="Activity Logs"
      rows={activityLogRows}
      columns={[
        { key: 'user', label: 'User' },
        { key: 'action', label: 'Action' },
        { key: 'module', label: 'Module' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
