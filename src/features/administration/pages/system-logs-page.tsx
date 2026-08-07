import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { systemLogRows } from '@/features/administration/data/administration-data'

export function SystemLogsPage() {
  return (
    <PurchaseTable
      title="System Logs"
      rows={systemLogRows}
      columns={[
        { key: 'service', label: 'Service' },
        { key: 'level', label: 'Level' },
        { key: 'message', label: 'Message' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
