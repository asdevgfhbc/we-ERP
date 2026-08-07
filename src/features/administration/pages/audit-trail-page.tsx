import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { auditTrailRows } from '@/features/administration/data/administration-data'

export function AuditTrailPage() {
  return (
    <PurchaseTable
      title="Audit Trail"
      rows={auditTrailRows}
      columns={[
        { key: 'entity', label: 'Entity' },
        { key: 'change', label: 'Change' },
        { key: 'changedBy', label: 'Changed By' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
