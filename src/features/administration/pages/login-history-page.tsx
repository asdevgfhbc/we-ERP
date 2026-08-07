import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { loginHistoryRows } from '@/features/administration/data/administration-data'

export function LoginHistoryPage() {
  return (
    <PurchaseTable
      title="Login History"
      rows={loginHistoryRows}
      columns={[
        { key: 'user', label: 'User' },
        { key: 'ip', label: 'IP Address' },
        { key: 'device', label: 'Device' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
